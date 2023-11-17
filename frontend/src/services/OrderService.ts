import { BACKEND_KEYS } from "../common";
import { IOrder } from "../interfaces/Order";
import HttpService from "./HttpService";

class OrderServiceSingleton extends HttpService {
    constructor() {
        super(BACKEND_KEYS.ORDER_SERVER_URL);
    }

    async sendOrder(order: IOrder) {
        await this.post({
            url: BACKEND_KEYS.SEND_ORDER,
            data: {
                first_name: order.customerInformation.firstName,
                second_name: order.customerInformation.secondName,
                email: order.customerInformation.email,
                phone_number: order.customerInformation.phoneNumber,
                additional_info: order.customerInformation.additionalInformation,
                Branch_nova_poshta: order.customerInformation.branchOfNovaPoshta,
                city: order.customerInformation.city,
                productsIds: order.offers.map(o => o.offerId)
            }
        }).catch(e => console.log(e));
    }
}

export const OrderService = new OrderServiceSingleton();