export default class FormValidator {
  constructor(config, formElement) {
    this._form = config.form;
    this._input = config.input;
    this._submitButton = config.submitButton;
    this._submitButtonInactive = config.submitButtonInactive;
    this._inputError = config.inputError;
    this._spanErrorActive = config.spanErrorActive;
    this._formElement = formElement;
  }

  _showInputError() {
    const span = this._form.querySelector(`.${this._input.id}-error`);
    this._input.classList.add(this._inputError);
    span.classList.add(this._spanErrorActive);
    span.textContent = this._input.validationMessage;
  }

  _hideInputError() {
    const span = this._form.querySelector(`.${this._input.id}-error`);
    this._input.classList.remove(this._inputError);
    span.classList.remove(this._spanErrorActive);
    span.textContent = '';
  }

  _checkInputValidity(input, config) {
    if (!input.validity.valid) {
      showInputError(input, config);
    } else {
      hideInputError(input, config);
    }
  }

  function handleFormInput(evt, config) {
    const form = evt.currentTarget;
    const input = evt.target;
    checkInputValidity(input, config);
    setSubmitButtonState(form, config);
  }

  function setSubmitButtonState(form, config) {
    const button = form.querySelector(config.submitButton);
    const isValid = form.checkValidity();
    if (!isValid) {
      button.classList.add(config.submitButtonInactive);
      button.setAttribute('disabled', '');
    } else {
      button.classList.remove(config.submitButtonInactive);
      button.removeAttribute('disabled');
    }
  }

  function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.form));
    formList.forEach((formElement) => {
      formElement.addEventListener('input', (evt) => handleFormInput(evt, config));
    });
  }
}

// function showInputError(input, config) {
//   const span = document.querySelector(`.${input.id}-error`);
//   input.classList.add(config.inputError);
//   span.classList.add(config.spanErrorActive);
//   span.textContent = input.validationMessage;
// }

// function hideInputError(input, config) {
//   const span = document.querySelector(`.${input.id}-error`);
//   input.classList.remove(config.inputError);
//   span.classList.remove(config.spanErrorActive);
//   span.textContent = '';
// }

function checkInputValidity(input, config) {
  if (!input.validity.valid) {
    showInputError(input, config);
  } else {
    hideInputError(input, config);
  }
}

function handleFormInput(evt, config) {
  const form = evt.currentTarget;
  const input = evt.target;
  checkInputValidity(input, config);
  setSubmitButtonState(form, config);
}

function setSubmitButtonState(form, config) {
  const button = form.querySelector(config.submitButton);
  const isValid = form.checkValidity();
  if (!isValid) {
    button.classList.add(config.submitButtonInactive);
    button.setAttribute('disabled', '');
  } else {
    button.classList.remove(config.submitButtonInactive);
    button.removeAttribute('disabled');
  }
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.form));
  formList.forEach((formElement) => {
    formElement.addEventListener('input', (evt) => handleFormInput(evt, config));
  });
}

enableValidation({
  form: '.popup__form',
  input: '.form__input',
  submitButton: '.form__save-button',
  submitButtonInactive: 'form__save-button_inactive',
  inputError: 'form__input-error',
  spanErrorActive: 'form__input-error_active'
});
