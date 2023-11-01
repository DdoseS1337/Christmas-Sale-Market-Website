import { useCallback, useEffect, useState } from "react";

interface IFetchDataParameters<T> {
    callApi: () => Promise<T>
    filter?: (value: any, index: number, array: any[]) => boolean | Promise<boolean>;
    count?: number;
    dependencies?: React.DependencyList;
}

export const useFetchData = <T>(fetchDataParameters: IFetchDataParameters<T>) => {
    const [items, setItems] = useState<T>();
    const [error, setError] = useState<any>();

    const refresh = useCallback(async (refreshDataParameters?: IFetchDataParameters<T>) => {
        console.log("refresh")
        const { callApi, filter, count } = refreshDataParameters ?? fetchDataParameters;

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

        if (count){ 
            result = result.slice(0, count);
        }

        setItems(result);
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
  