import { r as registerInstance, h, c as getElement } from './core-d8415857.js';
import { c as createCommonjsModule } from './_commonjsHelpers-91036208.js';

var hammer = createCommonjsModule(function (module) {
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined$1) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined$1) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined$1 || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined$1 && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined$1)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined$1 : undefined$1, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined$1) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined$1;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined$1;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined$1)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined$1;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined$1) {
            return;
        }
        if (handler === undefined$1) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined$1) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (typeof undefined$1 === 'function' && undefined$1.amd) {
    undefined$1(function() {
        return Hammer;
    });
} else if ('object' != 'undefined' && module.exports) {
    module.exports = Hammer;
} else {
    window[exportName] = Hammer;
}

})(window, document, 'Hammer');
});

const RhSlidingMolecule = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.buttonsWidth = 0;
        this.messageDeltaX = 0;
        this.previousSliderDeltaX = 0;
    }
    componentDidLoad() {
        this.customHammerManager = new hammer.Manager(this.slider, {
            recognizers: [[hammer.Pan, { direction: hammer.DIRECTION_ALL }]]
        });
        this.customHammerManager.on('panstart', (event) => {
            this.isMoving = true;
            if (this.element.parentElement)
                this.element.parentElement.querySelectorAll('rh-sliding').forEach((value) => {
                    if (value !== this.element)
                        value.closeSlider();
                });
        });
        this.customHammerManager.on('panmove', (event) => {
            if (event.additionalEvent === 'panleft' || event.additionalEvent === 'panright') {
                this.messageDeltaX = this.previousSliderDeltaX + event.deltaX;
                if (this.messageDeltaX > 0)
                    this.messageDeltaX = 0;
            }
        });
        this.customHammerManager.on('panend', (event) => {
            const buttonsEndingPoint = this.buttonsWidth;
            const currentDeltaX = this.previousSliderDeltaX + event.deltaX;
            this.isMoving = false;
            this.isMovementHappened = true;
            this.messageDeltaX = currentDeltaX < -buttonsEndingPoint / 2 ? -buttonsEndingPoint : 0;
            this.previousSliderDeltaX = this.messageDeltaX;
        });
    }
    componentDidRender() {
        this.buttonsWidth = this.buttons.offsetWidth;
    }
    componentDidUnload() {
        this.customHammerManager.destroy();
    }
    manageStartClickOnMessage() {
        this.isMovementHappened = false;
        if (this.element.parentElement)
            this.element.parentElement.querySelectorAll('rh-sliding').forEach((value) => {
                if (value !== this.element)
                    value.closeSlider();
            });
    }
    manageEndClickOnMessage() {
        if (!this.isMovementHappened)
            this.closeSlider();
    }
    closeSlider(immediately) {
        if (immediately)
            this.isMoving = true;
        this.messageDeltaX = 0;
        this.previousSliderDeltaX = 0;
        return new Promise((resolve) => resolve());
    }
    render() {
        const sliderClasses = {
            'col-xs-6 slider-container': true,
            'animated': !this.isMoving,
            'open': !!this.messageDeltaX
        };
        return (h("div", { class: 'grid', title: ' ' }, h("div", { class: 'row' }, h("div", { ref: (el) => this.slider = el, class: sliderClasses, style: { left: this.messageDeltaX + 'px' }, onMouseDown: () => this.manageStartClickOnMessage(), onMouseUp: () => this.manageEndClickOnMessage() }, h("slot", { name: 'slider' })), h("div", { class: 'col-xs-6 buttons-container' }, h("div", { class: 'row end-xs', ref: (el) => this.buttons = el, style: { right: this.buttonsWidth + 'px' } }, h("slot", { name: 'buttons' }))))));
    }
    get element() { return getElement(this); }
    static get style() { return "\@charset \"UTF-8\";\nhtml,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\n\nbody {\n  line-height: 1;\n}\n\nol,\nul {\n  list-style: none;\n}\n\nblockquote,\nq {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after {\n  content: \"\";\n  content: none;\n}\n\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n.ion-ios-add:before {\n  content: \"\";\n}\n\n.ion-ios-add-circle:before {\n  content: \"\";\n}\n\n.ion-ios-add-circle-outline:before {\n  content: \"\";\n}\n\n.ion-ios-airplane:before {\n  content: \"\";\n}\n\n.ion-ios-alarm:before {\n  content: \"\";\n}\n\n.ion-ios-albums:before {\n  content: \"\";\n}\n\n.ion-ios-alert:before {\n  content: \"\";\n}\n\n.ion-ios-american-football:before {\n  content: \"\";\n}\n\n.ion-ios-analytics:before {\n  content: \"\";\n}\n\n.ion-ios-aperture:before {\n  content: \"\";\n}\n\n.ion-ios-apps:before {\n  content: \"\";\n}\n\n.ion-ios-appstore:before {\n  content: \"\";\n}\n\n.ion-ios-archive:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-back:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-down:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-dropdown:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-dropdown-circle:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-dropleft:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-dropleft-circle:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-dropright:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-dropright-circle:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-dropup:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-dropup-circle:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-forward:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-round-back:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-round-down:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-round-forward:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-round-up:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-up:before {\n  content: \"\";\n}\n\n.ion-ios-at:before {\n  content: \"\";\n}\n\n.ion-ios-attach:before {\n  content: \"\";\n}\n\n.ion-ios-backspace:before {\n  content: \"\";\n}\n\n.ion-ios-barcode:before {\n  content: \"\";\n}\n\n.ion-ios-baseball:before {\n  content: \"\";\n}\n\n.ion-ios-basket:before {\n  content: \"\";\n}\n\n.ion-ios-basketball:before {\n  content: \"\";\n}\n\n.ion-ios-battery-charging:before {\n  content: \"\";\n}\n\n.ion-ios-battery-dead:before {\n  content: \"\";\n}\n\n.ion-ios-battery-full:before {\n  content: \"\";\n}\n\n.ion-ios-beaker:before {\n  content: \"\";\n}\n\n.ion-ios-bed:before {\n  content: \"\";\n}\n\n.ion-ios-beer:before {\n  content: \"\";\n}\n\n.ion-ios-bicycle:before {\n  content: \"\";\n}\n\n.ion-ios-bluetooth:before {\n  content: \"\";\n}\n\n.ion-ios-boat:before {\n  content: \"\";\n}\n\n.ion-ios-body:before {\n  content: \"\";\n}\n\n.ion-ios-bonfire:before {\n  content: \"\";\n}\n\n.ion-ios-book:before {\n  content: \"\";\n}\n\n.ion-ios-bookmark:before {\n  content: \"\";\n}\n\n.ion-ios-bookmarks:before {\n  content: \"\";\n}\n\n.ion-ios-bowtie:before {\n  content: \"\";\n}\n\n.ion-ios-briefcase:before {\n  content: \"\";\n}\n\n.ion-ios-browsers:before {\n  content: \"\";\n}\n\n.ion-ios-brush:before {\n  content: \"\";\n}\n\n.ion-ios-bug:before {\n  content: \"\";\n}\n\n.ion-ios-build:before {\n  content: \"\";\n}\n\n.ion-ios-bulb:before {\n  content: \"\";\n}\n\n.ion-ios-bus:before {\n  content: \"\";\n}\n\n.ion-ios-business:before {\n  content: \"\";\n}\n\n.ion-ios-cafe:before {\n  content: \"\";\n}\n\n.ion-ios-calculator:before {\n  content: \"\";\n}\n\n.ion-ios-calendar:before {\n  content: \"\";\n}\n\n.ion-ios-call:before {\n  content: \"\";\n}\n\n.ion-ios-camera:before {\n  content: \"\";\n}\n\n.ion-ios-car:before {\n  content: \"\";\n}\n\n.ion-ios-card:before {\n  content: \"\";\n}\n\n.ion-ios-cart:before {\n  content: \"\";\n}\n\n.ion-ios-cash:before {\n  content: \"\";\n}\n\n.ion-ios-cellular:before {\n  content: \"\";\n}\n\n.ion-ios-chatboxes:before {\n  content: \"\";\n}\n\n.ion-ios-chatbubbles:before {\n  content: \"\";\n}\n\n.ion-ios-checkbox:before {\n  content: \"\";\n}\n\n.ion-ios-checkbox-outline:before {\n  content: \"\";\n}\n\n.ion-ios-checkmark:before {\n  content: \"\";\n}\n\n.ion-ios-checkmark-circle:before {\n  content: \"\";\n}\n\n.ion-ios-checkmark-circle-outline:before {\n  content: \"\";\n}\n\n.ion-ios-clipboard:before {\n  content: \"\";\n}\n\n.ion-ios-clock:before {\n  content: \"\";\n}\n\n.ion-ios-close:before {\n  content: \"\";\n}\n\n.ion-ios-close-circle:before {\n  content: \"\";\n}\n\n.ion-ios-close-circle-outline:before {\n  content: \"\";\n}\n\n.ion-ios-cloud:before {\n  content: \"\";\n}\n\n.ion-ios-cloud-circle:before {\n  content: \"\";\n}\n\n.ion-ios-cloud-done:before {\n  content: \"\";\n}\n\n.ion-ios-cloud-download:before {\n  content: \"\";\n}\n\n.ion-ios-cloud-outline:before {\n  content: \"\";\n}\n\n.ion-ios-cloud-upload:before {\n  content: \"\";\n}\n\n.ion-ios-cloudy:before {\n  content: \"\";\n}\n\n.ion-ios-cloudy-night:before {\n  content: \"\";\n}\n\n.ion-ios-code:before {\n  content: \"\";\n}\n\n.ion-ios-code-download:before {\n  content: \"\";\n}\n\n.ion-ios-code-working:before {\n  content: \"\";\n}\n\n.ion-ios-cog:before {\n  content: \"\";\n}\n\n.ion-ios-color-fill:before {\n  content: \"\";\n}\n\n.ion-ios-color-filter:before {\n  content: \"\";\n}\n\n.ion-ios-color-palette:before {\n  content: \"\";\n}\n\n.ion-ios-color-wand:before {\n  content: \"\";\n}\n\n.ion-ios-compass:before {\n  content: \"\";\n}\n\n.ion-ios-construct:before {\n  content: \"\";\n}\n\n.ion-ios-contact:before {\n  content: \"\";\n}\n\n.ion-ios-contacts:before {\n  content: \"\";\n}\n\n.ion-ios-contract:before {\n  content: \"\";\n}\n\n.ion-ios-contrast:before {\n  content: \"\";\n}\n\n.ion-ios-copy:before {\n  content: \"\";\n}\n\n.ion-ios-create:before {\n  content: \"\";\n}\n\n.ion-ios-crop:before {\n  content: \"\";\n}\n\n.ion-ios-cube:before {\n  content: \"\";\n}\n\n.ion-ios-cut:before {\n  content: \"\";\n}\n\n.ion-ios-desktop:before {\n  content: \"\";\n}\n\n.ion-ios-disc:before {\n  content: \"\";\n}\n\n.ion-ios-document:before {\n  content: \"\";\n}\n\n.ion-ios-done-all:before {\n  content: \"\";\n}\n\n.ion-ios-download:before {\n  content: \"\";\n}\n\n.ion-ios-easel:before {\n  content: \"\";\n}\n\n.ion-ios-egg:before {\n  content: \"\";\n}\n\n.ion-ios-exit:before {\n  content: \"\";\n}\n\n.ion-ios-expand:before {\n  content: \"\";\n}\n\n.ion-ios-eye:before {\n  content: \"\";\n}\n\n.ion-ios-eye-off:before {\n  content: \"\";\n}\n\n.ion-ios-fastforward:before {\n  content: \"\";\n}\n\n.ion-ios-female:before {\n  content: \"\";\n}\n\n.ion-ios-filing:before {\n  content: \"\";\n}\n\n.ion-ios-film:before {\n  content: \"\";\n}\n\n.ion-ios-finger-print:before {\n  content: \"\";\n}\n\n.ion-ios-fitness:before {\n  content: \"\";\n}\n\n.ion-ios-flag:before {\n  content: \"\";\n}\n\n.ion-ios-flame:before {\n  content: \"\";\n}\n\n.ion-ios-flash:before {\n  content: \"\";\n}\n\n.ion-ios-flash-off:before {\n  content: \"\";\n}\n\n.ion-ios-flashlight:before {\n  content: \"\";\n}\n\n.ion-ios-flask:before {\n  content: \"\";\n}\n\n.ion-ios-flower:before {\n  content: \"\";\n}\n\n.ion-ios-folder:before {\n  content: \"\";\n}\n\n.ion-ios-folder-open:before {\n  content: \"\";\n}\n\n.ion-ios-football:before {\n  content: \"\";\n}\n\n.ion-ios-funnel:before {\n  content: \"\";\n}\n\n.ion-ios-gift:before {\n  content: \"\";\n}\n\n.ion-ios-git-branch:before {\n  content: \"\";\n}\n\n.ion-ios-git-commit:before {\n  content: \"\";\n}\n\n.ion-ios-git-compare:before {\n  content: \"\";\n}\n\n.ion-ios-git-merge:before {\n  content: \"\";\n}\n\n.ion-ios-git-network:before {\n  content: \"\";\n}\n\n.ion-ios-git-pull-request:before {\n  content: \"\";\n}\n\n.ion-ios-glasses:before {\n  content: \"\";\n}\n\n.ion-ios-globe:before {\n  content: \"\";\n}\n\n.ion-ios-grid:before {\n  content: \"\";\n}\n\n.ion-ios-hammer:before {\n  content: \"\";\n}\n\n.ion-ios-hand:before {\n  content: \"\";\n}\n\n.ion-ios-happy:before {\n  content: \"\";\n}\n\n.ion-ios-headset:before {\n  content: \"\";\n}\n\n.ion-ios-heart:before {\n  content: \"\";\n}\n\n.ion-ios-heart-dislike:before {\n  content: \"\";\n}\n\n.ion-ios-heart-empty:before {\n  content: \"\";\n}\n\n.ion-ios-heart-half:before {\n  content: \"\";\n}\n\n.ion-ios-help:before {\n  content: \"\";\n}\n\n.ion-ios-help-buoy:before {\n  content: \"\";\n}\n\n.ion-ios-help-circle:before {\n  content: \"\";\n}\n\n.ion-ios-help-circle-outline:before {\n  content: \"\";\n}\n\n.ion-ios-home:before {\n  content: \"\";\n}\n\n.ion-ios-hourglass:before {\n  content: \"\";\n}\n\n.ion-ios-ice-cream:before {\n  content: \"\";\n}\n\n.ion-ios-image:before {\n  content: \"\";\n}\n\n.ion-ios-images:before {\n  content: \"\";\n}\n\n.ion-ios-infinite:before {\n  content: \"\";\n}\n\n.ion-ios-information:before {\n  content: \"\";\n}\n\n.ion-ios-information-circle:before {\n  content: \"\";\n}\n\n.ion-ios-information-circle-outline:before {\n  content: \"\";\n}\n\n.ion-ios-jet:before {\n  content: \"\";\n}\n\n.ion-ios-journal:before {\n  content: \"\";\n}\n\n.ion-ios-key:before {\n  content: \"\";\n}\n\n.ion-ios-keypad:before {\n  content: \"\";\n}\n\n.ion-ios-laptop:before {\n  content: \"\";\n}\n\n.ion-ios-leaf:before {\n  content: \"\";\n}\n\n.ion-ios-link:before {\n  content: \"\";\n}\n\n.ion-ios-list:before {\n  content: \"\";\n}\n\n.ion-ios-list-box:before {\n  content: \"\";\n}\n\n.ion-ios-locate:before {\n  content: \"\";\n}\n\n.ion-ios-lock:before {\n  content: \"\";\n}\n\n.ion-ios-log-in:before {\n  content: \"\";\n}\n\n.ion-ios-log-out:before {\n  content: \"\";\n}\n\n.ion-ios-magnet:before {\n  content: \"\";\n}\n\n.ion-ios-mail:before {\n  content: \"\";\n}\n\n.ion-ios-mail-open:before {\n  content: \"\";\n}\n\n.ion-ios-mail-unread:before {\n  content: \"\";\n}\n\n.ion-ios-male:before {\n  content: \"\";\n}\n\n.ion-ios-man:before {\n  content: \"\";\n}\n\n.ion-ios-map:before {\n  content: \"\";\n}\n\n.ion-ios-medal:before {\n  content: \"\";\n}\n\n.ion-ios-medical:before {\n  content: \"\";\n}\n\n.ion-ios-medkit:before {\n  content: \"\";\n}\n\n.ion-ios-megaphone:before {\n  content: \"\";\n}\n\n.ion-ios-menu:before {\n  content: \"\";\n}\n\n.ion-ios-mic:before {\n  content: \"\";\n}\n\n.ion-ios-mic-off:before {\n  content: \"\";\n}\n\n.ion-ios-microphone:before {\n  content: \"\";\n}\n\n.ion-ios-moon:before {\n  content: \"\";\n}\n\n.ion-ios-more:before {\n  content: \"\";\n}\n\n.ion-ios-move:before {\n  content: \"\";\n}\n\n.ion-ios-musical-note:before {\n  content: \"\";\n}\n\n.ion-ios-musical-notes:before {\n  content: \"\";\n}\n\n.ion-ios-navigate:before {\n  content: \"\";\n}\n\n.ion-ios-notifications:before {\n  content: \"\";\n}\n\n.ion-ios-notifications-off:before {\n  content: \"\";\n}\n\n.ion-ios-notifications-outline:before {\n  content: \"\";\n}\n\n.ion-ios-nuclear:before {\n  content: \"\";\n}\n\n.ion-ios-nutrition:before {\n  content: \"\";\n}\n\n.ion-ios-open:before {\n  content: \"\";\n}\n\n.ion-ios-options:before {\n  content: \"\";\n}\n\n.ion-ios-outlet:before {\n  content: \"\";\n}\n\n.ion-ios-paper:before {\n  content: \"\";\n}\n\n.ion-ios-paper-plane:before {\n  content: \"\";\n}\n\n.ion-ios-partly-sunny:before {\n  content: \"\";\n}\n\n.ion-ios-pause:before {\n  content: \"\";\n}\n\n.ion-ios-paw:before {\n  content: \"\";\n}\n\n.ion-ios-people:before {\n  content: \"\";\n}\n\n.ion-ios-person:before {\n  content: \"\";\n}\n\n.ion-ios-person-add:before {\n  content: \"\";\n}\n\n.ion-ios-phone-landscape:before {\n  content: \"\";\n}\n\n.ion-ios-phone-portrait:before {\n  content: \"\";\n}\n\n.ion-ios-photos:before {\n  content: \"\";\n}\n\n.ion-ios-pie:before {\n  content: \"\";\n}\n\n.ion-ios-pin:before {\n  content: \"\";\n}\n\n.ion-ios-pint:before {\n  content: \"\";\n}\n\n.ion-ios-pizza:before {\n  content: \"\";\n}\n\n.ion-ios-planet:before {\n  content: \"\";\n}\n\n.ion-ios-play:before {\n  content: \"\";\n}\n\n.ion-ios-play-circle:before {\n  content: \"\";\n}\n\n.ion-ios-podium:before {\n  content: \"\";\n}\n\n.ion-ios-power:before {\n  content: \"\";\n}\n\n.ion-ios-pricetag:before {\n  content: \"\";\n}\n\n.ion-ios-pricetags:before {\n  content: \"\";\n}\n\n.ion-ios-print:before {\n  content: \"\";\n}\n\n.ion-ios-pulse:before {\n  content: \"\";\n}\n\n.ion-ios-qr-scanner:before {\n  content: \"\";\n}\n\n.ion-ios-quote:before {\n  content: \"\";\n}\n\n.ion-ios-radio:before {\n  content: \"\";\n}\n\n.ion-ios-radio-button-off:before {\n  content: \"\";\n}\n\n.ion-ios-radio-button-on:before {\n  content: \"\";\n}\n\n.ion-ios-rainy:before {\n  content: \"\";\n}\n\n.ion-ios-recording:before {\n  content: \"\";\n}\n\n.ion-ios-redo:before {\n  content: \"\";\n}\n\n.ion-ios-refresh:before {\n  content: \"\";\n}\n\n.ion-ios-refresh-circle:before {\n  content: \"\";\n}\n\n.ion-ios-remove:before {\n  content: \"\";\n}\n\n.ion-ios-remove-circle:before {\n  content: \"\";\n}\n\n.ion-ios-remove-circle-outline:before {\n  content: \"\";\n}\n\n.ion-ios-reorder:before {\n  content: \"\";\n}\n\n.ion-ios-repeat:before {\n  content: \"\";\n}\n\n.ion-ios-resize:before {\n  content: \"\";\n}\n\n.ion-ios-restaurant:before {\n  content: \"\";\n}\n\n.ion-ios-return-left:before {\n  content: \"\";\n}\n\n.ion-ios-return-right:before {\n  content: \"\";\n}\n\n.ion-ios-reverse-camera:before {\n  content: \"\";\n}\n\n.ion-ios-rewind:before {\n  content: \"\";\n}\n\n.ion-ios-ribbon:before {\n  content: \"\";\n}\n\n.ion-ios-rocket:before {\n  content: \"\";\n}\n\n.ion-ios-rose:before {\n  content: \"\";\n}\n\n.ion-ios-sad:before {\n  content: \"\";\n}\n\n.ion-ios-save:before {\n  content: \"\";\n}\n\n.ion-ios-school:before {\n  content: \"\";\n}\n\n.ion-ios-search:before {\n  content: \"\";\n}\n\n.ion-ios-send:before {\n  content: \"\";\n}\n\n.ion-ios-settings:before {\n  content: \"\";\n}\n\n.ion-ios-share:before {\n  content: \"\";\n}\n\n.ion-ios-share-alt:before {\n  content: \"\";\n}\n\n.ion-ios-shirt:before {\n  content: \"\";\n}\n\n.ion-ios-shuffle:before {\n  content: \"\";\n}\n\n.ion-ios-skip-backward:before {\n  content: \"\";\n}\n\n.ion-ios-skip-forward:before {\n  content: \"\";\n}\n\n.ion-ios-snow:before {\n  content: \"\";\n}\n\n.ion-ios-speedometer:before {\n  content: \"\";\n}\n\n.ion-ios-square:before {\n  content: \"\";\n}\n\n.ion-ios-square-outline:before {\n  content: \"\";\n}\n\n.ion-ios-star:before {\n  content: \"\";\n}\n\n.ion-ios-star-half:before {\n  content: \"\";\n}\n\n.ion-ios-star-outline:before {\n  content: \"\";\n}\n\n.ion-ios-stats:before {\n  content: \"\";\n}\n\n.ion-ios-stopwatch:before {\n  content: \"\";\n}\n\n.ion-ios-subway:before {\n  content: \"\";\n}\n\n.ion-ios-sunny:before {\n  content: \"\";\n}\n\n.ion-ios-swap:before {\n  content: \"\";\n}\n\n.ion-ios-switch:before {\n  content: \"\";\n}\n\n.ion-ios-sync:before {\n  content: \"\";\n}\n\n.ion-ios-tablet-landscape:before {\n  content: \"\";\n}\n\n.ion-ios-tablet-portrait:before {\n  content: \"\";\n}\n\n.ion-ios-tennisball:before {\n  content: \"\";\n}\n\n.ion-ios-text:before {\n  content: \"\";\n}\n\n.ion-ios-thermometer:before {\n  content: \"\";\n}\n\n.ion-ios-thumbs-down:before {\n  content: \"\";\n}\n\n.ion-ios-thumbs-up:before {\n  content: \"\";\n}\n\n.ion-ios-thunderstorm:before {\n  content: \"\";\n}\n\n.ion-ios-time:before {\n  content: \"\";\n}\n\n.ion-ios-timer:before {\n  content: \"\";\n}\n\n.ion-ios-today:before {\n  content: \"\";\n}\n\n.ion-ios-train:before {\n  content: \"\";\n}\n\n.ion-ios-transgender:before {\n  content: \"\";\n}\n\n.ion-ios-trash:before {\n  content: \"\";\n}\n\n.ion-ios-trending-down:before {\n  content: \"\";\n}\n\n.ion-ios-trending-up:before {\n  content: \"\";\n}\n\n.ion-ios-trophy:before {\n  content: \"\";\n}\n\n.ion-ios-tv:before {\n  content: \"\";\n}\n\n.ion-ios-umbrella:before {\n  content: \"\";\n}\n\n.ion-ios-undo:before {\n  content: \"\";\n}\n\n.ion-ios-unlock:before {\n  content: \"\";\n}\n\n.ion-ios-videocam:before {\n  content: \"\";\n}\n\n.ion-ios-volume-high:before {\n  content: \"\";\n}\n\n.ion-ios-volume-low:before {\n  content: \"\";\n}\n\n.ion-ios-volume-mute:before {\n  content: \"\";\n}\n\n.ion-ios-volume-off:before {\n  content: \"\";\n}\n\n.ion-ios-walk:before {\n  content: \"\";\n}\n\n.ion-ios-wallet:before {\n  content: \"\";\n}\n\n.ion-ios-warning:before {\n  content: \"\";\n}\n\n.ion-ios-watch:before {\n  content: \"\";\n}\n\n.ion-ios-water:before {\n  content: \"\";\n}\n\n.ion-ios-wifi:before {\n  content: \"\";\n}\n\n.ion-ios-wine:before {\n  content: \"\";\n}\n\n.ion-ios-woman:before {\n  content: \"\";\n}\n\n.ion-logo-android:before {\n  content: \"\";\n}\n\n.ion-logo-angular:before {\n  content: \"\";\n}\n\n.ion-logo-apple:before {\n  content: \"\";\n}\n\n.ion-logo-bitbucket:before {\n  content: \"\";\n}\n\n.ion-logo-bitcoin:before {\n  content: \"\";\n}\n\n.ion-logo-buffer:before {\n  content: \"\";\n}\n\n.ion-logo-chrome:before {\n  content: \"\";\n}\n\n.ion-logo-closed-captioning:before {\n  content: \"\";\n}\n\n.ion-logo-codepen:before {\n  content: \"\";\n}\n\n.ion-logo-css3:before {\n  content: \"\";\n}\n\n.ion-logo-designernews:before {\n  content: \"\";\n}\n\n.ion-logo-dribbble:before {\n  content: \"\";\n}\n\n.ion-logo-dropbox:before {\n  content: \"\";\n}\n\n.ion-logo-euro:before {\n  content: \"\";\n}\n\n.ion-logo-facebook:before {\n  content: \"\";\n}\n\n.ion-logo-flickr:before {\n  content: \"\";\n}\n\n.ion-logo-foursquare:before {\n  content: \"\";\n}\n\n.ion-logo-freebsd-devil:before {\n  content: \"\";\n}\n\n.ion-logo-game-controller-a:before {\n  content: \"\";\n}\n\n.ion-logo-game-controller-b:before {\n  content: \"\";\n}\n\n.ion-logo-github:before {\n  content: \"\";\n}\n\n.ion-logo-google:before {\n  content: \"\";\n}\n\n.ion-logo-googleplus:before {\n  content: \"\";\n}\n\n.ion-logo-hackernews:before {\n  content: \"\";\n}\n\n.ion-logo-html5:before {\n  content: \"\";\n}\n\n.ion-logo-instagram:before {\n  content: \"\";\n}\n\n.ion-logo-ionic:before {\n  content: \"\";\n}\n\n.ion-logo-ionitron:before {\n  content: \"\";\n}\n\n.ion-logo-javascript:before {\n  content: \"\";\n}\n\n.ion-logo-linkedin:before {\n  content: \"\";\n}\n\n.ion-logo-markdown:before {\n  content: \"\";\n}\n\n.ion-logo-model-s:before {\n  content: \"\";\n}\n\n.ion-logo-no-smoking:before {\n  content: \"\";\n}\n\n.ion-logo-nodejs:before {\n  content: \"\";\n}\n\n.ion-logo-npm:before {\n  content: \"\";\n}\n\n.ion-logo-octocat:before {\n  content: \"\";\n}\n\n.ion-logo-pinterest:before {\n  content: \"\";\n}\n\n.ion-logo-playstation:before {\n  content: \"\";\n}\n\n.ion-logo-polymer:before {\n  content: \"\";\n}\n\n.ion-logo-python:before {\n  content: \"\";\n}\n\n.ion-logo-reddit:before {\n  content: \"\";\n}\n\n.ion-logo-rss:before {\n  content: \"\";\n}\n\n.ion-logo-sass:before {\n  content: \"\";\n}\n\n.ion-logo-skype:before {\n  content: \"\";\n}\n\n.ion-logo-slack:before {\n  content: \"\";\n}\n\n.ion-logo-snapchat:before {\n  content: \"\";\n}\n\n.ion-logo-steam:before {\n  content: \"\";\n}\n\n.ion-logo-tumblr:before {\n  content: \"\";\n}\n\n.ion-logo-tux:before {\n  content: \"\";\n}\n\n.ion-logo-twitch:before {\n  content: \"\";\n}\n\n.ion-logo-twitter:before {\n  content: \"\";\n}\n\n.ion-logo-usd:before {\n  content: \"\";\n}\n\n.ion-logo-vimeo:before {\n  content: \"\";\n}\n\n.ion-logo-vk:before {\n  content: \"\";\n}\n\n.ion-logo-whatsapp:before {\n  content: \"\";\n}\n\n.ion-logo-windows:before {\n  content: \"\";\n}\n\n.ion-logo-wordpress:before {\n  content: \"\";\n}\n\n.ion-logo-xbox:before {\n  content: \"\";\n}\n\n.ion-logo-xing:before {\n  content: \"\";\n}\n\n.ion-logo-yahoo:before {\n  content: \"\";\n}\n\n.ion-logo-yen:before {\n  content: \"\";\n}\n\n.ion-logo-youtube:before {\n  content: \"\";\n}\n\n.ion-md-add:before {\n  content: \"\";\n}\n\n.ion-md-add-circle:before {\n  content: \"\";\n}\n\n.ion-md-add-circle-outline:before {\n  content: \"\";\n}\n\n.ion-md-airplane:before {\n  content: \"\";\n}\n\n.ion-md-alarm:before {\n  content: \"\";\n}\n\n.ion-md-albums:before {\n  content: \"\";\n}\n\n.ion-md-alert:before {\n  content: \"\";\n}\n\n.ion-md-american-football:before {\n  content: \"\";\n}\n\n.ion-md-analytics:before {\n  content: \"\";\n}\n\n.ion-md-aperture:before {\n  content: \"\";\n}\n\n.ion-md-apps:before {\n  content: \"\";\n}\n\n.ion-md-appstore:before {\n  content: \"\";\n}\n\n.ion-md-archive:before {\n  content: \"\";\n}\n\n.ion-md-arrow-back:before {\n  content: \"\";\n}\n\n.ion-md-arrow-down:before {\n  content: \"\";\n}\n\n.ion-md-arrow-dropdown:before {\n  content: \"\";\n}\n\n.ion-md-arrow-dropdown-circle:before {\n  content: \"\";\n}\n\n.ion-md-arrow-dropleft:before {\n  content: \"\";\n}\n\n.ion-md-arrow-dropleft-circle:before {\n  content: \"\";\n}\n\n.ion-md-arrow-dropright:before {\n  content: \"\";\n}\n\n.ion-md-arrow-dropright-circle:before {\n  content: \"\";\n}\n\n.ion-md-arrow-dropup:before {\n  content: \"\";\n}\n\n.ion-md-arrow-dropup-circle:before {\n  content: \"\";\n}\n\n.ion-md-arrow-forward:before {\n  content: \"\";\n}\n\n.ion-md-arrow-round-back:before {\n  content: \"\";\n}\n\n.ion-md-arrow-round-down:before {\n  content: \"\";\n}\n\n.ion-md-arrow-round-forward:before {\n  content: \"\";\n}\n\n.ion-md-arrow-round-up:before {\n  content: \"\";\n}\n\n.ion-md-arrow-up:before {\n  content: \"\";\n}\n\n.ion-md-at:before {\n  content: \"\";\n}\n\n.ion-md-attach:before {\n  content: \"\";\n}\n\n.ion-md-backspace:before {\n  content: \"\";\n}\n\n.ion-md-barcode:before {\n  content: \"\";\n}\n\n.ion-md-baseball:before {\n  content: \"\";\n}\n\n.ion-md-basket:before {\n  content: \"\";\n}\n\n.ion-md-basketball:before {\n  content: \"\";\n}\n\n.ion-md-battery-charging:before {\n  content: \"\";\n}\n\n.ion-md-battery-dead:before {\n  content: \"\";\n}\n\n.ion-md-battery-full:before {\n  content: \"\";\n}\n\n.ion-md-beaker:before {\n  content: \"\";\n}\n\n.ion-md-bed:before {\n  content: \"\";\n}\n\n.ion-md-beer:before {\n  content: \"\";\n}\n\n.ion-md-bicycle:before {\n  content: \"\";\n}\n\n.ion-md-bluetooth:before {\n  content: \"\";\n}\n\n.ion-md-boat:before {\n  content: \"\";\n}\n\n.ion-md-body:before {\n  content: \"\";\n}\n\n.ion-md-bonfire:before {\n  content: \"\";\n}\n\n.ion-md-book:before {\n  content: \"\";\n}\n\n.ion-md-bookmark:before {\n  content: \"\";\n}\n\n.ion-md-bookmarks:before {\n  content: \"\";\n}\n\n.ion-md-bowtie:before {\n  content: \"\";\n}\n\n.ion-md-briefcase:before {\n  content: \"\";\n}\n\n.ion-md-browsers:before {\n  content: \"\";\n}\n\n.ion-md-brush:before {\n  content: \"\";\n}\n\n.ion-md-bug:before {\n  content: \"\";\n}\n\n.ion-md-build:before {\n  content: \"\";\n}\n\n.ion-md-bulb:before {\n  content: \"\";\n}\n\n.ion-md-bus:before {\n  content: \"\";\n}\n\n.ion-md-business:before {\n  content: \"\";\n}\n\n.ion-md-cafe:before {\n  content: \"\";\n}\n\n.ion-md-calculator:before {\n  content: \"\";\n}\n\n.ion-md-calendar:before {\n  content: \"\";\n}\n\n.ion-md-call:before {\n  content: \"\";\n}\n\n.ion-md-camera:before {\n  content: \"\";\n}\n\n.ion-md-car:before {\n  content: \"\";\n}\n\n.ion-md-card:before {\n  content: \"\";\n}\n\n.ion-md-cart:before {\n  content: \"\";\n}\n\n.ion-md-cash:before {\n  content: \"\";\n}\n\n.ion-md-cellular:before {\n  content: \"\";\n}\n\n.ion-md-chatboxes:before {\n  content: \"\";\n}\n\n.ion-md-chatbubbles:before {\n  content: \"\";\n}\n\n.ion-md-checkbox:before {\n  content: \"\";\n}\n\n.ion-md-checkbox-outline:before {\n  content: \"\";\n}\n\n.ion-md-checkmark:before {\n  content: \"\";\n}\n\n.ion-md-checkmark-circle:before {\n  content: \"\";\n}\n\n.ion-md-checkmark-circle-outline:before {\n  content: \"\";\n}\n\n.ion-md-clipboard:before {\n  content: \"\";\n}\n\n.ion-md-clock:before {\n  content: \"\";\n}\n\n.ion-md-close:before {\n  content: \"\";\n}\n\n.ion-md-close-circle:before {\n  content: \"\";\n}\n\n.ion-md-close-circle-outline:before {\n  content: \"\";\n}\n\n.ion-md-cloud:before {\n  content: \"\";\n}\n\n.ion-md-cloud-circle:before {\n  content: \"\";\n}\n\n.ion-md-cloud-done:before {\n  content: \"\";\n}\n\n.ion-md-cloud-download:before {\n  content: \"\";\n}\n\n.ion-md-cloud-outline:before {\n  content: \"\";\n}\n\n.ion-md-cloud-upload:before {\n  content: \"\";\n}\n\n.ion-md-cloudy:before {\n  content: \"\";\n}\n\n.ion-md-cloudy-night:before {\n  content: \"\";\n}\n\n.ion-md-code:before {\n  content: \"\";\n}\n\n.ion-md-code-download:before {\n  content: \"\";\n}\n\n.ion-md-code-working:before {\n  content: \"\";\n}\n\n.ion-md-cog:before {\n  content: \"\";\n}\n\n.ion-md-color-fill:before {\n  content: \"\";\n}\n\n.ion-md-color-filter:before {\n  content: \"\";\n}\n\n.ion-md-color-palette:before {\n  content: \"\";\n}\n\n.ion-md-color-wand:before {\n  content: \"\";\n}\n\n.ion-md-compass:before {\n  content: \"\";\n}\n\n.ion-md-construct:before {\n  content: \"\";\n}\n\n.ion-md-contact:before {\n  content: \"\";\n}\n\n.ion-md-contacts:before {\n  content: \"\";\n}\n\n.ion-md-contract:before {\n  content: \"\";\n}\n\n.ion-md-contrast:before {\n  content: \"\";\n}\n\n.ion-md-copy:before {\n  content: \"\";\n}\n\n.ion-md-create:before {\n  content: \"\";\n}\n\n.ion-md-crop:before {\n  content: \"\";\n}\n\n.ion-md-cube:before {\n  content: \"\";\n}\n\n.ion-md-cut:before {\n  content: \"\";\n}\n\n.ion-md-desktop:before {\n  content: \"\";\n}\n\n.ion-md-disc:before {\n  content: \"\";\n}\n\n.ion-md-document:before {\n  content: \"\";\n}\n\n.ion-md-done-all:before {\n  content: \"\";\n}\n\n.ion-md-download:before {\n  content: \"\";\n}\n\n.ion-md-easel:before {\n  content: \"\";\n}\n\n.ion-md-egg:before {\n  content: \"\";\n}\n\n.ion-md-exit:before {\n  content: \"\";\n}\n\n.ion-md-expand:before {\n  content: \"\";\n}\n\n.ion-md-eye:before {\n  content: \"\";\n}\n\n.ion-md-eye-off:before {\n  content: \"\";\n}\n\n.ion-md-fastforward:before {\n  content: \"\";\n}\n\n.ion-md-female:before {\n  content: \"\";\n}\n\n.ion-md-filing:before {\n  content: \"\";\n}\n\n.ion-md-film:before {\n  content: \"\";\n}\n\n.ion-md-finger-print:before {\n  content: \"\";\n}\n\n.ion-md-fitness:before {\n  content: \"\";\n}\n\n.ion-md-flag:before {\n  content: \"\";\n}\n\n.ion-md-flame:before {\n  content: \"\";\n}\n\n.ion-md-flash:before {\n  content: \"\";\n}\n\n.ion-md-flash-off:before {\n  content: \"\";\n}\n\n.ion-md-flashlight:before {\n  content: \"\";\n}\n\n.ion-md-flask:before {\n  content: \"\";\n}\n\n.ion-md-flower:before {\n  content: \"\";\n}\n\n.ion-md-folder:before {\n  content: \"\";\n}\n\n.ion-md-folder-open:before {\n  content: \"\";\n}\n\n.ion-md-football:before {\n  content: \"\";\n}\n\n.ion-md-funnel:before {\n  content: \"\";\n}\n\n.ion-md-gift:before {\n  content: \"\";\n}\n\n.ion-md-git-branch:before {\n  content: \"\";\n}\n\n.ion-md-git-commit:before {\n  content: \"\";\n}\n\n.ion-md-git-compare:before {\n  content: \"\";\n}\n\n.ion-md-git-merge:before {\n  content: \"\";\n}\n\n.ion-md-git-network:before {\n  content: \"\";\n}\n\n.ion-md-git-pull-request:before {\n  content: \"\";\n}\n\n.ion-md-glasses:before {\n  content: \"\";\n}\n\n.ion-md-globe:before {\n  content: \"\";\n}\n\n.ion-md-grid:before {\n  content: \"\";\n}\n\n.ion-md-hammer:before {\n  content: \"\";\n}\n\n.ion-md-hand:before {\n  content: \"\";\n}\n\n.ion-md-happy:before {\n  content: \"\";\n}\n\n.ion-md-headset:before {\n  content: \"\";\n}\n\n.ion-md-heart:before {\n  content: \"\";\n}\n\n.ion-md-heart-dislike:before {\n  content: \"\";\n}\n\n.ion-md-heart-empty:before {\n  content: \"\";\n}\n\n.ion-md-heart-half:before {\n  content: \"\";\n}\n\n.ion-md-help:before {\n  content: \"\";\n}\n\n.ion-md-help-buoy:before {\n  content: \"\";\n}\n\n.ion-md-help-circle:before {\n  content: \"\";\n}\n\n.ion-md-help-circle-outline:before {\n  content: \"\";\n}\n\n.ion-md-home:before {\n  content: \"\";\n}\n\n.ion-md-hourglass:before {\n  content: \"\";\n}\n\n.ion-md-ice-cream:before {\n  content: \"\";\n}\n\n.ion-md-image:before {\n  content: \"\";\n}\n\n.ion-md-images:before {\n  content: \"\";\n}\n\n.ion-md-infinite:before {\n  content: \"\";\n}\n\n.ion-md-information:before {\n  content: \"\";\n}\n\n.ion-md-information-circle:before {\n  content: \"\";\n}\n\n.ion-md-information-circle-outline:before {\n  content: \"\";\n}\n\n.ion-md-jet:before {\n  content: \"\";\n}\n\n.ion-md-journal:before {\n  content: \"\";\n}\n\n.ion-md-key:before {\n  content: \"\";\n}\n\n.ion-md-keypad:before {\n  content: \"\";\n}\n\n.ion-md-laptop:before {\n  content: \"\";\n}\n\n.ion-md-leaf:before {\n  content: \"\";\n}\n\n.ion-md-link:before {\n  content: \"\";\n}\n\n.ion-md-list:before {\n  content: \"\";\n}\n\n.ion-md-list-box:before {\n  content: \"\";\n}\n\n.ion-md-locate:before {\n  content: \"\";\n}\n\n.ion-md-lock:before {\n  content: \"\";\n}\n\n.ion-md-log-in:before {\n  content: \"\";\n}\n\n.ion-md-log-out:before {\n  content: \"\";\n}\n\n.ion-md-magnet:before {\n  content: \"\";\n}\n\n.ion-md-mail:before {\n  content: \"\";\n}\n\n.ion-md-mail-open:before {\n  content: \"\";\n}\n\n.ion-md-mail-unread:before {\n  content: \"\";\n}\n\n.ion-md-male:before {\n  content: \"\";\n}\n\n.ion-md-man:before {\n  content: \"\";\n}\n\n.ion-md-map:before {\n  content: \"\";\n}\n\n.ion-md-medal:before {\n  content: \"\";\n}\n\n.ion-md-medical:before {\n  content: \"\";\n}\n\n.ion-md-medkit:before {\n  content: \"\";\n}\n\n.ion-md-megaphone:before {\n  content: \"\";\n}\n\n.ion-md-menu:before {\n  content: \"\";\n}\n\n.ion-md-mic:before {\n  content: \"\";\n}\n\n.ion-md-mic-off:before {\n  content: \"\";\n}\n\n.ion-md-microphone:before {\n  content: \"\";\n}\n\n.ion-md-moon:before {\n  content: \"\";\n}\n\n.ion-md-more:before {\n  content: \"\";\n}\n\n.ion-md-move:before {\n  content: \"\";\n}\n\n.ion-md-musical-note:before {\n  content: \"\";\n}\n\n.ion-md-musical-notes:before {\n  content: \"\";\n}\n\n.ion-md-navigate:before {\n  content: \"\";\n}\n\n.ion-md-notifications:before {\n  content: \"\";\n}\n\n.ion-md-notifications-off:before {\n  content: \"\";\n}\n\n.ion-md-notifications-outline:before {\n  content: \"\";\n}\n\n.ion-md-nuclear:before {\n  content: \"\";\n}\n\n.ion-md-nutrition:before {\n  content: \"\";\n}\n\n.ion-md-open:before {\n  content: \"\";\n}\n\n.ion-md-options:before {\n  content: \"\";\n}\n\n.ion-md-outlet:before {\n  content: \"\";\n}\n\n.ion-md-paper:before {\n  content: \"\";\n}\n\n.ion-md-paper-plane:before {\n  content: \"\";\n}\n\n.ion-md-partly-sunny:before {\n  content: \"\";\n}\n\n.ion-md-pause:before {\n  content: \"\";\n}\n\n.ion-md-paw:before {\n  content: \"\";\n}\n\n.ion-md-people:before {\n  content: \"\";\n}\n\n.ion-md-person:before {\n  content: \"\";\n}\n\n.ion-md-person-add:before {\n  content: \"\";\n}\n\n.ion-md-phone-landscape:before {\n  content: \"\";\n}\n\n.ion-md-phone-portrait:before {\n  content: \"\";\n}\n\n.ion-md-photos:before {\n  content: \"\";\n}\n\n.ion-md-pie:before {\n  content: \"\";\n}\n\n.ion-md-pin:before {\n  content: \"\";\n}\n\n.ion-md-pint:before {\n  content: \"\";\n}\n\n.ion-md-pizza:before {\n  content: \"\";\n}\n\n.ion-md-planet:before {\n  content: \"\";\n}\n\n.ion-md-play:before {\n  content: \"\";\n}\n\n.ion-md-play-circle:before {\n  content: \"\";\n}\n\n.ion-md-podium:before {\n  content: \"\";\n}\n\n.ion-md-power:before {\n  content: \"\";\n}\n\n.ion-md-pricetag:before {\n  content: \"\";\n}\n\n.ion-md-pricetags:before {\n  content: \"\";\n}\n\n.ion-md-print:before {\n  content: \"\";\n}\n\n.ion-md-pulse:before {\n  content: \"\";\n}\n\n.ion-md-qr-scanner:before {\n  content: \"\";\n}\n\n.ion-md-quote:before {\n  content: \"\";\n}\n\n.ion-md-radio:before {\n  content: \"\";\n}\n\n.ion-md-radio-button-off:before {\n  content: \"\";\n}\n\n.ion-md-radio-button-on:before {\n  content: \"\";\n}\n\n.ion-md-rainy:before {\n  content: \"\";\n}\n\n.ion-md-recording:before {\n  content: \"\";\n}\n\n.ion-md-redo:before {\n  content: \"\";\n}\n\n.ion-md-refresh:before {\n  content: \"\";\n}\n\n.ion-md-refresh-circle:before {\n  content: \"\";\n}\n\n.ion-md-remove:before {\n  content: \"\";\n}\n\n.ion-md-remove-circle:before {\n  content: \"\";\n}\n\n.ion-md-remove-circle-outline:before {\n  content: \"\";\n}\n\n.ion-md-reorder:before {\n  content: \"\";\n}\n\n.ion-md-repeat:before {\n  content: \"\";\n}\n\n.ion-md-resize:before {\n  content: \"\";\n}\n\n.ion-md-restaurant:before {\n  content: \"\";\n}\n\n.ion-md-return-left:before {\n  content: \"\";\n}\n\n.ion-md-return-right:before {\n  content: \"\";\n}\n\n.ion-md-reverse-camera:before {\n  content: \"\";\n}\n\n.ion-md-rewind:before {\n  content: \"\";\n}\n\n.ion-md-ribbon:before {\n  content: \"\";\n}\n\n.ion-md-rocket:before {\n  content: \"\";\n}\n\n.ion-md-rose:before {\n  content: \"\";\n}\n\n.ion-md-sad:before {\n  content: \"\";\n}\n\n.ion-md-save:before {\n  content: \"\";\n}\n\n.ion-md-school:before {\n  content: \"\";\n}\n\n.ion-md-search:before {\n  content: \"\";\n}\n\n.ion-md-send:before {\n  content: \"\";\n}\n\n.ion-md-settings:before {\n  content: \"\";\n}\n\n.ion-md-share:before {\n  content: \"\";\n}\n\n.ion-md-share-alt:before {\n  content: \"\";\n}\n\n.ion-md-shirt:before {\n  content: \"\";\n}\n\n.ion-md-shuffle:before {\n  content: \"\";\n}\n\n.ion-md-skip-backward:before {\n  content: \"\";\n}\n\n.ion-md-skip-forward:before {\n  content: \"\";\n}\n\n.ion-md-snow:before {\n  content: \"\";\n}\n\n.ion-md-speedometer:before {\n  content: \"\";\n}\n\n.ion-md-square:before {\n  content: \"\";\n}\n\n.ion-md-square-outline:before {\n  content: \"\";\n}\n\n.ion-md-star:before {\n  content: \"\";\n}\n\n.ion-md-star-half:before {\n  content: \"\";\n}\n\n.ion-md-star-outline:before {\n  content: \"\";\n}\n\n.ion-md-stats:before {\n  content: \"\";\n}\n\n.ion-md-stopwatch:before {\n  content: \"\";\n}\n\n.ion-md-subway:before {\n  content: \"\";\n}\n\n.ion-md-sunny:before {\n  content: \"\";\n}\n\n.ion-md-swap:before {\n  content: \"\";\n}\n\n.ion-md-switch:before {\n  content: \"\";\n}\n\n.ion-md-sync:before {\n  content: \"\";\n}\n\n.ion-md-tablet-landscape:before {\n  content: \"\";\n}\n\n.ion-md-tablet-portrait:before {\n  content: \"\";\n}\n\n.ion-md-tennisball:before {\n  content: \"\";\n}\n\n.ion-md-text:before {\n  content: \"\";\n}\n\n.ion-md-thermometer:before {\n  content: \"\";\n}\n\n.ion-md-thumbs-down:before {\n  content: \"\";\n}\n\n.ion-md-thumbs-up:before {\n  content: \"\";\n}\n\n.ion-md-thunderstorm:before {\n  content: \"\";\n}\n\n.ion-md-time:before {\n  content: \"\";\n}\n\n.ion-md-timer:before {\n  content: \"\";\n}\n\n.ion-md-today:before {\n  content: \"\";\n}\n\n.ion-md-train:before {\n  content: \"\";\n}\n\n.ion-md-transgender:before {\n  content: \"\";\n}\n\n.ion-md-trash:before {\n  content: \"\";\n}\n\n.ion-md-trending-down:before {\n  content: \"\";\n}\n\n.ion-md-trending-up:before {\n  content: \"\";\n}\n\n.ion-md-trophy:before {\n  content: \"\";\n}\n\n.ion-md-tv:before {\n  content: \"\";\n}\n\n.ion-md-umbrella:before {\n  content: \"\";\n}\n\n.ion-md-undo:before {\n  content: \"\";\n}\n\n.ion-md-unlock:before {\n  content: \"\";\n}\n\n.ion-md-videocam:before {\n  content: \"\";\n}\n\n.ion-md-volume-high:before {\n  content: \"\";\n}\n\n.ion-md-volume-low:before {\n  content: \"\";\n}\n\n.ion-md-volume-mute:before {\n  content: \"\";\n}\n\n.ion-md-volume-off:before {\n  content: \"\";\n}\n\n.ion-md-walk:before {\n  content: \"\";\n}\n\n.ion-md-wallet:before {\n  content: \"\";\n}\n\n.ion-md-warning:before {\n  content: \"\";\n}\n\n.ion-md-watch:before {\n  content: \"\";\n}\n\n.ion-md-water:before {\n  content: \"\";\n}\n\n.ion-md-wifi:before {\n  content: \"\";\n}\n\n.ion-md-wine:before {\n  content: \"\";\n}\n\n.ion-md-woman:before {\n  content: \"\";\n}\n\n.wrapper {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n.container-fluid {\n  margin-right: auto;\n  margin-left: auto;\n  padding-right: 2rem;\n  padding-left: 2rem;\n}\n\n.row {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -moz-flex: 0 1 auto;\n  -ms-flex: 0 1 auto;\n  flex: 0 1 auto;\n  -moz-flex-direction: row;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  margin-right: -0.5rem;\n  margin-left: -0.5rem;\n}\n\n.row.reverse {\n  -moz-flex-direction: row-reverse;\n  -ms-flex-direction: row-reverse;\n  flex-direction: row-reverse;\n}\n\n.col.reverse {\n  -moz-flex-direction: column-reverse;\n  -ms-flex-direction: column-reverse;\n  flex-direction: column-reverse;\n}\n\n.col-xs {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: auto;\n  flex-basis: auto;\n}\n\n.col-xs-1 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 8.3333333333%;\n  flex-basis: 8.3333333333%;\n  max-width: 8.3333333333%;\n}\n\n.col-xs-2 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 16.6666666667%;\n  flex-basis: 16.6666666667%;\n  max-width: 16.6666666667%;\n}\n\n.col-xs-3 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 25%;\n  flex-basis: 25%;\n  max-width: 25%;\n}\n\n.col-xs-4 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 33.3333333333%;\n  flex-basis: 33.3333333333%;\n  max-width: 33.3333333333%;\n}\n\n.col-xs-5 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 41.6666666667%;\n  flex-basis: 41.6666666667%;\n  max-width: 41.6666666667%;\n}\n\n.col-xs-6 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 50%;\n  flex-basis: 50%;\n  max-width: 50%;\n}\n\n.col-xs-7 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 58.3333333333%;\n  flex-basis: 58.3333333333%;\n  max-width: 58.3333333333%;\n}\n\n.col-xs-8 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 66.6666666667%;\n  flex-basis: 66.6666666667%;\n  max-width: 66.6666666667%;\n}\n\n.col-xs-9 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 75%;\n  flex-basis: 75%;\n  max-width: 75%;\n}\n\n.col-xs-10 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 83.3333333333%;\n  flex-basis: 83.3333333333%;\n  max-width: 83.3333333333%;\n}\n\n.col-xs-11 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 91.6666666667%;\n  flex-basis: 91.6666666667%;\n  max-width: 91.6666666667%;\n}\n\n.col-xs-12 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 100%;\n  flex-basis: 100%;\n  max-width: 100%;\n}\n\n.col-xs-offset-1 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 8.3333333333%;\n}\n\n.col-xs-offset-2 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 16.6666666667%;\n}\n\n.col-xs-offset-3 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 25%;\n}\n\n.col-xs-offset-4 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 33.3333333333%;\n}\n\n.col-xs-offset-5 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 41.6666666667%;\n}\n\n.col-xs-offset-6 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 50%;\n}\n\n.col-xs-offset-7 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 58.3333333333%;\n}\n\n.col-xs-offset-8 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 66.6666666667%;\n}\n\n.col-xs-offset-9 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 75%;\n}\n\n.col-xs-offset-10 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 83.3333333333%;\n}\n\n.col-xs-offset-11 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 91.6666666667%;\n}\n\n.col-xs-offset-12 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 100%;\n}\n\n.col-xs {\n  -moz-flex-grow: 1;\n  -ms-flex-positive: 1;\n  flex-grow: 1;\n  -ms-flex-preferred-size: 0;\n  flex-basis: 0;\n  max-width: 100%;\n}\n\n.start-xs {\n  -moz-justify-content: flex-start;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n  text-align: start;\n}\n\n.center-xs {\n  -moz-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  text-align: center;\n}\n\n.end-xs {\n  -moz-justify-content: flex-end;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n  text-align: end;\n}\n\n.top-xs {\n  -moz-align-items: flex-start;\n  -ms-flex-align: start;\n  align-items: flex-start;\n}\n\n.middle-xs {\n  -moz-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\n\n.bottom-xs {\n  -moz-align-items: flex-end;\n  -ms-flex-align: end;\n  align-items: flex-end;\n}\n\n.around-xs {\n  -moz-justify-content: space-around;\n  -ms-flex-pack: distribute;\n  justify-content: space-around;\n}\n\n.between-xs {\n  -moz-justify-content: space-between;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n}\n\n.first-xs {\n  -ms-flex-order: -1;\n  order: -1;\n}\n\n.last-xs {\n  -ms-flex-order: 1;\n  order: 1;\n}\n\n\@media only screen and (min-width: 768px) {\n  .container {\n    width: 728px;\n  }\n\n  .col-md {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: auto;\n    flex-basis: auto;\n  }\n\n  .col-md-1 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 8.3333333333%;\n    flex-basis: 8.3333333333%;\n    max-width: 8.3333333333%;\n  }\n\n  .col-md-2 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 16.6666666667%;\n    flex-basis: 16.6666666667%;\n    max-width: 16.6666666667%;\n  }\n\n  .col-md-3 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 25%;\n    flex-basis: 25%;\n    max-width: 25%;\n  }\n\n  .col-md-4 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 33.3333333333%;\n    flex-basis: 33.3333333333%;\n    max-width: 33.3333333333%;\n  }\n\n  .col-md-5 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 41.6666666667%;\n    flex-basis: 41.6666666667%;\n    max-width: 41.6666666667%;\n  }\n\n  .col-md-6 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 50%;\n    flex-basis: 50%;\n    max-width: 50%;\n  }\n\n  .col-md-7 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 58.3333333333%;\n    flex-basis: 58.3333333333%;\n    max-width: 58.3333333333%;\n  }\n\n  .col-md-8 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 66.6666666667%;\n    flex-basis: 66.6666666667%;\n    max-width: 66.6666666667%;\n  }\n\n  .col-md-9 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 75%;\n    flex-basis: 75%;\n    max-width: 75%;\n  }\n\n  .col-md-10 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 83.3333333333%;\n    flex-basis: 83.3333333333%;\n    max-width: 83.3333333333%;\n  }\n\n  .col-md-11 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 91.6666666667%;\n    flex-basis: 91.6666666667%;\n    max-width: 91.6666666667%;\n  }\n\n  .col-md-12 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 100%;\n    flex-basis: 100%;\n    max-width: 100%;\n  }\n\n  .col-md-offset-1 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 8.3333333333%;\n  }\n\n  .col-md-offset-2 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 16.6666666667%;\n  }\n\n  .col-md-offset-3 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 25%;\n  }\n\n  .col-md-offset-4 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 33.3333333333%;\n  }\n\n  .col-md-offset-5 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 41.6666666667%;\n  }\n\n  .col-md-offset-6 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 50%;\n  }\n\n  .col-md-offset-7 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 58.3333333333%;\n  }\n\n  .col-md-offset-8 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 66.6666666667%;\n  }\n\n  .col-md-offset-9 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 75%;\n  }\n\n  .col-md-offset-10 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 83.3333333333%;\n  }\n\n  .col-md-offset-11 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 91.6666666667%;\n  }\n\n  .col-md-offset-12 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 100%;\n  }\n\n  .col-md {\n    -moz-flex-grow: 1;\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    -ms-flex-preferred-size: 0;\n    flex-basis: 0;\n    max-width: 100%;\n  }\n\n  .start-md {\n    -moz-justify-content: flex-start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    text-align: start;\n  }\n\n  .center-md {\n    -moz-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    text-align: center;\n  }\n\n  .end-md {\n    -moz-justify-content: flex-end;\n    -ms-flex-pack: end;\n    justify-content: flex-end;\n    text-align: end;\n  }\n\n  .top-md {\n    -moz-align-items: flex-start;\n    -ms-flex-align: start;\n    align-items: flex-start;\n  }\n\n  .middle-md {\n    -moz-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n  }\n\n  .bottom-md {\n    -moz-align-items: flex-end;\n    -ms-flex-align: end;\n    align-items: flex-end;\n  }\n\n  .around-md {\n    -moz-justify-content: space-around;\n    -ms-flex-pack: distribute;\n    justify-content: space-around;\n  }\n\n  .between-md {\n    -moz-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n  }\n\n  .first-md {\n    -ms-flex-order: -1;\n    order: -1;\n  }\n\n  .last-md {\n    -ms-flex-order: 1;\n    order: 1;\n  }\n}\n\@media only screen and (min-width: 1024px) {\n  .container {\n    width: 1024px;\n  }\n\n  .col-lg {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: auto;\n    flex-basis: auto;\n  }\n\n  .col-lg-1 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 8.3333333333%;\n    flex-basis: 8.3333333333%;\n    max-width: 8.3333333333%;\n  }\n\n  .col-lg-2 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 16.6666666667%;\n    flex-basis: 16.6666666667%;\n    max-width: 16.6666666667%;\n  }\n\n  .col-lg-3 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 25%;\n    flex-basis: 25%;\n    max-width: 25%;\n  }\n\n  .col-lg-4 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 33.3333333333%;\n    flex-basis: 33.3333333333%;\n    max-width: 33.3333333333%;\n  }\n\n  .col-lg-5 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 41.6666666667%;\n    flex-basis: 41.6666666667%;\n    max-width: 41.6666666667%;\n  }\n\n  .col-lg-6 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 50%;\n    flex-basis: 50%;\n    max-width: 50%;\n  }\n\n  .col-lg-7 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 58.3333333333%;\n    flex-basis: 58.3333333333%;\n    max-width: 58.3333333333%;\n  }\n\n  .col-lg-8 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 66.6666666667%;\n    flex-basis: 66.6666666667%;\n    max-width: 66.6666666667%;\n  }\n\n  .col-lg-9 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 75%;\n    flex-basis: 75%;\n    max-width: 75%;\n  }\n\n  .col-lg-10 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 83.3333333333%;\n    flex-basis: 83.3333333333%;\n    max-width: 83.3333333333%;\n  }\n\n  .col-lg-11 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 91.6666666667%;\n    flex-basis: 91.6666666667%;\n    max-width: 91.6666666667%;\n  }\n\n  .col-lg-12 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 100%;\n    flex-basis: 100%;\n    max-width: 100%;\n  }\n\n  .col-lg-offset-1 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 8.3333333333%;\n  }\n\n  .col-lg-offset-2 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 16.6666666667%;\n  }\n\n  .col-lg-offset-3 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 25%;\n  }\n\n  .col-lg-offset-4 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 33.3333333333%;\n  }\n\n  .col-lg-offset-5 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 41.6666666667%;\n  }\n\n  .col-lg-offset-6 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 50%;\n  }\n\n  .col-lg-offset-7 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 58.3333333333%;\n  }\n\n  .col-lg-offset-8 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 66.6666666667%;\n  }\n\n  .col-lg-offset-9 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 75%;\n  }\n\n  .col-lg-offset-10 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 83.3333333333%;\n  }\n\n  .col-lg-offset-11 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 91.6666666667%;\n  }\n\n  .col-lg-offset-12 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 100%;\n  }\n\n  .col-lg {\n    -moz-flex-grow: 1;\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    -ms-flex-preferred-size: 0;\n    flex-basis: 0;\n    max-width: 100%;\n  }\n\n  .start-lg {\n    -moz-justify-content: flex-start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    text-align: start;\n  }\n\n  .center-lg {\n    -moz-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    text-align: center;\n  }\n\n  .end-lg {\n    -moz-justify-content: flex-end;\n    -ms-flex-pack: end;\n    justify-content: flex-end;\n    text-align: end;\n  }\n\n  .top-lg {\n    -moz-align-items: flex-start;\n    -ms-flex-align: start;\n    align-items: flex-start;\n  }\n\n  .middle-lg {\n    -moz-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n  }\n\n  .bottom-lg {\n    -moz-align-items: flex-end;\n    -ms-flex-align: end;\n    align-items: flex-end;\n  }\n\n  .around-lg {\n    -moz-justify-content: space-around;\n    -ms-flex-pack: distribute;\n    justify-content: space-around;\n  }\n\n  .between-lg {\n    -moz-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n  }\n\n  .first-lg {\n    -ms-flex-order: -1;\n    order: -1;\n  }\n\n  .last-lg {\n    -ms-flex-order: 1;\n    order: 1;\n  }\n}\n\@media only screen and (min-width: 1366px) {\n  .container {\n    width: 1160px;\n  }\n\n  .col-xlg {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: auto;\n    flex-basis: auto;\n  }\n\n  .col-xlg-1 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 8.3333333333%;\n    flex-basis: 8.3333333333%;\n    max-width: 8.3333333333%;\n  }\n\n  .col-xlg-2 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 16.6666666667%;\n    flex-basis: 16.6666666667%;\n    max-width: 16.6666666667%;\n  }\n\n  .col-xlg-3 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 25%;\n    flex-basis: 25%;\n    max-width: 25%;\n  }\n\n  .col-xlg-4 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 33.3333333333%;\n    flex-basis: 33.3333333333%;\n    max-width: 33.3333333333%;\n  }\n\n  .col-xlg-5 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 41.6666666667%;\n    flex-basis: 41.6666666667%;\n    max-width: 41.6666666667%;\n  }\n\n  .col-xlg-6 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 50%;\n    flex-basis: 50%;\n    max-width: 50%;\n  }\n\n  .col-xlg-7 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 58.3333333333%;\n    flex-basis: 58.3333333333%;\n    max-width: 58.3333333333%;\n  }\n\n  .col-xlg-8 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 66.6666666667%;\n    flex-basis: 66.6666666667%;\n    max-width: 66.6666666667%;\n  }\n\n  .col-xlg-9 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 75%;\n    flex-basis: 75%;\n    max-width: 75%;\n  }\n\n  .col-xlg-10 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 83.3333333333%;\n    flex-basis: 83.3333333333%;\n    max-width: 83.3333333333%;\n  }\n\n  .col-xlg-11 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 91.6666666667%;\n    flex-basis: 91.6666666667%;\n    max-width: 91.6666666667%;\n  }\n\n  .col-xlg-12 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 100%;\n    flex-basis: 100%;\n    max-width: 100%;\n  }\n\n  .col-xlg-offset-1 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 8.3333333333%;\n  }\n\n  .col-xlg-offset-2 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 16.6666666667%;\n  }\n\n  .col-xlg-offset-3 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 25%;\n  }\n\n  .col-xlg-offset-4 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 33.3333333333%;\n  }\n\n  .col-xlg-offset-5 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 41.6666666667%;\n  }\n\n  .col-xlg-offset-6 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 50%;\n  }\n\n  .col-xlg-offset-7 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 58.3333333333%;\n  }\n\n  .col-xlg-offset-8 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 66.6666666667%;\n  }\n\n  .col-xlg-offset-9 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 75%;\n  }\n\n  .col-xlg-offset-10 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 83.3333333333%;\n  }\n\n  .col-xlg-offset-11 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 91.6666666667%;\n  }\n\n  .col-xlg-offset-12 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 100%;\n  }\n\n  .col-xlg {\n    -moz-flex-grow: 1;\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    -ms-flex-preferred-size: 0;\n    flex-basis: 0;\n    max-width: 100%;\n  }\n\n  .start-xlg {\n    -moz-justify-content: flex-start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    text-align: start;\n  }\n\n  .center-xlg {\n    -moz-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    text-align: center;\n  }\n\n  .end-xlg {\n    -moz-justify-content: flex-end;\n    -ms-flex-pack: end;\n    justify-content: flex-end;\n    text-align: end;\n  }\n\n  .top-xlg {\n    -moz-align-items: flex-start;\n    -ms-flex-align: start;\n    align-items: flex-start;\n  }\n\n  .middle-xlg {\n    -moz-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n  }\n\n  .bottom-xlg {\n    -moz-align-items: flex-end;\n    -ms-flex-align: end;\n    align-items: flex-end;\n  }\n\n  .around-xlg {\n    -moz-justify-content: space-around;\n    -ms-flex-pack: distribute;\n    justify-content: space-around;\n  }\n\n  .between-xlg {\n    -moz-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n  }\n\n  .first-xlg {\n    -ms-flex-order: -1;\n    order: -1;\n  }\n\n  .last-xlg {\n    -ms-flex-order: 1;\n    order: 1;\n  }\n}\n:root {\n  --primaryColor: #dd0060;\n  --secondaryColor: #37a58c;\n  --tertiaryColor: #000000;\n  --quaternaryColor: #ffffff;\n  --quinaryColor: #7f7f7f;\n  --senaryColor: #e5e5e5;\n  --septenaryColor: #f2f2f2;\n  --octonaryColor: #bfbfbf;\n  --nonaryColor: #b1b2b3;\n  --decenaryColor: rgba(0, 0, 0, 0.05);\n  --undenaryColor: #d9d9d9;\n  --duodenaryColor: rgba(0, 0, 0, 0.25);\n  --thirteenthColor: #b0b0b0;\n  --fourteenthColor: rgba(0, 0, 0, 0.50);\n  --fifteenthColor: #818181;\n  --sixteenthColor: #4e4e4e;\n  --seventeenthColor: rgba(0, 0, 0, 0.3);\n  --nineteenthColor: #ff9500;\n}\n\n.container-fluid {\n  margin: 0 auto;\n  width: 100%;\n  max-width: 1280px;\n  padding: 0 2rem;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.main-container {\n  width: 100%;\n  height: 100%;\n  overflow-x: hidden;\n  overflow: auto;\n}\n\n.default-header {\n  height: 6.4rem;\n  width: 100%;\n  background-color: var(--quaternaryColor, #ffffff);\n}\n.default-header__content {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n  -ms-flex-align: center;\n  align-items: center;\n  height: 100%;\n}\n\n.page {\n  margin-top: 18px;\n  max-height: calc(100% - 6.4rem - 18px);\n  overflow: hidden;\n  overflow-y: auto;\n}\n\n.primary-background {\n  background-color: #ffffff !important;\n}\n\n.secondary-background {\n  background-color: rgba(0, 0, 0, 0.05) !important;\n}\n\n.tertiary-background {\n  background-color: #b1b2b3 !important;\n}\n\n.quaternary-background {\n  background-color: #000000 !important;\n}\n\n.quinary-background {\n  background-color: #37a58c !important;\n}\n\nhtml * {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\nbody, h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4 {\n  font-family: \"BrixSansRegular\";\n  font-weight: 300;\n  line-height: 1.5em;\n}\n\nh1, .h1 {\n  font-size: 3.6rem;\n  font-family: \"BrixSansBlack\";\n  font-weight: 900;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.11;\n  letter-spacing: 0.3px;\n  color: var(--tertiaryColor, #000000);\n}\n\nh2, .h2 {\n  font-size: 2.8rem;\n  font-family: \"BrixSansBlack\";\n  font-weight: 900;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.14;\n  letter-spacing: 0.27px;\n  color: var(--tertiaryColor, #000000);\n}\n\nh3, .h3 {\n  font-size: 2.4rem;\n  font-family: \"BrixSansBold\";\n  font-weight: bold;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.17;\n  letter-spacing: 0.3px;\n  color: var(--tertiaryColor, #000000);\n}\n\nh4, .h4 {\n  font-size: 1.8rem;\n  font-family: \"BrixSansBold\";\n  font-weight: bold;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.33;\n  letter-spacing: 0.23px;\n  color: var(--tertiaryColor, #000000);\n}\n\nh5, .h5 {\n  font-size: 1.7rem;\n  line-height: 1.4em;\n  margin-bottom: 15px;\n}\n\nh6, .h6 {\n  font-size: 1.6rem;\n  text-transform: uppercase;\n  font-weight: 500;\n}\n\na.link {\n  font-family: \"BrixSansBold\";\n  font-size: 14px;\n  font-weight: normal;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.33;\n  letter-spacing: 0.27px;\n  color: var(--primaryColor, #dd0060);\n  text-transform: capitalize;\n  cursor: pointer;\n}\n\n.link.primary-link {\n  font-size: 1.2rem;\n  display: block;\n  width: 100%;\n}\n\n.secondary-link {\n  display: block;\n  width: 100%;\n}\n\n.card-blog .card-title {\n  font-weight: 700;\n}\n\n.description,\n.card-description,\n.footer-big p {\n  color: var(--senaryColor, #e5e5e5);\n}\n\n.abstract {\n  font-family: \"BrixSansBold\";\n  font-size: 1.8rem;\n  font-weight: bold;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.33;\n  letter-spacing: 0.17px;\n  color: var(--tertiaryColor, #000000);\n}\n\n.copy {\n  font-family: \"BrixSansRegular\";\n  font-size: 1.8rem;\n  font-weight: normal;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.33;\n  letter-spacing: 0.17px;\n  color: var(--tertiaryColor, #000000);\n}\n\n.copy-small {\n  font-family: \"BrixSansRegular\";\n  font-size: 1.6rem;\n  font-weight: normal;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.38;\n  letter-spacing: 0.15px;\n  color: var(--tertiaryColor, #000000);\n}\n\n.highlighter-text {\n  font-family: \"BrixSansLight\";\n  font-size: 2.4rem;\n  font-weight: 300;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.33;\n  letter-spacing: 0.23px;\n  color: var(--tertiaryColor, #000000);\n}\n\n.additional-copy {\n  font-family: \"BrixSansRegular\";\n  font-size: 1.8rem;\n  font-weight: normal;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.33;\n  letter-spacing: 0.23px;\n  color: var(--quinaryColor, #7f7f7f);\n}\n\n.additional-copy-small {\n  font-family: \"BrixSansRegular\";\n  font-size: 1.4rem;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.29;\n  letter-spacing: 0.13px;\n  color: var(--quinaryColor, #7f7f7f);\n}\n\n.label {\n  font-family: \"BrixSansRegular\";\n  font-size: 1.2rem;\n  font-weight: normal;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.25;\n  letter-spacing: 0.2px;\n  color: var(--octonaryColor, #bfbfbf);\n  display: block;\n  text-transform: uppercase;\n  width: 100%;\n  margin-bottom: 8px;\n}\n\n.align-items-center {\n  -ms-flex-align: center !important;\n  align-items: center !important;\n}\n\n.no-margin {\n  margin-top: 0 !important;\n  margin-right: 0 !important;\n  margin-bottom: 0 !important;\n  margin-left: 0 !important;\n}\n\n.card {\n  display: block;\n  overflow: hidden;\n  margin: 12px;\n  border-radius: 2px;\n  width: calc(100% - 24px);\n  font-size: 1.4rem;\n  background: var(--quaternaryColor, #ffffff);\n  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);\n}\n\n.no-padding {\n  padding-top: 0 !important;\n  padding-right: 0 !important;\n  padding-bottom: 0 !important;\n  padding-left: 0 !important;\n}\n\n.text-wrap {\n  white-space: normal !important;\n  word-wrap: break-word;\n}\n\n.row {\n  margin-right: 0;\n  margin-left: 0;\n}\n.row.align-items-start {\n  -ms-flex-align: start;\n  align-items: flex-start;\n}\n\n.tab-container {\n  margin-bottom: 5.9rem;\n  width: 100%;\n}\n.tab-container .inner-wrapper {\n  padding: 20px;\n}\n\n\@media screen and (min-width: 1024px) {\n  .tab-container {\n    width: calc(100% - 59px);\n  }\n}\n\@media only screen and (min-width: 768px) {\n  .col-md-auto {\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    width: auto;\n  }\n}\n\@media only screen and (min-width: 1024px) {\n  .col-lg-auto {\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    width: auto;\n  }\n}\n\@media only screen and (min-width: 1366px) {\n  .col-xlg-auto {\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    width: auto;\n  }\n}\n:root {\n  width: 100vw;\n  height: 100vh;\n  overflow-x: hidden;\n  overflow-y: auto;\n  margin: 0;\n  padding: 0;\n  background-color: var(--quaternaryColor, #ffffff);\n}\n:root body {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n}\n\n\@font-face {\n  font-family: \"icomoon\";\n  src: url(\"./../assets/fonts/rh-icons/icomoon.eot?xac4ys\");\n  src: url(\"./../assets/fonts/rh-icons/icomoon.eot?xac4ys#iefix\") format(\"embedded-opentype\"), url(\"./../assets/fonts/rh-icons/icomoon.ttf?xac4ys\") format(\"truetype\"), url(\"./../assets/fonts/rh-icons/icomoon.woff?xac4ys\") format(\"woff\"), url(\"./../assets/fonts/rh-icons/icomoon.svg?xac4ys#icomoon\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n  font-display: block;\n  font-size: inherit;\n  color: inherit;\n}\n[class^=icon-], [class*=\" icon-\"] {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: \"icomoon\" !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  font-size: inherit;\n  color: inherit;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.icon-new_pairing_icon .path1:before {\n  content: \"\";\n  color: black;\n}\n\n.icon-new_pairing_icon .path2:before {\n  content: \"\";\n  margin-left: -2.09765625em;\n  color: black;\n}\n\n.icon-new_pairing_icon .path3:before {\n  content: \"\";\n  margin-left: -2.09765625em;\n  color: black;\n}\n\n.icon-new_pairing_icon .path4:before {\n  content: \"\";\n  margin-left: -2.09765625em;\n  color: black;\n}\n\n.icon-new_pairing_icon .path5:before {\n  content: \"\";\n  margin-left: -2.09765625em;\n  color: #37a58c;\n}\n\n.icon-notification-fill:before {\n  content: \"\";\n  color: #dd0060;\n}\n\n.icon-notification:before {\n  content: \"\";\n}\n\n.icon-checkmark:before {\n  content: \"\";\n  color: #dd0060;\n}\n\n.icon-plus:before {\n  content: \"\";\n  color: #fff;\n}\n\n.icon-next:before {\n  content: \"\";\n  font-family: \"icomoon\";\n}\n\n.icon-rz-schritt-9-1 .path1:before {\n  content: \"\";\n  color: #37a58c;\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-9-1 .path2:before {\n  content: \"\";\n  margin-left: -1em;\n  color: black;\n}\n\n.icon-rz-schritt-9-1 .path3:before {\n  content: \"\";\n  margin-left: -1em;\n  color: black;\n}\n\n.icon-rz-schritt-9-1 .path4:before {\n  content: \"\";\n  margin-left: -1em;\n  color: black;\n}\n\n.icon-time:before {\n  content: \"\";\n}\n\n.icon-time-filled:before {\n  content: \"\";\n}\n\n.icon-settings:before {\n  content: \"\";\n}\n\n.icon-settings-filled:before {\n  content: \"\";\n}\n\n.icon-rz-willkommen .path1:before {\n  content: \"\";\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-willkommen .path2:before {\n  content: \"\";\n  margin-left: -0.7841796875em;\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-9-0 .path1:before {\n  content: \"\";\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-9-0 .path2:before {\n  content: \"\";\n  margin-left: -0.8017578125em;\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-8-0 .path1:before {\n  content: \"\";\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-8-0 .path2:before {\n  content: \"\";\n  margin-left: -1.59375em;\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-7-0 .path1:before {\n  content: \"\";\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-7-0 .path2:before {\n  content: \"\";\n  margin-left: -1em;\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-7-0 .path3:before {\n  content: \"\";\n  margin-left: -1em;\n  color: var(--tertiaryColor, #000000);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-7-0 .path4:before {\n  content: \"\";\n  margin-left: -1em;\n  color: var(--tertiaryColor, #000000);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-6-1 .path1:before {\n  content: \"\";\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-6-1 .path2:before {\n  content: \"\";\n  margin-left: -1.693359375em;\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-6-0 .path1:before {\n  content: \"\";\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-6-0 .path2:before {\n  content: \"\";\n  margin-left: -0.748046875em;\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-5-2 .path1:before {\n  content: \"\";\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-5-2 .path2:before {\n  content: \"\";\n  margin-left: -1em;\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-5-1 .path1:before {\n  content: \"\";\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-5-1 .path2:before {\n  content: \"\";\n  margin-left: -1em;\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-5-0 .path1:before {\n  content: \"\";\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-5-0 .path2:before {\n  content: \"\";\n  margin-left: -1em;\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-4-0 .path1:before {\n  content: \"\";\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-4-0 .path2:before {\n  content: \"\";\n  margin-left: -1.888671875em;\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-3-0 .path1:before {\n  content: \"\";\n  color: var(--secondaryColor, #37a58c);\n  font-size: 102px;\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-3-0 .path2:before {\n  content: \"\";\n  margin-left: -1.3525390625em;\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-2-0 .path1:before {\n  content: \"\";\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-2-0 .path2:before {\n  content: \"\";\n  margin-left: -1em;\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-1-0 .path1:before {\n  content: \"\";\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-1-0 .path2:before {\n  content: \"\";\n  margin-left: -0.98828125em;\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-abschluss .path1:before {\n  content: \"\";\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-abschluss .path2:before {\n  content: \"\";\n  margin-left: -0.927734375em;\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-home:before {\n  content: \"\";\n}\n\n.icon-home-filled:before {\n  content: \"\";\n}\n\n.icon-group-3:before {\n  content: \"\";\n}\n\n.icon-rehau_logo .path1:before {\n  content: \"\";\n}\n\n.icon-rehau_logo .path2:before {\n  content: \"\";\n  margin-left: -3.0625em;\n}\n\n.icon-rehau_logo .path3:before {\n  content: \"\";\n  margin-left: -3.0625em;\n}\n\n.icon-rehau_logo .path4:before {\n  content: \"\";\n  margin-left: -3.0625em;\n  opacity: 0.8;\n}\n\n:root {\n  font-size: 62.5%;\n  font-family: \"BrixSansRegular\";\n  font-weight: 400;\n}\n:root i[class^=icon-], :root i[class*=icon-] {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: \"icomoon\" !important;\n  speak-as: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n:host {\n  font-family: \"BrixSansRegular\";\n  font-weight: 400;\n}\n:host i[class^=icon-], :host i[class*=icon-] {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: \"icomoon\" !important;\n  speak-as: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n:host > .grid {\n  overflow: hidden;\n}\n:host > .grid > .row {\n  width: 200%;\n}\n:host > .grid > .row > .slider-container {\n  padding: 0;\n  background: var(--quaternaryColor, #ffffff);\n  position: relative;\n  z-index: 1;\n}\n:host > .grid > .row > .slider-container.animated {\n  -webkit-transition: left 0.3s linear 0s;\n  transition: left 0.3s linear 0s;\n}\n:host > .grid > .row > .slider-container.open > :first-child {\n  pointer-events: none;\n}\n:host > .grid > .row > .buttons-container {\n  padding: 0;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n}\n:host > .grid > .row > .buttons-container > .row {\n  height: 100%;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  position: relative;\n}"; }
};

export { RhSlidingMolecule as rh_sliding };
