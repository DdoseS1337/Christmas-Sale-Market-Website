import { useCallback, useEffect, useState } from "react";
import { asyncFilter } from "../utils/AsyncFilter";

export interface IFetchDataParameters<T> {
    callApi: () => Promise<T>
    filter?: (value: any, index: number, array: any[]) => boolean | Promise<boolean>;
    count?: number;
    defaultValue?: T;
    dependencies?: React.DependencyList;
    executeIf?: () => boolean;
    concatWith?: T | "previousResult"
}

export const useFetchData = <T>(fetchDataParameters: IFetchDataParameters<T>) => {
    const [items, setItems] = useState<T | undefined>(fetchDataParameters.defaultValue);
    const [error, setError] = useState<any>();
    const [inProgress, setInProgress] = useState<any>();

    const refresh = useCallback(async (refreshDataParameters?: IFetchDataParameters<T>) => {
        const { callApi, filter, count, concatWith } = refreshDataParameters ?? fetchDataParameters;

        if (fetchDataParameters.executeIf && fetchDataParameters.executeIf() === false)
            return;

        setInProgress(true);
        let result: any = await callApi().catch(e => {
            setError(e);
            console.log(e);
        });
        
        if (Array.isArray(result)) {
            if (filter)
                result = await asyncFilter(result, filter);

            if (count)
                result = result.slice(0, count);

            if (concatWith)
                result = concatWith === "previousResult" 
                    ? result.concat(items ?? []) 
                    : result.concat(concatWith);
        }

        setInProgress(false);
        setItems(result);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, fetchDataParameters.dependencies ?? []);

    useEffect(() => {
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, fetchDataParameters.dependencies ?? []);
    
    return { items, refresh, error, inProgress };
}