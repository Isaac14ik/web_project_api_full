// src/components/Popup/Popup.jsx
import { useEffect } from 'react';

function Popup({ children, onClose }) {
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="popup popup_opened" onClick={handleOverlayClick}>
      <div className="popup__content">
        <button className="popup__close" onClick={onClose} type="button"></button>
        {children}
      </div>
    </div>
  );
}

export default Popup;