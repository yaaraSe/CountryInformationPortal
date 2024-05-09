import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICountry } from '../../models/country.model';
import { AppState } from '../states/app.state';
import { Store, select } from '@ngrx/store';
import { selectAllCountries } from '../states/country/country.selector';
import * as CountryActions from '../states/country/country.action';
import * as countrySelectors from '../states/country/country.selector';
import { CountryApiService } from '../../services/country.service';
import { NAME_VALIDATION } from '../common/CommonConstants';

@Component({
  selector: 'app-edit-country',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.scss'],
})
export class EditCountryComponent implements OnInit {
  countryId: string = '';
  countryForm!: FormGroup;
  countries$!: Observable<ICountry[]>;
  selectedCountry!: ICountry | undefined;
  private api = inject(CountryApiService);
  NAME_VALIDATION: string = NAME_VALIDATION;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.store.dispatch(CountryActions.loadCountry());
    this.countries$! = this.store.select(countrySelectors.selectAllCountries);
    this.countryForm = this.fb.group({
      name: [''],
      capital: ['', Validators.required],
      region: [''],
      subRegion: [''],
      population: ['', [Validators.required, Validators.min(0)]], // Required and min value validation for population field
      flags: [''],
    });
  }

  ngOnInit() {
    this.countryForm.get('name')?.disable();
    this.countryForm.get('region')?.disable();
    this.countryForm.get('subRegion')?.disable();

    this.getSelectedCountry();
  }

  private getSelectedCountry() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.countryId = id;
        console.log('Country ID:', this.countryId);
        this.countries$.subscribe((countries) => {
          this.selectedCountry = countries.find(
            (country) => country.id === this.countryId
          );
          console.log('Selected Country:', this.selectedCountry);
          if (this.selectedCountry) {
            this.countryForm.patchValue({
              name: this.selectedCountry.name.common,
              capital: this.selectedCountry.capital,
              region: this.selectedCountry.region,
              subRegion: this.selectedCountry?.subRegion,
              population: this.selectedCountry?.population,
              flags: this.selectedCountry?.flags,
            });
          }
        });
      }
    });
  }

  editCountry(updatedCountry: ICountry) {
    console.log('first');
    console.log(this.countryId);
    updatedCountry.name = { official: 'ddd', common: 'cc' };
    updatedCountry.flags = { png: 'ff', svg: 'ff', alt: 'ff' };
    updatedCountry.id = this.countryId;
    this.api.updateCountry(this.countryId, updatedCountry).subscribe(
      (response: any) => {
        console.log('Country updated successfully:', response);
      },
      (error: any) => {
        console.error('Error updating country:', error);
      }
    );
  }
}
