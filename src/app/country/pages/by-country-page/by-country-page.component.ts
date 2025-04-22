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
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom, Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [ContrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ByCountryPageComponent {
  countryService = inject(CountryService);

  router = inject(Router);

  activatedRoute = inject(ActivatedRoute);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = signal<string>(this.queryParam);

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      const { query } = request;

      if (!query) {
        return of([]);
      }

      this.router.navigate([], {
        queryParams: { query: query },
        queryParamsHandling: 'merge',
      });

      return this.countryService.searchByCountry(query);
    },
  });

  // countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async ({ request }) => {
  //     const { query } = request;
  //     if (!query) {
  //       return [];
  //     }
  //     const response = await firstValueFrom(
  //       this.countryService.searchByCountry(query)
  //     );

  //     return response;
  //   },
  // });
}
