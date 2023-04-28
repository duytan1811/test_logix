import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectFormDirective } from './connect-form.directive';

@NgModule({
  declarations: [
    ConnectFormDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ConnectFormDirective
  ]
})
export class DirectiveModule { }
