import { Routes } from '@angular/router';
import { EstimateListComponent } from './estimate-list.component';

export const routes: Routes = [
  {
    path: '',
    component: EstimateListComponent,
    data: { breadcrumb: 'Estimates' },
  },
];
