import thunk from 'redux-thunk';
import { isProd } from '../../constants';

export default function createMiddlewares() {
  const mids = [thunk];
  if (!isProd) mids.push(require('redux-logger').default);
  return mids;
};
