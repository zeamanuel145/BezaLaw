import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from './schemas/service.schema';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<Service>,
  ) {}

  async getAllServices(): Promise<Service[]> {
    return this.serviceModel.find({ isActive: true });
  }

  async getServiceById(id: string): Promise<Service | null> {
    return this.serviceModel.findById(id);
  }

  async createService(serviceData: Partial<Service>): Promise<Service> {
    return this.serviceModel.create(serviceData);
  }

  async updateService(
    id: string,
    serviceData: Partial<Service>,
  ): Promise<Service | null> {
    return this.serviceModel.findByIdAndUpdate(id, serviceData, { new: true });
  }

  async deleteService(id: string): Promise<any> {
    return this.serviceModel.findByIdAndDelete(id);
  }
}
