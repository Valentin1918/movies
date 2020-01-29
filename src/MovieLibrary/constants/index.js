export const imageBaseUrl = 'https://image.tmdb.org/t/p/w500/';
export const cacheName = 'moviesImages';
export const reqParams = {
  method: 'GET',
  mode: 'no-cors',
  cache: 'default'
};
export const sortOptions = [
  { value: '', uiText: '', disabled: true },
  { value: 'titleAsc', uiText: 'A -> Z' },
  { value: 'titleDesc', uiText: 'Z -> A' },
  { value: 'voteAverage', uiText: 'Rating' },
];
