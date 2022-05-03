import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  // подписываемся на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  // обработчик клика по карточке
  function handleClick() {
    props.onCardClick(props);
  }

  // обработчик клика на лайк
  function handleLikeClick() {
    props.onCardLike(props);
  }

  // oпределяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.owner._id === currentUser.id;

  // cоздаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `${isOwn ? 'button-delete' : 'button-delete_invisible'}`
  );

  // oпределяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.likes.some(i => i._id === currentUser.id);

  // cоздаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  );

  return (
    <li className="element">
      <a href="#" className="element__link-to-popup">
        <span onClick={handleClick} className="element__image" style={{ backgroundImage: `url(${props.link})` }} />
      </a>
      <button value={props.id} className={cardDeleteButtonClassName} onClick={props.onCardDelete} type="button" aria-label="Кнопка удалить карточку"></button>
      <div className="element__description">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__likes">
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button" aria-label="Кнопка поставить лайк"></button>
          <p className="element__count-like">{props.likes.length > 0 ? props.likes.length : ''}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
