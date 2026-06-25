import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from './schemas/service.schema';

@Controller('api/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async getAllServices(): Promise<Service[]> {
    return this.servicesService.getAllServices();
  }

  @Get(':id')
  async getServiceById(@Param('id') id: string): Promise<Service | null> {
    return this.servicesService.getServiceById(id);
  }

  @Post()
  async createService(@Body() serviceData: Partial<Service>): Promise<Service> {
    return this.servicesService.createService(serviceData);
  }

  @Put(':id')
  async updateService(
    @Param('id') id: string,
    @Body() serviceData: Partial<Service>,
  ): Promise<Service | null> {
    return this.servicesService.updateService(id, serviceData);
  }

  @Delete(':id')
  async deleteService(@Param('id') id: string): Promise<Service | null> {
    return this.servicesService.deleteService(id);
  }
}
