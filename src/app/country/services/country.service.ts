import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ICountryByCapital } from '../interfaces/country.service.interfaces';
import { ICountry } from '../interfaces/country.interface';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { CountryMapper } from '../mapper/country.mapper';

const COUNTRY_API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, ICountry[]>();
  private queryCacheCountry = new Map<string, ICountry[]>();

  searchByCapital(query: string) {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query));
    }

    const response: Observable<ICountry[]> = this.http
      .get<ICountryByCapital[]>(`${COUNTRY_API_URL}/capital/${query}`)
      .pipe(
        map((response: ICountryByCapital[]) => {
          const countries =
            CountryMapper.mapCountryResponseArrayToCountryToArray(response);

          return countries;
        }),
        tap((countries) => {
          this.queryCacheCapital.set(query, countries);
        }),
        catchError((error) => {
          console.error('Error fetching countries by capital:', error);
          const errResponse = error as HttpErrorResponse;
          return throwError(() => new Error(errResponse.message));
        })
      );

    return response;
  }

  searchByCountry(query: string) {
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query));
    }

    const response: Observable<ICountry[]> = this.http
      .get<ICountryByCapital[]>(`${COUNTRY_API_URL}/name/${query}`)
      .pipe(
        delay(3000),
        map((response: ICountryByCapital[]) => {
          const countries =
            CountryMapper.mapCountryResponseArrayToCountryToArray(response);

          return countries;
        }),
        tap((countries) => {
          this.queryCacheCountry.set(query, countries);
        }),
        catchError((error) => {
          console.error('Error fetching countries by country:', error);
          const errResponse = error as HttpErrorResponse;
          return throwError(() => new Error(errResponse.message));
        })
      );

    return response;
  }

  searchCountryByCode(code: string) {
    const response: Observable<ICountry | undefined> = this.http
      .get<ICountryByCapital[]>(`${COUNTRY_API_URL}/alpha/${code}`)
      .pipe(
        map((response: ICountryByCapital[]) => {
          const countries =
            CountryMapper.mapCountryResponseArrayToCountryToArray(response);

          return countries;
        }),
        map((countries) => countries.at(0)),
        catchError((error) => {
          console.error('Error fetching countries by code:', error);
          const errResponse = error as HttpErrorResponse;
          return throwError(() => new Error(errResponse.message));
        })
      );

    return response;
  }
}
