# ngx-message-error

The component's purpose is to encapsulate the message display logic for form validations made with `ReactiveForms`.

## Installation

```
npm i ngx-message-error
```

## Styling

The component uses CSS custom properties (CSS variables) for styling, making it easy to customize the appearance. You can override these variables globally or target specific instances:

### Available CSS Custom Properties

- `--message-error-color`: Controls the text color of error messages (default: `#a94442`)
- `--message-error-font-size`: Controls the font size of error messages (default: `12px`)

### Global Styling

To style all error messages globally, add the following to your global styles:

```css
:root {
  --message-error-color: #dc3545; /* Bootstrap danger color */
  --message-error-font-size: 14px;
}
```

### Component-specific Styling

To style error messages for specific components or sections:

```css
.my-form {
  --message-error-color: #e74c3c;
  --message-error-font-size: 13px;
}
```

### Custom CSS Classes

You can also target the component directly with CSS:

```css
ngx-message-error .danger {
  color: #ff0000;
  font-weight: bold;
  margin-top: 5px;
}

ngx-message-error div {
  font-family: 'Arial', sans-serif;
  line-height: 1.4;
}
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

## Release automation

Publishing to npm is handled by a GitHub Actions workflow that runs whenever a Git tag that starts with `v` (for example, `v20.0.1`) is pushed. The workflow will:

- run `npm ci` and build the library with `npm run build ngx-message-error`
- verify the tag matches the version field in `projects/ngx-message-error/package.json`
- publish the contents of `dist/ngx-message-error` to npm

To enable publishing, add an `NPM_TOKEN` secret to the repository settings containing an npm access token with publish rights for `ngx-message-error`. To release a new version, bump the version in `projects/ngx-message-error/package.json`, commit the change, create a matching tag (`git tag v<version>`), and push it (`git push origin v<version>`).
