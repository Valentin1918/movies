import React, { PureComponent } from 'react';
import { array, func, oneOfType, string, number } from 'prop-types';
import MovieListItem from './MovieListItem';
import SortingOptions from './SortingOptions';
import '../styles/MoviesList.css';


export default class MoviesList extends PureComponent {
  static propTypes = {
    movies: array.isRequired,
    selected: oneOfType([ number, string ]).isRequired,
    selectMovie: func.isRequired,
  };

  render() {
    const { movies, selectedMovie, selectMovie } = this.props;
    return (
      <div className="movies-list">
        <div className="sorter">
          <span>Sort by:</span>
          <SortingOptions />
        </div>
        <div className="items">
          {movies.map(movie => (
            <MovieListItem
              key={movie.id}
              movie={movie}
              isSelected={selectedMovie === movie.id}
              onSelect={() => selectMovie(movie.id)}
            />
          ))}
        </div>
      </div>
    )
  }
}
