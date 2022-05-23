import { popupPhoto, popupImage, popupTitle } from './utils.js';
import { openPopup } from './index.js';
export default class Card {
  constructor(name, link, selector) {
    this._name = name;
    this._link = link;
    this._selector = selector;
  }

  _getElement() {
    const cardElement = document
    .querySelector(this._selector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getElement();
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._toggleLike();
    });
    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._showCardImage(popupPhoto);
    });
  }

  _toggleLike() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  _deleteCard() {
    this._element.closest('.card').remove();
  }

  _showCardImage() {
    popupTitle.textContent = this._name;
    popupImage.alt = this._name;
    popupImage.src = this._link;
    openPopup(popupPhoto);
  }
}

