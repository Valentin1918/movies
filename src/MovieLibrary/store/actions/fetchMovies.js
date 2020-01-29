import AC from './index';
import { fetchMovies as _fetchMovies } from '../../api/end-points';
import { moviesApiKey } from '../../config';
import { cacheImages } from '../../utils';


export const fetchMovies = () => dispatch => {
  _fetchMovies(moviesApiKey).then(res => {
    res.json().then(({ results, page, total_pages }) => {
      if (!Array.isArray(results)) return;
      cacheImages(results);
      const moviesObj = results.reduce((acc, movie) => {
        acc.moviesMap[movie.id] = movie;
        acc.moviesList.push(movie.id);
        return acc;
      }, { moviesMap: {}, moviesList: [] });

      dispatch(AC.updateMoviesObject(moviesObj));
    }).catch(({ status, message }) => {
      console.error(`Retrieving movies data from response failed with status: ${status}, and message: ${message}`);
    });
  }).catch(({ status, message }) => {
    console.error(`Fetching movies was failed with status: ${status}, and message: ${message}`);
  });
};
