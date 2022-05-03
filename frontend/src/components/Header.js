import logo from '../images/header-logo.svg';
import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

function Header(props) {
  // получаем текущий URL
  const location = useLocation();
  const currentUrl = location.pathname;

  return (
    <header className="header">
      {/* Развернутое меню для tablet и mobile */}
      {currentUrl === '/' && <div className={`header__expanding-menu ${props.isMenuOpen && 'header__expanding-menu_visible'}`}>
                                <p className="header__email header__email_place_expanding-menu">{props.email}</p>
                                <Link to="/sign-in" onClick={props.onExit} className="header__link header__link_logged header__link_place_expanding-menu">Выйти</Link>
                             </div>}
      <div className="header__content">
        <img className="header__logo" src={logo} alt="Логотип" />
        {currentUrl === '/sign-in' && <Link to="sign-up" className="header__link">Регистрация</Link>}
        {currentUrl === '/sign-up' && <Link to="/sign-in" className="header__link">Войти</Link>}
        {currentUrl === '/' && <div className="header__logged-menu">
                                  {/* Меню для desktop */}
                                  <div className="header__desktop-menu">
                                    <p className="header__email">{props.email}</p>
                                    <Link to="/sign-in" onClick={props.onExit} className="header__link header__link_logged">Выйти</Link>
                                  </div>
                                  {/* Меню для tablet и mobile */}
                                  <div className="header__tablet-mobile-menu">
                                    <button type="button"  aria-label="Иконка меню"
                                            onClick={props.onToggleMenu}
                                            className={`header__icon-menu ${props.isMenuOpen && 'header__icon-menu_invisible'}`}></button>
                                    <button type="button" aria-label="Иконка закрыть меню"
                                            onClick={props.onToggleMenu}
                                            className={`header__icon-close-menu ${props.isMenuOpen && 'header__icon-close-menu_visible'}`}></button>
                                  </div>
                                </div>}
      </div>
    </header>
  );
}

export default Header;
