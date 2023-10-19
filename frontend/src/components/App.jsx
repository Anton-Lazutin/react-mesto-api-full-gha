import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import { authorize, register, checkToken } from "../utils/auth.js";
import Register from "./Register/Register.jsx";
import Login from "./Login/Login.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";

export default function App() {
  const navigate = useNavigate();
  // state popups
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isImagePopup, setImagePopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  //loaderMessage
  const [isLoaderMessageForEditProfile, setIsLoaderMessageForEditProfile] = useState(false);
  const [isLoaderMessageForAddPlace, setIsLoaderMessageForAddPlace] = useState(false); 
  const [isLoaderMessageForAvatar, setIsLoaderMessageForAvatar] = useState(false);
  const [isLoaderMessageForDelete, setIsLoaderMessageForDelete] = useState(false);
  // state context
  const [currentUser, setCurrentUser] = useState({});
  //state cards
  const [cards, setCards] = useState([]);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [deleteCardId, setDeleteCardId] = useState("");
  // state login and registration
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [infoTooltipState, setInfoTooltipState] = useState({
    status: false,
    text: "",
  });

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopup(false);
    setIsDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopup(true);
  }

  function handleDeleteCardClick(cardId) {
    setDeleteCardId(cardId);
    setIsDeletePopupOpen(true);
  }

  useEffect(() => {
    if (loggedIn) {
      setIsLoadingCards(true);
      Promise.all([api.getInfo(localStorage.getItem("jwt")), api.getCards(localStorage.getItem("jwt"))])
        .then(([dataUser, dataCard]) => {
          setCurrentUser(dataUser);
          setCards(dataCard);
        })
        .catch((error) => console.error(`Ошибка: ${error}`))
        .finally(() => setIsLoadingCards(false));
    }
  }, [loggedIn]);
  

  function handleDeleteSubmit(evt) {
    evt.preventDefault();
    setIsLoaderMessageForDelete(true);
    api
      .deleteCard(deleteCardId, localStorage.getItem("jwt"))
      .then(() => {
        setCards((prevCards) => {
          return prevCards.filter((card) => {
            return card._id !== deleteCardId;
          });
        });
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка: ${error}`))
      .finally(() => setIsLoaderMessageForDelete(false));
  }
  
  function handleUpdateUser(dataUser, reset) {
    setIsLoaderMessageForEditProfile(true);
    api
      .setUserInfo(dataUser, localStorage.getItem("jwt"))
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((error) => console.error(`Ошибка: ${error}`))
      .finally(() => setIsLoaderMessageForEditProfile(false));
  }

  function handleUpdateAvatar(dataUser, reset) {
    setIsLoaderMessageForAvatar(true);
    api
      .setUserAvatar(dataUser, localStorage.getItem("jwt"))
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((error) => console.error(`Ошибка: ${error}`))
      .finally(() => setIsLoaderMessageForAvatar(false));
  }

  function handleAddPlaceSubmit(dataCard, reset) {
    setIsLoaderMessageForAddPlace(true);
    api
      .addCard(dataCard, localStorage.getItem("jwt"))
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        reset();
      })
      .catch((error) => console.error(`Ошибка: ${error}`))
      .finally(() => setIsLoaderMessageForAddPlace(false));
  }

  function handleLogin(data) {
    authorize(data.email, data.password)
      .then((res) => {
        setInfoTooltipState({
          status: true,
          text: "Вы успешно авторизовались!",
        });
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setUserEmail(data.email);
        navigate("/", { replace: true });
        setIsInfoTooltipOpen(true);
      })
      .catch(() => {
        setInfoTooltipState({
          status: false,
          text: "Что-то пошло не так! Попробуйте еще раз.",
        });
        setIsInfoTooltipOpen(true);
      });
  }

  function handleRegister(data) {
    register(data.email, data.password)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipState({
          status: true,
          text: "Вы успешно зарегистрировались!",
        });
        navigate("/sign-in", { replace: true });
      })
      .catch(() => {
        setInfoTooltipState({
          status: false,
          text: "Что-то пошло не так! Попробуйте еще раз.",
        });
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
    setLoggedIn(false);
    setUserEmail("");
  }

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      checkToken(localStorage.getItem("jwt"))
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.email);
          navigate("/", { replace: true });
        })
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  function handleCardLike(card) {
    const isLike = card.likes.some((like) => like._id === currentUser._id)

    if (isLike) {
      api
        .deleteLike(card._id, localStorage.getItem("jwt"))
        .then((newCard) => {
          setCards((state) => state.map((item) => item._id === card._id ? newCard : item))
        })
        .catch((error) => console.error(`Ошибка: ${error}`))
    } else {
      api
        .addLike(card._id, localStorage.getItem("jwt"))
        .then((newCard) => {
          setCards((state) => state.map((item) =>item._id === card._id ? newCard : item))
        })
        .catch((error) => console.error(`Ошибка: ${error}`))
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <div className="page">
          <Header logout={handleLogout} userEmail={userEmail} />

          <Routes>
            <Route
              path="/sign-up"
              element={
                <Register
                  title="Регистрация"
                  name="register"
                  handleRegister={handleRegister}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login title="Вход" name="login" handleLogin={handleLogin} />
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  component={Main}
                  loggedIn={loggedIn}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onDelete={handleDeleteCardClick}
                  isLoading={isLoadingCards}
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route path="*" element={<Navigate to="/sign-in" replace />} />
          </Routes>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoaderMessage={isLoaderMessageForEditProfile}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            isLoaderMessage={isLoaderMessageForAddPlace}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            isLoaderMessage={isLoaderMessageForAvatar}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            titleButton="Да"
            loaderMessage="Удаление..."
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleDeleteSubmit}
            isLoaderMessage={isLoaderMessageForDelete}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopup}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            answer={infoTooltipState}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
