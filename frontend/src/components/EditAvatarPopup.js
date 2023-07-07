import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    const avatarRef = React.useRef()
    const [avatar, setAvatar] = React.useState('');

    function handleChangeAvatar(e) {
        setAvatar(e.target.value);
    }

    React.useEffect(() => {
        setAvatar('');
    }, [isOpen]);
    
    function handleSubmitAvatar(e) {
        e.preventDefault();
        
      
        onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
       
      }

    return(
        <>
            <PopupWithForm name='avatar' title='Обновить аватар' buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmitAvatar}>
                <input 
                    type="url" 
                    className="form__item form__item_type_link" 
                    name="link" 
                    id="input-link-avatar" 
                    required 
                    value={avatar}
                    onChange={handleChangeAvatar} 
                    placeholder="Ссылка на аватар"
                    ref={avatarRef}
                />
                <span id="input-link-avatar-error" className="form__error"></span>
        </PopupWithForm>
        </>
    )
}

export default EditAvatarPopup