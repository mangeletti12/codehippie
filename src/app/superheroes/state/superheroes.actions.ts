import { createAction, props } from '@ngrx/store';

import { Hero } from '../models/superheroes';

// Defined actions to express events.

// The createAction function returns a function, that when called returns an object in the shape of the Action interface.
//  The props method is used to define any additional metadata needed for the handling of the action.
//   Action creators provide a consistent, type - safe way to construct an action that is being dispatched.

const superheroesActionLabel = 'SuperHeroes Module';

export const appendHero = createAction('[Superheroes] Append', props<{ hero: Hero }>());
export const deleteHero = createAction('[Superheroes] Delete', props<{ heroId: number }>());
export const cancelHero = createAction('[Superheroes] Cancel');

export const getAllHeroes = createAction(`[${superheroesActionLabel}] GetAllHeroes`,
    props<{  }>()
);

/*
ts: 1600698050698
apikey: 9285e370921040c25d101324e5943c31
hash: b5e3666240fc8f6fcca1d43c4c7a8773
orderBy: name
limit: 25
offset: 0
nameStartsWith: string
*/