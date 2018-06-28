(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-theme-theme-module"],{

/***/ "./node_modules/@coreui/coreui/dist/js/coreui-utilities.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@coreui/coreui/dist/js/coreui-utilities.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
  * CoreUI v2.0.2 (https://coreui.io)
  * Copyright 2018 Łukasz Holeczek
  * Licensed under MIT (https://coreui.io)
  */
(function (global, factory) {
   true ? factory(exports) :
  undefined;
}(this, (function (exports) { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * CoreUI Utilities (v2.0.2): get-style.js
   * Licensed under MIT (https://coreui.io/license)
   * --------------------------------------------------------------------------
   */
  var getCssCustomProperties = function getCssCustomProperties() {
    var cssCustomProperties = {};
    var sheets = document.styleSheets;
    var cssText = '';

    for (var i = sheets.length - 1; i > -1; i--) {
      var rules = sheets[i].cssRules;

      for (var j = rules.length - 1; j > -1; j--) {
        if (rules[j].selectorText === '.ie-custom-properties') {
          cssText = rules[j].cssText;
          break;
        }
      }

      if (cssText) {
        break;
      }
    }

    cssText = cssText.substring(cssText.lastIndexOf('{') + 1, cssText.lastIndexOf('}'));
    cssText.split(';').forEach(function (property) {
      if (property) {
        var name = property.split(': ')[0];
        var value = property.split(': ')[1];

        if (name && value) {
          cssCustomProperties["--" + name.trim()] = value.trim();
        }
      }
    });
    return cssCustomProperties;
  };

  var minIEVersion = 10;

  var isIE1x = function isIE1x() {
    return Boolean(document.documentMode) && document.documentMode >= minIEVersion;
  };

  var isCustomProperty = function isCustomProperty(property) {
    return property.match(/^--.*/i);
  };

  var getStyle = function getStyle(property, element) {
    if (element === void 0) {
      element = document.body;
    }

    var style;

    if (isCustomProperty(property) && isIE1x()) {
      var cssCustomProperties = getCssCustomProperties();
      style = cssCustomProperties[property];
    } else {
      style = window.getComputedStyle(element, null).getPropertyValue(property).replace(/^\s/, '');
    }

    return style;
  };

  /**
   * --------------------------------------------------------------------------
   * CoreUI Utilities (v2.0.2): hex-to-rgb.js
   * Licensed under MIT (https://coreui.io/license)
   * --------------------------------------------------------------------------
   */

  /* eslint-disable no-magic-numbers */
  var hexToRgb = function hexToRgb(color) {
    if (typeof color === 'undefined') {
      throw new Error('Hex color is not defined');
    }

    var hex = color.match(/^#(?:[0-9a-f]{3}){1,2}$/i);

    if (!hex) {
      throw new Error(color + " is not a valid hex color");
    }

    var r;
    var g;
    var b;

    if (color.length === 7) {
      r = parseInt(color.substring(1, 3), 16);
      g = parseInt(color.substring(3, 5), 16);
      b = parseInt(color.substring(5, 7), 16);
    } else {
      r = parseInt(color.substring(1, 2), 16);
      g = parseInt(color.substring(2, 3), 16);
      b = parseInt(color.substring(3, 5), 16);
    }

    return "rgba(" + r + ", " + g + ", " + b + ")";
  };

  /**
   * --------------------------------------------------------------------------
   * CoreUI Utilities (v2.0.2): hex-to-rgba.js
   * Licensed under MIT (https://coreui.io/license)
   * --------------------------------------------------------------------------
   */

  /* eslint-disable no-magic-numbers */
  var hexToRgba = function hexToRgba(color, opacity) {
    if (opacity === void 0) {
      opacity = 100;
    }

    if (typeof color === 'undefined') {
      throw new Error('Hex color is not defined');
    }

    var hex = color.match(/^#(?:[0-9a-f]{3}){1,2}$/i);

    if (!hex) {
      throw new Error(color + " is not a valid hex color");
    }

    var r;
    var g;
    var b;

    if (color.length === 7) {
      r = parseInt(color.substring(1, 3), 16);
      g = parseInt(color.substring(3, 5), 16);
      b = parseInt(color.substring(5, 7), 16);
    } else {
      r = parseInt(color.substring(1, 2), 16);
      g = parseInt(color.substring(2, 3), 16);
      b = parseInt(color.substring(3, 5), 16);
    }

    return "rgba(" + r + ", " + g + ", " + b + ", " + opacity / 100 + ")";
  };

  /**
   * --------------------------------------------------------------------------
   * CoreUI (v2.0.2): rgb-to-hex.js
   * Licensed under MIT (https://coreui.io/license)
   * --------------------------------------------------------------------------
   */

  /* eslint-disable no-magic-numbers */
  var rgbToHex = function rgbToHex(color) {
    if (typeof color === 'undefined') {
      throw new Error('Hex color is not defined');
    }

    var rgb = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

    if (!rgb) {
      throw new Error(color + " is not a valid rgb color");
    }

    var r = "0" + parseInt(rgb[1], 10).toString(16);
    var g = "0" + parseInt(rgb[2], 10).toString(16);
    var b = "0" + parseInt(rgb[3], 10).toString(16);
    return "#" + r.slice(-2) + g.slice(-2) + b.slice(-2);
  };

  exports.getStyle = getStyle;
  exports.hexToRgb = hexToRgb;
  exports.hexToRgba = hexToRgba;
  exports.rgbToHex = rgbToHex;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=coreui-utilities.js.map


/***/ }),

/***/ "./src/app/views/theme/colors.component.html":
/*!***************************************************!*\
  !*** ./src/app/views/theme/colors.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\n  <div class=\"card\">\n    <div class=\"card-header\">\n     <i class=\"fa fa-list-ul\"></i>Restitution assurances\n    </div>\n    <div class=\"card-body\">\n      <table class=\"table table-responsive-sm table-hover table-outline mb-0\">\n\n        <tbody>\n        <tr>\n          <td>\n\n              <img class=\"img-circle face\" src='assets/img/brand/image004.png' width=\"80px\" height=\"12x\" >\n              <span class=\"avatar-status badge-danger\"></span>\n\n\n          </td>\n          <td>\n            <div><i><b>Assurance d'habitation</b></i></div>\n            <div class=\"small text-muted\">\n              <h6>  <span class=\"badge badge-success\">Date début: Jan 1, 2015</span></h6>\n\n              <h6>  <span class=\"badge badge-danger\">Date fin: Jan 1, 2015</span></h6>\n              <span><b>Adresse:</b> 78 Boulevard de la République\n                92100 Boulogne-Billancourt</span></div>\n\n          </td>\n\n\n\n        </tr>\n\n        <tr>\n          <td>\n\n            <img class=\"img-circle face\" src='assets/img/brand/image011.jpg' width=\"80px\" height=\"12x\" >\n            <span class=\"avatar-status badge-danger\"></span>\n\n\n          </td>\n          <td>\n            <div><i><b>Assurance auto</b></i></div>\n            <div class=\"small text-muted\">\n              <h6>  <span class=\"badge badge-success\">Date début : Jan 1, 2015</span></h6>\n\n              <h6>  <span class=\"badge badge-danger\">Date fin : Jan 1, 2015</span></h6>\n              <span><b>Immatricule :</b> F 123 277 977</span><br>\n              <span><b>Marque :</b> volkswagen golf 8</span>\n              <br>\n              <span><b>Carburant :</b> diesel</span>\n              <br>\n              <span><b>Date de fabrication :</b> 02/01/1991</span>\n\n            </div>\n\n\n          </td>\n\n\n\n        </tr>\n       <!-- <tr>\n          <td class=\"text-center\">\n            <div class=\"avatar\">\n              <img src=\"assets/img/avatars/2.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n              <span class=\"avatar-status badge-danger\"></span>\n            </div>\n          </td>\n          <td>\n            <div>Avram Tarasios</div>\n            <div class=\"small text-muted\">\n\n              <span>Recurring</span> | Registered: Jan 1, 2015\n            </div>\n          </td>\n          <td class=\"text-center\">\n            <i class=\"flag-icon flag-icon-br h4 mb-0\" title=\"br\" id=\"br\"></i>\n          </td>\n          <td>\n            <div class=\"clearfix\">\n              <div class=\"float-left\">\n                <strong>10%</strong>\n              </div>\n              <div class=\"float-right\">\n                <small class=\"text-muted\">Jun 11, 2015 - Jul 10, 2015</small>\n              </div>\n            </div>\n            <div class=\"progress progress-xs\">\n              <div class=\"progress-bar bg-info\" role=\"progressbar\" style=\"width: 10%\" aria-valuenow=\"10\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n            </div>\n          </td>\n          <td class=\"text-center\">\n            <i class=\"fa fa-cc-visa\" style=\"font-size:24px\"></i>\n          </td>\n          <td>\n            <div class=\"small text-muted\">Last login</div>\n            <strong>5 minutes ago</strong>\n          </td>\n        </tr>\n        <tr>\n          <td class=\"text-center\">\n            <div class=\"avatar\">\n              <img src=\"assets/img/avatars/3.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n              <span class=\"avatar-status badge-warning\"></span>\n            </div>\n          </td>\n          <td>\n            <div>Quintin Ed</div>\n            <div class=\"small text-muted\">\n              <span>New</span> | Registered: Jan 1, 2015\n            </div>\n          </td>\n          <td class=\"text-center\">\n            <i class=\"flag-icon flag-icon-in h4 mb-0\" title=\"in\" id=\"in\"></i>\n          </td>\n          <td>\n            <div class=\"clearfix\">\n              <div class=\"float-left\">\n                <strong>74%</strong>\n              </div>\n              <div class=\"float-right\">\n                <small class=\"text-muted\">Jun 11, 2015 - Jul 10, 2015</small>\n              </div>\n            </div>\n            <div class=\"progress progress-xs\">\n              <div class=\"progress-bar bg-warning\" role=\"progressbar\" style=\"width: 74%\" aria-valuenow=\"74\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n            </div>\n          </td>\n          <td class=\"text-center\">\n            <i class=\"fa fa-cc-stripe\" style=\"font-size:24px\"></i>\n          </td>\n          <td>\n            <div class=\"small text-muted\">Last login</div>\n            <strong>1 hour ago</strong>\n          </td>\n        </tr>\n        <tr>\n          <td class=\"text-center\">\n            <div class=\"avatar\">\n              <img src=\"assets/img/avatars/4.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n              <span class=\"avatar-status badge-secondary\"></span>\n            </div>\n          </td>\n          <td>\n            <div>Enéas Kwadwo</div>\n            <div class=\"small text-muted\">\n              <span>New</span> | Registered: Jan 1, 2015\n            </div>\n          </td>\n          <td class=\"text-center\">\n            <i class=\"flag-icon flag-icon-fr h4 mb-0\" title=\"fr\" id=\"fr\"></i>\n          </td>\n          <td>\n            <div class=\"clearfix\">\n              <div class=\"float-left\">\n                <strong>98%</strong>\n              </div>\n              <div class=\"float-right\">\n                <small class=\"text-muted\">Jun 11, 2015 - Jul 10, 2015</small>\n              </div>\n            </div>\n            <div class=\"progress progress-xs\">\n              <div class=\"progress-bar bg-danger\" role=\"progressbar\" style=\"width: 98%\" aria-valuenow=\"98\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n            </div>\n          </td>\n          <td class=\"text-center\">\n            <i class=\"fa fa-paypal\" style=\"font-size:24px\"></i>\n          </td>\n          <td>\n            <div class=\"small text-muted\">Last login</div>\n            <strong>Last month</strong>\n          </td>\n        </tr>\n        <tr>\n          <td class=\"text-center\">\n            <div class=\"avatar\">\n              <img src=\"assets/img/avatars/5.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n              <span class=\"avatar-status badge-success\"></span>\n            </div>\n          </td>\n          <td>\n            <div>Agapetus Tadeáš</div>\n            <div class=\"small text-muted\">\n              <span>New</span> | Registered: Jan 1, 2015\n            </div>\n          </td>\n          <td class=\"text-center\">\n            <i class=\"flag-icon flag-icon-es h4 mb-0\" title=\"es\" id=\"es\"></i>\n          </td>\n          <td>\n            <div class=\"clearfix\">\n              <div class=\"float-left\">\n                <strong>22%</strong>\n              </div>\n              <div class=\"float-right\">\n                <small class=\"text-muted\">Jun 11, 2015 - Jul 10, 2015</small>\n              </div>\n            </div>\n            <div class=\"progress progress-xs\">\n              <div class=\"progress-bar bg-info\" role=\"progressbar\" style=\"width: 22%\" aria-valuenow=\"22\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n            </div>\n          </td>\n          <td class=\"text-center\">\n            <i class=\"fa fa-google-wallet\" style=\"font-size:24px\"></i>\n          </td>\n          <td>\n            <div class=\"small text-muted\">Last login</div>\n            <strong>Last week</strong>\n          </td>\n        </tr>\n        <tr>\n          <td class=\"text-center\">\n            <div class=\"avatar\">\n              <img src=\"assets/img/avatars/6.jpg\" class=\"img-avatar\" alt=\"admin@bootstrapmaster.com\">\n              <span class=\"avatar-status badge-danger\"></span>\n            </div>\n          </td>\n          <td>\n            <div>Friderik Dávid</div>\n            <div class=\"small text-muted\">\n              <span>New</span> | Registered: Jan 1, 2015\n            </div>\n          </td>\n          <td class=\"text-center\">\n            <i class=\"flag-icon flag-icon-pl h4 mb-0\" title=\"pl\" id=\"pl\"></i>\n          </td>\n          <td>\n            <div class=\"clearfix\">\n              <div class=\"float-left\">\n                <strong>43%</strong>\n              </div>\n              <div class=\"float-right\">\n                <small class=\"text-muted\">Jun 11, 2015 - Jul 10, 2015</small>\n              </div>\n            </div>\n            <div class=\"progress progress-xs\">\n              <div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: 43%\" aria-valuenow=\"43\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n            </div>\n          </td>\n          <td class=\"text-center\">\n            <i class=\"fa fa-cc-amex\" style=\"font-size:24px\"></i>\n          </td>\n          <td>\n            <div class=\"small text-muted\">Last login</div>\n            <strong>Yesterday</strong>\n          </td>\n        </tr>-->\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n\n\n\n</div>\n"

/***/ }),

/***/ "./src/app/views/theme/colors.component.ts":
/*!*************************************************!*\
  !*** ./src/app/views/theme/colors.component.ts ***!
  \*************************************************/
/*! exports provided: ColorsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorsComponent", function() { return ColorsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _coreui_coreui_dist_js_coreui_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @coreui/coreui/dist/js/coreui-utilities */ "./node_modules/@coreui/coreui/dist/js/coreui-utilities.js");
/* harmony import */ var _coreui_coreui_dist_js_coreui_utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_coreui_coreui_dist_js_coreui_utilities__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ColorsComponent = /** @class */ (function () {
    function ColorsComponent() {
    }
    ColorsComponent.prototype.themeColors = function () {
        Array.from(document.querySelectorAll('.theme-color')).forEach(function (el) {
            var elem = document.getElementsByClassName(el.classList[0])[0];
            var background = Object(_coreui_coreui_dist_js_coreui_utilities__WEBPACK_IMPORTED_MODULE_1__["getStyle"])('background-color', elem);
            var table = document.createElement('table');
            table.innerHTML = "\n        <table class=\"w-100\">\n          <tr>\n            <td class=\"text-muted\">HEX:</td>\n            <td class=\"font-weight-bold\">" + Object(_coreui_coreui_dist_js_coreui_utilities__WEBPACK_IMPORTED_MODULE_1__["rgbToHex"])(background) + "</td>\n          </tr>\n          <tr>\n            <td class=\"text-muted\">RGB:</td>\n            <td class=\"font-weight-bold\">" + background + "</td>\n          </tr>\n        </table>\n      ";
            el.parentNode.appendChild(table);
        });
    };
    ColorsComponent.prototype.ngOnInit = function () {
        this.themeColors();
    };
    ColorsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./colors.component.html */ "./src/app/views/theme/colors.component.html")
        })
    ], ColorsComponent);
    return ColorsComponent;
}());



/***/ }),

/***/ "./src/app/views/theme/theme-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/theme/theme-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: ThemeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeRoutingModule", function() { return ThemeRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _colors_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./colors.component */ "./src/app/views/theme/colors.component.ts");
/* harmony import */ var _typography_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./typography.component */ "./src/app/views/theme/typography.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    {
        path: '',
        data: {
            title: 'Theme'
        },
        children: [
            {
                path: 'colors',
                component: _colors_component__WEBPACK_IMPORTED_MODULE_2__["ColorsComponent"],
                data: {
                    title: 'Colors'
                }
            },
            {
                path: 'typography',
                component: _typography_component__WEBPACK_IMPORTED_MODULE_3__["TypographyComponent"],
                data: {
                    title: 'Typography'
                }
            }
        ]
    }
];
var ThemeRoutingModule = /** @class */ (function () {
    function ThemeRoutingModule() {
    }
    ThemeRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ThemeRoutingModule);
    return ThemeRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/theme/theme.module.ts":
/*!*********************************************!*\
  !*** ./src/app/views/theme/theme.module.ts ***!
  \*********************************************/
/*! exports provided: ThemeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeModule", function() { return ThemeModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _colors_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./colors.component */ "./src/app/views/theme/colors.component.ts");
/* harmony import */ var _typography_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./typography.component */ "./src/app/views/theme/typography.component.ts");
/* harmony import */ var _theme_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./theme-routing.module */ "./src/app/views/theme/theme-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Angular




// Theme Routing

var ThemeModule = /** @class */ (function () {
    function ThemeModule() {
    }
    ThemeModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                _theme_routing_module__WEBPACK_IMPORTED_MODULE_4__["ThemeRoutingModule"]
            ],
            declarations: [
                _colors_component__WEBPACK_IMPORTED_MODULE_2__["ColorsComponent"],
                _typography_component__WEBPACK_IMPORTED_MODULE_3__["TypographyComponent"]
            ]
        })
    ], ThemeModule);
    return ThemeModule;
}());



/***/ }),

/***/ "./src/app/views/theme/typography.component.html":
/*!*******************************************************!*\
  !*** ./src/app/views/theme/typography.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Headings\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <p>Documentation and examples for Bootstrap typography, including global settings, headings, body text, lists, and more.</p>\r\n      <table class=\"table\">\r\n        <thead>\r\n          <tr>\r\n            <th>Heading</th>\r\n            <th>Example</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr>\r\n            <td>\r\n              <p><code class=\"highlighter-rouge\">&lt;h1&gt;&lt;/h1&gt;</code></p>\r\n            </td>\r\n            <td><span class=\"h1\">h1. Bootstrap heading</span></td>\r\n          </tr>\r\n          <tr>\r\n            <td>\r\n              <p><code class=\"highlighter-rouge\">&lt;h2&gt;&lt;/h2&gt;</code></p>\r\n            </td>\r\n            <td><span class=\"h2\">h2. Bootstrap heading</span></td>\r\n          </tr>\r\n          <tr>\r\n            <td>\r\n              <p><code class=\"highlighter-rouge\">&lt;h3&gt;&lt;/h3&gt;</code></p>\r\n            </td>\r\n            <td><span class=\"h3\">h3. Bootstrap heading</span></td>\r\n          </tr>\r\n          <tr>\r\n            <td>\r\n              <p><code class=\"highlighter-rouge\">&lt;h4&gt;&lt;/h4&gt;</code></p>\r\n            </td>\r\n            <td><span class=\"h4\">h4. Bootstrap heading</span></td>\r\n          </tr>\r\n          <tr>\r\n            <td>\r\n              <p><code class=\"highlighter-rouge\">&lt;h5&gt;&lt;/h5&gt;</code></p>\r\n            </td>\r\n            <td><span class=\"h5\">h5. Bootstrap heading</span></td>\r\n          </tr>\r\n          <tr>\r\n            <td>\r\n              <p><code class=\"highlighter-rouge\">&lt;h6&gt;&lt;/h6&gt;</code></p>\r\n            </td>\r\n            <td><span class=\"h6\">h6. Bootstrap heading</span></td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Headings\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <p><code class=\"highlighter-rouge\">.h1</code> through <code class=\"highlighter-rouge\">.h6</code> classes are also available, for when you want to match the font styling of a heading but cannot use the associated HTML element.</p>\r\n      <div class=\"bd-example\">\r\n        <p class=\"h1\">h1. Bootstrap heading</p>\r\n        <p class=\"h2\">h2. Bootstrap heading</p>\r\n        <p class=\"h3\">h3. Bootstrap heading</p>\r\n        <p class=\"h4\">h4. Bootstrap heading</p>\r\n        <p class=\"h5\">h5. Bootstrap heading</p>\r\n        <p class=\"h6\">h6. Bootstrap heading</p>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Display headings\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <p>Traditional heading elements are designed to work best in the meat of your page content. When you need a heading to stand out, consider using a <strong>display heading</strong>—a larger, slightly more opinionated heading style.</p>\r\n      <div class=\"bd-example bd-example-type\">\r\n        <table class=\"table\">\r\n          <tbody>\r\n            <tr>\r\n              <td><span class=\"display-1\">Display 1</span></td>\r\n            </tr>\r\n            <tr>\r\n              <td><span class=\"display-2\">Display 2</span></td>\r\n            </tr>\r\n            <tr>\r\n              <td><span class=\"display-3\">Display 3</span></td>\r\n            </tr>\r\n            <tr>\r\n              <td><span class=\"display-4\">Display 4</span></td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Inline text elements\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <p>Traditional heading elements are designed to work best in the meat of your page content. When you need a heading to stand out, consider using a <strong>display heading</strong>—a larger, slightly more opinionated heading style.</p>\r\n      <div class=\"bd-example\">\r\n        <p>You can use the mark tag to <mark>highlight</mark> text.</p>\r\n        <p><del>This line of text is meant to be treated as deleted text.</del></p>\r\n        <p><s>This line of text is meant to be treated as no longer accurate.</s></p>\r\n        <p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>\r\n        <p><u>This line of text will render as underlined</u></p>\r\n        <p><small>This line of text is meant to be treated as fine print.</small></p>\r\n        <p><strong>This line rendered as bold text.</strong></p>\r\n        <p><em>This line rendered as italicized text.</em></p>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Description list alignment\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <p>Align terms and descriptions horizontally by using our grid system’s predefined classes (or semantic mixins). For longer terms, you can optionally add a <code class=\"highlighter-rouge\">.text-truncate</code> class to truncate the text with an ellipsis.</p>\r\n      <div class=\"bd-example\">\r\n        <dl class=\"row\">\r\n          <dt class=\"col-sm-3\">Description lists</dt>\r\n          <dd class=\"col-sm-9\">A description list is perfect for defining terms.</dd>\r\n\r\n          <dt class=\"col-sm-3\">Euismod</dt>\r\n          <dd class=\"col-sm-9\">\r\n            <p>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</p>\r\n            <p>Donec id elit non mi porta gravida at eget metus.</p>\r\n          </dd>\r\n\r\n          <dt class=\"col-sm-3\">Malesuada porta</dt>\r\n          <dd class=\"col-sm-9\">Etiam porta sem malesuada magna mollis euismod.</dd>\r\n\r\n          <dt class=\"col-sm-3 text-truncate\">Truncated term is truncated</dt>\r\n          <dd class=\"col-sm-9\">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</dd>\r\n\r\n          <dt class=\"col-sm-3\">Nesting</dt>\r\n          <dd class=\"col-sm-9\">\r\n            <dl class=\"row\">\r\n              <dt class=\"col-sm-4\">Nested definition list</dt>\r\n              <dd class=\"col-sm-8\">Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc.</dd>\r\n            </dl>\r\n          </dd>\r\n        </dl>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/theme/typography.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/theme/typography.component.ts ***!
  \*****************************************************/
/*! exports provided: TypographyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TypographyComponent", function() { return TypographyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TypographyComponent = /** @class */ (function () {
    function TypographyComponent() {
    }
    TypographyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./typography.component.html */ "./src/app/views/theme/typography.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], TypographyComponent);
    return TypographyComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-theme-theme-module.js.map