import { createSelector } from '@ngrx/store';
import { selectHeroState } from './superheroes.state';
import { Superheroes, Hero } from '../models/superheroes';

export const selectHeroesDetails = createSelector(
    selectHeroState,
    (state): any => state
);

export const selectAllHeroes = createSelector(
    selectHeroState,
    (state): Hero[] => state.superheroes
);

export const selectHero = (id: number) => createSelector(
    selectHeroState,
    (state): any => state.superheroes.filter(h => h.id === id)
);

export const selectHeroesLoading = createSelector(
    selectHeroState,
    (state): boolean => state.loading
);

export const selectHeroesTotal = createSelector(
    selectHeroState,
    (state): number => state.total
);

export const selectHeroesError= createSelector(
    selectHeroState,
    (state): Error => state.error
);