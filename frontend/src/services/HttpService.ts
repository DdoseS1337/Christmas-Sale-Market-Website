import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

enum Methods {
    GET,
    POST
}

async function callAPI<TData>(path: string, data?: any, method: Methods = Methods.GET): Promise<AxiosResponse<TData>> {
    const serverDomen = process.env.REACT_APP_SERVER_DOMEN;

    let config = {
        method: Methods[method],
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
        }
    } as AxiosRequestConfig;

    method === Methods.GET ?
        config.params = data :
        config.data = data;

    return await axios(serverDomen + path, config);
}

export default callAPI;