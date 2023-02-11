"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const modal_1 = require("./modal");
const cardModal = new modal_1.Modal('Change', 0);
class Card {
    constructor(info) {
        var _a;
        this.info = info;
        console.log(info);
        (_a = document.querySelector('.row')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', this.render());
        this.changeButton = document.querySelector('.btn[data-btn="' + this.info.cardId + '"]');
        this.deleteButton = document.querySelector('.btn[data-del="' + this.info.cardId + '"]');
        this.setup();
    }
    setup() {
        var _a, _b;
        this.ChangeCardInfo = this.ChangeCardInfo.bind(this);
        this.DeleteCard = this.DeleteCard.bind(this);
        (_a = this.changeButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.ChangeCardInfo);
        (_b = this.deleteButton) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.DeleteCard);
    }
    ChangeCardInfo() {
        cardModal.open(this.info.cardId);
    }
    DeleteCard() {
        sessionStorage.removeItem(this.info.cardId.toString());
        location.reload();
    }
    render() {
        const address = 'https://fikiwiki.com/uploads/posts/2022-02/1645054742_19-fikiwiki-com-p-kartinki-ikonki-19.png';
        let imgURL = (this.info.image == '') ? address : this.info.image;
        return `
          <div class="col">
                  <div class="card">
                      <img src=${imgURL} class="card-img-top" alt="...">
                      <div class="card-body text-center">
                          <h5 class="card-title">Name:${this.info.name}</h5>
                          <p class="card-text">Country:${this.info.country}</p>
                          <div class="card-body text-center">
                              <button class="btn btn-primary" data-type="rewrite" data-btn="${this.info.cardId}">Change</button>
                              <button class="btn btn-primary" data-type="del" data-del="${this.info.cardId}">Delete</button>
                          </div>
                      </div>
                  </div>
              </div>`;
    }
}
exports.Card = Card;
