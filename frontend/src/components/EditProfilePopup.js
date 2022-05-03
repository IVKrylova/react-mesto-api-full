import React, { useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function EditProfilePopup(props) {
  // подписываемся на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);
  // запускаем валидацию формы
  const { values, handleChange, errors, isValid, setValues, setErrors, setIsValid } = useFormAndValidation();

  // после загрузки текущего пользователя из API eго данные будут использованы в управляемых компонентах
  React.useEffect(_ => {
    setValues({ name: currentUser.name, description: currentUser.description});
    setErrors({});
    setIsValid(true);
  }, [currentUser, props.isOpen]);

  // обраотчик формы
  function handleSubmit(evt) {
    // запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: values.name,
      description: values.description,
    });
  }

  return (
    <PopupWithForm name="edit-profile" title="Редактировать профиль"
                  isOpen={props.isOpen}
                  onClose={props.onClose}
                  isRenderLoading={props.isRenderLoading}
                  onSubmit={handleSubmit}
                  buttonText={props.buttonText}
                  isValid={isValid}>
      <input type="text" id="name" name="name" placeholder="Имя" minLength="2" maxLength="40" required
            className={`form__item ${!isValid && 'form__item_type_error'}`}
            value={values.name  || ''}
            onChange={handleChange} />
      <span className={`form__input-error ${!isValid && 'form__input-error_active'}`}>
        {!isValid && errors.name}
      </span>
      <input type="text" id="profession" name="description" placeholder="О себе" required minLength="2" maxLength="200"
            value={values.description  || ''}
            onChange={handleChange}
            className={`form__item ${!isValid && 'form__item_type_error'}`} />
      <span className={`form__input-error ${!isValid && 'form__input-error_active'}`}>
        {!isValid && errors.description}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
