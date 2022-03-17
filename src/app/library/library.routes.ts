import { DatepickerComponent } from './datepicker/datepicker.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: DatepickerComponent,
    data: { breadcrumb: 'Library' },
  },
];
