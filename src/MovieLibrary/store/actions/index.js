import * as AT from './types';


export default Object.assign({}, {
  updateMoviesObject: obj => ({ type: AT.UPDATE_MOVIES_OBJECT, payload: { ...obj } }),
  updateMovies: payload => ({ type: AT.UPDATE_MOVIES, payload }),
  updateSelected: payload => ({ type: AT.UPDATE_SELECTED, payload }),
  updateFetching: payload => ({ type: AT.UPDATE_FETCHING, payload }),
});
