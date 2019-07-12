'use strict';

(() => {
    const uploadOverlay = document.querySelector('.img-upload__overlay');
    const uploadFile = document.querySelector('#upload-file');
    const btnCloseUpload = document.querySelector('.img-upload__cancel');
    const textarea = uploadOverlay.querySelector('.text__description');
    const inputHashtag = uploadOverlay.querySelector('.text__hashtags');
    const uploadForm = document.querySelector('.img-upload__form');

    const closeUploadOverlay = () => {
        uploadOverlay.classList.add('hidden');
        btnCloseUpload.removeEventListener('click', closeUploadOverlay);
        document.removeEventListener('keydown', onOverlayKeydownEsc);
        uploadForm.reset();
    }

    const onOverlayKeydownEsc = (evt) => {
        window.util.isKeydownEsc(evt, closeUploadOverlay)
    }

    //открытие окна загрузки фотографии
    const onUploadInputChange = () => {
        uploadOverlay.classList.remove('hidden');
        btnCloseUpload.addEventListener('click', closeUploadOverlay)
        document.addEventListener('keydown', onOverlayKeydownEsc)
        window.makeDeafultFilter();
    }

    const onInputFocus = () => {
        document.removeEventListener('keydown', onOverlayKeydownEsc);
    } 

    const onInputBlur = () => {
        document.addEventListener('keydown', onOverlayKeydownEsc);
    }

    uploadFile.addEventListener('change', onUploadInputChange);
    inputHashtag.addEventListener('focus', onInputFocus);
    inputHashtag.addEventListener('blur', onInputBlur);
    textarea.addEventListener('focus', onInputFocus);
    textarea.addEventListener('blur', onInputBlur);

    window.upload = {
        closeUploadOverlay: closeUploadOverlay
    }
})();