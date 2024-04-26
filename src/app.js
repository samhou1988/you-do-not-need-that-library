import store from './services/store'
import api from './services/api'
import { loadData } from './services/menu'
import router from './services/router'

// import components
import './components/MenuPage'
import './components/DetailsPage'
import './components/OrderPage'

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

window.addEventListener('DOMContentLoaded', () => {
  // console.log("DOM is ready");
  app.router.init();
  loadData();
});

// Listening for Cart Updates
window.addEventListener("appcartchange", event => {
  const badge = document.getElementById("badge");
  const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = qty;
  badge.hidden = qty == 0;
});

window.app = {}
app.store = store;
app.api = api;
app.router = router;
