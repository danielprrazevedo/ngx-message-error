import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  HighlightModule,
  provideHighlightOptions
} from 'ngx-highlightjs';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgxMessageErrorModule } from 'projects/ngx-message-error/src/public-api';
import { ReactiveFormsModule } from '@angular/forms';

// import hljs from 'highlight.js';
// document.defaultView['hljs'] = hljs;
// import 'highlightjs-line-numbers.js';

export function getHighlightLanguages() {
  return {
    typescript: () => import('highlight.js/lib/languages/typescript'),
    css: () => import('highlight.js/lib/languages/css'),
    xml: () => import('highlight.js/lib/languages/xml'),
  };
}

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgxMessageErrorModule.forRoot(),
    HighlightModule,
  ],
  providers: [
    provideHighlightOptions({
      lineNumbersOptions: {singleLine: true},
      lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        css: () => import('highlight.js/lib/languages/css'),
        xml: () => import('highlight.js/lib/languages/xml')
      },
      themePath: 'assets/styles/androidstudio.css'
    }),
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
