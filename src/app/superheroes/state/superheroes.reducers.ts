import { createReducer, on } from '@ngrx/store';

import { appendHero, deleteHero, cancelHero  } from './superheroes.actions';
import { Hero } from '../models/superheroes';

// applies the action to the state to produce a NEW state
// always have to produce a NEW object!

export const superheroesReducer = createReducer<Hero[]>(
    [],
  on(appendHero, (state, action) => state.concat({
    ...action.hero,
    id: Math.max(...state.map(h => h.id),0) +1,
  })),
  on(deleteHero, (state, action) => state.filter(
      h => h.id !== action.heroId)),
);

// export const editCarIdReducer = createReducer<number>(
//     -1,
//   on(appendHero, (_, action) => action.hero),
//   on(deleteHero, (_, action) => action.heroId),
//   on(cancelHero, () => -1),
// );