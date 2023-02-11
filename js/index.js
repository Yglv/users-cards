"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const cards_js_1 = require("./cards.js");
const modal_js_1 = require("./modal.js");
require("../css/style.scss");
const modal = new modal_js_1.Modal('Save', -1);
(_a = document.querySelector('.form__button--add')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (event) => {
    event.preventDefault();
    modal.open();
});
(_b = document.querySelector('.form__button--delete')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (event) => {
    event.preventDefault();
    sessionStorage.clear();
    location.reload();
});
for (let i = 0; i < sessionStorage.length; i++) {
    let key = (_c = sessionStorage.key(i)) === null || _c === void 0 ? void 0 : _c.toString();
    if (typeof key === "string") {
        const storedItem = sessionStorage.getItem(key);
        if (typeof storedItem === "string") {
            new cards_js_1.Card(JSON.parse(storedItem));
        }
    }
}
