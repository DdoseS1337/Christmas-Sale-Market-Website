import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderStatus } from '@app/common';

@Schema()
export class UserOrderDocument extends AbstractDocument {
  @Prop()
  first_name: string;

  @Prop()
  second_name: string;

  @Prop()
  email?: string;

  @Prop()
  city: string;

  @Prop()
  phone_number: string;

  @Prop({ type: [String] })
  productsIds: string[];

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;
}

export const UserOrderSchema = SchemaFactory.createForClass(UserOrderDocument);
