import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Card({ card, onCardLike, onCardClick, onRemoveClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes?.some(id => id === currentUser._id) || card.isLiked;
  const displayLikesCount = card.likes?.length || 0;

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? 'card__like-button_is-active' : ''
  }`;

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onRemoveClick(card);
  };

  const handleImageClick = () => {
    onCardClick(card);
  };

  return (
    <div className="card">
      {isOwn && (
        <button
          className="card__delete-button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={handleImageClick}
      />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-count">{displayLikesCount}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
