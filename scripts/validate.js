function showInputError(input, config) {
  const span = document.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputError);
  span.classList.add(config.spanErrorActive);
  span.textContent = input.validationMessage;
}

function hideInputError(input, config) {
  const span = document.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputError);
  span.classList.remove(config.spanErrorActive);
  span.textContent = '';
}

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
  inputError: 'form__input_type_error',
  spanErrorActive: 'form__input-error_active'
});
