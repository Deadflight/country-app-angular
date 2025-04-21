import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ContrySearchInputComponent } from '../../components/contry-search-input/contry-search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { ICountry } from '../../interfaces/country.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [ContrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);

  query = signal<string>('');

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      const { query } = request;

      if (!query) {
        return of([]);
      }

      return this.countryService.searchByCapital(query);
    },
  });

  // countries = signal<ICountry[]>([]);
  // isLoading = signal(false);
  // isError = signal<string | null>(null);

  // onSearchByCapital(capital: string) {
  //   if (this.isLoading()) {
  //     return;
  //   }

  //   this.isLoading.set(true);
  //   this.isError.set(null);
  //   const response = this.countryService.searchByCapital(capital);
  //   response.subscribe({
  //     next: (countries) => {
  //       this.countries.set(countries);
  //       this.isLoading.set(false);
  //     },
  //     error: (error) => {
  //       this.isLoading.set(false);
  //       this.isError.set(error.message);
  //       this.countries.set([]);
  //     },
  //     complete: () => {
  //       this.isLoading.set(false);
  //     },
  //   });
  // }
}
