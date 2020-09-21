import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SuperheroesRoutes } from './superheroes.routes';

import { MaterialModule } from '../material/material.module';
import { TeamsComponent } from './teams/teams.component';
import { HeroesComponent } from './heroes/heroes.component';
import { SuperheroesComponent } from './superheroes.component';
import { HeroComponent } from './heroes/hero.component';
import { AddToTeamComponent } from './teams/add-to-team.component';
import { ViewTeamComponent } from './teams/view-team.component';

//
import { FeatureName } from './state/superheroes.state';
import { StoreModule } from '@ngrx/store';
import { superheroesReducer } from './state/superheroes.reducers'


@NgModule({
  declarations: [
    HeroesComponent,
    TeamsComponent,
    SuperheroesComponent,
    HeroComponent,
    AddToTeamComponent,
    ViewTeamComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SuperheroesRoutes),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    // ngrx
    StoreModule.forFeature(FeatureName, superheroesReducer),
    // EffectsModule.forFeature([ReviewsEffects]),
  ],
  exports: [
    RouterModule
  ],
})
export class SuperheroesModule {}
