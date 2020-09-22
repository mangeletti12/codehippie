import { Action, createReducer, on } from '@ngrx/store';

import { Hero } from '../models/superheroes';
import { SuperheroesState, initialState, State } from '../state/superheroes.state';
import { appendHero, deleteHero, cancelHero, getAllHeroes, getAllHeroesSucceeded } from './superheroes.actions';

// applies the action to the state to produce a NEW state
// always have to produce a NEW object!

export const createSuperheroesReducer = createReducer(
  initialState,
  // on(appendHero, (state, action) => state.concat({
  //   ...action.hero,
  //   id: Math.max(...state.map(h => h.id),0) +1,
  // })),
  // on(deleteHero, (state, action) => state.filter(
  //     h => h.id !== action.heroId)),
  on(
    getAllHeroesSucceeded, (state, action) => {
      return {
        ...state,
        superheroes: action.superheroes,
      }
    }
  ),
);

export function superheroesReducer(state: SuperheroesState | undefined, action: Action) {
  return createSuperheroesReducer(state, action);
}