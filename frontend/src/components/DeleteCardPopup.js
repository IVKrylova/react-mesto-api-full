import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {

  // обраотчик формы
  function handleSubmit(evt) {
    // запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // передаём значение во внешний обработчик
    props.onDeleteCard(props.cardId);
  }

  return (
    <PopupWithForm name="delete-card" title="Вы уверены?"
                  isOpen={props.isOpen}
                  onClose={props.onClose}
                  onSubmit={handleSubmit}
                  buttonText={props.buttonText}
                  isValid={true} />
  );
}

export default DeleteCardPopup;
