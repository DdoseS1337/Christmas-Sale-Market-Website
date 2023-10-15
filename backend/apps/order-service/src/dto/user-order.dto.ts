import { IsString, IsEmail, IsOptional, IsNotEmpty, IsPhoneNumber, IsArray } from 'class-validator';

export class CreateUserOrderDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  second_name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  Branch_nova_poshta: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('UA')
  phone_number: string;

  @IsNotEmpty()
  @IsArray()
  productsIds: string[];

  @IsOptional()
  @IsString()
  additional_info: string;
}
