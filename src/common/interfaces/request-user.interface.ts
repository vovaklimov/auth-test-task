import { ObjectId } from 'mongoose';

export interface RequestUser {
  id: ObjectId;
  email: string;
}
