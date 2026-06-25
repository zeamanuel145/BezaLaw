import { Injectable } from '@nestjs/common';
import { google, Auth, calendar_v3 } from 'googleapis';

interface GoogleTokens {
  access_token: string;
  refresh_token?: string;
}

interface EventDetails {
  summary: string;
  description: string;
  startTime: Date;
  endTime: Date;
  attendeeEmail: string;
}

@Injectable()
export class GoogleCalendarService {
  private oauth2Client: Auth.OAuth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URL,
    );
  }

  private getCalendar(tokens: GoogleTokens): calendar_v3.Calendar {
    this.oauth2Client.setCredentials(tokens);

    return google.calendar({
      version: 'v3',
      auth: this.oauth2Client,
    });
  }

  async getAvailableSlots(calendarId: string, tokens: GoogleTokens) {
    const calendar = this.getCalendar(tokens);

    const now = new Date();
    const endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const response = await calendar.events.list({
      calendarId,
      timeMin: now.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    return response.data.items;
  }

  async createEvent(
    calendarId: string,
    tokens: GoogleTokens,
    eventDetails: EventDetails,
  ) {
    const calendar = this.getCalendar(tokens);

    const event: calendar_v3.Schema$Event = {
      summary: eventDetails.summary,
      description: eventDetails.description,
      start: {
        dateTime: eventDetails.startTime.toISOString(),
        timeZone: 'Africa/Addis_Ababa',
      },
      end: {
        dateTime: eventDetails.endTime.toISOString(),
        timeZone: 'Africa/Addis_Ababa',
      },
      attendees: [{ email: eventDetails.attendeeEmail }],
      conferenceData: {
        createRequest: {
          requestId: 'meet-' + Date.now(),
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
    });

    return response.data;
  }

  async cancelEvent(calendarId: string, eventId: string, tokens: GoogleTokens) {
    const calendar = this.getCalendar(tokens);

    await calendar.events.delete({
      calendarId,
      eventId,
    });

    return { success: true };
  }
}
