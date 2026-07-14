import { useState, useContext, useEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function EditProfile({ onClose }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ name: '', description: '' });
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setDescription(currentUser.about || '');
    }
  }, [currentUser]);

  useEffect(() => {
    const nameValid = name.length >= 2 && name.length <= 40;
    const descValid = description.length >= 2 && description.length <= 200;
    setIsValid(nameValid && descValid);
    setErrors({
      name: nameValid ? '' : 'El nombre debe tener entre 2 y 40 caracteres',
      description: descValid ? '' : 'La descripción debe tener entre 2 y 200 caracteres'
    });
  }, [name, description]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setIsLoading(true);
      handleUpdateUser({ name, about: description })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <form className="popup__form" onSubmit={handleSubmit} noValidate>
      <h2 className="popup__title">Editar perfil</h2>
      <label className="popup__label">
        <input
          className={`popup__input ${errors.name ? 'popup__input_type_error' : ''}`}
          type="text"
          name="name"
          placeholder="Nombre"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className={`popup__error ${errors.name ? 'popup__error_visible' : ''}`}>
          {errors.name}
        </span>
      </label>
      <label className="popup__label">
        <input
          className={`popup__input ${errors.description ? 'popup__input_type_error' : ''}`}
          type="text"
          name="description"
          placeholder="Acerca de mí"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <span className={`popup__error ${errors.description ? 'popup__error_visible' : ''}`}>
          {errors.description}
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

export default EditProfile;