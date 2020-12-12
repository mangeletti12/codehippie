import { createAction, props } from '@ngrx/store';

import { Hero, Superheroes } from '../models/superheroes';

// Defined actions to express events.

// The createAction function returns a function, that when called returns an object in the shape of the Action interface.
//  The props method is used to define any additional metadata needed for the handling of the action.
//   Action creators provide a consistent, type - safe way to construct an action that is being dispatched.

const superheroesActionLabel = 'SuperHeroes Module';

export const appendHero = createAction('[Superheroes] Append', props<{ hero: Hero }>());
export const deleteHero = createAction('[Superheroes] Delete', props<{ heroId: number }>());
export const cancelHero = createAction('[Superheroes] Cancel');

export const getAllHeroes = createAction(
    `[${superheroesActionLabel}] GetAllHeroes`,
    props<{ searchCriteria: any }>()
);

export const getAllHeroesSucceeded = createAction(
    `[${superheroesActionLabel}] getAllHeroesSucceeded`,
    props<{ superheroes: Superheroes[], total: number }>()
);

export const getAllHeroesFailed = createAction(
    `[${superheroesActionLabel}] getAllHeroesFailed`,
    props<{ error: Error }>()
);
