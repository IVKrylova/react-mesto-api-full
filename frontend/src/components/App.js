import React, { useEffect, useState } from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ProtectedRoute from './ProtectedRoute';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  // хуки состояния открытия/закрытия popup
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen ] = useState(false);
  // хуки состояния текущего id карточки
  const [currentCardId, setCurrentCardId] = useState('');
  // хуки состояния popup с изображением
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });;
  // хуки состояния данных о пользователе
  const [currentUser, setCurrentUser] = useState({ name: '', description: '', avatar: '', id: '' });
  // хуки состояния загрузки массива карточек
  const [cards, setCards] = useState([]);
  // хуки состояния индикатора загрузки запросов
  const [isRenderLoading, setIsRenderLoading] = useState(false);
  // хуки состояния авторизации пользователя
  const [loggedIn, setLoggedIn] = useState(false);
  // хуки состояния разворачивающегося меню
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // хуки состояния popup в InfoTooltip
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  // хуки состояния регистрации нового пользователя
  const [isRegistred, setIsRegistred] = useState(false);
  // хуки состояния email авторизированного пользователя
  const [email, setEmail] = useState('');
  // получаем доступ к объекту history
  const history = useHistory();

  // обработчик клика на лайк
  function handleCardLike(card) {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser.id);

    // oтправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card.id, isLiked)
      .then(newCard => {
        const newArrayCards = cards.map(item => item._id === card.id ? newCard : item);

        setCards(newArrayCards);
      })
      .catch(err => console.log(err));
  }

  useEffect(_ => {
    // обработчик закрытия popup при нажатии на Esc
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return _ => document.removeEventListener("keydown", handleEscClose);
  }, []);

  // обработчик закрытия popup при клике вне его
  function handleBackgroundClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }

  // обработчик удаления карточки
  function handleCardDelete(props) {
    api.deleteCard(props)
      .then(_ => {
        const newArrayCards = cards.filter(item => item._id !== props);

        setCards(newArrayCards);
        setCurrentCardId('');
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  // открытие popup для удаления карточки
  function handleOpenCardClick(evt) {
    setIsDeleteCardPopupOpen(true);
    setCurrentCardId(evt.target.value);
  }

  // открытие popup для редактирования аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // открытие popup в profile__info
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // открытие popup для добавления карточки в elements
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // закрытие всех popup
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({...{name: '', link: ''}});
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  // открытие popup с изображением
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // обработчик изменения информации о пользователе
  function handleUpdateUser(props) {
    setIsRenderLoading(true);
    api.editProfileInfo(props)
      .then(data => {
        setCurrentUser({ name: data.name, description: data.about, avatar: data.avatar, id: data._id });
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(_ => setIsRenderLoading(false));
  }

  // обработчик изменения аватара
  function handleUpdateAvatar(props) {
    setIsRenderLoading(true);
    api.editAvatar(props.avatar)
      .then(data => {
        setCurrentUser({ name: data.name, description: data.about, avatar: data.avatar, id: data._id });
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(_ => setIsRenderLoading(false));
  }

  // обработчик добавления новой карточки
  function handleAddPlaceSubmit(props) {
    setIsRenderLoading(true);
    api.sendNewCard(props)
      .then(data => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(_ => setIsRenderLoading(false));
  }

  useEffect(_ => {
    // загрузка информации о пользователе с сервера, загрузка массива карточек
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, cards]) => {
      // установка данных о пользователе
      const { name, about, avatar, _id } = user;
      setCurrentUser({ name: name, description: about, avatar: avatar, id: _id });

      // установка массива карточек
      setCards(cards);
    })
    .catch(err => console.log(err))
  }, []);

  // обработчик переключения меню
  function handleToggleMenu() {
    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
  }

  // обработчик формы регистрации
  function handleSubmitRegistration(props) {
    auth.register(props.password, props.email)
      .then(_ => {
        setIsRegistred(true);
      })
      .catch(err => console.log(err))
      .finally(_ => setIsInfoTooltipOpen(true));
  }

  // настройка переадресации на страницу входа после удачной регистрации
  useEffect(_ => {
    if (!isInfoTooltipOpen && isRegistred) {
      history.push('/sign-in');
      // меняем isRegistred, чтобы работала ссылка "Регистрация" в header
      setIsRegistred(false);
    }
  }, [isInfoTooltipOpen]);

  // обработчик формы авторизации
  function handleSubmitLogin(props) {
    // сохраняем email в Local storage
    localStorage.setItem('email', props.email);

    auth.authorize(props.password, props.email)
      .then(data => {
        // сохраняем токен в Local storage
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
      })
      .catch(err => console.log(err))
  }

  // установка значения для авторизированного пользователя
  useEffect(_ => {
    setEmail(localStorage.getItem('email'));
  }, [loggedIn]);

  // функция проверки токена
  function tokenCheck() {
    const token = localStorage.getItem('token');

    if (token) {
      // проверяем данные о пользователе по токену
      auth.sendToken(token)
      .then(data => {
        const email = data.data.email;
        if (email === localStorage.getItem('email')) {
          setLoggedIn(true);
        }
      })
      .catch(err => console.log(err));
    }
  }

  // проверяем токен при загрузке приложения
  useEffect(_ => tokenCheck(), []);

  // проверяем, авторизирован ли пользователь и загружаем приложение
  useEffect(_ => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn]);

  // обработчик выхода из приложения
  function handleExit() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setEmail('');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="site-background"
          onClick={handleBackgroundClose}>
        <div className="page">
          <Switch>
            <ProtectedRoute exact path="/"
              loggedIn={loggedIn}
              component={ <>
                <Header isMenuOpen={isMenuOpen}
                        onToggleMenu={handleToggleMenu}
                        email={email}
                        onExit={handleExit} />
                <Main onEditAvatar={handleEditAvatarClick}
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onCardClick={handleCardClick}
                      cards={cards}
                      onCardLike={handleCardLike}
                      onCardDelete={handleOpenCardClick} />
                <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar}
                                isOpen={isEditAvatarPopupOpen}
                                onClose={closeAllPopups}
                                buttonText="Сохранить"
                                isRenderLoading={isRenderLoading} />
                <EditProfilePopup onUpdateUser={handleUpdateUser}
                                  isOpen={isEditProfilePopupOpen}
                                  onClose={closeAllPopups}
                                  buttonText="Сохранить"
                                  isRenderLoading={isRenderLoading} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen}
                              onClose={closeAllPopups}
                              onAddPlace={handleAddPlaceSubmit}
                              buttonText="Создать"
                              isRenderLoading={isRenderLoading} />
                <DeleteCardPopup isOpen={isDeleteCardPopupOpen}
                                onClose={closeAllPopups}
                                cardId={currentCardId}
                                onDeleteCard={handleCardDelete}
                                buttonText="Да" />
                <ImagePopup card={selectedCard}
                            onClose={closeAllPopups} />
              </>}>
            </ProtectedRoute>
            <Route path="/sign-up">
              <Header />
              <Register onRegister={handleSubmitRegistration}
                        isRegistred={isRegistred} />
              <InfoTooltip isOpen={isInfoTooltipOpen}
                          onClose={closeAllPopups}
                          isRegistred={isRegistred} />
            </Route>
            <Route path="/sign-in">
              <Header />
              <Login onLogin={handleSubmitLogin}
                    loggedIn={loggedIn} />
            </Route>
          </Switch>
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
