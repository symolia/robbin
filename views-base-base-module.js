(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-base-base-module"],{

/***/ "./node_modules/ngx-bootstrap/carousel/carousel.component.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/carousel/carousel.component.js ***!
  \*******************************************************************/
/*! exports provided: Direction, CarouselComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Direction", function() { return Direction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarouselComponent", function() { return CarouselComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/index */ "./node_modules/ngx-bootstrap/utils/index.js");
/* harmony import */ var _carousel_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./carousel.config */ "./node_modules/ngx-bootstrap/carousel/carousel.config.js");
// tslint:disable:max-file-line-count
/***
 * pause (not yet supported) (?string='hover') - event group name which pauses
 * the cycling of the carousel, if hover pauses on mouseenter and resumes on
 * mouseleave keyboard (not yet supported) (?boolean=true) - if false
 * carousel will not react to keyboard events
 * note: swiping not yet supported
 */
/****
 * Problems:
 * 1) if we set an active slide via model changes, .active class remains on a
 * current slide.
 * 2) if we have only one slide, we shouldn't show prev/next nav buttons
 * 3) if first or last slide is active and noWrap is true, there should be
 * "disabled" class on the nav buttons.
 * 4) default interval should be equal 5000
 */



var Direction;
(function (Direction) {
    Direction[Direction["UNKNOWN"] = 0] = "UNKNOWN";
    Direction[Direction["NEXT"] = 1] = "NEXT";
    Direction[Direction["PREV"] = 2] = "PREV";
})(Direction || (Direction = {}));
/**
 * Base element to create carousel
 */
var CarouselComponent = /** @class */ (function () {
    function CarouselComponent(config, ngZone) {
        this.ngZone = ngZone;
        /** Will be emitted when active slide has been changed. Part of two-way-bindable [(activeSlide)] property */
        this.activeSlideChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](false);
        this._slides = new _utils_index__WEBPACK_IMPORTED_MODULE_1__["LinkedList"]();
        this.destroyed = false;
        Object.assign(this, config);
    }
    Object.defineProperty(CarouselComponent.prototype, "activeSlide", {
        get: function () {
            return this._currentActiveSlide;
        },
        set: /** Index of currently displayed slide(started for 0) */
        function (index) {
            if (this._slides.length && index !== this._currentActiveSlide) {
                this._select(index);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarouselComponent.prototype, "interval", {
        get: /**
           * Delay of item cycling in milliseconds. If false, carousel won't cycle
           * automatically.
           */
        function () {
            return this._interval;
        },
        set: function (value) {
            this._interval = value;
            this.restartTimer();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarouselComponent.prototype, "slides", {
        get: function () {
            return this._slides.toArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarouselComponent.prototype, "isBs4", {
        get: function () {
            return !Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["isBs3"])();
        },
        enumerable: true,
        configurable: true
    });
    CarouselComponent.prototype.ngOnDestroy = function () {
        this.destroyed = true;
    };
    /**
     * Adds new slide. If this slide is first in collection - set it as active
     * and starts auto changing
     * @param slide
     */
    /**
       * Adds new slide. If this slide is first in collection - set it as active
       * and starts auto changing
       * @param slide
       */
    CarouselComponent.prototype.addSlide = /**
       * Adds new slide. If this slide is first in collection - set it as active
       * and starts auto changing
       * @param slide
       */
    function (slide) {
        this._slides.add(slide);
        if (this._slides.length === 1) {
            this._currentActiveSlide = void 0;
            this.activeSlide = 0;
            this.play();
        }
    };
    /**
     * Removes specified slide. If this slide is active - will roll to another
     * slide
     * @param slide
     */
    /**
       * Removes specified slide. If this slide is active - will roll to another
       * slide
       * @param slide
       */
    CarouselComponent.prototype.removeSlide = /**
       * Removes specified slide. If this slide is active - will roll to another
       * slide
       * @param slide
       */
    function (slide) {
        var _this = this;
        var remIndex = this._slides.indexOf(slide);
        if (this._currentActiveSlide === remIndex) {
            // removing of active slide
            var nextSlideIndex_1 = void 0;
            if (this._slides.length > 1) {
                // if this slide last - will roll to first slide, if noWrap flag is
                // FALSE or to previous, if noWrap is TRUE in case, if this slide in
                // middle of collection, index of next slide is same to removed
                // if this slide last - will roll to first slide, if noWrap flag is
                // FALSE or to previous, if noWrap is TRUE in case, if this slide in
                // middle of collection, index of next slide is same to removed
                nextSlideIndex_1 = !this.isLast(remIndex)
                    ? remIndex
                    : this.noWrap ? remIndex - 1 : 0;
            }
            this._slides.remove(remIndex);
            // prevents exception with changing some value after checking
            setTimeout(function () {
                _this._select(nextSlideIndex_1);
            }, 0);
        }
        else {
            this._slides.remove(remIndex);
            var currentSlideIndex_1 = this.getCurrentSlideIndex();
            setTimeout(function () {
                // after removing, need to actualize index of current active slide
                // after removing, need to actualize index of current active slide
                _this._currentActiveSlide = currentSlideIndex_1;
                _this.activeSlideChange.emit(_this._currentActiveSlide);
            }, 0);
        }
    };
    /**
     * Rolling to next slide
     * @param force: {boolean} if true - will ignore noWrap flag
     */
    /**
       * Rolling to next slide
       * @param force: {boolean} if true - will ignore noWrap flag
       */
    CarouselComponent.prototype.nextSlide = /**
       * Rolling to next slide
       * @param force: {boolean} if true - will ignore noWrap flag
       */
    function (force) {
        if (force === void 0) { force = false; }
        this.activeSlide = this.findNextSlideIndex(Direction.NEXT, force);
    };
    /**
     * Rolling to previous slide
     * @param force: {boolean} if true - will ignore noWrap flag
     */
    /**
       * Rolling to previous slide
       * @param force: {boolean} if true - will ignore noWrap flag
       */
    CarouselComponent.prototype.previousSlide = /**
       * Rolling to previous slide
       * @param force: {boolean} if true - will ignore noWrap flag
       */
    function (force) {
        if (force === void 0) { force = false; }
        this.activeSlide = this.findNextSlideIndex(Direction.PREV, force);
    };
    /**
     * Rolling to specified slide
     * @param index: {number} index of slide, which must be shown
     */
    /**
       * Rolling to specified slide
       * @param index: {number} index of slide, which must be shown
       */
    CarouselComponent.prototype.selectSlide = /**
       * Rolling to specified slide
       * @param index: {number} index of slide, which must be shown
       */
    function (index) {
        this.activeSlide = index;
    };
    /**
     * Starts a auto changing of slides
     */
    /**
       * Starts a auto changing of slides
       */
    CarouselComponent.prototype.play = /**
       * Starts a auto changing of slides
       */
    function () {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.restartTimer();
        }
    };
    /**
     * Stops a auto changing of slides
     */
    /**
       * Stops a auto changing of slides
       */
    CarouselComponent.prototype.pause = /**
       * Stops a auto changing of slides
       */
    function () {
        if (!this.noPause) {
            this.isPlaying = false;
            this.resetTimer();
        }
    };
    /**
     * Finds and returns index of currently displayed slide
     * @returns {number}
     */
    /**
       * Finds and returns index of currently displayed slide
       * @returns {number}
       */
    CarouselComponent.prototype.getCurrentSlideIndex = /**
       * Finds and returns index of currently displayed slide
       * @returns {number}
       */
    function () {
        return this._slides.findIndex(function (slide) { return slide.active; });
    };
    /**
     * Defines, whether the specified index is last in collection
     * @param index
     * @returns {boolean}
     */
    /**
       * Defines, whether the specified index is last in collection
       * @param index
       * @returns {boolean}
       */
    CarouselComponent.prototype.isLast = /**
       * Defines, whether the specified index is last in collection
       * @param index
       * @returns {boolean}
       */
    function (index) {
        return index + 1 >= this._slides.length;
    };
    /**
     * Defines next slide index, depending of direction
     * @param direction: Direction(UNKNOWN|PREV|NEXT)
     * @param force: {boolean} if TRUE - will ignore noWrap flag, else will
     *   return undefined if next slide require wrapping
     * @returns {any}
     */
    /**
       * Defines next slide index, depending of direction
       * @param direction: Direction(UNKNOWN|PREV|NEXT)
       * @param force: {boolean} if TRUE - will ignore noWrap flag, else will
       *   return undefined if next slide require wrapping
       * @returns {any}
       */
    CarouselComponent.prototype.findNextSlideIndex = /**
       * Defines next slide index, depending of direction
       * @param direction: Direction(UNKNOWN|PREV|NEXT)
       * @param force: {boolean} if TRUE - will ignore noWrap flag, else will
       *   return undefined if next slide require wrapping
       * @returns {any}
       */
    function (direction, force) {
        var nextSlideIndex = 0;
        if (!force &&
            (this.isLast(this.activeSlide) &&
                direction !== Direction.PREV &&
                this.noWrap)) {
            return void 0;
        }
        switch (direction) {
            case Direction.NEXT:
                // if this is last slide, not force, looping is disabled
                // and need to going forward - select current slide, as a next
                nextSlideIndex = !this.isLast(this._currentActiveSlide)
                    ? this._currentActiveSlide + 1
                    : !force && this.noWrap ? this._currentActiveSlide : 0;
                break;
            case Direction.PREV:
                // if this is first slide, not force, looping is disabled
                // and need to going backward - select current slide, as a next
                nextSlideIndex =
                    this._currentActiveSlide > 0
                        ? this._currentActiveSlide - 1
                        : !force && this.noWrap
                            ? this._currentActiveSlide
                            : this._slides.length - 1;
                break;
            default:
                throw new Error('Unknown direction');
        }
        return nextSlideIndex;
    };
    /**
     * Sets a slide, which specified through index, as active
     * @param index
     * @private
     */
    /**
       * Sets a slide, which specified through index, as active
       * @param index
       * @private
       */
    CarouselComponent.prototype._select = /**
       * Sets a slide, which specified through index, as active
       * @param index
       * @private
       */
    function (index) {
        if (isNaN(index)) {
            this.pause();
            return;
        }
        var currentSlide = this._slides.get(this._currentActiveSlide);
        if (currentSlide) {
            currentSlide.active = false;
        }
        var nextSlide = this._slides.get(index);
        if (nextSlide) {
            this._currentActiveSlide = index;
            nextSlide.active = true;
            this.activeSlide = index;
            this.activeSlideChange.emit(index);
        }
    };
    /**
     * Starts loop of auto changing of slides
     */
    /**
       * Starts loop of auto changing of slides
       */
    CarouselComponent.prototype.restartTimer = /**
       * Starts loop of auto changing of slides
       */
    function () {
        var _this = this;
        this.resetTimer();
        var interval = +this.interval;
        if (!isNaN(interval) && interval > 0) {
            this.currentInterval = this.ngZone.runOutsideAngular(function () {
                return setInterval(function () {
                    var nInterval = +_this.interval;
                    _this.ngZone.run(function () {
                        if (_this.isPlaying &&
                            !isNaN(_this.interval) &&
                            nInterval > 0 &&
                            _this.slides.length) {
                            _this.nextSlide();
                        }
                        else {
                            _this.pause();
                        }
                    });
                }, interval);
            });
        }
    };
    /**
     * Stops loop of auto changing of slides
     */
    /**
       * Stops loop of auto changing of slides
       */
    CarouselComponent.prototype.resetTimer = /**
       * Stops loop of auto changing of slides
       */
    function () {
        if (this.currentInterval) {
            clearInterval(this.currentInterval);
            this.currentInterval = void 0;
        }
    };
    CarouselComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'carousel',
                    template: "<div (mouseenter)=\"pause()\" (mouseleave)=\"play()\" (mouseup)=\"play()\" class=\"carousel slide\"> <ol class=\"carousel-indicators\" *ngIf=\"showIndicators && slides.length > 1\"> <li *ngFor=\"let slidez of slides; let i = index;\" [class.active]=\"slidez.active === true\" (click)=\"selectSlide(i)\"></li> </ol> <div class=\"carousel-inner\"><ng-content></ng-content></div> <a class=\"left carousel-control carousel-control-prev\" [class.disabled]=\"activeSlide === 0 && noWrap\" (click)=\"previousSlide()\" *ngIf=\"slides.length > 1\"> <span class=\"icon-prev carousel-control-prev-icon\" aria-hidden=\"true\"></span> <span *ngIf=\"isBs4\" class=\"sr-only\">Previous</span> </a> <a class=\"right carousel-control carousel-control-next\" (click)=\"nextSlide()\"  [class.disabled]=\"isLast(activeSlide) && noWrap\" *ngIf=\"slides.length > 1\"> <span class=\"icon-next carousel-control-next-icon\" aria-hidden=\"true\"></span> <span class=\"sr-only\">Next</span> </a> </div> "
                },] },
    ];
    /** @nocollapse */
    CarouselComponent.ctorParameters = function () { return [
        { type: _carousel_config__WEBPACK_IMPORTED_MODULE_2__["CarouselConfig"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], },
    ]; };
    CarouselComponent.propDecorators = {
        "noWrap": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "noPause": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "showIndicators": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "activeSlideChange": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "activeSlide": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "interval": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    };
    return CarouselComponent;
}());

//# sourceMappingURL=carousel.component.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/carousel/carousel.config.js":
/*!****************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/carousel/carousel.config.js ***!
  \****************************************************************/
/*! exports provided: CarouselConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarouselConfig", function() { return CarouselConfig; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

var CarouselConfig = /** @class */ (function () {
    function CarouselConfig() {
        /** Default interval of auto changing of slides */
        this.interval = 5000;
        /** Is loop of auto changing of slides can be paused */
        this.noPause = false;
        /** Is slides can wrap from the last to the first slide */
        this.noWrap = false;
        /** Show carousel-indicators */
        this.showIndicators = true;
    }
    CarouselConfig.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
    ];
    return CarouselConfig;
}());

//# sourceMappingURL=carousel.config.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/carousel/carousel.module.js":
/*!****************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/carousel/carousel.module.js ***!
  \****************************************************************/
/*! exports provided: CarouselModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarouselModule", function() { return CarouselModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _carousel_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./carousel.component */ "./node_modules/ngx-bootstrap/carousel/carousel.component.js");
/* harmony import */ var _slide_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slide.component */ "./node_modules/ngx-bootstrap/carousel/slide.component.js");
/* harmony import */ var _carousel_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./carousel.config */ "./node_modules/ngx-bootstrap/carousel/carousel.config.js");





var CarouselModule = /** @class */ (function () {
    function CarouselModule() {
    }
    CarouselModule.forRoot = function () {
        return { ngModule: CarouselModule, providers: [] };
    };
    CarouselModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]],
                    declarations: [_slide_component__WEBPACK_IMPORTED_MODULE_3__["SlideComponent"], _carousel_component__WEBPACK_IMPORTED_MODULE_2__["CarouselComponent"]],
                    exports: [_slide_component__WEBPACK_IMPORTED_MODULE_3__["SlideComponent"], _carousel_component__WEBPACK_IMPORTED_MODULE_2__["CarouselComponent"]],
                    providers: [_carousel_config__WEBPACK_IMPORTED_MODULE_4__["CarouselConfig"]]
                },] },
    ];
    return CarouselModule;
}());

//# sourceMappingURL=carousel.module.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/carousel/index.js":
/*!******************************************************!*\
  !*** ./node_modules/ngx-bootstrap/carousel/index.js ***!
  \******************************************************/
/*! exports provided: CarouselComponent, CarouselModule, SlideComponent, CarouselConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _carousel_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./carousel.component */ "./node_modules/ngx-bootstrap/carousel/carousel.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CarouselComponent", function() { return _carousel_component__WEBPACK_IMPORTED_MODULE_0__["CarouselComponent"]; });

/* harmony import */ var _carousel_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./carousel.module */ "./node_modules/ngx-bootstrap/carousel/carousel.module.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CarouselModule", function() { return _carousel_module__WEBPACK_IMPORTED_MODULE_1__["CarouselModule"]; });

/* harmony import */ var _slide_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slide.component */ "./node_modules/ngx-bootstrap/carousel/slide.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SlideComponent", function() { return _slide_component__WEBPACK_IMPORTED_MODULE_2__["SlideComponent"]; });

/* harmony import */ var _carousel_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./carousel.config */ "./node_modules/ngx-bootstrap/carousel/carousel.config.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CarouselConfig", function() { return _carousel_config__WEBPACK_IMPORTED_MODULE_3__["CarouselConfig"]; });





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/carousel/slide.component.js":
/*!****************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/carousel/slide.component.js ***!
  \****************************************************************/
/*! exports provided: SlideComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlideComponent", function() { return SlideComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _carousel_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./carousel.component */ "./node_modules/ngx-bootstrap/carousel/carousel.component.js");


var SlideComponent = /** @class */ (function () {
    function SlideComponent(carousel) {
        /** Wraps element by appropriate CSS classes */
        this.addClass = true;
        this.carousel = carousel;
    }
    /** Fires changes in container collection after adding a new slide instance */
    /** Fires changes in container collection after adding a new slide instance */
    SlideComponent.prototype.ngOnInit = /** Fires changes in container collection after adding a new slide instance */
    function () {
        this.carousel.addSlide(this);
    };
    /** Fires changes in container collection after removing of this slide instance */
    /** Fires changes in container collection after removing of this slide instance */
    SlideComponent.prototype.ngOnDestroy = /** Fires changes in container collection after removing of this slide instance */
    function () {
        this.carousel.removeSlide(this);
    };
    SlideComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'slide',
                    template: "\n    <div [class.active]=\"active\" class=\"item\">\n      <ng-content></ng-content>\n    </div>\n  ",
                    host: {
                        '[attr.aria-hidden]': '!active'
                    }
                },] },
    ];
    /** @nocollapse */
    SlideComponent.ctorParameters = function () { return [
        { type: _carousel_component__WEBPACK_IMPORTED_MODULE_1__["CarouselComponent"], },
    ]; };
    SlideComponent.propDecorators = {
        "active": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['class.active',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "addClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['class.item',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['class.carousel-item',] },],
    };
    return SlideComponent;
}());

//# sourceMappingURL=slide.component.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/collapse/collapse.directive.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/collapse/collapse.directive.js ***!
  \*******************************************************************/
/*! exports provided: CollapseDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollapseDirective", function() { return CollapseDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

var CollapseDirective = /** @class */ (function () {
    function CollapseDirective(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        /** This event fires as soon as content collapses */
        this.collapsed = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /** This event fires as soon as content becomes visible */
        this.expanded = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        // shown
        this.isExpanded = true;
        // hidden
        this.isCollapsed = false;
        // stale state
        this.isCollapse = true;
        // animation state
        this.isCollapsing = false;
    }
    Object.defineProperty(CollapseDirective.prototype, "collapse", {
        get: function () {
            return this.isExpanded;
        },
        set: /** A flag indicating visibility of content (shown or hidden) */
        function (value) {
            this.isExpanded = value;
            this.toggle();
        },
        enumerable: true,
        configurable: true
    });
    /** allows to manually toggle content visibility */
    /** allows to manually toggle content visibility */
    CollapseDirective.prototype.toggle = /** allows to manually toggle content visibility */
    function () {
        if (this.isExpanded) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    /** allows to manually hide content */
    /** allows to manually hide content */
    CollapseDirective.prototype.hide = /** allows to manually hide content */
    function () {
        this.isCollapse = false;
        this.isCollapsing = true;
        this.isExpanded = false;
        this.isCollapsed = true;
        this.isCollapse = true;
        this.isCollapsing = false;
        this.display = 'none';
        this.collapsed.emit(this);
    };
    /** allows to manually show collapsed content */
    /** allows to manually show collapsed content */
    CollapseDirective.prototype.show = /** allows to manually show collapsed content */
    function () {
        this.isCollapse = false;
        this.isCollapsing = true;
        this.isExpanded = true;
        this.isCollapsed = false;
        this.display = 'block';
        // this.height = 'auto';
        this.isCollapse = true;
        this.isCollapsing = false;
        this._renderer.setStyle(this._el.nativeElement, 'overflow', 'visible');
        this._renderer.setStyle(this._el.nativeElement, 'height', 'auto');
        this.expanded.emit(this);
    };
    CollapseDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: '[collapse]',
                    exportAs: 'bs-collapse',
                    host: {
                        '[class.collapse]': 'true'
                    }
                },] },
    ];
    /** @nocollapse */
    CollapseDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"], },
    ]; };
    CollapseDirective.propDecorators = {
        "collapsed": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "expanded": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "display": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['style.display',] },],
        "isExpanded": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['class.in',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['class.show',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['attr.aria-expanded',] },],
        "isCollapsed": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['attr.aria-hidden',] },],
        "isCollapse": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['class.collapse',] },],
        "isCollapsing": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['class.collapsing',] },],
        "collapse": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    };
    return CollapseDirective;
}());

//# sourceMappingURL=collapse.directive.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/collapse/collapse.module.js":
/*!****************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/collapse/collapse.module.js ***!
  \****************************************************************/
/*! exports provided: CollapseModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollapseModule", function() { return CollapseModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _collapse_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collapse.directive */ "./node_modules/ngx-bootstrap/collapse/collapse.directive.js");


var CollapseModule = /** @class */ (function () {
    function CollapseModule() {
    }
    CollapseModule.forRoot = function () {
        return { ngModule: CollapseModule, providers: [] };
    };
    CollapseModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    declarations: [_collapse_directive__WEBPACK_IMPORTED_MODULE_1__["CollapseDirective"]],
                    exports: [_collapse_directive__WEBPACK_IMPORTED_MODULE_1__["CollapseDirective"]]
                },] },
    ];
    return CollapseModule;
}());

//# sourceMappingURL=collapse.module.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/collapse/index.js":
/*!******************************************************!*\
  !*** ./node_modules/ngx-bootstrap/collapse/index.js ***!
  \******************************************************/
/*! exports provided: CollapseDirective, CollapseModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _collapse_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./collapse.directive */ "./node_modules/ngx-bootstrap/collapse/collapse.directive.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CollapseDirective", function() { return _collapse_directive__WEBPACK_IMPORTED_MODULE_0__["CollapseDirective"]; });

/* harmony import */ var _collapse_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collapse.module */ "./node_modules/ngx-bootstrap/collapse/collapse.module.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CollapseModule", function() { return _collapse_module__WEBPACK_IMPORTED_MODULE_1__["CollapseModule"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/pagination/index.js":
/*!********************************************************!*\
  !*** ./node_modules/ngx-bootstrap/pagination/index.js ***!
  \********************************************************/
/*! exports provided: PagerComponent, PaginationComponent, PaginationModule, PaginationConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pager_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pager.component */ "./node_modules/ngx-bootstrap/pagination/pager.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PagerComponent", function() { return _pager_component__WEBPACK_IMPORTED_MODULE_0__["PagerComponent"]; });

/* harmony import */ var _pagination_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pagination.component */ "./node_modules/ngx-bootstrap/pagination/pagination.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PaginationComponent", function() { return _pagination_component__WEBPACK_IMPORTED_MODULE_1__["PaginationComponent"]; });

/* harmony import */ var _pagination_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pagination.module */ "./node_modules/ngx-bootstrap/pagination/pagination.module.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PaginationModule", function() { return _pagination_module__WEBPACK_IMPORTED_MODULE_2__["PaginationModule"]; });

/* harmony import */ var _pagination_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pagination.config */ "./node_modules/ngx-bootstrap/pagination/pagination.config.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PaginationConfig", function() { return _pagination_config__WEBPACK_IMPORTED_MODULE_3__["PaginationConfig"]; });





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/pagination/pager.component.js":
/*!******************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/pagination/pager.component.js ***!
  \******************************************************************/
/*! exports provided: PAGER_CONTROL_VALUE_ACCESSOR, PagerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAGER_CONTROL_VALUE_ACCESSOR", function() { return PAGER_CONTROL_VALUE_ACCESSOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagerComponent", function() { return PagerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _pagination_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pagination.config */ "./node_modules/ngx-bootstrap/pagination/pagination.config.js");



var PAGER_CONTROL_VALUE_ACCESSOR = {
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
    // tslint:disable-next-line
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return PagerComponent; }),
    multi: true
};
var PagerComponent = /** @class */ (function () {
    function PagerComponent(renderer, elementRef, paginationConfig, changeDetection) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.changeDetection = changeDetection;
        /** fired when total pages count changes, $event:number equals to total pages count */
        this.numPages = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /** fired when page was changed, $event:{page, itemsPerPage} equals to
           * object with current page index and number of items per page
           */
        this.pageChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.inited = false;
        this._page = 1;
        this.renderer = renderer;
        this.elementRef = elementRef;
        if (!this.config) {
            this.configureOptions(Object.assign({}, paginationConfig.main, paginationConfig.pager));
        }
    }
    Object.defineProperty(PagerComponent.prototype, "itemsPerPage", {
        get: /** maximum number of items per page. If value less than 1 will display all items on one page */
        function () {
            return this._itemsPerPage;
        },
        set: function (v) {
            this._itemsPerPage = v;
            this.totalPages = this.calculateTotalPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerComponent.prototype, "totalItems", {
        get: /** total number of items in all pages */
        function () {
            return this._totalItems;
        },
        set: function (v) {
            this._totalItems = v;
            this.totalPages = this.calculateTotalPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerComponent.prototype, "totalPages", {
        get: function () {
            return this._totalPages;
        },
        set: function (v) {
            this._totalPages = v;
            this.numPages.emit(v);
            if (this.inited) {
                this.selectPage(this.page);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerComponent.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (value) {
            var _previous = this._page;
            this._page = value > this.totalPages ? this.totalPages : value || 1;
            this.changeDetection.markForCheck();
            if (_previous === this._page || typeof _previous === 'undefined') {
                return;
            }
            this.pageChanged.emit({
                page: this._page,
                itemsPerPage: this.itemsPerPage
            });
        },
        enumerable: true,
        configurable: true
    });
    PagerComponent.prototype.configureOptions = function (config) {
        this.config = Object.assign({}, config);
    };
    PagerComponent.prototype.ngOnInit = function () {
        if (typeof window !== 'undefined') {
            this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
        }
        // watch for maxSize
        this.maxSize =
            typeof this.maxSize !== 'undefined' ? this.maxSize : this.config.maxSize;
        this.rotate =
            typeof this.rotate !== 'undefined' ? this.rotate : this.config.rotate;
        this.boundaryLinks =
            typeof this.boundaryLinks !== 'undefined'
                ? this.boundaryLinks
                : this.config.boundaryLinks;
        this.directionLinks =
            typeof this.directionLinks !== 'undefined'
                ? this.directionLinks
                : this.config.directionLinks;
        this.pageBtnClass =
            typeof this.pageBtnClass !== 'undefined'
                ? this.pageBtnClass
                : this.config.pageBtnClass;
        // base class
        this.itemsPerPage =
            typeof this.itemsPerPage !== 'undefined'
                ? this.itemsPerPage
                : this.config.itemsPerPage;
        this.totalPages = this.calculateTotalPages();
        // this class
        this.pages = this.getPages(this.page, this.totalPages);
        this.inited = true;
    };
    PagerComponent.prototype.writeValue = function (value) {
        this.page = value;
        this.pages = this.getPages(this.page, this.totalPages);
    };
    PagerComponent.prototype.getText = function (key) {
        return this[key + "Text"] || this.config[key + "Text"];
    };
    PagerComponent.prototype.noPrevious = function () {
        return this.page === 1;
    };
    PagerComponent.prototype.noNext = function () {
        return this.page === this.totalPages;
    };
    PagerComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    PagerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    PagerComponent.prototype.selectPage = function (page, event) {
        if (event) {
            event.preventDefault();
        }
        if (!this.disabled) {
            if (event && event.target) {
                var target = event.target;
                target.blur();
            }
            this.writeValue(page);
            this.onChange(this.page);
        }
    };
    // Create page object used in template
    // Create page object used in template
    PagerComponent.prototype.makePage = 
    // Create page object used in template
    function (num, text, active) {
        return { text: text, number: num, active: active };
    };
    PagerComponent.prototype.getPages = function (currentPage, totalPages) {
        var pages = [];
        // Default page limits
        var startPage = 1;
        var endPage = totalPages;
        var isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
        // recompute if maxSize
        if (isMaxSized) {
            if (this.rotate) {
                // Current page is displayed in the middle of the visible ones
                startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
                endPage = startPage + this.maxSize - 1;
                // Adjust if limit is exceeded
                if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = endPage - this.maxSize + 1;
                }
            }
            else {
                // Visible pages are paginated with maxSize
                startPage =
                    (Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize + 1;
                // Adjust last page if limit is exceeded
                endPage = Math.min(startPage + this.maxSize - 1, totalPages);
            }
        }
        // Add page number links
        for (var num = startPage; num <= endPage; num++) {
            var page = this.makePage(num, num.toString(), num === currentPage);
            pages.push(page);
        }
        // Add links to move between page sets
        if (isMaxSized && !this.rotate) {
            if (startPage > 1) {
                var previousPageSet = this.makePage(startPage - 1, '...', false);
                pages.unshift(previousPageSet);
            }
            if (endPage < totalPages) {
                var nextPageSet = this.makePage(endPage + 1, '...', false);
                pages.push(nextPageSet);
            }
        }
        return pages;
    };
    // base class
    // base class
    PagerComponent.prototype.calculateTotalPages = 
    // base class
    function () {
        var totalPages = this.itemsPerPage < 1
            ? 1
            : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    };
    PagerComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'pager',
                    template: "<ul class=\"pager\"> <li [class.disabled]=\"noPrevious()\" [class.previous]=\"align\" [ngClass]=\"{'pull-right': align, 'float-right': align}\" class=\"{{ pageBtnClass }}\"> <a href (click)=\"selectPage(page - 1, $event)\">{{ getText('previous') }}</a> </li> <li [class.disabled]=\"noNext()\" [class.next]=\"align\" [ngClass]=\"{'pull-right': align, 'float-right': align}\" class=\"{{ pageBtnClass }}\"> <a href (click)=\"selectPage(page + 1, $event)\">{{ getText('next') }}</a> </li> </ul> ",
                    providers: [PAGER_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    PagerComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], },
        { type: _pagination_config__WEBPACK_IMPORTED_MODULE_2__["PaginationConfig"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"], },
    ]; };
    PagerComponent.propDecorators = {
        "align": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "maxSize": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "boundaryLinks": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "directionLinks": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "firstText": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "previousText": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "nextText": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "lastText": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "rotate": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "pageBtnClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "disabled": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "numPages": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "pageChanged": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "itemsPerPage": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "totalItems": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    };
    return PagerComponent;
}());

//# sourceMappingURL=pager.component.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/pagination/pagination.component.js":
/*!***********************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/pagination/pagination.component.js ***!
  \***********************************************************************/
/*! exports provided: PAGINATION_CONTROL_VALUE_ACCESSOR, PaginationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAGINATION_CONTROL_VALUE_ACCESSOR", function() { return PAGINATION_CONTROL_VALUE_ACCESSOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginationComponent", function() { return PaginationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _pagination_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pagination.config */ "./node_modules/ngx-bootstrap/pagination/pagination.config.js");



var PAGINATION_CONTROL_VALUE_ACCESSOR = {
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
    // tslint:disable-next-line
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return PaginationComponent; }),
    multi: true
};
var PaginationComponent = /** @class */ (function () {
    function PaginationComponent(renderer, elementRef, paginationConfig, changeDetection) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.changeDetection = changeDetection;
        /** fired when total pages count changes, $event:number equals to total pages count */
        this.numPages = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /** fired when page was changed, $event:{page, itemsPerPage} equals to object
           * with current page index and number of items per page
           */
        this.pageChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.inited = false;
        this._page = 1;
        this.renderer = renderer;
        this.elementRef = elementRef;
        if (!this.config) {
            this.configureOptions(paginationConfig.main);
        }
    }
    Object.defineProperty(PaginationComponent.prototype, "itemsPerPage", {
        get: /** maximum number of items per page. If value less than 1 will display all items on one page */
        function () {
            return this._itemsPerPage;
        },
        set: function (v) {
            this._itemsPerPage = v;
            this.totalPages = this.calculateTotalPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "totalItems", {
        get: /** total number of items in all pages */
        function () {
            return this._totalItems;
        },
        set: function (v) {
            this._totalItems = v;
            this.totalPages = this.calculateTotalPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "totalPages", {
        get: function () {
            return this._totalPages;
        },
        set: function (v) {
            this._totalPages = v;
            this.numPages.emit(v);
            if (this.inited) {
                this.selectPage(this.page);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (value) {
            var _previous = this._page;
            this._page = value > this.totalPages ? this.totalPages : value || 1;
            this.changeDetection.markForCheck();
            if (_previous === this._page || typeof _previous === 'undefined') {
                return;
            }
            this.pageChanged.emit({
                page: this._page,
                itemsPerPage: this.itemsPerPage
            });
        },
        enumerable: true,
        configurable: true
    });
    PaginationComponent.prototype.configureOptions = function (config) {
        this.config = Object.assign({}, config);
    };
    PaginationComponent.prototype.ngOnInit = function () {
        if (typeof window !== 'undefined') {
            this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
        }
        // watch for maxSize
        this.maxSize =
            typeof this.maxSize !== 'undefined' ? this.maxSize : this.config.maxSize;
        this.rotate =
            typeof this.rotate !== 'undefined' ? this.rotate : this.config.rotate;
        this.boundaryLinks =
            typeof this.boundaryLinks !== 'undefined'
                ? this.boundaryLinks
                : this.config.boundaryLinks;
        this.directionLinks =
            typeof this.directionLinks !== 'undefined'
                ? this.directionLinks
                : this.config.directionLinks;
        this.pageBtnClass =
            typeof this.pageBtnClass !== 'undefined'
                ? this.pageBtnClass
                : this.config.pageBtnClass;
        // base class
        this.itemsPerPage =
            typeof this.itemsPerPage !== 'undefined'
                ? this.itemsPerPage
                : this.config.itemsPerPage;
        this.totalPages = this.calculateTotalPages();
        // this class
        this.pages = this.getPages(this.page, this.totalPages);
        this.inited = true;
    };
    PaginationComponent.prototype.writeValue = function (value) {
        this.page = value;
        this.pages = this.getPages(this.page, this.totalPages);
    };
    PaginationComponent.prototype.getText = function (key) {
        return this[key + "Text"] || this.config[key + "Text"];
    };
    PaginationComponent.prototype.noPrevious = function () {
        return this.page === 1;
    };
    PaginationComponent.prototype.noNext = function () {
        return this.page === this.totalPages;
    };
    PaginationComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    PaginationComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    PaginationComponent.prototype.selectPage = function (page, event) {
        if (event) {
            event.preventDefault();
        }
        if (!this.disabled) {
            if (event && event.target) {
                var target = event.target;
                target.blur();
            }
            this.writeValue(page);
            this.onChange(this.page);
        }
    };
    // Create page object used in template
    // Create page object used in template
    PaginationComponent.prototype.makePage = 
    // Create page object used in template
    function (num, text, active) {
        return { text: text, number: num, active: active };
    };
    PaginationComponent.prototype.getPages = function (currentPage, totalPages) {
        var pages = [];
        // Default page limits
        var startPage = 1;
        var endPage = totalPages;
        var isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
        // recompute if maxSize
        if (isMaxSized) {
            if (this.rotate) {
                // Current page is displayed in the middle of the visible ones
                startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
                endPage = startPage + this.maxSize - 1;
                // Adjust if limit is exceeded
                if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = endPage - this.maxSize + 1;
                }
            }
            else {
                // Visible pages are paginated with maxSize
                startPage =
                    (Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize + 1;
                // Adjust last page if limit is exceeded
                endPage = Math.min(startPage + this.maxSize - 1, totalPages);
            }
        }
        // Add page number links
        for (var num = startPage; num <= endPage; num++) {
            var page = this.makePage(num, num.toString(), num === currentPage);
            pages.push(page);
        }
        // Add links to move between page sets
        if (isMaxSized && !this.rotate) {
            if (startPage > 1) {
                var previousPageSet = this.makePage(startPage - 1, '...', false);
                pages.unshift(previousPageSet);
            }
            if (endPage < totalPages) {
                var nextPageSet = this.makePage(endPage + 1, '...', false);
                pages.push(nextPageSet);
            }
        }
        return pages;
    };
    // base class
    // base class
    PaginationComponent.prototype.calculateTotalPages = 
    // base class
    function () {
        var totalPages = this.itemsPerPage < 1
            ? 1
            : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    };
    PaginationComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'pagination',
                    template: "<ul class=\"pagination\" [ngClass]=\"classMap\"> <li class=\"pagination-first page-item\" *ngIf=\"boundaryLinks\" [class.disabled]=\"noPrevious()||disabled\"> <a class=\"page-link\" href (click)=\"selectPage(1, $event)\" [innerHTML]=\"getText('first')\"></a> </li> <li class=\"pagination-prev page-item\" *ngIf=\"directionLinks\" [class.disabled]=\"noPrevious()||disabled\"> <a class=\"page-link\" href (click)=\"selectPage(page - 1, $event)\" [innerHTML]=\"getText('previous')\"></a> </li> <li *ngFor=\"let pg of pages\" [class.active]=\"pg.active\" [class.disabled]=\"disabled&&!pg.active\" class=\"pagination-page page-item\"> <a class=\"page-link\" href (click)=\"selectPage(pg.number, $event)\" [innerHTML]=\"pg.text\"></a> </li> <li class=\"pagination-next page-item\" *ngIf=\"directionLinks\" [class.disabled]=\"noNext()||disabled\"> <a class=\"page-link\" href (click)=\"selectPage(page + 1, $event)\" [innerHTML]=\"getText('next')\"></a></li> <li class=\"pagination-last page-item\" *ngIf=\"boundaryLinks\" [class.disabled]=\"noNext()||disabled\"> <a class=\"page-link\" href (click)=\"selectPage(totalPages, $event)\" [innerHTML]=\"getText('last')\"></a></li> </ul> ",
                    providers: [PAGINATION_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    PaginationComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], },
        { type: _pagination_config__WEBPACK_IMPORTED_MODULE_2__["PaginationConfig"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"], },
    ]; };
    PaginationComponent.propDecorators = {
        "align": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "maxSize": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "boundaryLinks": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "directionLinks": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "firstText": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "previousText": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "nextText": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "lastText": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "rotate": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "pageBtnClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "disabled": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "numPages": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "pageChanged": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "itemsPerPage": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "totalItems": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    };
    return PaginationComponent;
}());

//# sourceMappingURL=pagination.component.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/pagination/pagination.config.js":
/*!********************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/pagination/pagination.config.js ***!
  \********************************************************************/
/*! exports provided: PaginationConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginationConfig", function() { return PaginationConfig; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

/** Provides default values for Pagination and pager components */
var PaginationConfig = /** @class */ (function () {
    function PaginationConfig() {
        this.main = {
            maxSize: void 0,
            itemsPerPage: 10,
            boundaryLinks: false,
            directionLinks: true,
            firstText: 'First',
            previousText: 'Previous',
            nextText: 'Next',
            lastText: 'Last',
            pageBtnClass: '',
            rotate: true
        };
        this.pager = {
            itemsPerPage: 15,
            previousText: '« Previous',
            nextText: 'Next »',
            pageBtnClass: '',
            align: true
        };
    }
    PaginationConfig.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
    ];
    return PaginationConfig;
}());

//# sourceMappingURL=pagination.config.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/pagination/pagination.module.js":
/*!********************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/pagination/pagination.module.js ***!
  \********************************************************************/
/*! exports provided: PaginationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginationModule", function() { return PaginationModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _pagination_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pagination.config */ "./node_modules/ngx-bootstrap/pagination/pagination.config.js");
/* harmony import */ var _pager_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pager.component */ "./node_modules/ngx-bootstrap/pagination/pager.component.js");
/* harmony import */ var _pagination_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pagination.component */ "./node_modules/ngx-bootstrap/pagination/pagination.component.js");





var PaginationModule = /** @class */ (function () {
    function PaginationModule() {
    }
    PaginationModule.forRoot = function () {
        return { ngModule: PaginationModule, providers: [_pagination_config__WEBPACK_IMPORTED_MODULE_2__["PaginationConfig"]] };
    };
    PaginationModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]],
                    declarations: [_pager_component__WEBPACK_IMPORTED_MODULE_3__["PagerComponent"], _pagination_component__WEBPACK_IMPORTED_MODULE_4__["PaginationComponent"]],
                    exports: [_pager_component__WEBPACK_IMPORTED_MODULE_3__["PagerComponent"], _pagination_component__WEBPACK_IMPORTED_MODULE_4__["PaginationComponent"]]
                },] },
    ];
    return PaginationModule;
}());

//# sourceMappingURL=pagination.module.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/popover/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/ngx-bootstrap/popover/index.js ***!
  \*****************************************************/
/*! exports provided: PopoverDirective, PopoverModule, PopoverConfig, PopoverContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _popover_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popover.directive */ "./node_modules/ngx-bootstrap/popover/popover.directive.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PopoverDirective", function() { return _popover_directive__WEBPACK_IMPORTED_MODULE_0__["PopoverDirective"]; });

/* harmony import */ var _popover_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popover.module */ "./node_modules/ngx-bootstrap/popover/popover.module.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PopoverModule", function() { return _popover_module__WEBPACK_IMPORTED_MODULE_1__["PopoverModule"]; });

/* harmony import */ var _popover_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./popover.config */ "./node_modules/ngx-bootstrap/popover/popover.config.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PopoverConfig", function() { return _popover_config__WEBPACK_IMPORTED_MODULE_2__["PopoverConfig"]; });

/* harmony import */ var _popover_container_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./popover-container.component */ "./node_modules/ngx-bootstrap/popover/popover-container.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PopoverContainerComponent", function() { return _popover_container_component__WEBPACK_IMPORTED_MODULE_3__["PopoverContainerComponent"]; });





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/popover/popover-container.component.js":
/*!***************************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/popover/popover-container.component.js ***!
  \***************************************************************************/
/*! exports provided: PopoverContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopoverContainerComponent", function() { return PopoverContainerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _popover_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popover.config */ "./node_modules/ngx-bootstrap/popover/popover.config.js");
/* harmony import */ var _utils_theme_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/theme-provider */ "./node_modules/ngx-bootstrap/utils/theme-provider.js");



var PopoverContainerComponent = /** @class */ (function () {
    function PopoverContainerComponent(config) {
        Object.assign(this, config);
    }
    Object.defineProperty(PopoverContainerComponent.prototype, "isBs3", {
        get: function () {
            return Object(_utils_theme_provider__WEBPACK_IMPORTED_MODULE_2__["isBs3"])();
        },
        enumerable: true,
        configurable: true
    });
    PopoverContainerComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'popover-container',
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
                    // tslint:disable-next-line
                    host: {
                        '[class]': '"popover in popover-" + placement + " " + "bs-popover-" + placement + " " + placement + " " + containerClass',
                        '[class.show]': '!isBs3',
                        role: 'tooltip',
                        style: 'display:block;'
                    },
                    styles: [
                        "\n    :host.bs-popover-top .arrow, :host.bs-popover-bottom .arrow {\n      left: 50%;\n      margin-left: -8px;\n    }\n    :host.bs-popover-left .arrow, :host.bs-popover-right .arrow {\n      top: 50%;\n      margin-top: -8px;\n    }\n  "
                    ],
                    template: "<div class=\"popover-arrow arrow\"></div> <h3 class=\"popover-title popover-header\" *ngIf=\"title\">{{ title }}</h3> <div class=\"popover-content popover-body\"> <ng-content></ng-content> </div> "
                },] },
    ];
    /** @nocollapse */
    PopoverContainerComponent.ctorParameters = function () { return [
        { type: _popover_config__WEBPACK_IMPORTED_MODULE_1__["PopoverConfig"], },
    ]; };
    PopoverContainerComponent.propDecorators = {
        "placement": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "title": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    };
    return PopoverContainerComponent;
}());

//# sourceMappingURL=popover-container.component.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/popover/popover.config.js":
/*!**************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/popover/popover.config.js ***!
  \**************************************************************/
/*! exports provided: PopoverConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopoverConfig", function() { return PopoverConfig; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

/**
 * Configuration service for the Popover directive.
 * You can inject this service, typically in your root component, and customize
 * the values of its properties in order to provide default values for all the
 * popovers used in the application.
 */
var PopoverConfig = /** @class */ (function () {
    function PopoverConfig() {
        /**
           * Placement of a popover. Accepts: "top", "bottom", "left", "right", "auto"
           */
        this.placement = 'top';
        /**
           * Specifies events that should trigger. Supports a space separated list of
           * event names.
           */
        this.triggers = 'click';
        this.outsideClick = false;
    }
    PopoverConfig.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
    ];
    return PopoverConfig;
}());

//# sourceMappingURL=popover.config.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/popover/popover.directive.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/popover/popover.directive.js ***!
  \*****************************************************************/
/*! exports provided: PopoverDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopoverDirective", function() { return PopoverDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _popover_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popover.config */ "./node_modules/ngx-bootstrap/popover/popover.config.js");
/* harmony import */ var _component_loader_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../component-loader/index */ "./node_modules/ngx-bootstrap/component-loader/index.js");
/* harmony import */ var _popover_container_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./popover-container.component */ "./node_modules/ngx-bootstrap/popover/popover-container.component.js");




/**
 * A lightweight, extensible directive for fancy popover creation.
 */
var PopoverDirective = /** @class */ (function () {
    function PopoverDirective(_elementRef, _renderer, _viewContainerRef, _config, cis) {
        /**
           * Close popover on outside click
           */
        this.outsideClick = false;
        /**
           * Css class for popover container
           */
        this.containerClass = '';
        this._isInited = false;
        this._popover = cis
            .createLoader(_elementRef, _viewContainerRef, _renderer)
            .provide({ provide: _popover_config__WEBPACK_IMPORTED_MODULE_1__["PopoverConfig"], useValue: _config });
        Object.assign(this, _config);
        this.onShown = this._popover.onShown;
        this.onHidden = this._popover.onHidden;
        // fix: no focus on button on Mac OS #1795
        if (typeof window !== 'undefined') {
            _elementRef.nativeElement.addEventListener('click', function () {
                try {
                    _elementRef.nativeElement.focus();
                }
                catch (err) {
                    return;
                }
            });
        }
    }
    Object.defineProperty(PopoverDirective.prototype, "isOpen", {
        get: /**
           * Returns whether or not the popover is currently being shown
           */
        function () {
            return this._popover.isShown;
        },
        set: function (value) {
            if (value) {
                this.show();
            }
            else {
                this.hide();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    /**
       * Opens an element’s popover. This is considered a “manual” triggering of
       * the popover.
       */
    PopoverDirective.prototype.show = /**
       * Opens an element’s popover. This is considered a “manual” triggering of
       * the popover.
       */
    function () {
        if (this._popover.isShown || !this.popover) {
            return;
        }
        this._popover
            .attach(_popover_container_component__WEBPACK_IMPORTED_MODULE_3__["PopoverContainerComponent"])
            .to(this.container)
            .position({ attachment: this.placement })
            .show({
            content: this.popover,
            context: this.popoverContext,
            placement: this.placement,
            title: this.popoverTitle,
            containerClass: this.containerClass
        });
        this.isOpen = true;
    };
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    /**
       * Closes an element’s popover. This is considered a “manual” triggering of
       * the popover.
       */
    PopoverDirective.prototype.hide = /**
       * Closes an element’s popover. This is considered a “manual” triggering of
       * the popover.
       */
    function () {
        if (this.isOpen) {
            this._popover.hide();
            this.isOpen = false;
        }
    };
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    /**
       * Toggles an element’s popover. This is considered a “manual” triggering of
       * the popover.
       */
    PopoverDirective.prototype.toggle = /**
       * Toggles an element’s popover. This is considered a “manual” triggering of
       * the popover.
       */
    function () {
        if (this.isOpen) {
            return this.hide();
        }
        this.show();
    };
    PopoverDirective.prototype.ngOnInit = function () {
        var _this = this;
        // fix: seems there are an issue with `routerLinkActive`
        // which result in duplicated call ngOnInit without call to ngOnDestroy
        // read more: https://github.com/valor-software/ngx-bootstrap/issues/1885
        if (this._isInited) {
            return;
        }
        this._isInited = true;
        this._popover.listen({
            triggers: this.triggers,
            outsideClick: this.outsideClick,
            show: function () { return _this.show(); }
        });
    };
    PopoverDirective.prototype.ngOnDestroy = function () {
        this._popover.dispose();
    };
    PopoverDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{ selector: '[popover]', exportAs: 'bs-popover' },] },
    ];
    /** @nocollapse */
    PopoverDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], },
        { type: _popover_config__WEBPACK_IMPORTED_MODULE_1__["PopoverConfig"], },
        { type: _component_loader_index__WEBPACK_IMPORTED_MODULE_2__["ComponentLoaderFactory"], },
    ]; };
    PopoverDirective.propDecorators = {
        "popover": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "popoverContext": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "popoverTitle": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "placement": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "outsideClick": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "triggers": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "container": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "containerClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "isOpen": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "onShown": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "onHidden": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    };
    return PopoverDirective;
}());

//# sourceMappingURL=popover.directive.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/popover/popover.module.js":
/*!**************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/popover/popover.module.js ***!
  \**************************************************************/
/*! exports provided: PopoverModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopoverModule", function() { return PopoverModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _component_loader_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../component-loader/index */ "./node_modules/ngx-bootstrap/component-loader/index.js");
/* harmony import */ var _positioning_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../positioning/index */ "./node_modules/ngx-bootstrap/positioning/index.js");
/* harmony import */ var _popover_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./popover.config */ "./node_modules/ngx-bootstrap/popover/popover.config.js");
/* harmony import */ var _popover_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./popover.directive */ "./node_modules/ngx-bootstrap/popover/popover.directive.js");
/* harmony import */ var _popover_container_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./popover-container.component */ "./node_modules/ngx-bootstrap/popover/popover-container.component.js");







var PopoverModule = /** @class */ (function () {
    function PopoverModule() {
    }
    PopoverModule.forRoot = function () {
        return {
            ngModule: PopoverModule,
            providers: [_popover_config__WEBPACK_IMPORTED_MODULE_4__["PopoverConfig"], _component_loader_index__WEBPACK_IMPORTED_MODULE_2__["ComponentLoaderFactory"], _positioning_index__WEBPACK_IMPORTED_MODULE_3__["PositioningService"]]
        };
    };
    PopoverModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]],
                    declarations: [_popover_directive__WEBPACK_IMPORTED_MODULE_5__["PopoverDirective"], _popover_container_component__WEBPACK_IMPORTED_MODULE_6__["PopoverContainerComponent"]],
                    exports: [_popover_directive__WEBPACK_IMPORTED_MODULE_5__["PopoverDirective"]],
                    entryComponents: [_popover_container_component__WEBPACK_IMPORTED_MODULE_6__["PopoverContainerComponent"]]
                },] },
    ];
    return PopoverModule;
}());

//# sourceMappingURL=popover.module.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/progressbar/bar.component.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/progressbar/bar.component.js ***!
  \*****************************************************************/
/*! exports provided: BarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarComponent", function() { return BarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _progressbar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./progressbar.component */ "./node_modules/ngx-bootstrap/progressbar/progressbar.component.js");
/* harmony import */ var _utils_theme_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/theme-provider */ "./node_modules/ngx-bootstrap/utils/theme-provider.js");



// todo: number pipe
// todo: use query from progress?
var BarComponent = /** @class */ (function () {
    function BarComponent(progress) {
        this.percent = 0;
        this.progress = progress;
    }
    Object.defineProperty(BarComponent.prototype, "value", {
        get: /** current value of progress bar */
        function () {
            return this._value;
        },
        set: function (v) {
            if (!v && v !== 0) {
                return;
            }
            this._value = v;
            this.recalculatePercentage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarComponent.prototype, "setBarWidth", {
        get: function () {
            this.recalculatePercentage();
            return this.percent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarComponent.prototype, "isBs3", {
        get: function () {
            return Object(_utils_theme_provider__WEBPACK_IMPORTED_MODULE_2__["isBs3"])();
        },
        enumerable: true,
        configurable: true
    });
    BarComponent.prototype.ngOnInit = function () {
        this.progress.addBar(this);
    };
    BarComponent.prototype.ngOnDestroy = function () {
        this.progress.removeBar(this);
    };
    BarComponent.prototype.recalculatePercentage = function () {
        this.percent = +(this.value / this.progress.max * 100).toFixed(2);
        var totalPercentage = this.progress.bars
            .reduce(function (total, bar) {
            return total + bar.percent;
        }, 0);
        if (totalPercentage > 100) {
            this.percent -= totalPercentage - 100;
        }
    };
    BarComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'bar',
                    template: "<ng-content></ng-content> ",
                    host: {
                        role: 'progressbar',
                        'aria-valuemin': '0',
                        '[class]': '"progress-bar " + (type ? "progress-bar-" + type + " bg-" + type : "")',
                        '[class.progress-bar-animated]': '!isBs3 && animate',
                        '[class.progress-bar-striped]': 'striped',
                        '[class.active]': 'isBs3 && animate',
                        '[attr.aria-valuenow]': 'value',
                        '[attr.aria-valuetext]': 'percent ? percent.toFixed(0) + "%" : ""',
                        '[attr.aria-valuemax]': 'max',
                        '[style.height.%]': '"100"'
                    }
                },] },
    ];
    /** @nocollapse */
    BarComponent.ctorParameters = function () { return [
        { type: _progressbar_component__WEBPACK_IMPORTED_MODULE_1__["ProgressbarComponent"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Host"] },] },
    ]; };
    BarComponent.propDecorators = {
        "type": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "value": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "setBarWidth": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['style.width.%',] },],
    };
    return BarComponent;
}());

//# sourceMappingURL=bar.component.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/progressbar/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/ngx-bootstrap/progressbar/index.js ***!
  \*********************************************************/
/*! exports provided: BarComponent, ProgressbarComponent, ProgressbarModule, ProgressbarConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bar.component */ "./node_modules/ngx-bootstrap/progressbar/bar.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BarComponent", function() { return _bar_component__WEBPACK_IMPORTED_MODULE_0__["BarComponent"]; });

/* harmony import */ var _progressbar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./progressbar.component */ "./node_modules/ngx-bootstrap/progressbar/progressbar.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProgressbarComponent", function() { return _progressbar_component__WEBPACK_IMPORTED_MODULE_1__["ProgressbarComponent"]; });

/* harmony import */ var _progressbar_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./progressbar.module */ "./node_modules/ngx-bootstrap/progressbar/progressbar.module.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProgressbarModule", function() { return _progressbar_module__WEBPACK_IMPORTED_MODULE_2__["ProgressbarModule"]; });

/* harmony import */ var _progressbar_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./progressbar.config */ "./node_modules/ngx-bootstrap/progressbar/progressbar.config.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProgressbarConfig", function() { return _progressbar_config__WEBPACK_IMPORTED_MODULE_3__["ProgressbarConfig"]; });





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/progressbar/progressbar.component.js":
/*!*************************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/progressbar/progressbar.component.js ***!
  \*************************************************************************/
/*! exports provided: ProgressbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressbarComponent", function() { return ProgressbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _progressbar_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./progressbar.config */ "./node_modules/ngx-bootstrap/progressbar/progressbar.config.js");
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/index */ "./node_modules/ngx-bootstrap/utils/index.js");



var ProgressbarComponent = /** @class */ (function () {
    function ProgressbarComponent(config) {
        this.isStacked = false;
        this.addClass = true;
        this.bars = [];
        this._max = 100;
        Object.assign(this, config);
    }
    Object.defineProperty(ProgressbarComponent.prototype, "value", {
        set: /** current value of progress bar. Could be a number or array of objects
           * like {"value":15,"type":"info","label":"15 %"}
           */
        function (value) {
            this.isStacked = Array.isArray(value);
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressbarComponent.prototype, "isBs3", {
        get: function () {
            return Object(_utils_index__WEBPACK_IMPORTED_MODULE_2__["isBs3"])();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressbarComponent.prototype, "max", {
        get: /** maximum total value of progress element */
        function () {
            return this._max;
        },
        set: function (v) {
            this._max = v;
            this.bars.forEach(function (bar) {
                bar.recalculatePercentage();
            });
        },
        enumerable: true,
        configurable: true
    });
    ProgressbarComponent.prototype.addBar = function (bar) {
        bar.animate = this.animate;
        bar.striped = this.striped;
        this.bars.push(bar);
    };
    ProgressbarComponent.prototype.removeBar = function (bar) {
        this.bars.splice(this.bars.indexOf(bar), 1);
    };
    ProgressbarComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'progressbar',
                    template: "<bar [type]=\"type\" [value]=\"_value\" *ngIf=\"!isStacked\"> <ng-content></ng-content> </bar> <ng-template [ngIf]=\"isStacked\"> <bar *ngFor=\"let item of _value\" [type]=\"item.type\" [value]=\"item.value\">{{ item.label }}</bar> </ng-template> ",
                    styles: [
                        "\n    :host {\n      width: 100%;\n      display: flex;\n    }\n  "
                    ]
                },] },
    ];
    /** @nocollapse */
    ProgressbarComponent.ctorParameters = function () { return [
        { type: _progressbar_config__WEBPACK_IMPORTED_MODULE_1__["ProgressbarConfig"], },
    ]; };
    ProgressbarComponent.propDecorators = {
        "animate": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "striped": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "type": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "value": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "max": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['attr.max',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "addClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['class.progress',] },],
    };
    return ProgressbarComponent;
}());

//# sourceMappingURL=progressbar.component.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/progressbar/progressbar.config.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/progressbar/progressbar.config.js ***!
  \**********************************************************************/
/*! exports provided: ProgressbarConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressbarConfig", function() { return ProgressbarConfig; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

var ProgressbarConfig = /** @class */ (function () {
    function ProgressbarConfig() {
        /** if `true` changing value of progress bar will be animated */
        this.animate = false;
        /** maximum total value of progress element */
        this.max = 100;
    }
    ProgressbarConfig.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
    ];
    return ProgressbarConfig;
}());

//# sourceMappingURL=progressbar.config.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/progressbar/progressbar.module.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/progressbar/progressbar.module.js ***!
  \**********************************************************************/
/*! exports provided: ProgressbarModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressbarModule", function() { return ProgressbarModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _bar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bar.component */ "./node_modules/ngx-bootstrap/progressbar/bar.component.js");
/* harmony import */ var _progressbar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./progressbar.component */ "./node_modules/ngx-bootstrap/progressbar/progressbar.component.js");
/* harmony import */ var _progressbar_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./progressbar.config */ "./node_modules/ngx-bootstrap/progressbar/progressbar.config.js");





var ProgressbarModule = /** @class */ (function () {
    function ProgressbarModule() {
    }
    ProgressbarModule.forRoot = function () {
        return { ngModule: ProgressbarModule, providers: [_progressbar_config__WEBPACK_IMPORTED_MODULE_4__["ProgressbarConfig"]] };
    };
    ProgressbarModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]],
                    declarations: [_bar_component__WEBPACK_IMPORTED_MODULE_2__["BarComponent"], _progressbar_component__WEBPACK_IMPORTED_MODULE_3__["ProgressbarComponent"]],
                    exports: [_bar_component__WEBPACK_IMPORTED_MODULE_2__["BarComponent"], _progressbar_component__WEBPACK_IMPORTED_MODULE_3__["ProgressbarComponent"]]
                },] },
    ];
    return ProgressbarModule;
}());

//# sourceMappingURL=progressbar.module.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/tooltip/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/ngx-bootstrap/tooltip/index.js ***!
  \*****************************************************/
/*! exports provided: TooltipContainerComponent, TooltipDirective, TooltipModule, TooltipConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tooltip_container_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tooltip-container.component */ "./node_modules/ngx-bootstrap/tooltip/tooltip-container.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipContainerComponent", function() { return _tooltip_container_component__WEBPACK_IMPORTED_MODULE_0__["TooltipContainerComponent"]; });

/* harmony import */ var _tooltip_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tooltip.directive */ "./node_modules/ngx-bootstrap/tooltip/tooltip.directive.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipDirective", function() { return _tooltip_directive__WEBPACK_IMPORTED_MODULE_1__["TooltipDirective"]; });

/* harmony import */ var _tooltip_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tooltip.module */ "./node_modules/ngx-bootstrap/tooltip/tooltip.module.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipModule", function() { return _tooltip_module__WEBPACK_IMPORTED_MODULE_2__["TooltipModule"]; });

/* harmony import */ var _tooltip_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tooltip.config */ "./node_modules/ngx-bootstrap/tooltip/tooltip.config.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipConfig", function() { return _tooltip_config__WEBPACK_IMPORTED_MODULE_3__["TooltipConfig"]; });





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/tooltip/tooltip-container.component.js":
/*!***************************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/tooltip/tooltip-container.component.js ***!
  \***************************************************************************/
/*! exports provided: TooltipContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipContainerComponent", function() { return TooltipContainerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _tooltip_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tooltip.config */ "./node_modules/ngx-bootstrap/tooltip/tooltip.config.js");
/* harmony import */ var _utils_theme_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/theme-provider */ "./node_modules/ngx-bootstrap/utils/theme-provider.js");



var TooltipContainerComponent = /** @class */ (function () {
    function TooltipContainerComponent(config) {
        Object.assign(this, config);
    }
    Object.defineProperty(TooltipContainerComponent.prototype, "isBs3", {
        get: function () {
            return Object(_utils_theme_provider__WEBPACK_IMPORTED_MODULE_2__["isBs3"])();
        },
        enumerable: true,
        configurable: true
    });
    TooltipContainerComponent.prototype.ngAfterViewInit = function () {
        this.classMap = { in: false, fade: false };
        this.classMap[this.placement] = true;
        this.classMap["tooltip-" + this.placement] = true;
        this.classMap.in = true;
        if (this.animation) {
            this.classMap.fade = true;
        }
        if (this.containerClass) {
            this.classMap[this.containerClass] = true;
        }
    };
    TooltipContainerComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'bs-tooltip-container',
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
                    // tslint:disable-next-line
                    host: {
                        '[class]': '"tooltip in tooltip-" + placement + " " + "bs-tooltip-" + placement + " " + placement + " " + containerClass',
                        '[class.show]': '!isBs3',
                        role: 'tooltip'
                    },
                    styles: [
                        "\n    :host.tooltip {\n      display: block;\n    }\n    :host.bs-tooltip-top .arrow, :host.bs-tooltip-bottom .arrow {\n      left: 50%;\n      margin-left: -6px;\n    }\n    :host.bs-tooltip-left .arrow, :host.bs-tooltip-right .arrow {\n      top: 50%;\n      margin-top: -6px;\n    }\n  "
                    ],
                    template: "\n    <div class=\"tooltip-arrow arrow\"></div>\n    <div class=\"tooltip-inner\"><ng-content></ng-content></div>\n    "
                },] },
    ];
    /** @nocollapse */
    TooltipContainerComponent.ctorParameters = function () { return [
        { type: _tooltip_config__WEBPACK_IMPORTED_MODULE_1__["TooltipConfig"], },
    ]; };
    return TooltipContainerComponent;
}());

//# sourceMappingURL=tooltip-container.component.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/tooltip/tooltip.config.js":
/*!**************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/tooltip/tooltip.config.js ***!
  \**************************************************************/
/*! exports provided: TooltipConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipConfig", function() { return TooltipConfig; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

/** Default values provider for tooltip */
var TooltipConfig = /** @class */ (function () {
    function TooltipConfig() {
        /** tooltip placement, supported positions: 'top', 'bottom', 'left', 'right' */
        this.placement = 'top';
        /** array of event names which triggers tooltip opening */
        this.triggers = 'hover focus';
    }
    TooltipConfig.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
    ];
    return TooltipConfig;
}());

//# sourceMappingURL=tooltip.config.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/tooltip/tooltip.directive.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/tooltip/tooltip.directive.js ***!
  \*****************************************************************/
/*! exports provided: TooltipDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipDirective", function() { return TooltipDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _tooltip_container_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tooltip-container.component */ "./node_modules/ngx-bootstrap/tooltip/tooltip-container.component.js");
/* harmony import */ var _tooltip_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tooltip.config */ "./node_modules/ngx-bootstrap/tooltip/tooltip.config.js");
/* harmony import */ var _component_loader_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../component-loader/index */ "./node_modules/ngx-bootstrap/component-loader/index.js");
/* harmony import */ var _utils_decorators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/decorators */ "./node_modules/ngx-bootstrap/utils/decorators.js");
/* harmony import */ var _utils_warn_once__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/warn-once */ "./node_modules/ngx-bootstrap/utils/warn-once.js");
/* harmony import */ var _utils_triggers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/triggers */ "./node_modules/ngx-bootstrap/utils/triggers.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var TooltipDirective = /** @class */ (function () {
    function TooltipDirective(_viewContainerRef, _renderer, _elementRef, cis, config) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        /** Fired when tooltip content changes */
        this.tooltipChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
           * Css class for tooltip container
           */
        this.containerClass = '';
        /** @deprecated - removed, will be added to configuration */
        this._animation = true;
        /** @deprecated */
        this._fadeDuration = 150;
        /** @deprecated */
        this.tooltipStateChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this._tooltip = cis
            .createLoader(this._elementRef, _viewContainerRef, this._renderer)
            .provide({ provide: _tooltip_config__WEBPACK_IMPORTED_MODULE_2__["TooltipConfig"], useValue: config });
        Object.assign(this, config);
        this.onShown = this._tooltip.onShown;
        this.onHidden = this._tooltip.onHidden;
    }
    Object.defineProperty(TooltipDirective.prototype, "isOpen", {
        get: /**
           * Returns whether or not the tooltip is currently being shown
           */
        function () {
            return this._tooltip.isShown;
        },
        set: function (value) {
            if (value) {
                this.show();
            }
            else {
                this.hide();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "htmlContent", {
        set: /** @deprecated - please use `tooltip` instead */
        function (value) {
            Object(_utils_warn_once__WEBPACK_IMPORTED_MODULE_5__["warnOnce"])('tooltipHtml was deprecated, please use `tooltip` instead');
            this.tooltip = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_placement", {
        set: /** @deprecated - please use `placement` instead */
        function (value) {
            Object(_utils_warn_once__WEBPACK_IMPORTED_MODULE_5__["warnOnce"])('tooltipPlacement was deprecated, please use `placement` instead');
            this.placement = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_isOpen", {
        get: function () {
            Object(_utils_warn_once__WEBPACK_IMPORTED_MODULE_5__["warnOnce"])('tooltipIsOpen was deprecated, please use `isOpen` instead');
            return this.isOpen;
        },
        set: /** @deprecated - please use `isOpen` instead*/
        function (value) {
            Object(_utils_warn_once__WEBPACK_IMPORTED_MODULE_5__["warnOnce"])('tooltipIsOpen was deprecated, please use `isOpen` instead');
            this.isOpen = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_enable", {
        get: function () {
            Object(_utils_warn_once__WEBPACK_IMPORTED_MODULE_5__["warnOnce"])('tooltipEnable was deprecated, please use `isDisabled` instead');
            return this.isDisabled;
        },
        set: /** @deprecated - please use `isDisabled` instead */
        function (value) {
            Object(_utils_warn_once__WEBPACK_IMPORTED_MODULE_5__["warnOnce"])('tooltipEnable was deprecated, please use `isDisabled` instead');
            this.isDisabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_appendToBody", {
        get: function () {
            Object(_utils_warn_once__WEBPACK_IMPORTED_MODULE_5__["warnOnce"])('tooltipAppendToBody was deprecated, please use `container="body"` instead');
            return this.container === 'body';
        },
        set: /** @deprecated - please use `container="body"` instead */
        function (value) {
            Object(_utils_warn_once__WEBPACK_IMPORTED_MODULE_5__["warnOnce"])('tooltipAppendToBody was deprecated, please use `container="body"` instead');
            this.container = value ? 'body' : this.container;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_popupClass", {
        set: /** @deprecated - will replaced with customClass */
        function (value) {
            Object(_utils_warn_once__WEBPACK_IMPORTED_MODULE_5__["warnOnce"])('tooltipClass deprecated');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_tooltipContext", {
        set: /** @deprecated - removed */
        function (value) {
            Object(_utils_warn_once__WEBPACK_IMPORTED_MODULE_5__["warnOnce"])('tooltipContext deprecated');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_tooltipPopupDelay", {
        set: /** @deprecated */
        function (value) {
            Object(_utils_warn_once__WEBPACK_IMPORTED_MODULE_5__["warnOnce"])('tooltipPopupDelay is deprecated, use `delay` instead');
            this.delay = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_tooltipTrigger", {
        get: /** @deprecated -  please use `triggers` instead */
        function () {
            Object(_utils_warn_once__WEBPACK_IMPORTED_MODULE_5__["warnOnce"])('tooltipTrigger was deprecated, please use `triggers` instead');
            return this.triggers;
        },
        set: function (value) {
            Object(_utils_warn_once__WEBPACK_IMPORTED_MODULE_5__["warnOnce"])('tooltipTrigger was deprecated, please use `triggers` instead');
            this.triggers = (value || '').toString();
        },
        enumerable: true,
        configurable: true
    });
    TooltipDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._tooltip.listen({
            triggers: this.triggers,
            show: function () { return _this.show(); }
        });
        this.tooltipChange.subscribe(function (value) {
            if (!value) {
                _this._tooltip.hide();
            }
        });
    };
    /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    /**
       * Toggles an element’s tooltip. This is considered a “manual” triggering of
       * the tooltip.
       */
    TooltipDirective.prototype.toggle = /**
       * Toggles an element’s tooltip. This is considered a “manual” triggering of
       * the tooltip.
       */
    function () {
        if (this.isOpen) {
            return this.hide();
        }
        this.show();
    };
    /**
     * Opens an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    /**
       * Opens an element’s tooltip. This is considered a “manual” triggering of
       * the tooltip.
       */
    TooltipDirective.prototype.show = /**
       * Opens an element’s tooltip. This is considered a “manual” triggering of
       * the tooltip.
       */
    function () {
        var _this = this;
        if (this.isOpen ||
            this.isDisabled ||
            this._delayTimeoutId ||
            !this.tooltip) {
            return;
        }
        var showTooltip = function () {
            if (_this._delayTimeoutId) {
                _this._delayTimeoutId = undefined;
            }
            _this._tooltip
                .attach(_tooltip_container_component__WEBPACK_IMPORTED_MODULE_1__["TooltipContainerComponent"])
                .to(_this.container)
                .position({ attachment: _this.placement })
                .show({
                content: _this.tooltip,
                placement: _this.placement,
                containerClass: _this.containerClass
            });
        };
        var cancelDelayedTooltipShowing = function () {
            if (_this._tooltipCancelShowFn) {
                _this._tooltipCancelShowFn();
            }
        };
        if (this.delay) {
            var _timer_1 = Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["timer"])(this.delay).subscribe(function () {
                showTooltip();
                cancelDelayedTooltipShowing();
            });
            if (this.triggers) {
                var triggers = Object(_utils_triggers__WEBPACK_IMPORTED_MODULE_6__["parseTriggers"])(this.triggers);
                this._tooltipCancelShowFn = this._renderer.listen(this._elementRef.nativeElement, triggers[0].close, function () {
                    _timer_1.unsubscribe();
                    cancelDelayedTooltipShowing();
                });
            }
        }
        else {
            showTooltip();
        }
    };
    /**
     * Closes an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    /**
       * Closes an element’s tooltip. This is considered a “manual” triggering of
       * the tooltip.
       */
    TooltipDirective.prototype.hide = /**
       * Closes an element’s tooltip. This is considered a “manual” triggering of
       * the tooltip.
       */
    function () {
        var _this = this;
        if (this._delayTimeoutId) {
            clearTimeout(this._delayTimeoutId);
            this._delayTimeoutId = undefined;
        }
        if (!this._tooltip.isShown) {
            return;
        }
        this._tooltip.instance.classMap.in = false;
        setTimeout(function () {
            _this._tooltip.hide();
        }, this._fadeDuration);
    };
    TooltipDirective.prototype.ngOnDestroy = function () {
        this._tooltip.dispose();
    };
    TooltipDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: '[tooltip], [tooltipHtml]',
                    exportAs: 'bs-tooltip'
                },] },
    ];
    /** @nocollapse */
    TooltipDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], },
        { type: _component_loader_index__WEBPACK_IMPORTED_MODULE_3__["ComponentLoaderFactory"], },
        { type: _tooltip_config__WEBPACK_IMPORTED_MODULE_2__["TooltipConfig"], },
    ]; };
    TooltipDirective.propDecorators = {
        "tooltip": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "tooltipChange": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "placement": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "triggers": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "container": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "isOpen": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "isDisabled": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "containerClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "delay": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "onShown": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "onHidden": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "htmlContent": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['tooltipHtml',] },],
        "_placement": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['tooltipPlacement',] },],
        "_isOpen": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['tooltipIsOpen',] },],
        "_enable": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['tooltipEnable',] },],
        "_appendToBody": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['tooltipAppendToBody',] },],
        "_animation": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['tooltipAnimation',] },],
        "_popupClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['tooltipClass',] },],
        "_tooltipContext": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['tooltipContext',] },],
        "_tooltipPopupDelay": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['tooltipPopupDelay',] },],
        "_fadeDuration": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['tooltipFadeDuration',] },],
        "_tooltipTrigger": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['tooltipTrigger',] },],
        "tooltipStateChanged": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    };
    __decorate([
        Object(_utils_decorators__WEBPACK_IMPORTED_MODULE_4__["OnChange"])(),
        __metadata("design:type", Object)
    ], TooltipDirective.prototype, "tooltip", void 0);
    return TooltipDirective;
}());

//# sourceMappingURL=tooltip.directive.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/tooltip/tooltip.module.js":
/*!**************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/tooltip/tooltip.module.js ***!
  \**************************************************************/
/*! exports provided: TooltipModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipModule", function() { return TooltipModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _tooltip_container_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tooltip-container.component */ "./node_modules/ngx-bootstrap/tooltip/tooltip-container.component.js");
/* harmony import */ var _tooltip_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tooltip.directive */ "./node_modules/ngx-bootstrap/tooltip/tooltip.directive.js");
/* harmony import */ var _tooltip_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tooltip.config */ "./node_modules/ngx-bootstrap/tooltip/tooltip.config.js");
/* harmony import */ var _component_loader_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../component-loader/index */ "./node_modules/ngx-bootstrap/component-loader/index.js");
/* harmony import */ var _positioning_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../positioning/index */ "./node_modules/ngx-bootstrap/positioning/index.js");







var TooltipModule = /** @class */ (function () {
    function TooltipModule() {
    }
    TooltipModule.forRoot = function () {
        return {
            ngModule: TooltipModule,
            providers: [_tooltip_config__WEBPACK_IMPORTED_MODULE_4__["TooltipConfig"], _component_loader_index__WEBPACK_IMPORTED_MODULE_5__["ComponentLoaderFactory"], _positioning_index__WEBPACK_IMPORTED_MODULE_6__["PositioningService"]]
        };
    };
    TooltipModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]],
                    declarations: [_tooltip_directive__WEBPACK_IMPORTED_MODULE_3__["TooltipDirective"], _tooltip_container_component__WEBPACK_IMPORTED_MODULE_2__["TooltipContainerComponent"]],
                    exports: [_tooltip_directive__WEBPACK_IMPORTED_MODULE_3__["TooltipDirective"]],
                    entryComponents: [_tooltip_container_component__WEBPACK_IMPORTED_MODULE_2__["TooltipContainerComponent"]]
                },] },
    ];
    return TooltipModule;
}());

//# sourceMappingURL=tooltip.module.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/utils/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ngx-bootstrap/utils/index.js ***!
  \***************************************************/
/*! exports provided: OnChange, LinkedList, isBs3, Trigger, Utils, setTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decorators */ "./node_modules/ngx-bootstrap/utils/decorators.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OnChange", function() { return _decorators__WEBPACK_IMPORTED_MODULE_0__["OnChange"]; });

/* harmony import */ var _linked_list_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./linked-list.class */ "./node_modules/ngx-bootstrap/utils/linked-list.class.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LinkedList", function() { return _linked_list_class__WEBPACK_IMPORTED_MODULE_1__["LinkedList"]; });

/* harmony import */ var _theme_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./theme-provider */ "./node_modules/ngx-bootstrap/utils/theme-provider.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isBs3", function() { return _theme_provider__WEBPACK_IMPORTED_MODULE_2__["isBs3"]; });

/* harmony import */ var _trigger_class__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./trigger.class */ "./node_modules/ngx-bootstrap/utils/trigger.class.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Trigger", function() { return _trigger_class__WEBPACK_IMPORTED_MODULE_3__["Trigger"]; });

/* harmony import */ var _utils_class__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.class */ "./node_modules/ngx-bootstrap/utils/utils.class.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return _utils_class__WEBPACK_IMPORTED_MODULE_4__["Utils"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setTheme", function() { return _theme_provider__WEBPACK_IMPORTED_MODULE_2__["setTheme"]; });







//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/utils/linked-list.class.js":
/*!***************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/utils/linked-list.class.js ***!
  \***************************************************************/
/*! exports provided: LinkedList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinkedList", function() { return LinkedList; });
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.length = 0;
        this.asArray = [];
    }
    LinkedList.prototype.get = function (position) {
        if (this.length === 0 || position < 0 || position >= this.length) {
            return void 0;
        }
        var current = this.head;
        for (var index = 0; index < position; index++) {
            current = current.next;
        }
        return current.value;
    };
    LinkedList.prototype.add = function (value, position) {
        if (position === void 0) { position = this.length; }
        if (position < 0 || position > this.length) {
            throw new Error('Position is out of the list');
        }
        var node = {
            value: value,
            next: undefined,
            previous: undefined
        };
        if (this.length === 0) {
            this.head = node;
            this.tail = node;
            this.current = node;
        }
        else {
            if (position === 0) {
                // first node
                node.next = this.head;
                this.head.previous = node;
                this.head = node;
            }
            else if (position === this.length) {
                // last node
                this.tail.next = node;
                node.previous = this.tail;
                this.tail = node;
            }
            else {
                // node in middle
                var currentPreviousNode = this.getNode(position - 1);
                var currentNextNode = currentPreviousNode.next;
                currentPreviousNode.next = node;
                currentNextNode.previous = node;
                node.previous = currentPreviousNode;
                node.next = currentNextNode;
            }
        }
        this.length++;
        this.createInternalArrayRepresentation();
    };
    LinkedList.prototype.remove = function (position) {
        if (position === void 0) { position = 0; }
        if (this.length === 0 || position < 0 || position >= this.length) {
            throw new Error('Position is out of the list');
        }
        if (position === 0) {
            // first node
            this.head = this.head.next;
            if (this.head) {
                // there is no second node
                this.head.previous = undefined;
            }
            else {
                // there is no second node
                this.tail = undefined;
            }
        }
        else if (position === this.length - 1) {
            // last node
            this.tail = this.tail.previous;
            this.tail.next = undefined;
        }
        else {
            // middle node
            var removedNode = this.getNode(position);
            removedNode.next.previous = removedNode.previous;
            removedNode.previous.next = removedNode.next;
        }
        this.length--;
        this.createInternalArrayRepresentation();
    };
    LinkedList.prototype.set = function (position, value) {
        if (this.length === 0 || position < 0 || position >= this.length) {
            throw new Error('Position is out of the list');
        }
        var node = this.getNode(position);
        node.value = value;
        this.createInternalArrayRepresentation();
    };
    LinkedList.prototype.toArray = function () {
        return this.asArray;
    };
    LinkedList.prototype.findAll = function (fn) {
        var current = this.head;
        var result = [];
        for (var index = 0; index < this.length; index++) {
            if (fn(current.value, index)) {
                result.push({ index: index, value: current.value });
            }
            current = current.next;
        }
        return result;
    };
    // Array methods overriding start
    // Array methods overriding start
    LinkedList.prototype.push = 
    // Array methods overriding start
    function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.forEach(function (arg) {
            _this.add(arg);
        });
        return this.length;
    };
    LinkedList.prototype.pop = function () {
        if (this.length === 0) {
            return undefined;
        }
        var last = this.tail;
        this.remove(this.length - 1);
        return last.value;
    };
    LinkedList.prototype.unshift = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.reverse();
        args.forEach(function (arg) {
            _this.add(arg, 0);
        });
        return this.length;
    };
    LinkedList.prototype.shift = function () {
        if (this.length === 0) {
            return undefined;
        }
        var lastItem = this.head.value;
        this.remove();
        return lastItem;
    };
    LinkedList.prototype.forEach = function (fn) {
        var current = this.head;
        for (var index = 0; index < this.length; index++) {
            fn(current.value, index);
            current = current.next;
        }
    };
    LinkedList.prototype.indexOf = function (value) {
        var current = this.head;
        var position = 0;
        for (var index = 0; index < this.length; index++) {
            if (current.value === value) {
                position = index;
                break;
            }
            current = current.next;
        }
        return position;
    };
    LinkedList.prototype.some = function (fn) {
        var current = this.head;
        var result = false;
        while (current && !result) {
            if (fn(current.value)) {
                result = true;
                break;
            }
            current = current.next;
        }
        return result;
    };
    LinkedList.prototype.every = function (fn) {
        var current = this.head;
        var result = true;
        while (current && result) {
            if (!fn(current.value)) {
                result = false;
            }
            current = current.next;
        }
        return result;
    };
    LinkedList.prototype.toString = function () {
        return '[Linked List]';
    };
    LinkedList.prototype.find = function (fn) {
        var current = this.head;
        var result;
        for (var index = 0; index < this.length; index++) {
            if (fn(current.value, index)) {
                result = current.value;
                break;
            }
            current = current.next;
        }
        return result;
    };
    LinkedList.prototype.findIndex = function (fn) {
        var current = this.head;
        var result;
        for (var index = 0; index < this.length; index++) {
            if (fn(current.value, index)) {
                result = index;
                break;
            }
            current = current.next;
        }
        return result;
    };
    LinkedList.prototype.getNode = function (position) {
        if (this.length === 0 || position < 0 || position >= this.length) {
            throw new Error('Position is out of the list');
        }
        var current = this.head;
        for (var index = 0; index < position; index++) {
            current = current.next;
        }
        return current;
    };
    LinkedList.prototype.createInternalArrayRepresentation = function () {
        var outArray = [];
        var current = this.head;
        while (current) {
            outArray.push(current.value);
            current = current.next;
        }
        this.asArray = outArray;
    };
    return LinkedList;
}());

//# sourceMappingURL=linked-list.class.js.map

/***/ }),

/***/ "./node_modules/ngx-bootstrap/utils/warn-once.js":
/*!*******************************************************!*\
  !*** ./node_modules/ngx-bootstrap/utils/warn-once.js ***!
  \*******************************************************/
/*! exports provided: warnOnce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "warnOnce", function() { return warnOnce; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

var _messagesHash = {};
var _hideMsg = typeof console === 'undefined' || !('warn' in console);
function warnOnce(msg) {
    if (!Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["isDevMode"])() || _hideMsg || msg in _messagesHash) {
        return;
    }
    _messagesHash[msg] = true;
    /*tslint:disable-next-line*/
    console.warn(msg);
}
//# sourceMappingURL=warn-once.js.map

/***/ }),

/***/ "./src/app/views/base/base-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/views/base/base-routing.module.ts ***!
  \***************************************************/
/*! exports provided: BaseRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseRoutingModule", function() { return BaseRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _cards_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cards.component */ "./src/app/views/base/cards.component.ts");
/* harmony import */ var _forms_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./forms.component */ "./src/app/views/base/forms.component.ts");
/* harmony import */ var _switches_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./switches.component */ "./src/app/views/base/switches.component.ts");
/* harmony import */ var _tables_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tables.component */ "./src/app/views/base/tables.component.ts");
/* harmony import */ var _tabs_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tabs.component */ "./src/app/views/base/tabs.component.ts");
/* harmony import */ var _carousels_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./carousels.component */ "./src/app/views/base/carousels.component.ts");
/* harmony import */ var _collapses_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./collapses.component */ "./src/app/views/base/collapses.component.ts");
/* harmony import */ var _paginations_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./paginations.component */ "./src/app/views/base/paginations.component.ts");
/* harmony import */ var _popovers_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./popovers.component */ "./src/app/views/base/popovers.component.ts");
/* harmony import */ var _progress_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./progress.component */ "./src/app/views/base/progress.component.ts");
/* harmony import */ var _tooltips_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./tooltips.component */ "./src/app/views/base/tooltips.component.ts");
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
            title: 'Base'
        },
        children: [
            {
                path: 'cards',
                component: _cards_component__WEBPACK_IMPORTED_MODULE_2__["CardsComponent"],
                data: {
                    title: 'Cards'
                }
            },
            {
                path: 'forms',
                component: _forms_component__WEBPACK_IMPORTED_MODULE_3__["FormsComponent"],
                data: {
                    title: 'Forms'
                }
            },
            {
                path: 'switches',
                component: _switches_component__WEBPACK_IMPORTED_MODULE_4__["SwitchesComponent"],
                data: {
                    title: 'Switches'
                }
            },
            {
                path: 'tables',
                component: _tables_component__WEBPACK_IMPORTED_MODULE_5__["TablesComponent"],
                data: {
                    title: 'Tables'
                }
            },
            {
                path: 'tabs',
                component: _tabs_component__WEBPACK_IMPORTED_MODULE_6__["TabsComponent"],
                data: {
                    title: 'Tabs'
                }
            },
            {
                path: 'carousels',
                component: _carousels_component__WEBPACK_IMPORTED_MODULE_7__["CarouselsComponent"],
                data: {
                    title: 'Carousels'
                }
            },
            {
                path: 'collapses',
                component: _collapses_component__WEBPACK_IMPORTED_MODULE_8__["CollapsesComponent"],
                data: {
                    title: 'Collapses'
                }
            },
            {
                path: 'paginations',
                component: _paginations_component__WEBPACK_IMPORTED_MODULE_9__["PaginationsComponent"],
                data: {
                    title: 'Pagination'
                }
            },
            {
                path: 'popovers',
                component: _popovers_component__WEBPACK_IMPORTED_MODULE_10__["PopoversComponent"],
                data: {
                    title: 'Popover'
                }
            },
            {
                path: 'progress',
                component: _progress_component__WEBPACK_IMPORTED_MODULE_11__["ProgressComponent"],
                data: {
                    title: 'Progress'
                }
            },
            {
                path: 'tooltips',
                component: _tooltips_component__WEBPACK_IMPORTED_MODULE_12__["TooltipsComponent"],
                data: {
                    title: 'Tooltips'
                }
            }
        ]
    }
];
var BaseRoutingModule = /** @class */ (function () {
    function BaseRoutingModule() {
    }
    BaseRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], BaseRoutingModule);
    return BaseRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/base/base.module.ts":
/*!*******************************************!*\
  !*** ./src/app/views/base/base.module.ts ***!
  \*******************************************/
/*! exports provided: BaseModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseModule", function() { return BaseModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _cards_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cards.component */ "./src/app/views/base/cards.component.ts");
/* harmony import */ var _forms_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./forms.component */ "./src/app/views/base/forms.component.ts");
/* harmony import */ var _switches_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./switches.component */ "./src/app/views/base/switches.component.ts");
/* harmony import */ var _tables_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tables.component */ "./src/app/views/base/tables.component.ts");
/* harmony import */ var ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap/tabs */ "./node_modules/ngx-bootstrap/tabs/index.js");
/* harmony import */ var _tabs_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tabs.component */ "./src/app/views/base/tabs.component.ts");
/* harmony import */ var ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-bootstrap/carousel */ "./node_modules/ngx-bootstrap/carousel/index.js");
/* harmony import */ var _carousels_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./carousels.component */ "./src/app/views/base/carousels.component.ts");
/* harmony import */ var ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-bootstrap/collapse */ "./node_modules/ngx-bootstrap/collapse/index.js");
/* harmony import */ var _collapses_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./collapses.component */ "./src/app/views/base/collapses.component.ts");
/* harmony import */ var ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-bootstrap/dropdown */ "./node_modules/ngx-bootstrap/dropdown/index.js");
/* harmony import */ var ngx_bootstrap_pagination__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-bootstrap/pagination */ "./node_modules/ngx-bootstrap/pagination/index.js");
/* harmony import */ var _popovers_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./popovers.component */ "./src/app/views/base/popovers.component.ts");
/* harmony import */ var ngx_bootstrap_popover__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-bootstrap/popover */ "./node_modules/ngx-bootstrap/popover/index.js");
/* harmony import */ var _paginations_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./paginations.component */ "./src/app/views/base/paginations.component.ts");
/* harmony import */ var ngx_bootstrap_progressbar__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-bootstrap/progressbar */ "./node_modules/ngx-bootstrap/progressbar/index.js");
/* harmony import */ var _progress_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./progress.component */ "./src/app/views/base/progress.component.ts");
/* harmony import */ var ngx_bootstrap_tooltip__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ngx-bootstrap/tooltip */ "./node_modules/ngx-bootstrap/tooltip/index.js");
/* harmony import */ var _tooltips_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./tooltips.component */ "./src/app/views/base/tooltips.component.ts");
/* harmony import */ var _base_routing_module__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./base-routing.module */ "./src/app/views/base/base-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Angular




// Forms Component



// Tabs Component


// Carousel Component


// Collapse Component


// Dropdowns Component

// Pagination Component


// Popover Component


// Progress Component


// Tooltip Component


// Components Routing

var BaseModule = /** @class */ (function () {
    function BaseModule() {
    }
    BaseModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
                _base_routing_module__WEBPACK_IMPORTED_MODULE_22__["BaseRoutingModule"],
                ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_13__["BsDropdownModule"].forRoot(),
                ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_7__["TabsModule"],
                ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_9__["CarouselModule"].forRoot(),
                ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_11__["CollapseModule"].forRoot(),
                ngx_bootstrap_pagination__WEBPACK_IMPORTED_MODULE_14__["PaginationModule"].forRoot(),
                ngx_bootstrap_popover__WEBPACK_IMPORTED_MODULE_16__["PopoverModule"].forRoot(),
                ngx_bootstrap_progressbar__WEBPACK_IMPORTED_MODULE_18__["ProgressbarModule"].forRoot(),
                ngx_bootstrap_tooltip__WEBPACK_IMPORTED_MODULE_20__["TooltipModule"].forRoot()
            ],
            declarations: [
                _cards_component__WEBPACK_IMPORTED_MODULE_3__["CardsComponent"],
                _forms_component__WEBPACK_IMPORTED_MODULE_4__["FormsComponent"],
                _switches_component__WEBPACK_IMPORTED_MODULE_5__["SwitchesComponent"],
                _tables_component__WEBPACK_IMPORTED_MODULE_6__["TablesComponent"],
                _tabs_component__WEBPACK_IMPORTED_MODULE_8__["TabsComponent"],
                _carousels_component__WEBPACK_IMPORTED_MODULE_10__["CarouselsComponent"],
                _collapses_component__WEBPACK_IMPORTED_MODULE_12__["CollapsesComponent"],
                _paginations_component__WEBPACK_IMPORTED_MODULE_17__["PaginationsComponent"],
                _popovers_component__WEBPACK_IMPORTED_MODULE_15__["PopoversComponent"],
                _progress_component__WEBPACK_IMPORTED_MODULE_19__["ProgressComponent"],
                _tooltips_component__WEBPACK_IMPORTED_MODULE_21__["TooltipsComponent"]
            ]
        })
    ], BaseModule);
    return BaseModule;
}());



/***/ }),

/***/ "./src/app/views/base/cards.component.html":
/*!*************************************************!*\
  !*** ./src/app/views/base/cards.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Card title\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card\">\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n        <div class=\"card-footer\">Card footer</div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-check\"></i>Card with icon\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Card with switch\r\n          <label class=\"switch switch-sm switch-text switch-info float-right mb-0\">\r\n            <input type=\"checkbox\" class=\"switch-input\">\r\n            <span class=\"switch-label\" data-on=\"On\" data-off=\"Off\"></span>\r\n            <span class=\"switch-handle\"></span>\r\n          </label>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Card with label\r\n          <span class=\"badge badge-success float-right\">Success</span>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Card with label\r\n          <span class=\"badge badge-pill badge-danger float-right\">42</span>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card border-primary\">\r\n        <div class=\"card-header\">\r\n          Card outline\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card border-secondary\">\r\n        <div class=\"card-header\">\r\n          Card outline\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card border-success\">\r\n        <div class=\"card-header\">\r\n          Card outline\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card border-info\">\r\n        <div class=\"card-header\">\r\n          Card outline\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card border-warning\">\r\n        <div class=\"card-header\">\r\n          Card outline\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card border-danger\">\r\n        <div class=\"card-header\">\r\n          Card outline\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card card-accent-primary\">\r\n        <div class=\"card-header\">\r\n          Card with accent\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card card-accent-secondary\">\r\n        <div class=\"card-header\">\r\n          Card with accent\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card card-accent-success\">\r\n        <div class=\"card-header\">\r\n          Card with accent\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card card-accent-info\">\r\n        <div class=\"card-header\">\r\n          Card with accent\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card card-accent-warning\">\r\n        <div class=\"card-header\">\r\n          Card with accent\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card card-accent-danger\">\r\n        <div class=\"card-header\">\r\n          Card with accent\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card text-white bg-primary text-center\">\r\n        <div class=\"card-body\">\r\n          <blockquote class=\"card-bodyquote\">\r\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\r\n            <footer>Someone famous in\r\n              <cite title=\"Source Title\">Source Title</cite>\r\n            </footer>\r\n          </blockquote>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card text-white bg-success text-center\">\r\n        <div class=\"card-body\">\r\n          <blockquote class=\"card-bodyquote\">\r\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\r\n            <footer>Someone famous in\r\n              <cite title=\"Source Title\">Source Title</cite>\r\n            </footer>\r\n          </blockquote>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card text-white bg-info text-center\">\r\n        <div class=\"card-body\">\r\n          <blockquote class=\"card-bodyquote\">\r\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\r\n            <footer>Someone famous in\r\n              <cite title=\"Source Title\">Source Title</cite>\r\n            </footer>\r\n          </blockquote>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card text-white bg-warning text-center\">\r\n        <div class=\"card-body\">\r\n          <blockquote class=\"card-bodyquote\">\r\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\r\n            <footer>Someone famous in\r\n              <cite title=\"Source Title\">Source Title</cite>\r\n            </footer>\r\n          </blockquote>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card text-white bg-danger text-center\">\r\n        <div class=\"card-body\">\r\n          <blockquote class=\"card-bodyquote\">\r\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\r\n            <footer>Someone famous in\r\n              <cite title=\"Source Title\">Source Title</cite>\r\n            </footer>\r\n          </blockquote>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card text-white bg-primary text-center\">\r\n        <div class=\"card-body\">\r\n          <blockquote class=\"card-bodyquote\">\r\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\r\n            <footer>Someone famous in\r\n              <cite title=\"Source Title\">Source Title</cite>\r\n            </footer>\r\n          </blockquote>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card text-white bg-primary\">\r\n        <div class=\"card-header\">\r\n          Card title\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card text-white bg-success\">\r\n        <div class=\"card-header\">\r\n          Card title\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card text-white bg-info\">\r\n        <div class=\"card-header\">\r\n          Card title\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card text-white bg-warning\">\r\n        <div class=\"card-header\">\r\n          Card title\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card text-white bg-danger\">\r\n        <div class=\"card-header\">\r\n          Card title\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/base/cards.component.ts":
/*!***********************************************!*\
  !*** ./src/app/views/base/cards.component.ts ***!
  \***********************************************/
/*! exports provided: CardsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardsComponent", function() { return CardsComponent; });
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

var CardsComponent = /** @class */ (function () {
    function CardsComponent() {
    }
    CardsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./cards.component.html */ "./src/app/views/base/cards.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], CardsComponent);
    return CardsComponent;
}());



/***/ }),

/***/ "./src/app/views/base/carousels.component.html":
/*!*****************************************************!*\
  !*** ./src/app/views/base/carousels.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Bootstrap Carousel\r\n          <div class=\"card-header-actions\">\r\n            <a href=\"https://valor-software.com/ngx-bootstrap/#/carousel\" target=\"_blank\">\r\n              <small className=\"text-muted\">docs</small>\r\n            </a>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <carousel [interval]=\"3000\">\r\n            <slide>\r\n              <img src=\"https://lorempixel.com/900/500/technics/2/\" alt=\"First slide\" style=\"display: block; width: 100%;\">\r\n            </slide>\r\n            <slide>\r\n              <img src=\"https://lorempixel.com/900/500/technics/4/\" alt=\"Second slide\" style=\"display: block; width: 100%;\">\r\n            </slide>\r\n            <slide>\r\n              <img src=\"https://lorempixel.com/900/500/technics/6/\" alt=\"Third slide\" style=\"display: block; width: 100%;\">\r\n            </slide>\r\n          </carousel>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-sm-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Carousel\r\n          <small> optional captions</small>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <carousel [interval]=\"4500\">\r\n            <slide>\r\n              <img src=\"https://lorempixel.com/900/500/nature/2/\" alt=\"First slide\" style=\"display: block; width: 100%;\">\r\n              <div class=\"carousel-caption d-none d-md-block\">\r\n                <h3>First slide label</h3>\r\n                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>\r\n              </div>\r\n            </slide>\r\n            <slide>\r\n              <img src=\"https://lorempixel.com/900/500/nature/4/\" alt=\"Second slide\" style=\"display: block; width: 100%;\">\r\n              <div class=\"carousel-caption d-none d-md-block\">\r\n                <h3>Second slide label</h3>\r\n                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\r\n              </div>\r\n            </slide>\r\n            <slide>\r\n              <img src=\"https://lorempixel.com/900/500/nature/6/\" alt=\"Third slide\" style=\"display: block; width: 100%;\">\r\n              <div class=\"carousel-caption d-none d-md-block\">\r\n                <h3>Third slide label</h3>\r\n                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>\r\n              </div>\r\n            </slide>\r\n          </carousel>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Carousel\r\n          <small> configuring defaults</small>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <carousel>\r\n            <slide>\r\n              <img src=\"https://lorempixel.com/900/500/city/2/\" alt=\"First slide\" style=\"display: block; width: 100%;\">\r\n              <div class=\"carousel-caption d-none d-md-block\">\r\n                <h3>First slide label</h3>\r\n                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>\r\n              </div>\r\n            </slide>\r\n            <slide>\r\n              <img src=\"https://lorempixel.com/900/500/city/4/\" alt=\"Second slide\" style=\"display: block; width: 100%;\">\r\n              <div class=\"carousel-caption d-none d-md-block\">\r\n                <h3>Second slide label</h3>\r\n                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\r\n              </div>\r\n            </slide>\r\n            <slide>\r\n              <img src=\"https://lorempixel.com/900/500/city/6/\" alt=\"Third slide\" style=\"display: block; width: 100%;\">\r\n              <div class=\"carousel-caption d-none d-md-block\">\r\n                <h3>Third slide label</h3>\r\n                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>\r\n              </div>\r\n            </slide>\r\n          </carousel>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-sm-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Carousel\r\n          <small> dynamic slides</small>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <carousel [interval]=\"myInterval\" [noWrap]=\"noWrapSlides\" [(activeSlide)]=\"activeSlideIndex\">\r\n            <slide *ngFor=\"let slide of slides; let index=index\">\r\n              <img [src]=\"slide.image\" alt=\"image slide\" style=\"display: block; width: 100%;\">\r\n\r\n              <div class=\"carousel-caption\">\r\n                <h4>Slide {{index}}</h4>\r\n                <p>{{slide.text}}</p>\r\n              </div>\r\n            </slide>\r\n          </carousel>\r\n          <br/>\r\n          <div>\r\n            <button type=\"button\" class=\"btn btn-info\"\r\n                    (click)=\"addSlide()\">Add Slide\r\n            </button>\r\n            <button type=\"button\" class=\"btn btn-info\"\r\n                    (click)=\"removeSlide()\">Remove Current\r\n            </button>\r\n            <button type=\"button\" class=\"btn btn-info\"\r\n                    (click)=\"removeSlide(2)\">Remove #3\r\n            </button>\r\n          </div>\r\n          <div>\r\n            <div class=\"checkbox\">\r\n              <label><input type=\"checkbox\" [(ngModel)]=\"noWrapSlides\">Disable Slide Looping</label>\r\n            </div>\r\n\r\n            <span>Interval, in milliseconds (Enter a negative number or 0 to stop the interval.): </span>\r\n            <input type=\"number\" class=\"form-control\" [(ngModel)]=\"myInterval\">\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/base/carousels.component.ts":
/*!***************************************************!*\
  !*** ./src/app/views/base/carousels.component.ts ***!
  \***************************************************/
/*! exports provided: CarouselsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarouselsComponent", function() { return CarouselsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/carousel */ "./node_modules/ngx-bootstrap/carousel/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CarouselsComponent = /** @class */ (function () {
    function CarouselsComponent() {
        this.myInterval = 6000;
        this.slides = [];
        this.activeSlideIndex = 0;
        this.noWrapSlides = false;
        for (var i = 0; i < 4; i++) {
            this.addSlide();
        }
    }
    CarouselsComponent.prototype.addSlide = function () {
        this.slides.push({
            image: "https://lorempixel.com/900/500/sports/" + (this.slides.length % 8 + 1) + "/"
        });
    };
    CarouselsComponent.prototype.removeSlide = function (index) {
        var toRemove = index ? index : this.activeSlideIndex;
        this.slides.splice(toRemove, 1);
    };
    CarouselsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./carousels.component.html */ "./src/app/views/base/carousels.component.html"),
            providers: [
                { provide: ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_1__["CarouselConfig"], useValue: { interval: 1500, noPause: true } }
            ]
        }),
        __metadata("design:paramtypes", [])
    ], CarouselsComponent);
    return CarouselsComponent;
}());



/***/ }),

/***/ "./src/app/views/base/collapses.component.html":
/*!*****************************************************!*\
  !*** ./src/app/views/base/collapses.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Bootstrap Collapse\r\n      <div class=\"card-header-actions\">\r\n        <a href=\"https://valor-software.com/ngx-bootstrap/#/collapse\" target=\"_blank\">\r\n          <small className=\"text-muted\">docs</small>\r\n        </a>\r\n      </div>\r\n    </div>\r\n    <div class=\"card-body\"\r\n         (collapsed)=\"collapsed($event)\"\r\n         (expanded)=\"expanded($event)\"\r\n         [collapse]=\"isCollapsed\">\r\n      <p>\r\n        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo\r\n        consequat.\r\n      </p>\r\n    </div>\r\n    <div class=\"card-footer\">\r\n      <button type=\"button\" class=\"btn btn-primary\"\r\n              (click)=\"isCollapsed = !isCollapsed\">Toggle collapse\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/base/collapses.component.ts":
/*!***************************************************!*\
  !*** ./src/app/views/base/collapses.component.ts ***!
  \***************************************************/
/*! exports provided: CollapsesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollapsesComponent", function() { return CollapsesComponent; });
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

var CollapsesComponent = /** @class */ (function () {
    function CollapsesComponent() {
        this.isCollapsed = false;
    }
    CollapsesComponent.prototype.collapsed = function (event) {
        // console.log(event);
    };
    CollapsesComponent.prototype.expanded = function (event) {
        // console.log(event);
    };
    CollapsesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./collapses.component.html */ "./src/app/views/base/collapses.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], CollapsesComponent);
    return CollapsesComponent;
}());



/***/ }),

/***/ "./src/app/views/base/forms.component.html":
/*!*************************************************!*\
  !*** ./src/app/views/base/forms.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\n\n  <div class=\"row\">\n\n    <div class=\"col-md-6\">\n      <div class=\"card\">\n        <div class=\"card-header text-center\">\n          <b> Robbin</b>\n        </div>\n\n\n        <div class=\"card-body\">\n          <form action=\"\" method=\"post\" class=\"form-horizontal\">\n            <div class=\"form-group row\">\n              <div class=\"col-md-12\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"><i class=\"fa fa-envelope\"></i></span>\n                  </div>\n                  <input type=\"text\" id=\"input1-group1\" name=\"input1-group1\" class=\"form-control\" placeholder=\"Username\">\n                </div>\n              </div>\n            </div>\n\n            <div class=\"form-group row\">\n              <div class=\"col-md-12\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"><i class=\"fa fa-key\"></i></span>\n                  </div>\n                  <input type=\"text\" id=\"input1-group2\" name=\"input1-group2\" class=\"form-control\" placeholder=\"Mot de passe\">\n                </div>\n              </div>\n            </div>\n\n            <div class=\"form-group row\">\n              <div class=\"col-md-12\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"><i class=\"fa fa-calendar\"></i></span>\n                  </div>\n                  <input type=\"text\" id=\"input1-group3\" name=\"input1-group3\" class=\"form-control\" placeholder=\"Date de naissance\">\n                </div>\n              </div>\n\n\n\n\n\n\n\n\n\n\n            </div>\n            <div class=\"form-group row\">\n\n              <div class=\"col-md-9 col-form-label\">\n                <div class=\"form-check\">\n                  <input class=\"form-check-input\" id=\"check1\" type=\"checkbox\" value=\"\">\n                  <label class=\"form-check-label\" for=\"check1\">J'accepte les CG Robbin</label>\n                </div>\n\n              </div>\n            </div>\n\n\n\n            <button type=\"submit\" class=\"btn btn-sm btn-primary btn-block\"><i class=\"fa fa-dot-circle-o\"></i> Créer mon compte</button>\n\n\n\n          </form>\n        </div>\n\n      </div>\n\n    </div><!--/.col-->\n  </div><!--/.row-->\n\n</div>\n"

/***/ }),

/***/ "./src/app/views/base/forms.component.ts":
/*!***********************************************!*\
  !*** ./src/app/views/base/forms.component.ts ***!
  \***********************************************/
/*! exports provided: FormsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormsComponent", function() { return FormsComponent; });
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

var FormsComponent = /** @class */ (function () {
    function FormsComponent() {
        this.isCollapsed = false;
        this.iconCollapse = "icon-arrow-up";
    }
    FormsComponent.prototype.collapsed = function (event) {
        // console.log(event);
    };
    FormsComponent.prototype.expanded = function (event) {
        // console.log(event);
    };
    FormsComponent.prototype.toggleCollapse = function () {
        this.isCollapsed = !this.isCollapsed;
        this.iconCollapse = this.isCollapsed ? "icon-arrow-down" : "icon-arrow-up";
    };
    FormsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./forms.component.html */ "./src/app/views/base/forms.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], FormsComponent);
    return FormsComponent;
}());



/***/ }),

/***/ "./src/app/views/base/paginations.component.html":
/*!*******************************************************!*\
  !*** ./src/app/views/base/paginations.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Bootstrap Pagination\r\n      <div class=\"card-header-actions\">\r\n        <a href=\"https://valor-software.com/ngx-bootstrap/#/pagination\" target=\"_blank\">\r\n          <small className=\"text-muted\">docs</small>\r\n        </a>\r\n      </div>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <div class=\"row\">\r\n        <div class=\"col-xs-12 col-12 d-sm-down-none\">\r\n          <pagination [totalItems]=\"totalItems\" [(ngModel)]=\"currentPage\" (pageChanged)=\"pageChanged($event)\"></pagination>\r\n        </div>\r\n        <div class=\"col-xs-12 col-12\">\r\n          <pagination [boundaryLinks]=\"true\" [totalItems]=\"totalItems\" [(ngModel)]=\"currentPage\" class=\"pagination-sm\" [maxSize]=\"6\"\r\n                      previousText=\"&lsaquo;\" nextText=\"&rsaquo;\" firstText=\"&laquo;\" lastText=\"&raquo;\"></pagination>\r\n        </div>\r\n        <div class=\"col-xs-12 col-12 d-sm-down-none\">\r\n          <pagination [directionLinks]=\"false\" [boundaryLinks]=\"true\" [totalItems]=\"totalItems\"\r\n                      [(ngModel)]=\"currentPage\"></pagination>\r\n        </div>\r\n        <div class=\"col-xs-12 col-12\">\r\n          <pagination [directionLinks]=\"false\" [totalItems]=\"totalItems\" [(ngModel)]=\"currentPage\"\r\n                      (numPages)=\"smallnumPages = $event\"></pagination>\r\n        </div>\r\n      </div>\r\n      <pre class=\"card card-body card-header mb-3\">The selected page no: {{currentPage}}/{{smallnumPages}}</pre>\r\n    </div>\r\n    <div class=\"card-footer\">\r\n      <button type=\"button\" class=\"btn btn-info\" (click)=\"setPage(3)\">Set current page to: 3</button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Pagination <small>states & limits</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <div class=\"row\">\r\n        <div class=\"col-xs-12 col-12\">\r\n          <pagination [totalItems]=\"bigTotalItems\" [(ngModel)]=\"bigCurrentPage\" [maxSize]=\"maxSize\" class=\"pagination-sm\"\r\n                      previousText=\"&lsaquo;\" nextText=\"&rsaquo;\" [boundaryLinks]=\"true\"></pagination>\r\n        </div>\r\n\r\n        <div class=\"col-xs-12 col-12\">\r\n          <pagination [totalItems]=\"bigTotalItems\" [(ngModel)]=\"bigCurrentPage\" [maxSize]=\"maxSize\" class=\"pagination-sm\"\r\n                      previousText=\"&lsaquo;\" nextText=\"&rsaquo;\" firstText=\"&laquo;\" lastText=\"&raquo;\"\r\n                      [boundaryLinks]=\"true\" [rotate]=\"false\" (numPages)=\"numPages = $event\"></pagination>\r\n        </div>\r\n      </div>\r\n      <pre class=\"card card-body card-header\">Page: {{bigCurrentPage}} / {{numPages}}</pre>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Pager\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <div class=\"row\">\r\n        <div class=\"col-xs-12 col-12 col-md-6\">\r\n          <pagination\r\n            [directionLinks]=\"false\"\r\n            [totalItems]=\"totalItems\"\r\n            [(ngModel)]=\"currentPager\"\r\n            (numPages)=\"smallnumPages = $event\">\r\n          </pagination>\r\n        </div>\r\n\r\n        <div class=\"col-xs-12 col-12 col-md-6\">\r\n          <pager\r\n            [totalItems]=\"totalItems\"\r\n            [(ngModel)]=\"currentPager\"\r\n            (pageChanged)=\"pageChanged($event)\"\r\n            pageBtnClass=\"btn\"\r\n            [itemsPerPage]=\"10\"\r\n            class=\"pull-left\">\r\n          </pager>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/base/paginations.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/base/paginations.component.ts ***!
  \*****************************************************/
/*! exports provided: PaginationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginationsComponent", function() { return PaginationsComponent; });
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

var PaginationsComponent = /** @class */ (function () {
    function PaginationsComponent() {
        this.totalItems = 64;
        this.currentPage = 4;
        this.smallnumPages = 0;
        this.maxSize = 5;
        this.bigTotalItems = 675;
        this.bigCurrentPage = 1;
        this.numPages = 0;
        this.currentPager = 4;
    }
    PaginationsComponent.prototype.setPage = function (pageNo) {
        this.currentPage = pageNo;
    };
    PaginationsComponent.prototype.pageChanged = function (event) {
        console.log('Page changed to: ' + event.page);
        console.log('Number items per page: ' + event.itemsPerPage);
    };
    PaginationsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./paginations.component.html */ "./src/app/views/base/paginations.component.html"),
            styles: ['.pager li.btn:active { box-shadow: none; }'],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [])
    ], PaginationsComponent);
    return PaginationsComponent;
}());



/***/ }),

/***/ "./src/app/views/base/popovers.component.html":
/*!****************************************************!*\
  !*** ./src/app/views/base/popovers.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Bootstrap Popover\r\n      <div class=\"card-header-actions\">\r\n        <a href=\"https://valor-software.com/ngx-bootstrap/#/popover\" target=\"_blank\">\r\n          <small className=\"text-muted\">docs</small>\r\n        </a>\r\n      </div>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <button type=\"button\" class=\"btn btn-primary\"\r\n              popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\">\r\n        Live demo\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Popover\r\n      <small>positioning</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\r\n              popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              popoverTitle=\"Popover on top\"\r\n              placement=\"top\">\r\n        Popover on top\r\n      </button>\r\n\r\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\r\n              popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              popoverTitle=\"Popover on right\"\r\n              placement=\"right\">\r\n        Popover on right\r\n      </button>\r\n\r\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\r\n              popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              popoverTitle=\"Popover auto\"\r\n              placement=\"auto\">\r\n        Popover auto\r\n      </button>\r\n\r\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\r\n              popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              popoverTitle=\"Popover on left\"\r\n              placement=\"left\">\r\n        Popover on left\r\n      </button>\r\n\r\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\r\n              popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              popoverTitle=\"Popover on bottom\"\r\n              placement=\"bottom\">\r\n        Popover on bottom\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Popover\r\n      <small><code>focus</code> trigger</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <button type=\"button\" class=\"btn btn-success\"\r\n              popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              popoverTitle=\"Dismissible popover\"\r\n              triggers=\"focus\">\r\n        Dismissible popover\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Popover\r\n      <small>dynamic content</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <button type=\"button\" class=\"btn btn-info\"\r\n              [popover]=\"content\" [popoverTitle]=\"title\">\r\n        Simple binding\r\n      </button>\r\n\r\n      <ng-template #popTemplate>Just another: {{content}}</ng-template>\r\n      <button type=\"button\" class=\"btn btn-warning\"\r\n              [popover]=\"popTemplate\" popoverTitle=\"Template ref content inside\">\r\n        TemplateRef binding\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Popover\r\n      <small>dynamic HTML</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <ng-template #popTemplateHtml>Here we go:\r\n        <div [innerHtml]=\"html\"></div>\r\n      </ng-template>\r\n      <button type=\"button\" class=\"btn btn-success\"\r\n              [popover]=\"popTemplateHtml\" popoverTitle=\"Dynamic html inside\">\r\n        Show me popover with html\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Popover\r\n      <small>append to <code>body</code></small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <div class=\"row panel\" style=\"position: relative; overflow: hidden;\">\r\n        <div class=\"card-body panel-body\">\r\n          <button type=\"button\" class=\"btn btn-danger\"\r\n                  popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\">\r\n            Default popover\r\n          </button>\r\n          <button type=\"button\" class=\"btn btn-success\"\r\n                  popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n                  container=\"body\">\r\n            Popover appended to body\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Popover\r\n      <small>custom triggers</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <button type=\"button\" class=\"btn btn-info\"\r\n              popover=\"I will hide on blur\"\r\n              triggers=\"mouseenter:mouseleave\">\r\n        Hover over me!\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Popover\r\n      <small>manual triggering</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <p>\r\n        <span popover=\"Hello there! I was triggered manually\"\r\n              triggers=\"\" #pop=\"bs-popover\">\r\n        This text has attached popover\r\n        </span>\r\n      </p>\r\n      <button type=\"button\" class=\"btn btn-success\" (click)=\"pop.show()\">\r\n        Show\r\n      </button>\r\n      <button type=\"button\" class=\"btn btn-warning\" (click)=\"pop.hide()\">\r\n        Hide\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/base/popovers.component.ts":
/*!**************************************************!*\
  !*** ./src/app/views/base/popovers.component.ts ***!
  \**************************************************/
/*! exports provided: PopoversComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopoversComponent", function() { return PopoversComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PopoversComponent = /** @class */ (function () {
    function PopoversComponent(sanitizer) {
        this.title = 'Welcome word';
        this.content = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';
        this.html = "<span class=\"btn btn-warning\">Never trust not sanitized <code>HTML</code>!!!</span>";
        this.html = sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_0__["SecurityContext"].HTML, this.html);
    }
    PopoversComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./popovers.component.html */ "./src/app/views/base/popovers.component.html")
        }),
        __metadata("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"]])
    ], PopoversComponent);
    return PopoversComponent;
}());



/***/ }),

/***/ "./src/app/views/base/progress.component.html":
/*!****************************************************!*\
  !*** ./src/app/views/base/progress.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Bootstrap Progress\r\n      <div class=\"card-header-actions\">\r\n        <a href=\"https://valor-software.com/ngx-bootstrap/#/progressbar\" target=\"_blank\">\r\n          <small className=\"text-muted\">docs</small>\r\n        </a>\r\n      </div>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <div class=\"row\">\r\n        <div class=\"col-sm-4\">\r\n          <progressbar class=\"progress\" [value]=\"55\" [max]=\"100\"></progressbar>\r\n        </div>\r\n        <div class=\"col-sm-4\">\r\n          <progressbar class=\"progress progress-striped\" [value]=\"22\" [max]=\"100\" type=\"warning\">22%</progressbar>\r\n        </div>\r\n        <div class=\"col-sm-4\">\r\n          <progressbar class=\"progress progress-striped active\" [max]=\"200\" [value]=\"166\" type=\"danger\"><i>166 / 200</i></progressbar>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Progress <small>dynamic</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <progressbar class=\"progress progress-striped progress-animated\" [max]=\"max\" [value]=\"dynamic\">\r\n        <span style=\"color:white; white-space:nowrap;\">{{dynamic}} / {{max}}</span>\r\n      </progressbar>\r\n\r\n      <small><em>No animation</em></small>\r\n      <progressbar class=\"progress progress-success\" [value]=\"dynamic\" [max]=\"100\" type=\"success\"><b>{{dynamic}}%</b></progressbar>\r\n\r\n      <small><em>Object (changes type based on value)</em></small>\r\n      <progressbar class=\"progress-bar progress-bar-striped progress-bar-animated\" [value]=\"dynamic\" [max]=\"max\" [type]=\"type\">\r\n        {{type}} <i *ngIf=\"showWarning\">!!! Watch out !!!</i>\r\n      </progressbar>\r\n      <br>\r\n      <button type=\"button\" class=\"btn btn-sm btn-primary\" (click)=\"random()\">Randomize</button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Progress <small>stacked</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <div class=\"row col-lg-12\">\r\n        <progressbar class=\"progress\" [value]=\"stacked\" [max]=\"100\"></progressbar>\r\n      </div>\r\n      <br>\r\n      <div class=\"row col-md-12\">\r\n        <button type=\"button\" class=\"btn btn-sm btn-primary\" (click)=\"randomize()\">{{buttonCaption}} randomize</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/base/progress.component.ts":
/*!**************************************************!*\
  !*** ./src/app/views/base/progress.component.ts ***!
  \**************************************************/
/*! exports provided: ProgressComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressComponent", function() { return ProgressComponent; });
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

var ProgressComponent = /** @class */ (function () {
    function ProgressComponent() {
        this.max = 200;
        this.stacked = [];
        this.timer = null;
        this.buttonCaption = 'Start';
        this.random();
        this.randomStacked();
    }
    ProgressComponent.prototype.ngOnDestroy = function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
        // console.log(`onDestroy`, this.timer);
    };
    ProgressComponent.prototype.random = function () {
        var value = Math.floor(Math.random() * 100 + 1);
        var type;
        if (value < 25) {
            type = 'success';
        }
        else if (value < 50) {
            type = 'info';
        }
        else if (value < 75) {
            type = 'warning';
        }
        else {
            type = 'danger';
        }
        this.showWarning = type === 'danger' || type === 'warning';
        this.dynamic = value;
        this.type = type;
    };
    ProgressComponent.prototype.randomStacked = function () {
        var types = ['success', 'info', 'warning', 'danger'];
        this.stacked = [];
        var n = Math.floor(Math.random() * 4 + 1);
        for (var i = 0; i < n; i++) {
            var index = Math.floor(Math.random() * 4);
            var value = Math.floor(Math.random() * 27 + 3);
            this.stacked.push({
                value: value,
                type: types[index],
                label: value + ' %'
            });
        }
    };
    ProgressComponent.prototype.randomize = function () {
        var _this = this;
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        else {
            this.timer = setInterval(function () { return _this.randomStacked(); }, 2000);
        }
        this.buttonCaption = this.timer ? 'Stop' : 'Start';
    };
    ProgressComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./progress.component.html */ "./src/app/views/base/progress.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], ProgressComponent);
    return ProgressComponent;
}());



/***/ }),

/***/ "./src/app/views/base/switches.component.html":
/*!****************************************************!*\
  !*** ./src/app/views/base/switches.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          3d Switch\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-3d switch-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-3d switch-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-3d switch-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-3d switch-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-3d switch-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-3d switch-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch default\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch default - pills\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-pill switch-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch outline\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-outline-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-outline-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-outline-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-outline-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-outline-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-outline-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch outline - pills\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-pill switch-outline-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-outline-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-outline-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-outline-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-outline-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-outline-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch outline alternative\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-outline-primary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-outline-secondary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-outline-success-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-outline-warning-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-outline-info-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-outline-danger-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch outline alternative - pills\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-pill switch-outline-primary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-outline-secondary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-outline-success-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-outline-warning-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-outline-info-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-outline-danger-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with text\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-label switch-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with text - pills\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-label switch-pill switch-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with text outline\r\n        </div>\r\n        <div class=\"card-body\">\r\n\r\n          <label class=\"switch switch-label switch-outline-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with text outline - pills\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-label switch-pill switch-outline-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with text outline alternative\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-label switch-outline-primary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-secondary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-success-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-warning-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-info-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-danger-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with text outline alternative - pills\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-label switch-pill switch-outline-primary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-secondary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-success-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-warning-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-info-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-danger-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with icon\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-label switch-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with icon - pills\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-label switch-pill switch-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with icon outline\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-label switch-outline-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with icon outline - pills\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-label switch-pill switch-outline-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with icon outline alternative\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-label switch-outline-primary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-secondary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-success-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-warning-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-info-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-danger-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with icon outline alternative - pills\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-label switch-pill switch-outline-primary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-secondary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-success-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-warning-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-info-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-danger-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-12\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Sizes\r\n        </div>\r\n        <div class=\"card-body p-0\">\r\n          <table class=\"table table-hover table-striped table-align-middle mb-0\">\r\n            <thead>\r\n              <th>Size</th>\r\n              <th>Example</th>\r\n              <th>CSS Class</th>\r\n            </thead>\r\n            <tbody>\r\n              <tr>\r\n                <td>\r\n                  Large\r\n                </td>\r\n                <td>\r\n                  <label class=\"switch switch-lg switch-3d switch-primary\">\r\n                    <input type=\"checkbox\" class=\"switch-input\" checked>\r\n                    <span class=\"switch-slider\"></span>\r\n                  </label>\r\n                </td>\r\n                <td>\r\n                  Add following class <code>.switch-lg</code>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>\r\n                  Normal\r\n                </td>\r\n                <td>\r\n                  <label class=\"switch switch-3d switch-primary\">\r\n                    <input type=\"checkbox\" class=\"switch-input\" checked>\r\n                    <span class=\"switch-slider\"></span>\r\n                  </label>\r\n                </td>\r\n                <td>\r\n                  -\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>\r\n                  Small\r\n                </td>\r\n                <td>\r\n                  <label class=\"switch switch-sm switch-3d switch-primary\">\r\n                    <input type=\"checkbox\" class=\"switch-input\" checked>\r\n                    <span class=\"switch-slider\"></span>\r\n                  </label>\r\n                </td>\r\n                <td>\r\n                  Add following class <code>.switch-sm</code>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/base/switches.component.ts":
/*!**************************************************!*\
  !*** ./src/app/views/base/switches.component.ts ***!
  \**************************************************/
/*! exports provided: SwitchesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwitchesComponent", function() { return SwitchesComponent; });
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

var SwitchesComponent = /** @class */ (function () {
    function SwitchesComponent() {
    }
    SwitchesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./switches.component.html */ "./src/app/views/base/switches.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], SwitchesComponent);
    return SwitchesComponent;
}());



/***/ }),

/***/ "./src/app/views/base/tables.component.html":
/*!**************************************************!*\
  !*** ./src/app/views/base/tables.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-align-justify\"></i> Simple Table\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <table class=\"table\">\r\n            <thead>\r\n              <tr>\r\n                <th>Username</th>\r\n                <th>Date registered</th>\r\n                <th>Role</th>\r\n                <th>Status</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr>\r\n                <td>Samppa Nori</td>\r\n                <td>2012/01/01</td>\r\n                <td>Member</td>\r\n                <td>\r\n                  <span class=\"badge badge-success\">Active</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Estavan Lykos</td>\r\n                <td>2012/02/01</td>\r\n                <td>Staff</td>\r\n                <td>\r\n                  <span class=\"badge badge-danger\">Banned</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Chetan Mohamed</td>\r\n                <td>2012/02/01</td>\r\n                <td>Admin</td>\r\n                <td>\r\n                  <span class=\"badge badge-secondary\">Inactive</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Derick Maximinus</td>\r\n                <td>2012/03/01</td>\r\n                <td>Member</td>\r\n                <td>\r\n                  <span class=\"badge badge-warning\">Pending</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Friderik Dávid</td>\r\n                <td>2012/01/21</td>\r\n                <td>Staff</td>\r\n                <td>\r\n                  <span class=\"badge badge-success\">Active</span>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n          <ul class=\"pagination\">\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\r\n            <li class=\"page-item active\">\r\n              <a class=\"page-link\" href=\"#\">1</a>\r\n            </li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!--/.col-->\r\n    <div class=\"col-lg-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-align-justify\"></i> Striped Table\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <table class=\"table table-striped\">\r\n            <thead>\r\n              <tr>\r\n                <th>Username</th>\r\n                <th>Date registered</th>\r\n                <th>Role</th>\r\n                <th>Status</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr>\r\n                <td>Yiorgos Avraamu</td>\r\n                <td>2012/01/01</td>\r\n                <td>Member</td>\r\n                <td>\r\n                  <span class=\"badge badge-success\">Active</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Avram Tarasios</td>\r\n                <td>2012/02/01</td>\r\n                <td>Staff</td>\r\n                <td>\r\n                  <span class=\"badge badge-danger\">Banned</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Quintin Ed</td>\r\n                <td>2012/02/01</td>\r\n                <td>Admin</td>\r\n                <td>\r\n                  <span class=\"badge badge-secondary\">Inactive</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Enéas Kwadwo</td>\r\n                <td>2012/03/01</td>\r\n                <td>Member</td>\r\n                <td>\r\n                  <span class=\"badge badge-warning\">Pending</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Agapetus Tadeáš</td>\r\n                <td>2012/01/21</td>\r\n                <td>Staff</td>\r\n                <td>\r\n                  <span class=\"badge badge-success\">Active</span>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n          <ul class=\"pagination\">\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\r\n            <li class=\"page-item active\">\r\n              <a class=\"page-link\" href=\"#\">1</a>\r\n            </li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!--/.col-->\r\n  </div>\r\n  <!--/.row-->\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-align-justify\"></i> Condensed Table\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <table class=\"table table-sm\">\r\n            <thead>\r\n              <tr>\r\n                <th>Username</th>\r\n                <th>Date registered</th>\r\n                <th>Role</th>\r\n                <th>Status</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr>\r\n                <td>Carwyn Fachtna</td>\r\n                <td>2012/01/01</td>\r\n                <td>Member</td>\r\n                <td>\r\n                  <span class=\"badge badge-success\">Active</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Nehemiah Tatius</td>\r\n                <td>2012/02/01</td>\r\n                <td>Staff</td>\r\n                <td>\r\n                  <span class=\"badge badge-danger\">Banned</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Ebbe Gemariah</td>\r\n                <td>2012/02/01</td>\r\n                <td>Admin</td>\r\n                <td>\r\n                  <span class=\"badge badge-secondary\">Inactive</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Eustorgios Amulius</td>\r\n                <td>2012/03/01</td>\r\n                <td>Member</td>\r\n                <td>\r\n                  <span class=\"badge badge-warning\">Pending</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Leopold Gáspár</td>\r\n                <td>2012/01/21</td>\r\n                <td>Staff</td>\r\n                <td>\r\n                  <span class=\"badge badge-success\">Active</span>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n          <ul class=\"pagination\">\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\r\n            <li class=\"page-item active\">\r\n              <a class=\"page-link\" href=\"#\">1</a>\r\n            </li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!--/.col-->\r\n    <div class=\"col-lg-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-align-justify\"></i> Bordered Table\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <table class=\"table table-bordered\">\r\n            <thead>\r\n              <tr>\r\n                <th>Username</th>\r\n                <th>Date registered</th>\r\n                <th>Role</th>\r\n                <th>Status</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr>\r\n                <td>Pompeius René</td>\r\n                <td>2012/01/01</td>\r\n                <td>Member</td>\r\n                <td>\r\n                  <span class=\"badge badge-success\">Active</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Paĉjo Jadon</td>\r\n                <td>2012/02/01</td>\r\n                <td>Staff</td>\r\n                <td>\r\n                  <span class=\"badge badge-danger\">Banned</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Micheal Mercurius</td>\r\n                <td>2012/02/01</td>\r\n                <td>Admin</td>\r\n                <td>\r\n                  <span class=\"badge badge-secondary\">Inactive</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Ganesha Dubhghall</td>\r\n                <td>2012/03/01</td>\r\n                <td>Member</td>\r\n                <td>\r\n                  <span class=\"badge badge-warning\">Pending</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Hiroto Šimun</td>\r\n                <td>2012/01/21</td>\r\n                <td>Staff</td>\r\n                <td>\r\n                  <span class=\"badge badge-success\">Active</span>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n          <ul class=\"pagination\">\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\r\n            <li class=\"page-item active\">\r\n              <a class=\"page-link\" href=\"#\">1</a>\r\n            </li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!--/.col-->\r\n  </div>\r\n  <!--/.row-->\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-12\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-align-justify\"></i> Combined All Table\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <table class=\"table table-bordered table-striped table-sm\">\r\n            <thead>\r\n              <tr>\r\n                <th>Username</th>\r\n                <th>Date registered</th>\r\n                <th>Role</th>\r\n                <th>Status</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr>\r\n                <td>Vishnu Serghei</td>\r\n                <td>2012/01/01</td>\r\n                <td>Member</td>\r\n                <td>\r\n                  <span class=\"badge badge-success\">Active</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Zbyněk Phoibos</td>\r\n                <td>2012/02/01</td>\r\n                <td>Staff</td>\r\n                <td>\r\n                  <span class=\"badge badge-danger\">Banned</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Einar Randall</td>\r\n                <td>2012/02/01</td>\r\n                <td>Admin</td>\r\n                <td>\r\n                  <span class=\"badge badge-secondary\">Inactive</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Félix Troels</td>\r\n                <td>2012/03/01</td>\r\n                <td>Member</td>\r\n                <td>\r\n                  <span class=\"badge badge-warning\">Pending</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Aulus Agmundr</td>\r\n                <td>2012/01/21</td>\r\n                <td>Staff</td>\r\n                <td>\r\n                  <span class=\"badge badge-success\">Active</span>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n          <nav>\r\n            <ul class=\"pagination\">\r\n              <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\r\n              <li class=\"page-item active\">\r\n                <a class=\"page-link\" href=\"#\">1</a>\r\n              </li>\r\n              <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\r\n              <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\r\n              <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\r\n              <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\r\n            </ul>\r\n          </nav>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!--/.col-->\r\n  </div>\r\n  <!--/.row-->\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/base/tables.component.ts":
/*!************************************************!*\
  !*** ./src/app/views/base/tables.component.ts ***!
  \************************************************/
/*! exports provided: TablesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TablesComponent", function() { return TablesComponent; });
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

var TablesComponent = /** @class */ (function () {
    function TablesComponent() {
    }
    TablesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./tables.component.html */ "./src/app/views/base/tables.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], TablesComponent);
    return TablesComponent;
}());



/***/ }),

/***/ "./src/app/views/base/tabs.component.html":
/*!************************************************!*\
  !*** ./src/app/views/base/tabs.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"row\">\r\n    <div class=\"col-md-6 mb-4\">\r\n      <!-- Nav tabs -->\r\n      <tabset>\r\n        <tab heading=\"Home\">\r\n          1. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n        <tab heading=\"Profile\">\r\n          2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n        <tab heading=\"Messages\">\r\n          3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n      </tabset>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6 mb-4\">\r\n      <!-- Nav tabs -->\r\n      <tabset>\r\n        <tab>\r\n          <ng-template tabHeading><i class=\"icon-calculator\"></i></ng-template>\r\n          2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n        <tab>\r\n          <ng-template tabHeading><i class=\"icon-basket-loaded\"></i></ng-template>\r\n          3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n        <tab>\r\n          <ng-template tabHeading><i class=\"icon-pie-chart\"></i></ng-template>\r\n          4. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n      </tabset>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6 mb-4\">\r\n      <!-- Nav tabs -->\r\n      <tabset>\r\n        <tab>\r\n          <ng-template tabHeading><i class=\"icon-calculator\"></i> Calculator</ng-template>\r\n          2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n        <tab>\r\n          <ng-template tabHeading><i class=\"icon-basket-loaded\"></i> Shoping cart</ng-template>\r\n          3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n        <tab>\r\n          <ng-template tabHeading><i class=\"icon-pie-chart\"></i> Charts</ng-template>\r\n          4. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n      </tabset>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6 mb-4\">\r\n      <!-- Nav tabs -->\r\n      <tabset>\r\n        <tab>\r\n          <ng-template tabHeading><i class=\"icon-list\"></i> Menu &nbsp;<span class=\"badge badge-success\">New</span></ng-template>\r\n          1. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n        <tab>\r\n          <ng-template tabHeading><i class=\"icon-calculator\"></i> Calculator &nbsp;<span class=\"badge badge-pill badge-danger\">29</span></ng-template>\r\n          2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n        <tab>\r\n          <ng-template tabHeading><i class=\"icon-pie-chart\"></i> Charts</ng-template>\r\n          4. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n      </tabset>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/base/tabs.component.ts":
/*!**********************************************!*\
  !*** ./src/app/views/base/tabs.component.ts ***!
  \**********************************************/
/*! exports provided: TabsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsComponent", function() { return TabsComponent; });
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

var TabsComponent = /** @class */ (function () {
    function TabsComponent() {
    }
    TabsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./tabs.component.html */ "./src/app/views/base/tabs.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], TabsComponent);
    return TabsComponent;
}());



/***/ }),

/***/ "./src/app/views/base/tooltips.component.html":
/*!****************************************************!*\
  !*** ./src/app/views/base/tooltips.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Bootstrap Tooltips\r\n      <div class=\"card-header-actions\">\r\n        <a href=\"https://valor-software.com/ngx-bootstrap/#/tooltip\" target=\"_blank\">\r\n          <small className=\"text-muted\">docs</small>\r\n        </a>\r\n      </div>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <button type=\"button\" class=\"btn btn-primary\"\r\n              tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\">\r\n        Simple demo\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Tooltips <small>positioning</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\r\n              tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              placement=\"top\">\r\n        Tooltip on top\r\n      </button>\r\n\r\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\r\n              tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              placement=\"right\">\r\n        Tooltip on right\r\n      </button>\r\n\r\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\r\n              tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              placement=\"auto\">\r\n        Tooltip auto\r\n      </button>\r\n\r\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\r\n              tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              placement=\"left\">\r\n        Tooltip on left\r\n      </button>\r\n\r\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\r\n              tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              placement=\"bottom\">\r\n        Tooltip on bottom\r\n      </button>\r\n    </div>\r\n</div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Tooltips <small>dismissible</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <button type=\"button\" class=\"btn btn-success\"\r\n              tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              triggers=\"focus\">\r\n        Dismissible tooltip\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Tooltips <small>dynamic content</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <button type=\"button\" class=\"btn btn-info\" [tooltip]=\"content\">\r\n        Simple binding\r\n      </button>\r\n\r\n      <ng-template #tolTemplate>Just another: {{content}}</ng-template>\r\n      <button type=\"button\" class=\"btn btn-warning\" [tooltip]=\"tolTemplate\">\r\n        TemplateRef binding\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Tooltips <small>dynamic html</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <ng-template #popTemplate>Here we go: <div [innerHtml]=\"html\"></div></ng-template>\r\n      <button type=\"button\" class=\"btn btn-success\"\r\n              [tooltip]=\"popTemplate\">\r\n        Show me tooltip with html\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Tooltips <small>append to <code>body</code></small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <div class=\"row\" style=\"position: relative; overflow: hidden; padding-top: 10px;\">\r\n        <div class=\"col-xs-12 col-12\">\r\n          <button type=\"button\" class=\"btn btn-danger\"\r\n                  tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\">\r\n            Default tooltip\r\n          </button>\r\n          <button type=\"button\" class=\"btn btn-success\"\r\n                  tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n                  container=\"body\">\r\n            Tooltip appended to body\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Tooltips <small>custom triggers</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <div class=\"row\">\r\n        <div class=\"col-xs-6 col-6\">\r\n          <p>Desktop</p>\r\n          <button type=\"button\" class=\"btn btn-info\"\r\n                  tooltip=\"I will hide on click\"\r\n                  triggers=\"mouseenter:click\">\r\n            Hover over me!\r\n          </button>\r\n        </div>\r\n\r\n        <div class=\"col-xs-6 col-6\">\r\n          <p>Mobile</p>\r\n          <button type=\"button\" class=\"btn btn-info\"\r\n                  tooltip=\"I will hide on click\"\r\n                  triggers=\"click\">\r\n            Click on me!\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Tooltips <small>manual triggers</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <p>\r\n  <span tooltip=\"Hello there! I was triggered manually\"\r\n        triggers=\"\" #pop=\"bs-tooltip\">\r\n  This text has attached tooltip\r\n  </span>\r\n      </p>\r\n\r\n      <button type=\"button\" class=\"btn btn-success\" (click)=\"pop.show()\">\r\n        Show\r\n      </button>\r\n      <button type=\"button\" class=\"btn btn-warning\" (click)=\"pop.hide()\">\r\n        Hide\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/base/tooltips.component.ts":
/*!**************************************************!*\
  !*** ./src/app/views/base/tooltips.component.ts ***!
  \**************************************************/
/*! exports provided: TooltipsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipsComponent", function() { return TooltipsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TooltipsComponent = /** @class */ (function () {
    function TooltipsComponent(sanitizer) {
        this.content = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';
        this.html = "<span class=\"btn btn-danger\">Never trust not sanitized HTML!!!</span>";
        this.html = sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_0__["SecurityContext"].HTML, this.html);
    }
    TooltipsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./tooltips.component.html */ "./src/app/views/base/tooltips.component.html")
        }),
        __metadata("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"]])
    ], TooltipsComponent);
    return TooltipsComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-base-base-module.js.map