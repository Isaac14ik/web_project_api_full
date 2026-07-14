// src/components/Main/Main.jsx
import { useContext } from 'react';
import Card from '../Card/Card';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Popup from '../Popup/Popup';
import EditProfile from '../EditProfile/EditProfile';
import EditAvatar from '../EditAvatar/EditAvatar';
import NewCard from '../NewCard/NewCard';
import ImagePopup from '../ImagePopup/ImagePopup';
import RemoveCard from '../RemoveCard/RemoveCard';

function Main({ 
  cards, 
  onCardLike, 
  onCardClick, 
  onRemoveClick, 
  onOpenPopup,
  popup,
  onClosePopup,
  selectedCard,
  cardToRemove,
  onUpdateUser,
  onUpdateAvatar,
  onAddPlace,
  onDeleteCard
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleAvatarClick = () => {
    onOpenPopup('avatar');
  };

  const handleEditClick = () => {
    onOpenPopup('edit');
  };

  const handleAddClick = () => {
    onOpenPopup('newcard');
  };

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__image-container" onClick={handleAvatarClick}>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="profile__image"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={handleEditClick}
          />
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={handleAddClick}
        />
      </section>

      <div className="cards">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardLike={onCardLike}
            onCardClick={onCardClick}
            onRemoveClick={onRemoveClick}
          />
        ))}
      </div>

      {popup === 'edit' && (
        <Popup onClose={onClosePopup}>
          <EditProfile onClose={onClosePopup} />
        </Popup>
      )}

      {popup === 'avatar' && (
        <Popup onClose={onClosePopup}>
          <EditAvatar onClose={onClosePopup} />
        </Popup>
      )}

      {popup === 'newcard' && (
        <Popup onClose={onClosePopup}>
          <NewCard onAddPlace={onAddPlace} onClose={onClosePopup} />
        </Popup>
      )}

      {selectedCard && (
        <ImagePopup card={selectedCard} onClose={onClosePopup} />
      )}

      {cardToRemove && popup === 'remove' && (
        <Popup onClose={onClosePopup}>
          <RemoveCard card={cardToRemove} onConfirmDelete={onDeleteCard} onClose={onClosePopup} />
        </Popup>
      )}
    </main>
  );
}

export default Main;