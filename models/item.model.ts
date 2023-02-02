import { InferSchemaType, Model, model, models, Schema } from 'mongoose';
import { Model_Names } from '../utils/constants';

const itemSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  available: {
    type: Boolean,
    required: true,
  },
  avaialableAmount: {
    type: Number,
    required: true,
  },
});

type IItemModel = InferSchemaType<typeof itemSchema>;

const ItemModel: Model<IItemModel> = models[Model_Names.itemModel] || model(Model_Names.itemModel, itemSchema, 'items');

export default ItemModel;
