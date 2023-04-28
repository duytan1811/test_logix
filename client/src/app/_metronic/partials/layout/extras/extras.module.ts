import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NotificationsInnerComponent } from './dropdown-inner/notifications-inner/notifications-inner.component';
import { LayoutScrollTopComponent } from './scroll-top/scroll-top.component';
import { SearchResultInnerComponent } from "./dropdown-inner/search-result-inner/search-result-inner.component";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    NotificationsInnerComponent,
    SearchResultInnerComponent,
    LayoutScrollTopComponent,
  ],
  imports: [CommonModule, FormsModule, InlineSVGModule, RouterModule, NgbTooltipModule],
  exports: [
    NotificationsInnerComponent,
    SearchResultInnerComponent,
    LayoutScrollTopComponent,
  ],
})
export class ExtrasModule {
}
