export default class FormValidator {
  constructor(config, formElement) {
    this._input = config.input;
    this._submitButton = config.submitButton;
    this._submitButtonInactive = config.submitButtonInactive;
    this._inputError = config.inputError;
    this._spanErrorActive = config.spanErrorActive;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._input));
  }

  _showInputError(input) {
    const span = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputError);
    span.classList.add(this._spanErrorActive);
    span.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const span = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputError);
    span.classList.remove(this._spanErrorActive);
    span.textContent = '';
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _setSubmitButtonState() {
    const isValid = this._formElement.checkValidity();
    if (!isValid) {
      this._button.classList.add(this._submitButtonInactive);
      this._button.setAttribute('disabled', '');
    } else {
      this._button.classList.remove(this._submitButtonInactive);
      this._button.removeAttribute('disabled');
    }
  }

  _handleFormInput(input) {
    this._checkInputValidity(input);
    this._setSubmitButtonState();
  }

  resetValidation() {
    this._setSubmitButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _setEventListeners() {
    this._button = this._formElement.querySelector(this._submitButton);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => {
        const input = evt.target;
        this._handleFormInput(input);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
