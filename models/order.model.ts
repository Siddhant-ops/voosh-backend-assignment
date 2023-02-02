import { InferSchemaType, Model, model, models, Schema } from 'mongoose';
import { Model_Names } from '../utils/constants';

const orderSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

type IOrderModel = InferSchemaType<typeof orderSchema>;

const OrderModel: Model<IOrderModel> =
  models[Model_Names.orderModel] || model(Model_Names.orderModel, orderSchema, 'orders');

export default OrderModel;
