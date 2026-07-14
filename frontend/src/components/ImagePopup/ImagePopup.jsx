import Popup from '../Popup/Popup';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <button 
          className="popup__close-button" 
          type="button" 
          onClick={onClose}
        ></button>
        <img 
          src={card?.link} 
          alt={card?.name} 
          className="popup__image" 
        />
        <p className="popup__caption">{card?.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;