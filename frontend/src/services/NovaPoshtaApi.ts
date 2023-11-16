import { NOVA_POSHTA } from "../common";
import { ICity as ICity } from "../interfaces/NovaPoshta";
import HttpService from "./HttpService";

class NovaPoshtaApi extends HttpService {
    constructor() {
        super(NOVA_POSHTA.BASE_URL);
    }

    async getCitiesByName(): Promise<Array<ICity>> {
        const response = await this.post<any>({
            url: "/Address/getCities",
            data: {
                apiKey: NOVA_POSHTA.API_KEY,
                modelName: "Address",
                calledMethod: "getCities",
                methodProperties: {}
            }
        });

        if (response.success != true)
            throw new Error("Successfully false" + JSON.stringify(response));

        return response.data.map((item: any) => ({name: item.Description, id: item["Ref"]} as ICity));
    }

    async getWarehouses(): Promise<any[]> {
        var response = await this.post<any[]>({
            url: "/Address/getWarehouses",
            // headers: {
            //     'Content-Type': 'application/json',
            //     mode: 'cors'
            // },
            // headers: {
            //     'Content-Type': 'application/json',
            //     Host: 'api.novaposhta.ua',
            // },
            data: {
                "apiKey":NOVA_POSHTA.API_KEY,
                "modelName": "Address",
                "calledMethod": "getWarehouses",
                "methodProperties": {
                    "CityName": "Київ"
                }
             }
        });
        return response;
    }
}

const novaPoshtaApi = new NovaPoshtaApi();
export default novaPoshtaApi;