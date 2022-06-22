export default class Card {
  constructor({data, handleCardClick, handleLikeClick, handleDeleteIconClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = (data.owner) ? data.owner._id : data.userId;
    this._userId = data.userId;
    this._isOwner = (this._ownerId == this._userId);
    this._likes = (data.likes) ? data.likes : [];
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this.handleSetLikes = this.showLikes.bind(this);
  }

  _getElement() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getElement();
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardLikeButton = this._element.querySelector('.card__like-button');
    this._element.querySelector('.card__title').textContent = this._name;
    if (this._isOwner) {
      this._deleteButton.classList.add('card__delete-button_visible');
    }
    this.showLikes();
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => {
      this._toggleLike();
      this._handleLikeClick(this);
    });
    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._handleDeleteIconClick(this);
      // this._deleteCard();
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  showLikesCount() {
    this._likeCounter.textContent = this._likes.length;
  }

  showLikesStatus() {
    if (this.isLiked()) {
      this._cardLikeButton.classList.add('card__like-button_active');
    } else {
      this._cardLikeButton.classList.remove('card__like-button_active');
    }
  }

  showLikes(likes) {
    if (likes !== undefined) {
      this._likes = likes;
    }
    this.showLikesCount();
    this.showLikesStatus();
  }

  _toggleLike() {
    this._cardLikeButton.classList.toggle('card__like-button_active');
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  isLiked() {
    for(let i = 0; i < this._likes.length; i++) {
      if (this._likes[i]._id === this._userId) {
        return true;
      }
    }
    return false;
  }
}


