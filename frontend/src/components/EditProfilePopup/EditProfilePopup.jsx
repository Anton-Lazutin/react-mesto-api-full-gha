import { useContext, useEffect } from "react";
import useFormValidation from "../../hooks/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isLoaderMessage,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, reset } =
    useFormValidation();

    useEffect(() => {
      if (isOpen) {
        reset({ username: currentUser.name, hobby: currentUser.about });
      }
    }, [isOpen, currentUser]);

  // function resetForClose() {
  //   onClose();
  //   reset({ username: currentUser.name, hobby: currentUser.about });
  // }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ username: values.username, hobby: values.hobby }, reset);
  }

  return (
    <PopupWithForm
      name="edit-form"
      title="Редактировать профиль"
      loaderMessage="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
      isLoaderMessage={isLoaderMessage}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        required
        minLength={2}
        maxLength={40}
        className="popup__input popup__input_type_name"
        name="username"
        placeholder="Введите имя"
        id="name"
        value={values.username ? values.username : ""}
        disabled={isLoaderMessage}
        onChange={handleChange}
      />
      <span id="error-name" className="popup__error-message">
        {errors.username}
      </span>
      <input
        type="text"
        required
        minLength={2}
        maxLength={200}
        className="popup__input popup__input_type_hobby"
        name="hobby"
        placeholder="О себе"
        id="hobby"
        value={values.hobby ? values.hobby : ""}
        disabled={isLoaderMessage}
        onChange={handleChange}
      />
      <span id="error-hobby" className="popup__error-message">
        {errors.hobby}
      </span>
    </PopupWithForm>
  );
}
