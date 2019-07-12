'use strict';

(() => {
    const fileTypes = ['gif', 'jpg', 'jpeg', 'png'];

    const fileChooser = document.querySelector('.img-upload__input');
    const preview = document.querySelector('.img-upload__preview img');

    // событие загрузки фотографии
    fileChooser.addEventListener('change', () => {
        let file = fileChooser.files[0];
        let fileName = file.name.toLowerCase();

        const matches = fileTypes.some((it) => {
            return fileName.endsWith(it)
        })

        if (matches) {
            const reader = new FileReader();

            reader.addEventListener('load', () => {
                preview.src = reader.result;
            })

            reader.readAsDataURL(file)
        }
    })
})()