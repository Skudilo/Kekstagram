'use strict';

(() => {
    const preview = document.querySelector('.img-upload__preview')
    const resizeMinus = document.querySelector('.resize__control--minus');
    const resizePlus = document.querySelector('.resize__control--plus');
    const resizeInput = document.querySelector('.resize__control--value')

    const scaleData = {
        maxSize: 100,
        minSize: 25,
        step: 25,
    }

    resizeInput.value = '100%';

    // функция изменения рзмеров поста
    const onClickScaleBtn = (action) => {
        let value = +resizeInput.value.slice(0, -1);

        if(action === 'reduce' && value !== scaleData.minSize) {
            value -= scaleData.step
        }

        if(action === 'increase' && value !== scaleData.maxSize) {
            value += scaleData.step
        }

        preview.style.transform = `scale(0${value / 100})`
        resizeInput.value = value + '%';
    }

    // событие уменьшения 
    resizeMinus.addEventListener('click', () => {
        onClickScaleBtn('reduce')
    })

    //событие увеличения
    resizePlus.addEventListener('click', () => {
        onClickScaleBtn('increase')
    })

})()