import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'accounts', timestamps: true })
export class AccountDocument extends Document {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  ownerName: string;

  @Prop({ required: true, default: 0 })
  balance: number;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const AccountSchema = SchemaFactory.createForClass(AccountDocument);
