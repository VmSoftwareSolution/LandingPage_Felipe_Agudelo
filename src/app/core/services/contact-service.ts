import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   private serviceId = 'service_2sypj79';
  private templateId = 'template_l5y771h';
  private publicKey = 'qux_NT-zO77SyF58D';

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

