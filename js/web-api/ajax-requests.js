const GET_FROM = 'https://26.javascript.pages.academy/kekstagram/data';
const SEND_TO = 'https://26.javascript.pages.academy/kekstagam';
const POST = 'POST';

/**
 * Получает данные с сервера
 * @param {function} successHandler - колбэк в случае успеха
 * @param {function} errorHandler - колбэк в случае неудачи
 */
const getData = async (successHandler, errorHandler) => {
  try {
    const response = await fetch(GET_FROM);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json = await response.json();
    successHandler(json);
  } catch (err) {
    errorHandler();
  }
};

/**
 * Отправляет данные на сервер
 * @param {*} body - данные, которые будут отправлены
 * @param {function} successHandler - колбэк для успешной отправки
 * @param {function} errorHandler - колбэк для отправки с ошибкой
 */
const sendUploadFormData = async (body, successHandler, errorHandler) => {
  try {
    const response = await fetch(
      SEND_TO,
      {
        method: POST,
        body,
      },
    );

    if (!response.ok) {
      throw new Error (response.statusText);
    }
    successHandler();
  } catch (err) {
    errorHandler();
  }
};

export {
  getData,
  sendUploadFormData,
};
