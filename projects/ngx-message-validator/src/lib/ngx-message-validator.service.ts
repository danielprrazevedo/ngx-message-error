import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgxMessageValidatorService {
  constructor() {}

  messages = {
    min: 'Please enter a value greater than or equal to {0}.',
    max: 'Please enter a value less than or equal to {0}.',
    required: 'This field is required.',
    requiredTrue: 'This field is required.',
    email: 'Please enter a valid email address.',
    minLength: 'Please enter at least {0} characters.',
    maxLength: 'Please enter no more than {0} characters.'
  };
}
