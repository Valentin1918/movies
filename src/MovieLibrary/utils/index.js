import { cacheName, sortOptions, smoothScrollBuffer } from '../constants';
import { imageBaseUrl, moviesBaseUrl } from '../config';

export const call = (cb, ...args) => { if (typeof cb === 'function') cb(...args); };

export const joinURL = (base, path) => `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

export const getImageUrl = joinURL.bind(null, imageBaseUrl);
export const getMoviesUrl = joinURL.bind(null, moviesBaseUrl);

export const cacheImages = items => {
  if (!Array.isArray(items) || !items.length || !window.caches) return;
  const urlSet = items.reduce((acc, { poster_path }) => {
    if (poster_path) acc.add(getImageUrl(poster_path));
    return acc;
  }, new Set([]));
  const urlArr = [...urlSet];

  caches.open(cacheName).then(cache => {
    cache.addAll(urlArr).then(() => console.log('%c CACHED', 'color: green'));
  });
};

const pivotAsc = (aT, bT) => aT > bT ? 1 : -1;
const pivotDesc = (aT, bT) => aT > bT ? -1 : 1;

const sortByTitle = pivotF => movies => movies.sort(({ title: a }, { title: b }) => {
  const aT = a.toUpperCase();
  const bT = b.toUpperCase();
  if (aT === bT) return 0;
  return pivotF(aT, bT);
});

const sortMap = {
  [sortOptions[1].value]: sortByTitle(pivotAsc),
  [sortOptions[2].value]: sortByTitle(pivotDesc),
  [sortOptions[3].value]: movies => movies.sort(({ vote_average: a }, { vote_average: b }) => b - a),
};

export const sortByMap = (sortBy, movies) => {
  const sort = sortMap[sortBy];
  if (!sort || !Array.isArray(movies) || !movies.length) return;
  return sort(movies).map(m => m.id);
};

export const makeScrollListener = cb => ({
  target: { scrollingElement: { scrollTop, scrollHeight } }
}) => {
  if (scrollTop + window.innerHeight + smoothScrollBuffer >= scrollHeight) {
    call(cb);
  }
};
