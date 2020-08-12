import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserRoutes } from './user.routes';
//import { UserRoutingModule } from './user-routing.module';

import { MaterialModule } from '../material/material.module';
//Users
import { UserComponent } from './user/user.component';
import { UserTwoComponent } from './user/user-two.component';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserRoutes),
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
    ],
    exports: [
      RouterModule
    ],
    declarations: [
        UserComponent,
        UserTwoComponent,
        UsersComponent,
        UsersListComponent
    ],
    entryComponents:[UserComponent]
    //bootstrap: [UsersComponent],
})
export class UserModule {}
