'use strict';

(() => {
    const pictureQuantity = 25;
    
    const description = [
        'Тестим новую камеру!',
        'Затусили с друзьями на море',
        'Как же круто тут кормят',
        'Отдыхаем...',
        'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
        'Вот это тачка!'
    ]

    const comments = [
        'Всё отлично!',
        'В целом всё неплохо. Но не всё.',
        'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
        'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
        'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
        'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ]

    let picturesData = [];

    const getPicturesData = () => {
        for (let i = 1; i <= pictureQuantity; i++) {
            picturesData.push({
                url: `photos/${i}.jpg`,
                likes: window.util.getRandomInteger(15, 200),
                comments: window.util.getRandomFromArray(comments),
                description: window.util.getRandomFromArray(description)
            })
        }
    }

    getPicturesData();

    return window.picturesData = picturesData; 
})()