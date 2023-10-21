import { useEffect, useState } from "react";

interface IAdditionalParameters {
    filter?: (value: any, index: number, array: any[]) => boolean;
    count?: number;
}

export const useFetchData = <T>(callApi: () => Promise<T>, additionalParameters?: IAdditionalParameters) => {
    const [items, setItems] = useState<T>();
    const [error, setError] = useState<any>();
    
    const refresh = () => {
        callApi().then((result: any) =>  {
            if (Array.isArray(result) === false) {
                setItems(result);
                return;
            }

            if (additionalParameters?.filter) {
                result = result.filter(additionalParameters.filter);
            }

            if (additionalParameters?.count){ 
                result = result.slice(0, additionalParameters?.count);
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