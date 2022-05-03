import React, { useState, useEffect, useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  // переменная для доступа к элементу инпута
  const inputRef = useRef();
  // хуки состояния ошибок input
  const [ error, setError ] = useState('');
  // хуки состояния валидности input
  const [isValid, setIsValid] = useState(false);

  // обработчик изменения инпута
  function handleSubmit(evt) {
    // запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  // функция проверки валидности input
  function checkInputUrl(evt) {
    setError(evt.target.validationMessage);
    setIsValid(evt.target.closest('form').checkValidity());
  }

  // сброс значений инпутов формы
  useEffect(_ => {
    inputRef.current.value = '';
    setIsValid(false);
    setError('');
  }, [props.isOpen]);

  return (
    <PopupWithForm name="edit-avatar" title="Обновить аватар"
                  onSubmit={handleSubmit}
                  isRenderLoading={props.isRenderLoading}
                  isOpen={props.isOpen} onClose={props.onClose}
                  buttonText={props.buttonText}
                  isValid={isValid}>
      <input type="url" id="avatar-url" name="avatar" placeholder="Ссылка на аватар" required
            className={`form__item ${!isValid && 'form__item_type_error'}`}
            onChange={checkInputUrl}
            ref={inputRef} />
      <span className={`form__input-error ${!isValid && 'form__input-error_active'}`}>
        {!isValid && error}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;


