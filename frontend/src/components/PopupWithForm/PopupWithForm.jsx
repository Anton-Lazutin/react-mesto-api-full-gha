import { useEffect } from "react";

export default function PopupWithForm({
  name,
  title,
  titleButton,
  children,
  isOpen,
  onClose,
  onSubmit,
  isLoaderMessage,
  loaderMessage,
  isValid = true,
}) {
  const handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    } else {
      document.removeEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen]);

  return (
    <section
      className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="popup__container"
        onClick={(evt) => evt.stopPropagation()}
      >
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__input-form"
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={`popup__submit-btn ${
              isValid ? "" : "popup__submit-btn_invalid"
            }`}
            type="submit"
            disabled={isLoaderMessage || !isValid}
          >
            {isLoaderMessage ? loaderMessage : titleButton || "Сохранить"}
          </button>
        </form>
        <button
          className="popup__close-btn popup__close-btn_edit-form"
          type="button"
          onClick={onClose}
        />
      </div>
    </section>
  );
}
