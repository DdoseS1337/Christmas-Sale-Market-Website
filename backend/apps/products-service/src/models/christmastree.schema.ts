import { AbstactDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class ReservationDocument extends AbstactDocument {
  @Prop()
  timestamp: Date;
  @Prop()
  startDate: Date;
  @Prop()
  endDate: Date;
  @Prop()
  userId: string;
  @Prop()
  placeId: string;
  @Prop()
  invoiceId: string;
}

export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
