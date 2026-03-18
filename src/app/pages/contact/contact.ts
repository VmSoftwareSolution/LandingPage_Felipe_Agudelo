import {
  Component,
  inject,
  PLATFORM_ID,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/services/contact-service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  private fb             = inject(FormBuilder);
  private contactService = inject(ContactService);

  contactForm: FormGroup = this.fb.group({
    name:    ['', Validators.required],
    email:   ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  sending = false;

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.sending = true;
    this.contactService.sendEmail(this.contactForm.value)
      .then(() => {
        alert('Correo enviado con éxito');
        this.contactForm.reset();
      })
      .catch((error: unknown) => {
        console.error('Error enviando el correo:', error);
        alert('Ocurrió un error al enviar el mensaje');
      })
      .finally(() => { this.sending = false; });
  }
}
