import { createAction, props } from '@ngrx/store';
import { ICountry } from '../../../models/country.model';

export const loadCountry = createAction('[Country Component] loadCountry');
export const loadCountrySuccess = createAction(
  '[Country Component] loadCountrySuccess',
  props<{ countries: ICountry[] }>()
);
export const loadCountryFailed = createAction(
  '[Country Component] loadCountryFailed',
  props<{ errorMessage: string }>()
);
