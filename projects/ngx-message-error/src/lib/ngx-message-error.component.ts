import {
  Component,
  OnInit,
  Input,
  Optional,
  Host,
  SkipSelf,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  AbstractControl,
  FormGroupDirective,
  ControlValueAccessor,
} from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import {
  NgxMessageErrorService,
  MessagesConfig,
} from './ngx-message-error.service';

@Component({
  selector: 'ngx-message-error',
  template: `
    @if (erro) {
    <div
      class="danger"
      animate.enter="enter-animation"
      animate.leave="leave-animation"
      [innerHTML]="erro"
    ></div>
    }
  `,
  styles: [
    `
      div {
        font-size: var(--message-error-font-size, 12px);
      }
      .danger {
        color: var(--message-error-color, #a94442);
      }
      .enter-animation {
        animation: enterAnimation 0.3s;
      }
      @keyframes enterAnimation {
        from {
          transform: translateY(-5px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      .leave-animation {
        animation: leaveAnimation 0.3s;
      }
      @keyframes leaveAnimation {
        from {
          transform: translateY(0);
          opacity: 1;
        }
        to {
          transform: translateY(-5px);
          opacity: 0;
        }
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NgxMessageErrorComponent,
      multi: true,
    },
  ],
  standalone: false,
})
export class NgxMessageErrorComponent implements ControlValueAccessor, OnInit {
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
      this.changed.forEach((f) => f(value));
    }
  }

  touch() {
    this.touched.forEach((f) => f());
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
    if (
      this.control.invalid &&
      (this.control.touched ||
        this.control.dirty ||
        this.controlContainer.touched)
    ) {
      return this.buildMessage();
    }
    return '';
  }

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: FormGroupDirective,
    private service: NgxMessageErrorService
  ) {}

  private buildMessage() {
    const keysErrors = Object.keys(this.control.errors);
    if (keysErrors.length > 0) {
      const keysMessages = Object.keys(this.messages);
      const keyMessage = keysMessages.filter((key) => key === keysErrors[0]);
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
    const auxMessages = this.service.messages;
    this.messages = { ...auxMessages, ...this.messages };
    if (this.controlContainer) {
      if (this.formControlName) {
        this.control = this.controlContainer.control.get(this.formControlName);
      } else {
        console.warn(
          'Missing FormControlName directive from host element of the component'
        );
      }
    } else {
      console.warn("Can't find parent FormGroup directive");
    }
  }
}
