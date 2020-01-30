import React from 'react';
import { object, bool, func } from 'prop-types';
import { getImageUrl } from '../utils';


const MovieListItem = ({
  movie: { title, vote_average, backdrop_path }, isSelected, onSelect
}) => {
  return (
    <div
      className={`movie-list-item${isSelected ? ' selected' : ''}`}
      onClick={onSelect}
    >
      {backdrop_path && (
        <div
          className="backdrop"
          style={{ backgroundImage: `url(${getImageUrl(backdrop_path)})` }}
        />
      )}
      <span>
          {`${title} (${vote_average})`}
        </span>
    </div>
  );
};

MovieListItem.propTypes = {
  movie: object.isRequired,
  isSelected: bool.isRequired,
  onSelect: func.isRequired,
};

export default MovieListItem;
