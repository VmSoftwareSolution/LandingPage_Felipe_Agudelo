import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../../environment';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private serviceId = environment.serviceId;
  private templateId = environment.templateId;
  private publicKey = environment.publicKey;

  constructor() {
    emailjs.init(this.publicKey);
  }

  sendEmail(contactData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<EmailJSResponseStatus> {
    const templateParams = {
      name: contactData.name,
      email: contactData.email,
      subject: contactData.subject,
      message: contactData.message,
    };

    console.log('Datos enviados a EmailJS:', templateParams);

    return emailjs.send(this.serviceId, this.templateId, templateParams);
  }
}

