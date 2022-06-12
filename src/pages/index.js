import './index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
  popups,
  buttonAddCard,
  buttonEditProfile,
  nameInput,
  jobInput,
  formSettings,
  initialCards,
  cardListSection
} from '../components/utils.js';

function initPopups() {
  popups.forEach((popup) => {
    popup.classList.remove('popup__preload');
  });
}

function createCard(data) {
  function handleCardClick() {
    popupImage.open(data.name, data.link);
  }
  const cardItem = new Card({data, handleCardClick}, '#card-template');
  return cardItem.generateCard();
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardItem = createCard(item);
    cardList.addItem(cardItem);
  }
}, cardListSection);

cardList.renderItems();

const popupImage = new PopupWithImage('.popup_type_photo');
popupImage.setEventListeners();

const popupTypeAdd = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (item) => {
    const cardItem = createCard({
          name: item['place-name'],
          link: item.photo
        });
    cardList.prependItem(cardItem);
    popupTypeAdd.close();
  }
});

popupTypeAdd.setEventListeners();

const userInfo = new UserInfo({
  nameElementSelector: '.profile__title',
  infoElementSelector: '.profile__subtitle'
});

const popupTypeEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data.name, data.job);
    popupTypeEdit.close();
  }
});

popupTypeEdit.setEventListeners();

function preloadPopup() {
  popups.forEach((popup) => {
    popup.classList.add('popup__preload');
  });
}

preloadPopup();

const profileValidation = new FormValidator(formSettings, popupTypeEdit.form);
const newCardValidation = new FormValidator(formSettings, popupTypeAdd.form);
profileValidation.enableValidation();
newCardValidation.enableValidation();

function handleButtonEditProfileClick() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.info;
  profileValidation.resetValidation();
  popupTypeEdit.open();
}

function handleButtonAddCardClick() {
  newCardValidation.resetValidation();
  popupTypeAdd.open();
}

window.addEventListener('load', () => { initPopups(); });
buttonEditProfile.addEventListener('click', handleButtonEditProfileClick);
buttonAddCard.addEventListener('click', handleButtonAddCardClick);

