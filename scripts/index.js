import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { formSettings, initialCards } from './utils.js';

const popups = document.querySelectorAll('.popup');
const popupAddCard = document.querySelector('.popup_type_add');
const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const formAddCard = document.querySelector('.popup__form_type_add');
const formEditProfile = document.querySelector('.popup__form_type_edit');
const nameInput = formEditProfile.querySelector('#name');
const jobInput = formEditProfile.querySelector('#job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const cardsContainer = document.querySelector('.elements__list');
const placeName = document.querySelector('#place-name');
const placeLink = document.querySelector('#photo');

function handleCloseEsc (evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function handleCloseClick (evt) {
  if (evt.currentTarget === evt.target || evt.target.classList.contains('popup__close-button')) {
    closePopup(evt.currentTarget);
  }
}

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleCloseEsc);
  popup.addEventListener('click', handleCloseClick);
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleCloseEsc);
  popup.removeEventListener('click', handleCloseClick);
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

function createCard (cardName, cardLink) {
  const cardItem = new Card(cardName, cardLink, '#card-template');
  return cardItem.generateCard();
}

function prependCard (cardName, cardLink) {
  cardsContainer.prepend(createCard(cardName, cardLink));
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
}

function preloadPopup () {
  popups.forEach((popup) => {
    popup.classList.add('popup__preload');
  });
}

const profileValidation = new FormValidator(formSettings, formEditProfile);
const newCardValidation = new FormValidator(formSettings, formAddCard);
profileValidation.enableValidation();
newCardValidation.enableValidation();

fillCards();
preloadPopup();

buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  profileValidation.resetValidation();
  openPopup(popupEditProfile);
});
formEditProfile.addEventListener('submit', submitformEditProfile);
formAddCard.addEventListener('submit', submitformAddCard);
window.addEventListener('load', () => { initPopups(); });
buttonAddCard.addEventListener('click', () => {
  formAddCard.reset();
  newCardValidation.resetValidation();
  openPopup(popupAddCard);
});

export { openPopup };
