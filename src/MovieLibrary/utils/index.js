import { imageBaseUrl, cacheName, reqParams, sortOptions } from '../constants';

export const getTMDBPath = src => `${imageBaseUrl}${src.replace(/^\//, '')}`;

export const cacheImages = items => {
  if (!Array.isArray(items) || !items.length || !window.caches) return;
  const urlSet = items.reduce((acc, { poster_path }) => {
    if (poster_path) acc.add(getTMDBPath(poster_path));
    return acc;
  }, new Set([]));
  const urlArr = [...urlSet];
  const fetches = urlArr.map(url => fetch(new Request(url, reqParams)));

  caches.open(cacheName).then(cache => {
    Promise.all(fetches).then(arr => {
      arr.forEach((res, i) => cache.put(urlArr[i], res));
    });
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
