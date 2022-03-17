import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DatepickerComponent } from './datepicker/datepicker.component';
import { InputMaskModule } from './helpers/input-mask.module';
// import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './library.routes';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      MaterialModule,
      ReactiveFormsModule,
      FormsModule,
      InputMaskModule,
      // MatDateFnsModule,
    ],
    declarations: [
      DatepickerComponent,

    ],
    providers: [
      DatePipe
    ],
    //entryComponents:[UserComponent]
})
export class LibraryModule {}
