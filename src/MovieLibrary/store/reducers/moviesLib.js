import * as AT from '../actions/types';
import { sortOptions } from '../../constants';

const initialState = {
  moviesMap: {},
  moviesList: [],
  selected: '',
  sortBy: sortOptions[0].value,
};

export default function moviesLib(state = initialState, action) {
  const { type, payload } = action;
  const reducersMap = {
    [AT.UPDATE_MOVIES_OBJECT]: { ...state, ...payload },
    [AT.UPDATE_SELECTED]: { ...state, selected: payload },
  };
  return reducersMap[type] || state;
}
