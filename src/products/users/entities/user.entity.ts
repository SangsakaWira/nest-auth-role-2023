import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import {Role} from 'src/utils/roles/roles.enum'

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop()
  name: string;

  @Prop({ unique:true})
  username: string;

  @Prop({ unique:true})
  email: string;

  @Prop()
  password: string;

  @Prop({default:Role.User})
  role: Role

  @Prop()
  namaLengkap: string;

}

export const UserSchema = SchemaFactory.createForClass(User);