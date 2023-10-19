import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((like) => like._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;

  return (
    <article className="card">
      <img
        src={card.link}
        alt={`фото ${card.name}`}
        className="card__pic"
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      {isOwn && (
        <button
          className="card__dlt-btn"
          type="button"
          onClick={() => onDelete(card._id)}
        />
      )}
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={() => onCardLike(card)}
          />
          <span className="card__like-nmbr">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}
