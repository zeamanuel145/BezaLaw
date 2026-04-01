import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Booking extends Document {
  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true })
  clientEmail: string;

  @Prop({ required: true })
  clientPhone: string;

  @Prop({ required: true })
  serviceId: string;

  // ✅ ONE FIELD for date + time
  @Prop({ required: true })
  appointmentDate: Date;

  @Prop()
  description: string;

  @Prop()
  googleEventId: string;

  @Prop({
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  })
  status: string;

  @Prop()
  confirmationToken: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);