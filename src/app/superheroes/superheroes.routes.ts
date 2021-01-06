import { Routes } from '@angular/router';
import { SuperheroesComponent } from './superheroes.component';
import { TeamsComponent } from './teams/teams.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroComponent } from './heroes/hero.component';
//
import { ResolverService } from '../resolver.service';
import { DoorsComponent } from './doors/doors.component';
import { ResolverDoorsService } from '../resolver-doors.service';

export const SuperheroesRoutes: Routes = [

  { path: '',
    data: { breadcrumb: 'Superheroes' },
    children: [
      {
        path: '',
        component: SuperheroesComponent,
        data: { breadcrumb: null },
        resolve: { comp: ResolverService },
      },
      {
        path: 'teams',
        component: TeamsComponent,
        data: { breadcrumb: 'Teams' },
        resolve: { comp: ResolverService },
      },
      {
        path: 'doors',
        component: DoorsComponent,
        data: { breadcrumb: 'Doors' },
        resolve: { resolved: ResolverDoorsService },
      },
      {
        path: 'heroes',
        data: { breadcrumb: null },
        children: [
          {
            path: '',
            component: HeroesComponent,
            data: { breadcrumb: 'Heroes' },
            resolve: { comp: ResolverService },
          },
          {
            path: ':id',
            component: HeroComponent,
            data: { breadcrumb: 'create/update' },
            resolve: { comp: ResolverService },
          }
        ]
      }
    ]
  }
];
