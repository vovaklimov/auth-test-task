import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  /* TODO: It's an example application, password definitely shouldn't be stored as a plain string in production,
    it should be hashed with one-way algorithm of some kind (https://www.npmjs.com/package/bcryptjs) */
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
