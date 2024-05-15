import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICountry } from '../models/country.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryApiService {
  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http
      .get<ICountry[]>('https://localhost:7160/api/Country')
      .pipe();
  }
  // updateCountry(
  //   countryId: string,
  //   updatedCountry: ICountry
  // ): Observable<ICountry> {
  //   const url = `https://localhost:7160/api/Country/${countryId}`;
  //   return this.http.put<ICountry>(url, updatedCountry);
  // }
}
