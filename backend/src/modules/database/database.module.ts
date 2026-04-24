import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('MONGODB_URI is not defined in .env');
}

@Module({
  imports: [MongooseModule.forRoot(mongoUri)],
})
export class DatabaseModule {}
