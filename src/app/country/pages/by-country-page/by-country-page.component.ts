import {
  ChangeDetectionStrategy,
  Component,
  inject,
  resource,
  signal,
} from '@angular/core';
import { ContrySearchInputComponent } from '../../components/contry-search-input/contry-search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country-page',
  imports: [ContrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ByCountryPageComponent {
  countryService = inject(CountryService);
  query = signal<string>('');

  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      const { query } = request;
      if (!query) {
        return [];
      }
      const response = await this.countryService
        .searchByCountry(query)
        .toPromise();
      return response;
    },
  });
}
