import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { AppService } from '../services/app.service';
import { NgxSearchBarComponent } from 'ngx-search-bar';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-document',
  imports: [AsyncPipe, MatCard, MatCardContent, NgxSearchBarComponent],
  template: `
    <mat-card appearance="outlined">
      <mat-card-content>
        <ngx-search-bar
          [results]="appService.marshalledUsersInToSearchResults$ | async"
          (currentTextValue)="someFunction($event)"
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

  someFunction(event: string) {
    lastValueFrom(this.appService.filterUser(event));
  }
}
