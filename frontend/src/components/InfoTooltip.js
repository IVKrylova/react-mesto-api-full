import success from '../images/icon-success.svg';
import fail from '../images/icon-fail.svg';

function InfoTooltip(props) {

  return(
    <section className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container registration-result">
        <button onClick={props.onClose} type="button" className="button-close" aria-label="Кнопка закрыть"></button>
        <img className="registration-result__icon" src={props.isRegistred ? success : fail} alt="Иконка результата авторизации" />
        <h3 className="title registration-result__title">{props.isRegistred ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h3>
      </div>
    </section>
  );
}

export default InfoTooltip;
