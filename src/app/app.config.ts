import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { CountryReducer } from './states/country/country.reducer';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { CountryEffect } from './states/country/country.effect';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideState({ name: 'country', reducer: CountryReducer }),
    provideHttpClient(),
    provideEffects(CountryEffect), provideAnimationsAsync(),
  ],
};
