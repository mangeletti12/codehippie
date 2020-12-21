import { createSelector } from '@ngrx/store';
import { selectHeroState } from './superheroes.state';
import { Superheroes, Hero } from '../models/superheroes';
import { state } from '@angular/animations';

export const selectHeroesDetails = createSelector(
    selectHeroState,
    (state): any => state
);

export const selectAllHeroes = createSelector(
    selectHeroState,
    (state): any => state.superheroes
);

export const selectHeroes = (index: number) => createSelector(
    selectHeroState,
    (state): any => state.superheroes[index]
);

// export const selectHeroes = (index: number) => createSelector(
//     selectAllHeroes,
//     selectHeroesTotal,
//     (hereos: any, totals: any) => {
//         return { heroes: hereos[index], total: totals }
//     }
// );

// export const selectHero = (id: number) => createSelector(
//     selectHeroState,
//     (state): any => state.superheroes.filter(h => h.id === id)
// );

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