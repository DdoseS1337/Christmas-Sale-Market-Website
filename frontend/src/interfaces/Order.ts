export interface IOrder {
    offers: Array<IOrderOffer>;
    customerInformation: IOrderCustomerInformation;
}

export interface IOrderCustomerInformation {
    firstName: string;
    secondName: string;
    phoneNumber: string;
    branchOfNovaPoshta: string;
    email?: string;
    additionalInformation?: string;
}

export interface IOrderOffer {
    offerId: number;
    number: number;
}