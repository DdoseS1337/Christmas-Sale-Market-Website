import { BACKEND_KEYS } from "../common";
import { IOrder } from "../interfaces/Order";
import HttpService from "./HttpService";

export class OrderService extends HttpService {
    constructor() {
        super(BACKEND_KEYS.SERVER_URL);
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
                branch_nova_poshta: order.customerInformation.branchOfNovaPoshta,
                productsIds: order.offers.map(o => o.offerId)
            }
        });
    }
}