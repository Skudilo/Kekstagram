'use strict';

(() => {
    let posts = [];
    const sectionPosts = document.querySelector('.pictures');
    const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');   
    const filterBlock = document.querySelector('.img-filters');
    let activeButton = document.querySelector('.img-filters__button--active');
    const numberNewPost = 10;

    const sort = {
        'filter-popular': (arr) => {
            return arr
        },
        'filter-discussed': (arr) => {
            return arr.sort((a, b) => {
                return b.comments.length - a.comments.length
            })
        },
        'filter-new': (arr) => {
            arr.length = numberNewPost;
            let newPhotos = arr;
            newPhotos = window.util.getShuffled(newPhotos);
            return newPhotos;
        }
    }

    // функция получения одной фотографии
    const getPicture = (item) => {
        let picture = pictureTemplate.cloneNode(true);
    
        picture.querySelector('.picture__img').src = item.url;
        picture.querySelector('.picture__stat--comments').textContent = item.comments.length;
        picture.querySelector('.picture__stat--likes').textContent = item.likes;
    
        return picture
    }
    
    // отрисовка всех фотографий
    const renderPictures = (pictures) => {
        let fragment = document.createDocumentFragment();
    
        pictures.forEach((item) => {
            let postItem = getPicture(item);
            postItem.addEventListener('click', () => {
                window.showBigPicture(item)
            })
            fragment.appendChild(postItem);
        })

        document.querySelector('.pictures').appendChild(fragment)
    }

    // коллбек успешной загрузки данных
    const onDataLoad = (data) => {
        posts = data;
        renderPictures(posts);
        filterBlock.classList.remove('img-filters--inactive')
    }
    
    // функция добавления класса активной кнопке
    const makeButtonInactive = (evt) => {
        activeButton.classList.remove('img-filters__button--active');
        activeButton = evt.target;
        activeButton.classList.add('img-filters__button--active')
    }

    // функция очистки всех фотографий
    const clearPictures = () => {
        let photoList = sectionPosts.querySelectorAll('.picture__link');
        photoList.forEach(function (item) {
            item.parentNode.removeChild(item);
          });
    }

    // функция события на filterBlock
    const makeSortPost = (evt) => {
        if (evt.target.className === 'img-filters__button') {
            let sortArr = posts.slice();
            sort[evt.target.id](sortArr);

            clearPictures();
            renderPictures(sortArr);
            makeButtonInactive(evt);
        }
    }
    
    filterBlock.addEventListener('click', makeSortPost);
    window.backend.onRequestLoad(onDataLoad, window.backend.onErrorRequest);
   
})()
