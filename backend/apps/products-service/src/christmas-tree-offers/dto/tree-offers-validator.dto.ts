import { IsBooleanString, IsNumberString, IsOptional, IsString } from 'class-validator';

export class TreeOffersValidator {
  @IsNumberString()
  @IsOptional()
  categoryId?: string;

  @IsNumberString()
  @IsOptional()
  pricemin?: string;

  @IsNumberString()
  @IsOptional()
  pricemax?: string;

  @IsString()
  @IsOptional()
  supplier_name?: string;

  @IsString()
  @IsOptional()
  type_name?: string;

  @IsBooleanString()
  @IsOptional()
  available?: boolean;
}