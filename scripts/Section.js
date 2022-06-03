export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._container.append(element);
  }
}


// Содержит публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
// Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
