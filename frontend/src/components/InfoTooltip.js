import React from "react";
import successImage from '../images/successImage.svg';
import errorImage from '../images/errorImage.svg';
import '../index.css';

function InfoTooltip({isOpen, onClose, isSuccess}) {
    const imageSrc = isSuccess ? successImage : errorImage;
    const title = isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';
    return(
        <div className={isOpen ? 'popup popup_opened' : 'popup'}>
            <div className={`popup__container popup__container_type_info`}>
                <button type="button" className="button popup__button" onClick={onClose}></button>
                <img src={imageSrc} alt={title}/>
                <p className="popup__title popup__title_type_info">{title}</p>
            </div>
        </div>
    )
}

export default InfoTooltip