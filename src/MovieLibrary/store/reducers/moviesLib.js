import * as AT from '../actions/types';

const initialState = {
  moviesMap: {},
  moviesList: [],
  selected: '',
};

export default function moviesLib(state = initialState, action) {
  const { type, payload } = action;
  const reducersMap = {
    [AT.UPDATE_MOVIES_OBJECT]: { ...state, ...payload },
    [AT.UPDATE_SELECTED]: { ...state, selected: payload },
  };
  return reducersMap[type] || state;
}
