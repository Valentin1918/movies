import { getMoviesUrl } from '../utils';


export const fetchMovies = (apiKey, page) => {
  const url = getMoviesUrl('movie/now_playing');
  const urlWithQuery = `${url}?api_key=${apiKey}&page=${page}`;
  return fetch(urlWithQuery, { method: 'GET' });
};
