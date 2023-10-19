import SuccessIcon from "../../images/successful.svg";
import FailIcon from "../../images/error.svg";
import React from "react";

export default function InfoTooltip({isOpen, answer, onClose}) {
  
  return(
      <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
          <div className="popup__container">
              <img
                  className="popup__auth-image"
                  alt={answer.status ? "Авторизация успешна" : "Что-то пошло не так"}
                  src={answer.status ? SuccessIcon : FailIcon}>
              </img>
              <h2 className="popup__title popup__title_auth">{answer.text}</h2>
              <button
                  className="popup__close-btn"
                  type="button"
                  onClick={onClose}>
              </button>
          </div>
      </div>
  )
}