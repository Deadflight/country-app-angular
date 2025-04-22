import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'contry-search-input',
  imports: [],
  templateUrl: './contry-search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContrySearchInputComponent {
  placeHolder = input.required<string>();
  debounceTIme = input<number>(500);
  initialValue = input<string>('');

  search = output<string>();

  inputValue = linkedSignal<string>(() => this.initialValue());

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.onSearchCountry(value);
    }, this.debounceTIme());

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });

  onSearchCountry(searchTerm: string) {
    this.search.emit(searchTerm);
  }
}
