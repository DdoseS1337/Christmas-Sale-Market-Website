import { useCallback, useEffect, useState } from "react";

export interface IFetchDataParameters<T> {
    callApi: () => Promise<T>
    filter?: (value: any, index: number, array: any[]) => boolean | Promise<boolean>;
    count?: number;
    defaultValue?: T;
    dependencies?: React.DependencyList;
    executeIf?: () => boolean;
}

export const useFetchData = <T>(fetchDataParameters: IFetchDataParameters<T>) => {
    const [items, setItems] = useState<T | undefined>(fetchDataParameters.defaultValue);
    const [error, setError] = useState<any>();

    const refresh = useCallback(async (refreshDataParameters?: IFetchDataParameters<T>) => {
        const { callApi, filter, count } = refreshDataParameters ?? fetchDataParameters;

        if (fetchDataParameters.executeIf && fetchDataParameters.executeIf() === false)
            return;

        let result: any = await callApi().catch(e => {
            setError(e);
            console.log(e);
        });
        
        if (Array.isArray(result) === false) {
            setItems(result);
            return;
        }

        if (filter) {
            result = await asyncFilter(result, filter);
        }

        if (count) { 
            result = result.slice(0, count);
        }

        setItems(result);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, fetchDataParameters.dependencies ?? []);

    useEffect(() => {
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, fetchDataParameters.dependencies ?? []);
    
    return { items, refresh, error };
}

const asyncFilter = async (arr: Array<any>, func: (value: any, index: number, array: any[]) => boolean | Promise<boolean>) => {
    const boolArr = await Promise.all(arr.map(func));
    return arr.filter((_, i) => boolArr[i]);
}