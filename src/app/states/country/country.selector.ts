import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountryState } from './country.reducer';

export const selectCountryFeature =
  createFeatureSelector<CountryState>('country');
  
export const selectAllCountries = createSelector(
  selectCountryFeature,
  (state: CountryState) => state.countries
);

export const selectCountryFail = createSelector(
  selectCountryFeature,
  (state: CountryState) => state.error
);
