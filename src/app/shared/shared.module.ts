import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from '../directives/dropdown.directive';
import { LoadingSpinnerComponent } from '../cmps/loading-spinner/loading-spinner.component';
import { AlertComponent } from '../cmps/alert/alert.component';

@NgModule({
  declarations: [
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent
  ]
})
export class SharedModule { };