import React, { useEffect } from 'react';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function AuthForm(props) {
  // запускаем валидацию формы
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  // обраотчик формы
  function handleSubmit(evt) {
    // запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // передаём значения управляемых компонентов во внешний обработчик
      props.sendProperty({
      email: values.email,
      password: values.password,
    });
  }

  // сброс значений инпутов формы
  useEffect(_ => {
    resetForm();
  }, [props.property]);

  return (
    <>
      <h3 className="title title_theme_dark">{props.title}</h3>
      <form onSubmit={handleSubmit} className={`form ${props.formName}__form`} name={`form-${props.formName}`} id={`form-${props.formName}`} noValidate>
        <input type="email" className="form__item form__item_theme_dark" id={`${props.formName}-email`} name="email" placeholder="Email" required
              value={values.email || ''}
              onChange={handleChange} />
        <span className={`form__input-error ${!isValid && 'form__input-error_active'}`}>
          {!isValid && errors.email}
        </span>
        <input type="password" className="form__item form__item_theme_dark" id={`${props.formName}-password`} name="password" placeholder="Пароль" required
              value={values.password || ''}
              onChange={handleChange} />
        <span className={`form__input-error ${!isValid && 'form__input-error_active'}`}>
          {!isValid && errors.password}
        </span>
        <button disabled={!isValid} type="submit" className="form__button form__button_theme_dark">{props.buttonText}</button>
      </form>
    </>
  );
}

export default AuthForm;
