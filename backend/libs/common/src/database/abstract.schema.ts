import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema()
export class AbstactDocument {
    @Prop({type: SchemaTypes.ObjectId})
    _id: Types.ObjectId;
}