import buttonEdit from "../../images/button__edit.svg";
import buttonAdd from "../../images/button__add.svg";
import Card from "../Card/Card.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Spinner from "../Spinner/Spinner.jsx";

export default function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onDelete,
  cards,
  isLoading,
  onCardLike
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <button
            type="button"
            className="profile__avatar-overlay"
            onClick={onEditAvatar}
          >
            <img
              src={currentUser.avatar ? currentUser.avatar : "#"}
              alt="Фото пользователя"
              className="profile__photo"
            />
          </button>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">
                {currentUser.name ? currentUser.name : ""}
              </h1>
              <button
                className="profile__edit-btn"
                type="button"
                onClick={onEditProfile}
              >
                <img
                  className="profile__edit-btn-pic"
                  src={buttonEdit}
                  alt="кнопка редактирования"
                />
              </button>
            </div>
            <p className="profile__hobby">
              {currentUser.about ? currentUser.about : ""}
            </p>
          </div>
        </div>
        <button className="profile__add-btn" type="button" onClick={onAddPlace}>
          <img
            className="profile__add-btn-pic"
            src={buttonAdd}
            alt="кнопка добавить"
          />
        </button>
      </section>
      <section className="photo-cards">
        {isLoading ? (
          <Spinner />
        ) : (
          cards.map((data) => {
            return (
              <article className="card" key={data._id}>
                <Card
                  card={data}
                  onCardClick={onCardClick}
                  onDelete={onDelete}
                  onCardLike = {onCardLike}
                />
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}
