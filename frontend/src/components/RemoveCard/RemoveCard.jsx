function RemoveCard({ card, onConfirmDelete, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmDelete(card);
  };

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <h2 className="popup__title">¿Estás seguro?</h2>
      <p className="popup__text">Esta acción no se puede deshacer</p>
      <button className="button popup__button popup__button_type_confirm" type="submit">
        Sí, eliminar
      </button>
    </form>
  );
}

export default RemoveCard;