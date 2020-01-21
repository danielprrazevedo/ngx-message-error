import { Component, OnInit, Input, Optional, Host, SkipSelf } from '@angular/core';
import { NG_VALUE_ACCESSOR, AbstractControl, FormGroupDirective, ControlValueAccessor } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgxMessageValidatorService, MessagesConfig } from './ngx-message-validator.service';

@Component({
  selector: 'ngx-message-validator',
  template: `
    <div *ngIf="erro" class="danger" [@enterAnimation]="erro">
      {{ erro }}
    </div>
  `,
  styles: [
    'div { font-size: 12px; }',
    '.danger { color: red; }'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NgxMessageValidatorComponent,
    multi: true
  }],
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-5px)', opacity: 0 }),
        animate('300ms', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('300ms', style({ transform: 'translateY(-5px)', opacity: 0 })),
      ])
    ]
    )
  ]
})
export class NgxMessageValidatorComponent implements ControlValueAccessor, OnInit {
  @Input() messages: MessagesConfig = {};
  @Input() formControlName: string;
  protected innerValue;
  private changed = new Array<(value) => void>();
  private touched = new Array<() => void>();
  private innerControl: AbstractControl;

  get value() {
    return this.innerValue;
  }

  set value(value) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changed.forEach(f => f(value));
    }
  }

  touch() {
    this.touched.forEach(f => f());
  }

  writeValue(value) {
    this.innerValue = value;
  }

  registerOnChange(fn: (value) => void) {
    this.changed.push(fn);
  }

  registerOnTouched(fn: () => void) {
    this.touched.push(fn);
  }

  public get control() {
    return this.innerControl;
  }

  public set control(c: AbstractControl) {
    this.innerControl = c;
  }

  public get erro() {
    if (this.control.invalid && (this.control.touched || this.control.dirty || this.controlContainer.submitted)) {
      return this.buildMessage();
    }
    return '';
  }

  constructor(
    @Optional() @Host() @SkipSelf()
    private controlContainer: FormGroupDirective,
    private service: NgxMessageValidatorService
  ) {
    const auxMessages = this.service.messages;
    this.messages = Object.assign(auxMessages, this.messages);
  }

  private buildMessage() {
    const keysErrors = Object.keys(this.control.errors);
    if (keysErrors.length > 0) {
      const keysMessages = Object.keys(this.messages);
      const keyMessage = keysMessages.filter(key => key === keysErrors[0]);
      if (keyMessage.length > 0) {
        let message = this.messages[keyMessage[0]];
        if (keyMessage[0] === 'maxlength') {
          const max = this.control.errors.maxlength;
          message = message.replace('?', max.actualLength);
          message = message.replace('?', max.requiredLength);
        } else if (keyMessage[0] === 'minlength') {
          const max = this.control.errors.minlength;
          message = message.replace('?', max.actualLength);
          message = message.replace('?', max.requiredLength);
        } else if (keyMessage[0] === 'min') {
          const minError = this.control.errors.min;
          message = message.replace('?', minError.min);
        } else if (keyMessage[0] === 'max') {
          const maxError = this.control.errors.max;
          message = message.replace('?', maxError.max);
        }
        return message;
      }
    }
    return '';
  }

  ngOnInit() {
    if (this.controlContainer) {
      if (this.formControlName) {
        this.control = this.controlContainer.control.get(this.formControlName);
      } else {
        console.warn('Missing FormControlName directive from host element of the component');
      }
    } else {
      console.warn('Can\'t find parent FormGroup directive');
    }
  }
}
