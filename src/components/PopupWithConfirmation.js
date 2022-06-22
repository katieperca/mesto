import Popup from './Popup.js';
export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this.form = this._popup.querySelector('.form');
    this._saveButton = this.form.querySelector('.form__save-button');
    this._saveButtonText = this._saveButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
  }

  setHandleFormSubmit(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  renderLoading(isloading) {
    if(isloading) {
      this._saveButton.textContent = 'Сохранение...';
    } else {
      this._saveButton.textContent = this._saveButtonText;
    }
  }

  setEventListeners() {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
    super.setEventListeners();
  }
}
