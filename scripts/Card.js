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
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._cardLikeButton = this._element.querySelector('.card__like-button');
    this._cardLikeButton.addEventListener('click', () => {
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
    this._cardLikeButton.classList.toggle('card__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _showCardImage() {
    popupTitle.textContent = this._name;
    popupImage.alt = this._name;
    popupImage.src = this._link;
    openPopup(popupPhoto);
  }
}

