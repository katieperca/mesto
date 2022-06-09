export default class UserInfo {
  constructor({ nameElementSelector, infoElementSelector }) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._infoElement = document.querySelector(infoElementSelector);
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo.name = this._nameElement.textContent;
    this._userInfo.info = this._infoElement.textContent;

    return this._userInfo;
  }

  setUserInfo(name, info) {
    this._nameElement.textContent = name;
    this._infoElement.textContent = info;
  }
}
