import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty, ValidateNested, IsNumberString } from 'class-validator';

export class ChristmasTreeDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly group_id: string;

  @IsNotEmpty()
  @IsString()
  readonly available: boolean;

  @IsNotEmpty()
  @IsString()
  readonly url: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly supplier_name: string;

  @IsNotEmpty()
  @IsNumberString()
  readonly price: string;

  @IsNotEmpty()
  @IsNumberString()
  readonly newPrice: string;

  @IsNotEmpty()
  @IsString()
  readonly currencyId: string;

  @IsNotEmpty()
  readonly categoryId: string;

  @IsNotEmpty()
  readonly picture: string[];

  @IsNotEmpty()
  readonly store: boolean;

  @IsNotEmpty()
  readonly delivery: boolean;

  @IsNotEmpty()
  readonly pickup: boolean;

  @IsNotEmpty()
  readonly adult: boolean;

  @IsNotEmpty()
  readonly manufacturer_warranty: boolean;

  @IsNotEmpty()
  readonly vendorCode: string[];

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Object) 
  readonly param: Array<{ name: string; description: string }>;
}
