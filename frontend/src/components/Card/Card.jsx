import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Card({ card, onCardLike, onCardClick, onRemoveClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.isLiked;

  const initialLikesCount = card.likes?.length || card.likesCount || 0;
  const displayLikesCount = card.likes 
    ? card.likes.length 
    : (isLiked ? initialLikesCount + 1 : initialLikesCount);

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