import { useCallback, useEffect, useState } from "react";

interface IFetchDataParameters<T> {
    callApi: () => Promise<T>
    filter?: (value: any, index: number, array: any[]) => boolean;
    count?: number;
    dependencies?: React.DependencyList;
}

export const useFetchData = <T>(fetchDataParameters: IFetchDataParameters<T>) => {
    const [items, setItems] = useState<T>();
    const [error, setError] = useState<any>();

    const refresh = useCallback((refreshDataParameters?: IFetchDataParameters<T>) => {
        console.log("refresh")
        const { callApi, filter, count } = refreshDataParameters ?? fetchDataParameters;

        callApi().then((result: any) =>  {
            if (Array.isArray(result) === false) {
                setItems(result);
                return;
            }

            if (filter) {
                result = result.filter(filter);
            }

            if (count){ 
                result = result.slice(0, count);
            }

            setItems(result);
        }).catch(e => {
            setError(e);
            console.log(e);
        });
    }, fetchDataParameters.dependencies ?? []);

    useEffect(() => {
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, fetchDataParameters.dependencies ?? []);

    return { items, refresh, error };
}