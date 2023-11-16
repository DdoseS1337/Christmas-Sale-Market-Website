import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsPhoneNumber,
  IsArray,
  ValidateNested,
  IsEnum,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export class ProductTg {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  price: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class Product {
  @IsString()
  id: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

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

  @ValidateNested({ each: true })
  @Type(() => Product)
  @IsArray()
  @IsNotEmpty()
  products: Product[];

  @IsOptional()
  @IsString()
  additional_info: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}

export class TelegramOrderDto extends CreateUserOrderDto {
  @ValidateNested({ each: true })
  @Type(() => ProductTg)
  @IsArray()
  @IsNotEmpty()
  products: ProductTg[];
}
