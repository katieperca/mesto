import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { formSettings, initialCards } from './utils.js';

const popups = document.querySelectorAll('.popup');
const popupAddCard = document.querySelector('.popup_type_add');
const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonSubmitAdd = document.querySelector('.form__save-button_type_add');
const buttonSubmitProfile = document.querySelector('.form__save-button_type_edit');
const formAddCard = document.querySelector('.popup__form_type_add');
const formEditProfile = document.querySelector('.popup__form_type_edit');
const nameInput = formEditProfile.querySelector('#name');
const jobInput = formEditProfile.querySelector('#job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const cardsContainer = document.querySelector('.elements__list');
const placeName = document.querySelector('#place-name');
const placeLink = document.querySelector('#photo');

function resetFields(popup) {
  const formList = Array.from(popup.querySelectorAll('.popup__form'));
  formList.forEach((form) => {
    const spanList = Array.from(form.querySelectorAll('.form__input-error'));
    const inputList = Array.from(form.querySelectorAll('.form__input'));
    form.reset();
    spanList.forEach((span) => {
      span.classList.remove('form__input-error_active');
    });
    inputList.forEach((input) => {
      input.classList.remove('form__input_type_error');
    });
  });
}

function handleCloseEsc (evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function handleCloseClick (evt) {
  if (evt.currentTarget === evt.target) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleCloseEsc);
  popup.querySelector('.popup__close-button').addEventListener('click', handleCloseClick);
  popup.addEventListener('mousedown', handleCloseClick);
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleCloseEsc);
  popup.querySelector('.popup__close-button').removeEventListener('click', handleCloseClick);
  popup.removeEventListener('mousedown', handleCloseClick);
}

function initPopups () {
  popups.forEach((popup) => {
    popup.classList.remove('popup__preload');
  });
}

function submitformEditProfile (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function prependCard (cardName, cardLink) {
  const cardItem = new Card(cardName, cardLink, '#card-template');
  const cardElement = cardItem.generateCard();
  cardsContainer.prepend(cardElement);
}

function fillCards () {
  initialCards.reverse().forEach((card) => {
    prependCard(card.name, card.link);
  });
}

function submitformAddCard (evt) {
  evt.preventDefault();
  prependCard(placeName.value, placeLink.value);
  closePopup(popupAddCard);
  buttonSubmitAdd.classList.add('form__save-button_inactive');
  buttonSubmitAdd.setAttribute('disabled', '');
}

function preloadPopup () {
  popups.forEach((popup) => {
    popup.classList.add('popup__preload');
  });
}

function validateForm (config, formElement) {
  new FormValidator(config, formElement).enableValidation();
}

fillCards();
preloadPopup();

buttonEditProfile.addEventListener('click', () => {
  resetFields(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  buttonSubmitProfile.classList.remove('form__save-button_inactive');
  buttonSubmitProfile.removeAttribute('disabled');
  openPopup(popupEditProfile);
  validateForm(formSettings, formEditProfile);
});
formEditProfile.addEventListener('submit', submitformEditProfile);
formAddCard.addEventListener('submit', submitformAddCard);
window.addEventListener('load', () => { initPopups(); });
buttonAddCard.addEventListener('click', () => {
  resetFields(popupAddCard);
  openPopup(popupAddCard);
  validateForm(formSettings, formAddCard);
});

export { openPopup };
