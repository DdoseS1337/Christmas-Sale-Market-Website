import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserOrderDocument } from "./models/user-order.schema";

@Injectable()
export class UserOrderRepository extends AbstractRepository<UserOrderDocument> {
  protected readonly logger = new Logger(UserOrderRepository.name);

  constructor(
    @InjectModel(UserOrderDocument.name)
    userOrderModel: Model<UserOrderDocument>,
  ) {
    super(userOrderModel);
  }
}
