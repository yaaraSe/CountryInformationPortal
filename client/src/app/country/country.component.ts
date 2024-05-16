import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CountryApiService } from '../../services/country.service';
import * as CountryActions from './../states/country/country.action';
import * as CountrySelector from './../states/country/country.selector';

import { ICountry } from '../../models/country.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { AsyncPipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [AsyncPipe, MatTableModule, MatPaginatorModule, MatIconModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent implements OnInit {
  countries$!: Observable<ICountry[]>;
  error$!: Observable<string | null>;
  displayedColumns: string[] = [
    'name',
    'capital',
    'region',
    'subRegion',
    'population',
    'edit',
  ];
  dataSource: MatTableDataSource<ICountry>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store<AppState>, private router: Router) {
    this.store.dispatch(CountryActions.loadCountry());
    this.countries$! = this.store.select(CountrySelector.selectAllCountries);
    this.error$! = this.store.select(CountrySelector.selectCountryFail);
    this.dataSource = new MatTableDataSource<ICountry>();
  }

  ngOnInit() {
    this.countries$.subscribe((countries) => {
      this.dataSource.data = countries;
      this.dataSource.paginator = this.paginator;
    });
  }
  navigateToEditPage(id: string) {
    this.router.navigate(['/edit', id]);
  }
}
