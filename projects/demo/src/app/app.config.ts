import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  // provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
    // provideExperimentalZonelessChangeDetection(),
  ],
};
