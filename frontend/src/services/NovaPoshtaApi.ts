import { NOVA_POSHTA } from "../common";
import { IBranch, ICity as ICity } from "../interfaces/NovaPoshta";
import HttpService from "./HttpService";

class NovaPoshtaApi extends HttpService {
    constructor() {
        super(NOVA_POSHTA.BASE_URL);
    }

    async getCitiesByName(findByString: string): Promise<Array<ICity>> {
        const response = await this.post<any>({
            url: "/Address/getCities",
            data: {
                apiKey: NOVA_POSHTA.API_KEY,
                modelName: "Address",
                calledMethod: "getCities",
                methodProperties: {
                    FindByString: findByString,
                    Limit: 400
                }
            }
        });

        if (response.success != true) {
            console.log(response);
            return [];
        }

        return response.data.map((item: any) => ({name: item.Description, id: item["Ref"]} as ICity));
    }

    async getWarehouses(cityId: string): Promise<Array<IBranch>> {
        var response = await this.post<any>({
            url: "/Address/getWarehouses",
            data: {
                "apiKey":NOVA_POSHTA.API_KEY,
                "modelName": "Address",
                "calledMethod": "getWarehouses",
                "methodProperties": {
                    CityRef: cityId
                }
             }
        });

        
        if (response.success != true) {
            console.log(response);
            return [];
        }

        return response.data.map((item: any) => ({ name: item.Description }));
    }
}

const novaPoshtaApi = new NovaPoshtaApi();
export default novaPoshtaApi;