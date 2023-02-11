// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../js/modal.js":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = void 0;
var cards_1 = require("./cards");
var Modal = /*#__PURE__*/function () {
  function Modal(mode, id) {
    _classCallCheck(this, Modal);
    var _a;
    this.mode = mode;
    this.id = id;
    this.changeCardButtonId = 0;
    (_a = document.querySelector('.wrapper')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("beforeend", this.render());
    this.modal = document.querySelector('.modal[data-modal="' + this.id + '"]');
    this.setup();
  }
  _createClass(Modal, [{
    key: "open",
    value: function open(changeCardButtonId) {
      this.changeCardButtonId = changeCardButtonId;
      if (this.modal) {
        this.modal.style.display = 'block';
      }
    }
  }, {
    key: "close",
    value: function close() {
      if (this.modal) {
        this.modal.style.display = 'none';
      }
    }
  }, {
    key: "change",
    value: function change(id) {
      var _a, _b, _c;
      var name = ((_a = this.modal) === null || _a === void 0 ? void 0 : _a.querySelector('[data-type="name"]')).value;
      var country = ((_b = this.modal) === null || _b === void 0 ? void 0 : _b.querySelector('[data-type="country"]')).value;
      var image = ((_c = this.modal) === null || _c === void 0 ? void 0 : _c.querySelector('[data-type="img"]')).value;
      var cardId = id === null || id === void 0 ? void 0 : id.toString();
      if (typeof cardId === "number") {
        sessionStorage.setItem(cardId, JSON.stringify({
          name: name,
          country: country,
          image: image,
          cardId: cardId
        }));
      }
      location.reload();
    }
  }, {
    key: "save",
    value: function save() {
      var _a, _b, _c;
      var name = ((_a = this.modal) === null || _a === void 0 ? void 0 : _a.querySelector('[data-type="name"]')).value;
      var country = ((_b = this.modal) === null || _b === void 0 ? void 0 : _b.querySelector('[data-type="country"]')).value;
      var image = ((_c = this.modal) === null || _c === void 0 ? void 0 : _c.querySelector('[data-type="img"]')).value;
      var num = sessionStorage.length;
      for (var i = 0; i < sessionStorage.length; i++) {
        if (sessionStorage.getItem(i.toString()) == null) {
          num = i;
        }
      }
      var cardId = num.toString();
      sessionStorage.setItem(num.toString(), JSON.stringify({
        name: name,
        country: country,
        image: image,
        cardId: cardId
      }));
      new cards_1.Card({
        name: name,
        country: country,
        image: image,
        cardId: cardId
      });
    }
  }, {
    key: "setup",
    value: function setup() {
      this.ClickHandler = this.ClickHandler.bind(this);
      window.addEventListener('click', this.ClickHandler);
    }
  }, {
    key: "ClickHandler",
    value: function ClickHandler(event) {
      var type = event.target.dataset.type;
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
  }, {
    key: "render",
    value: function render() {
      return "\n          <div class=\"modal\" data-modal=\"".concat(this.id, "\">\n            <div class=\"modal-dialog\">\n              <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                  <h5 class=\"modal-title\">Register person</h5>\n                  <button type=\"button\" class=\"btn-close\"  data-type=\"close\" aria-label=\"Close\"></button>\n                </div>\n                <div class=\"modal-body\">\n                  <div class=\"mb-3\">\n                      <label for=\"recipient-name\" class=\"col-form-label\">Image</label>\n                      <input type=\"url\" data-type=\"img\" class=\"form-control\" id=\"recipient-name\">\n                  </>\n                  <div class=\"mb-3\">\n                      <label for=\"recipient-name\" class=\"col-form-label\">Name</label>\n                      <input type=\"text\" data-type=\"name\" class=\"form-control\" id=\"recipient-name\">\n                  </div>\n                  <div class=\"mb-3\">\n                      <label for=\"recipient-name\" class=\"col-form-label\">Country</label>\n                      <input type=\"text\" data-type=\"country\" class=\"form-control\" id=\"recipient-name\">\n                  </div>\n                </div>\n                <div class=\"modal-footer\">\n                  <button type=\"button\" class=\"btn btn-primary\" data-type=\"").concat(this.mode, "\">").concat(this.mode, "</button>\n                  <button type=\"button\" class=\"btn btn-danger\" data-type=\"close\" tabindex=\"-1\">Close</button>\n                </div>\n              </div>\n            </div>\n          </div>\n      ");
    }
  }]);
  return Modal;
}();
exports.Modal = Modal;
},{"./cards":"../js/cards.js"}],"../js/cards.js":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = void 0;
var modal_1 = require("./modal");
var cardModal = new modal_1.Modal('Change', 0);
var Card = /*#__PURE__*/function () {
  function Card(info) {
    _classCallCheck(this, Card);
    var _a;
    this.info = info;
    console.log(info);
    (_a = document.querySelector('.row')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', this.render());
    this.changeButton = document.querySelector('.btn[data-btn="' + this.info.cardId + '"]');
    this.deleteButton = document.querySelector('.btn[data-del="' + this.info.cardId + '"]');
    this.setup();
  }
  _createClass(Card, [{
    key: "setup",
    value: function setup() {
      var _a, _b;
      this.ChangeCardInfo = this.ChangeCardInfo.bind(this);
      this.DeleteCard = this.DeleteCard.bind(this);
      (_a = this.changeButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.ChangeCardInfo);
      (_b = this.deleteButton) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.DeleteCard);
    }
  }, {
    key: "ChangeCardInfo",
    value: function ChangeCardInfo() {
      cardModal.open(this.info.cardId);
    }
  }, {
    key: "DeleteCard",
    value: function DeleteCard() {
      sessionStorage.removeItem(this.info.cardId.toString());
      location.reload();
    }
  }, {
    key: "render",
    value: function render() {
      var address = 'https://fikiwiki.com/uploads/posts/2022-02/1645054742_19-fikiwiki-com-p-kartinki-ikonki-19.png';
      var imgURL = this.info.image == '' ? address : this.info.image;
      return "\n          <div class=\"col\">\n                  <div class=\"card\">\n                      <img src=".concat(imgURL, " class=\"card-img-top\" alt=\"...\">\n                      <div class=\"card-body text-center\">\n                          <h5 class=\"card-title\">Name:").concat(this.info.name, "</h5>\n                          <p class=\"card-text\">Country:").concat(this.info.country, "</p>\n                          <div class=\"card-body text-center\">\n                              <button class=\"btn btn-primary\" data-type=\"rewrite\" data-btn=\"").concat(this.info.cardId, "\">Change</button>\n                              <button class=\"btn btn-primary\" data-type=\"del\" data-del=\"").concat(this.info.cardId, "\">Delete</button>\n                          </div>\n                      </div>\n                  </div>\n              </div>");
    }
  }]);
  return Card;
}();
exports.Card = Card;
},{"./modal":"../js/modal.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../css/zero.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../css/style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"../css/zero.css":"../css/zero.css","_css_loader":"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../js/index.js":[function(require,module,exports) {
"use strict";

var _a, _b, _c;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var cards_js_1 = require("./cards.js");
var modal_js_1 = require("./modal.js");
require("../css/style.scss");
var modal = new modal_js_1.Modal('Save', -1);
(_a = document.querySelector('.form__button--add')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (event) {
  event.preventDefault();
  modal.open();
});
(_b = document.querySelector('.form__button--delete')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function (event) {
  event.preventDefault();
  sessionStorage.clear();
  location.reload();
});
for (var i = 0; i < sessionStorage.length; i++) {
  var key = (_c = sessionStorage.key(i)) === null || _c === void 0 ? void 0 : _c.toString();
  if (typeof key === "string") {
    var storedItem = sessionStorage.getItem(key);
    if (typeof storedItem === "string") {
      new cards_js_1.Card(JSON.parse(storedItem));
    }
  }
}
},{"./cards.js":"../js/cards.js","./modal.js":"../js/modal.js","../css/style.scss":"../css/style.scss"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53239" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../js/index.js"], null)
//# sourceMappingURL=/js.fcffc47e.js.map