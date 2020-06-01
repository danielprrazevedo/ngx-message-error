# ngx-message-error

The component's purpose is to encapsulate the message display logic for form validations made with `ReactiveForms`.

## Installation

```
npm i ngx-message-error
```

### Requirements

````
@angular/animations
````
In `app.module.ts`
``` typescript
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
...
@NgModule({
  imports: [
    ...
    BrowserAnimationsModule
  ]
})
```

## Usage

In `app.module.ts`
``` typescript
import { NgxMessageErrorModule, MessagesConfig } from 'ngx-message-error';

/**
 * the customMessages is optional
 * here you will define the default messages for your application,
 * if you use a library with extra validations, you can define the keys here
 */
const customMessages: MessagesConfig = {
  ...
}

...
@NgModule({
  imports: [
    ...
    NgxMessageErrorModule.forRoot(customMessages)
  ]
})
```

NOTE #

for min and max validations, the character `?` will be like a wildcard for a replace of the value indicated in the Validator
Ex:
``` typescript
Validator.min(5)
message = 'my min message (?)' // result: my min message (5)
```
for minLength and maxLength validations, the first character `?` will be used for the length of the form and the second will be used as a wildcard for a replace of the value indicated in the Validator
Ex:
``` typescript
Validator.maxLength(5)
message = 'my minLength message (?/?)'
control.value = 'my control value' // my minLength message (16/5)
```

In component:
``` typescript
constructor(private fb: FormBuilder) {}

ngOnInit() {
  this.myForm = this.fb.group({
    requiredInput: ['', [Validators.required]]
  });
}
```
``` html
<form [formGroup]="myForm">
  <fieldset>
    <legend>Custom Message Validation</legend>
    <div>
      <label>
        Custom Validation:<br>
        <input formControlName="requiredInput">
      </label><br>
      <ngx-message-error formControlName="requiredInput"></ngx-message-error>
    </div>
    <button type="submit">Submit</button>
  </fieldset>
</form>
```
With custom validator
``` typescript
constructor(private fb: FormBuilder) {}

ngOnInit() {
  const equalTo = (value) => ((control: FormControl) => {
    if (control.value === value) return null;
    return { equalto: true };
  });
  this.myForm = this.fb.group({
    customValidation: ['', [equalTo('myform')]],
  });
}
```
``` html
<form [formGroup]="myForm">
  <fieldset>
    <legend>Custom Message Validation</legend>
    <div>
      <label>
        Custom Validation equalto (myform):<br>
        <input formControlName="customValidation">
      </label><br>
      <ngx-message-error formControlName="customValidation"
        [messages]="{ equalto: 'My custom validation with message' }"></ngx-message-error>
    </div>
    <button type="submit">Submit</button>
  </fieldset>
</form>
```