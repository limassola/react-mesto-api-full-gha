import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);


    function handleAddName(e) {
        setName(e.target.value)
    }

    function handleAddLink(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()

        onAddPlace({name, link})
    }

    return(
        <>
            <PopupWithForm name='add' title='Новое место' buttonText="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input 
                className="form__item form__item_type_title" 
                type="text" 
                name="name" 
                id="input-title" 
                required 
                value={name}
                onChange={handleAddName} 
                placeholder="Название"
                minLength="2"
                maxLength="30"
            />
            <span id="input-title-error" className="form__error"></span>
            <input 
                type="url" 
                className="form__item form__item_type_link" 
                name="link" 
                id="input-link" 
                required 
                value={link}
                onChange={handleAddLink} 
                placeholder="Ссылка на аватар"
            />
            <span id="input-link-error" className="form__error"></span>
        </PopupWithForm>
        </>
    )
}

export default AddPlacePopup