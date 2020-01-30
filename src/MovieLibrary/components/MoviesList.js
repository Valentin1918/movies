import React, { PureComponent, createRef } from 'react';
import { array, func, oneOfType, string, number } from 'prop-types';
import { fulfillList, makeScrollListener } from '../utils';
import MovieListItem from './MovieListItem';
import '../styles/MoviesList.css';


export default class MoviesList extends PureComponent {
  static propTypes = {
    movies: array.isRequired,
    selected: oneOfType([ number, string ]).isRequired,
    selectMovie: func.isRequired,
    fetchMovies: func.isRequired,
  };

  componentDidMount() {
    fulfillList(this.scrollList.current, this.props.fetchMovies);
    this.scrollList.current.addEventListener('scroll', this.scrollListener);
  }

  componentDidUpdate() {
    fulfillList(this.scrollList.current, this.props.fetchMovies);
  }

  componentWillUnmount() {
    this.scrollList.current.removeEventListener('scroll', this.scrollListener);
  }

  scrollListener = makeScrollListener(this.props.fetchMovies);

  scrollList = createRef();

  render() {
    const { movies, selectedMovie, selectMovie } = this.props;
    return (
      <div className="ML-intro" ref={this.scrollList}>
        <div className="movies-list">
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
