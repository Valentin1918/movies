import React, { Component } from 'react';
import { connect } from 'react-redux';
import { oneOfType, string, number, array, func } from 'prop-types';
import AC from '../store/actions';
import { fetchMovies } from '../store/actions/fetchMovies';
import { getMovies, getSelected, getSelectedMovie } from '../store/selectors';
import MoviesList from '../components/MoviesList';
import MovieModal from '../components/MovieModal';
import { makeScrollListener } from '../utils';
import logo from '../images/logo.svg';
import '../styles/MovieLibrary.css';


class Container extends Component {
  static propTypes = {
    movies: array.isRequired,
    selected: oneOfType([ number, string ]).isRequired,
    updateSelected: func.isRequired,
    fetchMovies: func.isRequired,
  };

  componentDidMount() {
    this.props.fetchMovies();
    document.addEventListener('scroll', this.scrollListener);
  }

  componentDidUpdate() {
    if (window.innerHeight === document.scrollingElement.scrollHeight) {
      this.props.fetchMovies();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollListener);
  }

  scrollListener = makeScrollListener(this.props.fetchMovies);

  selectMovie = item => this.props.updateSelected(item);

  unselectMovie = () => this.props.updateSelected('');

  render() {
    const { movies, selected, selectedMovie } = this.props;
    return (
      <div className="MovieLibrary">
        <header className="ML-header">
          <img src={logo} className="ML-logo" alt="logo" />
          <h1 className="ML-title">Movies</h1>
        </header>
        <div className="ML-intro">
          {!!movies.length && (
            <MoviesList
              movies={movies}
              selectMovie={this.selectMovie}
              selected={selected}
            />
          )}
        </div>
        {!!selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            unselectMovie={this.unselectMovie}
          />
        )}
      </div>
    );
  }
}

export default connect(state => ({
  movies: getMovies(state),
  selected: getSelected(state),
  selectedMovie: getSelectedMovie(state),
}), {
  updateSelected: AC.updateSelected,
  fetchMovies,
})(Container);
