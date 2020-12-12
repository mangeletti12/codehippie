import { createSelector } from '@ngrx/store';
import { selectHeroState } from './superheroes.state';

export const getAllHeroes = createSelector(
    selectHeroState,
    (state) => state
);