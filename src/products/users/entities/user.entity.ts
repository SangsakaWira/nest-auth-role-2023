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
  history: string[]

  @Prop()
  namaLengkap: string;

  @Prop()
  tanggalLahir: string;

  @Prop()
  tempatLahir: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  gelar: string;

  @Prop()
  tanggalBergabung: string;

  @Prop()
  linkKantor: string;

  @Prop({ type: MongooseSchema.Types.ObjectId , ref: 'Schedule' })
  schedule: Types.ObjectId[] 

  @Prop()
  rate: Number

  @Prop()
  expired: string;

}

export const UserSchema = SchemaFactory.createForClass(User);