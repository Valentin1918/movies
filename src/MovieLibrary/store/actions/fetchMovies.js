import AC from './index';
import topRatedMovies from '../../mocks/topTatedMovies';
import { cacheImages } from '../../utils';


export const fetchMovies = () => dispatch => {
  if (!Array.isArray(topRatedMovies)) return;
  cacheImages(topRatedMovies);
  const moviesObj = topRatedMovies.reduce((acc, movie) => {
    acc.moviesMap[movie.id] = movie;
    acc.moviesList.push(movie.id);
    return acc;
  }, { moviesMap: {}, moviesList: [] });

  dispatch(AC.updateMoviesObject(moviesObj))
};
