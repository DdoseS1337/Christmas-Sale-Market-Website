import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";

export interface IOrder {
    offers: Array<IOrderOffer>;
    customerInformation: IOrderCustomerInformation;
}

export interface IOrderCustomerInformation {
    firstName: string;
    secondName: string;
    phoneNumber: string;
    branchOfNovaPoshta: string;
    city: string;
    email?: string;
    additionalInformation?: string;
}

export interface IOrderOffer {
    offerId: number;
    number: number;
}

export class OrderCustomerInformationValidation implements IOrderCustomerInformation {
    @IsNotEmpty({
        message: "Вкажіть ваше ім'я"
    })
    firstName: string = "";

    @IsNotEmpty({
        message: "Вкажіть ваше прізвище"
    })
    secondName: string = "";

    @IsPhoneNumber('UA', {
        message: "Некоректний номер телефону"
    })
    @IsNotEmpty({
        message: "Вкажіть ваш телефон для зв'язку"
    })
    phoneNumber: string = "";

    @IsNotEmpty({
        message: "Вкажіть відділення для доставлення товару"
    })
    branchOfNovaPoshta: string = "";

    @IsNotEmpty({
        message: "Вкажіть місто для доставлення товару"
    })
    city: string = "";

    @IsOptional()
    @IsEmail({}, {
        message: "Пошта невірна"
    })
    email?: string;
    
    @IsOptional()
    additionalInformation?: string;
}