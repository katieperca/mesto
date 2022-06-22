export default class UserInfo {
  constructor({ nameElementSelector, infoElementSelector, avatarElementSelector }) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._infoElement = document.querySelector(infoElementSelector);
    this._avatarElement = document.querySelector(avatarElementSelector);
    // this._id;
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo.name = this._nameElement.textContent;
    this._userInfo.info = this._infoElement.textContent;
    this._userInfo.avatar = this._nameElement.src;

    return this._userInfo;
  }

  setUserInfo(data) {
    if (data.avatar) {
      this._avatarElement.src = data.avatar;
    }
    if (data.name && data.about) {
      this._nameElement.textContent = data.name;
      this._infoElement.textContent = data.about;
    }
    if (data._id) {
      this._id = data._id;
    }
  }
}
