import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, func } from 'prop-types';
import { getSortBy } from '../store/selectors';
import { sortMovies } from '../store/actions/sortMovies';
import { sortOptions } from '../constants';


class SortingOptions extends Component {
  static propTypes = {
    sortBy: string.isRequired,
    sortMovies: func.isRequired,
  };

  handleChange = e => this.props.sortMovies(e.target.value);

  render() {
    return (
      <div className="sorter">
        <span>Sort by:</span>
        <select value={this.props.sortBy} onChange={this.handleChange}>
          {sortOptions.map(({ value, uiText, disabled }, i) => (
            <option value={value} disabled={disabled} key={`sortOption_${i}`}>{uiText}</option>
          ))}
        </select>
      </div>
    )
  }
}

export default connect(state => ({
  sortBy: getSortBy(state),
}), { sortMovies })(SortingOptions);
