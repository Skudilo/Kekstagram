'use strict';

(() => {
    const url = 'https://js.dump.academy/kekstagram';
    const serverTimeout = 10000;

    const Status = {
        SUCCESS: 200,
        ERROR: 400,
        NOT_FOUND: 404
    }

    const Message  = {
        ERROR: 'Произошла ошибка соединения',
        ERROR_TIME: 'Запрос не успел выполнится за ',
        ERROR_REQUEST: 'Ошибка запроса',
        NOTHING_FOUND: 'Ничего не найдено',
        STATUS: 'Статус ответа: '
    }

    // фунция запроса
    const makeRequest = (onSuccess, onError) => {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('error', () => {
            onError(Message.ERROR)
        })

        xhr.addEventListener('timeout', () => {
            onError(Message.ERROR_TIME)
        })

        xhr.addEventListener('load', () => {
            let error;

            switch (xhr.status) {
              case Status.SUCCESS:
                onSuccess(xhr.response);
                break;
              case Status.ERROR:
                onError(Message.ERROR_REQUEST);
                break;
              case Status.NOT_FOUND:
                onError(Message.NOTHING_FOUND);
                break;
      
              default:
                error = Message.STATUS + xhr.status + ' ' + xhr.statusText;
                break;
            }
      
            if (error) {
              onError(error);
            }
        })
        return xhr
    }

    // функция загрузки данных
    const onRequestLoad = (onSuccess, onError) => {
        let xhr = makeRequest(onSuccess, onError);
        xhr.open('GET', url + '/data');
        xhr.send()
    }   

    // функция отправки данных
    const onRequestUpload = (data, onSuccess, onError) => {
        let xhr = makeRequest(onSuccess, onError);
        xhr.open('POST', url);
        xhr.send(data)
    }

    // попап ошибки
    const onErrorRequest = (message) => {
        let popup = document.createElement('div');
    
        popup.className = 'popup-error';
        popup.style = 'z-index = 100; width: 100%; text-align: center; background-color: red;';
        popup.style.position = 'absolute';
        popup.style.left = 0;
        popup.style.top = 0;
        popup.style.fontSize = '30px';
        popup.style.padding = '20px 0'
        popup.textContent = message;
        
        document.body.appendChild(popup);
    }

    window.backend = {
        onErrorRequest: onErrorRequest,
        onRequestLoad: onRequestLoad,
        onRequestUpload: onRequestUpload
    }
})()    