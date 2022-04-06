let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#job');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

closeButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
  nameInput.value = '';
  jobInput.value = '';
});

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);

