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

export class OrderCustomerInformationValidation {
    @IsNotEmpty()
    firstName?: string;

    @IsNotEmpty()
    secondName?: string;

    @IsNotEmpty()
    @IsPhoneNumber('UA')
    phoneNumber?: string;

    @IsNotEmpty()
    branchOfNovaPoshta?: string;

    @IsNotEmpty()
    city?: string;

    @IsOptional()
    @IsEmail({}, {
        message: "Пошта невірна"
    })
    email?: string;
    
    @IsOptional()
    additionalInformation?: string;
}