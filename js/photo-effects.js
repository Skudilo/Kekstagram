'use strict';

(() => {
    const preview = document.querySelector('.img-upload__preview');
    const effectsList = document.querySelector('.effects__list');
    let effectValue = document.querySelector('[name="effect-level"]');
    const line = document.querySelector('.scale__level');
    const pin = document.querySelector('.scale__pin');
    const blockPin = document.querySelector('.img-upload__scale')

    const pinPosition = {
        min: 0,
        max: 450
    }

    const cssFilter = {
        none: {
            class: 'effects__preview--none'
        },
        chrome: {
           class: 'effects__preview--chrome',
           filter: 'grayscale',
           min: 0,
           max: 1
        },
        sepia: {
            class: 'effects__preview--sepia',
            filter: 'sepia',
            min: 0,
            max: 1
        },
        marvin: {
            class: 'effects__preview--marvin',
            filter: 'invert',
            min: 0,
            max: 100,
            postFix: '%',
        },
        phobos: { 
            class: 'effects__preview--phobos',
            filter: 'blur',
            min: 0,
            max: 3,
            postFix: '%'
        },
        heat: {
            class: 'effects__preview--heat',
            filter: 'brightness',
            min: 1,
            max: 3
        }
    }

    // функция изменения координат пина и линии
    const makeValueFilter = (value) => {
        pin.style.left = value + 'px';
        line.style.width = value + 'px';
    }

    // функция создания и наложения фильтра
    const filterChange = (max, min, filter, position, filterPostfix) => {
        let postFix = filterPostfix || '';
        const value = (max - min) * (position / pinPosition.max) + min;
        const change = filter + '(' + value + postFix + ')'

        preview.style.filter = change;
        effectValue.value = value;
    }

    // обработчик перемещения пина
    pin.addEventListener('mousedown', (evt) => {
        evt.preventDefault();

        let selectedFilter = document.querySelector('input[type="radio"]:checked').value;
        let startCoords = evt.clientX;

        const onMouseMove = (moveEvt) => {
            moveEvt.preventDefault();

            let shift = startCoords - moveEvt.clientX;
            let position = pin.offsetLeft - shift;
            startCoords = moveEvt.clientX;

            if(position <= pinPosition.min) {
                position = pinPosition.min
            }

            if(position >= pinPosition.max) {
                position = pinPosition.max
            }

            makeValueFilter(position);
            filterChange(cssFilter[selectedFilter].max, cssFilter[selectedFilter].min, cssFilter[selectedFilter].filter, position,
                 cssFilter[selectedFilter].postFix)
        }

        const onMouseUp = (upEvt) => {
            upEvt.preventDefault()

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp)
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp)
    })

    // функция показа/скрытия блока пина
    const checkScaleShow = (elem) => {
        return elem.value !== 'none' ? blockPin.classList.remove('hidden') : blockPin.classList.add('hidden')
    }

    // обработчик переключения эфектов
    effectsList.addEventListener('click', function(evt) {
        let toggler = evt.target.closest('input');

        if(toggler) {
            makeValueFilter(pinPosition.max)
            preview.classList = 'img-upload__preview';
            preview.removeAttribute('style');
            preview.classList.add(cssFilter[toggler.value].class);
            checkScaleShow(toggler)
        }
    })

    const makeDeafultFilter = () => {
        makeValueFilter(pinPosition.max);
        preview.removeAttribute('style');
        blockPin.classList.add('hidden');
        preview.classList = 'img-upload__preview';
    }

    window.makeDeafultFilter = makeDeafultFilter;
})()