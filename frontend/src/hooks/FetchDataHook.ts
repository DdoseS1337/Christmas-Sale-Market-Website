import { useEffect, useState } from "react";

interface IFetchDataParameters<T> {
    callApi: () => Promise<T>
    filter?: (value: any, index: number, array: any[]) => boolean;
    count?: number;
}

export const useFetchData = <T>({callApi, filter, count}: IFetchDataParameters<T>) => {
    const [items, setItems] = useState<T>();
    const [error, setError] = useState<any>();
    
    const refresh = () => {
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
    };

    useEffect(() => {
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { items, refresh, error };
}