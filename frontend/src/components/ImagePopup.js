import React from "react";

function ImagePopup({card, onClose}) {
    return(
        <div className={`popup popup_type_image ${card && 'popup_opened'}`}>
            <div className="popup__container popup__container_type_image">
                <button type="button" className="button popup__button" onClick={onClose}></button>
                <img className="popup__image" src={card ? card.link : ''} alt={card ? card.name : ''}/>
                <p className="popup__title">{card ? card.name : ''}</p>
            </div>
        </div>
    )
}

export default ImagePopup