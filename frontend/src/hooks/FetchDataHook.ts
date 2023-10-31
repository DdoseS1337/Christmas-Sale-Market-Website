import { useEffect, useState } from "react";

interface IFetchDataParameters<T> {
    callApi: () => Promise<T>
    filter?: (value: any, index: number, array: any[]) => boolean | Promise<boolean>;
    count?: number;
}

export const useFetchData = <T>({callApi, filter, count}: IFetchDataParameters<T>) => {
    const [items, setItems] = useState<T>();
    const [error, setError] = useState<any>();
    
    const refresh = async () => {
        let result: any = await callApi().catch(e => {
            setError(e);
            console.log(e);
        });
        
        if (Array.isArray(result) === false) {
            setItems(result);
            return;
        }

        if (filter) {
            result = await asyncFilter(result, filter); // result.filter(filter);
        }

        if (count){ 
            result = result.slice(0, count);
        }

        setItems(result);
    };

    useEffect(() => {
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { items, refresh, error };
}

function asyncFilter(arr: Array<any>, func: (value: any, index: number, array: any[]) => boolean | Promise<boolean>) {
    return Promise.all(arr.map(func)).then(boolArr => arr.filter((_, i) => boolArr[i]));
}
  