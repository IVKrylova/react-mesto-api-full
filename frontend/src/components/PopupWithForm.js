function PopupWithForm(props) {

  return(
    <section className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button onClick={props.onClose} type="button" className="button-close" aria-label="Кнопка закрыть"></button>
        <h3 className="title popup__title">{props.title}</h3>
        <form onSubmit={props.onSubmit} className="popup__form form" name={`form-${props.name}`} id={`form-${props.name}`} noValidate>
          {props.children}
          <button disabled={!props.isValid} type="submit" className={`form__button ${!props.isValid && 'form__button_disabled'}`}>{props.isRenderLoading ? 'Cохранение...' : props.buttonText}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
