'use strict';

(() => {
    const inputHashtags = document.querySelector('.text__hashtags');
    const description = document.querySelector('.text__description');
    const form = document.querySelector('.img-upload__form');
    const maxHashtags = 5;
    const formSubmit = document.querySelector('.img-upload__submit');

    const checkHashtag = (hashtag) => {
        if (hashtag[0] !== '#' && hashtag.length > 0) {
            inputHashtags.setCustomValidity('хэш-тег начинается с символа #');
            return false
        } else if (hashtag[0] === '#' && hashtag.length === 1) {
            inputHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
            return false
        } else if (hashtag.length > 20) {
            inputHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
        } else if (hashtag.indexOf('#', 1) > 0) {
            inputHashtags.setCustomValidity('хэш-теги разделяются пробелами');
            return false;
        }

        return true
    }

    const onSubmitButtonClick = (evt) => {
        
        let hashtags = inputHashtags.value.toLowerCase().split(' ');

        for (let i = 0; i < hashtags.length; i++) {
            let validHashtag = checkHashtag(hashtags[i])

            if (!validHashtag) {
                break
            }

            if (hashtags.indexOf(hashtags[i], i + 1) > 0) {
                inputHashtags.setCustomValidity('один и тот же хэш-тег не может быть использован дважды')
            }

            if(hashtags.length > maxHashtags) {
                inputHashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов')
            }

            if(!inputHashtags.validationMessage) {
                evt.preventDefault();
                let formData = new FormData(form)
                window.backend.onRequestUpload(formData, window.closePopup, window.backend.onErrorRequest)
            }
        }
    }

    const clearValidity = () => {
        inputHashtags.setCustomValidity('')
    }

    formSubmit.addEventListener('click', onSubmitButtonClick)
    inputHashtags.addEventListener('input', clearValidity)
})()