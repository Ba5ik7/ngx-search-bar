import { Component, input, output } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounce, debounceTime, of } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'ngx-search-bar',
  imports: [MatInput, MatFormField, ReactiveFormsModule, JsonPipe],
  template: `
    <mat-form-field class="example-full-width">
      <input
        class="filter-text"
        matInput
        [formControl]="searchFieldCtrl"
        [autofocus]="true"
      />
    </mat-form-field>
    <pre><code>{{ results() | json }}</code></pre>
  `,
  styles: ``,
})
export class NgxSearchBarComponent {
  results = input();
  currentTextValue = output<string>();

  searchFieldCtrl = new FormControl('');

  constructor() {
    this.searchFieldCtrl.valueChanges
      .pipe(debounceTime(150), takeUntilDestroyed())
      .subscribe((value) => {
        this.currentTextValue.emit(value ?? '');
      });
  }
}
