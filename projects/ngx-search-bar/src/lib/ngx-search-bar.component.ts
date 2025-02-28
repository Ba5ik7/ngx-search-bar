import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInput } from '@angular/material/input';
import {
  MatFormField,
  MatFormFieldAppearance,
} from '@angular/material/form-field';
import { MatCardAppearance, MatCardModule } from '@angular/material/card';
import { debounceTime } from 'rxjs';
import {
  CurrentTextValue,
  Result,
  ResultsListType,
} from './ngx-search-bar.service';

@Component({
  selector: 'ngx-search-bar',
  imports: [ReactiveFormsModule, MatInput, MatFormField, MatCardModule],
  template: `
    <mat-form-field class="search-bar" [appearance]="searchBarAppearance()">
      <input
        class="filter-text"
        matInput
        placeholder="Search..."
        [formControl]="searchFieldCtrl"
      />
    </mat-form-field>
    <div class="results-panal" [class]="resultsListType()">
      @for (result of results(); track $index) {
      <mat-card
        class="result-card"
        [appearance]="resultsAppearance()"
        (click)="resultsClicked.emit(result)"
      >
        <mat-card-header>
          @if (result.image) {
          <img mat-card-avatar [src]="result.image" />
          }
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
        .search-bar {
          width: 100%;
        }
        .results-panal {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          .result-card {
            cursor: pointer;
          }
          mat-card-subtitle {
            margin-bottom: 17px;
          }
        }
        .results-panal.grid {
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          .result-card {
            max-width: 350px;
          }
        }
      }
    `,
  ],
})
export class NgxSearchBarComponent {
  results = input.required<Result[] | null>();
  resultsAppearance = input<MatCardAppearance>('outlined');
  searchBarAppearance = input<MatFormFieldAppearance>('outline');
  resultsListType = input<ResultsListType>('list');

  currentTextValue = output<CurrentTextValue>();
  resultsClicked = output<Result>();

  searchFieldCtrl = new FormControl('');

  constructor() {
    this.searchFieldCtrl.valueChanges
      .pipe(debounceTime(150), takeUntilDestroyed())
      .subscribe((value) => {
        this.currentTextValue.emit(value ?? null);
      });
  }
}
