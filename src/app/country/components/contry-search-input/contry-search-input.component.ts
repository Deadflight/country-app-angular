import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'contry-search-input',
  imports: [],
  templateUrl: './contry-search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContrySearchInputComponent {
  placeHolder = input.required<string>();

  search = output<string>();

  onSearchCountry(searchTerm: string) {
    this.search.emit(searchTerm);
  }
}
