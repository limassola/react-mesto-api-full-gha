import React from "react";

function PopupWithForm(props) {
    return (
        <div className={props.isOpen ? 'popup popup_opened' : 'popup'}>
            <div className={`popup__container popup__container_type_${props.name}`}>
                <button type="button" className="button popup__button" onClick={props.onClose}></button>
                <form className={`form form_type_${props.name}`} name={`popup_${props.name}`} noValidate onSubmit={props.onSubmit}>
                    <h2 className={`form__title form__title_type_${props.name}`}>{props.title}</h2>
                    {props.children}
                    <button type="submit" className="button form__button" >{props.buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm