function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_tooltip">
        <button type="button" onClick={onClose} className="popup__close" />
        <div className={`popup__tooltip-icon ${isSuccess ? 'popup__tooltip-icon_type_success' : 'popup__tooltip-icon_type_error'}`} />
        <p className="popup__tooltip-message">
          {isSuccess
            ? '¡Correcto! Ya estás registrado.'
            : 'Uy, algo salió mal. Por favor, inténtalo de nuevo.'}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;