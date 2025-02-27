import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { AppService } from '../services/app.service';
import { CurrentTextValue, NgxSearchBarComponent, Result } from 'ngx-search-bar';
import { AsyncPipe } from '@angular/common';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-document',
  imports: [AsyncPipe, MatCard, MatCardContent, NgxSearchBarComponent],
  template: `
    <mat-card appearance="outlined">
      <mat-card-content>
        <ngx-search-bar
          [resultsAppearance]="appService.outlined()"
          [searchBarAppearance]="appService.outline()"
          [resultsListType]="appService.grid()"
          [results]="appService.marshalledUsersInToSearchResults$ | async"
          (currentTextValue)="currentTextValueChanged($event)"
          (resultsClicked)="resultClicked($event)"
        ></ngx-search-bar>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      @use '@angular/material' as mat;
      :host {
        @include mat.card-overrides(
          (
            outlined-outline-width: 0.5px,
            outlined-container-color: var(--mat-sys-surface-container-low),
            outlined-outline-color: var(--mat-sys-on-surface),
          )
        );
      }
    `,
  ],
})
export class DocumentComponent {
  appService = inject(AppService);

  currentTextValueChanged(event: CurrentTextValue) {
    event && lastValueFrom(this.appService.filterUser(event));
  }

  resultClicked(event: Result) {
    console.table(event);
  }
}
