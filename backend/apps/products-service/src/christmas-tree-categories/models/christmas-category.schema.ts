import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ChristmastreeCategoryDocument extends AbstractDocument {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  supplier_name: string;

  @Prop({ default: null })
  parentId: string;
}

export const ChristmastreeCategorySchema = SchemaFactory.createForClass(ChristmastreeCategoryDocument);
