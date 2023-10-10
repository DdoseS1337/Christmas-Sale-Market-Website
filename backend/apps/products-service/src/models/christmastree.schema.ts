import { AbstactDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class ChristmasTreeDocument extends AbstactDocument {
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
  price: number;

  @Prop()
  currencyId: string;

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

  @Prop()
  category: number;

  @Prop({ type: [String], default: [] })
  vendorCode: string[];

  @Prop({ type: Map, of: String, default: new Map() })
  param: Map<string, string>;
}

export const ChristmasTreeSchema = SchemaFactory.createForClass(
  ChristmasTreeDocument,
);
