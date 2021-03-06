import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { SuperheroesService } from '../superheroes.service';
import { getAllHeroes, getAllHeroesSucceeded, getAllHeroesFailed } from './superheroes.actions';

import { Hero, HeroResponse } from '../models/superheroes';

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
            switchMap((params) =>
                // call service API
                this.superheroesService.getAllHeroes(params.searchCriteria).pipe(
                    map(data => getAllHeroesSucceeded(
                        { 
                            superheroes: data.body.data.results,
                            total: data.body.data.total                    
                        }
                        ) ),
                    catchError(error => of(getAllHeroesFailed(error)))
                )
            )
        )
    );

}