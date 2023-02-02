import { InferSchemaType, Model, model, models, Schema } from 'mongoose';
import { Model_Names } from '../utils/constants';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  orders: {
    type: [String],
    default: [],
  },
});

type IUserModel = InferSchemaType<typeof userSchema>;

const UserModel: Model<IUserModel> = models[Model_Names.userModel] || model(Model_Names.userModel, userSchema, 'users');

export default UserModel;
