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
  cardsContainer,
  formSettings,
  initialCards,
  cardListSection
} from '../components/utils.js';

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
  popupTypeEdit.open();
});
window.addEventListener('load', () => { initPopups(); });
buttonAddCard.addEventListener('click', () => {
  newCardValidation.resetValidation();
  popupTypeAdd.open();
});

