function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.form));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', handleFormSubmit);
    formElement.addEventListener('input', (evt) => handleFormInput(evt, config));
  });
}

function handleFormSubmit(evt) {
  evt.preventDefault();
}

function handleFormInput(evt, config) {
  evt.preventDefault();

  const form = evt.currentTarget;
  const input = evt.target;
  setFieldError(input, config);
  setSubmitButtonState(form, config);
}

function setFieldError(input, config) {
  input.setCustomValidity('');
  const span = document.querySelector(`.${input.id}-error`);
  span.classList.add(config.inputErrorActive);
  span.textContent = input.validationMessage;
}

function setSubmitButtonState(form, config) {
  const button = form.querySelector(config.submitButton);
  const isValid = form.checkValidity();
  if (!isValid) {
    button.classList.add(config.buttonInactive);
    button.setAttribute('disabled', '');
  } else {
    button.classList.remove(config.buttonInactive);
    button.removeAttribute('disabled', '');
  }
}

enableValidation({
  form: '.popup__form',
  input: '.form__input',
  submitButton: '.form__save-button',
  buttonInactive: 'form__save-button_inactive',
  inputError: 'popup__input_type_error',
  inputErrorActive: 'form__input-error_active'
});
