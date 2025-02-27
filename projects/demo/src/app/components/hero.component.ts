import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AppService } from '../services/app.service';
import { MatTooltip } from '@angular/material/tooltip';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-hero',
  imports: [MatButton, MatTooltip],
  template: `
    <header class="header-background">
      <div class="header-section">
        <div class="header-headline">
          <h1>Ngx SearchBar</h1>
          <h2>A Custom Themeable Angular Material 3 Component</h2>
        </div>
        <div class="header-start">
          <button
            mat-stroked-button
            matTooltip="Open the console for blocks"
            (click)="saveValue()"
          >
            Get Users
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      @use '@angular/material' as mat;

      :host {
        width: 100%;
        @include mat.button-overrides(
          (
            outlined-label-text-color: var(--mat-sys-on-secondary),
          )
        );
        .header-background {
          overflow: hidden;
          position: relative;
          height: 360px;
          color: var(--mat-sys-on-secondary);
          background: var(--mat-sys-secondary);
          &::before {
            content: '';
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="%23FFFFFF"><path d="M14.5 40V13H4V8h26v5H19.5v27Zm18 0V23H26v-5h18v5h-6.5v17Z"/></svg>');
            background-repeat: no-repeat;
            background-size: 400px;
            background-position: 80% -25px;
            opacity: 0.2;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
          }
        }
        .header-section {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          height: 100%;
          text-align: center;
          .header-headline {
            h1 {
              font-size: 56px;
              font-weight: bold;
              line-height: 56px;
              margin: 15px 5px;
            }
            h2 {
              font-size: 20px;
              font-weight: 300;
              line-height: 28px;
              margin: 15px 0 25px 0;
            }
          }
          .header-start {
            display: flex;
            flex-direction: row;
            gap: 10px;
            button {
              margin: 0 5px;
            }
          }
        }
      }
    `,
  ],
})
export class HeroComponent {
  appService = inject(AppService);

  saveValue() {
    lastValueFrom(
      this.appService.fetchUsers()
    )
  }
}
