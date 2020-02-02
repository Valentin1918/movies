import React from 'react';
import { object, bool, func } from 'prop-types';
import { getImageUrl } from '../utils';
import noImage_196_110 from '../images/no-image_196x110.png';


const MovieListItem = ({
  movie: { title, vote_average, backdrop_path }, isSelected, onSelect
}) => {
  return (
    <div
      className={`movie-list-item${isSelected ? ' selected' : ''}`}
      onClick={onSelect}
    >
      <div
        className="backdrop"
        style={{ backgroundImage: `url(${backdrop_path ? getImageUrl(backdrop_path) : noImage_196_110})` }}
      />
      <div className="item-info">
        {`${title} (${vote_average})`}
      </div>
    </div>
  );
};

MovieListItem.propTypes = {
  movie: object.isRequired,
  isSelected: bool.isRequired,
  onSelect: func.isRequired,
};

export default MovieListItem;
