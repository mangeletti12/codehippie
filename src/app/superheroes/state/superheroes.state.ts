import { AppState } from '../../app.state';

import { Superheroes } from '../models/superheroes';

export const FeatureName = 'superheroes';

export interface SuperheroesState {
  superheroes: Superheroes;
  heroId: number;
}

export const initialState: SuperheroesState = {
    superheroes: new Superheroes(),
    heroId: null,
}

export interface State extends AppState {
    superheroes: SuperheroesState;
}
