import { imageBaseUrl, cacheName, reqParams } from '../constants';

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
