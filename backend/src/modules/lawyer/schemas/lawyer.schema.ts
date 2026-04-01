import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Lawyer extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  bio: string;

  @Prop([String])
  specializations: string[];

  @Prop()
  profileImage: string;

  @Prop()
  yearsOfExperience: number;

  @Prop()
  googleCalendarId: string;

  @Prop()
  googleAccessToken: string;

  @Prop()
  googleRefreshToken: string;
}

export const LawyerSchema = SchemaFactory.createForClass(Lawyer);