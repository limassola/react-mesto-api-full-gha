import React from 'react';
import { Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import '../index.css';
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { checkValidity } from './Auth';
import InfoTooltip from './InfoTooltip';
import { signin, signup } from './Auth';

function App() {
    const [isEditProfilePopupOpen, setOpenProfilePopup] = React.useState(false);
    const [isAddPlacePopupOpen, setOpenPlacePopup] = React.useState(false);
    const [isEditAvatarPopupOpen, setOpenAvatarPopup] = React.useState(false);
    const [loggedIn, setloggedIn] = React.useState(false);
    const [userData, setUserData] = React.useState('');
    const [isSuccess, setSuccess] = React.useState(false);
    const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false)
    const navigate = useNavigate();
  

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
    
    function handleLogin() {
        setloggedIn(true)
    }

    function tokenCheck() {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            checkValidity(jwt)
            .then((user) => {
                handleLogin()
                setUserData(user.data.email)
                navigate('/')
            })
            .catch(err => console.log(err))
        }
    }

    React.useEffect(() => {
        tokenCheck();
    }, []);

    function signOut(){
        localStorage.removeItem('jwt');
        navigate('/sign-in');
        setloggedIn(false)
      }


    function closeAllPopups() {
        setOpenProfilePopup(false);
        setOpenPlacePopup(false);
        setOpenAvatarPopup(false);
        setSelectedCard(null);
        setInfoTooltipOpen(false)
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

    function closeInfoPopup() {
        setInfoTooltipOpen(false)
        if(isSuccess) {
            navigate('/sign-in')
        }
        
    }

    function login(password, email) {
        signin(password, email)
        .then((data) => {
            if(data.token) {
                localStorage.setItem('jwt', data.token)
                handleLogin()
                navigate('/')
            }
        })
        .catch((err) => {
            console.log(err)
            setSuccess(false)
            setInfoTooltipOpen(true)
        })
    }

    function registration(password, email) {
        signup(password, email)
        .then(() => {
            setSuccess(true)
            setInfoTooltipOpen(true)
        })
        .catch((err) => {
            console.log(err)
            setSuccess(false)
            setInfoTooltipOpen(true)
        })
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        {loggedIn ? 
        <Header signOut={signOut}>
            <div className='header__container'>
                <p className='header__item'>{userData}</p>
                <a onClick={signOut} className='header__link'>Выйти</a>
            </div>
        </Header> : null}
        <Routes>
            <Route path='/' element={<ProtectedRouteElement element={Main} loggedIn={loggedIn}  onEditProfile={handleOpenEditPopup} onAddPlace={handleOpenPlacePopup} onEditAvatar={handleOpenProfilePopup} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>}/>
            <Route path='/sign-in' element={<Login login={login}/>}/>
            <Route path='/sign-up' element={<Register registration={registration}/>}/>
            <Route path='/' element={loggedIn ? <Navigate to='/'/> : <Navigate to='/login' replace/>}/>
        </Routes>
        {loggedIn ? <Footer/> : null}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
            

            {/* <PopupWithForm name='delete' title='Вы уверены?' isOpen={}>
                <h2 className="form__title form__title_type_delete">Вы уверены?</h2>
                <button type="submit" className="button form__button">Да</button>
            </PopupWithForm> */}
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isSuccess={isSuccess} isOpen={isInfoTooltipOpen} onClose={closeInfoPopup}/>
        </CurrentUserContext.Provider>
  );
}

export default App;
