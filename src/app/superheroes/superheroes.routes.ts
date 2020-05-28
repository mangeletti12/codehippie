import { Routes } from '@angular/router';
import { SuperheroesComponent } from './superheroes.component';
import { TeamsComponent } from './teams/teams.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroComponent } from './heroes/hero.component';
//
import { ResolverService } from '../resolver.service';

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
        path: 'heroes',
        data: { breadcrumb: 'Heroes' },
        children: [
          {
            path: '',
            component: HeroesComponent,
            // canActivate: [AuthGuard],
            data: { breadcrumb: null },
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
