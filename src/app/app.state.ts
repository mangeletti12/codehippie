import { ActionReducerMap, MetaReducer } from '@ngrx/store';

export interface AppState {
    user: null;
}

export const reducers: ActionReducerMap<AppState> = {
    user: null
};

export const metaReducers: MetaReducer<AppState>[] = [];