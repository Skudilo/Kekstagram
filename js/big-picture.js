'use strict';

(() => {
    const avatar = {
        min: 1,
        max: 6
    }

    const commentTotal = 5;

    const bigPicture = document.querySelector('.big-picture');
    const commentsList = document.querySelector('.social__comments');
    const bigPictureClose = document.querySelector('.big-picture__cancel');
    

    // данные большого изображения
    const getDataBigPost = (obj) => {
        bigPicture.querySelector('.big-picture__img img').src = obj.url;
        bigPicture.querySelector('.social__caption').textContent = obj.description;
        bigPicture.querySelector('.likes-count').textContent = obj.likes;
        bigPicture.querySelector('.comments-count').textContent =  obj.comments.length;
    }

    //удаляет встроенные коментарии
    const removeCommentList = () => {
        const list = document.querySelector('.social__comments');
        list.innerHTML = '';
    }

    //создаёт коментарии в комментлисте
    const getCommentsItem = (posts) => {
        for (let i = 0; i < commentTotal; i++) {
            let item = document.createElement('li');
            item.classList = 'social__comment';

            let avatarImg = document.createElement('img');
            avatarImg.classList = 'social__picture';
            avatarImg.src = 'img/avatar-' + window.util.getRandomInteger(1, 6) + '.svg';
            avatarImg.alt = 'Аватар комментатора фотографии';
            avatarImg.width = '35';
            avatarImg.height = '35';

            let p = document.createElement('p');
            p.classList = 'social__text';
            p.textContent = posts.comments[i].message;

            item.appendChild(avatarImg);
            item.appendChild(p);
            commentsList.appendChild(item)
        }
    }

    // нажатие на ESC
    const onKeydownEsc = (evt) => {
        window.util.isKeydownEsc(evt, closePopup)
    }

    // нажатие на Enter
    const onKeydownEnter = (evt) => {
        window.util.isKeydownEnter(evt, closePopup)
    }

    // функция закрытия попапа
    const closePopup = () => {
        bigPicture.classList.add('hidden');
        bigPictureClose.removeEventListener('click', closePopup);
        bigPictureClose.removeEventListener('keydown', onKeydownEnter);
        document.removeEventListener('keydown', onKeydownEsc);
        document.body.classList.remove('modal-open')
    }

    // функция открытия попапа
    const openPopup = () => {
        bigPicture.classList.remove('hidden')
        bigPictureClose.addEventListener('click', closePopup);
        bigPictureClose.addEventListener('keydown', onKeydownEnter);
        document.addEventListener('keydown', onKeydownEsc);
    }

    
    const showBigPicture = (posts) => {
        document.body.classList.add('modal-open');
        removeCommentList();
        getDataBigPost(posts);
        getCommentsItem(posts);
        openPopup();
    }

    window.showBigPicture = showBigPicture;
})()











