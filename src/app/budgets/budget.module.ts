import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './budget.routes';
import { MaterialModule } from '../material/material.module';

import { BudgetListComponent } from './budget-list.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [

      BudgetListComponent
    ],
    //entryComponents:[UserComponent]
})
export class BudgetModule {}
