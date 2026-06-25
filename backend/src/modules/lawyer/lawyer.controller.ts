import { Controller, Get, Post, Body } from '@nestjs/common';
import { LawyerService } from './lawyer.service';
import { Lawyer } from './schemas/lawyer.schema';

@Controller('api/lawyer')
export class LawyerController {
  constructor(private readonly lawyerService: LawyerService) {}

  @Get('profile')
  async getProfile() {
    return this.lawyerService.getLawyerProfile();
  }

  @Post('profile')
  async updateProfile(@Body() lawyerData: Partial<Lawyer>) {
    return this.lawyerService.createOrUpdateLawyer(lawyerData);
  }

  @Post('update-tokens')
  async updateTokens(
    @Body()
    {
      accessToken,
      refreshToken,
    }: {
      accessToken: string;
      refreshToken?: string;
    },
  ) {
    return this.lawyerService.updateGoogleTokens(accessToken, refreshToken);
  }
}
