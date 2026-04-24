import { Controller, Get, Post, Body } from '@nestjs/common';
import { LawyerService } from './lawyer.service';

@Controller('api/lawyer')
export class LawyerController {
  constructor(private readonly lawyerService: LawyerService) {}

  @Get('profile')
  async getProfile() {
    return this.lawyerService.getLawyerProfile();
  }

  @Post('profile')
  async updateProfile(@Body() lawyerData) {
    return this.lawyerService.createOrUpdateLawyer(lawyerData);
  }

  @Post('update-tokens')
  async updateTokens(@Body() { accessToken, refreshToken }) {
    return this.lawyerService.updateGoogleTokens(accessToken, refreshToken);
  }
}
