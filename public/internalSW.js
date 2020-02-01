const cacheName = 'moviesImages';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
const reqParams = { method: 'GET', mode: 'no-cors', cache: 'default' };

const joinURL = (base, path) => `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
const getImageUrl = joinURL.bind(null, imageBaseUrl);

const cacheImages = (items, isProd) => {
  if (!Array.isArray(items) || !items.length || !caches) return;
  const urlSet = items.reduce((acc, { poster_path }) => {
    if (poster_path) acc.add(getImageUrl(poster_path));
    return acc;
  }, new Set([]));
  const urlArr = [...urlSet];

  const fetches = [...urlSet].map(url => fetch(new Request(url, reqParams)));

  caches.open(cacheName).then(cache => {
    Promise.all(fetches).then(arr => {
      arr.forEach((res, i) => cache.put(urlArr[i], res));
      if (!isProd) console.log('%c CACHED IN SW', 'color: green')
    });
  });
};


self.addEventListener('message', event => {
  if (!event.isTrusted || !event.data || event.data.type !== 'CACHE_IMAGES' ||
    !Array.isArray(event.data.items)) return;
  const { items, isProd } = event.data;
  cacheImages(items, isProd);
});
