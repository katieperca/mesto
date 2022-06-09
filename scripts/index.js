import Section from './Section.js';
import Card from './Card.js';
import UserInfo from './UserInfo.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import { formSettings, initialCards, cardListSection } from './utils.js';

const popups = document.querySelectorAll('.popup');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const formAddCard = document.querySelector('.popup__form_type_add');
const formEditProfile = document.querySelector('.popup__form_type_edit');
const nameInput = formEditProfile.querySelector('#name');
const jobInput = formEditProfile.querySelector('#job');
const cardsContainer = document.querySelector('.elements__list');

function initPopups () {
  popups.forEach((popup) => {
    popup.classList.remove('popup__preload');
  });
}

const popupImage = new PopupWithImage('.popup_type_photo');

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        // popupImage.setEventListeners();
        popupImage.open(item.name, item.link);
      }
    }, '#card-template');
    const cardItem = card.generateCard();
    cardList.addItem(cardItem);
  }
}, cardListSection);

cardList.renderItems();

function preloadPopup () {
  popups.forEach((popup) => {
    popup.classList.add('popup__preload');
  });
}

const userInfo = new UserInfo({
  nameElementSelector: '.profile__title',
  infoElementSelector: '.profile__subtitle'
});

const popupTypeEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data.name, data.job);
  }
});

const popupTypeAdd = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (item) => {
    const card = new Card({
      data: {
        name: item['place-name'],
        link: item.photo
      },
      handleCardClick: () => {
        // popupImage.setEventListeners();
        popupImage.open(item['place-name'], item.photo);
      }
    }, '#card-template');
    const cardItem = card.generateCard();
    cardsContainer.prepend(cardItem);
  }
});

const profileValidation = new FormValidator(formSettings, popupTypeEdit.form);
const newCardValidation = new FormValidator(formSettings, popupTypeAdd.form);
profileValidation.enableValidation();
newCardValidation.enableValidation();

preloadPopup();

buttonEditProfile.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.info;
  profileValidation.resetValidation();
  // popupTypeEdit.setEventListeners();
  popupTypeEdit.open();
});
window.addEventListener('load', () => { initPopups(); });
buttonAddCard.addEventListener('click', () => {
  formAddCard.reset();
  newCardValidation.resetValidation();
  // popupTypeAdd.setEventListeners();
  popupTypeAdd.open();
});

