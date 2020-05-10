import { Routes } from '@angular/router';
import { SuperheroesComponent } from './superheroes.component';
import { TeamsComponent } from './teams/teams.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroComponent } from './heroes/hero.component';


export const SuperheroesRoutes: Routes = [

  { path: '',
    data: { breadcrumb: 'Superheroes' },
    children: [
      {
        path: '',
        data: { breadcrumb: null },
        component: SuperheroesComponent,
      },
      {
        path: 'teams',
        component: TeamsComponent,
        data: { breadcrumb: 'Teams' },
      },
      {
        path: 'heroes',
        data: { breadcrumb: 'Heroes' },
        children: [
          {
            path: '',
            component: HeroesComponent,
            // canActivate: [AuthGuard],
            data: { breadcrumb: null },
          },
          {
            path: ':id',
            component: HeroComponent,
            data: {
              breadcrumb: 'create/update'
            }
          }
        ]
      }
    ]
  }
];
