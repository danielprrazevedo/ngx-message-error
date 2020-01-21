import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMessageValidatorComponent } from './ngx-message-validator.component';
import { NgxMessageValidatorService } from './ngx-message-validator.service';



@NgModule({
  declarations: [NgxMessageValidatorComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxMessageValidatorComponent],
  providers: [NgxMessageValidatorService]
})
export class NgxMessageValidatorModule { }
