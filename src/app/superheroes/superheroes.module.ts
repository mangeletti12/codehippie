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



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SuperheroesRoutes),
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [
      RouterModule
    ],
    declarations: [
      HeroesComponent,
      TeamsComponent,
      SuperheroesComponent,
      HeroComponent,
      AddToTeamComponent,
      ViewTeamComponent,

    ],
    // entryComponents:[UserComponent]
    // bootstrap: [UsersComponent],
})
export class SuperheroesModule {}
