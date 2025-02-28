import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AppService } from '../services/app.service';
import { MatTooltip } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  imports: [MatButton, MatTooltip, MatSlideToggleModule, FormsModule],
  template: `
    <header class="header-background">
      <div class="header-section">
        <div class="header-headline">
          <h1>Ngx SearchBar</h1>
          <h2>A Custom Themeable Angular Material 3 Component</h2>
        </div>
        <div class="header-actions">
          <div class="search-style-options">
            <mat-slide-toggle [(ngModel)]="appService.outlineToggle" labelPosition="before"
              >Search Bar Appearance</mat-slide-toggle
            >
            <mat-slide-toggle [(ngModel)]="appService.outlinedToggle" labelPosition="before"
              >Results Appearance</mat-slide-toggle
            >
            <mat-slide-toggle [(ngModel)]="appService.gridToggle" labelPosition="before"
              >Results List Type</mat-slide-toggle
            >
          </div>
          <button
            mat-stroked-button
            matTooltip="Shortcut"
            (click)="saveValue()"
          >
            Open Search Modal
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
        @include mat.slide-toggle-overrides(
          (
            label-text-color: var(--mat-sys-on-secondary),
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
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="%23FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>');
            background-repeat: no-repeat;
            background-size: 400px;
            background-position: 20% -25px;
            opacity: 0.2;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            transform: scaleX(-1);
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
          .header-actions {
            display: flex;
            flex-direction: row;
            gap: 24px;
            button {
              margin: 0 5px;
            }
            .search-style-options {
              align-items: flex-end;
              display: flex;
              flex-direction: column;
              gap: 10px;
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
    lastValueFrom(this.appService.fetchUsers());
  }
}
