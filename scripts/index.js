const popups = document.querySelectorAll('.popup');
const popupAdd = document.querySelector('.popup_type_add');
const popupEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editProfileForm = document.querySelector('.popup__form_type_edit');
const addCardForm = document.querySelector('.popup__form_type_add');
const nameInput = editProfileForm.querySelector('#name');
const jobInput = editProfileForm.querySelector('#job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const cardsContainer = document.querySelector('.elements__list');
const placeName = document.querySelector('#place-name');
const placeLink = document.querySelector('#photo');
const popupPhoto = document.querySelector('.popup_type_photo');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__title');
const cardTemplate = document.querySelector('#card-template').content;
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  popup.querySelectorAll('input').forEach((input) => {
    input.value = '';
  });
}

function initPopups () {
  popups.forEach((popup) => {
    popup.classList.remove('popup__preload');
    popup.querySelector('.popup__close-button').addEventListener('click', function () {
      closePopup(popup);
    });
  });
}

function previewCardImage (evt) {
  popupTitle.textContent = evt.target.alt;
  popupImage.alt = evt.target.alt;
  popupImage.src = evt.target.src;
  openPopup(popupPhoto);
}

function submitEditProfileForm (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupEdit.classList.remove('popup_opened');
}

function fillCards () {
  initialCards.forEach((card) => {
    cardsContainer.append(getCard(card.name, card.link));
  });
}

function getCard (name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__like-button').addEventListener('click', toggleLike);
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__image').addEventListener('click', previewCardImage);

  return cardElement;
}

function addNewCard (cardName, cardLink) {
  cardsContainer.prepend(getCard(cardName, cardLink));
}

function submitAddCardForm (evt) {
  evt.preventDefault();
  addNewCard(placeName.value, placeLink.value);
  closePopup(popupAdd);
}

function toggleLike (evt) {
  evt.target.classList.toggle('card__like-button_active');
}

function deleteCard (evt) {
  evt.target.closest('.card').remove();
}

function preloadPopup () {
  popups.forEach((popup) => {
    popup.classList.add('popup__preload');
  });
}

fillCards();
preloadPopup();

editButton.addEventListener('click', function () {
  openPopup(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

editProfileForm.addEventListener('submit', submitEditProfileForm);
addCardForm.addEventListener('submit', submitAddCardForm);
window.addEventListener('load', () => { initPopups(); });
addButton.addEventListener('click', () => { openPopup(popupAdd); });
