import { useRef } from "react";
import useFormValidation from "../../hooks/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoaderMessage,
}) {
  const input = useRef();
  const { values, errors, isValid, handleChange, reset } = useFormValidation();

  function resetForClose() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: input.current.value }, reset);
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновоить аватар"
      loaderMessage="Сохранение..."
      isLoaderMessage={isLoaderMessage}
      isOpen={isOpen}
      onClose={resetForClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type="url"
        required
        className="popup__input popup__input_type_avatar"
        name="avatar"
        placeholder="Введите ссылку"
        id="avatar"
        ref={input}
        value={values.avatar ? values.avatar : ""}
        disabled={isLoaderMessage}
        onChange={handleChange}
      />
      <span id="error-avatar" className="popup__error-message">
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}
