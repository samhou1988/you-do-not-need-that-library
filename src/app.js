const $ = function (args) {
  return document.querySelector(args);
}

const $$ = function (args) {
  return document.querySelectorAll(args);
}

HTMLElement.prototype.on = function (type, handler, capture) {
  return this.addEventListener(type, handler, capture);
}

HTMLElement.prototype.off = function (type, handler) {
  return this.removeEventListener(type, handler);
}

HTMLElement.prototype.$ = function (s) {
  return this.querySelector(s);
}

HTMLElement.prototype.$$ = function (s) {
  return this.querySelectorAll(s);
}