// import { popupElementOpened } from './utils.js';
export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._keyDownListener = this._handleEscClose.bind(this);
  }

  open() {
    document.addEventListener('keydown', this._keyDownListener);
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._keyDownListener);
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('click', (evt) => {
      if (evt.currentTarget === evt.target) {
        this.close();
      }
    });
  }
}
