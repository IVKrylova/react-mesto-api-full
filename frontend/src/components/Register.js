import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

function Register(props) {
  return (
    <section className="register">
      <AuthForm sendProperty={props.onRegister}
                property={props.isRegistred}
                title="Регистрация"
                formName="register"
                buttonText="Зарегистрироваться" />
      <p className="register__text">
        Уже зарегистрированы?{'\u00A0'}
        <Link to="/sign-in" className="register__link">Войти</Link>
      </p>
    </section>
  );
}

export default Register;
