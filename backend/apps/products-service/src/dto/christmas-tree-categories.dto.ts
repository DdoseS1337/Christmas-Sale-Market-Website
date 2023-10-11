import { Type } from 'class-transformer';
import { IsNotEmpty, IsDate, IsString } from 'class-validator';

export class ChristmasTreeDto {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly group_id: string;

  @IsNotEmpty()
  readonly available: boolean;

  @IsNotEmpty()
  readonly url: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  readonly currencyId: string;

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
  readonly category: number;

  @IsNotEmpty()
  readonly vendorCode: string[];

  @IsNotEmpty()
  @Type(() => String)
  readonly param: Map<string, string>;
}
