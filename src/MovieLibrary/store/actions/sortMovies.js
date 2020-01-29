import AC from './index';
import { getSortBy, getMovies } from '../selectors';
import { sortByMap } from '../../utils';


export const sortMovies = sortBy => (dispatch, getState) => {
  const state = getState();
  if (getSortBy(state) === sortBy) return;
  const objToSet = { sortBy };
  const movies = getMovies(state).slice();
  const moviesList = sortByMap(sortBy, movies);
  if (moviesList) objToSet.moviesList = moviesList;
  dispatch(AC.updateMoviesObject(objToSet));
};
