import { Routes } from '@angular/router';
import { BudgetListComponent } from './budget-list.component';

export const routes: Routes = [
  {
    path: '',
    component: BudgetListComponent,
    data: { breadcrumb: 'Budgets' },
  },
];
