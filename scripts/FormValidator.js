export default class FormValidator {
  constructor(config, formElement) {
    this._input = config.input;
    this._submitButton = config.submitButton;
    this._submitButtonInactive = config.submitButtonInactive;
    this._inputError = config.inputError;
    this._spanErrorActive = config.spanErrorActive;
    this._formElement = formElement;
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
    const button = this._formElement.querySelector(this._submitButton);
    const isValid = this._formElement.checkValidity();
    if (!isValid) {
      button.classList.add(this._submitButtonInactive);
      button.setAttribute('disabled', '');
    } else {
      button.classList.remove(this._submitButtonInactive);
      button.removeAttribute('disabled');
    }
  }

  _handleFormInput(input) {
    this._checkInputValidity(input);
    this._setSubmitButtonState();
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._input));
    inputList.forEach((input) => {
      input.addEventListener('input', (evt) => {
        const input = evt.target;
        this._handleFormInput(input);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
