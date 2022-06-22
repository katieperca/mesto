export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items, userId) {
    if (items.length <= 0) {
      items = this._renderedItems;
    }
    for (let i = 0; i < items.length; i++) {
      this._renderer(items[i], userId);
    }
  }

  addItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }
}
