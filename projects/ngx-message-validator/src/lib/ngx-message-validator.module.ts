import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMessageValidatorComponent } from './ngx-message-validator.component';
import { NgxMessageValidatorService, MessagesConfig } from './ngx-message-validator.service';

@NgModule({
  declarations: [NgxMessageValidatorComponent],
  imports: [CommonModule],
  exports: [NgxMessageValidatorComponent],
  providers: [NgxMessageValidatorService]
})
export class NgxMessageValidatorModule {
  static forRoot(messages: MessagesConfig): ModuleWithProviders {
    return {
      ngModule: NgxMessageValidatorModule,
      providers: [
        {provide: MessagesConfig, useValue: messages }
      ]
    };
  }
}
