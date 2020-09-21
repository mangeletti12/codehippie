import { Superheroes } from './superheroes/models/superheroes';

export interface AppState {
  superheroes: Superheroes[];
  heroId: number;
}