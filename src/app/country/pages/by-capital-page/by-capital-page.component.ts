import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContrySearchInputComponent } from "../../components/contry-search-input/contry-search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";

@Component({
  selector: 'app-by-capital-page',
  imports: [ContrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {
  onSearchByCapital(capital: string) {
    console.log('ByCapitalPageComponent: ', capital);
  }
}
