import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { SuperheroesService } from '../superheroes.service';
// import { SuperheroesState } from './superheroes.state';
import { getAllHeroes, getAllHeroesSucceeded, getAllHeroesFailed } from './superheroes.actions';

@Injectable()
export class SuperheroesEffects {

    constructor(
        private actions$: Actions,
        private superheroesService: SuperheroesService,
    ) {

    }

    // Get All Heroes
    loadHeroes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getAllHeroes),
            switchMap((action) =>
                // call service API
                this.superheroesService.getAllHeroes(action.searchCriteria).pipe(
                    map(data => getAllHeroesSucceeded({ superheroes: data.body }) ),
                    catchError(error => of(getAllHeroesFailed({ error })) )
                )
            )
        )
    );

}