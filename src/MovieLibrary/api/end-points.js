import { getMoviesUrl } from '../utils';


export const fetchMovies = apiKey => {
  const url = getMoviesUrl('movie/now_playing');
  const urlWithQuery = `${url}${apiKey ? `?api_key=${apiKey}` : ''}`;
  return fetch(urlWithQuery, { method: 'GET' });
};
