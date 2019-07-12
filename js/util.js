'use strict';

(function () {
    window.util = {
        getRandomInteger(min, max) {
            let rand = min + Math.random() * (max + 1 - min);
            rand = Math.floor(rand);
            return rand;
        },
        getRandomFromArray(arr) {
            let rand = Math.floor(Math.random() * arr.length);
            return arr[rand]
        },
        getShuffled(array) {
            let j;
            let x;
        
            for (let i = array.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = array[i];
                array[i] = array[j];
                array[j] = x;
            }
            return array;
        },
        isKeydownEnter(evt, callback) {
            if(evt.keyCode === 13) {
                callback()
            }
        },
        isKeydownEsc(evt, callback) {
            if(evt.keyCode === 27) {
                callback()
            }
        }
    } 
})()