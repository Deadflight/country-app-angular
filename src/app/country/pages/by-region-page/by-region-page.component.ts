import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { Region } from '../../interfaces/regions.interface';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ByRegionPageComponent {
  countryService = inject(CountryService);
  selectedRegion = signal<Region>('Africa');

  countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      const { region } = request;

      if (!region) {
        return of([]);
      }

      return this.countryService.searchByRegion(region);
    },
  });

  onSearchByRegion(region: string) {
    this.selectedRegion.set(region as Region);
  }
}
