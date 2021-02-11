import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserCredentials } from '../common/interfaces/user-credentials.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  async findById(id) {
    return this.userModel.findById(id);
  }

  async getAll(): Promise<Array<UserDocument>> {
    return this.userModel.find();
  }

  async createUser({
    email,
    password,
  }: UserCredentials): Promise<UserDocument> {
    const createdUser = new this.userModel({ password, email });
    return createdUser.save();
  }
}
