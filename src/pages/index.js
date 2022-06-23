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

function preloadPopup() {
  popups.forEach((popup) => {
    popup.classList.add('popup__preload');
  });
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
        popupTypeAdd.close();
      })
      .catch((err) => {
        console.log('Ой, ошибка', err);
      }).finally(() => {
        popupTypeAdd.renderLoading(false);
      });
  }
});

const popupTypeEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (data) => {
    popupTypeEdit.renderLoading(true);
    api.updateUserData(data.name, data.about)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupTypeEdit.close();
      })
      .catch((err) => {
        console.log('Ой, ошибка', err);
      })
      .finally(() => {
        popupTypeEdit.renderLoading(false);
      });
  }
});

const popupTypeUpdateAvatar = new PopupWithForm({
  popupSelector: '.popup_type_update-avatar',
  handleFormSubmit: (data) => {
    popupTypeUpdateAvatar.renderLoading(true);
    api.updateAvatar(data.avatar)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupTypeUpdateAvatar.close();
      })
      .catch((err) => {
        console.log('Ой, ошибка', err);
      })
      .finally(() => {
        popupTypeUpdateAvatar.renderLoading(false);
      });
  }
});

const popupConfirmDeletion = new PopupWithConfirmation({
  popupSelector: '.popup_type_confirm',
  handleFormSubmit: () => {
    popupConfirmDeletion.close();
  }
});

const profileValidation = new FormValidator(formSettings, popupTypeEdit.form);
const newCardValidation = new FormValidator(formSettings, popupTypeAdd.form);
const newAvatarValidation = new FormValidator(formSettings, popupTypeUpdateAvatar.form);

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([data, cards]) => {
    userInfo.setUserInfo(data);
    cardList.renderItems(cards, data._id);
  }).catch((err) => {
    console.log('Ой, ошибка', err);
  });

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
  popupTypeEdit.open();
}

function handleButtonAddCardClick() {
  newCardValidation.resetValidation();
  popupTypeAdd.open();
}

function handleAvatarClick() {
  newAvatarValidation.resetValidation();
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
