import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CountryActions from './country.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { CountryApiService } from '../../../services/country.service';

@Injectable()
export class CountryEffect {
  private api = inject(CountryApiService);
  action$ = inject(Actions);

  loadCountries$ = createEffect(() => {
    return this.action$.pipe(
      ofType(CountryActions.loadCountry),
      switchMap(() =>
        this.api.getCountries().pipe(
          map((res) => CountryActions.loadCountrySuccess({ countries: res })),
          catchError((error: { message: string }) =>
            of(
              CountryActions.loadCountryFailed({
                errorMessage: error + ': fail to load countries',
              })
            )
          )
        )
      )
    );
  });
}
