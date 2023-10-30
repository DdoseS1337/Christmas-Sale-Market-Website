import { CreateUserOrderDto } from '@app/common';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserOrderDto extends PartialType(CreateUserOrderDto) {}
