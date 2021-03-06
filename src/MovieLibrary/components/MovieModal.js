import React, { Component, Fragment } from 'react';
import { oneOfType, string, number, object, func } from 'prop-types';
import Modal from 'react-modal';
import crossSvg from '../images/cross.svg';
import { getImageUrl } from '../utils';
import noImage_500_750 from '../images/no-image_500x750.png';


const ModalContent = ({
  closeModal, title, original_title, poster_path, overview, vote_average, vote_count
}) => (
  <Fragment>
    <button
      className="close-modal-btn"
      type="button"
      onClick={closeModal}
    >
      <img src={crossSvg} alt="" />
    </button>
    <div className="media">
      <img src={poster_path ? getImageUrl(poster_path) : noImage_500_750} className="poster" alt="" />
    </div>
    <div className="description">
      {!!(title || original_title) && (
        <h2>{`${title} ${original_title ? `(${original_title})` : ''}`}</h2>
      )}
      {!!(vote_average && vote_count) && (
        <h3>{`Rank (votes count): ${vote_average} (${vote_count})`}</h3>
      )}
      <span>{overview}</span>
    </div>
  </Fragment>
);

ModalContent.propTypes = {
  closeModal: func.isRequired,
  title: string,
  original_title: string,
  poster_path: string,
  overview: string,
  vote_average: oneOfType([ number, string ]),
  vote_count: oneOfType([ number, string ]),
};

ModalContent.defaultProps = {
  title: '',
  original_title: '',
  poster_path: '',
  overview: '',
  vote_average: '',
  vote_count: '',
};

export default class MovieModal extends Component {
  static propTypes = {
    movie: object.isRequired,
    unselectMovie: func.isRequired,
  };

  closeModal = () => this.props.unselectMovie();

  render() {
    const { movie } = this.props;
    return (
        <Modal
          isOpen
          onRequestClose={this.closeModal}
          className="movie-modal"
          overlayClassName="movie-modal-overlay"
          contentLabel="Movie Modal"
        >
          <ModalContent closeModal={this.closeModal} { ...movie } />
        </Modal>
    );
  }
}
