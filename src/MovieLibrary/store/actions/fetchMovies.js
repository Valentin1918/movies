import AC from './index';
import { fetchMovies as _fetchMovies } from '../../api/end-points';
import { getPage, getTotalPages, getMoviesList, getMoviesMap, getFetching } from '../selectors';
import { moviesApiKey } from '../../config';
import { sortOptions } from '../../constants';
import { cacheImages, uniqArr } from '../../utils';


export const fetchMovies = () => (dispatch, getState) => {
  const state = getState();
  const page = getPage(state);
  const totalPages = getTotalPages(state);
  const moviesList = getMoviesList(state);
  const moviesMap = getMoviesMap(state);
  const fetching = getFetching(state);
  if (page === totalPages || fetching) return;
  dispatch(AC.updateFetching(true));

  _fetchMovies(moviesApiKey, page + 1).then(res => {
    res.json().then(({ results, page, total_pages }) => {
      if (!Array.isArray(results)) return;
      cacheImages(results);
      const moviesObj = results.reduce((acc, movie) => {
        acc.moviesMap[movie.id] = movie;
        acc.moviesList.push(movie.id);
        return acc;
      }, { moviesMap: { ...moviesMap }, moviesList: [ ...moviesList ] });

      dispatch(AC.updateMoviesObject({
        moviesMap: moviesObj.moviesMap,
        moviesList: uniqArr(moviesObj.moviesList),
        page,
        totalPages: total_pages,
        sortBy: sortOptions[0].value,
        fetching: false
      }));
    }).catch(({ status, message }) => {
      console.error(`Retrieving movies data from response failed with status: ${status}, and message: ${message}`);
      dispatch(AC.updateFetching(false));
    });
  }).catch(({ status, message }) => {
    console.error(`Fetching movies was failed with status: ${status}, and message: ${message}`);
    dispatch(AC.updateFetching(false));
  });
};
