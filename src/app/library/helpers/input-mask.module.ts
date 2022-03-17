import { CommonModule } from '@angular/common';
import { DateMaskDirective } from './mm-dd-yyyy.directive';
import { InputValidateDirective } from './input-validate.directive';
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [
    DateMaskDirective,
    InputValidateDirective,

  ],
  imports: [
    CommonModule
  ],
  exports: [
    DateMaskDirective,
    InputValidateDirective,

  ],
})
export class InputMaskModule {}
