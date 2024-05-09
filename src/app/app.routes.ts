import { Routes } from '@angular/router';
import { EditCountryComponent } from './edit-country/edit-country.component';
import { AppComponent } from './app.component';
import { CountryComponent } from './country/country.component';

export const routes: Routes = [
  { path: '', component: CountryComponent },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./edit-country/edit-country.component').then(
        (c) => c.EditCountryComponent
      ),
  },
];
