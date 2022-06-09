export const popupElement = document.querySelector('.popup');
export const popupElementOpened = document.querySelector('.popup_opened');
export const popupPhoto = document.querySelector('.popup_type_photo');
export const popupImage = document.querySelector('.popup__image');
export const popupTitle = document.querySelector('.popup__title');
export const popupCloseButton = document.querySelector('.popup__close-button');
export const formEditProfile = document.querySelector('.popup__form_type_edit');
export const nameInput = formEditProfile.querySelector('#name');
export const jobInput = formEditProfile.querySelector('#job');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const cardListSection = '.elements__list';
export const initialCards = [
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
export const formSettings = {
  form: '.popup__form',
  input: '.form__input',
  inputError: 'form__input_type_error',
  submitButton: '.form__save-button',
  submitButtonInactive: 'form__save-button_inactive',
  spanErrorActive: 'form__input-error_active'
};
