import {
  cacheName, sortOptions, smoothScrollBuffer, scrollableWindow, swMessageType,
  cachingTypes, reqParams, isProd,
} from '../constants';
import { imageBaseUrl, moviesBaseUrl } from '../config';

export const call = (cb, ...args) => { if (typeof cb === 'function') cb(...args); };

export const joinURL = (base, path) => `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

export const getImageUrl = joinURL.bind(null, imageBaseUrl);
export const getMoviesUrl = joinURL.bind(null, moviesBaseUrl);

export const uniqArr = arr => Array.from(new Set(arr));

const makeUrlArr = items => {
  const urlSet = items.reduce((acc, { poster_path }) => {
    if (poster_path) acc.add(getImageUrl(poster_path));
    return acc;
  }, new Set([]));
  return [...urlSet];
};

const cacheByType = type => (cache, urlArr) => ({
  [cachingTypes[0]]: () => {
    cache.addAll(urlArr).then(() => {
      if (!isProd) console.log(`%c CACHED ${cachingTypes[0]}ly`, 'color: green')
    });
  },
  [cachingTypes[1]]: () => {
    const fetches = urlArr.map(url => fetch(new Request(url, reqParams)));
    Promise.all(fetches).then(arr => {
      arr.forEach((res, i) => cache.put(urlArr[i], res));
      if (!isProd) console.log(`%c CACHED ${cachingTypes[1]}ly`, 'color: green')
    });
  },
})[type]();

const cacheImages = (cachingType, items) => {
  if (!Array.isArray(items) || !items.length || !window.caches) return;
  const urlArr = makeUrlArr(items);
  window.caches.open(cacheName).then(cache => cacheByType(cachingType)(cache, urlArr));
};

export const optimalCaching = items => {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: swMessageType, items, isProd });
  } else {
    cacheImages(cachingTypes[0], items);
  }
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

export const fulfillList = (el, cb) => {
  if (scrollableWindow >= el.scrollHeight) call(cb);
};

export const makeScrollListener = cb => ({ target: { scrollTop, scrollHeight } }) => {
  if (scrollableWindow + scrollTop + smoothScrollBuffer >= scrollHeight) {
    call(cb);
  }
};
