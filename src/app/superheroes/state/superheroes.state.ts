import { AppState } from '../../app.state';

import { Hero } from '../models/superheroes';
import { createFeatureSelector } from '@ngrx/store';

export const FeatureName = 'superheroes';

// Define a feature selector for the slice of the application.
export const selectHeroState = createFeatureSelector<State, SuperheroesState>(
  FeatureName
);

export interface SuperheroesState {
  superheroes: Hero[];
  total: number;
  loading: boolean;
  allLoaded: boolean;
  error: Error;
}

export const initialState: SuperheroesState = {
  superheroes: new Array<Hero>(),
  total: 0,
  loading: false,
  allLoaded: false,
  error: null,
}

export interface State extends AppState {
  superheroes: SuperheroesState;
}
