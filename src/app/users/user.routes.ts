import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserTwoComponent } from './user/user-two.component';
import { UsersListComponent } from './users-list/users-list.component';

export const UserRoutes: Routes = [

  { path: '',
    component: UsersListComponent,
    data: { breadcrumb: 'Users' },
    children: [
      {
        path: 'user',
        component: UserComponent,
        data: { breadcrumb: 'New' },
        children: [
          {
            path: 'user2',
            component: UserTwoComponent,
            data: {
              breadcrumb: 'New2'
            }
          }
        ]
      }
    ]
  }
];
