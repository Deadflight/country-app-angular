import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-page',
  imports: [RouterLink],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CountryPageComponent {
  countryCode = inject(ActivatedRoute).snapshot.params['country-code'];
  countryService = inject(CountryService);

  countryResource = rxResource({
    request: () => ({ code: this.countryCode }),
    loader: ({ request }) => {
      return this.countryService.searchCountryByCode(request.code);
    },
  });
}
