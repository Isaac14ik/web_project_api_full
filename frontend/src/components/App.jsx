import { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header/Header';  
import Main from './Main/Main';      
import Footer from './Footer/Footer';  
import Popup from './Popup/Popup';
import EditProfile from './EditProfile/EditProfile';
import EditAvatar from './EditAvatar/EditAvatar';
import NewCard from './NewCard/NewCard';
import ImagePopup from './ImagePopup/ImagePopup';
import RemoveCard from './RemoveCard/RemoveCard';
import Login from './Login/Login';
import Register from './Register/Register';
import InfoTooltip from './InfoTooltip/InfoTooltip';
import ProtectedRoute from './ProtectedRoute'; 
import api from '../utils/api';
import * as auth from '../utils/auth';
import CurrentUserContext from '../contexts/CurrentUserContext';
import '../index.css';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [popup, setPopup] = useState(null);
  const [cardToRemove, setCardToRemove] = useState(null);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.getContent(token)
        .then((user) => {
          if (user && user.email) {
            api.setToken(token);
            setEmail(user.email);
            setIsLoggedIn(true);
            history.push('/');
          }
        })
        .catch((error) => {
          console.error(error);
          localStorage.removeItem('jwt'); 
        });
    }
  }, [history]);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getCardList()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData || []);
        })
        .catch((error) => console.error(error));
    }
  }, [isLoggedIn]);

  const handleRegister = (userEmail, password) => {
    auth.register(userEmail, password)
      .then(() => {
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
        history.push('/signin');
      })
      .catch((error) => {
        console.error(error);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleLogin = (userEmail, password) => {
    auth.authorize(userEmail, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          api.setToken(data.token);
          
          auth.getContent(data.token)
            .then((user) => {
              if (user && user.email) {
                setEmail(user.email);
                setIsLoggedIn(true);
                setIsSuccess(true); 
                setIsInfoTooltipOpen(true); 
                history.push('/');
              }
            })
            .catch((error) => console.error(error));
        }
      })
      .catch((error) => {
        console.error(error);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setEmail('');
    history.push('/signin');
  };

  const handleOpenPopup = (popupName) => {
    setPopup(popupName);
  };

  const handleClosePopup = () => {
    setPopup(null);
    setSelectedCard(null);
    setCardToRemove(null);
    setIsInfoTooltipOpen(false);
  };

  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  const handleUpdateAvatar = (data) => {
    api
      .setUserAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  const handleCardLike = (card) => {
    const isLiked = card.isLiked;
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  };

  const handleCardDelete = (card) => {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((currentCard) => currentCard._id !== card._id));
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleRemoveClick = (card) => {
    setCardToRemove(card);
    setPopup('remove');
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <Header isLoggedIn={isLoggedIn} userEmail={email} onSignOut={handleSignOut} />
      
      <Switch>
        <Route path="/signup">
          <Register onRegister={handleRegister} />
        </Route>

        <Route path="/signin">
          <Login onLogin={handleLogin} />
        </Route>

        <ProtectedRoute
          path="/"
          exact
          isLoggedIn={isLoggedIn}
        >
          <div className="page">
            <div className="page__content">
              <Main
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onCardClick={handleCardClick}
                onRemoveClick={handleRemoveClick}
                onOpenPopup={handleOpenPopup}
              />
              <Footer />
            </div>

            {popup === 'edit' && (
              <Popup onClose={handleClosePopup}>
                <EditProfile onClose={handleClosePopup} />
              </Popup>
            )}

            {popup === 'avatar' && (
              <Popup onClose={handleClosePopup}>
                <EditAvatar onClose={handleClosePopup} />
              </Popup>
            )}

            {popup === 'newcard' && (
              <Popup onClose={handleClosePopup}>
                <NewCard onAddPlace={handleAddPlaceSubmit} onClose={handleClosePopup} />
              </Popup>
            )}

            {selectedCard && (
              <ImagePopup card={selectedCard} onClose={handleClosePopup} />
            )}

            {cardToRemove && popup === 'remove' && (
              <Popup onClose={handleClosePopup}>
                <RemoveCard
                  card={cardToRemove}
                  onConfirmDelete={handleCardDelete}
                  onClose={handleClosePopup}
                />
              </Popup>
            )}
          </div>
        </ProtectedRoute>

        <Route path="*">
          {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
        </Route>
      </Switch>

      <InfoTooltip isOpen={isInfoTooltipOpen} onClose={handleClosePopup} isSuccess={isSuccess} />
    </CurrentUserContext.Provider>
  );
}

export default App;
