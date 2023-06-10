import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMessageErrorComponent } from './ngx-message-error.component';
import { MessagesConfig } from './ngx-message-error.service';

@NgModule({
  declarations: [NgxMessageErrorComponent],
  imports: [CommonModule],
  exports: [NgxMessageErrorComponent],
})
export class NgxMessageErrorModule {
  static forRoot(@Optional() @SkipSelf() messages?: MessagesConfig): ModuleWithProviders<NgxMessageErrorModule> {
    return {
      ngModule: NgxMessageErrorModule,
      providers: [{ provide: MessagesConfig, useValue: messages }],
    };
  }
}
