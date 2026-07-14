import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Header({ isLoggedIn, userEmail, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <img src={logo} alt="Around the U.S. logo" className="header__logo" />
      <div className="header__nav">
        {isLoggedIn ? (
          <>
            <p className="header__email">{userEmail}</p>
            <button onClick={onSignOut} className="header__link header__link_type_logout">
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link
            to={location.pathname === '/signin' ? '/signup' : '/signin'}
            className="header__link"
          >
            {location.pathname === '/signin' ? 'Regístrate' : 'Iniciar sesión'}
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;