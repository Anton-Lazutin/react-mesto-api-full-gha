import { Link, Route, Routes } from "react-router-dom";
import logo from "../../images/logo-mesto.svg";
import React from "react";

export default function Header({ logout, userEmail }) {
  return (
    <header className="header">
      <img className="header__logo" alt="лого Место Россия" src={logo} />
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <>
              <div className="header__info">
                <p className="header__email">{userEmail}</p>
                <button onClick={logout} className="header__logout">
                  Выйти
                </button>
              </div>
            </>
          }
        />
      </Routes>
    </header>
  );
}
