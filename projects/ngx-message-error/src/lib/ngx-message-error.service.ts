import { Injectable, Optional } from '@angular/core';

export class MessagesConfig {
  min?: string;
  max?: string;
  required?: string;
  requiredTrue?: string;
  email?: string;
  minLength?: string;
  maxLength?: string;
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class NgxMessageErrorService {
  constructor(@Optional() messages: MessagesConfig) {
    if (messages) {
      this.messages = Object.assign(this.messages, messages);
    }
  }

  messages: MessagesConfig = {
    min: 'Please enter a value greater than or equal to ?.',
    max: 'Please enter a value less than or equal to ?.',
    required: 'This field is required.',
    requiredTrue: 'This field is required.',
    email: 'Please enter a valid email address.',
    minlength: 'Minimum characters not reached. ?/?',
    maxlength: 'Maximum characters exceeded. ?/?'
  };
}
