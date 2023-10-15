import { AbstactDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserOrderDocument extends AbstactDocument {
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
  
}

export const UserOrderSchema = SchemaFactory.createForClass(UserOrderDocument);
