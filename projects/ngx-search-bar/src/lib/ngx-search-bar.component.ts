import { Component, input, output } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardModule } from '@angular/material/card';

export interface Result {
  title: string;
  description: string;
  image?: string;
}

@Component({
  selector: 'ngx-search-bar',
  imports: [ReactiveFormsModule, MatInput, MatFormField, MatCardModule],
  template: `
    <mat-form-field class="search-bar">
      <input
        class="filter-text"
        matInput
        placeholder="Search..."
        [formControl]="searchFieldCtrl"
        [autofocus]="true"
      />
    </mat-form-field>
    <!-- <pre><code>{{ results() | json }}</code></pre> -->
    <div class="results-panal">
      @for (result of results(); track $index) {
      <mat-card class="result-card" appearance="outlined">
        <mat-card-header>
          <img mat-card-avatar [src]="result.image" />
          <mat-card-title>{{ result.title }}</mat-card-title>
          <mat-card-subtitle>{{ result.description }}</mat-card-subtitle>
        </mat-card-header>
      </mat-card>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        pointer: cursor;
        .search-bar {
          width: 100%;
        }
        .results-panal {
          display: flex;
          flex-direction: column;
          gap: 1rem;
      }
    }
    `,
  ],
})
export class NgxSearchBarComponent {
  results = input.required<Result[] | null>();

  currentTextValue = output<string>();
  resultsClicked = output<Result>();

  searchFieldCtrl = new FormControl('');

  constructor() {
    this.searchFieldCtrl.valueChanges
      .pipe(debounceTime(150), takeUntilDestroyed())
      .subscribe((value) => {
        this.currentTextValue.emit(value ?? '');
      });
  }
}
