import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserOrderDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}