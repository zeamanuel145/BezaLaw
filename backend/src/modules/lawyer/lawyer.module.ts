import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LawyerService } from './lawyer.service';
import { LawyerController } from './lawyer.controller';
import { Lawyer, LawyerSchema } from './schemas/lawyer.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Lawyer.name, schema: LawyerSchema }])],
  providers: [LawyerService],
  controllers: [LawyerController],
  exports: [LawyerService],
})
export class LawyerModule {}