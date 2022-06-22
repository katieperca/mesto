import './index.css';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import {
  popups,
  buttonAddCard,
  avatarButton,
  buttonEditProfile,
  nameInput,
  aboutInput,
  formSettings,
  cardListSection
} from '../components/utils.js';

function createCard(data, userId) {
  data['userId'] = userId;
  const cardItem = new Card({
    data: data,
    handleCardClick: () => {
      popupImage.open(data.name, data.link);
    },
    handleLikeClick: (card) => {
      if (!card.isLiked()) {
        api.likeCard(card._id)
        .then(data => card.handleSetLikes(data.likes))
        .catch((err) => {
          console.log('Ой, ошибка', err);
        });
      } else {
        api.deleteLike(card._id)
        .then(data => card.handleSetLikes(data.likes))
        .catch((err) => {
          console.log('Ой, ошибка', err);
        });
      }
    },
    handleDeleteIconClick: (card) => {
      popupConfirmDeletion.open();
      popupConfirmDeletion.setHandleFormSubmit(() => {
        api.deleteCard(card._id)
        .then(() => {
          card.deleteCard();
        })
        .then(() => {
          popupConfirmDeletion.close();
        })
        .catch((err) => {
          console.log('Ой, ошибка', err);
        });
      });
    }
  }, '#card-template');
  return cardItem.generateCard();
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: '03a2ce01-eaa6-4faa-aed9-5146b0556540',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({
  nameElementSelector: '.profile__title',
  infoElementSelector: '.profile__subtitle',
  avatarElementSelector: '.profile__avatar'
});

const cardList = new Section({
  items: [],
  renderer: (item, userId) => {
    const cardItem = createCard(item, userId);
    cardList.addItem(cardItem);
  }
}, cardListSection);

const popupImage = new PopupWithImage('.popup_type_photo');
popupImage.setEventListeners();

const popupTypeAdd = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (item) => {
    popupTypeAdd.renderLoading(true);
    api.addCard(item['place-name'], item.photo)
    .then(data => {
      const cardItem = createCard(data, userInfo._id);
      cardList.prependItem(cardItem);
    })
    .catch((err) => {
      console.log('Ой, ошибка', err);
    });
    popupTypeAdd.close();
  }
});

const popupTypeEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (data) => {
    popupTypeEdit.renderLoading(true);
    userInfo.setUserInfo(data);
    api.updateUserData(data.name, data.about);
    popupTypeEdit.close();
  }
});

const popupTypeUpdateAvatar = new PopupWithForm({
  popupSelector: '.popup_type_update-avatar',
  handleFormSubmit: (data) => {
    popupTypeUpdateAvatar.renderLoading(true);
    userInfo.setUserInfo(data);
    api.updateAvatar(data.avatar);
    popupTypeUpdateAvatar.close();
  }
});

const popupConfirmDeletion = new PopupWithConfirmation({
  popupSelector: '.popup_type_confirm',
  handleFormSubmit: () => {
    popupConfirmDeletion.close();
  }
});

function preloadPopup() {
  popups.forEach((popup) => {
    popup.classList.add('popup__preload');
  });
}

const profileValidation = new FormValidator(formSettings, popupTypeEdit.form);
const newCardValidation = new FormValidator(formSettings, popupTypeAdd.form);
const newAvatarValidation = new FormValidator(formSettings, popupTypeUpdateAvatar.form);

api.getUserData()
  .then((data) => {
    userInfo.setUserInfo(data);
    initCards(userInfo, cardList);
  })
  .catch((err) => {
    console.log('Ой, ошибка', err);
  });

function initCards(userInfo, cardList) {
  api.getInitialCards()
    .then((cards) => {
      cardList.renderItems(cards, userInfo._id);
    })
    .catch((err) => {
      console.log('Ой, ошибка', err);
    });
}

function initPopups() {
  popups.forEach((popup) => {
    popup.classList.remove('popup__preload');
  });
}

function handleButtonEditProfileClick() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  aboutInput.value = userData.info;
  profileValidation.resetValidation();
  popupTypeEdit.renderLoading(false);
  popupTypeEdit.open();
}

function handleButtonAddCardClick() {
  newCardValidation.resetValidation();
  popupTypeAdd.renderLoading(false);
  popupTypeAdd.open();
}

function handleAvatarClick() {
  newAvatarValidation.resetValidation();
  popupTypeUpdateAvatar.renderLoading(false);
  popupTypeUpdateAvatar.open();
}

popupTypeAdd.setEventListeners();
popupTypeEdit.setEventListeners();
popupTypeUpdateAvatar.setEventListeners();
popupConfirmDeletion.setEventListeners();
preloadPopup();
profileValidation.enableValidation();
newCardValidation.enableValidation();
newAvatarValidation.enableValidation();
window.addEventListener('load', () => { initPopups(); });
buttonEditProfile.addEventListener('click', handleButtonEditProfileClick);
buttonAddCard.addEventListener('click', handleButtonAddCardClick);
avatarButton.addEventListener('click', handleAvatarClick);
