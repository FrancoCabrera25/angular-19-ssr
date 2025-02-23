import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Country } from '../shared/interface/country.interface';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://restcountries.com/v3.1';

  constructor() {}

  getCountries(): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.apiUrl}/all`)
      .pipe(catchError(() => of([])));
  }

  searchCountriesByName(name: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.apiUrl}/name/${name}`)
      .pipe(catchError(() => of([])));
  }

  getCountryByCode(code: string): Observable<Country> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`).pipe(
      map((countries) => countries[0]),
      catchError(() => of({} as Country))
    );
  }

   getPrerenderParams() {
    return [
      { code: 'US' },
      { code: 'ES' },
      { code: 'MX' },
      { code: 'ARG' },
      { code: 'BRA' },
      { code: 'FRA' },
      { code: 'GBR' },
      { code: 'ITA' },
      { code: 'DEU' },
      { code: 'JPN' },
    ];
  }
}
