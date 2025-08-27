import { Component, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInput } from '@angular/material/input';
import {
  MatFormField,
  MatFormFieldAppearance,
} from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatCardAppearance, MatCardModule } from '@angular/material/card';
import { debounceTime } from 'rxjs';
import {
  CurrentTextValue,
  Result,
  ResultsListType,
} from './ngx-search-bar.service';
import { MatRippleModule } from '@angular/material/core';
import { OverlayModule } from '@angular/cdk/overlay';


@Component({
  selector: 'ngx-search-bar-header-result-panel',
  imports: [MatListModule, MatRippleModule],
  template: `
    <mat-list class="results-panal" [class]="resultsListType()">
      @for (result of results(); track $index) {
      <mat-list-item
        class="result-card"
        matRipple
        (click)="emitResultsClicked(result)"
      >
        @if(result.image) {
          <img matListItemAvatar [src]="result.image"/>
        }
        <span matListItemTitle>{{ result.title }}</span>
        <span matListItemLine>{{ result.description }}</span>
      </mat-list-item>
      }
    </mat-list>
  `,
  styles: [
    `
      :host {
        .results-panal {
          position: absolute;
          width: 100%;
          max-height: 280px;
          border-radius: var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));
          color: var(--mat-sys-on-primary-container);
          background-color: var(--mat-menu-container-color, var(--mat-sys-surface-container));
          box-shadow: var(--mat-sys-level5);
          overflow-y: auto;
          .result-card {
            cursor: pointer;
          }
          .result-card:not(:last-child) {
            border-bottom: 1px solid #ccc; /* Adjust the color as needed */
          }
        }
      }
    `,
  ],
})
export class NgxSearchBarHeaderResultPanelComponent {
  results = input.required<Result[] | null>();
  resultsListType = input<ResultsListType>('list');
  resultsClicked = output<Result>();

  emitResultsClicked(result: Result) {
    this.resultsClicked.emit(result);
  }
}



@Component({
  selector: 'ngx-search-bar-header',
  imports: [
    ReactiveFormsModule,
    MatInput,
    MatFormField,
    MatCardModule,
    MatListModule,
    MatRippleModule,
    OverlayModule,
    NgxSearchBarHeaderResultPanelComponent,
  ],
  template: `
    <mat-form-field class="search-bar" [appearance]="searchBarAppearance()">
      <input
        matInput
        cdkOverlayOrigin
        class="filter-text"
        placeholder="Search..."
        #blockListTigger="cdkOverlayOrigin"
        #searchInput
        [formControl]="searchFieldCtrl"
      />
    </mat-form-field>

    <ng-template
      cdkConnectedOverlay
      (overlayOutsideClick)="openBlocks = false"
      [cdkConnectedOverlayOrigin]="blockListTigger"
      [cdkConnectedOverlayOpen]="openBlocks"
      [cdkConnectedOverlayHasBackdrop]="true"
      [cdkConnectedOverlayOffsetY]="12"
      [cdkConnectedOverlayWidth]="overlayWidth()"
      [cdkConnectedOverlayBackdropClass]="'cdk-overlay-transparent-backdrop'"
    >
      <ngx-search-bar-header-result-panel
        [results]="results()"
        [resultsListType]="resultsListType()"
        (resultsClicked)="emitResultsClicked($event)"
      ></ngx-search-bar-header-result-panel>
    </ng-template>
  `,
  styles: [
    `
      :host
        ::ng-deep
        .search-bar
        .mat-mdc-text-field-wrapper
        .mat-mdc-form-field-flex
        .mat-mdc-form-field-infix {
        padding: 12px 0;
      }
      :host ::ng-deep .search-bar .mat-mdc-text-field-wrapper {
        height: 40px;
        line-height: 0px;
      }
      :host ::ng-deep .search-bar .mat-mdc-form-field-subscript-wrapper {
        display: none;
      }
      :host {
        display: block;
        width: 100%;
        .search-bar,
        .filter-text {
          width: 100%;
          margin: 0;
          padding: 0;
        }
      }
    `,
  ],
})
export class NgxSearchBarHeaderComponent {
  searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  results = input.required<Result[] | null>();
  resultsAppearance = input<MatCardAppearance>('outlined');
  searchBarAppearance = input<MatFormFieldAppearance>('outline');
  resultsListType = input<ResultsListType>('list');

  currentTextValue = output<CurrentTextValue>();
  resultsClicked = output<Result>();

  searchFieldCtrl = new FormControl('');
  openBlocks = false;
  overlayWidth = signal('auto');

  constructor() {
    this.searchFieldCtrl.valueChanges
      .pipe(debounceTime(150), takeUntilDestroyed())
      .subscribe((value) => {
        this.openBlocks = true;
        this.currentTextValue.emit(value ?? null);
        this.updateOverlayWidth();
      });
  }

  ngAfterViewInit() {
    this.updateOverlayWidth();
  }

  updateOverlayWidth() {
    console.log(this.searchInput()!.nativeElement.offsetWidth);
    this.overlayWidth.set(`${this.searchInput()!.nativeElement.offsetWidth}px`);
  }

  emitResultsClicked(result: Result) {
    this.resultsClicked.emit(result);
    this.openBlocks = false;
  }
}
