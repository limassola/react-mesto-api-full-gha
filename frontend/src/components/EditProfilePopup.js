import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
const currentUser = React.useContext(CurrentUserContext);
const [name, setName] = React.useState('');
const [description, setDescription] = React.useState('');

function handleChangeName(event){
    setName(event.target.value)
}

function handleChangeDescription(event) {
    setDescription(event.target.value)
}

React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

    return(
        <>
        <PopupWithForm name='edit' title='Редактировать профиль' buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input 
                className="form__item form__item_type_name" 
                type="text" 
                name="name" 
                id="input-name" 
                required 
                value={name || ''}
                onChange={handleChangeName}
                minLength="2"
                maxLength="40"
                placeholder="Имя"
            />
            <span id="input-name-error" className="form__error form__error_visible"></span>
            <input 
                type="text" 
                className="form__item form__item_type_job" 
                name="about" 
                id="input-about" 
                required 
                value={description || ''}
                onChange={handleChangeDescription}
                minLength="2"
                maxLength="200"
                placeholder="Занятие"
            />
            <span id="input-about-error" className="form__error"></span>
        </PopupWithForm>
        </>
    )
}

export default EditProfilePopup