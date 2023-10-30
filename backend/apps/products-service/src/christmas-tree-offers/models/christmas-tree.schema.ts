import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class ChristmasTreeDocument extends AbstractDocument {
  @Prop()
  id: string;

  @Prop()
  group_id: string;

  @Prop()
  available: boolean;

  @Prop()
  url: string;

  @Prop()
  name: string;

  @Prop()
  supplier_name: string;

  @Prop()
  price: string;

  @Prop()
  newPrice: string;

  @Prop()
  currencyId: string;

  @Prop()
  categoryId: string;

  @Prop({ type: [String] })
  picture: string[];

  @Prop()
  store: boolean;

  @Prop()
  delivery: boolean;

  @Prop()
  pickup: boolean;

  @Prop()
  adult: boolean;

  @Prop()
  manufacturer_warranty: boolean;

  @Prop({ type: [String], default: [] })
  vendorCode: string[];

  @Prop({ type: [{ name: String, description: String }], default: [] })
  param: Array<{ name: string; description: string }>;
}

export const ChristmasTreeSchema = SchemaFactory.createForClass(
  ChristmasTreeDocument,
);
