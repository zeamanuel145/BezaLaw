import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;

    if (!host || !port || !user || !pass) {
      throw new Error('Missing SMTP configuration in .env file');
    }

    this.transporter = nodemailer.createTransport({
      host,
      port: parseInt(port),
      family: 4,
      secure: true,
      auth: {
        user,
        pass,
      },
      // Explicitly specify the transport type
      type: 'smtp',
    } as nodemailer.TransportOptions);
  }

  async sendBookingConfirmation(
    email: string,
    clientName: string,
    phone: string,
    appointmentDate: Date,
    serviceName: string,
  ) {
    return this.transporter.sendMail({
      from: process.env.SMTP_USER!,
      to: email,
      subject: 'Booking Confirmation - Law Firm',
      html: `
        <h2>Booking Confirmation</h2>
        <p>Hello ${clientName},</p>
        <p>Your booking has been confirmed!</p>
        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Date & Time:</strong> ${appointmentDate.toLocaleString()}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p>We look forward to meeting you.</p>
        <p>Best regards,<br/>Law Firm Team</p>
      `,
    });
  }

  async sendBookingNotificationToLawyer(
    lawyerEmail: string,
    clientName: string,
    clientEmail: string,
    phone: string,
    serviceName: string,
    appointmentDate: Date,
  ) {
    return this.transporter.sendMail({
      from: process.env.SMTP_USER!,
      to: lawyerEmail,
      subject: 'New Booking - Law Firm',
      html: `
        <h2>New Booking Received</h2>
        <p><strong>Client Name:</strong> ${clientName}</p>
        <p><strong>Client Email:</strong> ${clientEmail}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Date & Time:</strong> ${appointmentDate.toLocaleString()}</p>
      `,
    });
  }

  async sendContactForm(
    lawyerEmail: string,
    clientName: string,
    clientEmail: string,
    phone: string,
    subject: string,
    message: string,
  ) {
    return this.transporter.sendMail({
      from: process.env.SMTP_USER!,
      to: lawyerEmail,
      replyTo: clientEmail,
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${clientName}</p>
        <p><strong>Email:</strong> ${clientEmail}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
  }

  async sendContactConfirmation(
    clientEmail: string,
    clientName: string,
    phone: string,
  ) {
    return this.transporter.sendMail({
      from: process.env.SMTP_USER!,
      to: clientEmail,
      subject: 'We Received Your Message - Law Firm',
      html: `
        <h2>Message Received</h2>
        <p>Hello ${clientName},</p>
        <p>We received your message successfully.</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p>We will get back to you soon.</p>
        <p>Best regards,<br/>Law Firm Team</p>
      `,
    });
  }
}