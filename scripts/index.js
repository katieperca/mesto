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

function previewCardImage (imageInfo) {
  popupTitle.textContent = imageInfo.name;
  popupImage.alt = imageInfo.name;
  popupImage.src = imageInfo.link;
  openPopup(popupPhoto);
}

function submitformEditProfile (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function fillCards () {
  initialCards.forEach((card) => {
    cardsContainer.append(getCard(card.name, card.link));
  });
}

function getCard (name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__like-button').addEventListener('click', toggleLike);
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  cardImage.addEventListener('click', () => previewCardImage({ name, link }));

  return cardElement;
}

function addNewCard (cardName, cardLink) {
  cardsContainer.prepend(getCard(cardName, cardLink));
}

function submitformAddCard (evt) {
  evt.preventDefault();
  addNewCard(placeName.value, placeLink.value);
  closePopup(popupAddCard);
  buttonSubmitAdd.classList.add('form__save-button_inactive');
  buttonSubmitAdd.setAttribute('disabled', '');
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

buttonEditProfile.addEventListener('click', () => {
  resetFields(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  buttonSubmitProfile.classList.remove('form__save-button_inactive');
  buttonSubmitProfile.removeAttribute('disabled');
  openPopup(popupEditProfile);
});
formEditProfile.addEventListener('submit', submitformEditProfile);
formAddCard.addEventListener('submit', submitformAddCard);
window.addEventListener('load', () => { initPopups(); });
buttonAddCard.addEventListener('click', () => {
  resetFields(popupAddCard);
  openPopup(popupAddCard);
});
