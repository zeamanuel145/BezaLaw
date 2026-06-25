import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from './schemas/contact.schema';

@Controller('api/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('submit')
  async submitContact(@Body() contactData: Partial<Contact>) {
    return this.contactService.submitContact(contactData);
  }

  @Get()
  async getAllContacts() {
    return this.contactService.getAllContacts();
  }

  @Get(':id')
  async getContactById(@Param('id') id: string) {
    return this.contactService.getContactById(id);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.contactService.markAsRead(id);
  }

  @Delete(':id')
  async deleteContact(@Param('id') id: string) {
    return this.contactService.deleteContact(id);
  }
}
