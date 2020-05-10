import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './estimate.routes';
import { MaterialModule } from '../material/material.module';

import { EstimateListComponent } from './estimate-list.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [

      EstimateListComponent
    ],
    //entryComponents:[UserComponent]
})
export class EstimateModule {}
