import { useState, useEffect } from 'react';

function NewCard({ onAddPlace, onClose }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [errors, setErrors] = useState({ name: '', link: '' });
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const nameValid = name.length >= 1 && name.length <= 30;
    const urlValid = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(link);
    setIsValid(nameValid && urlValid && name.length > 0 && link.length > 0);
    setErrors({
      name: nameValid ? '' : 'El título debe tener entre 1 y 30 caracteres',
      link: urlValid ? '' : 'Ingrese una URL válida'
    });
  }, [name, link]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setIsLoading(true);
      onAddPlace({ name, link })
        .finally(() => {
          setIsLoading(false);
          setName('');
          setLink('');
        });
    }
  };

  return (
    <form className="popup__form" onSubmit={handleSubmit} noValidate>
      <h2 className="popup__title">Nuevo lugar</h2>
      <label className="popup__label">
        <input
          className={`popup__input ${errors.name ? 'popup__input_type_error' : ''}`}
          type="text"
          name="cardName"
          placeholder="Título"
          required
          minLength="1"
          maxLength="30"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className={`popup__error ${errors.name ? 'popup__error_visible' : ''}`}>
          {errors.name}
        </span>
      </label>
      <label className="popup__label">
        <input
          className={`popup__input ${errors.link ? 'popup__input_type_error' : ''}`}
          type="url"
          name="cardLink"
          placeholder="Enlace a la imagen"
          required
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <span className={`popup__error ${errors.link ? 'popup__error_visible' : ''}`}>
          {errors.link}
        </span>
      </label>
      <button 
        className={`button popup__button ${!isValid ? 'popup__button_disabled' : ''}`}
        type="submit"
        disabled={!isValid || isLoading}
      >
        {isLoading ? 'Creando...' : 'Crear'}
      </button>
    </form>
  );
}

export default NewCard;