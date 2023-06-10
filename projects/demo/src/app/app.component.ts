import { Component, OnInit, Directive as  } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@()
@Directive()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  simpleForm: FormGroup;
  customMessagesForm: FormGroup;
  customValidationForm: FormGroup;

  codeSimpleForm = `this.simpleForm = this.fb.group({
  min: ['', [Validators.min(5)]],
  max: ['', [Validators.max(5)]],
  required: ['', [Validators.required]],
  email: ['', [Validators.email]],
  minlength: ['', [Validators.minLength(5)]],
  maxlength: ['', [Validators.maxLength(10)]],
});
`;
  codeCustomMessageTs = `this.customMessagesForm = this.fb.group({
  customMessage: ['', [Validators.required]],
});`;
  codeCustomMessageHtml = `<form [formGroup]="customMessagesForm">
  <fieldset>
    <legend>Custom Message Validation</legend>
    <div>
      <label>
        Custom Input:<br>
        <input formControlName="customMessage">
      </label><br>
      <ngx-message-error formControlName="customMessage" [messages]="{ required: 'My custom message' }"></ngx-message-error>
    </div>
    <button type="submit">Submit</button>
  </fieldset>
</form>`;
  codeCustomValidatorTs = `const equalTo = (value) => ((control: FormControl) => {
  if (control.value === value) return null;
  return { equalto: true };
});
this.customValidationForm = this.fb.group({
  customValidation: ['', [equalTo('myform')]],
});`;
  codeCustomValidatorHtml = `<form [formGroup]="customValidationForm">
  <fieldset>
    <legend>Custom Message Validation</legend>
    <div>
      <label>
        Custom Validation equalto (myform):<br>
        <input formControlName="customValidation">
      </label><br>
      <ngx-message-error formControlName="customValidation" [messages]="{ equalto: 'My custom validation with message' }"></ngx-message-error>
    </div>
    <button type="submit">Submit</button>
  </fieldset>
</form>`;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.simpleForm = this.fb.group({
      min: ['', [Validators.min(5)]],
      max: ['', [Validators.max(5)]],
      required: ['', [Validators.required]],
      email: ['', [Validators.email]],
      minlength: ['', [Validators.minLength(5)]],
      maxlength: ['', [Validators.maxLength(10)]],
    });
    this.customMessagesForm = this.fb.group({
      customMessage: ['', [Validators.required]],
    });
    const equalTo = (value) => ((control: FormControl) => {
      if (control.value === value) return null;
      return { equalto: true };
    });
    this.customValidationForm = this.fb.group({
      customValidation: ['', [equalTo('myform')]],
    });
  }
}
