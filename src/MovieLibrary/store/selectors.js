import { createSelector } from 'reselect';

export const getMoviesLib = state => state.moviesLib;
export const getMovies = createSelector(getMoviesLib, _ => _.moviesList.map(id => _.moviesMap[id]));
export const getSelected = createSelector(getMoviesLib, _ => _.selected);
export const getSelectedMovie = createSelector(getMoviesLib, _ => _.moviesMap[_.selected]);
