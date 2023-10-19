import { useState } from "react";

export default function Login({ title, name, handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin({
      email,
      password,
    });
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  return (
    <section className="auth">
      <div className="auth__container">
        <h2 className="auth__title">{title}</h2>
        <form className="auth__form" name={name} onSubmit={handleSubmit}>
          <fieldset className="auth__fieldset">
            <div className="auth__error-container">
              <input
                className="auth__input"
                name="email"
                value={email}
                id="login-email"
                placeholder="Email"
                type="text"
                minLength="2"
                maxLength="40"
                onChange={handleEmailChange}
                required
              ></input>
            </div>
            <div className="auth__error-container">
              <input
                className="auth__input"
                name="password"
                value={password}
                id="login-password"
                placeholder="Password"
                type="password"
                minLength="2"
                maxLength="200"
                onChange={handlePasswordChange}
                required
              ></input>
            </div>
            <button className="auth__save-btn">Войти</button>
          </fieldset>
        </form>
      </div>
    </section>
  );
}
