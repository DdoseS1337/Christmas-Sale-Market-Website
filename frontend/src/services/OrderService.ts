import { BACKEND_KEYS } from "../common";
import { IOrder } from "../interfaces/Order";
import HttpService from "./HttpService";

class OrderServiceSingleton extends HttpService {
    constructor() {
        super(BACKEND_KEYS.ORDER_SERVER_URL);
    }

    async sendOrder(order: IOrder): Promise<boolean> {
        return await this.post({
            url: BACKEND_KEYS.SEND_ORDER,
            data: {
                first_name: order.customerInformation.firstName,
                second_name: order.customerInformation.secondName,
                email: order.customerInformation.email,
                phone_number: order.customerInformation.phoneNumber,
                additional_info: order.customerInformation.additionalInformation,
                branch_nova_poshta: order.customerInformation.branchOfNovaPoshta,
                city: order.customerInformation.city,
                productsi: order.offers.map(item => ({
                    id: item.id.toString(),
                    quantity: item.quantity,
                }))
            }
        })
        .then(() => true)
        .catch(e => {
            console.log(e);
            return false;
        });
    }
}

export const OrderService = new OrderServiceSingleton();