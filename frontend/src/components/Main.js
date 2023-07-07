import React from 'react';
import profileImage from '../images/image.png'
import api from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {
    const currentUserContext = React.useContext(CurrentUserContext)
   
    
    return (
        <main>
            <section className="profile">
                    <div className="profile__avatar-container"  onClick={onEditProfile}>
                        <img src={currentUserContext.avatar} alt="Аватар Профиля" className="profile__avatar"/>
                    </div>
                    <div className="profile__info">
                        <div className="profile__heading">
                            <h1 className="profile__name">{currentUserContext.name}</h1>
                            <button type="button" className="button profile__button-edit" onClick={onEditAvatar}></button>
                        </div>
                        <p className="profile__job">{currentUserContext.about}</p>
                    </div>
                    <button type="button" className="button profile__button-add" onClick={onAddPlace}></button>
            </section>
            <section className="cards">
                {cards.map((card) => <Card key={card._id} card={card} onCardClick={onCardClick}  onCardLike={onCardLike} onCardDelete={onCardDelete}/>)
                }
            </section>
        </main>
    );
}

export default Main