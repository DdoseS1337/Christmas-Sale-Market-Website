import { IsNotEmpty, IsString } from 'class-validator';

export class ChristmastreeCategoryDto {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly parentId: string | null;
}
