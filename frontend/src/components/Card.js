import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUserContext = React.useContext(CurrentUserContext)
    const isOwn = card.owner._id === currentUserContext._id;
    const isLiked = card.likes.some(i => i._id === currentUserContext._id);
    const cardLikeButtonClassName = ( 
        `button cards__button-like ${isLiked && 'cards__button-like_active'}` 
      );

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
      onCardLike(card)
    }  

    function handleDeleteClick() {
      onCardDelete(card)
    }
    
    return (
        <div className="cards__item">
            <img className="cards__image" src={card.link} alt={card.name} onClick={handleClick}/>
            {isOwn && <button className='cards__button-delete' onClick={handleDeleteClick}/>}
            <div className="cards__heading">
                <h2 className="cards__title">{card.name}</h2>
                <div className="cards__like-container">
                    <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName}></button>
                    <p className="cards__like-counter">{card.likes.length}</p>
                </div>
            </div>
          </div>
    )
}

export default Card