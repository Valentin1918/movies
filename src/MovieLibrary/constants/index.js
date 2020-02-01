export const isProd = process.env.NODE_ENV === 'production';
export const cacheName = 'moviesImages';
export const sortOptions = [
  { value: '', uiText: '', disabled: true },
  { value: 'titleAsc', uiText: 'A -> Z' },
  { value: 'titleDesc', uiText: 'Z -> A' },
  { value: 'voteAverage', uiText: 'Rating' },
];
export const moviesHeaderHeight = 190;
export const scrollableWindow = window.innerHeight - moviesHeaderHeight;
export const smoothScrollBuffer = 150;
export const swMessageType = 'CACHE_IMAGES';
export const cachingTypes = ['implicit', 'explicit'];
export const reqParams = { method: 'GET', mode: 'no-cors', cache: 'default' };
