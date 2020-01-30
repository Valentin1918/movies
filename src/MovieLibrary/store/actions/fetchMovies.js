import AC from './index';
import { fetchMovies as _fetchMovies } from '../../api/end-points';
import { getPage, getTotalPages, getMoviesList, getMoviesMap } from '../selectors';
import { moviesApiKey } from '../../config';
import { cacheImages } from '../../utils';


export const fetchMovies = () => (dispatch, getState) => {
  const state = getState();
  const page = getPage(state);
  const totalPages = getTotalPages(state);
  const moviesList = getMoviesList(state);
  const moviesMap = getMoviesMap(state);
  if (page === totalPages) return;
  _fetchMovies(moviesApiKey, page + 1).then(res => {
    res.json().then(({ results, page, total_pages }) => {
      if (!Array.isArray(results)) return;
      cacheImages(results);
      const moviesObj = results.reduce((acc, movie) => {
        acc.moviesMap[movie.id] = movie;
        acc.moviesList.push(movie.id);
        return acc;
      }, { moviesMap: { ...moviesMap }, moviesList: [ ...moviesList ] });

      dispatch(AC.updateMoviesObject({ ...moviesObj, page, totalPages: total_pages }));
    }).catch(({ status, message }) => {
      console.error(`Retrieving movies data from response failed with status: ${status}, and message: ${message}`);
    });
  }).catch(({ status, message }) => {
    console.error(`Fetching movies was failed with status: ${status}, and message: ${message}`);
  });
};
