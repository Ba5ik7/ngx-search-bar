import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { AppService } from '../services/app.service';
import { NgxSearchBarComponent } from 'ngx-search-bar';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-document',
  imports: [
    AsyncPipe,
    JsonPipe,
    MatCard,
    MatCardContent,
    NgxSearchBarComponent,
  ],
  template: `
    <mat-card appearance="outlined">
      <mat-card-content>
        <ngx-search-bar></ngx-search-bar>
        @if (appService.usersResponse$ | async; as usersResponse) {
        <pre><code>{{ usersResponse | json }}</code></pre>
        }
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
}
