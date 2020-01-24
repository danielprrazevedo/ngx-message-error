import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMessageErrorComponent } from './ngx-message-error.component';
import { NgxMessageErrorService, MessagesConfig } from './ngx-message-error.service';

@NgModule({
  declarations: [NgxMessageErrorComponent],
  imports: [CommonModule],
  exports: [NgxMessageErrorComponent],
  providers: [NgxMessageErrorService]
})
export class NgxMessageErrorModule {
  static config(messages: MessagesConfig): ModuleWithProviders {
    return {
      ngModule: NgxMessageErrorModule,
      providers: [
        {provide: MessagesConfig, useValue: messages }
      ]
    };
  }
}
