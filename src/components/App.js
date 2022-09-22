import React from "react";
// import { BrowserRouter } from "react-router-dom";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState } from "react";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import Card from "./Card";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import auth from "../utils/auth";

function App() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [isPreviewImageOpen, setIsPreviewImageOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = React.useState({
    _id: "",
    name: "",
    aboutMe: "",
    avatar: "",
  });
  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [TooltipStatus, setTooltipStatus] = React.useState("");
  const [IsInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser({
          _id: res._id,
          name: res.name,
          aboutMe: res.about,
          avatar: res.avatar,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setEmail(res.data.email);
          setLoggedIn(true);
          history.push("/");
        } else {
          localStorage.removeItem("jwt");
        }
      });
    }
  }, []);

  // function handleLogin() {
  //   setLoggedIn(true);
  // }

  function handleLogin({ email, password }) {
    auth.signin(email, password).then((res) => {
      if (res.token) {
        setLoggedIn(true);
        setEmail(email);
        localStorage.setItem("jwt", res.token);
        history.push("/");
      } else {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
      }
    });
  }

  function handleRegister({ email, password }) {
    auth
      .signup(email, password)
      .then((res) => {
        if (res.data._id) {
          setTooltipStatus("success");
          setIsInfoToolTipOpen(true);
          history.push("/signin");
        } else {
          setTooltipStatus("fail");
          setIsInfoToolTipOpen(true);
        }
      })
      .catch((err) => {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
      });
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/signin");
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

  function handleTrashBinClick() {
    setIsDeletePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setIsPreviewImageOpen(true);
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPreviewImageOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  const handleUpdateUser = (name, about) => {
    api
      .editProfile(name, about)
      .then((res) => {
        setCurrentUser({
          _id: res._id,
          name: res.name,
          aboutMe: res.about,
          avatar: res.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (avatar) => {
    console.log("avatar", avatar);
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser({
          _id: res._id,
          name: res.name,
          aboutMe: res.about,
          avatar: res.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    // Send a request to the API and getting the updated card data
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then(() => {
        setCards((cards) =>
          cards.filter((currentCard) => currentCard._id !== id)
        );
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    api
      .createCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} onSignOut={onSignOut} />
        <Switch>
          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          <Route exact path="/signup">
            <Register
              onRegister={handleRegister}

              // tockenCheck={this.tockenCheck}
            />
          </Route>
          <ProtectedRoute path="/" loggedIn={loggedIn}>
            <Main
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onEditAvatarClick={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </ProtectedRoute>
          {/* <Route path="*" element={<Redirect to="/" replace />} /> */}
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>

        <ImagePopup
          card={selectedCard}
          isOpen={isPreviewImageOpen}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          // onUpdateUser={handleUpdateUser}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <DeleteCardPopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        {/* <section className="photos">
          {cards.map((card) => (
            <Card
              {...card}
              key={card._id}
              onCardClick={handleCardClick}
              // onTrashBinClick={handleTrashBinClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onTrashBinClick={handleTrashBinClick}
            />
          ))}
          ;
        </section> */}
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
