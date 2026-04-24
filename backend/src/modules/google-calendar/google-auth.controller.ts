import { Controller, Get, Query, Res } from '@nestjs/common';
import { google } from 'googleapis';

@Controller('auth/google')
export class GoogleAuthController {
  private oauth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URL,
    );
  }

  @Get()
  redirectToGoogle(@Res() res) {
    const url = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/calendar'],
      prompt: 'consent',
    });

    return res.redirect(url);
  }

  @Get('callback')
  async handleCallback(@Query('code') code: string, @Res() res) {
    const { tokens } = await this.oauth2Client.getToken(code);

    console.log('SAVE THESE TOKENS:', tokens);

    return res.send('Google Calendar Connected!');
  }
}
