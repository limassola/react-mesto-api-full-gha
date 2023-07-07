import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
    const [isEditProfilePopupOpen, setOpenProfilePopup] = React.useState(false);
    const [isAddPlacePopupOpen, setOpenPlacePopup] = React.useState(false);
    const [isEditAvatarPopupOpen, setOpenAvatarPopup] = React.useState(false);

    const [selectedCard, setSelectedCard] = React.useState(null);
    
    const [currentUser, setCurrentUser] = React.useState([]);

    function handleOpenProfilePopup() {
        setOpenProfilePopup(true);
    }

    function handleOpenPlacePopup() {
        setOpenPlacePopup(true);
    }

    function handleOpenEditPopup() {
        setOpenAvatarPopup(true);
    }

    function handleCardClick(selectedCard){
        setSelectedCard(selectedCard)
    } 

    function closeAllPopups() {
        setOpenProfilePopup(false);
        setOpenPlacePopup(false);
        setOpenAvatarPopup(false);
        setSelectedCard(null);
    }

    React.useEffect(() => {
        api.getUserInfo()
        .then((data) => {
            setCurrentUser(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    function handleUpdateUser({name, about}) {
        api.editUserInfo(name, about)
        .then((data) => {
            setCurrentUser(data)
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    function handleUpdateAvatar({avatar}) {
        api.setAvatar(avatar)
        .then((data) => {
            setCurrentUser(data)
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err)
        })
    }
    const [cards, setCards] = React.useState([]);
    

    React.useEffect(() => {
        api.getInitialCards()
        .then((cardsData) => {
            setCards(cardsData)
        })
        .catch((err) => {
            console.log(err)
        });
    }, [])

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
            console.log(err)
        });
    }
    
    function handleCardDelete(card) {
        api.deleteCard(card._id)
        .then(() => {
            setCards((cards) => cards.filter((c) => c._id !== card._id))
        })
        .catch((err) => {
            console.log(err)
        })
    }

    function handleAddPlaceSubmit({name, link}) {
        api.addCard(name, link)
        .then((newCard) => {
            setCards([newCard, ...cards])
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err)
        })
    }


  return (
    <CurrentUserContext.Provider value={currentUser}>
        <Header/>
        <Main onEditProfile={handleOpenEditPopup} onAddPlace={handleOpenPlacePopup} onEditAvatar={handleOpenProfilePopup} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
        <Footer/>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        

        {/* <PopupWithForm name='delete' title='Вы уверены?' isOpen={}>
            <h2 className="form__title form__title_type_delete">Вы уверены?</h2>
            <button type="submit" className="button form__button">Да</button>
        </PopupWithForm> */}
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
  );
}

export default App;
