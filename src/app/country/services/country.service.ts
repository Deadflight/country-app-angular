import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ICountryByCapital } from '../interfaces/country.service.interfaces';
import { ICountry } from '../interfaces/country.interface';
import { map, Observable, tap } from 'rxjs';
import { CountryMapper } from '../mapper/country.mapper';

const COUNTRY_API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string) {
    query = query.toLowerCase();

    const response: Observable<ICountry[]> = this.http
      .get<ICountryByCapital[]>(`${COUNTRY_API_URL}/capital/${query}`)
      .pipe(
        map((response: ICountryByCapital[]) => {
          const countries =
            CountryMapper.mapCountryResponseArrayToCountryToArray(response);

          return countries;
        })
      );

    return response;
  }
}
