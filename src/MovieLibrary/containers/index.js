import React, { Component } from 'react';
import { connect } from 'react-redux';
import { oneOfType, string, number, array, func } from 'prop-types';
import AC from '../store/actions';
import { fetchMovies } from '../store/actions/fetchMovies';
import { getMovies, getSelected, getSelectedMovie } from '../store/selectors';
import MoviesList from '../components/MoviesList';
import MovieModal from '../components/MovieModal';
import SortingOptions from '../components/SortingOptions';
import logo from '../images/logo.svg';
import '../styles/MovieLibrary.css';


class Container extends Component {
  static propTypes = {
    movies: array.isRequired,
    selected: oneOfType([ number, string ]).isRequired,
    updateSelected: func.isRequired,
    fetchMovies: func.isRequired,
  };

  selectMovie = item => this.props.updateSelected(item);

  unselectMovie = () => this.props.updateSelected('');

  render() {
    const { movies, selected, selectedMovie } = this.props;
    return (
      <div className="MovieLibraryWrap">
        <div className="MovieLibrary">
          <header className="ML-header">
            <img src={logo} className="ML-logo" alt="logo" />
            <h1 className="ML-title">Movies</h1>
            <SortingOptions />
          </header>
          <MoviesList
            movies={movies}
            selectMovie={this.selectMovie}
            selected={selected}
            fetchMovies={this.props.fetchMovies}
          />
          {!!selectedMovie && (
            <MovieModal
              movie={selectedMovie}
              unselectMovie={this.unselectMovie}
            />
          )}
        </div>
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
