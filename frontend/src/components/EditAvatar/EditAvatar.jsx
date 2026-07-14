import { useRef, useState, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function EditAvatar({ onClose }) {
  const avatarRef = useRef();
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateUrl = (url) => {
    const pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return pattern.test(url);
  };

  const handleChange = () => {
    const url = avatarRef.current.value;
    const valid = validateUrl(url) && url.length > 0;
    setIsValid(valid);
    setError(valid ? '' : 'Ingrese una URL válida');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setIsLoading(true);
      handleUpdateAvatar({ avatar: avatarRef.current.value })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <form className="popup__form" onSubmit={handleSubmit} noValidate>
      <h2 className="popup__title">Cambiar foto de perfil</h2>
      <label className="popup__label">
        <input
          ref={avatarRef}
          className={`popup__input ${error ? 'popup__input_type_error' : ''}`}
          type="url"
          name="avatar"
          placeholder="Enlace a la imagen"
          required
          onChange={handleChange}
        />
        <span className={`popup__error ${error ? 'popup__error_visible' : ''}`}>
          {error}
        </span>
      </label>
      <button 
        className={`button popup__button ${!isValid ? 'popup__button_disabled' : ''}`}
        type="submit"
        disabled={!isValid || isLoading}
      >
        {isLoading ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  );
}

export default EditAvatar;