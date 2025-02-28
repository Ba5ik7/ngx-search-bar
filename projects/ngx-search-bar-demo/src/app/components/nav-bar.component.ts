import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemePickerComponent } from './theme-picker.component';
import {
  CurrentTextValue,
  NgxSearchBarHeaderComponent,
  Result,
} from 'ngx-search-bar';
import { AppService } from '../services/app.service';
import { lastValueFrom } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [
    AsyncPipe,
    MatIcon,
    MatButtonModule,
    ThemePickerComponent,
    NgxSearchBarHeaderComponent,
  ],
  template: `
    <nav class="docs-navbar-header">
      <a
        mat-button
        href="https://github.com/Ba5ik7/ngx-editor-js2-blocks"
        target="_blank"
      >
        <mat-icon>search</mat-icon>Ngx SearchBar
      </a>
      <div class="flex-spacer"></div>
      <ngx-search-bar-header
        [resultsAppearance]="appService.outlined()"
        [searchBarAppearance]="appService.outline()"
        [resultsListType]="appService.grid()"
        [results]="appService.marshalledUsersInToSearchResults$ | async"
        (currentTextValue)="currentTextValueChanged($event)"
        (resultsClicked)="resultClicked($event)"
      ></ngx-search-bar-header>
      <app-theme-picker></app-theme-picker>
    </nav>
  `,
  styles: [
    `
      :host {
        color: var(--mat-sys-on-primary-container);
        background-color: var(--mat-sys-primary-container);
        box-shadow: var(--mat-sys-level5);
        .docs-navbar-header {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding: 0.5em 1em;
          mat-icon {
            font-size: 2rem;
            width: 2rem;
            height: 2rem;
            margin: 0 0.1em 0.1875em 0;
            vertical-align: middle;
          }

          ngx-search-bar-header {
            max-width: 360px;
           padding: 0 1em;
          }
        }
      }
    `,
  ],
})
export class NavBarComponent {
  appService = inject(AppService);

  currentTextValueChanged(event: CurrentTextValue) {
    event && lastValueFrom(this.appService.filterUser(event));
  }

  resultClicked(event: Result) {
    console.table(event);
  }
}
