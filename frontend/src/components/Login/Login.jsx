import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    onLogin(formData.email, formData.password);
  };

  return (
    <div className="auth">
      <p className="auth__welcome">Iniciar sesión</p>
      <form onSubmit={handleSubmit} className="auth__form">
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          className="auth__input"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="auth__input"
          required
        />
        <button type="submit" className="auth__button">Iniciar sesión</button>
      </form>
      <p className="auth__signin">
        ¿Aún no eres miembro? <Link to="/signup" className="auth__link">Regístrate aquí</Link>
      </p>
    </div>
  );
}

export default Login;