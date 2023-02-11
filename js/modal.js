"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
const cards_1 = require("./cards");
class Modal {
    constructor(mode, id) {
        var _a;
        this.mode = mode;
        this.id = id;
        this.changeCardButtonId = 0;
        (_a = document.querySelector('.wrapper')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("beforeend", this.render());
        this.modal = document.querySelector('.modal[data-modal="' + this.id + '"]');
        this.setup();
    }
    open(changeCardButtonId) {
        this.changeCardButtonId = changeCardButtonId;
        if (this.modal) {
            this.modal.style.display = 'block';
        }
    }
    close() {
        if (this.modal) {
            this.modal.style.display = 'none';
        }
    }
    change(id) {
        var _a, _b, _c;
        let name = ((_a = this.modal) === null || _a === void 0 ? void 0 : _a.querySelector('[data-type="name"]')).value;
        let country = ((_b = this.modal) === null || _b === void 0 ? void 0 : _b.querySelector('[data-type="country"]')).value;
        let image = ((_c = this.modal) === null || _c === void 0 ? void 0 : _c.querySelector('[data-type="img"]')).value;
        let cardId = id === null || id === void 0 ? void 0 : id.toString();
        if (typeof cardId === "number") {
            sessionStorage.setItem(cardId, JSON.stringify({ name, country, image, cardId }));
        }
        location.reload();
    }
    save() {
        var _a, _b, _c;
        let name = ((_a = this.modal) === null || _a === void 0 ? void 0 : _a.querySelector('[data-type="name"]')).value;
        let country = ((_b = this.modal) === null || _b === void 0 ? void 0 : _b.querySelector('[data-type="country"]')).value;
        let image = ((_c = this.modal) === null || _c === void 0 ? void 0 : _c.querySelector('[data-type="img"]')).value;
        let num = sessionStorage.length;
        for (let i = 0; i < sessionStorage.length; i++) {
            if (sessionStorage.getItem(i.toString()) == null) {
                num = i;
            }
        }
        let cardId = num.toString();
        sessionStorage.setItem(num.toString(), JSON.stringify({ name, country, image, cardId }));
        new cards_1.Card({ name, country, image, cardId });
    }
    setup() {
        this.ClickHandler = this.ClickHandler.bind(this);
        window.addEventListener('click', this.ClickHandler);
    }
    ClickHandler(event) {
        let { type } = event.target.dataset;
        if (type === "close") {
            this.close();
        }
        if (type === "Save" && this.mode === "Save") {
            this.save();
        }
        if (type === "Change" && this.mode === "Change") {
            this.change(this.changeCardButtonId);
        }
    }
    render() {
        return `
          <div class="modal" data-modal="${this.id}">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Register person</h5>
                  <button type="button" class="btn-close"  data-type="close" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="mb-3">
                      <label for="recipient-name" class="col-form-label">Image</label>
                      <input type="url" data-type="img" class="form-control" id="recipient-name">
                  </>
                  <div class="mb-3">
                      <label for="recipient-name" class="col-form-label">Name</label>
                      <input type="text" data-type="name" class="form-control" id="recipient-name">
                  </div>
                  <div class="mb-3">
                      <label for="recipient-name" class="col-form-label">Country</label>
                      <input type="text" data-type="country" class="form-control" id="recipient-name">
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-type="${this.mode}">${this.mode}</button>
                  <button type="button" class="btn btn-danger" data-type="close" tabindex="-1">Close</button>
                </div>
              </div>
            </div>
          </div>
      `;
    }
}
exports.Modal = Modal;
