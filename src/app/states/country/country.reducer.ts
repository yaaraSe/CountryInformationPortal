import { createReducer, on } from '@ngrx/store';
import * as CountryActions from './country.action';
import { ICountry } from '../../../models/country.model';

export interface CountryState {
  countries: ICountry[];
  error: string | null;
}
export const initialCountryState: CountryState = {
  countries: [],
  error: null,
};

export const CountryReducer = createReducer(
  initialCountryState,
  // eslint-disable-next-line @ngrx/on-function-explicit-return-type
  on(CountryActions.loadCountrySuccess, (state, { countries }) => ({
    ...state,
    countries,
    error: null,
  })),
  on(CountryActions.loadCountryFailed, (state, { errorMessage }) => ({
    ...state,
    error: errorMessage.toString(),
  }))
);
