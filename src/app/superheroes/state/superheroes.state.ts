import { AppState } from '../../app.state';

import { Superheroes } from '../models/superheroes';
import { createFeatureSelector } from '@ngrx/store';

export const FeatureName = 'superheroes';

// Define a feature selector for the slice of the application.
export const selectHeroState = createFeatureSelector<State, SuperheroesState>(
  FeatureName
);

export interface SuperheroesState {
  superheroes: Superheroes[];
  total: number;
  loaded: boolean;
}

export const initialState: SuperheroesState = {
  superheroes: new Array<Superheroes>(),
  total: null,
  loaded: false,
}

export interface State extends AppState {
  superheroes: SuperheroesState;
}
