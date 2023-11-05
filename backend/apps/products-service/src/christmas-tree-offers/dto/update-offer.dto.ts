import { PartialType } from "@nestjs/mapped-types";
import { ChristmasTreeDto } from "../../dto/christmas-tree.dto";


export class UpdateOfferDto extends PartialType(ChristmasTreeDto) {}