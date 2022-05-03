import React, { useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function AddPlacePopup(props) {
  // запускаем валидацию формы
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  // обраотчик формы
  function handleSubmit(evt) {
    // запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  // сброс значений инпутов формы
  useEffect(_ => {
    resetForm();
  }, [props.isOpen]);

  return (
    <PopupWithForm name="add-card" title="Новое место"
                  isOpen={props.isOpen}
                  onClose={props.onClose}
                  isRenderLoading={props.isRenderLoading}
                  buttonText={props.buttonText}
                  onSubmit={handleSubmit}
                  isValid={isValid}>
      <input type="text" id="place" name="name" placeholder="Название" required minLength="2" maxLength="30"
            className={`form__item ${!isValid && 'form__item_type_error'}`}
            value={values.name || ''}
            onChange={handleChange} />
      <span className={`form__input-error ${!isValid && 'form__input-error_active'}`}>
        {!isValid && errors.name}
      </span>
      <input type="url" id="place-url" name="link" placeholder="Ссылка на картинку" required
            className={`form__item ${!isValid && 'form__item_type_error'}`}
            value={values.link  || ''}
            onChange={handleChange} />
      <span className={`form__input-error ${!isValid && 'form__input-error_active'}`}>
        {!isValid && errors.link}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
