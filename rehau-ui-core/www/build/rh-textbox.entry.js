import { r as registerInstance, d as createEvent, h } from './core-d8415857.js';
import { v as validateInput } from './input-validators-046c223a.js';
import { c as createCommonjsModule } from './_commonjsHelpers-91036208.js';

var window_1 = createCommonjsModule(function (module, exports) {
/*!
* global/window.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2019 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 4.0.9
*/

if (typeof undefined === "function" && undefined.amd) undefined(function() {
    return typeof window !== "undefined" ? window : new (eval("require('jsdom').JSDOM"))("").window;
}); else if ('object' === "object") module.exports = typeof window !== "undefined" ? window : new (eval("require('jsdom').JSDOM"))("").window;
});

var inputmask_dependencyLib = createCommonjsModule(function (module, exports) {
/*!
* dependencyLibs/inputmask.dependencyLib.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2019 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 4.0.9
*/

(function(factory) {
    if (typeof undefined === "function" && undefined.amd) {
        undefined([ "../global/window" ], factory);
    } else if ('object' === "object") {
        module.exports = factory(window_1);
    } else {
        window.dependencyLib = factory(window);
    }
})(function(window) {
    var document = window.document;
    function indexOf(list, elem) {
        var i = 0, len = list.length;
        for (;i < len; i++) {
            if (list[i] === elem) {
                return i;
            }
        }
        return -1;
    }
    function isWindow(obj) {
        return obj != null && obj === obj.window;
    }
    function isArraylike(obj) {
        var length = "length" in obj && obj.length, ltype = typeof obj;
        if (ltype === "function" || isWindow(obj)) {
            return false;
        }
        if (obj.nodeType === 1 && length) {
            return true;
        }
        return ltype === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
    }
    function isValidElement(elem) {
        return elem instanceof Element;
    }
    function DependencyLib(elem) {
        if (elem instanceof DependencyLib) {
            return elem;
        }
        if (!(this instanceof DependencyLib)) {
            return new DependencyLib(elem);
        }
        if (elem !== undefined && elem !== null && elem !== window) {
            this[0] = elem.nodeName ? elem : elem[0] !== undefined && elem[0].nodeName ? elem[0] : document.querySelector(elem);
            if (this[0] !== undefined && this[0] !== null) {
                this[0].eventRegistry = this[0].eventRegistry || {};
            }
        }
    }
    function getWindow(elem) {
        return isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
    }
    DependencyLib.prototype = {
        on: function(events, handler) {
            if (isValidElement(this[0])) {
                var eventRegistry = this[0].eventRegistry, elem = this[0];
                var addEvent = function(ev, namespace) {
                    if (elem.addEventListener) {
                        elem.addEventListener(ev, handler, false);
                    } else if (elem.attachEvent) {
                        elem.attachEvent("on" + ev, handler);
                    }
                    eventRegistry[ev] = eventRegistry[ev] || {};
                    eventRegistry[ev][namespace] = eventRegistry[ev][namespace] || [];
                    eventRegistry[ev][namespace].push(handler);
                };
                var _events = events.split(" ");
                for (var endx = 0; endx < _events.length; endx++) {
                    var nsEvent = _events[endx].split("."), ev = nsEvent[0], namespace = nsEvent[1] || "global";
                    addEvent(ev, namespace);
                }
            }
            return this;
        },
        off: function(events, handler) {
            if (isValidElement(this[0])) {
                var eventRegistry = this[0].eventRegistry, elem = this[0];
                var removeEvent = function(ev, namespace, handler) {
                    if (ev in eventRegistry === true) {
                        if (elem.removeEventListener) {
                            elem.removeEventListener(ev, handler, false);
                        } else if (elem.detachEvent) {
                            elem.detachEvent("on" + ev, handler);
                        }
                        if (namespace === "global") {
                            for (var nmsp in eventRegistry[ev]) {
                                eventRegistry[ev][nmsp].splice(eventRegistry[ev][nmsp].indexOf(handler), 1);
                            }
                        } else {
                            eventRegistry[ev][namespace].splice(eventRegistry[ev][namespace].indexOf(handler), 1);
                        }
                    }
                };
                var resolveNamespace = function(ev, namespace) {
                    var evts = [], hndx, hndL;
                    if (ev.length > 0) {
                        if (handler === undefined) {
                            for (hndx = 0, hndL = eventRegistry[ev][namespace].length; hndx < hndL; hndx++) {
                                evts.push({
                                    ev: ev,
                                    namespace: namespace && namespace.length > 0 ? namespace : "global",
                                    handler: eventRegistry[ev][namespace][hndx]
                                });
                            }
                        } else {
                            evts.push({
                                ev: ev,
                                namespace: namespace && namespace.length > 0 ? namespace : "global",
                                handler: handler
                            });
                        }
                    } else if (namespace.length > 0) {
                        for (var evNdx in eventRegistry) {
                            for (var nmsp in eventRegistry[evNdx]) {
                                if (nmsp === namespace) {
                                    if (handler === undefined) {
                                        for (hndx = 0, hndL = eventRegistry[evNdx][nmsp].length; hndx < hndL; hndx++) {
                                            evts.push({
                                                ev: evNdx,
                                                namespace: nmsp,
                                                handler: eventRegistry[evNdx][nmsp][hndx]
                                            });
                                        }
                                    } else {
                                        evts.push({
                                            ev: evNdx,
                                            namespace: nmsp,
                                            handler: handler
                                        });
                                    }
                                }
                            }
                        }
                    }
                    return evts;
                };
                var _events = events.split(" ");
                for (var endx = 0; endx < _events.length; endx++) {
                    var nsEvent = _events[endx].split("."), offEvents = resolveNamespace(nsEvent[0], nsEvent[1]);
                    for (var i = 0, offEventsL = offEvents.length; i < offEventsL; i++) {
                        removeEvent(offEvents[i].ev, offEvents[i].namespace, offEvents[i].handler);
                    }
                }
            }
            return this;
        },
        trigger: function(events) {
            if (isValidElement(this[0])) {
                var eventRegistry = this[0].eventRegistry, elem = this[0];
                var _events = typeof events === "string" ? events.split(" ") : [ events.type ];
                for (var endx = 0; endx < _events.length; endx++) {
                    var nsEvent = _events[endx].split("."), ev = nsEvent[0], namespace = nsEvent[1] || "global";
                    if (document !== undefined && namespace === "global") {
                        var evnt, i, params = {
                            bubbles: true,
                            cancelable: true,
                            detail: arguments[1]
                        };
                        if (document.createEvent) {
                            try {
                                evnt = new CustomEvent(ev, params);
                            } catch (e) {
                                evnt = document.createEvent("CustomEvent");
                                evnt.initCustomEvent(ev, params.bubbles, params.cancelable, params.detail);
                            }
                            if (events.type) DependencyLib.extend(evnt, events);
                            elem.dispatchEvent(evnt);
                        } else {
                            evnt = document.createEventObject();
                            evnt.eventType = ev;
                            evnt.detail = arguments[1];
                            if (events.type) DependencyLib.extend(evnt, events);
                            elem.fireEvent("on" + evnt.eventType, evnt);
                        }
                    } else if (eventRegistry[ev] !== undefined) {
                        arguments[0] = arguments[0].type ? arguments[0] : DependencyLib.Event(arguments[0]);
                        if (namespace === "global") {
                            for (var nmsp in eventRegistry[ev]) {
                                for (i = 0; i < eventRegistry[ev][nmsp].length; i++) {
                                    eventRegistry[ev][nmsp][i].apply(elem, arguments);
                                }
                            }
                        } else {
                            for (i = 0; i < eventRegistry[ev][namespace].length; i++) {
                                eventRegistry[ev][namespace][i].apply(elem, arguments);
                            }
                        }
                    }
                }
            }
            return this;
        }
    };
    DependencyLib.isFunction = function(obj) {
        return typeof obj === "function";
    };
    DependencyLib.noop = function() {};
    DependencyLib.isArray = Array.isArray;
    DependencyLib.inArray = function(elem, arr, i) {
        return arr == null ? -1 : indexOf(arr, elem, i);
    };
    DependencyLib.valHooks = undefined;
    DependencyLib.isPlainObject = function(obj) {
        if (typeof obj !== "object" || obj.nodeType || isWindow(obj)) {
            return false;
        }
        if (obj.constructor && !Object.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
            return false;
        }
        return true;
    };
    DependencyLib.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        if (typeof target !== "object" && !DependencyLib.isFunction(target)) {
            target = {};
        }
        if (i === length) {
            target = this;
            i--;
        }
        for (;i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && (DependencyLib.isPlainObject(copy) || (copyIsArray = DependencyLib.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && DependencyLib.isArray(src) ? src : [];
                        } else {
                            clone = src && DependencyLib.isPlainObject(src) ? src : {};
                        }
                        target[name] = DependencyLib.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };
    DependencyLib.each = function(obj, callback) {
        var value, i = 0;
        if (isArraylike(obj)) {
            for (var length = obj.length; i < length; i++) {
                value = callback.call(obj[i], i, obj[i]);
                if (value === false) {
                    break;
                }
            }
        } else {
            for (i in obj) {
                value = callback.call(obj[i], i, obj[i]);
                if (value === false) {
                    break;
                }
            }
        }
        return obj;
    };
    DependencyLib.data = function(owner, key, value) {
        if (value === undefined) {
            return owner.__data ? owner.__data[key] : null;
        } else {
            owner.__data = owner.__data || {};
            owner.__data[key] = value;
        }
    };
    if (typeof window.CustomEvent === "function") {
        DependencyLib.Event = window.CustomEvent;
    } else {
        DependencyLib.Event = function(event, params) {
            params = params || {
                bubbles: false,
                cancelable: false,
                detail: undefined
            };
            var evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };
        DependencyLib.Event.prototype = window.Event.prototype;
    }
    return DependencyLib;
});
});

var inputmask = createCommonjsModule(function (module, exports) {
/*!
* inputmask.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2019 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 4.0.9
*/

(function(factory) {
    if (typeof undefined === "function" && undefined.amd) {
        undefined([ "./dependencyLibs/inputmask.dependencyLib", "./global/window" ], factory);
    } else if ('object' === "object") {
        module.exports = factory(inputmask_dependencyLib, window_1);
    } else {
        window.Inputmask = factory(window.dependencyLib || jQuery, window);
    }
})(function($, window, undefined$1) {
    var document = window.document, ua = navigator.userAgent, ie = ua.indexOf("MSIE ") > 0 || ua.indexOf("Trident/") > 0, mobile = isInputEventSupported("touchstart"), iemobile = /iemobile/i.test(ua), iphone = /iphone/i.test(ua) && !iemobile;
    function Inputmask(alias, options, internal) {
        if (!(this instanceof Inputmask)) {
            return new Inputmask(alias, options, internal);
        }
        this.el = undefined$1;
        this.events = {};
        this.maskset = undefined$1;
        this.refreshValue = false;
        if (internal !== true) {
            if ($.isPlainObject(alias)) {
                options = alias;
            } else {
                options = options || {};
                if (alias) options.alias = alias;
            }
            this.opts = $.extend(true, {}, this.defaults, options);
            this.noMasksCache = options && options.definitions !== undefined$1;
            this.userOptions = options || {};
            this.isRTL = this.opts.numericInput;
            resolveAlias(this.opts.alias, options, this.opts);
        }
    }
    Inputmask.prototype = {
        dataAttribute: "data-inputmask",
        defaults: {
            placeholder: "_",
            optionalmarker: [ "[", "]" ],
            quantifiermarker: [ "{", "}" ],
            groupmarker: [ "(", ")" ],
            alternatormarker: "|",
            escapeChar: "\\",
            mask: null,
            regex: null,
            oncomplete: $.noop,
            onincomplete: $.noop,
            oncleared: $.noop,
            repeat: 0,
            greedy: false,
            autoUnmask: false,
            removeMaskOnSubmit: false,
            clearMaskOnLostFocus: true,
            insertMode: true,
            clearIncomplete: false,
            alias: null,
            onKeyDown: $.noop,
            onBeforeMask: null,
            onBeforePaste: function(pastedValue, opts) {
                return $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
            },
            onBeforeWrite: null,
            onUnMask: null,
            showMaskOnFocus: true,
            showMaskOnHover: true,
            onKeyValidation: $.noop,
            skipOptionalPartCharacter: " ",
            numericInput: false,
            rightAlign: false,
            undoOnEscape: true,
            radixPoint: "",
            _radixDance: false,
            groupSeparator: "",
            keepStatic: null,
            positionCaretOnTab: true,
            tabThrough: false,
            supportsInputType: [ "text", "tel", "url", "password", "search" ],
            ignorables: [ 8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229 ],
            isComplete: null,
            preValidation: null,
            postValidation: null,
            staticDefinitionSymbol: undefined$1,
            jitMasking: false,
            nullable: true,
            inputEventOnly: false,
            noValuePatching: false,
            positionCaretOnClick: "lvp",
            casing: null,
            inputmode: "verbatim",
            colorMask: false,
            disablePredictiveText: false,
            importDataAttributes: true,
            shiftPositions: true
        },
        definitions: {
            9: {
                validator: "[0-9\uff11-\uff19]",
                definitionSymbol: "*"
            },
            a: {
                validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                definitionSymbol: "*"
            },
            "*": {
                validator: "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]"
            }
        },
        aliases: {},
        masksCache: {},
        mask: function(elems) {
            var that = this;
            function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
                if (opts.importDataAttributes === true) {
                    var attrOptions = npt.getAttribute(dataAttribute), option, dataoptions, optionData, p;
                    var importOption = function(option, optionData) {
                        optionData = optionData !== undefined$1 ? optionData : npt.getAttribute(dataAttribute + "-" + option);
                        if (optionData !== null) {
                            if (typeof optionData === "string") {
                                if (option.indexOf("on") === 0) optionData = window[optionData]; else if (optionData === "false") optionData = false; else if (optionData === "true") optionData = true;
                            }
                            userOptions[option] = optionData;
                        }
                    };
                    if (attrOptions && attrOptions !== "") {
                        attrOptions = attrOptions.replace(/'/g, '"');
                        dataoptions = JSON.parse("{" + attrOptions + "}");
                    }
                    if (dataoptions) {
                        optionData = undefined$1;
                        for (p in dataoptions) {
                            if (p.toLowerCase() === "alias") {
                                optionData = dataoptions[p];
                                break;
                            }
                        }
                    }
                    importOption("alias", optionData);
                    if (userOptions.alias) {
                        resolveAlias(userOptions.alias, userOptions, opts);
                    }
                    for (option in opts) {
                        if (dataoptions) {
                            optionData = undefined$1;
                            for (p in dataoptions) {
                                if (p.toLowerCase() === option.toLowerCase()) {
                                    optionData = dataoptions[p];
                                    break;
                                }
                            }
                        }
                        importOption(option, optionData);
                    }
                }
                $.extend(true, opts, userOptions);
                if (npt.dir === "rtl" || opts.rightAlign) {
                    npt.style.textAlign = "right";
                }
                if (npt.dir === "rtl" || opts.numericInput) {
                    npt.dir = "ltr";
                    npt.removeAttribute("dir");
                    opts.isRTL = true;
                }
                return Object.keys(userOptions).length;
            }
            if (typeof elems === "string") {
                elems = document.getElementById(elems) || document.querySelectorAll(elems);
            }
            elems = elems.nodeName ? [ elems ] : elems;
            $.each(elems, function(ndx, el) {
                var scopedOpts = $.extend(true, {}, that.opts);
                if (importAttributeOptions(el, scopedOpts, $.extend(true, {}, that.userOptions), that.dataAttribute)) {
                    var maskset = generateMaskSet(scopedOpts, that.noMasksCache);
                    if (maskset !== undefined$1) {
                        if (el.inputmask !== undefined$1) {
                            el.inputmask.opts.autoUnmask = true;
                            el.inputmask.remove();
                        }
                        el.inputmask = new Inputmask(undefined$1, undefined$1, true);
                        el.inputmask.opts = scopedOpts;
                        el.inputmask.noMasksCache = that.noMasksCache;
                        el.inputmask.userOptions = $.extend(true, {}, that.userOptions);
                        el.inputmask.isRTL = scopedOpts.isRTL || scopedOpts.numericInput;
                        el.inputmask.el = el;
                        el.inputmask.maskset = maskset;
                        $.data(el, "_inputmask_opts", scopedOpts);
                        maskScope.call(el.inputmask, {
                            action: "mask"
                        });
                    }
                }
            });
            return elems && elems[0] ? elems[0].inputmask || this : this;
        },
        option: function(options, noremask) {
            if (typeof options === "string") {
                return this.opts[options];
            } else if (typeof options === "object") {
                $.extend(this.userOptions, options);
                if (this.el && noremask !== true) {
                    this.mask(this.el);
                }
                return this;
            }
        },
        unmaskedvalue: function(value) {
            this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
            return maskScope.call(this, {
                action: "unmaskedvalue",
                value: value
            });
        },
        remove: function() {
            return maskScope.call(this, {
                action: "remove"
            });
        },
        getemptymask: function() {
            this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
            return maskScope.call(this, {
                action: "getemptymask"
            });
        },
        hasMaskedValue: function() {
            return !this.opts.autoUnmask;
        },
        isComplete: function() {
            this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
            return maskScope.call(this, {
                action: "isComplete"
            });
        },
        getmetadata: function() {
            this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
            return maskScope.call(this, {
                action: "getmetadata"
            });
        },
        isValid: function(value) {
            this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
            return maskScope.call(this, {
                action: "isValid",
                value: value
            });
        },
        format: function(value, metadata) {
            this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
            return maskScope.call(this, {
                action: "format",
                value: value,
                metadata: metadata
            });
        },
        setValue: function(value) {
            if (this.el) {
                $(this.el).trigger("setvalue", [ value ]);
            }
        },
        analyseMask: function(mask, regexMask, opts) {
            var tokenizer = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?(?:\|[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g, regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g, escaped = false, currentToken = new MaskToken(), match, m, openenings = [], maskTokens = [], openingToken, currentOpeningToken, alternator, lastMatch, groupToken;
            function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
                this.matches = [];
                this.openGroup = isGroup || false;
                this.alternatorGroup = false;
                this.isGroup = isGroup || false;
                this.isOptional = isOptional || false;
                this.isQuantifier = isQuantifier || false;
                this.isAlternator = isAlternator || false;
                this.quantifier = {
                    min: 1,
                    max: 1
                };
            }
            function insertTestDefinition(mtoken, element, position) {
                position = position !== undefined$1 ? position : mtoken.matches.length;
                var prevMatch = mtoken.matches[position - 1];
                if (regexMask) {
                    if (element.indexOf("[") === 0 || escaped && /\\d|\\s|\\w]/i.test(element) || element === ".") {
                        mtoken.matches.splice(position++, 0, {
                            fn: new RegExp(element, opts.casing ? "i" : ""),
                            optionality: false,
                            newBlockMarker: prevMatch === undefined$1 ? "master" : prevMatch.def !== element,
                            casing: null,
                            def: element,
                            placeholder: undefined$1,
                            nativeDef: element
                        });
                    } else {
                        if (escaped) element = element[element.length - 1];
                        $.each(element.split(""), function(ndx, lmnt) {
                            prevMatch = mtoken.matches[position - 1];
                            mtoken.matches.splice(position++, 0, {
                                fn: null,
                                optionality: false,
                                newBlockMarker: prevMatch === undefined$1 ? "master" : prevMatch.def !== lmnt && prevMatch.fn !== null,
                                casing: null,
                                def: opts.staticDefinitionSymbol || lmnt,
                                placeholder: opts.staticDefinitionSymbol !== undefined$1 ? lmnt : undefined$1,
                                nativeDef: (escaped ? "'" : "") + lmnt
                            });
                        });
                    }
                    escaped = false;
                } else {
                    var maskdef = (opts.definitions ? opts.definitions[element] : undefined$1) || Inputmask.prototype.definitions[element];
                    if (maskdef && !escaped) {
                        mtoken.matches.splice(position++, 0, {
                            fn: maskdef.validator ? typeof maskdef.validator == "string" ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function() {
                                this.test = maskdef.validator;
                            }() : new RegExp("."),
                            optionality: false,
                            newBlockMarker: prevMatch === undefined$1 ? "master" : prevMatch.def !== (maskdef.definitionSymbol || element),
                            casing: maskdef.casing,
                            def: maskdef.definitionSymbol || element,
                            placeholder: maskdef.placeholder,
                            nativeDef: element
                        });
                    } else {
                        mtoken.matches.splice(position++, 0, {
                            fn: null,
                            optionality: false,
                            newBlockMarker: prevMatch === undefined$1 ? "master" : prevMatch.def !== element && prevMatch.fn !== null,
                            casing: null,
                            def: opts.staticDefinitionSymbol || element,
                            placeholder: opts.staticDefinitionSymbol !== undefined$1 ? element : undefined$1,
                            nativeDef: (escaped ? "'" : "") + element
                        });
                        escaped = false;
                    }
                }
            }
            function verifyGroupMarker(maskToken) {
                if (maskToken && maskToken.matches) {
                    $.each(maskToken.matches, function(ndx, token) {
                        var nextToken = maskToken.matches[ndx + 1];
                        if ((nextToken === undefined$1 || (nextToken.matches === undefined$1 || nextToken.isQuantifier === false)) && token && token.isGroup) {
                            token.isGroup = false;
                            if (!regexMask) {
                                insertTestDefinition(token, opts.groupmarker[0], 0);
                                if (token.openGroup !== true) {
                                    insertTestDefinition(token, opts.groupmarker[1]);
                                }
                            }
                        }
                        verifyGroupMarker(token);
                    });
                }
            }
            function defaultCase() {
                if (openenings.length > 0) {
                    currentOpeningToken = openenings[openenings.length - 1];
                    insertTestDefinition(currentOpeningToken, m);
                    if (currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
                            if (alternator.matches[mndx].isGroup) alternator.matches[mndx].isGroup = false;
                        }
                        if (openenings.length > 0) {
                            currentOpeningToken = openenings[openenings.length - 1];
                            currentOpeningToken.matches.push(alternator);
                        } else {
                            currentToken.matches.push(alternator);
                        }
                    }
                } else {
                    insertTestDefinition(currentToken, m);
                }
            }
            function reverseTokens(maskToken) {
                function reverseStatic(st) {
                    if (st === opts.optionalmarker[0]) st = opts.optionalmarker[1]; else if (st === opts.optionalmarker[1]) st = opts.optionalmarker[0]; else if (st === opts.groupmarker[0]) st = opts.groupmarker[1]; else if (st === opts.groupmarker[1]) st = opts.groupmarker[0];
                    return st;
                }
                maskToken.matches = maskToken.matches.reverse();
                for (var match in maskToken.matches) {
                    if (maskToken.matches.hasOwnProperty(match)) {
                        var intMatch = parseInt(match);
                        if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
                            var qt = maskToken.matches[match];
                            maskToken.matches.splice(match, 1);
                            maskToken.matches.splice(intMatch + 1, 0, qt);
                        }
                        if (maskToken.matches[match].matches !== undefined$1) {
                            maskToken.matches[match] = reverseTokens(maskToken.matches[match]);
                        } else {
                            maskToken.matches[match] = reverseStatic(maskToken.matches[match]);
                        }
                    }
                }
                return maskToken;
            }
            function groupify(matches) {
                var groupToken = new MaskToken(true);
                groupToken.openGroup = false;
                groupToken.matches = matches;
                return groupToken;
            }
            if (regexMask) {
                opts.optionalmarker[0] = undefined$1;
                opts.optionalmarker[1] = undefined$1;
            }
            while (match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask)) {
                m = match[0];
                if (regexMask) {
                    switch (m.charAt(0)) {
                      case "?":
                        m = "{0,1}";
                        break;

                      case "+":
                      case "*":
                        m = "{" + m + "}";
                        break;
                    }
                }
                if (escaped) {
                    defaultCase();
                    continue;
                }
                switch (m.charAt(0)) {
                  case "(?=":
                    break;

                  case "(?!":
                    break;

                  case "(?<=":
                    break;

                  case "(?<!":
                    break;

                  case opts.escapeChar:
                    escaped = true;
                    if (regexMask) {
                        defaultCase();
                    }
                    break;

                  case opts.optionalmarker[1]:
                  case opts.groupmarker[1]:
                    openingToken = openenings.pop();
                    openingToken.openGroup = false;
                    if (openingToken !== undefined$1) {
                        if (openenings.length > 0) {
                            currentOpeningToken = openenings[openenings.length - 1];
                            currentOpeningToken.matches.push(openingToken);
                            if (currentOpeningToken.isAlternator) {
                                alternator = openenings.pop();
                                for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
                                    alternator.matches[mndx].isGroup = false;
                                    alternator.matches[mndx].alternatorGroup = false;
                                }
                                if (openenings.length > 0) {
                                    currentOpeningToken = openenings[openenings.length - 1];
                                    currentOpeningToken.matches.push(alternator);
                                } else {
                                    currentToken.matches.push(alternator);
                                }
                            }
                        } else {
                            currentToken.matches.push(openingToken);
                        }
                    } else defaultCase();
                    break;

                  case opts.optionalmarker[0]:
                    openenings.push(new MaskToken(false, true));
                    break;

                  case opts.groupmarker[0]:
                    openenings.push(new MaskToken(true));
                    break;

                  case opts.quantifiermarker[0]:
                    var quantifier = new MaskToken(false, false, true);
                    m = m.replace(/[{}]/g, "");
                    var mqj = m.split("|"), mq = mqj[0].split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]), mq1 = mq.length === 1 ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
                    if (mq0 === "*" || mq0 === "+") {
                        mq0 = mq1 === "*" ? 0 : 1;
                    }
                    quantifier.quantifier = {
                        min: mq0,
                        max: mq1,
                        jit: mqj[1]
                    };
                    var matches = openenings.length > 0 ? openenings[openenings.length - 1].matches : currentToken.matches;
                    match = matches.pop();
                    if (match.isAlternator) {
                        matches.push(match);
                        matches = match.matches;
                        var groupToken = new MaskToken(true);
                        var tmpMatch = matches.pop();
                        matches.push(groupToken);
                        matches = groupToken.matches;
                        match = tmpMatch;
                    }
                    if (!match.isGroup) {
                        match = groupify([ match ]);
                    }
                    matches.push(match);
                    matches.push(quantifier);
                    break;

                  case opts.alternatormarker:
                    var groupQuantifier = function(matches) {
                        var lastMatch = matches.pop();
                        if (lastMatch.isQuantifier) {
                            lastMatch = groupify([ matches.pop(), lastMatch ]);
                        }
                        return lastMatch;
                    };
                    if (openenings.length > 0) {
                        currentOpeningToken = openenings[openenings.length - 1];
                        var subToken = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];
                        if (currentOpeningToken.openGroup && (subToken.matches === undefined$1 || subToken.isGroup === false && subToken.isAlternator === false)) {
                            lastMatch = openenings.pop();
                        } else {
                            lastMatch = groupQuantifier(currentOpeningToken.matches);
                        }
                    } else {
                        lastMatch = groupQuantifier(currentToken.matches);
                    }
                    if (lastMatch.isAlternator) {
                        openenings.push(lastMatch);
                    } else {
                        if (lastMatch.alternatorGroup) {
                            alternator = openenings.pop();
                            lastMatch.alternatorGroup = false;
                        } else {
                            alternator = new MaskToken(false, false, false, true);
                        }
                        alternator.matches.push(lastMatch);
                        openenings.push(alternator);
                        if (lastMatch.openGroup) {
                            lastMatch.openGroup = false;
                            var alternatorGroup = new MaskToken(true);
                            alternatorGroup.alternatorGroup = true;
                            openenings.push(alternatorGroup);
                        }
                    }
                    break;

                  default:
                    defaultCase();
                }
            }
            while (openenings.length > 0) {
                openingToken = openenings.pop();
                currentToken.matches.push(openingToken);
            }
            if (currentToken.matches.length > 0) {
                verifyGroupMarker(currentToken);
                maskTokens.push(currentToken);
            }
            if (opts.numericInput || opts.isRTL) {
                reverseTokens(maskTokens[0]);
            }
            return maskTokens;
        },
        positionColorMask: function(input, template) {
            input.style.left = template.offsetLeft + "px";
        }
    };
    Inputmask.extendDefaults = function(options) {
        $.extend(true, Inputmask.prototype.defaults, options);
    };
    Inputmask.extendDefinitions = function(definition) {
        $.extend(true, Inputmask.prototype.definitions, definition);
    };
    Inputmask.extendAliases = function(alias) {
        $.extend(true, Inputmask.prototype.aliases, alias);
    };
    Inputmask.format = function(value, options, metadata) {
        return Inputmask(options).format(value, metadata);
    };
    Inputmask.unmask = function(value, options) {
        return Inputmask(options).unmaskedvalue(value);
    };
    Inputmask.isValid = function(value, options) {
        return Inputmask(options).isValid(value);
    };
    Inputmask.remove = function(elems) {
        if (typeof elems === "string") {
            elems = document.getElementById(elems) || document.querySelectorAll(elems);
        }
        elems = elems.nodeName ? [ elems ] : elems;
        $.each(elems, function(ndx, el) {
            if (el.inputmask) el.inputmask.remove();
        });
    };
    Inputmask.setValue = function(elems, value) {
        if (typeof elems === "string") {
            elems = document.getElementById(elems) || document.querySelectorAll(elems);
        }
        elems = elems.nodeName ? [ elems ] : elems;
        $.each(elems, function(ndx, el) {
            if (el.inputmask) el.inputmask.setValue(value); else $(el).trigger("setvalue", [ value ]);
        });
    };
    Inputmask.escapeRegex = function(str) {
        var specials = [ "/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^" ];
        return str.replace(new RegExp("(\\" + specials.join("|\\") + ")", "gim"), "\\$1");
    };
    Inputmask.keyCode = {
        BACKSPACE: 8,
        BACKSPACE_SAFARI: 127,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        INSERT: 45,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38,
        X: 88,
        CONTROL: 17
    };
    Inputmask.dependencyLib = $;
    function resolveAlias(aliasStr, options, opts) {
        var aliasDefinition = Inputmask.prototype.aliases[aliasStr];
        if (aliasDefinition) {
            if (aliasDefinition.alias) resolveAlias(aliasDefinition.alias, undefined$1, opts);
            $.extend(true, opts, aliasDefinition);
            $.extend(true, opts, options);
            return true;
        } else if (opts.mask === null) {
            opts.mask = aliasStr;
        }
        return false;
    }
    function generateMaskSet(opts, nocache) {
        function generateMask(mask, metadata, opts) {
            var regexMask = false;
            if (mask === null || mask === "") {
                regexMask = opts.regex !== null;
                if (regexMask) {
                    mask = opts.regex;
                    mask = mask.replace(/^(\^)(.*)(\$)$/, "$2");
                } else {
                    regexMask = true;
                    mask = ".*";
                }
            }
            if (mask.length === 1 && opts.greedy === false && opts.repeat !== 0) {
                opts.placeholder = "";
            }
            if (opts.repeat > 0 || opts.repeat === "*" || opts.repeat === "+") {
                var repeatStart = opts.repeat === "*" ? 0 : opts.repeat === "+" ? 1 : opts.repeat;
                mask = opts.groupmarker[0] + mask + opts.groupmarker[1] + opts.quantifiermarker[0] + repeatStart + "," + opts.repeat + opts.quantifiermarker[1];
            }
            var masksetDefinition, maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask;
            if (Inputmask.prototype.masksCache[maskdefKey] === undefined$1 || nocache === true) {
                masksetDefinition = {
                    mask: mask,
                    maskToken: Inputmask.prototype.analyseMask(mask, regexMask, opts),
                    validPositions: {},
                    _buffer: undefined$1,
                    buffer: undefined$1,
                    tests: {},
                    excludes: {},
                    metadata: metadata,
                    maskLength: undefined$1,
                    jitOffset: {}
                };
                if (nocache !== true) {
                    Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition;
                    masksetDefinition = $.extend(true, {}, Inputmask.prototype.masksCache[maskdefKey]);
                }
            } else masksetDefinition = $.extend(true, {}, Inputmask.prototype.masksCache[maskdefKey]);
            return masksetDefinition;
        }
        var ms;
        if ($.isFunction(opts.mask)) {
            opts.mask = opts.mask(opts);
        }
        if ($.isArray(opts.mask)) {
            if (opts.mask.length > 1) {
                if (opts.keepStatic === null) {
                    opts.keepStatic = "auto";
                    for (var i = 0; i < opts.mask.length; i++) {
                        if (opts.mask[i].charAt(0) !== opts.mask[0].charAt(0)) {
                            opts.keepStatic = true;
                            break;
                        }
                    }
                }
                var altMask = opts.groupmarker[0];
                $.each(opts.isRTL ? opts.mask.reverse() : opts.mask, function(ndx, msk) {
                    if (altMask.length > 1) {
                        altMask += opts.groupmarker[1] + opts.alternatormarker + opts.groupmarker[0];
                    }
                    if (msk.mask !== undefined$1 && !$.isFunction(msk.mask)) {
                        altMask += msk.mask;
                    } else {
                        altMask += msk;
                    }
                });
                altMask += opts.groupmarker[1];
                return generateMask(altMask, opts.mask, opts);
            } else opts.mask = opts.mask.pop();
        }
        if (opts.mask && opts.mask.mask !== undefined$1 && !$.isFunction(opts.mask.mask)) {
            ms = generateMask(opts.mask.mask, opts.mask, opts);
        } else {
            ms = generateMask(opts.mask, opts.mask, opts);
        }
        return ms;
    }
    function isInputEventSupported(eventName) {
        var el = document.createElement("input"), evName = "on" + eventName, isSupported = evName in el;
        if (!isSupported) {
            el.setAttribute(evName, "return;");
            isSupported = typeof el[evName] === "function";
        }
        el = null;
        return isSupported;
    }
    function maskScope(actionObj, maskset, opts) {
        maskset = maskset || this.maskset;
        opts = opts || this.opts;
        var inputmask = this, el = this.el, isRTL = this.isRTL, undoValue, $el, skipKeyPressEvent = false, skipInputEvent = false, ignorable = false, maxLength, mouseEnter = false, colorMask, originalPlaceholder;
        var getMaskTemplate = function(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
            var greedy = opts.greedy;
            if (clearOptionalTail) opts.greedy = false;
            minimalPos = minimalPos || 0;
            var maskTemplate = [], ndxIntlzr, pos = 0, test, testPos, lvp = getLastValidPosition();
            do {
                if (baseOnInput === true && getMaskSet().validPositions[pos]) {
                    testPos = clearOptionalTail && getMaskSet().validPositions[pos].match.optionality === true && getMaskSet().validPositions[pos + 1] === undefined$1 && (getMaskSet().validPositions[pos].generatedInput === true || getMaskSet().validPositions[pos].input == opts.skipOptionalPartCharacter && pos > 0) ? determineTestTemplate(pos, getTests(pos, ndxIntlzr, pos - 1)) : getMaskSet().validPositions[pos];
                    test = testPos.match;
                    ndxIntlzr = testPos.locator.slice();
                    maskTemplate.push(includeMode === true ? testPos.input : includeMode === false ? test.nativeDef : getPlaceholder(pos, test));
                } else {
                    testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
                    test = testPos.match;
                    ndxIntlzr = testPos.locator.slice();
                    var jitMasking = noJit === true ? false : opts.jitMasking !== false ? opts.jitMasking : test.jit;
                    if (jitMasking === false || jitMasking === undefined$1 || typeof jitMasking === "number" && isFinite(jitMasking) && jitMasking > pos) {
                        maskTemplate.push(includeMode === false ? test.nativeDef : getPlaceholder(pos, test));
                    }
                }
                if (opts.keepStatic === "auto") {
                    if (test.newBlockMarker && test.fn !== null) {
                        opts.keepStatic = pos - 1;
                    }
                }
                pos++;
            } while ((maxLength === undefined$1 || pos < maxLength) && (test.fn !== null || test.def !== "") || minimalPos > pos);
            if (maskTemplate[maskTemplate.length - 1] === "") {
                maskTemplate.pop();
            }
            if (includeMode !== false || getMaskSet().maskLength === undefined$1) getMaskSet().maskLength = pos - 1;
            opts.greedy = greedy;
            return maskTemplate;
        };
        function getMaskSet() {
            return maskset;
        }
        function resetMaskSet(soft) {
            var maskset = getMaskSet();
            maskset.buffer = undefined$1;
            if (soft !== true) {
                maskset.validPositions = {};
                maskset.p = 0;
            }
        }
        function getLastValidPosition(closestTo, strict, validPositions) {
            var before = -1, after = -1, valids = validPositions || getMaskSet().validPositions;
            if (closestTo === undefined$1) closestTo = -1;
            for (var posNdx in valids) {
                var psNdx = parseInt(posNdx);
                if (valids[psNdx] && (strict || valids[psNdx].generatedInput !== true)) {
                    if (psNdx <= closestTo) before = psNdx;
                    if (psNdx >= closestTo) after = psNdx;
                }
            }
            return before === -1 || before == closestTo ? after : after == -1 ? before : closestTo - before < after - closestTo ? before : after;
        }
        function getDecisionTaker(tst) {
            var decisionTaker = tst.locator[tst.alternation];
            if (typeof decisionTaker == "string" && decisionTaker.length > 0) {
                decisionTaker = decisionTaker.split(",")[0];
            }
            return decisionTaker !== undefined$1 ? decisionTaker.toString() : "";
        }
        function getLocator(tst, align) {
            var locator = (tst.alternation != undefined$1 ? tst.mloc[getDecisionTaker(tst)] : tst.locator).join("");
            if (locator !== "") while (locator.length < align) locator += "0";
            return locator;
        }
        function determineTestTemplate(pos, tests) {
            pos = pos > 0 ? pos - 1 : 0;
            var altTest = getTest(pos), targetLocator = getLocator(altTest), tstLocator, closest, bestMatch;
            for (var ndx = 0; ndx < tests.length; ndx++) {
                var tst = tests[ndx];
                tstLocator = getLocator(tst, targetLocator.length);
                var distance = Math.abs(tstLocator - targetLocator);
                if (closest === undefined$1 || tstLocator !== "" && distance < closest || bestMatch && !opts.greedy && bestMatch.match.optionality && bestMatch.match.newBlockMarker === "master" && (!tst.match.optionality || !tst.match.newBlockMarker) || bestMatch && bestMatch.match.optionalQuantifier && !tst.match.optionalQuantifier) {
                    closest = distance;
                    bestMatch = tst;
                }
            }
            return bestMatch;
        }
        function getTestTemplate(pos, ndxIntlzr, tstPs) {
            return getMaskSet().validPositions[pos] || determineTestTemplate(pos, getTests(pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
        }
        function getTest(pos, tests) {
            if (getMaskSet().validPositions[pos]) {
                return getMaskSet().validPositions[pos];
            }
            return (tests || getTests(pos))[0];
        }
        function positionCanMatchDefinition(pos, def) {
            var valid = false, tests = getTests(pos);
            for (var tndx = 0; tndx < tests.length; tndx++) {
                if (tests[tndx].match && tests[tndx].match.def === def) {
                    valid = true;
                    break;
                }
            }
            return valid;
        }
        function getTests(pos, ndxIntlzr, tstPs) {
            var maskTokens = getMaskSet().maskToken, testPos = ndxIntlzr ? tstPs : 0, ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [ 0 ], matches = [], insertStop = false, latestMatch, cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";
            function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
                function handleMatch(match, loopNdx, quantifierRecurse) {
                    function isFirstMatch(latestMatch, tokenGroup) {
                        var firstMatch = $.inArray(latestMatch, tokenGroup.matches) === 0;
                        if (!firstMatch) {
                            $.each(tokenGroup.matches, function(ndx, match) {
                                if (match.isQuantifier === true) firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]); else if (match.hasOwnProperty("matches")) firstMatch = isFirstMatch(latestMatch, match);
                                if (firstMatch) return false;
                            });
                        }
                        return firstMatch;
                    }
                    function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
                        var bestMatch, indexPos;
                        if (getMaskSet().tests[pos] || getMaskSet().validPositions[pos]) {
                            $.each(getMaskSet().tests[pos] || [ getMaskSet().validPositions[pos] ], function(ndx, lmnt) {
                                if (lmnt.mloc[alternateNdx]) {
                                    bestMatch = lmnt;
                                    return false;
                                }
                                var alternation = targetAlternation !== undefined$1 ? targetAlternation : lmnt.alternation, ndxPos = lmnt.locator[alternation] !== undefined$1 ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;
                                if ((indexPos === undefined$1 || ndxPos < indexPos) && ndxPos !== -1) {
                                    bestMatch = lmnt;
                                    indexPos = ndxPos;
                                }
                            });
                        }
                        if (bestMatch) {
                            var bestMatchAltIndex = bestMatch.locator[bestMatch.alternation];
                            var locator = bestMatch.mloc[alternateNdx] || bestMatch.mloc[bestMatchAltIndex] || bestMatch.locator;
                            return locator.slice((targetAlternation !== undefined$1 ? targetAlternation : bestMatch.alternation) + 1);
                        } else {
                            return targetAlternation !== undefined$1 ? resolveNdxInitializer(pos, alternateNdx) : undefined$1;
                        }
                    }
                    function isSubsetOf(source, target) {
                        function expand(pattern) {
                            var expanded = [], start, end;
                            for (var i = 0, l = pattern.length; i < l; i++) {
                                if (pattern.charAt(i) === "-") {
                                    end = pattern.charCodeAt(i + 1);
                                    while (++start < end) expanded.push(String.fromCharCode(start));
                                } else {
                                    start = pattern.charCodeAt(i);
                                    expanded.push(pattern.charAt(i));
                                }
                            }
                            return expanded.join("");
                        }
                        if (opts.regex && source.match.fn !== null && target.match.fn !== null) {
                            return expand(target.match.def.replace(/[\[\]]/g, "")).indexOf(expand(source.match.def.replace(/[\[\]]/g, ""))) !== -1;
                        }
                        return source.match.def === target.match.nativeDef;
                    }
                    function staticCanMatchDefinition(source, target) {
                        var sloc = source.locator.slice(source.alternation).join(""), tloc = target.locator.slice(target.alternation).join(""), canMatch = sloc == tloc;
                        canMatch = canMatch && source.match.fn === null && target.match.fn !== null ? target.match.fn.test(source.match.def, getMaskSet(), pos, false, opts, false) : false;
                        return canMatch;
                    }
                    function setMergeLocators(targetMatch, altMatch) {
                        if (altMatch === undefined$1 || targetMatch.alternation === altMatch.alternation && targetMatch.locator[targetMatch.alternation].toString().indexOf(altMatch.locator[altMatch.alternation]) === -1) {
                            targetMatch.mloc = targetMatch.mloc || {};
                            var locNdx = targetMatch.locator[targetMatch.alternation];
                            if (locNdx === undefined$1) targetMatch.alternation = undefined$1; else {
                                if (typeof locNdx === "string") locNdx = locNdx.split(",")[0];
                                if (targetMatch.mloc[locNdx] === undefined$1) targetMatch.mloc[locNdx] = targetMatch.locator.slice();
                                if (altMatch !== undefined$1) {
                                    for (var ndx in altMatch.mloc) {
                                        if (typeof ndx === "string") ndx = ndx.split(",")[0];
                                        if (targetMatch.mloc[ndx] === undefined$1) targetMatch.mloc[ndx] = altMatch.mloc[ndx];
                                    }
                                    targetMatch.locator[targetMatch.alternation] = Object.keys(targetMatch.mloc).join(",");
                                }
                                return true;
                            }
                        }
                        return false;
                    }
                    if (testPos > 500 && quantifierRecurse !== undefined$1) {
                        throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + getMaskSet().mask;
                    }
                    if (testPos === pos && match.matches === undefined$1) {
                        matches.push({
                            match: match,
                            locator: loopNdx.reverse(),
                            cd: cacheDependency,
                            mloc: {}
                        });
                        return true;
                    } else if (match.matches !== undefined$1) {
                        if (match.isGroup && quantifierRecurse !== match) {
                            match = handleMatch(maskToken.matches[$.inArray(match, maskToken.matches) + 1], loopNdx, quantifierRecurse);
                            if (match) return true;
                        } else if (match.isOptional) {
                            var optionalToken = match;
                            match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
                            if (match) {
                                $.each(matches, function(ndx, mtch) {
                                    mtch.match.optionality = true;
                                });
                                latestMatch = matches[matches.length - 1].match;
                                if (quantifierRecurse === undefined$1 && isFirstMatch(latestMatch, optionalToken)) {
                                    insertStop = true;
                                    testPos = pos;
                                } else return true;
                            }
                        } else if (match.isAlternator) {
                            var alternateToken = match, malternateMatches = [], maltMatches, currentMatches = matches.slice(), loopNdxCnt = loopNdx.length;
                            var altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;
                            if (altIndex === -1 || typeof altIndex === "string") {
                                var currentPos = testPos, ndxInitializerClone = ndxInitializer.slice(), altIndexArr = [], amndx;
                                if (typeof altIndex == "string") {
                                    altIndexArr = altIndex.split(",");
                                } else {
                                    for (amndx = 0; amndx < alternateToken.matches.length; amndx++) {
                                        altIndexArr.push(amndx.toString());
                                    }
                                }
                                if (getMaskSet().excludes[pos]) {
                                    var altIndexArrClone = altIndexArr.slice();
                                    for (var i = 0, el = getMaskSet().excludes[pos].length; i < el; i++) {
                                        altIndexArr.splice(altIndexArr.indexOf(getMaskSet().excludes[pos][i].toString()), 1);
                                    }
                                    if (altIndexArr.length === 0) {
                                        getMaskSet().excludes[pos] = undefined$1;
                                        altIndexArr = altIndexArrClone;
                                    }
                                }
                                if (opts.keepStatic === true || isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic) altIndexArr = altIndexArr.slice(0, 1);
                                var unMatchedAlternation = false;
                                for (var ndx = 0; ndx < altIndexArr.length; ndx++) {
                                    amndx = parseInt(altIndexArr[ndx]);
                                    matches = [];
                                    ndxInitializer = typeof altIndex === "string" ? resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice() : ndxInitializerClone.slice();
                                    if (alternateToken.matches[amndx] && handleMatch(alternateToken.matches[amndx], [ amndx ].concat(loopNdx), quantifierRecurse)) match = true; else if (ndx === 0) {
                                        unMatchedAlternation = true;
                                    }
                                    maltMatches = matches.slice();
                                    testPos = currentPos;
                                    matches = [];
                                    for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                                        var altMatch = maltMatches[ndx1], dropMatch = false;
                                        altMatch.match.jit = altMatch.match.jit || unMatchedAlternation;
                                        altMatch.alternation = altMatch.alternation || loopNdxCnt;
                                        setMergeLocators(altMatch);
                                        for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                            var altMatch2 = malternateMatches[ndx2];
                                            if (typeof altIndex !== "string" || altMatch.alternation !== undefined$1 && $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr) !== -1) {
                                                if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
                                                    dropMatch = true;
                                                    setMergeLocators(altMatch2, altMatch);
                                                    break;
                                                } else if (isSubsetOf(altMatch, altMatch2)) {
                                                    if (setMergeLocators(altMatch, altMatch2)) {
                                                        dropMatch = true;
                                                        malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch);
                                                    }
                                                    break;
                                                } else if (isSubsetOf(altMatch2, altMatch)) {
                                                    setMergeLocators(altMatch2, altMatch);
                                                    break;
                                                } else if (staticCanMatchDefinition(altMatch, altMatch2)) {
                                                    if (setMergeLocators(altMatch, altMatch2)) {
                                                        dropMatch = true;
                                                        malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch);
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                        if (!dropMatch) {
                                            malternateMatches.push(altMatch);
                                        }
                                    }
                                }
                                matches = currentMatches.concat(malternateMatches);
                                testPos = pos;
                                insertStop = matches.length > 0;
                                match = malternateMatches.length > 0;
                                ndxInitializer = ndxInitializerClone.slice();
                            } else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [ altIndex ].concat(loopNdx), quantifierRecurse);
                            if (match) return true;
                        } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray(match, maskToken.matches) - 1]) {
                            var qt = match;
                            for (var qndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
                                var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
                                match = handleMatch(tokenGroup, [ qndx ].concat(loopNdx), tokenGroup);
                                if (match) {
                                    latestMatch = matches[matches.length - 1].match;
                                    latestMatch.optionalQuantifier = qndx >= qt.quantifier.min;
                                    latestMatch.jit = (qndx || 1) * tokenGroup.matches.indexOf(latestMatch) >= qt.quantifier.jit;
                                    if (latestMatch.optionalQuantifier && isFirstMatch(latestMatch, tokenGroup)) {
                                        insertStop = true;
                                        testPos = pos;
                                        break;
                                    }
                                    if (latestMatch.jit) {
                                        getMaskSet().jitOffset[pos] = tokenGroup.matches.indexOf(latestMatch);
                                    }
                                    return true;
                                }
                            }
                        } else {
                            match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
                            if (match) return true;
                        }
                    } else {
                        testPos++;
                    }
                }
                for (var tndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) {
                    if (maskToken.matches[tndx].isQuantifier !== true) {
                        var match = handleMatch(maskToken.matches[tndx], [ tndx ].concat(loopNdx), quantifierRecurse);
                        if (match && testPos === pos) {
                            return match;
                        } else if (testPos > pos) {
                            break;
                        }
                    }
                }
            }
            function mergeLocators(pos, tests) {
                var locator = [];
                if (!$.isArray(tests)) tests = [ tests ];
                if (tests.length > 0) {
                    if (tests[0].alternation === undefined$1) {
                        locator = determineTestTemplate(pos, tests.slice()).locator.slice();
                        if (locator.length === 0) locator = tests[0].locator.slice();
                    } else {
                        $.each(tests, function(ndx, tst) {
                            if (tst.def !== "") {
                                if (locator.length === 0) locator = tst.locator.slice(); else {
                                    for (var i = 0; i < locator.length; i++) {
                                        if (tst.locator[i] && locator[i].toString().indexOf(tst.locator[i]) === -1) {
                                            locator[i] += "," + tst.locator[i];
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
                return locator;
            }
            if (pos > -1) {
                if (ndxIntlzr === undefined$1) {
                    var previousPos = pos - 1, test;
                    while ((test = getMaskSet().validPositions[previousPos] || getMaskSet().tests[previousPos]) === undefined$1 && previousPos > -1) {
                        previousPos--;
                    }
                    if (test !== undefined$1 && previousPos > -1) {
                        ndxInitializer = mergeLocators(previousPos, test);
                        cacheDependency = ndxInitializer.join("");
                        testPos = previousPos;
                    }
                }
                if (getMaskSet().tests[pos] && getMaskSet().tests[pos][0].cd === cacheDependency) {
                    return getMaskSet().tests[pos];
                }
                for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
                    var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [ mtndx ]);
                    if (match && testPos === pos || testPos > pos) {
                        break;
                    }
                }
            }
            if (matches.length === 0 || insertStop) {
                matches.push({
                    match: {
                        fn: null,
                        optionality: false,
                        casing: null,
                        def: "",
                        placeholder: ""
                    },
                    locator: [],
                    mloc: {},
                    cd: cacheDependency
                });
            }
            if (ndxIntlzr !== undefined$1 && getMaskSet().tests[pos]) {
                return $.extend(true, [], matches);
            }
            getMaskSet().tests[pos] = $.extend(true, [], matches);
            return getMaskSet().tests[pos];
        }
        function getBufferTemplate() {
            if (getMaskSet()._buffer === undefined$1) {
                getMaskSet()._buffer = getMaskTemplate(false, 1);
                if (getMaskSet().buffer === undefined$1) getMaskSet().buffer = getMaskSet()._buffer.slice();
            }
            return getMaskSet()._buffer;
        }
        function getBuffer(noCache) {
            if (getMaskSet().buffer === undefined$1 || noCache === true) {
                getMaskSet().buffer = getMaskTemplate(true, getLastValidPosition(), true);
                if (getMaskSet()._buffer === undefined$1) getMaskSet()._buffer = getMaskSet().buffer.slice();
            }
            return getMaskSet().buffer;
        }
        function refreshFromBuffer(start, end, buffer) {
            var i, p;
            if (start === true) {
                resetMaskSet();
                start = 0;
                end = buffer.length;
            } else {
                for (i = start; i < end; i++) {
                    delete getMaskSet().validPositions[i];
                }
            }
            p = start;
            for (i = start; i < end; i++) {
                resetMaskSet(true);
                if (buffer[i] !== opts.skipOptionalPartCharacter) {
                    var valResult = isValid(p, buffer[i], true, true);
                    if (valResult !== false) {
                        resetMaskSet(true);
                        p = valResult.caret !== undefined$1 ? valResult.caret : valResult.pos + 1;
                    }
                }
            }
        }
        function casing(elem, test, pos) {
            switch (opts.casing || test.casing) {
              case "upper":
                elem = elem.toUpperCase();
                break;

              case "lower":
                elem = elem.toLowerCase();
                break;

              case "title":
                var posBefore = getMaskSet().validPositions[pos - 1];
                if (pos === 0 || posBefore && posBefore.input === String.fromCharCode(Inputmask.keyCode.SPACE)) {
                    elem = elem.toUpperCase();
                } else {
                    elem = elem.toLowerCase();
                }
                break;

              default:
                if ($.isFunction(opts.casing)) {
                    var args = Array.prototype.slice.call(arguments);
                    args.push(getMaskSet().validPositions);
                    elem = opts.casing.apply(this, args);
                }
            }
            return elem;
        }
        function checkAlternationMatch(altArr1, altArr2, na) {
            var altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = false, naArr = na !== undefined$1 ? na.split(",") : [], naNdx;
            for (var i = 0; i < naArr.length; i++) {
                if ((naNdx = altArr1.indexOf(naArr[i])) !== -1) {
                    altArr1.splice(naNdx, 1);
                }
            }
            for (var alndx = 0; alndx < altArr1.length; alndx++) {
                if ($.inArray(altArr1[alndx], altArrC) !== -1) {
                    isMatch = true;
                    break;
                }
            }
            return isMatch;
        }
        function alternate(pos, c, strict, fromSetValid, rAltPos) {
            var validPsClone = $.extend(true, {}, getMaskSet().validPositions), lastAlt, alternation, isValidRslt = false, altPos, prevAltPos, i, validPos, decisionPos, lAltPos = rAltPos !== undefined$1 ? rAltPos : getLastValidPosition();
            if (lAltPos === -1 && rAltPos === undefined$1) {
                lastAlt = 0;
                prevAltPos = getTest(lastAlt);
                alternation = prevAltPos.alternation;
            } else {
                for (;lAltPos >= 0; lAltPos--) {
                    altPos = getMaskSet().validPositions[lAltPos];
                    if (altPos && altPos.alternation !== undefined$1) {
                        if (prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) {
                            break;
                        }
                        lastAlt = lAltPos;
                        alternation = getMaskSet().validPositions[lastAlt].alternation;
                        prevAltPos = altPos;
                    }
                }
            }
            if (alternation !== undefined$1) {
                decisionPos = parseInt(lastAlt);
                getMaskSet().excludes[decisionPos] = getMaskSet().excludes[decisionPos] || [];
                if (pos !== true) {
                    getMaskSet().excludes[decisionPos].push(getDecisionTaker(prevAltPos));
                }
                var validInputsClone = [], staticInputsBeforePos = 0;
                for (i = decisionPos; i < getLastValidPosition(undefined$1, true) + 1; i++) {
                    validPos = getMaskSet().validPositions[i];
                    if (validPos && validPos.generatedInput !== true) {
                        validInputsClone.push(validPos.input);
                    } else if (i < pos) staticInputsBeforePos++;
                    delete getMaskSet().validPositions[i];
                }
                while (getMaskSet().excludes[decisionPos] && getMaskSet().excludes[decisionPos].length < 10) {
                    var posOffset = staticInputsBeforePos * -1, validInputs = validInputsClone.slice();
                    getMaskSet().tests[decisionPos] = undefined$1;
                    resetMaskSet(true);
                    isValidRslt = true;
                    while (validInputs.length > 0) {
                        var input = validInputs.shift();
                        if (!(isValidRslt = isValid(getLastValidPosition(undefined$1, true) + 1, input, false, fromSetValid, true))) {
                            break;
                        }
                    }
                    if (isValidRslt && c !== undefined$1) {
                        var targetLvp = getLastValidPosition(pos) + 1;
                        for (i = decisionPos; i < getLastValidPosition() + 1; i++) {
                            validPos = getMaskSet().validPositions[i];
                            if ((validPos === undefined$1 || validPos.match.fn == null) && i < pos + posOffset) {
                                posOffset++;
                            }
                        }
                        pos = pos + posOffset;
                        isValidRslt = isValid(pos > targetLvp ? targetLvp : pos, c, strict, fromSetValid, true);
                    }
                    if (!isValidRslt) {
                        resetMaskSet();
                        prevAltPos = getTest(decisionPos);
                        getMaskSet().validPositions = $.extend(true, {}, validPsClone);
                        if (getMaskSet().excludes[decisionPos]) {
                            var decisionTaker = getDecisionTaker(prevAltPos);
                            if (getMaskSet().excludes[decisionPos].indexOf(decisionTaker) !== -1) {
                                isValidRslt = alternate(pos, c, strict, fromSetValid, decisionPos - 1);
                                break;
                            }
                            getMaskSet().excludes[decisionPos].push(decisionTaker);
                            for (i = decisionPos; i < getLastValidPosition(undefined$1, true) + 1; i++) delete getMaskSet().validPositions[i];
                        } else {
                            isValidRslt = alternate(pos, c, strict, fromSetValid, decisionPos - 1);
                            break;
                        }
                    } else break;
                }
            }
            getMaskSet().excludes[decisionPos] = undefined$1;
            return isValidRslt;
        }
        function isValid(pos, c, strict, fromSetValid, fromAlternate, validateOnly) {
            function isSelection(posObj) {
                return isRTL ? posObj.begin - posObj.end > 1 || posObj.begin - posObj.end === 1 : posObj.end - posObj.begin > 1 || posObj.end - posObj.begin === 1;
            }
            strict = strict === true;
            var maskPos = pos;
            if (pos.begin !== undefined$1) {
                maskPos = isRTL ? pos.end : pos.begin;
            }
            function _isValid(position, c, strict) {
                var rslt = false;
                $.each(getTests(position), function(ndx, tst) {
                    var test = tst.match;
                    getBuffer(true);
                    rslt = test.fn != null ? test.fn.test(c, getMaskSet(), position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && test.def !== "" ? {
                        c: getPlaceholder(position, test, true) || test.def,
                        pos: position
                    } : false;
                    if (rslt !== false) {
                        var elem = rslt.c !== undefined$1 ? rslt.c : c, validatedPos = position;
                        elem = elem === opts.skipOptionalPartCharacter && test.fn === null ? getPlaceholder(position, test, true) || test.def : elem;
                        if (rslt.remove !== undefined$1) {
                            if (!$.isArray(rslt.remove)) rslt.remove = [ rslt.remove ];
                            $.each(rslt.remove.sort(function(a, b) {
                                return b - a;
                            }), function(ndx, lmnt) {
                                revalidateMask({
                                    begin: lmnt,
                                    end: lmnt + 1
                                });
                            });
                        }
                        if (rslt.insert !== undefined$1) {
                            if (!$.isArray(rslt.insert)) rslt.insert = [ rslt.insert ];
                            $.each(rslt.insert.sort(function(a, b) {
                                return a - b;
                            }), function(ndx, lmnt) {
                                isValid(lmnt.pos, lmnt.c, true, fromSetValid);
                            });
                        }
                        if (rslt !== true && rslt.pos !== undefined$1 && rslt.pos !== position) {
                            validatedPos = rslt.pos;
                        }
                        if (rslt !== true && rslt.pos === undefined$1 && rslt.c === undefined$1) {
                            return false;
                        }
                        if (!revalidateMask(pos, $.extend({}, tst, {
                            input: casing(elem, test, validatedPos)
                        }), fromSetValid, validatedPos)) {
                            rslt = false;
                        }
                        return false;
                    }
                });
                return rslt;
            }
            var result = true, positionsClone = $.extend(true, {}, getMaskSet().validPositions);
            if ($.isFunction(opts.preValidation) && !strict && fromSetValid !== true && validateOnly !== true) {
                result = opts.preValidation(getBuffer(), maskPos, c, isSelection(pos), opts, getMaskSet());
            }
            if (result === true) {
                trackbackPositions(undefined$1, maskPos, true);
                if (maxLength === undefined$1 || maskPos < maxLength) {
                    result = _isValid(maskPos, c, strict);
                    if ((!strict || fromSetValid === true) && result === false && validateOnly !== true) {
                        var currentPosValid = getMaskSet().validPositions[maskPos];
                        if (currentPosValid && currentPosValid.match.fn === null && (currentPosValid.match.def === c || c === opts.skipOptionalPartCharacter)) {
                            result = {
                                caret: seekNext(maskPos)
                            };
                        } else {
                            if ((opts.insertMode || getMaskSet().validPositions[seekNext(maskPos)] === undefined$1) && (!isMask(maskPos, true) || getMaskSet().jitOffset[maskPos])) {
                                if (getMaskSet().jitOffset[maskPos] && getMaskSet().validPositions[seekNext(maskPos)] === undefined$1) {
                                    result = isValid(maskPos + getMaskSet().jitOffset[maskPos], c, strict);
                                    if (result !== false) result.caret = maskPos;
                                } else for (var nPos = maskPos + 1, snPos = seekNext(maskPos); nPos <= snPos; nPos++) {
                                    result = _isValid(nPos, c, strict);
                                    if (result !== false) {
                                        result = trackbackPositions(maskPos, result.pos !== undefined$1 ? result.pos : nPos) || result;
                                        maskPos = nPos;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                if (result === false && opts.keepStatic !== false && (opts.regex == null || isComplete(getBuffer())) && !strict && fromAlternate !== true) {
                    result = alternate(maskPos, c, strict, fromSetValid);
                }
                if (result === true) {
                    result = {
                        pos: maskPos
                    };
                }
            }
            if ($.isFunction(opts.postValidation) && result !== false && !strict && fromSetValid !== true && validateOnly !== true) {
                var postResult = opts.postValidation(getBuffer(true), pos.begin !== undefined$1 ? isRTL ? pos.end : pos.begin : pos, result, opts);
                if (postResult !== undefined$1) {
                    if (postResult.refreshFromBuffer && postResult.buffer) {
                        var refresh = postResult.refreshFromBuffer;
                        refreshFromBuffer(refresh === true ? refresh : refresh.start, refresh.end, postResult.buffer);
                    }
                    result = postResult === true ? result : postResult;
                }
            }
            if (result && result.pos === undefined$1) {
                result.pos = maskPos;
            }
            if (result === false || validateOnly === true) {
                resetMaskSet(true);
                getMaskSet().validPositions = $.extend(true, {}, positionsClone);
            }
            return result;
        }
        function trackbackPositions(originalPos, newPos, fillOnly) {
            var result;
            if (originalPos === undefined$1) {
                for (originalPos = newPos - 1; originalPos > 0; originalPos--) {
                    if (getMaskSet().validPositions[originalPos]) break;
                }
            }
            for (var ps = originalPos; ps < newPos; ps++) {
                if (getMaskSet().validPositions[ps] === undefined$1 && !isMask(ps, true)) {
                    var vp = ps == 0 ? getTest(ps) : getMaskSet().validPositions[ps - 1];
                    if (vp) {
                        var tests = getTests(ps).slice();
                        if (tests[tests.length - 1].match.def === "") tests.pop();
                        var bestMatch = determineTestTemplate(ps, tests);
                        bestMatch = $.extend({}, bestMatch, {
                            input: getPlaceholder(ps, bestMatch.match, true) || bestMatch.match.def
                        });
                        bestMatch.generatedInput = true;
                        revalidateMask(ps, bestMatch, true);
                        if (fillOnly !== true) {
                            var cvpInput = getMaskSet().validPositions[newPos].input;
                            getMaskSet().validPositions[newPos] = undefined$1;
                            result = isValid(newPos, cvpInput, true, true);
                        }
                    }
                }
            }
            return result;
        }
        function revalidateMask(pos, validTest, fromSetValid, validatedPos) {
            function IsEnclosedStatic(pos, valids, selection) {
                var posMatch = valids[pos];
                if (posMatch !== undefined$1 && (posMatch.match.fn === null && posMatch.match.optionality !== true || posMatch.input === opts.radixPoint)) {
                    var prevMatch = selection.begin <= pos - 1 ? valids[pos - 1] && valids[pos - 1].match.fn === null && valids[pos - 1] : valids[pos - 1], nextMatch = selection.end > pos + 1 ? valids[pos + 1] && valids[pos + 1].match.fn === null && valids[pos + 1] : valids[pos + 1];
                    return prevMatch && nextMatch;
                }
                return false;
            }
            var begin = pos.begin !== undefined$1 ? pos.begin : pos, end = pos.end !== undefined$1 ? pos.end : pos;
            if (pos.begin > pos.end) {
                begin = pos.end;
                end = pos.begin;
            }
            validatedPos = validatedPos !== undefined$1 ? validatedPos : begin;
            if (begin !== end || opts.insertMode && getMaskSet().validPositions[validatedPos] !== undefined$1 && fromSetValid === undefined$1) {
                var positionsClone = $.extend(true, {}, getMaskSet().validPositions), lvp = getLastValidPosition(undefined$1, true), i;
                getMaskSet().p = begin;
                for (i = lvp; i >= begin; i--) {
                    if (getMaskSet().validPositions[i] && getMaskSet().validPositions[i].match.nativeDef === "+") {
                        opts.isNegative = false;
                    }
                    delete getMaskSet().validPositions[i];
                }
                var valid = true, j = validatedPos, vps = getMaskSet().validPositions, needsValidation = false, posMatch = j, i = j;
                if (validTest) {
                    getMaskSet().validPositions[validatedPos] = $.extend(true, {}, validTest);
                    posMatch++;
                    j++;
                    if (begin < end) i++;
                }
                for (;i <= lvp; i++) {
                    var t = positionsClone[i];
                    if (t !== undefined$1 && (i >= end || i >= begin && t.generatedInput !== true && IsEnclosedStatic(i, positionsClone, {
                        begin: begin,
                        end: end
                    }))) {
                        while (getTest(posMatch).match.def !== "") {
                            if (needsValidation === false && positionsClone[posMatch] && positionsClone[posMatch].match.nativeDef === t.match.nativeDef) {
                                getMaskSet().validPositions[posMatch] = $.extend(true, {}, positionsClone[posMatch]);
                                getMaskSet().validPositions[posMatch].input = t.input;
                                trackbackPositions(undefined$1, posMatch, true);
                                j = posMatch + 1;
                                valid = true;
                            } else if (opts.shiftPositions && positionCanMatchDefinition(posMatch, t.match.def)) {
                                var result = isValid(posMatch, t.input, true, true);
                                valid = result !== false;
                                j = result.caret || result.insert ? getLastValidPosition() : posMatch + 1;
                                needsValidation = true;
                            } else {
                                valid = t.generatedInput === true || t.input === opts.radixPoint && opts.numericInput === true;
                            }
                            if (valid) break;
                            if (!valid && posMatch > end && isMask(posMatch, true) && (t.match.fn !== null || posMatch > getMaskSet().maskLength)) {
                                break;
                            }
                            posMatch++;
                        }
                        if (getTest(posMatch).match.def == "") valid = false;
                        posMatch = j;
                    }
                    if (!valid) break;
                }
                if (!valid) {
                    getMaskSet().validPositions = $.extend(true, {}, positionsClone);
                    resetMaskSet(true);
                    return false;
                }
            } else if (validTest) {
                getMaskSet().validPositions[validatedPos] = $.extend(true, {}, validTest);
            }
            resetMaskSet(true);
            return true;
        }
        function isMask(pos, strict) {
            var test = getTestTemplate(pos).match;
            if (test.def === "") test = getTest(pos).match;
            if (test.fn != null) {
                return test.fn;
            }
            if (strict !== true && pos > -1) {
                var tests = getTests(pos);
                return tests.length > 1 + (tests[tests.length - 1].match.def === "" ? 1 : 0);
            }
            return false;
        }
        function seekNext(pos, newBlock) {
            var position = pos + 1;
            while (getTest(position).match.def !== "" && (newBlock === true && (getTest(position).match.newBlockMarker !== true || !isMask(position)) || newBlock !== true && !isMask(position))) {
                position++;
            }
            return position;
        }
        function seekPrevious(pos, newBlock) {
            var position = pos, tests;
            if (position <= 0) return 0;
            while (--position > 0 && (newBlock === true && getTest(position).match.newBlockMarker !== true || newBlock !== true && !isMask(position) && (tests = getTests(position), 
            tests.length < 2 || tests.length === 2 && tests[1].match.def === ""))) {}
            return position;
        }
        function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
            if (event && $.isFunction(opts.onBeforeWrite)) {
                var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
                if (result) {
                    if (result.refreshFromBuffer) {
                        var refresh = result.refreshFromBuffer;
                        refreshFromBuffer(refresh === true ? refresh : refresh.start, refresh.end, result.buffer || buffer);
                        buffer = getBuffer(true);
                    }
                    if (caretPos !== undefined$1) caretPos = result.caret !== undefined$1 ? result.caret : caretPos;
                }
            }
            if (input !== undefined$1) {
                input.inputmask._valueSet(buffer.join(""));
                if (caretPos !== undefined$1 && (event === undefined$1 || event.type !== "blur")) {
                    caret(input, caretPos);
                } else renderColorMask(input, caretPos, buffer.length === 0);
                if (triggerEvents === true) {
                    var $input = $(input), nptVal = input.inputmask._valueGet();
                    skipInputEvent = true;
                    $input.trigger("input");
                    setTimeout(function() {
                        if (nptVal === getBufferTemplate().join("")) {
                            $input.trigger("cleared");
                        } else if (isComplete(buffer) === true) {
                            $input.trigger("complete");
                        }
                    }, 0);
                }
            }
        }
        function getPlaceholder(pos, test, returnPL) {
            test = test || getTest(pos).match;
            if (test.placeholder !== undefined$1 || returnPL === true) {
                return $.isFunction(test.placeholder) ? test.placeholder(opts) : test.placeholder;
            } else if (test.fn === null) {
                if (pos > -1 && getMaskSet().validPositions[pos] === undefined$1) {
                    var tests = getTests(pos), staticAlternations = [], prevTest;
                    if (tests.length > 1 + (tests[tests.length - 1].match.def === "" ? 1 : 0)) {
                        for (var i = 0; i < tests.length; i++) {
                            if (tests[i].match.optionality !== true && tests[i].match.optionalQuantifier !== true && (tests[i].match.fn === null || (prevTest === undefined$1 || tests[i].match.fn.test(prevTest.match.def, getMaskSet(), pos, true, opts) !== false))) {
                                staticAlternations.push(tests[i]);
                                if (tests[i].match.fn === null) prevTest = tests[i];
                                if (staticAlternations.length > 1) {
                                    if (/[0-9a-bA-Z]/.test(staticAlternations[0].match.def)) {
                                        return opts.placeholder.charAt(pos % opts.placeholder.length);
                                    }
                                }
                            }
                        }
                    }
                }
                return test.def;
            }
            return opts.placeholder.charAt(pos % opts.placeholder.length);
        }
        function HandleNativePlaceholder(npt, value) {
            if (ie) {
                if (npt.inputmask._valueGet() !== value && (npt.placeholder !== value || npt.placeholder === "")) {
                    var buffer = getBuffer().slice(), nptValue = npt.inputmask._valueGet();
                    if (nptValue !== value) {
                        var lvp = getLastValidPosition();
                        if (lvp === -1 && nptValue === getBufferTemplate().join("")) {
                            buffer = [];
                        } else if (lvp !== -1) {
                            clearOptionalTail(buffer);
                        }
                        writeBuffer(npt, buffer);
                    }
                }
            } else if (npt.placeholder !== value) {
                npt.placeholder = value;
                if (npt.placeholder === "") npt.removeAttribute("placeholder");
            }
        }
        var EventRuler = {
            on: function(input, eventName, eventHandler) {
                var ev = function(e) {
                    var that = this;
                    if (that.inputmask === undefined$1 && this.nodeName !== "FORM") {
                        var imOpts = $.data(that, "_inputmask_opts");
                        if (imOpts) new Inputmask(imOpts).mask(that); else EventRuler.off(that);
                    } else if (e.type !== "setvalue" && this.nodeName !== "FORM" && (that.disabled || that.readOnly && !(e.type === "keydown" && (e.ctrlKey && e.keyCode === 67) || opts.tabThrough === false && e.keyCode === Inputmask.keyCode.TAB))) {
                        e.preventDefault();
                    } else {
                        switch (e.type) {
                          case "input":
                            if (skipInputEvent === true) {
                                skipInputEvent = false;
                                return e.preventDefault();
                            }
                            if (mobile) {
                                var args = arguments;
                                setTimeout(function() {
                                    eventHandler.apply(that, args);
                                    caret(that, that.inputmask.caretPos, undefined$1, true);
                                }, 0);
                                return false;
                            }
                            break;

                          case "keydown":
                            skipKeyPressEvent = false;
                            skipInputEvent = false;
                            break;

                          case "keypress":
                            if (skipKeyPressEvent === true) {
                                return e.preventDefault();
                            }
                            skipKeyPressEvent = true;
                            break;

                          case "click":
                            if (iemobile || iphone) {
                                var args = arguments;
                                setTimeout(function() {
                                    eventHandler.apply(that, args);
                                }, 0);
                                return false;
                            }
                            break;
                        }
                        var returnVal = eventHandler.apply(that, arguments);
                        if (returnVal === false) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                        return returnVal;
                    }
                };
                input.inputmask.events[eventName] = input.inputmask.events[eventName] || [];
                input.inputmask.events[eventName].push(ev);
                if ($.inArray(eventName, [ "submit", "reset" ]) !== -1) {
                    if (input.form !== null) $(input.form).on(eventName, ev);
                } else {
                    $(input).on(eventName, ev);
                }
            },
            off: function(input, event) {
                if (input.inputmask && input.inputmask.events) {
                    var events;
                    if (event) {
                        events = [];
                        events[event] = input.inputmask.events[event];
                    } else {
                        events = input.inputmask.events;
                    }
                    $.each(events, function(eventName, evArr) {
                        while (evArr.length > 0) {
                            var ev = evArr.pop();
                            if ($.inArray(eventName, [ "submit", "reset" ]) !== -1) {
                                if (input.form !== null) $(input.form).off(eventName, ev);
                            } else {
                                $(input).off(eventName, ev);
                            }
                        }
                        delete input.inputmask.events[eventName];
                    });
                }
            }
        };
        var EventHandlers = {
            keydownEvent: function(e) {
                var input = this, $input = $(input), k = e.keyCode, pos = caret(input);
                if (k === Inputmask.keyCode.BACKSPACE || k === Inputmask.keyCode.DELETE || iphone && k === Inputmask.keyCode.BACKSPACE_SAFARI || e.ctrlKey && k === Inputmask.keyCode.X && !isInputEventSupported("cut")) {
                    e.preventDefault();
                    handleRemove(input, k, pos);
                    writeBuffer(input, getBuffer(true), getMaskSet().p, e, input.inputmask._valueGet() !== getBuffer().join(""));
                } else if (k === Inputmask.keyCode.END || k === Inputmask.keyCode.PAGE_DOWN) {
                    e.preventDefault();
                    var caretPos = seekNext(getLastValidPosition());
                    caret(input, e.shiftKey ? pos.begin : caretPos, caretPos, true);
                } else if (k === Inputmask.keyCode.HOME && !e.shiftKey || k === Inputmask.keyCode.PAGE_UP) {
                    e.preventDefault();
                    caret(input, 0, e.shiftKey ? pos.begin : 0, true);
                } else if ((opts.undoOnEscape && k === Inputmask.keyCode.ESCAPE || k === 90 && e.ctrlKey) && e.altKey !== true) {
                    checkVal(input, true, false, undoValue.split(""));
                    $input.trigger("click");
                } else if (k === Inputmask.keyCode.INSERT && !(e.shiftKey || e.ctrlKey)) {
                    opts.insertMode = !opts.insertMode;
                    input.setAttribute("im-insert", opts.insertMode);
                } else if (opts.tabThrough === true && k === Inputmask.keyCode.TAB) {
                    if (e.shiftKey === true) {
                        if (getTest(pos.begin).match.fn === null) {
                            pos.begin = seekNext(pos.begin);
                        }
                        pos.end = seekPrevious(pos.begin, true);
                        pos.begin = seekPrevious(pos.end, true);
                    } else {
                        pos.begin = seekNext(pos.begin, true);
                        pos.end = seekNext(pos.begin, true);
                        if (pos.end < getMaskSet().maskLength) pos.end--;
                    }
                    if (pos.begin < getMaskSet().maskLength) {
                        e.preventDefault();
                        caret(input, pos.begin, pos.end);
                    }
                }
                opts.onKeyDown.call(this, e, getBuffer(), caret(input).begin, opts);
                ignorable = $.inArray(k, opts.ignorables) !== -1;
            },
            keypressEvent: function(e, checkval, writeOut, strict, ndx) {
                var input = this, $input = $(input), k = e.which || e.charCode || e.keyCode;
                if (checkval !== true && (!(e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable))) {
                    if (k === Inputmask.keyCode.ENTER && undoValue !== getBuffer().join("")) {
                        undoValue = getBuffer().join("");
                        setTimeout(function() {
                            $input.trigger("change");
                        }, 0);
                    }
                    return true;
                } else {
                    if (k) {
                        if (k === 46 && e.shiftKey === false && opts.radixPoint !== "") k = opts.radixPoint.charCodeAt(0);
                        var pos = checkval ? {
                            begin: ndx,
                            end: ndx
                        } : caret(input), forwardPosition, c = String.fromCharCode(k), offset = 0;
                        if (opts._radixDance && opts.numericInput) {
                            var caretPos = getBuffer().indexOf(opts.radixPoint.charAt(0)) + 1;
                            if (pos.begin <= caretPos) {
                                if (k === opts.radixPoint.charCodeAt(0)) offset = 1;
                                pos.begin -= 1;
                                pos.end -= 1;
                            }
                        }
                        getMaskSet().writeOutBuffer = true;
                        var valResult = isValid(pos, c, strict);
                        if (valResult !== false) {
                            resetMaskSet(true);
                            forwardPosition = valResult.caret !== undefined$1 ? valResult.caret : seekNext(valResult.pos.begin ? valResult.pos.begin : valResult.pos);
                            getMaskSet().p = forwardPosition;
                        }
                        forwardPosition = (opts.numericInput && valResult.caret === undefined$1 ? seekPrevious(forwardPosition) : forwardPosition) + offset;
                        if (writeOut !== false) {
                            setTimeout(function() {
                                opts.onKeyValidation.call(input, k, valResult, opts);
                            }, 0);
                            if (getMaskSet().writeOutBuffer && valResult !== false) {
                                var buffer = getBuffer();
                                writeBuffer(input, buffer, forwardPosition, e, checkval !== true);
                            }
                        }
                        e.preventDefault();
                        if (checkval) {
                            if (valResult !== false) valResult.forwardPosition = forwardPosition;
                            return valResult;
                        }
                    }
                }
            },
            pasteEvent: function(e) {
                var input = this, ev = e.originalEvent || e, $input = $(input), inputValue = input.inputmask._valueGet(true), caretPos = caret(input), tempValue;
                if (isRTL) {
                    tempValue = caretPos.end;
                    caretPos.end = caretPos.begin;
                    caretPos.begin = tempValue;
                }
                var valueBeforeCaret = inputValue.substr(0, caretPos.begin), valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
                if (valueBeforeCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(0, caretPos.begin).join("")) valueBeforeCaret = "";
                if (valueAfterCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(caretPos.end).join("")) valueAfterCaret = "";
                if (window.clipboardData && window.clipboardData.getData) {
                    inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret;
                } else if (ev.clipboardData && ev.clipboardData.getData) {
                    inputValue = valueBeforeCaret + ev.clipboardData.getData("text/plain") + valueAfterCaret;
                } else return true;
                var pasteValue = inputValue;
                if ($.isFunction(opts.onBeforePaste)) {
                    pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts);
                    if (pasteValue === false) {
                        return e.preventDefault();
                    }
                    if (!pasteValue) {
                        pasteValue = inputValue;
                    }
                }
                checkVal(input, false, false, pasteValue.toString().split(""));
                writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()), e, undoValue !== getBuffer().join(""));
                return e.preventDefault();
            },
            inputFallBackEvent: function(e) {
                function radixPointHandler(input, inputValue, caretPos) {
                    if (inputValue.charAt(caretPos.begin - 1) === "." && opts.radixPoint !== "") {
                        inputValue = inputValue.split("");
                        inputValue[caretPos.begin - 1] = opts.radixPoint.charAt(0);
                        inputValue = inputValue.join("");
                    }
                    return inputValue;
                }
                function ieMobileHandler(input, inputValue, caretPos) {
                    if (iemobile) {
                        var inputChar = inputValue.replace(getBuffer().join(""), "");
                        if (inputChar.length === 1) {
                            var iv = inputValue.split("");
                            iv.splice(caretPos.begin, 0, inputChar);
                            inputValue = iv.join("");
                        }
                    }
                    return inputValue;
                }
                var input = this, inputValue = input.inputmask._valueGet();
                if (getBuffer().join("") !== inputValue) {
                    var caretPos = caret(input);
                    inputValue = radixPointHandler(input, inputValue, caretPos);
                    inputValue = ieMobileHandler(input, inputValue, caretPos);
                    if (getBuffer().join("") !== inputValue) {
                        var buffer = getBuffer().join(""), offset = !opts.numericInput && inputValue.length > buffer.length ? -1 : 0, frontPart = inputValue.substr(0, caretPos.begin), backPart = inputValue.substr(caretPos.begin), frontBufferPart = buffer.substr(0, caretPos.begin + offset), backBufferPart = buffer.substr(caretPos.begin + offset);
                        var selection = caretPos, entries = "", isEntry = false;
                        if (frontPart !== frontBufferPart) {
                            var fpl = (isEntry = frontPart.length >= frontBufferPart.length) ? frontPart.length : frontBufferPart.length, i;
                            for (i = 0; frontPart.charAt(i) === frontBufferPart.charAt(i) && i < fpl; i++) ;
                            if (isEntry) {
                                selection.begin = i - offset;
                                entries += frontPart.slice(i, selection.end);
                            }
                        }
                        if (backPart !== backBufferPart) {
                            if (backPart.length > backBufferPart.length) {
                                entries += backPart.slice(0, 1);
                            } else {
                                if (backPart.length < backBufferPart.length) {
                                    selection.end += backBufferPart.length - backPart.length;
                                    if (!isEntry && opts.radixPoint !== "" && backPart === "" && frontPart.charAt(selection.begin + offset - 1) === opts.radixPoint) {
                                        selection.begin--;
                                        entries = opts.radixPoint;
                                    }
                                }
                            }
                        }
                        writeBuffer(input, getBuffer(), {
                            begin: selection.begin + offset,
                            end: selection.end + offset
                        });
                        if (entries.length > 0) {
                            $.each(entries.split(""), function(ndx, entry) {
                                var keypress = new $.Event("keypress");
                                keypress.which = entry.charCodeAt(0);
                                ignorable = false;
                                EventHandlers.keypressEvent.call(input, keypress);
                            });
                        } else {
                            if (selection.begin === selection.end - 1) {
                                selection.begin = seekPrevious(selection.begin + 1);
                                if (selection.begin === selection.end - 1) {
                                    caret(input, selection.begin);
                                } else {
                                    caret(input, selection.begin, selection.end);
                                }
                            }
                            var keydown = new $.Event("keydown");
                            keydown.keyCode = opts.numericInput ? Inputmask.keyCode.BACKSPACE : Inputmask.keyCode.DELETE;
                            EventHandlers.keydownEvent.call(input, keydown);
                        }
                        e.preventDefault();
                    }
                }
            },
            beforeInputEvent: function(e) {
                if (e.cancelable) {
                    var input = this;
                    switch (e.inputType) {
                      case "insertText":
                        $.each(e.data.split(""), function(ndx, entry) {
                            var keypress = new $.Event("keypress");
                            keypress.which = entry.charCodeAt(0);
                            ignorable = false;
                            EventHandlers.keypressEvent.call(input, keypress);
                        });
                        return e.preventDefault();

                      case "deleteContentBackward":
                        var keydown = new $.Event("keydown");
                        keydown.keyCode = Inputmask.keyCode.BACKSPACE;
                        EventHandlers.keydownEvent.call(input, keydown);
                        return e.preventDefault();

                      case "deleteContentForward":
                        var keydown = new $.Event("keydown");
                        keydown.keyCode = Inputmask.keyCode.DELETE;
                        EventHandlers.keydownEvent.call(input, keydown);
                        return e.preventDefault();
                    }
                }
            },
            setValueEvent: function(e) {
                this.inputmask.refreshValue = false;
                var input = this, value = e && e.detail ? e.detail[0] : arguments[1], value = value || input.inputmask._valueGet(true);
                if ($.isFunction(opts.onBeforeMask)) value = opts.onBeforeMask.call(inputmask, value, opts) || value;
                value = value.toString().split("");
                checkVal(input, true, false, value);
                undoValue = getBuffer().join("");
                if ((opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate().join("")) {
                    input.inputmask._valueSet("");
                }
            },
            focusEvent: function(e) {
                var input = this, nptValue = input.inputmask._valueGet();
                if (opts.showMaskOnFocus) {
                    if (nptValue !== getBuffer().join("")) {
                        writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()));
                    } else if (mouseEnter === false) {
                        caret(input, seekNext(getLastValidPosition()));
                    }
                }
                if (opts.positionCaretOnTab === true && mouseEnter === false) {
                    EventHandlers.clickEvent.apply(input, [ e, true ]);
                }
                undoValue = getBuffer().join("");
            },
            mouseleaveEvent: function(e) {
                var input = this;
                mouseEnter = false;
                if (opts.clearMaskOnLostFocus && document.activeElement !== input) {
                    HandleNativePlaceholder(input, originalPlaceholder);
                }
            },
            clickEvent: function(e, tabbed) {
                function doRadixFocus(clickPos) {
                    if (opts.radixPoint !== "") {
                        var vps = getMaskSet().validPositions;
                        if (vps[clickPos] === undefined$1 || vps[clickPos].input === getPlaceholder(clickPos)) {
                            if (clickPos < seekNext(-1)) return true;
                            var radixPos = $.inArray(opts.radixPoint, getBuffer());
                            if (radixPos !== -1) {
                                for (var vp in vps) {
                                    if (radixPos < vp && vps[vp].input !== getPlaceholder(vp)) {
                                        return false;
                                    }
                                }
                                return true;
                            }
                        }
                    }
                    return false;
                }
                var input = this;
                setTimeout(function() {
                    if (document.activeElement === input) {
                        var selectedCaret = caret(input);
                        if (tabbed) {
                            if (isRTL) {
                                selectedCaret.end = selectedCaret.begin;
                            } else {
                                selectedCaret.begin = selectedCaret.end;
                            }
                        }
                        if (selectedCaret.begin === selectedCaret.end) {
                            switch (opts.positionCaretOnClick) {
                              case "none":
                                break;

                              case "select":
                                caret(input, 0, getBuffer().length);
                                break;

                              case "ignore":
                                caret(input, seekNext(getLastValidPosition()));
                                break;

                              case "radixFocus":
                                if (doRadixFocus(selectedCaret.begin)) {
                                    var radixPos = getBuffer().join("").indexOf(opts.radixPoint);
                                    caret(input, opts.numericInput ? seekNext(radixPos) : radixPos);
                                    break;
                                }

                              default:
                                var clickPosition = selectedCaret.begin, lvclickPosition = getLastValidPosition(clickPosition, true), lastPosition = seekNext(lvclickPosition);
                                if (clickPosition < lastPosition) {
                                    caret(input, !isMask(clickPosition, true) && !isMask(clickPosition - 1, true) ? seekNext(clickPosition) : clickPosition);
                                } else {
                                    var lvp = getMaskSet().validPositions[lvclickPosition], tt = getTestTemplate(lastPosition, lvp ? lvp.match.locator : undefined$1, lvp), placeholder = getPlaceholder(lastPosition, tt.match);
                                    if (placeholder !== "" && getBuffer()[lastPosition] !== placeholder && tt.match.optionalQuantifier !== true && tt.match.newBlockMarker !== true || !isMask(lastPosition, opts.keepStatic) && tt.match.def === placeholder) {
                                        var newPos = seekNext(lastPosition);
                                        if (clickPosition >= newPos || clickPosition === lastPosition) {
                                            lastPosition = newPos;
                                        }
                                    }
                                    caret(input, lastPosition);
                                }
                                break;
                            }
                        }
                    }
                }, 0);
            },
            cutEvent: function(e) {
                var input = this, $input = $(input), pos = caret(input), ev = e.originalEvent || e;
                var clipboardData = window.clipboardData || ev.clipboardData, clipData = isRTL ? getBuffer().slice(pos.end, pos.begin) : getBuffer().slice(pos.begin, pos.end);
                clipboardData.setData("text", isRTL ? clipData.reverse().join("") : clipData.join(""));
                if (document.execCommand) document.execCommand("copy");
                handleRemove(input, Inputmask.keyCode.DELETE, pos);
                writeBuffer(input, getBuffer(), getMaskSet().p, e, undoValue !== getBuffer().join(""));
            },
            blurEvent: function(e) {
                var $input = $(this), input = this;
                if (input.inputmask) {
                    HandleNativePlaceholder(input, originalPlaceholder);
                    var nptValue = input.inputmask._valueGet(), buffer = getBuffer().slice();
                    if (nptValue !== "" || colorMask !== undefined$1) {
                        if (opts.clearMaskOnLostFocus) {
                            if (getLastValidPosition() === -1 && nptValue === getBufferTemplate().join("")) {
                                buffer = [];
                            } else {
                                clearOptionalTail(buffer);
                            }
                        }
                        if (isComplete(buffer) === false) {
                            setTimeout(function() {
                                $input.trigger("incomplete");
                            }, 0);
                            if (opts.clearIncomplete) {
                                resetMaskSet();
                                if (opts.clearMaskOnLostFocus) {
                                    buffer = [];
                                } else {
                                    buffer = getBufferTemplate().slice();
                                }
                            }
                        }
                        writeBuffer(input, buffer, undefined$1, e);
                    }
                    if (undoValue !== getBuffer().join("")) {
                        undoValue = buffer.join("");
                        $input.trigger("change");
                    }
                }
            },
            mouseenterEvent: function(e) {
                var input = this;
                mouseEnter = true;
                if (document.activeElement !== input && opts.showMaskOnHover) {
                    HandleNativePlaceholder(input, (isRTL ? getBuffer().slice().reverse() : getBuffer()).join(""));
                }
            },
            submitEvent: function(e) {
                if (undoValue !== getBuffer().join("")) {
                    $el.trigger("change");
                }
                if (opts.clearMaskOnLostFocus && getLastValidPosition() === -1 && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join("")) {
                    el.inputmask._valueSet("");
                }
                if (opts.clearIncomplete && isComplete(getBuffer()) === false) {
                    el.inputmask._valueSet("");
                }
                if (opts.removeMaskOnSubmit) {
                    el.inputmask._valueSet(el.inputmask.unmaskedvalue(), true);
                    setTimeout(function() {
                        writeBuffer(el, getBuffer());
                    }, 0);
                }
            },
            resetEvent: function(e) {
                el.inputmask.refreshValue = true;
                setTimeout(function() {
                    $el.trigger("setvalue");
                }, 0);
            }
        };
        function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
            var inputmask = this || input.inputmask, inputValue = nptvl.slice(), charCodes = "", initialNdx = -1, result = undefined$1;
            function isTemplateMatch(ndx, charCodes) {
                var charCodeNdx = getMaskTemplate(true, 0, false).slice(ndx, seekNext(ndx)).join("").replace(/'/g, "").indexOf(charCodes);
                return charCodeNdx !== -1 && !isMask(ndx) && (getTest(ndx).match.nativeDef === charCodes.charAt(0) || getTest(ndx).match.fn === null && getTest(ndx).match.nativeDef === "'" + charCodes.charAt(0) || getTest(ndx).match.nativeDef === " " && (getTest(ndx + 1).match.nativeDef === charCodes.charAt(0) || getTest(ndx + 1).match.fn === null && getTest(ndx + 1).match.nativeDef === "'" + charCodes.charAt(0)));
            }
            resetMaskSet();
            if (!strict && opts.autoUnmask !== true) {
                var staticInput = getBufferTemplate().slice(0, seekNext(-1)).join(""), matches = inputValue.join("").match(new RegExp("^" + Inputmask.escapeRegex(staticInput), "g"));
                if (matches && matches.length > 0) {
                    inputValue.splice(0, matches.length * staticInput.length);
                    initialNdx = seekNext(initialNdx);
                }
            } else {
                initialNdx = seekNext(initialNdx);
            }
            if (initialNdx === -1) {
                getMaskSet().p = seekNext(initialNdx);
                initialNdx = 0;
            } else getMaskSet().p = initialNdx;
            inputmask.caretPos = {
                begin: initialNdx
            };
            $.each(inputValue, function(ndx, charCode) {
                if (charCode !== undefined$1) {
                    if (getMaskSet().validPositions[ndx] === undefined$1 && inputValue[ndx] === getPlaceholder(ndx) && isMask(ndx, true) && isValid(ndx, inputValue[ndx], true, undefined$1, undefined$1, true) === false) {
                        getMaskSet().p++;
                    } else {
                        var keypress = new $.Event("_checkval");
                        keypress.which = charCode.charCodeAt(0);
                        charCodes += charCode;
                        var lvp = getLastValidPosition(undefined$1, true);
                        if (!isTemplateMatch(initialNdx, charCodes)) {
                            result = EventHandlers.keypressEvent.call(input, keypress, true, false, strict, inputmask.caretPos.begin);
                            if (result) {
                                initialNdx = inputmask.caretPos.begin + 1;
                                charCodes = "";
                            }
                        } else {
                            result = EventHandlers.keypressEvent.call(input, keypress, true, false, strict, lvp + 1);
                        }
                        if (result) {
                            writeBuffer(undefined$1, getBuffer(), result.forwardPosition, keypress, false);
                            inputmask.caretPos = {
                                begin: result.forwardPosition,
                                end: result.forwardPosition
                            };
                        }
                    }
                }
            });
            if (writeOut) writeBuffer(input, getBuffer(), result ? result.forwardPosition : undefined$1, initiatingEvent || new $.Event("checkval"), initiatingEvent && initiatingEvent.type === "input");
        }
        function unmaskedvalue(input) {
            if (input) {
                if (input.inputmask === undefined$1) {
                    return input.value;
                }
                if (input.inputmask && input.inputmask.refreshValue) {
                    EventHandlers.setValueEvent.call(input);
                }
            }
            var umValue = [], vps = getMaskSet().validPositions;
            for (var pndx in vps) {
                if (vps[pndx].match && vps[pndx].match.fn != null) {
                    umValue.push(vps[pndx].input);
                }
            }
            var unmaskedValue = umValue.length === 0 ? "" : (isRTL ? umValue.reverse() : umValue).join("");
            if ($.isFunction(opts.onUnMask)) {
                var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
                unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
            }
            return unmaskedValue;
        }
        function caret(input, begin, end, notranslate) {
            function translatePosition(pos) {
                if (isRTL && typeof pos === "number" && (!opts.greedy || opts.placeholder !== "") && el) {
                    pos = el.inputmask._valueGet().length - pos;
                }
                return pos;
            }
            var range;
            if (begin !== undefined$1) {
                if ($.isArray(begin)) {
                    end = isRTL ? begin[0] : begin[1];
                    begin = isRTL ? begin[1] : begin[0];
                }
                if (begin.begin !== undefined$1) {
                    end = isRTL ? begin.begin : begin.end;
                    begin = isRTL ? begin.end : begin.begin;
                }
                if (typeof begin === "number") {
                    begin = notranslate ? begin : translatePosition(begin);
                    end = notranslate ? end : translatePosition(end);
                    end = typeof end == "number" ? end : begin;
                    var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
                    input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0;
                    input.inputmask.caretPos = {
                        begin: begin,
                        end: end
                    };
                    if (input === document.activeElement) {
                        if ("selectionStart" in input) {
                            input.selectionStart = begin;
                            input.selectionEnd = end;
                        } else if (window.getSelection) {
                            range = document.createRange();
                            if (input.firstChild === undefined$1 || input.firstChild === null) {
                                var textNode = document.createTextNode("");
                                input.appendChild(textNode);
                            }
                            range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length);
                            range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length);
                            range.collapse(true);
                            var sel = window.getSelection();
                            sel.removeAllRanges();
                            sel.addRange(range);
                        } else if (input.createTextRange) {
                            range = input.createTextRange();
                            range.collapse(true);
                            range.moveEnd("character", end);
                            range.moveStart("character", begin);
                            range.select();
                        }
                        renderColorMask(input, {
                            begin: begin,
                            end: end
                        });
                    }
                }
            } else {
                if ("selectionStart" in input) {
                    begin = input.selectionStart;
                    end = input.selectionEnd;
                } else if (window.getSelection) {
                    range = window.getSelection().getRangeAt(0);
                    if (range.commonAncestorContainer.parentNode === input || range.commonAncestorContainer === input) {
                        begin = range.startOffset;
                        end = range.endOffset;
                    }
                } else if (document.selection && document.selection.createRange) {
                    range = document.selection.createRange();
                    begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length);
                    end = begin + range.text.length;
                }
                return {
                    begin: notranslate ? begin : translatePosition(begin),
                    end: notranslate ? end : translatePosition(end)
                };
            }
        }
        function determineLastRequiredPosition(returnDefinition) {
            var buffer = getMaskTemplate(true, getLastValidPosition(), true, true), bl = buffer.length, pos, lvp = getLastValidPosition(), positions = {}, lvTest = getMaskSet().validPositions[lvp], ndxIntlzr = lvTest !== undefined$1 ? lvTest.locator.slice() : undefined$1, testPos;
            for (pos = lvp + 1; pos < buffer.length; pos++) {
                testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
                ndxIntlzr = testPos.locator.slice();
                positions[pos] = $.extend(true, {}, testPos);
            }
            var lvTestAlt = lvTest && lvTest.alternation !== undefined$1 ? lvTest.locator[lvTest.alternation] : undefined$1;
            for (pos = bl - 1; pos > lvp; pos--) {
                testPos = positions[pos];
                if ((testPos.match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && testPos.match.fn != null || testPos.match.fn === null && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && getTests(pos)[0].def !== "")) && buffer[pos] === getPlaceholder(pos, testPos.match)) {
                    bl--;
                } else break;
            }
            return returnDefinition ? {
                l: bl,
                def: positions[bl] ? positions[bl].match : undefined$1
            } : bl;
        }
        function clearOptionalTail(buffer) {
            buffer.length = 0;
            var template = getMaskTemplate(true, 0, true, undefined$1, true), lmnt, validPos;
            while (lmnt = template.shift(), lmnt !== undefined$1) buffer.push(lmnt);
            return buffer;
        }
        function isComplete(buffer) {
            if ($.isFunction(opts.isComplete)) return opts.isComplete(buffer, opts);
            if (opts.repeat === "*") return undefined$1;
            var complete = false, lrp = determineLastRequiredPosition(true), aml = seekPrevious(lrp.l);
            if (lrp.def === undefined$1 || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
                complete = true;
                for (var i = 0; i <= aml; i++) {
                    var test = getTestTemplate(i).match;
                    if (test.fn !== null && getMaskSet().validPositions[i] === undefined$1 && test.optionality !== true && test.optionalQuantifier !== true || test.fn === null && buffer[i] !== getPlaceholder(i, test)) {
                        complete = false;
                        break;
                    }
                }
            }
            return complete;
        }
        function handleRemove(input, k, pos, strict, fromIsValid) {
            if (opts.numericInput || isRTL) {
                if (k === Inputmask.keyCode.BACKSPACE) {
                    k = Inputmask.keyCode.DELETE;
                } else if (k === Inputmask.keyCode.DELETE) {
                    k = Inputmask.keyCode.BACKSPACE;
                }
                if (isRTL) {
                    var pend = pos.end;
                    pos.end = pos.begin;
                    pos.begin = pend;
                }
            }
            if (k === Inputmask.keyCode.BACKSPACE && pos.end - pos.begin < 1) {
                pos.begin = seekPrevious(pos.begin);
                if (getMaskSet().validPositions[pos.begin] !== undefined$1 && getMaskSet().validPositions[pos.begin].input === opts.groupSeparator) {
                    pos.begin--;
                }
            } else if (k === Inputmask.keyCode.DELETE && pos.begin === pos.end) {
                pos.end = isMask(pos.end, true) && (getMaskSet().validPositions[pos.end] && getMaskSet().validPositions[pos.end].input !== opts.radixPoint) ? pos.end + 1 : seekNext(pos.end) + 1;
                if (getMaskSet().validPositions[pos.begin] !== undefined$1 && getMaskSet().validPositions[pos.begin].input === opts.groupSeparator) {
                    pos.end++;
                }
            }
            revalidateMask(pos);
            if (strict !== true && opts.keepStatic !== false || opts.regex !== null) {
                var result = alternate(true);
                if (result) {
                    var newPos = result.caret !== undefined$1 ? result.caret : result.pos ? seekNext(result.pos.begin ? result.pos.begin : result.pos) : getLastValidPosition(-1, true);
                    if (k !== Inputmask.keyCode.DELETE || pos.begin > newPos) {
                        pos.begin == newPos;
                    }
                }
            }
            var lvp = getLastValidPosition(pos.begin, true);
            if (lvp < pos.begin || pos.begin === -1) {
                getMaskSet().p = seekNext(lvp);
            } else if (strict !== true) {
                getMaskSet().p = pos.begin;
                if (fromIsValid !== true) {
                    while (getMaskSet().p < lvp && getMaskSet().validPositions[getMaskSet().p] === undefined$1) {
                        getMaskSet().p++;
                    }
                }
            }
        }
        function initializeColorMask(input) {
            var computedStyle = (input.ownerDocument.defaultView || window).getComputedStyle(input, null);
            function findCaretPos(clientx) {
                var e = document.createElement("span"), caretPos;
                for (var style in computedStyle) {
                    if (isNaN(style) && style.indexOf("font") !== -1) {
                        e.style[style] = computedStyle[style];
                    }
                }
                e.style.textTransform = computedStyle.textTransform;
                e.style.letterSpacing = computedStyle.letterSpacing;
                e.style.position = "absolute";
                e.style.height = "auto";
                e.style.width = "auto";
                e.style.visibility = "hidden";
                e.style.whiteSpace = "nowrap";
                document.body.appendChild(e);
                var inputText = input.inputmask._valueGet(), previousWidth = 0, itl;
                for (caretPos = 0, itl = inputText.length; caretPos <= itl; caretPos++) {
                    e.innerHTML += inputText.charAt(caretPos) || "_";
                    if (e.offsetWidth >= clientx) {
                        var offset1 = clientx - previousWidth;
                        var offset2 = e.offsetWidth - clientx;
                        e.innerHTML = inputText.charAt(caretPos);
                        offset1 -= e.offsetWidth / 3;
                        caretPos = offset1 < offset2 ? caretPos - 1 : caretPos;
                        break;
                    }
                    previousWidth = e.offsetWidth;
                }
                document.body.removeChild(e);
                return caretPos;
            }
            var template = document.createElement("div");
            template.style.width = computedStyle.width;
            template.style.textAlign = computedStyle.textAlign;
            colorMask = document.createElement("div");
            input.inputmask.colorMask = colorMask;
            colorMask.className = "im-colormask";
            input.parentNode.insertBefore(colorMask, input);
            input.parentNode.removeChild(input);
            colorMask.appendChild(input);
            colorMask.appendChild(template);
            input.style.left = template.offsetLeft + "px";
            $(colorMask).on("mouseleave", function(e) {
                return EventHandlers.mouseleaveEvent.call(input, [ e ]);
            });
            $(colorMask).on("mouseenter", function(e) {
                return EventHandlers.mouseenterEvent.call(input, [ e ]);
            });
            $(colorMask).on("click", function(e) {
                caret(input, findCaretPos(e.clientX));
                return EventHandlers.clickEvent.call(input, [ e ]);
            });
        }
        function renderColorMask(input, caretPos, clear) {
            var maskTemplate = [], isStatic = false, test, testPos, ndxIntlzr, pos = 0;
            function setEntry(entry) {
                if (entry === undefined$1) entry = "";
                if (!isStatic && (test.fn === null || testPos.input === undefined$1)) {
                    isStatic = true;
                    maskTemplate.push("<span class='im-static'>" + entry);
                } else if (isStatic && (test.fn !== null && testPos.input !== undefined$1 || test.def === "")) {
                    isStatic = false;
                    var mtl = maskTemplate.length;
                    maskTemplate[mtl - 1] = maskTemplate[mtl - 1] + "</span>";
                    maskTemplate.push(entry);
                } else maskTemplate.push(entry);
            }
            function setCaret() {
                if (document.activeElement === input) {
                    maskTemplate.splice(caretPos.begin, 0, caretPos.begin === caretPos.end || caretPos.end > getMaskSet().maskLength ? '<mark class="im-caret" style="border-right-width: 1px;border-right-style: solid;">' : '<mark class="im-caret-select">');
                    maskTemplate.splice(caretPos.end + 1, 0, "</mark>");
                }
            }
            if (colorMask !== undefined$1) {
                var buffer = getBuffer();
                if (caretPos === undefined$1) {
                    caretPos = caret(input);
                } else if (caretPos.begin === undefined$1) {
                    caretPos = {
                        begin: caretPos,
                        end: caretPos
                    };
                }
                if (clear !== true) {
                    var lvp = getLastValidPosition();
                    do {
                        if (getMaskSet().validPositions[pos]) {
                            testPos = getMaskSet().validPositions[pos];
                            test = testPos.match;
                            ndxIntlzr = testPos.locator.slice();
                            setEntry(buffer[pos]);
                        } else {
                            testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
                            test = testPos.match;
                            ndxIntlzr = testPos.locator.slice();
                            if (opts.jitMasking === false || pos < lvp || typeof opts.jitMasking === "number" && isFinite(opts.jitMasking) && opts.jitMasking > pos) {
                                setEntry(getPlaceholder(pos, test));
                            } else isStatic = false;
                        }
                        pos++;
                    } while ((maxLength === undefined$1 || pos < maxLength) && (test.fn !== null || test.def !== "") || lvp > pos || isStatic);
                    if (isStatic) setEntry();
                    setCaret();
                }
                var template = colorMask.getElementsByTagName("div")[0];
                template.innerHTML = maskTemplate.join("");
                input.inputmask.positionColorMask(input, template);
            }
        }
        function mask(elem) {
            function isElementTypeSupported(input, opts) {
                function patchValueProperty(npt) {
                    var valueGet;
                    var valueSet;
                    function patchValhook(type) {
                        if ($.valHooks && ($.valHooks[type] === undefined$1 || $.valHooks[type].inputmaskpatch !== true)) {
                            var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function(elem) {
                                return elem.value;
                            };
                            var valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function(elem, value) {
                                elem.value = value;
                                return elem;
                            };
                            $.valHooks[type] = {
                                get: function(elem) {
                                    if (elem.inputmask) {
                                        if (elem.inputmask.opts.autoUnmask) {
                                            return elem.inputmask.unmaskedvalue();
                                        } else {
                                            var result = valhookGet(elem);
                                            return getLastValidPosition(undefined$1, undefined$1, elem.inputmask.maskset.validPositions) !== -1 || opts.nullable !== true ? result : "";
                                        }
                                    } else return valhookGet(elem);
                                },
                                set: function(elem, value) {
                                    var $elem = $(elem), result;
                                    result = valhookSet(elem, value);
                                    if (elem.inputmask) {
                                        $elem.trigger("setvalue", [ value ]);
                                    }
                                    return result;
                                },
                                inputmaskpatch: true
                            };
                        }
                    }
                    function getter() {
                        if (this.inputmask) {
                            return this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : getLastValidPosition() !== -1 || opts.nullable !== true ? document.activeElement === this && opts.clearMaskOnLostFocus ? (isRTL ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") : valueGet.call(this) : "";
                        } else return valueGet.call(this);
                    }
                    function setter(value) {
                        valueSet.call(this, value);
                        if (this.inputmask) {
                            $(this).trigger("setvalue", [ value ]);
                        }
                    }
                    function installNativeValueSetFallback(npt) {
                        EventRuler.on(npt, "mouseenter", function(event) {
                            var $input = $(this), input = this, value = input.inputmask._valueGet();
                            if (value !== getBuffer().join("")) {
                                $input.trigger("setvalue");
                            }
                        });
                    }
                    if (!npt.inputmask.__valueGet) {
                        if (opts.noValuePatching !== true) {
                            if (Object.getOwnPropertyDescriptor) {
                                if (typeof Object.getPrototypeOf !== "function") {
                                    Object.getPrototypeOf = typeof "test".__proto__ === "object" ? function(object) {
                                        return object.__proto__;
                                    } : function(object) {
                                        return object.constructor.prototype;
                                    };
                                }
                                var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : undefined$1;
                                if (valueProperty && valueProperty.get && valueProperty.set) {
                                    valueGet = valueProperty.get;
                                    valueSet = valueProperty.set;
                                    Object.defineProperty(npt, "value", {
                                        get: getter,
                                        set: setter,
                                        configurable: true
                                    });
                                } else if (npt.tagName !== "INPUT") {
                                    valueGet = function() {
                                        return this.textContent;
                                    };
                                    valueSet = function(value) {
                                        this.textContent = value;
                                    };
                                    Object.defineProperty(npt, "value", {
                                        get: getter,
                                        set: setter,
                                        configurable: true
                                    });
                                }
                            } else if (document.__lookupGetter__ && npt.__lookupGetter__("value")) {
                                valueGet = npt.__lookupGetter__("value");
                                valueSet = npt.__lookupSetter__("value");
                                npt.__defineGetter__("value", getter);
                                npt.__defineSetter__("value", setter);
                            }
                            npt.inputmask.__valueGet = valueGet;
                            npt.inputmask.__valueSet = valueSet;
                        }
                        npt.inputmask._valueGet = function(overruleRTL) {
                            return isRTL && overruleRTL !== true ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
                        };
                        npt.inputmask._valueSet = function(value, overruleRTL) {
                            valueSet.call(this.el, value === null || value === undefined$1 ? "" : overruleRTL !== true && isRTL ? value.split("").reverse().join("") : value);
                        };
                        if (valueGet === undefined$1) {
                            valueGet = function() {
                                return this.value;
                            };
                            valueSet = function(value) {
                                this.value = value;
                            };
                            patchValhook(npt.type);
                            installNativeValueSetFallback(npt);
                        }
                    }
                }
                var elementType = input.getAttribute("type");
                var isSupported = input.tagName === "INPUT" && $.inArray(elementType, opts.supportsInputType) !== -1 || input.isContentEditable || input.tagName === "TEXTAREA";
                if (!isSupported) {
                    if (input.tagName === "INPUT") {
                        var el = document.createElement("input");
                        el.setAttribute("type", elementType);
                        isSupported = el.type === "text";
                        el = null;
                    } else isSupported = "partial";
                }
                if (isSupported !== false) {
                    patchValueProperty(input);
                } else input.inputmask = undefined$1;
                return isSupported;
            }
            EventRuler.off(elem);
            var isSupported = isElementTypeSupported(elem, opts);
            if (isSupported !== false) {
                el = elem;
                $el = $(el);
                originalPlaceholder = el.placeholder;
                maxLength = el !== undefined$1 ? el.maxLength : undefined$1;
                if (maxLength === -1) maxLength = undefined$1;
                if (opts.colorMask === true) {
                    initializeColorMask(el);
                }
                if (mobile) {
                    if ("inputMode" in el) {
                        el.inputmode = opts.inputmode;
                        el.setAttribute("inputmode", opts.inputmode);
                    }
                    if (opts.disablePredictiveText === true) {
                        if ("autocorrect" in el) {
                            el.autocorrect = false;
                        } else {
                            if (opts.colorMask !== true) {
                                initializeColorMask(el);
                            }
                            el.type = "password";
                        }
                    }
                }
                if (isSupported === true) {
                    el.setAttribute("im-insert", opts.insertMode);
                    EventRuler.on(el, "submit", EventHandlers.submitEvent);
                    EventRuler.on(el, "reset", EventHandlers.resetEvent);
                    EventRuler.on(el, "blur", EventHandlers.blurEvent);
                    EventRuler.on(el, "focus", EventHandlers.focusEvent);
                    if (opts.colorMask !== true) {
                        EventRuler.on(el, "click", EventHandlers.clickEvent);
                        EventRuler.on(el, "mouseleave", EventHandlers.mouseleaveEvent);
                        EventRuler.on(el, "mouseenter", EventHandlers.mouseenterEvent);
                    }
                    EventRuler.on(el, "paste", EventHandlers.pasteEvent);
                    EventRuler.on(el, "cut", EventHandlers.cutEvent);
                    EventRuler.on(el, "complete", opts.oncomplete);
                    EventRuler.on(el, "incomplete", opts.onincomplete);
                    EventRuler.on(el, "cleared", opts.oncleared);
                    if (!mobile && opts.inputEventOnly !== true) {
                        EventRuler.on(el, "keydown", EventHandlers.keydownEvent);
                        EventRuler.on(el, "keypress", EventHandlers.keypressEvent);
                    } else {
                        el.removeAttribute("maxLength");
                    }
                    EventRuler.on(el, "input", EventHandlers.inputFallBackEvent);
                    EventRuler.on(el, "beforeinput", EventHandlers.beforeInputEvent);
                }
                EventRuler.on(el, "setvalue", EventHandlers.setValueEvent);
                undoValue = getBufferTemplate().join("");
                if (el.inputmask._valueGet(true) !== "" || opts.clearMaskOnLostFocus === false || document.activeElement === el) {
                    var initialValue = $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, el.inputmask._valueGet(true), opts) || el.inputmask._valueGet(true) : el.inputmask._valueGet(true);
                    if (initialValue !== "") checkVal(el, true, false, initialValue.split(""));
                    var buffer = getBuffer().slice();
                    undoValue = buffer.join("");
                    if (isComplete(buffer) === false) {
                        if (opts.clearIncomplete) {
                            resetMaskSet();
                        }
                    }
                    if (opts.clearMaskOnLostFocus && document.activeElement !== el) {
                        if (getLastValidPosition() === -1) {
                            buffer = [];
                        } else {
                            clearOptionalTail(buffer);
                        }
                    }
                    if (opts.clearMaskOnLostFocus === false || opts.showMaskOnFocus && document.activeElement === el || el.inputmask._valueGet(true) !== "") writeBuffer(el, buffer);
                    if (document.activeElement === el) {
                        caret(el, seekNext(getLastValidPosition()));
                    }
                }
            }
        }
        var valueBuffer;
        if (actionObj !== undefined$1) {
            switch (actionObj.action) {
              case "isComplete":
                el = actionObj.el;
                return isComplete(getBuffer());

              case "unmaskedvalue":
                if (el === undefined$1 || actionObj.value !== undefined$1) {
                    valueBuffer = actionObj.value;
                    valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, valueBuffer, opts) || valueBuffer : valueBuffer).split("");
                    checkVal.call(this, undefined$1, false, false, valueBuffer);
                    if ($.isFunction(opts.onBeforeWrite)) opts.onBeforeWrite.call(inputmask, undefined$1, getBuffer(), 0, opts);
                }
                return unmaskedvalue(el);

              case "mask":
                mask(el);
                break;

              case "format":
                valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value : actionObj.value).split("");
                checkVal.call(this, undefined$1, true, false, valueBuffer);
                if (actionObj.metadata) {
                    return {
                        value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
                        metadata: maskScope.call(this, {
                            action: "getmetadata"
                        }, maskset, opts)
                    };
                }
                return isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");

              case "isValid":
                if (actionObj.value) {
                    valueBuffer = actionObj.value.split("");
                    checkVal.call(this, undefined$1, true, true, valueBuffer);
                } else {
                    actionObj.value = getBuffer().join("");
                }
                var buffer = getBuffer();
                var rl = determineLastRequiredPosition(), lmib = buffer.length - 1;
                for (;lmib > rl; lmib--) {
                    if (isMask(lmib)) break;
                }
                buffer.splice(rl, lmib + 1 - rl);
                return isComplete(buffer) && actionObj.value === getBuffer().join("");

              case "getemptymask":
                return getBufferTemplate().join("");

              case "remove":
                if (el && el.inputmask) {
                    $.data(el, "_inputmask_opts", null);
                    $el = $(el);
                    el.inputmask._valueSet(opts.autoUnmask ? unmaskedvalue(el) : el.inputmask._valueGet(true));
                    EventRuler.off(el);
                    if (el.inputmask.colorMask) {
                        colorMask = el.inputmask.colorMask;
                        colorMask.removeChild(el);
                        colorMask.parentNode.insertBefore(el, colorMask);
                        colorMask.parentNode.removeChild(colorMask);
                    }
                    var valueProperty;
                    if (Object.getOwnPropertyDescriptor && Object.getPrototypeOf) {
                        valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value");
                        if (valueProperty) {
                            if (el.inputmask.__valueGet) {
                                Object.defineProperty(el, "value", {
                                    get: el.inputmask.__valueGet,
                                    set: el.inputmask.__valueSet,
                                    configurable: true
                                });
                            }
                        }
                    } else if (document.__lookupGetter__ && el.__lookupGetter__("value")) {
                        if (el.inputmask.__valueGet) {
                            el.__defineGetter__("value", el.inputmask.__valueGet);
                            el.__defineSetter__("value", el.inputmask.__valueSet);
                        }
                    }
                    el.inputmask = undefined$1;
                }
                return el;
                break;

              case "getmetadata":
                if ($.isArray(maskset.metadata)) {
                    var maskTarget = getMaskTemplate(true, 0, false).join("");
                    $.each(maskset.metadata, function(ndx, mtdt) {
                        if (mtdt.mask === maskTarget) {
                            maskTarget = mtdt;
                            return false;
                        }
                    });
                    return maskTarget;
                }
                return maskset.metadata;
            }
        }
    }
    return Inputmask;
});
});

var inputmask_extensions = createCommonjsModule(function (module, exports) {
/*!
* inputmask.extensions.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2019 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 4.0.9
*/

(function(factory) {
    if (typeof undefined === "function" && undefined.amd) {
        undefined([ "./inputmask" ], factory);
    } else if ('object' === "object") {
        module.exports = factory(inputmask);
    } else {
        factory(window.Inputmask);
    }
})(function(Inputmask) {
    Inputmask.extendDefinitions({
        A: {
            validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
            casing: "upper"
        },
        "&": {
            validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
            casing: "upper"
        },
        "#": {
            validator: "[0-9A-Fa-f]",
            casing: "upper"
        }
    });
    Inputmask.extendAliases({
        cssunit: {
            regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
        },
        url: {
            regex: "(https?|ftp)//.*",
            autoUnmask: false
        },
        ip: {
            mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
            definitions: {
                i: {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        if (pos - 1 > -1 && maskset.buffer[pos - 1] !== ".") {
                            chrs = maskset.buffer[pos - 1] + chrs;
                            if (pos - 2 > -1 && maskset.buffer[pos - 2] !== ".") {
                                chrs = maskset.buffer[pos - 2] + chrs;
                            } else chrs = "0" + chrs;
                        } else chrs = "00" + chrs;
                        return new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(chrs);
                    }
                }
            },
            onUnMask: function(maskedValue, unmaskedValue, opts) {
                return maskedValue;
            },
            inputmode: "numeric"
        },
        email: {
            mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
            greedy: false,
            casing: "lower",
            onBeforePaste: function(pastedValue, opts) {
                pastedValue = pastedValue.toLowerCase();
                return pastedValue.replace("mailto:", "");
            },
            definitions: {
                "*": {
                    validator: "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5!#$%&'*+/=?^_`{|}~-]"
                },
                "-": {
                    validator: "[0-9A-Za-z-]"
                }
            },
            onUnMask: function(maskedValue, unmaskedValue, opts) {
                return maskedValue;
            },
            inputmode: "email"
        },
        mac: {
            mask: "##:##:##:##:##:##"
        },
        vin: {
            mask: "V{13}9{4}",
            definitions: {
                V: {
                    validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
                    casing: "upper"
                }
            },
            clearIncomplete: true,
            autoUnmask: true
        }
    });
    return Inputmask;
});
});

var inputmask_date_extensions = createCommonjsModule(function (module, exports) {
/*!
* inputmask.date.extensions.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2019 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 4.0.9
*/

(function(factory) {
    if (typeof undefined === "function" && undefined.amd) {
        undefined([ "./inputmask" ], factory);
    } else if ('object' === "object") {
        module.exports = factory(inputmask);
    } else {
        factory(window.Inputmask);
    }
})(function(Inputmask) {
    var $ = Inputmask.dependencyLib;
    var formatCode = {
        d: [ "[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate ],
        dd: [ "0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function() {
            return pad(Date.prototype.getDate.call(this), 2);
        } ],
        ddd: [ "" ],
        dddd: [ "" ],
        m: [ "[1-9]|1[012]", Date.prototype.setMonth, "month", function() {
            return Date.prototype.getMonth.call(this) + 1;
        } ],
        mm: [ "0[1-9]|1[012]", Date.prototype.setMonth, "month", function() {
            return pad(Date.prototype.getMonth.call(this) + 1, 2);
        } ],
        mmm: [ "" ],
        mmmm: [ "" ],
        yy: [ "[0-9]{2}", Date.prototype.setFullYear, "year", function() {
            return pad(Date.prototype.getFullYear.call(this), 2);
        } ],
        yyyy: [ "[0-9]{4}", Date.prototype.setFullYear, "year", function() {
            return pad(Date.prototype.getFullYear.call(this), 4);
        } ],
        h: [ "[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours ],
        hh: [ "0[1-9]|1[0-2]", Date.prototype.setHours, "hours", function() {
            return pad(Date.prototype.getHours.call(this), 2);
        } ],
        hhh: [ "[0-9]+", Date.prototype.setHours, "hours", Date.prototype.getHours ],
        H: [ "1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours ],
        HH: [ "0[0-9]|1[0-9]|2[0-3]", Date.prototype.setHours, "hours", function() {
            return pad(Date.prototype.getHours.call(this), 2);
        } ],
        HHH: [ "[0-9]+", Date.prototype.setHours, "hours", Date.prototype.getHours ],
        M: [ "[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes ],
        MM: [ "0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setMinutes, "minutes", function() {
            return pad(Date.prototype.getMinutes.call(this), 2);
        } ],
        ss: [ "[0-5][0-9]", Date.prototype.setSeconds, "seconds", function() {
            return pad(Date.prototype.getSeconds.call(this), 2);
        } ],
        l: [ "[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function() {
            return pad(Date.prototype.getMilliseconds.call(this), 3);
        } ],
        L: [ "[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function() {
            return pad(Date.prototype.getMilliseconds.call(this), 2);
        } ],
        t: [ "[ap]" ],
        tt: [ "[ap]m" ],
        T: [ "[AP]" ],
        TT: [ "[AP]M" ],
        Z: [ "" ],
        o: [ "" ],
        S: [ "" ]
    }, formatAlias = {
        isoDate: "yyyy-mm-dd",
        isoTime: "HH:MM:ss",
        isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    };
    function getTokenizer(opts) {
        if (!opts.tokenizer) {
            var tokens = [];
            for (var ndx in formatCode) {
                if (tokens.indexOf(ndx[0]) === -1) tokens.push(ndx[0]);
            }
            opts.tokenizer = "(" + tokens.join("+|") + ")+?|.";
            opts.tokenizer = new RegExp(opts.tokenizer, "g");
        }
        return opts.tokenizer;
    }
    function isValidDate(dateParts, currentResult) {
        return !isFinite(dateParts.rawday) || dateParts.day == "29" && !isFinite(dateParts.rawyear) || new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day ? currentResult : false;
    }
    function isDateInRange(dateParts, opts) {
        var result = true;
        if (opts.min) {
            if (dateParts["rawyear"]) {
                var rawYear = dateParts["rawyear"].replace(/[^0-9]/g, ""), minYear = opts.min.year.substr(0, rawYear.length);
                result = minYear <= rawYear;
            }
            if (dateParts["year"] === dateParts["rawyear"]) {
                if (opts.min.date.getTime() === opts.min.date.getTime()) {
                    result = opts.min.date.getTime() <= dateParts.date.getTime();
                }
            }
        }
        if (result && opts.max && opts.max.date.getTime() === opts.max.date.getTime()) {
            result = opts.max.date.getTime() >= dateParts.date.getTime();
        }
        return result;
    }
    function parse(format, dateObjValue, opts, raw) {
        var mask = "", match;
        while (match = getTokenizer(opts).exec(format)) {
            if (dateObjValue === undefined) {
                if (formatCode[match[0]]) {
                    mask += "(" + formatCode[match[0]][0] + ")";
                } else {
                    switch (match[0]) {
                      case "[":
                        mask += "(";
                        break;

                      case "]":
                        mask += ")?";
                        break;

                      default:
                        mask += Inputmask.escapeRegex(match[0]);
                    }
                }
            } else {
                if (formatCode[match[0]]) {
                    if (raw !== true && formatCode[match[0]][3]) {
                        var getFn = formatCode[match[0]][3];
                        mask += getFn.call(dateObjValue.date);
                    } else if (formatCode[match[0]][2]) mask += dateObjValue["raw" + formatCode[match[0]][2]]; else mask += match[0];
                } else mask += match[0];
            }
        }
        return mask;
    }
    function pad(val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) val = "0" + val;
        return val;
    }
    function analyseMask(maskString, format, opts) {
        var dateObj = {
            date: new Date(1, 0, 1)
        }, targetProp, mask = maskString, match, dateOperation, targetValidator;
        function extendProperty(value) {
            var correctedValue = value.replace(/[^0-9]/g, "0");
            if (correctedValue != value) {
                var enteredPart = value.replace(/[^0-9]/g, ""), min = (opts.min && opts.min[targetProp] || value).toString(), max = (opts.max && opts.max[targetProp] || value).toString();
                correctedValue = enteredPart + (enteredPart < min.slice(0, enteredPart.length) ? min.slice(enteredPart.length) : enteredPart > max.slice(0, enteredPart.length) ? max.slice(enteredPart.length) : correctedValue.toString().slice(enteredPart.length));
            }
            return correctedValue;
        }
        function setValue(dateObj, value, opts) {
            dateObj[targetProp] = extendProperty(value);
            dateObj["raw" + targetProp] = value;
            if (dateOperation !== undefined) dateOperation.call(dateObj.date, targetProp == "month" ? parseInt(dateObj[targetProp]) - 1 : dateObj[targetProp]);
        }
        if (typeof mask === "string") {
            while (match = getTokenizer(opts).exec(format)) {
                var value = mask.slice(0, match[0].length);
                if (formatCode.hasOwnProperty(match[0])) {
                    targetValidator = formatCode[match[0]][0];
                    targetProp = formatCode[match[0]][2];
                    dateOperation = formatCode[match[0]][1];
                    setValue(dateObj, value, opts);
                }
                mask = mask.slice(value.length);
            }
            return dateObj;
        } else if (mask && typeof mask === "object" && mask.hasOwnProperty("date")) {
            return mask;
        }
        return undefined;
    }
    Inputmask.extendAliases({
        datetime: {
            mask: function(opts) {
                formatCode.S = opts.i18n.ordinalSuffix.join("|");
                opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat;
                opts.displayFormat = formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat;
                opts.outputFormat = formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat;
                opts.placeholder = opts.placeholder !== "" ? opts.placeholder : opts.inputFormat.replace(/[\[\]]/, "");
                opts.regex = parse(opts.inputFormat, undefined, opts);
                return null;
            },
            placeholder: "",
            inputFormat: "isoDateTime",
            displayFormat: undefined,
            outputFormat: undefined,
            min: null,
            max: null,
            i18n: {
                dayNames: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
                monthNames: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                ordinalSuffix: [ "st", "nd", "rd", "th" ]
            },
            postValidation: function(buffer, pos, currentResult, opts) {
                opts.min = analyseMask(opts.min, opts.inputFormat, opts);
                opts.max = analyseMask(opts.max, opts.inputFormat, opts);
                var result = currentResult, dateParts = analyseMask(buffer.join(""), opts.inputFormat, opts);
                if (result && dateParts.date.getTime() === dateParts.date.getTime()) {
                    result = isValidDate(dateParts, result);
                    result = result && isDateInRange(dateParts, opts);
                }
                if (pos && result && currentResult.pos !== pos) {
                    return {
                        buffer: parse(opts.inputFormat, dateParts, opts),
                        refreshFromBuffer: {
                            start: pos,
                            end: currentResult.pos
                        }
                    };
                }
                return result;
            },
            onKeyDown: function(e, buffer, caretPos, opts) {
                var input = this;
                if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                    var today = new Date(), match, date = "";
                    while (match = getTokenizer(opts).exec(opts.inputFormat)) {
                        if (match[0].charAt(0) === "d") {
                            date += pad(today.getDate(), match[0].length);
                        } else if (match[0].charAt(0) === "m") {
                            date += pad(today.getMonth() + 1, match[0].length);
                        } else if (match[0] === "yyyy") {
                            date += today.getFullYear().toString();
                        } else if (match[0].charAt(0) === "y") {
                            date += pad(today.getYear(), match[0].length);
                        }
                    }
                    input.inputmask._valueSet(date);
                    $(input).trigger("setvalue");
                }
            },
            onUnMask: function(maskedValue, unmaskedValue, opts) {
                return parse(opts.outputFormat, analyseMask(maskedValue, opts.inputFormat, opts), opts, true);
            },
            casing: function(elem, test, pos, validPositions) {
                if (test.nativeDef.indexOf("[ap]") == 0) return elem.toLowerCase();
                if (test.nativeDef.indexOf("[AP]") == 0) return elem.toUpperCase();
                return elem;
            },
            insertMode: false,
            shiftPositions: false
        }
    });
    return Inputmask;
});
});

var inputmask_numeric_extensions = createCommonjsModule(function (module, exports) {
/*!
* inputmask.numeric.extensions.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2019 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 4.0.9
*/

(function(factory) {
    if (typeof undefined === "function" && undefined.amd) {
        undefined([ "./inputmask" ], factory);
    } else if ('object' === "object") {
        module.exports = factory(inputmask);
    } else {
        factory(window.Inputmask);
    }
})(function(Inputmask) {
    var $ = Inputmask.dependencyLib;
    function autoEscape(txt, opts) {
        var escapedTxt = "";
        for (var i = 0; i < txt.length; i++) {
            if (Inputmask.prototype.definitions[txt.charAt(i)] || opts.definitions[txt.charAt(i)] || opts.optionalmarker.start === txt.charAt(i) || opts.optionalmarker.end === txt.charAt(i) || opts.quantifiermarker.start === txt.charAt(i) || opts.quantifiermarker.end === txt.charAt(i) || opts.groupmarker.start === txt.charAt(i) || opts.groupmarker.end === txt.charAt(i) || opts.alternatormarker === txt.charAt(i)) {
                escapedTxt += "\\" + txt.charAt(i);
            } else escapedTxt += txt.charAt(i);
        }
        return escapedTxt;
    }
    function alignDigits(buffer, digits, opts) {
        if (digits > 0) {
            var radixPosition = $.inArray(opts.radixPoint, buffer);
            if (radixPosition === -1) {
                buffer.push(opts.radixPoint);
                radixPosition = buffer.length - 1;
            }
            for (var i = 1; i <= digits; i++) {
                buffer[radixPosition + i] = buffer[radixPosition + i] || "0";
            }
        }
        return buffer;
    }
    Inputmask.extendAliases({
        numeric: {
            mask: function(opts) {
                if (opts.repeat !== 0 && isNaN(opts.integerDigits)) {
                    opts.integerDigits = opts.repeat;
                }
                opts.repeat = 0;
                if (opts.groupSeparator === opts.radixPoint && opts.digits && opts.digits !== "0") {
                    if (opts.radixPoint === ".") {
                        opts.groupSeparator = ",";
                    } else if (opts.radixPoint === ",") {
                        opts.groupSeparator = ".";
                    } else opts.groupSeparator = "";
                }
                if (opts.groupSeparator === " ") {
                    opts.skipOptionalPartCharacter = undefined;
                }
                opts.autoGroup = opts.autoGroup && opts.groupSeparator !== "";
                if (opts.autoGroup) {
                    if (typeof opts.groupSize == "string" && isFinite(opts.groupSize)) opts.groupSize = parseInt(opts.groupSize);
                    if (isFinite(opts.integerDigits)) {
                        var seps = Math.floor(opts.integerDigits / opts.groupSize);
                        var mod = opts.integerDigits % opts.groupSize;
                        opts.integerDigits = parseInt(opts.integerDigits) + (mod === 0 ? seps - 1 : seps);
                        if (opts.integerDigits < 1) {
                            opts.integerDigits = "*";
                        }
                    }
                }
                if (opts.placeholder.length > 1) {
                    opts.placeholder = opts.placeholder.charAt(0);
                }
                if (opts.positionCaretOnClick === "radixFocus" && (opts.placeholder === "" && opts.integerOptional === false)) {
                    opts.positionCaretOnClick = "lvp";
                }
                opts.definitions[";"] = opts.definitions["~"];
                opts.definitions[";"].definitionSymbol = "~";
                if (opts.numericInput === true) {
                    opts.positionCaretOnClick = opts.positionCaretOnClick === "radixFocus" ? "lvp" : opts.positionCaretOnClick;
                    opts.digitsOptional = false;
                    if (isNaN(opts.digits)) opts.digits = 2;
                    opts.decimalProtect = false;
                }
                var mask = "[+]";
                mask += autoEscape(opts.prefix, opts);
                if (opts.integerOptional === true) {
                    mask += "~{1," + opts.integerDigits + "}";
                } else mask += "~{" + opts.integerDigits + "}";
                if (opts.digits !== undefined) {
                    var radixDef = opts.decimalProtect ? ":" : opts.radixPoint;
                    var dq = opts.digits.toString().split(",");
                    if (isFinite(dq[0]) && dq[1] && isFinite(dq[1])) {
                        mask += radixDef + ";{" + opts.digits + "}";
                    } else if (isNaN(opts.digits) || parseInt(opts.digits) > 0) {
                        if (opts.digitsOptional) {
                            mask += "[" + radixDef + ";{1," + opts.digits + "}]";
                        } else mask += radixDef + ";{" + opts.digits + "}";
                    }
                }
                mask += autoEscape(opts.suffix, opts);
                mask += "[-]";
                opts.greedy = false;
                return mask;
            },
            placeholder: "",
            greedy: false,
            digits: "*",
            digitsOptional: true,
            enforceDigitsOnBlur: false,
            radixPoint: ".",
            positionCaretOnClick: "radixFocus",
            groupSize: 3,
            groupSeparator: "",
            autoGroup: false,
            allowMinus: true,
            negationSymbol: {
                front: "-",
                back: ""
            },
            integerDigits: "+",
            integerOptional: true,
            prefix: "",
            suffix: "",
            rightAlign: true,
            decimalProtect: true,
            min: null,
            max: null,
            step: 1,
            insertMode: true,
            autoUnmask: false,
            unmaskAsNumber: false,
            inputType: "text",
            inputmode: "numeric",
            preValidation: function(buffer, pos, c, isSelection, opts, maskset) {
                if (c === "-" || c === opts.negationSymbol.front) {
                    if (opts.allowMinus !== true) return false;
                    opts.isNegative = opts.isNegative === undefined ? true : !opts.isNegative;
                    if (buffer.join("") === "") return true;
                    return {
                        caret: maskset.validPositions[pos] ? pos : undefined,
                        dopost: true
                    };
                }
                if (isSelection === false && c === opts.radixPoint && (opts.digits !== undefined && (isNaN(opts.digits) || parseInt(opts.digits) > 0))) {
                    var radixPos = $.inArray(opts.radixPoint, buffer);
                    if (radixPos !== -1 && maskset.validPositions[radixPos] !== undefined) {
                        if (opts.numericInput === true) {
                            return pos === radixPos;
                        }
                        return {
                            caret: radixPos + 1
                        };
                    }
                }
                return true;
            },
            postValidation: function(buffer, pos, currentResult, opts) {
                function buildPostMask(buffer, opts) {
                    var postMask = "";
                    postMask += "(" + opts.groupSeparator + "*{" + opts.groupSize + "}){*}";
                    if (opts.radixPoint !== "") {
                        var radixSplit = buffer.join("").split(opts.radixPoint);
                        if (radixSplit[1]) {
                            postMask += opts.radixPoint + "*{" + radixSplit[1].match(/^\d*\??\d*/)[0].length + "}";
                        }
                    }
                    return postMask;
                }
                var suffix = opts.suffix.split(""), prefix = opts.prefix.split("");
                if (currentResult.pos === undefined && currentResult.caret !== undefined && currentResult.dopost !== true) return currentResult;
                var caretPos = currentResult.caret !== undefined ? currentResult.caret : currentResult.pos;
                var maskedValue = buffer.slice();
                if (opts.numericInput) {
                    caretPos = maskedValue.length - caretPos - 1;
                    maskedValue = maskedValue.reverse();
                }
                var charAtPos = maskedValue[caretPos];
                if (charAtPos === opts.groupSeparator) {
                    caretPos += 1;
                    charAtPos = maskedValue[caretPos];
                }
                if (caretPos === maskedValue.length - opts.suffix.length - 1 && charAtPos === opts.radixPoint) return currentResult;
                if (charAtPos !== undefined) {
                    if (charAtPos !== opts.radixPoint && charAtPos !== opts.negationSymbol.front && charAtPos !== opts.negationSymbol.back) {
                        maskedValue[caretPos] = "?";
                        if (opts.prefix.length > 0 && caretPos >= (opts.isNegative === false ? 1 : 0) && caretPos < opts.prefix.length - 1 + (opts.isNegative === false ? 1 : 0)) {
                            prefix[caretPos - (opts.isNegative === false ? 1 : 0)] = "?";
                        } else if (opts.suffix.length > 0 && caretPos >= maskedValue.length - opts.suffix.length - (opts.isNegative === false ? 1 : 0)) {
                            suffix[caretPos - (maskedValue.length - opts.suffix.length - (opts.isNegative === false ? 1 : 0))] = "?";
                        }
                    }
                }
                prefix = prefix.join("");
                suffix = suffix.join("");
                var processValue = maskedValue.join("").replace(prefix, "");
                processValue = processValue.replace(suffix, "");
                processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
                processValue = processValue.replace(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"), "");
                processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "");
                if (isNaN(opts.placeholder)) {
                    processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.placeholder), "g"), "");
                }
                if (processValue.length > 1 && processValue.indexOf(opts.radixPoint) !== 1) {
                    if (charAtPos === "0") {
                        processValue = processValue.replace(/^\?/g, "");
                    }
                    processValue = processValue.replace(/^0/g, "");
                }
                if (processValue.charAt(0) === opts.radixPoint && opts.radixPoint !== "" && opts.numericInput !== true) {
                    processValue = "0" + processValue;
                }
                if (processValue !== "") {
                    processValue = processValue.split("");
                    if ((!opts.digitsOptional || opts.enforceDigitsOnBlur && currentResult.event === "blur") && isFinite(opts.digits)) {
                        var radixPosition = $.inArray(opts.radixPoint, processValue);
                        var rpb = $.inArray(opts.radixPoint, maskedValue);
                        if (radixPosition === -1) {
                            processValue.push(opts.radixPoint);
                            radixPosition = processValue.length - 1;
                        }
                        for (var i = 1; i <= opts.digits; i++) {
                            if ((!opts.digitsOptional || opts.enforceDigitsOnBlur && currentResult.event === "blur") && (processValue[radixPosition + i] === undefined || processValue[radixPosition + i] === opts.placeholder.charAt(0))) {
                                processValue[radixPosition + i] = currentResult.placeholder || opts.placeholder.charAt(0);
                            } else if (rpb !== -1 && maskedValue[rpb + i] !== undefined) {
                                processValue[radixPosition + i] = processValue[radixPosition + i] || maskedValue[rpb + i];
                            }
                        }
                    }
                    if (opts.autoGroup === true && opts.groupSeparator !== "" && (charAtPos !== opts.radixPoint || currentResult.pos !== undefined || currentResult.dopost)) {
                        var addRadix = processValue[processValue.length - 1] === opts.radixPoint && currentResult.c === opts.radixPoint;
                        processValue = Inputmask(buildPostMask(processValue, opts), {
                            numericInput: true,
                            jitMasking: true,
                            definitions: {
                                "*": {
                                    validator: "[0-9?]",
                                    cardinality: 1
                                }
                            }
                        }).format(processValue.join(""));
                        if (addRadix) processValue += opts.radixPoint;
                        if (processValue.charAt(0) === opts.groupSeparator) {
                            processValue.substr(1);
                        }
                    } else processValue = processValue.join("");
                }
                if (opts.isNegative && currentResult.event === "blur") {
                    opts.isNegative = processValue !== "0";
                }
                processValue = prefix + processValue;
                processValue += suffix;
                if (opts.isNegative) {
                    processValue = opts.negationSymbol.front + processValue;
                    processValue += opts.negationSymbol.back;
                }
                processValue = processValue.split("");
                if (charAtPos !== undefined) {
                    if (charAtPos !== opts.radixPoint && charAtPos !== opts.negationSymbol.front && charAtPos !== opts.negationSymbol.back) {
                        caretPos = $.inArray("?", processValue);
                        if (caretPos > -1) {
                            processValue[caretPos] = charAtPos;
                        } else caretPos = currentResult.caret || 0;
                    } else if (charAtPos === opts.radixPoint || charAtPos === opts.negationSymbol.front || charAtPos === opts.negationSymbol.back) {
                        var newCaretPos = $.inArray(charAtPos, processValue);
                        if (newCaretPos !== -1) caretPos = newCaretPos;
                    }
                }
                if (opts.numericInput) {
                    caretPos = processValue.length - caretPos - 1;
                    processValue = processValue.reverse();
                }
                var rslt = {
                    caret: (charAtPos === undefined || currentResult.pos !== undefined) && caretPos !== undefined ? caretPos + (opts.numericInput ? -1 : 1) : caretPos,
                    buffer: processValue,
                    refreshFromBuffer: currentResult.dopost || buffer.join("") !== processValue.join("")
                };
                return rslt.refreshFromBuffer ? rslt : currentResult;
            },
            onBeforeWrite: function(e, buffer, caretPos, opts) {
                function parseMinMaxOptions(opts) {
                    if (opts.parseMinMaxOptions === undefined) {
                        if (opts.min !== null) {
                            opts.min = opts.min.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
                            if (opts.radixPoint === ",") opts.min = opts.min.replace(opts.radixPoint, ".");
                            opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN;
                            if (isNaN(opts.min)) opts.min = Number.MIN_VALUE;
                        }
                        if (opts.max !== null) {
                            opts.max = opts.max.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
                            if (opts.radixPoint === ",") opts.max = opts.max.replace(opts.radixPoint, ".");
                            opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN;
                            if (isNaN(opts.max)) opts.max = Number.MAX_VALUE;
                        }
                        opts.parseMinMaxOptions = "done";
                    }
                }
                if (e) {
                    switch (e.type) {
                      case "keydown":
                        return opts.postValidation(buffer, caretPos, {
                            caret: caretPos,
                            dopost: true
                        }, opts);

                      case "blur":
                      case "checkval":
                        var unmasked;
                        parseMinMaxOptions(opts);
                        if (opts.min !== null || opts.max !== null) {
                            unmasked = opts.onUnMask(buffer.join(""), undefined, $.extend({}, opts, {
                                unmaskAsNumber: true
                            }));
                            if (opts.min !== null && unmasked < opts.min) {
                                opts.isNegative = opts.min < 0;
                                return opts.postValidation(opts.min.toString().replace(".", opts.radixPoint).split(""), caretPos, {
                                    caret: caretPos,
                                    dopost: true,
                                    placeholder: "0"
                                }, opts);
                            } else if (opts.max !== null && unmasked > opts.max) {
                                opts.isNegative = opts.max < 0;
                                return opts.postValidation(opts.max.toString().replace(".", opts.radixPoint).split(""), caretPos, {
                                    caret: caretPos,
                                    dopost: true,
                                    placeholder: "0"
                                }, opts);
                            }
                        }
                        return opts.postValidation(buffer, caretPos, {
                            caret: caretPos,
                            placeholder: "0",
                            event: "blur"
                        }, opts);

                      case "_checkval":
                        return {
                            caret: caretPos
                        };

                      default:
                        break;
                    }
                }
            },
            regex: {
                integerPart: function(opts, emptyCheck) {
                    return emptyCheck ? new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "+]?") : new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "+]?\\d+");
                },
                integerNPart: function(opts) {
                    return new RegExp("[\\d" + Inputmask.escapeRegex(opts.groupSeparator) + Inputmask.escapeRegex(opts.placeholder.charAt(0)) + "]+");
                }
            },
            definitions: {
                "~": {
                    validator: function(chrs, maskset, pos, strict, opts, isSelection) {
                        var isValid, l;
                        if (chrs === "k" || chrs === "m") {
                            isValid = {
                                insert: [],
                                c: 0
                            };
                            for (var i = 0, l = chrs === "k" ? 2 : 5; i < l; i++) {
                                isValid.insert.push({
                                    pos: pos + i,
                                    c: 0
                                });
                            }
                            isValid.pos = pos + l;
                            return isValid;
                        }
                        isValid = strict ? new RegExp("[0-9" + Inputmask.escapeRegex(opts.groupSeparator) + "]").test(chrs) : new RegExp("[0-9]").test(chrs);
                        if (isValid === true) {
                            if (opts.numericInput !== true && maskset.validPositions[pos] !== undefined && maskset.validPositions[pos].match.def === "~" && !isSelection) {
                                var processValue = maskset.buffer.join("");
                                processValue = processValue.replace(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"), "");
                                processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "");
                                var pvRadixSplit = processValue.split(opts.radixPoint);
                                if (pvRadixSplit.length > 1) {
                                    pvRadixSplit[1] = pvRadixSplit[1].replace(/0/g, opts.placeholder.charAt(0));
                                }
                                if (pvRadixSplit[0] === "0") {
                                    pvRadixSplit[0] = pvRadixSplit[0].replace(/0/g, opts.placeholder.charAt(0));
                                }
                                processValue = pvRadixSplit[0] + opts.radixPoint + pvRadixSplit[1] || "";
                                var bufferTemplate = maskset._buffer.join("");
                                if (processValue === opts.radixPoint) {
                                    processValue = bufferTemplate;
                                }
                                while (processValue.match(Inputmask.escapeRegex(bufferTemplate) + "$") === null) {
                                    bufferTemplate = bufferTemplate.slice(1);
                                }
                                processValue = processValue.replace(bufferTemplate, "");
                                processValue = processValue.split("");
                                if (processValue[pos] === undefined) {
                                    isValid = {
                                        pos: pos,
                                        remove: pos
                                    };
                                } else {
                                    isValid = {
                                        pos: pos
                                    };
                                }
                            }
                        } else if (!strict && chrs === opts.radixPoint && maskset.validPositions[pos - 1] === undefined) {
                            isValid = {
                                insert: {
                                    pos: pos,
                                    c: 0
                                },
                                pos: pos + 1
                            };
                        }
                        return isValid;
                    },
                    cardinality: 1
                },
                "+": {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        return opts.allowMinus && (chrs === "-" || chrs === opts.negationSymbol.front);
                    },
                    cardinality: 1,
                    placeholder: ""
                },
                "-": {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        return opts.allowMinus && chrs === opts.negationSymbol.back;
                    },
                    cardinality: 1,
                    placeholder: ""
                },
                ":": {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        var radix = "[" + Inputmask.escapeRegex(opts.radixPoint) + "]";
                        var isValid = new RegExp(radix).test(chrs);
                        if (isValid && maskset.validPositions[pos] && maskset.validPositions[pos].match.placeholder === opts.radixPoint) {
                            isValid = {
                                caret: pos + 1
                            };
                        }
                        return isValid;
                    },
                    cardinality: 1,
                    placeholder: function(opts) {
                        return opts.radixPoint;
                    }
                }
            },
            onUnMask: function(maskedValue, unmaskedValue, opts) {
                if (unmaskedValue === "" && opts.nullable === true) {
                    return unmaskedValue;
                }
                var processValue = maskedValue.replace(opts.prefix, "");
                processValue = processValue.replace(opts.suffix, "");
                processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
                if (opts.placeholder.charAt(0) !== "") {
                    processValue = processValue.replace(new RegExp(opts.placeholder.charAt(0), "g"), "0");
                }
                if (opts.unmaskAsNumber) {
                    if (opts.radixPoint !== "" && processValue.indexOf(opts.radixPoint) !== -1) processValue = processValue.replace(Inputmask.escapeRegex.call(this, opts.radixPoint), ".");
                    processValue = processValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-");
                    processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "");
                    return Number(processValue);
                }
                return processValue;
            },
            isComplete: function(buffer, opts) {
                var maskedValue = (opts.numericInput ? buffer.slice().reverse() : buffer).join("");
                maskedValue = maskedValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-");
                maskedValue = maskedValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "");
                maskedValue = maskedValue.replace(opts.prefix, "");
                maskedValue = maskedValue.replace(opts.suffix, "");
                maskedValue = maskedValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator) + "([0-9]{3})", "g"), "$1");
                if (opts.radixPoint === ",") maskedValue = maskedValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".");
                return isFinite(maskedValue);
            },
            onBeforeMask: function(initialValue, opts) {
                opts.isNegative = undefined;
                var radixPoint = opts.radixPoint || ",";
                if ((typeof initialValue == "number" || opts.inputType === "number") && radixPoint !== "") {
                    initialValue = initialValue.toString().replace(".", radixPoint);
                }
                var valueParts = initialValue.split(radixPoint), integerPart = valueParts[0].replace(/[^\-0-9]/g, ""), decimalPart = valueParts.length > 1 ? valueParts[1].replace(/[^0-9]/g, "") : "";
                initialValue = integerPart + (decimalPart !== "" ? radixPoint + decimalPart : decimalPart);
                var digits = 0;
                if (radixPoint !== "") {
                    digits = decimalPart.length;
                    if (decimalPart !== "") {
                        var digitsFactor = Math.pow(10, digits || 1);
                        if (isFinite(opts.digits)) {
                            digits = parseInt(opts.digits);
                            digitsFactor = Math.pow(10, digits);
                        }
                        initialValue = initialValue.replace(Inputmask.escapeRegex(radixPoint), ".");
                        if (isFinite(initialValue)) initialValue = Math.round(parseFloat(initialValue) * digitsFactor) / digitsFactor;
                        initialValue = initialValue.toString().replace(".", radixPoint);
                    }
                }
                if (opts.digits === 0 && initialValue.indexOf(Inputmask.escapeRegex(radixPoint)) !== -1) {
                    initialValue = initialValue.substring(0, initialValue.indexOf(Inputmask.escapeRegex(radixPoint)));
                }
                return alignDigits(initialValue.toString().split(""), digits, opts).join("");
            },
            onKeyDown: function(e, buffer, caretPos, opts) {
                var $input = $(this);
                if (e.ctrlKey) {
                    switch (e.keyCode) {
                      case Inputmask.keyCode.UP:
                        $input.val(parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step));
                        $input.trigger("setvalue");
                        break;

                      case Inputmask.keyCode.DOWN:
                        $input.val(parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step));
                        $input.trigger("setvalue");
                        break;
                    }
                }
            }
        },
        currency: {
            prefix: "$ ",
            groupSeparator: ",",
            alias: "numeric",
            placeholder: "0",
            autoGroup: true,
            digits: 2,
            digitsOptional: false,
            clearMaskOnLostFocus: false
        },
        decimal: {
            alias: "numeric"
        },
        integer: {
            alias: "numeric",
            digits: 0,
            radixPoint: ""
        },
        percentage: {
            alias: "numeric",
            digits: 2,
            digitsOptional: true,
            radixPoint: ".",
            placeholder: "0",
            autoGroup: false,
            min: 0,
            max: 100,
            suffix: " %",
            allowMinus: false
        }
    });
    return Inputmask;
});
});

var inputmask$1 = inputmask;

const MhPropMolecule = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        // Mask Input
        this.mask = '';
        this.calendarActive = false;
        this.calendarHourActive = false;
        this.label = '';
        this.disabled = false;
        this.placeholder = '';
        this.type = 'text';
        this.ngModelVar = '';
        this.sugestions = [];
        this.sugestionsCatergories = [];
        this.areResultscategorized = false;
        this.showError = false;
        // Form Properties
        this.isFormComponent = false;
        this.showAutoPopup = false;
        this.ext = '.svg';
        this.fullPath = '';
        this.fullPathR = '';
        this.fullPathError = '';
        this.modelNgsubtr = '';
        this.calendar = false;
        this.itemVisible = false;
        this.formController = {
            disabled: false,
            id: '',
            showAllErrors: false,
            validators: []
        };
        this.status = {
            currentValue: '',
            errors: [],
            isPristine: true,
            valid: false
        };
        this.emitDate = createEvent(this, "emitDate", 7);
        this.emitHour = createEvent(this, "emitHour", 7);
        this.checked = createEvent(this, "checkEvent", 7);
        this.update = createEvent(this, "update", 7);
        this.onFocus = createEvent(this, "onFocus", 7);
    }
    componentWillLoad() {
        if (this.isFormComponent) {
            this.status = validateInput(this.formController.validators, this.ngModelVar);
            this.status.isPristine = true;
        }
        if (this.showCustomError && this.errorText !== undefined) {
            this.getTextError();
            this.error = true;
        }
    }
    componentWillUpdate() {
        if (this.isFormComponent) {
            this.status = Object.assign(Object.assign({}, this.status), validateInput(this.formController.validators, this.ngModelVar));
        }
        if (this.showCustomError && this.errorText !== undefined) {
            this.getTextError();
            this.error = true;
        }
    }
    getTextError(error) {
        if (error === undefined) {
            this.formError = this.errorText;
        }
        else {
            this.formError = error;
        }
    }
    handleChange() {
        this.status = validateInput(this.formController.validators, this.ngModelVar);
        this.status.isPristine = false;
        if (this.status.errors.length > 0) {
            this.status.errors.map((error) => {
                this.getTextError(error);
                this.error = true;
            });
        }
        else {
            this.error = false;
            this.showCustomError = false;
        }
    }
    addMaskInput() {
        inputmask$1({
            mask: this.mask,
            groupmarker: { start: '&', end: '&' },
            showMaskOnHover: false,
            showMaskOnFocus: false,
            clearMaskOnLostFocus: true,
            hideMaskOnFocus: true,
            greedy: false,
            placeholder: '',
            oncomplete: () => (this.error = false),
            onchange: () => (this.error = false)
        }).mask(this.element);
    }
    handleInputChange(event) {
        this.ngModelVar = event.target.value;
        this.modelNgsubtr = event.target.value;
        this.update.emit(this.ngModelVar);
        this.setFilteredItems();
        if (this.isFormComponent) {
            this.handleChange();
        }
    }
    selectedChecked(event) {
        if (this.calendar === false) {
            this.calendar = true;
            this.checkDateError();
        }
        else if (this.calendar === true) {
            this.calendar = false;
        }
        this.checked.emit(event);
        this.itemVisible = false;
    }
    checkDateError() {
        this.error = false;
        if (this.calendarActive) {
            if (this.ngModelVar.length === 10) {
                let day = this.getDateFromCalendar(this.ngModelVar).day;
                let month = this.getDateFromCalendar(this.ngModelVar).month;
                let year = this.getDateFromCalendar(this.ngModelVar).year;
                let minday;
                let maxday;
                let minMonth;
                let maxMonth;
                let minYear;
                let maxYear;
                let countMin;
                let countMax;
                if (month <= 12 && month > 0) {
                    let numberOfMonth = new Date(year, month, 0).getDate();
                    if (day > 0 && day <= numberOfMonth) {
                        if (this.minDate !== undefined) {
                            minday = this.getDateFromCalendar(this.minDate).day;
                            minMonth = this.getDateFromCalendar(this.minDate).month;
                            minYear = this.getDateFromCalendar(this.minDate).year;
                            countMin = year - minYear;
                            if (countMin < 0)
                                countMin = 0;
                            if (countMin === 0) {
                                this.checkErrorMinDate(year, minYear, month, minMonth, countMin, day, minday);
                            }
                        }
                        if (this.maxDate !== undefined) {
                            maxday = this.getDateFromCalendar(this.maxDate).day;
                            maxMonth = this.getDateFromCalendar(this.maxDate).month;
                            maxYear = this.getDateFromCalendar(this.maxDate).year;
                            countMax = maxYear - year;
                            if (countMax < 0)
                                countMax = 0;
                            if (countMax === 0) {
                                this.checkErrorMaxDate(year, maxYear, month, maxMonth, countMax, day, maxday);
                            }
                        }
                    }
                    else {
                        this.setError('error.date');
                    }
                }
                else {
                    this.setError('error.date');
                }
            }
            else if (this.ngModelVar.length > 0 && this.ngModelVar.length < 10) {
                this.setError('error.minlength');
            }
            else {
                this.setError('error.required');
            }
        }
        else if (this.calendarHourActive) {
            if (this.ngModelVar.length === 5) {
                let hours = this.getHour(this.ngModelVar).hour;
                let minutes = this.getHour(this.ngModelVar).minute;
                if (hours >= 0 && hours < 24) {
                    if (this.minHour !== null && this.minHour !== undefined) {
                        let minhour = this.getHour(this.minHour).hour;
                        let minminute = this.getHour(this.minHour).minute;
                        if (this.minHour.length === 16 && this.setHour !== undefined && this.setHour !== null) {
                            let day = this.getDateFromCalendar(this.setHour).day;
                            let month = this.getDateFromCalendar(this.setHour).month;
                            let year = this.getDateFromCalendar(this.setHour).year;
                            if (day === this.getDateHour(this.minHour).day &&
                                month === this.getDateHour(this.minHour).month &&
                                year === this.getDateHour(this.minHour).year) {
                                this.checkErrorMinHour(hours, minhour, minutes, minminute);
                            }
                        }
                        else
                            this.checkErrorMinHour(hours, minhour, minutes, minminute);
                    }
                    if (this.maxHour !== null && this.maxHour !== undefined) {
                        let maxhour = this.getHour(this.maxHour).hour;
                        let maxminute = this.getHour(this.maxHour).minute;
                        if (this.maxHour.length === 16 && this.setHour !== undefined && this.setHour !== null) {
                            let day = this.getDateFromCalendar(this.setHour).day;
                            let month = this.getDateFromCalendar(this.setHour).month;
                            let year = this.getDateFromCalendar(this.setHour).year;
                            if (day === this.getDateHour(this.maxHour).day &&
                                month === this.getDateHour(this.maxHour).month &&
                                year === this.getDateHour(this.maxHour).year) {
                                this.checkErrorMaxHour(hours, maxhour, minutes, maxminute);
                            }
                        }
                        else
                            this.checkErrorMaxHour(hours, maxhour, minutes, maxminute);
                    }
                    if (this.hourDisabled.length > 0 && this.hourDisabled !== undefined) {
                        for (let i = 0; i < this.hourDisabled.length; i++) {
                            let day;
                            let month;
                            let year;
                            let hour = this.getHour(this.ngModelVar).hour;
                            let min = this.getHour(this.ngModelVar).minute;
                            if (this.setHour !== undefined && this.setHour !== null) {
                                day = this.getDateFromCalendar(this.setHour).day;
                                month = this.getDateFromCalendar(this.setHour).month;
                                year = this.getDateFromCalendar(this.setHour).year;
                            }
                            let hourString = this.hourDisabled[i];
                            let disablehour = this.getHour(hourString).hour;
                            let disableminute = this.getHour(hourString).minute;
                            if (this.hourDisabled[i].length === 5) {
                                if (disablehour === hour)
                                    this.checkDisabledHour(min, disableminute);
                            }
                            else if (this.hourDisabled[i].length === 16) {
                                if (day === this.getDateHour(hourString).day &&
                                    month === this.getDateHour(hourString).month &&
                                    year === this.getDateHour(hourString).year) {
                                    if (disablehour === hour)
                                        this.checkDisabledHour(min, disableminute);
                                }
                            }
                        }
                    }
                    if (minutes < 0 || minutes > 59) {
                        this.setError('error.minutes');
                    }
                }
                else
                    this.setError('error.hours');
            }
            else if (this.ngModelVar.length > 0 && this.ngModelVar.length < 5) {
                this.setError('error.minlength');
            }
            else {
                this.setError('error.required');
            }
        }
        this.checkErrorStatusHour();
    }
    getDateFromCalendar(date) {
        let dateObject = {
            day: Number(date.substring(0, 2)),
            month: Number(date.substring(3, 5)),
            year: Number(date.substring(6, 11))
        };
        return dateObject;
    }
    getHour(hour) {
        let hourObject = {
            hour: Number(hour.substring(0, 2)),
            minute: Number(hour.substring(3, 5))
        };
        return hourObject;
    }
    getDateHour(date) {
        let dateObject = {
            day: Number(date.substring(6, 8)),
            month: Number(date.substring(9, 11)),
            year: Number(date.substring(12, 16))
        };
        return dateObject;
    }
    checkErrorStatusHour() {
        if (this.error) {
            let todayDate = new Date();
            if (this.calendarActive) {
                let stringDate = todayDate.getDate() < 10 ? '0' + todayDate.getDate() : String(todayDate.getDate());
                let stringMonth = todayDate.getMonth() + 1 < 10 ? '0' + (todayDate.getMonth() + 1) : String(todayDate.getMonth() + 1);
                this.modelNgsubtr = `${stringDate}/${stringMonth}/${todayDate.getFullYear()}`;
            }
            else if (this.calendarHourActive) {
                let stringHours = todayDate.getHours() < 10 ? '0' + todayDate.getHours() : String(todayDate.getHours());
                let stringMinutes = todayDate.getMinutes() < 10 ? '0' + todayDate.getMinutes() : String(todayDate.getMinutes());
                this.modelNgsubtr = `${stringHours}:${stringMinutes}`;
            }
        }
        else {
            this.modelNgsubtr = this.ngModelVar;
        }
    }
    setError(text) {
        this.getTextError(text);
        this.error = true;
        if (this.calendarActive && this.calendarHourActive)
            this.modelNgsubtr = '';
    }
    checkErrorMinDate(year, minYear, month, minMonth, countMin, day, minday) {
        if (year >= minYear) {
            if (month >= minMonth && countMin === 0) {
                if (day < minday && month === minMonth)
                    this.setError('error.date');
            }
            else
                this.setError('error.date');
        }
        else
            this.setError('error.date');
    }
    checkErrorMaxDate(year, maxYear, month, maxMonth, countMax, day, maxday) {
        if (year <= maxYear) {
            if (month <= maxMonth && countMax === 0) {
                if (day > maxday && month === maxMonth)
                    this.setError('error.date');
            }
            else
                this.setError('error.date');
        }
        else
            this.setError('error.date');
    }
    checkErrorMinHour(hours, minhour, minutes, minminute) {
        if (hours >= minhour) {
            if (hours <= minhour && minutes < minminute) {
                this.setError('error.hours');
            }
        }
        else {
            this.setError('error.hours');
        }
    }
    checkErrorMaxHour(hours, maxhour, minutes, maxminute) {
        if (hours <= maxhour) {
            if (hours >= maxhour && minutes > maxminute) {
                this.setError('error.hours');
            }
        }
        else {
            this.setError('error.hours');
        }
    }
    checkDisabledHour(dMin, minute) {
        if (dMin >= minute && dMin < minute + 30) {
            this.setError('error.hours');
        }
    }
    setFilteredItems() {
        this.items = this.filterItems(this.sugestions, this.ngModelVar, this.maxlength);
        this.categorizedItems = this.filterCategorizedItems(this.sugestionsCatergories, this.ngModelVar, this.maxlength);
        if (this.ngModelVar !== '') {
            this.itemVisible = true;
        }
        else {
            this.itemVisible = false;
        }
    }
    itemSelected(item) {
        this.ngModelVar = item;
        this.setFilteredItems();
        this.itemVisible = false;
    }
    setSuggestionsVisibilityFalse(event) {
        if (event.isOutside) {
            this.itemVisible = false;
            this.calendar = false;
        }
    }
    filterCategorizedItems(categories, searchTerm, lengthMax) {
        let response = [];
        categories.forEach(category => {
            let filteredResults = this.filterItems(category.results, searchTerm, lengthMax);
            if (filteredResults.length > 0) {
                response.push({ categoryName: category.categoryName, results: filteredResults });
            }
        });
        return response;
    }
    filterItems(items, searchTerm, lengthMax) {
        return items.filter((item) => {
            if (item.length <= lengthMax) {
                return item.toLowerCase().lastIndexOf(searchTerm.toLowerCase(), item.length) > -1;
            }
            else {
                return false;
            }
        });
    }
    setHourDate(day, month, year) {
        if (month < 10) {
            if (day < 10)
                this.setHour = '0' + day + '/0' + month + '/' + year;
            else
                this.setHour = day + '/0' + month + '/' + year;
        }
        else {
            if (day < 10)
                this.setHour = '0' + day + '/' + month + '/' + year;
            else
                this.setHour = day + '/' + month + '/' + year;
        }
    }
    showDate(dateObject) {
        let e = dateObject.detail;
        if (e.hour !== undefined) {
            this.ngModelVar = e.hour;
            this.setHourDate(e.date[0].day, e.date[0].month, e.date[0].year);
        }
        else
            this.ngModelVar = e;
        this.modelNgsubtr = this.ngModelVar;
        if (e.length === 10)
            this.emitDate.emit(e);
        else if (e instanceof Object)
            this.emitHour.emit(e);
        this.calendar = false;
        this.error = false;
    }
    setDate(dateObject) {
        let ev = dateObject.detail;
        let minCheck = ev.minCheck;
        this.setHourDate(ev.day, ev.month, ev.year);
        let hours = Number(this.ngModelVar.substring(0, 2));
        let minutes = Number(this.ngModelVar.substring(3, 5));
        if (minutes >= 0 && minutes < 30)
            minutes = 0;
        else if (minutes >= 30 && minutes < 60)
            minutes = 30;
        if (this.minHour.length === 16) {
            let day = Number(this.minHour.substring(6, 8));
            let month = Number(this.minHour.substring(9, 11));
            let year = Number(this.minHour.substring(12, 16));
            let active = true;
            if (day === ev.day && month === ev.month && year === ev.year) {
                let i = 0;
                do {
                    if (hours === Number(minCheck[i].hour) &&
                        minutes === Number(minCheck[i].minute) &&
                        Number(minCheck[i].status)) {
                        this.setError('error.hours');
                        this.checkErrorStatusHour();
                        active = false;
                    }
                    i++;
                } while (active && i < minCheck.length);
            }
            else {
                this.error = false;
                this.checkErrorStatusHour();
            }
        }
    }
    selectedEvent(event) {
        if (!this.maskActive) {
            if (event !== '') {
                this.error = false;
            }
            else {
                this.error = true;
            }
        }
    }
    handleFocus(event) {
        this.ngModelVar = event.target.value;
        this.modelNgsubtr = event.target.value;
        this.onFocus.emit(this.ngModelVar);
    }
    render() {
        const paddingClass = {
            'box-padding': this.padding,
            'no-padding': !this.padding
        };
        const labelClass = {
            'label': true,
        };
        const containerBox = {
            'containerBox row': true
        };
        const description = {
            'description': true
        };
        const inputClass = {
            'input-field': true
        };
        return (h("div", { class: paddingClass, style: { 'box-sizing': 'border-box' } }, h("div", null, this.label && h("p", { class: labelClass }, this.label)), h("div", { style: { position: 'relative' } }, h("div", { class: containerBox }, h("input", { class: inputClass, type: this.type, placeholder: this.placeholder, value: this.ngModelVar, maxLength: this.maxlength, ref: (el) => {
                this.element = el;
                if (this.maskActive) {
                    this.addMaskInput();
                }
            }, onInput: (event) => this.handleInputChange(event), onBlur: () => {
                this.handleChange();
                if (this.calendarActive || this.calendarHourActive)
                    this.checkDateError();
            }, onChange: (event) => this.selectedEvent(event), onFocus: (event) => this.handleFocus(event) })), this.instructionText && (h("div", null, !this.error && (h("div", { class: description }, h("span", null, this.instructionText))))), this.error && this.errorText !== undefined && !this.calendar && (h("div", { class: 'error' }, h("span", null, this.formError))))));
    }
    static get style() { return "\@charset \"UTF-8\";\nhtml,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\n\nbody {\n  line-height: 1;\n}\n\nol,\nul {\n  list-style: none;\n}\n\nblockquote,\nq {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after {\n  content: \"\";\n  content: none;\n}\n\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n.ion-ios-add:before {\n  content: \"\";\n}\n\n.ion-ios-add-circle:before {\n  content: \"\";\n}\n\n.ion-ios-add-circle-outline:before {\n  content: \"\";\n}\n\n.ion-ios-airplane:before {\n  content: \"\";\n}\n\n.ion-ios-alarm:before {\n  content: \"\";\n}\n\n.ion-ios-albums:before {\n  content: \"\";\n}\n\n.ion-ios-alert:before {\n  content: \"\";\n}\n\n.ion-ios-american-football:before {\n  content: \"\";\n}\n\n.ion-ios-analytics:before {\n  content: \"\";\n}\n\n.ion-ios-aperture:before {\n  content: \"\";\n}\n\n.ion-ios-apps:before {\n  content: \"\";\n}\n\n.ion-ios-appstore:before {\n  content: \"\";\n}\n\n.ion-ios-archive:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-back:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-down:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-dropdown:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-dropdown-circle:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-dropleft:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-dropleft-circle:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-dropright:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-dropright-circle:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-dropup:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-dropup-circle:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-forward:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-round-back:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-round-down:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-round-forward:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-round-up:before {\n  content: \"\";\n}\n\n.ion-ios-arrow-up:before {\n  content: \"\";\n}\n\n.ion-ios-at:before {\n  content: \"\";\n}\n\n.ion-ios-attach:before {\n  content: \"\";\n}\n\n.ion-ios-backspace:before {\n  content: \"\";\n}\n\n.ion-ios-barcode:before {\n  content: \"\";\n}\n\n.ion-ios-baseball:before {\n  content: \"\";\n}\n\n.ion-ios-basket:before {\n  content: \"\";\n}\n\n.ion-ios-basketball:before {\n  content: \"\";\n}\n\n.ion-ios-battery-charging:before {\n  content: \"\";\n}\n\n.ion-ios-battery-dead:before {\n  content: \"\";\n}\n\n.ion-ios-battery-full:before {\n  content: \"\";\n}\n\n.ion-ios-beaker:before {\n  content: \"\";\n}\n\n.ion-ios-bed:before {\n  content: \"\";\n}\n\n.ion-ios-beer:before {\n  content: \"\";\n}\n\n.ion-ios-bicycle:before {\n  content: \"\";\n}\n\n.ion-ios-bluetooth:before {\n  content: \"\";\n}\n\n.ion-ios-boat:before {\n  content: \"\";\n}\n\n.ion-ios-body:before {\n  content: \"\";\n}\n\n.ion-ios-bonfire:before {\n  content: \"\";\n}\n\n.ion-ios-book:before {\n  content: \"\";\n}\n\n.ion-ios-bookmark:before {\n  content: \"\";\n}\n\n.ion-ios-bookmarks:before {\n  content: \"\";\n}\n\n.ion-ios-bowtie:before {\n  content: \"\";\n}\n\n.ion-ios-briefcase:before {\n  content: \"\";\n}\n\n.ion-ios-browsers:before {\n  content: \"\";\n}\n\n.ion-ios-brush:before {\n  content: \"\";\n}\n\n.ion-ios-bug:before {\n  content: \"\";\n}\n\n.ion-ios-build:before {\n  content: \"\";\n}\n\n.ion-ios-bulb:before {\n  content: \"\";\n}\n\n.ion-ios-bus:before {\n  content: \"\";\n}\n\n.ion-ios-business:before {\n  content: \"\";\n}\n\n.ion-ios-cafe:before {\n  content: \"\";\n}\n\n.ion-ios-calculator:before {\n  content: \"\";\n}\n\n.ion-ios-calendar:before {\n  content: \"\";\n}\n\n.ion-ios-call:before {\n  content: \"\";\n}\n\n.ion-ios-camera:before {\n  content: \"\";\n}\n\n.ion-ios-car:before {\n  content: \"\";\n}\n\n.ion-ios-card:before {\n  content: \"\";\n}\n\n.ion-ios-cart:before {\n  content: \"\";\n}\n\n.ion-ios-cash:before {\n  content: \"\";\n}\n\n.ion-ios-cellular:before {\n  content: \"\";\n}\n\n.ion-ios-chatboxes:before {\n  content: \"\";\n}\n\n.ion-ios-chatbubbles:before {\n  content: \"\";\n}\n\n.ion-ios-checkbox:before {\n  content: \"\";\n}\n\n.ion-ios-checkbox-outline:before {\n  content: \"\";\n}\n\n.ion-ios-checkmark:before {\n  content: \"\";\n}\n\n.ion-ios-checkmark-circle:before {\n  content: \"\";\n}\n\n.ion-ios-checkmark-circle-outline:before {\n  content: \"\";\n}\n\n.ion-ios-clipboard:before {\n  content: \"\";\n}\n\n.ion-ios-clock:before {\n  content: \"\";\n}\n\n.ion-ios-close:before {\n  content: \"\";\n}\n\n.ion-ios-close-circle:before {\n  content: \"\";\n}\n\n.ion-ios-close-circle-outline:before {\n  content: \"\";\n}\n\n.ion-ios-cloud:before {\n  content: \"\";\n}\n\n.ion-ios-cloud-circle:before {\n  content: \"\";\n}\n\n.ion-ios-cloud-done:before {\n  content: \"\";\n}\n\n.ion-ios-cloud-download:before {\n  content: \"\";\n}\n\n.ion-ios-cloud-outline:before {\n  content: \"\";\n}\n\n.ion-ios-cloud-upload:before {\n  content: \"\";\n}\n\n.ion-ios-cloudy:before {\n  content: \"\";\n}\n\n.ion-ios-cloudy-night:before {\n  content: \"\";\n}\n\n.ion-ios-code:before {\n  content: \"\";\n}\n\n.ion-ios-code-download:before {\n  content: \"\";\n}\n\n.ion-ios-code-working:before {\n  content: \"\";\n}\n\n.ion-ios-cog:before {\n  content: \"\";\n}\n\n.ion-ios-color-fill:before {\n  content: \"\";\n}\n\n.ion-ios-color-filter:before {\n  content: \"\";\n}\n\n.ion-ios-color-palette:before {\n  content: \"\";\n}\n\n.ion-ios-color-wand:before {\n  content: \"\";\n}\n\n.ion-ios-compass:before {\n  content: \"\";\n}\n\n.ion-ios-construct:before {\n  content: \"\";\n}\n\n.ion-ios-contact:before {\n  content: \"\";\n}\n\n.ion-ios-contacts:before {\n  content: \"\";\n}\n\n.ion-ios-contract:before {\n  content: \"\";\n}\n\n.ion-ios-contrast:before {\n  content: \"\";\n}\n\n.ion-ios-copy:before {\n  content: \"\";\n}\n\n.ion-ios-create:before {\n  content: \"\";\n}\n\n.ion-ios-crop:before {\n  content: \"\";\n}\n\n.ion-ios-cube:before {\n  content: \"\";\n}\n\n.ion-ios-cut:before {\n  content: \"\";\n}\n\n.ion-ios-desktop:before {\n  content: \"\";\n}\n\n.ion-ios-disc:before {\n  content: \"\";\n}\n\n.ion-ios-document:before {\n  content: \"\";\n}\n\n.ion-ios-done-all:before {\n  content: \"\";\n}\n\n.ion-ios-download:before {\n  content: \"\";\n}\n\n.ion-ios-easel:before {\n  content: \"\";\n}\n\n.ion-ios-egg:before {\n  content: \"\";\n}\n\n.ion-ios-exit:before {\n  content: \"\";\n}\n\n.ion-ios-expand:before {\n  content: \"\";\n}\n\n.ion-ios-eye:before {\n  content: \"\";\n}\n\n.ion-ios-eye-off:before {\n  content: \"\";\n}\n\n.ion-ios-fastforward:before {\n  content: \"\";\n}\n\n.ion-ios-female:before {\n  content: \"\";\n}\n\n.ion-ios-filing:before {\n  content: \"\";\n}\n\n.ion-ios-film:before {\n  content: \"\";\n}\n\n.ion-ios-finger-print:before {\n  content: \"\";\n}\n\n.ion-ios-fitness:before {\n  content: \"\";\n}\n\n.ion-ios-flag:before {\n  content: \"\";\n}\n\n.ion-ios-flame:before {\n  content: \"\";\n}\n\n.ion-ios-flash:before {\n  content: \"\";\n}\n\n.ion-ios-flash-off:before {\n  content: \"\";\n}\n\n.ion-ios-flashlight:before {\n  content: \"\";\n}\n\n.ion-ios-flask:before {\n  content: \"\";\n}\n\n.ion-ios-flower:before {\n  content: \"\";\n}\n\n.ion-ios-folder:before {\n  content: \"\";\n}\n\n.ion-ios-folder-open:before {\n  content: \"\";\n}\n\n.ion-ios-football:before {\n  content: \"\";\n}\n\n.ion-ios-funnel:before {\n  content: \"\";\n}\n\n.ion-ios-gift:before {\n  content: \"\";\n}\n\n.ion-ios-git-branch:before {\n  content: \"\";\n}\n\n.ion-ios-git-commit:before {\n  content: \"\";\n}\n\n.ion-ios-git-compare:before {\n  content: \"\";\n}\n\n.ion-ios-git-merge:before {\n  content: \"\";\n}\n\n.ion-ios-git-network:before {\n  content: \"\";\n}\n\n.ion-ios-git-pull-request:before {\n  content: \"\";\n}\n\n.ion-ios-glasses:before {\n  content: \"\";\n}\n\n.ion-ios-globe:before {\n  content: \"\";\n}\n\n.ion-ios-grid:before {\n  content: \"\";\n}\n\n.ion-ios-hammer:before {\n  content: \"\";\n}\n\n.ion-ios-hand:before {\n  content: \"\";\n}\n\n.ion-ios-happy:before {\n  content: \"\";\n}\n\n.ion-ios-headset:before {\n  content: \"\";\n}\n\n.ion-ios-heart:before {\n  content: \"\";\n}\n\n.ion-ios-heart-dislike:before {\n  content: \"\";\n}\n\n.ion-ios-heart-empty:before {\n  content: \"\";\n}\n\n.ion-ios-heart-half:before {\n  content: \"\";\n}\n\n.ion-ios-help:before {\n  content: \"\";\n}\n\n.ion-ios-help-buoy:before {\n  content: \"\";\n}\n\n.ion-ios-help-circle:before {\n  content: \"\";\n}\n\n.ion-ios-help-circle-outline:before {\n  content: \"\";\n}\n\n.ion-ios-home:before {\n  content: \"\";\n}\n\n.ion-ios-hourglass:before {\n  content: \"\";\n}\n\n.ion-ios-ice-cream:before {\n  content: \"\";\n}\n\n.ion-ios-image:before {\n  content: \"\";\n}\n\n.ion-ios-images:before {\n  content: \"\";\n}\n\n.ion-ios-infinite:before {\n  content: \"\";\n}\n\n.ion-ios-information:before {\n  content: \"\";\n}\n\n.ion-ios-information-circle:before {\n  content: \"\";\n}\n\n.ion-ios-information-circle-outline:before {\n  content: \"\";\n}\n\n.ion-ios-jet:before {\n  content: \"\";\n}\n\n.ion-ios-journal:before {\n  content: \"\";\n}\n\n.ion-ios-key:before {\n  content: \"\";\n}\n\n.ion-ios-keypad:before {\n  content: \"\";\n}\n\n.ion-ios-laptop:before {\n  content: \"\";\n}\n\n.ion-ios-leaf:before {\n  content: \"\";\n}\n\n.ion-ios-link:before {\n  content: \"\";\n}\n\n.ion-ios-list:before {\n  content: \"\";\n}\n\n.ion-ios-list-box:before {\n  content: \"\";\n}\n\n.ion-ios-locate:before {\n  content: \"\";\n}\n\n.ion-ios-lock:before {\n  content: \"\";\n}\n\n.ion-ios-log-in:before {\n  content: \"\";\n}\n\n.ion-ios-log-out:before {\n  content: \"\";\n}\n\n.ion-ios-magnet:before {\n  content: \"\";\n}\n\n.ion-ios-mail:before {\n  content: \"\";\n}\n\n.ion-ios-mail-open:before {\n  content: \"\";\n}\n\n.ion-ios-mail-unread:before {\n  content: \"\";\n}\n\n.ion-ios-male:before {\n  content: \"\";\n}\n\n.ion-ios-man:before {\n  content: \"\";\n}\n\n.ion-ios-map:before {\n  content: \"\";\n}\n\n.ion-ios-medal:before {\n  content: \"\";\n}\n\n.ion-ios-medical:before {\n  content: \"\";\n}\n\n.ion-ios-medkit:before {\n  content: \"\";\n}\n\n.ion-ios-megaphone:before {\n  content: \"\";\n}\n\n.ion-ios-menu:before {\n  content: \"\";\n}\n\n.ion-ios-mic:before {\n  content: \"\";\n}\n\n.ion-ios-mic-off:before {\n  content: \"\";\n}\n\n.ion-ios-microphone:before {\n  content: \"\";\n}\n\n.ion-ios-moon:before {\n  content: \"\";\n}\n\n.ion-ios-more:before {\n  content: \"\";\n}\n\n.ion-ios-move:before {\n  content: \"\";\n}\n\n.ion-ios-musical-note:before {\n  content: \"\";\n}\n\n.ion-ios-musical-notes:before {\n  content: \"\";\n}\n\n.ion-ios-navigate:before {\n  content: \"\";\n}\n\n.ion-ios-notifications:before {\n  content: \"\";\n}\n\n.ion-ios-notifications-off:before {\n  content: \"\";\n}\n\n.ion-ios-notifications-outline:before {\n  content: \"\";\n}\n\n.ion-ios-nuclear:before {\n  content: \"\";\n}\n\n.ion-ios-nutrition:before {\n  content: \"\";\n}\n\n.ion-ios-open:before {\n  content: \"\";\n}\n\n.ion-ios-options:before {\n  content: \"\";\n}\n\n.ion-ios-outlet:before {\n  content: \"\";\n}\n\n.ion-ios-paper:before {\n  content: \"\";\n}\n\n.ion-ios-paper-plane:before {\n  content: \"\";\n}\n\n.ion-ios-partly-sunny:before {\n  content: \"\";\n}\n\n.ion-ios-pause:before {\n  content: \"\";\n}\n\n.ion-ios-paw:before {\n  content: \"\";\n}\n\n.ion-ios-people:before {\n  content: \"\";\n}\n\n.ion-ios-person:before {\n  content: \"\";\n}\n\n.ion-ios-person-add:before {\n  content: \"\";\n}\n\n.ion-ios-phone-landscape:before {\n  content: \"\";\n}\n\n.ion-ios-phone-portrait:before {\n  content: \"\";\n}\n\n.ion-ios-photos:before {\n  content: \"\";\n}\n\n.ion-ios-pie:before {\n  content: \"\";\n}\n\n.ion-ios-pin:before {\n  content: \"\";\n}\n\n.ion-ios-pint:before {\n  content: \"\";\n}\n\n.ion-ios-pizza:before {\n  content: \"\";\n}\n\n.ion-ios-planet:before {\n  content: \"\";\n}\n\n.ion-ios-play:before {\n  content: \"\";\n}\n\n.ion-ios-play-circle:before {\n  content: \"\";\n}\n\n.ion-ios-podium:before {\n  content: \"\";\n}\n\n.ion-ios-power:before {\n  content: \"\";\n}\n\n.ion-ios-pricetag:before {\n  content: \"\";\n}\n\n.ion-ios-pricetags:before {\n  content: \"\";\n}\n\n.ion-ios-print:before {\n  content: \"\";\n}\n\n.ion-ios-pulse:before {\n  content: \"\";\n}\n\n.ion-ios-qr-scanner:before {\n  content: \"\";\n}\n\n.ion-ios-quote:before {\n  content: \"\";\n}\n\n.ion-ios-radio:before {\n  content: \"\";\n}\n\n.ion-ios-radio-button-off:before {\n  content: \"\";\n}\n\n.ion-ios-radio-button-on:before {\n  content: \"\";\n}\n\n.ion-ios-rainy:before {\n  content: \"\";\n}\n\n.ion-ios-recording:before {\n  content: \"\";\n}\n\n.ion-ios-redo:before {\n  content: \"\";\n}\n\n.ion-ios-refresh:before {\n  content: \"\";\n}\n\n.ion-ios-refresh-circle:before {\n  content: \"\";\n}\n\n.ion-ios-remove:before {\n  content: \"\";\n}\n\n.ion-ios-remove-circle:before {\n  content: \"\";\n}\n\n.ion-ios-remove-circle-outline:before {\n  content: \"\";\n}\n\n.ion-ios-reorder:before {\n  content: \"\";\n}\n\n.ion-ios-repeat:before {\n  content: \"\";\n}\n\n.ion-ios-resize:before {\n  content: \"\";\n}\n\n.ion-ios-restaurant:before {\n  content: \"\";\n}\n\n.ion-ios-return-left:before {\n  content: \"\";\n}\n\n.ion-ios-return-right:before {\n  content: \"\";\n}\n\n.ion-ios-reverse-camera:before {\n  content: \"\";\n}\n\n.ion-ios-rewind:before {\n  content: \"\";\n}\n\n.ion-ios-ribbon:before {\n  content: \"\";\n}\n\n.ion-ios-rocket:before {\n  content: \"\";\n}\n\n.ion-ios-rose:before {\n  content: \"\";\n}\n\n.ion-ios-sad:before {\n  content: \"\";\n}\n\n.ion-ios-save:before {\n  content: \"\";\n}\n\n.ion-ios-school:before {\n  content: \"\";\n}\n\n.ion-ios-search:before {\n  content: \"\";\n}\n\n.ion-ios-send:before {\n  content: \"\";\n}\n\n.ion-ios-settings:before {\n  content: \"\";\n}\n\n.ion-ios-share:before {\n  content: \"\";\n}\n\n.ion-ios-share-alt:before {\n  content: \"\";\n}\n\n.ion-ios-shirt:before {\n  content: \"\";\n}\n\n.ion-ios-shuffle:before {\n  content: \"\";\n}\n\n.ion-ios-skip-backward:before {\n  content: \"\";\n}\n\n.ion-ios-skip-forward:before {\n  content: \"\";\n}\n\n.ion-ios-snow:before {\n  content: \"\";\n}\n\n.ion-ios-speedometer:before {\n  content: \"\";\n}\n\n.ion-ios-square:before {\n  content: \"\";\n}\n\n.ion-ios-square-outline:before {\n  content: \"\";\n}\n\n.ion-ios-star:before {\n  content: \"\";\n}\n\n.ion-ios-star-half:before {\n  content: \"\";\n}\n\n.ion-ios-star-outline:before {\n  content: \"\";\n}\n\n.ion-ios-stats:before {\n  content: \"\";\n}\n\n.ion-ios-stopwatch:before {\n  content: \"\";\n}\n\n.ion-ios-subway:before {\n  content: \"\";\n}\n\n.ion-ios-sunny:before {\n  content: \"\";\n}\n\n.ion-ios-swap:before {\n  content: \"\";\n}\n\n.ion-ios-switch:before {\n  content: \"\";\n}\n\n.ion-ios-sync:before {\n  content: \"\";\n}\n\n.ion-ios-tablet-landscape:before {\n  content: \"\";\n}\n\n.ion-ios-tablet-portrait:before {\n  content: \"\";\n}\n\n.ion-ios-tennisball:before {\n  content: \"\";\n}\n\n.ion-ios-text:before {\n  content: \"\";\n}\n\n.ion-ios-thermometer:before {\n  content: \"\";\n}\n\n.ion-ios-thumbs-down:before {\n  content: \"\";\n}\n\n.ion-ios-thumbs-up:before {\n  content: \"\";\n}\n\n.ion-ios-thunderstorm:before {\n  content: \"\";\n}\n\n.ion-ios-time:before {\n  content: \"\";\n}\n\n.ion-ios-timer:before {\n  content: \"\";\n}\n\n.ion-ios-today:before {\n  content: \"\";\n}\n\n.ion-ios-train:before {\n  content: \"\";\n}\n\n.ion-ios-transgender:before {\n  content: \"\";\n}\n\n.ion-ios-trash:before {\n  content: \"\";\n}\n\n.ion-ios-trending-down:before {\n  content: \"\";\n}\n\n.ion-ios-trending-up:before {\n  content: \"\";\n}\n\n.ion-ios-trophy:before {\n  content: \"\";\n}\n\n.ion-ios-tv:before {\n  content: \"\";\n}\n\n.ion-ios-umbrella:before {\n  content: \"\";\n}\n\n.ion-ios-undo:before {\n  content: \"\";\n}\n\n.ion-ios-unlock:before {\n  content: \"\";\n}\n\n.ion-ios-videocam:before {\n  content: \"\";\n}\n\n.ion-ios-volume-high:before {\n  content: \"\";\n}\n\n.ion-ios-volume-low:before {\n  content: \"\";\n}\n\n.ion-ios-volume-mute:before {\n  content: \"\";\n}\n\n.ion-ios-volume-off:before {\n  content: \"\";\n}\n\n.ion-ios-walk:before {\n  content: \"\";\n}\n\n.ion-ios-wallet:before {\n  content: \"\";\n}\n\n.ion-ios-warning:before {\n  content: \"\";\n}\n\n.ion-ios-watch:before {\n  content: \"\";\n}\n\n.ion-ios-water:before {\n  content: \"\";\n}\n\n.ion-ios-wifi:before {\n  content: \"\";\n}\n\n.ion-ios-wine:before {\n  content: \"\";\n}\n\n.ion-ios-woman:before {\n  content: \"\";\n}\n\n.ion-logo-android:before {\n  content: \"\";\n}\n\n.ion-logo-angular:before {\n  content: \"\";\n}\n\n.ion-logo-apple:before {\n  content: \"\";\n}\n\n.ion-logo-bitbucket:before {\n  content: \"\";\n}\n\n.ion-logo-bitcoin:before {\n  content: \"\";\n}\n\n.ion-logo-buffer:before {\n  content: \"\";\n}\n\n.ion-logo-chrome:before {\n  content: \"\";\n}\n\n.ion-logo-closed-captioning:before {\n  content: \"\";\n}\n\n.ion-logo-codepen:before {\n  content: \"\";\n}\n\n.ion-logo-css3:before {\n  content: \"\";\n}\n\n.ion-logo-designernews:before {\n  content: \"\";\n}\n\n.ion-logo-dribbble:before {\n  content: \"\";\n}\n\n.ion-logo-dropbox:before {\n  content: \"\";\n}\n\n.ion-logo-euro:before {\n  content: \"\";\n}\n\n.ion-logo-facebook:before {\n  content: \"\";\n}\n\n.ion-logo-flickr:before {\n  content: \"\";\n}\n\n.ion-logo-foursquare:before {\n  content: \"\";\n}\n\n.ion-logo-freebsd-devil:before {\n  content: \"\";\n}\n\n.ion-logo-game-controller-a:before {\n  content: \"\";\n}\n\n.ion-logo-game-controller-b:before {\n  content: \"\";\n}\n\n.ion-logo-github:before {\n  content: \"\";\n}\n\n.ion-logo-google:before {\n  content: \"\";\n}\n\n.ion-logo-googleplus:before {\n  content: \"\";\n}\n\n.ion-logo-hackernews:before {\n  content: \"\";\n}\n\n.ion-logo-html5:before {\n  content: \"\";\n}\n\n.ion-logo-instagram:before {\n  content: \"\";\n}\n\n.ion-logo-ionic:before {\n  content: \"\";\n}\n\n.ion-logo-ionitron:before {\n  content: \"\";\n}\n\n.ion-logo-javascript:before {\n  content: \"\";\n}\n\n.ion-logo-linkedin:before {\n  content: \"\";\n}\n\n.ion-logo-markdown:before {\n  content: \"\";\n}\n\n.ion-logo-model-s:before {\n  content: \"\";\n}\n\n.ion-logo-no-smoking:before {\n  content: \"\";\n}\n\n.ion-logo-nodejs:before {\n  content: \"\";\n}\n\n.ion-logo-npm:before {\n  content: \"\";\n}\n\n.ion-logo-octocat:before {\n  content: \"\";\n}\n\n.ion-logo-pinterest:before {\n  content: \"\";\n}\n\n.ion-logo-playstation:before {\n  content: \"\";\n}\n\n.ion-logo-polymer:before {\n  content: \"\";\n}\n\n.ion-logo-python:before {\n  content: \"\";\n}\n\n.ion-logo-reddit:before {\n  content: \"\";\n}\n\n.ion-logo-rss:before {\n  content: \"\";\n}\n\n.ion-logo-sass:before {\n  content: \"\";\n}\n\n.ion-logo-skype:before {\n  content: \"\";\n}\n\n.ion-logo-slack:before {\n  content: \"\";\n}\n\n.ion-logo-snapchat:before {\n  content: \"\";\n}\n\n.ion-logo-steam:before {\n  content: \"\";\n}\n\n.ion-logo-tumblr:before {\n  content: \"\";\n}\n\n.ion-logo-tux:before {\n  content: \"\";\n}\n\n.ion-logo-twitch:before {\n  content: \"\";\n}\n\n.ion-logo-twitter:before {\n  content: \"\";\n}\n\n.ion-logo-usd:before {\n  content: \"\";\n}\n\n.ion-logo-vimeo:before {\n  content: \"\";\n}\n\n.ion-logo-vk:before {\n  content: \"\";\n}\n\n.ion-logo-whatsapp:before {\n  content: \"\";\n}\n\n.ion-logo-windows:before {\n  content: \"\";\n}\n\n.ion-logo-wordpress:before {\n  content: \"\";\n}\n\n.ion-logo-xbox:before {\n  content: \"\";\n}\n\n.ion-logo-xing:before {\n  content: \"\";\n}\n\n.ion-logo-yahoo:before {\n  content: \"\";\n}\n\n.ion-logo-yen:before {\n  content: \"\";\n}\n\n.ion-logo-youtube:before {\n  content: \"\";\n}\n\n.ion-md-add:before {\n  content: \"\";\n}\n\n.ion-md-add-circle:before {\n  content: \"\";\n}\n\n.ion-md-add-circle-outline:before {\n  content: \"\";\n}\n\n.ion-md-airplane:before {\n  content: \"\";\n}\n\n.ion-md-alarm:before {\n  content: \"\";\n}\n\n.ion-md-albums:before {\n  content: \"\";\n}\n\n.ion-md-alert:before {\n  content: \"\";\n}\n\n.ion-md-american-football:before {\n  content: \"\";\n}\n\n.ion-md-analytics:before {\n  content: \"\";\n}\n\n.ion-md-aperture:before {\n  content: \"\";\n}\n\n.ion-md-apps:before {\n  content: \"\";\n}\n\n.ion-md-appstore:before {\n  content: \"\";\n}\n\n.ion-md-archive:before {\n  content: \"\";\n}\n\n.ion-md-arrow-back:before {\n  content: \"\";\n}\n\n.ion-md-arrow-down:before {\n  content: \"\";\n}\n\n.ion-md-arrow-dropdown:before {\n  content: \"\";\n}\n\n.ion-md-arrow-dropdown-circle:before {\n  content: \"\";\n}\n\n.ion-md-arrow-dropleft:before {\n  content: \"\";\n}\n\n.ion-md-arrow-dropleft-circle:before {\n  content: \"\";\n}\n\n.ion-md-arrow-dropright:before {\n  content: \"\";\n}\n\n.ion-md-arrow-dropright-circle:before {\n  content: \"\";\n}\n\n.ion-md-arrow-dropup:before {\n  content: \"\";\n}\n\n.ion-md-arrow-dropup-circle:before {\n  content: \"\";\n}\n\n.ion-md-arrow-forward:before {\n  content: \"\";\n}\n\n.ion-md-arrow-round-back:before {\n  content: \"\";\n}\n\n.ion-md-arrow-round-down:before {\n  content: \"\";\n}\n\n.ion-md-arrow-round-forward:before {\n  content: \"\";\n}\n\n.ion-md-arrow-round-up:before {\n  content: \"\";\n}\n\n.ion-md-arrow-up:before {\n  content: \"\";\n}\n\n.ion-md-at:before {\n  content: \"\";\n}\n\n.ion-md-attach:before {\n  content: \"\";\n}\n\n.ion-md-backspace:before {\n  content: \"\";\n}\n\n.ion-md-barcode:before {\n  content: \"\";\n}\n\n.ion-md-baseball:before {\n  content: \"\";\n}\n\n.ion-md-basket:before {\n  content: \"\";\n}\n\n.ion-md-basketball:before {\n  content: \"\";\n}\n\n.ion-md-battery-charging:before {\n  content: \"\";\n}\n\n.ion-md-battery-dead:before {\n  content: \"\";\n}\n\n.ion-md-battery-full:before {\n  content: \"\";\n}\n\n.ion-md-beaker:before {\n  content: \"\";\n}\n\n.ion-md-bed:before {\n  content: \"\";\n}\n\n.ion-md-beer:before {\n  content: \"\";\n}\n\n.ion-md-bicycle:before {\n  content: \"\";\n}\n\n.ion-md-bluetooth:before {\n  content: \"\";\n}\n\n.ion-md-boat:before {\n  content: \"\";\n}\n\n.ion-md-body:before {\n  content: \"\";\n}\n\n.ion-md-bonfire:before {\n  content: \"\";\n}\n\n.ion-md-book:before {\n  content: \"\";\n}\n\n.ion-md-bookmark:before {\n  content: \"\";\n}\n\n.ion-md-bookmarks:before {\n  content: \"\";\n}\n\n.ion-md-bowtie:before {\n  content: \"\";\n}\n\n.ion-md-briefcase:before {\n  content: \"\";\n}\n\n.ion-md-browsers:before {\n  content: \"\";\n}\n\n.ion-md-brush:before {\n  content: \"\";\n}\n\n.ion-md-bug:before {\n  content: \"\";\n}\n\n.ion-md-build:before {\n  content: \"\";\n}\n\n.ion-md-bulb:before {\n  content: \"\";\n}\n\n.ion-md-bus:before {\n  content: \"\";\n}\n\n.ion-md-business:before {\n  content: \"\";\n}\n\n.ion-md-cafe:before {\n  content: \"\";\n}\n\n.ion-md-calculator:before {\n  content: \"\";\n}\n\n.ion-md-calendar:before {\n  content: \"\";\n}\n\n.ion-md-call:before {\n  content: \"\";\n}\n\n.ion-md-camera:before {\n  content: \"\";\n}\n\n.ion-md-car:before {\n  content: \"\";\n}\n\n.ion-md-card:before {\n  content: \"\";\n}\n\n.ion-md-cart:before {\n  content: \"\";\n}\n\n.ion-md-cash:before {\n  content: \"\";\n}\n\n.ion-md-cellular:before {\n  content: \"\";\n}\n\n.ion-md-chatboxes:before {\n  content: \"\";\n}\n\n.ion-md-chatbubbles:before {\n  content: \"\";\n}\n\n.ion-md-checkbox:before {\n  content: \"\";\n}\n\n.ion-md-checkbox-outline:before {\n  content: \"\";\n}\n\n.ion-md-checkmark:before {\n  content: \"\";\n}\n\n.ion-md-checkmark-circle:before {\n  content: \"\";\n}\n\n.ion-md-checkmark-circle-outline:before {\n  content: \"\";\n}\n\n.ion-md-clipboard:before {\n  content: \"\";\n}\n\n.ion-md-clock:before {\n  content: \"\";\n}\n\n.ion-md-close:before {\n  content: \"\";\n}\n\n.ion-md-close-circle:before {\n  content: \"\";\n}\n\n.ion-md-close-circle-outline:before {\n  content: \"\";\n}\n\n.ion-md-cloud:before {\n  content: \"\";\n}\n\n.ion-md-cloud-circle:before {\n  content: \"\";\n}\n\n.ion-md-cloud-done:before {\n  content: \"\";\n}\n\n.ion-md-cloud-download:before {\n  content: \"\";\n}\n\n.ion-md-cloud-outline:before {\n  content: \"\";\n}\n\n.ion-md-cloud-upload:before {\n  content: \"\";\n}\n\n.ion-md-cloudy:before {\n  content: \"\";\n}\n\n.ion-md-cloudy-night:before {\n  content: \"\";\n}\n\n.ion-md-code:before {\n  content: \"\";\n}\n\n.ion-md-code-download:before {\n  content: \"\";\n}\n\n.ion-md-code-working:before {\n  content: \"\";\n}\n\n.ion-md-cog:before {\n  content: \"\";\n}\n\n.ion-md-color-fill:before {\n  content: \"\";\n}\n\n.ion-md-color-filter:before {\n  content: \"\";\n}\n\n.ion-md-color-palette:before {\n  content: \"\";\n}\n\n.ion-md-color-wand:before {\n  content: \"\";\n}\n\n.ion-md-compass:before {\n  content: \"\";\n}\n\n.ion-md-construct:before {\n  content: \"\";\n}\n\n.ion-md-contact:before {\n  content: \"\";\n}\n\n.ion-md-contacts:before {\n  content: \"\";\n}\n\n.ion-md-contract:before {\n  content: \"\";\n}\n\n.ion-md-contrast:before {\n  content: \"\";\n}\n\n.ion-md-copy:before {\n  content: \"\";\n}\n\n.ion-md-create:before {\n  content: \"\";\n}\n\n.ion-md-crop:before {\n  content: \"\";\n}\n\n.ion-md-cube:before {\n  content: \"\";\n}\n\n.ion-md-cut:before {\n  content: \"\";\n}\n\n.ion-md-desktop:before {\n  content: \"\";\n}\n\n.ion-md-disc:before {\n  content: \"\";\n}\n\n.ion-md-document:before {\n  content: \"\";\n}\n\n.ion-md-done-all:before {\n  content: \"\";\n}\n\n.ion-md-download:before {\n  content: \"\";\n}\n\n.ion-md-easel:before {\n  content: \"\";\n}\n\n.ion-md-egg:before {\n  content: \"\";\n}\n\n.ion-md-exit:before {\n  content: \"\";\n}\n\n.ion-md-expand:before {\n  content: \"\";\n}\n\n.ion-md-eye:before {\n  content: \"\";\n}\n\n.ion-md-eye-off:before {\n  content: \"\";\n}\n\n.ion-md-fastforward:before {\n  content: \"\";\n}\n\n.ion-md-female:before {\n  content: \"\";\n}\n\n.ion-md-filing:before {\n  content: \"\";\n}\n\n.ion-md-film:before {\n  content: \"\";\n}\n\n.ion-md-finger-print:before {\n  content: \"\";\n}\n\n.ion-md-fitness:before {\n  content: \"\";\n}\n\n.ion-md-flag:before {\n  content: \"\";\n}\n\n.ion-md-flame:before {\n  content: \"\";\n}\n\n.ion-md-flash:before {\n  content: \"\";\n}\n\n.ion-md-flash-off:before {\n  content: \"\";\n}\n\n.ion-md-flashlight:before {\n  content: \"\";\n}\n\n.ion-md-flask:before {\n  content: \"\";\n}\n\n.ion-md-flower:before {\n  content: \"\";\n}\n\n.ion-md-folder:before {\n  content: \"\";\n}\n\n.ion-md-folder-open:before {\n  content: \"\";\n}\n\n.ion-md-football:before {\n  content: \"\";\n}\n\n.ion-md-funnel:before {\n  content: \"\";\n}\n\n.ion-md-gift:before {\n  content: \"\";\n}\n\n.ion-md-git-branch:before {\n  content: \"\";\n}\n\n.ion-md-git-commit:before {\n  content: \"\";\n}\n\n.ion-md-git-compare:before {\n  content: \"\";\n}\n\n.ion-md-git-merge:before {\n  content: \"\";\n}\n\n.ion-md-git-network:before {\n  content: \"\";\n}\n\n.ion-md-git-pull-request:before {\n  content: \"\";\n}\n\n.ion-md-glasses:before {\n  content: \"\";\n}\n\n.ion-md-globe:before {\n  content: \"\";\n}\n\n.ion-md-grid:before {\n  content: \"\";\n}\n\n.ion-md-hammer:before {\n  content: \"\";\n}\n\n.ion-md-hand:before {\n  content: \"\";\n}\n\n.ion-md-happy:before {\n  content: \"\";\n}\n\n.ion-md-headset:before {\n  content: \"\";\n}\n\n.ion-md-heart:before {\n  content: \"\";\n}\n\n.ion-md-heart-dislike:before {\n  content: \"\";\n}\n\n.ion-md-heart-empty:before {\n  content: \"\";\n}\n\n.ion-md-heart-half:before {\n  content: \"\";\n}\n\n.ion-md-help:before {\n  content: \"\";\n}\n\n.ion-md-help-buoy:before {\n  content: \"\";\n}\n\n.ion-md-help-circle:before {\n  content: \"\";\n}\n\n.ion-md-help-circle-outline:before {\n  content: \"\";\n}\n\n.ion-md-home:before {\n  content: \"\";\n}\n\n.ion-md-hourglass:before {\n  content: \"\";\n}\n\n.ion-md-ice-cream:before {\n  content: \"\";\n}\n\n.ion-md-image:before {\n  content: \"\";\n}\n\n.ion-md-images:before {\n  content: \"\";\n}\n\n.ion-md-infinite:before {\n  content: \"\";\n}\n\n.ion-md-information:before {\n  content: \"\";\n}\n\n.ion-md-information-circle:before {\n  content: \"\";\n}\n\n.ion-md-information-circle-outline:before {\n  content: \"\";\n}\n\n.ion-md-jet:before {\n  content: \"\";\n}\n\n.ion-md-journal:before {\n  content: \"\";\n}\n\n.ion-md-key:before {\n  content: \"\";\n}\n\n.ion-md-keypad:before {\n  content: \"\";\n}\n\n.ion-md-laptop:before {\n  content: \"\";\n}\n\n.ion-md-leaf:before {\n  content: \"\";\n}\n\n.ion-md-link:before {\n  content: \"\";\n}\n\n.ion-md-list:before {\n  content: \"\";\n}\n\n.ion-md-list-box:before {\n  content: \"\";\n}\n\n.ion-md-locate:before {\n  content: \"\";\n}\n\n.ion-md-lock:before {\n  content: \"\";\n}\n\n.ion-md-log-in:before {\n  content: \"\";\n}\n\n.ion-md-log-out:before {\n  content: \"\";\n}\n\n.ion-md-magnet:before {\n  content: \"\";\n}\n\n.ion-md-mail:before {\n  content: \"\";\n}\n\n.ion-md-mail-open:before {\n  content: \"\";\n}\n\n.ion-md-mail-unread:before {\n  content: \"\";\n}\n\n.ion-md-male:before {\n  content: \"\";\n}\n\n.ion-md-man:before {\n  content: \"\";\n}\n\n.ion-md-map:before {\n  content: \"\";\n}\n\n.ion-md-medal:before {\n  content: \"\";\n}\n\n.ion-md-medical:before {\n  content: \"\";\n}\n\n.ion-md-medkit:before {\n  content: \"\";\n}\n\n.ion-md-megaphone:before {\n  content: \"\";\n}\n\n.ion-md-menu:before {\n  content: \"\";\n}\n\n.ion-md-mic:before {\n  content: \"\";\n}\n\n.ion-md-mic-off:before {\n  content: \"\";\n}\n\n.ion-md-microphone:before {\n  content: \"\";\n}\n\n.ion-md-moon:before {\n  content: \"\";\n}\n\n.ion-md-more:before {\n  content: \"\";\n}\n\n.ion-md-move:before {\n  content: \"\";\n}\n\n.ion-md-musical-note:before {\n  content: \"\";\n}\n\n.ion-md-musical-notes:before {\n  content: \"\";\n}\n\n.ion-md-navigate:before {\n  content: \"\";\n}\n\n.ion-md-notifications:before {\n  content: \"\";\n}\n\n.ion-md-notifications-off:before {\n  content: \"\";\n}\n\n.ion-md-notifications-outline:before {\n  content: \"\";\n}\n\n.ion-md-nuclear:before {\n  content: \"\";\n}\n\n.ion-md-nutrition:before {\n  content: \"\";\n}\n\n.ion-md-open:before {\n  content: \"\";\n}\n\n.ion-md-options:before {\n  content: \"\";\n}\n\n.ion-md-outlet:before {\n  content: \"\";\n}\n\n.ion-md-paper:before {\n  content: \"\";\n}\n\n.ion-md-paper-plane:before {\n  content: \"\";\n}\n\n.ion-md-partly-sunny:before {\n  content: \"\";\n}\n\n.ion-md-pause:before {\n  content: \"\";\n}\n\n.ion-md-paw:before {\n  content: \"\";\n}\n\n.ion-md-people:before {\n  content: \"\";\n}\n\n.ion-md-person:before {\n  content: \"\";\n}\n\n.ion-md-person-add:before {\n  content: \"\";\n}\n\n.ion-md-phone-landscape:before {\n  content: \"\";\n}\n\n.ion-md-phone-portrait:before {\n  content: \"\";\n}\n\n.ion-md-photos:before {\n  content: \"\";\n}\n\n.ion-md-pie:before {\n  content: \"\";\n}\n\n.ion-md-pin:before {\n  content: \"\";\n}\n\n.ion-md-pint:before {\n  content: \"\";\n}\n\n.ion-md-pizza:before {\n  content: \"\";\n}\n\n.ion-md-planet:before {\n  content: \"\";\n}\n\n.ion-md-play:before {\n  content: \"\";\n}\n\n.ion-md-play-circle:before {\n  content: \"\";\n}\n\n.ion-md-podium:before {\n  content: \"\";\n}\n\n.ion-md-power:before {\n  content: \"\";\n}\n\n.ion-md-pricetag:before {\n  content: \"\";\n}\n\n.ion-md-pricetags:before {\n  content: \"\";\n}\n\n.ion-md-print:before {\n  content: \"\";\n}\n\n.ion-md-pulse:before {\n  content: \"\";\n}\n\n.ion-md-qr-scanner:before {\n  content: \"\";\n}\n\n.ion-md-quote:before {\n  content: \"\";\n}\n\n.ion-md-radio:before {\n  content: \"\";\n}\n\n.ion-md-radio-button-off:before {\n  content: \"\";\n}\n\n.ion-md-radio-button-on:before {\n  content: \"\";\n}\n\n.ion-md-rainy:before {\n  content: \"\";\n}\n\n.ion-md-recording:before {\n  content: \"\";\n}\n\n.ion-md-redo:before {\n  content: \"\";\n}\n\n.ion-md-refresh:before {\n  content: \"\";\n}\n\n.ion-md-refresh-circle:before {\n  content: \"\";\n}\n\n.ion-md-remove:before {\n  content: \"\";\n}\n\n.ion-md-remove-circle:before {\n  content: \"\";\n}\n\n.ion-md-remove-circle-outline:before {\n  content: \"\";\n}\n\n.ion-md-reorder:before {\n  content: \"\";\n}\n\n.ion-md-repeat:before {\n  content: \"\";\n}\n\n.ion-md-resize:before {\n  content: \"\";\n}\n\n.ion-md-restaurant:before {\n  content: \"\";\n}\n\n.ion-md-return-left:before {\n  content: \"\";\n}\n\n.ion-md-return-right:before {\n  content: \"\";\n}\n\n.ion-md-reverse-camera:before {\n  content: \"\";\n}\n\n.ion-md-rewind:before {\n  content: \"\";\n}\n\n.ion-md-ribbon:before {\n  content: \"\";\n}\n\n.ion-md-rocket:before {\n  content: \"\";\n}\n\n.ion-md-rose:before {\n  content: \"\";\n}\n\n.ion-md-sad:before {\n  content: \"\";\n}\n\n.ion-md-save:before {\n  content: \"\";\n}\n\n.ion-md-school:before {\n  content: \"\";\n}\n\n.ion-md-search:before {\n  content: \"\";\n}\n\n.ion-md-send:before {\n  content: \"\";\n}\n\n.ion-md-settings:before {\n  content: \"\";\n}\n\n.ion-md-share:before {\n  content: \"\";\n}\n\n.ion-md-share-alt:before {\n  content: \"\";\n}\n\n.ion-md-shirt:before {\n  content: \"\";\n}\n\n.ion-md-shuffle:before {\n  content: \"\";\n}\n\n.ion-md-skip-backward:before {\n  content: \"\";\n}\n\n.ion-md-skip-forward:before {\n  content: \"\";\n}\n\n.ion-md-snow:before {\n  content: \"\";\n}\n\n.ion-md-speedometer:before {\n  content: \"\";\n}\n\n.ion-md-square:before {\n  content: \"\";\n}\n\n.ion-md-square-outline:before {\n  content: \"\";\n}\n\n.ion-md-star:before {\n  content: \"\";\n}\n\n.ion-md-star-half:before {\n  content: \"\";\n}\n\n.ion-md-star-outline:before {\n  content: \"\";\n}\n\n.ion-md-stats:before {\n  content: \"\";\n}\n\n.ion-md-stopwatch:before {\n  content: \"\";\n}\n\n.ion-md-subway:before {\n  content: \"\";\n}\n\n.ion-md-sunny:before {\n  content: \"\";\n}\n\n.ion-md-swap:before {\n  content: \"\";\n}\n\n.ion-md-switch:before {\n  content: \"\";\n}\n\n.ion-md-sync:before {\n  content: \"\";\n}\n\n.ion-md-tablet-landscape:before {\n  content: \"\";\n}\n\n.ion-md-tablet-portrait:before {\n  content: \"\";\n}\n\n.ion-md-tennisball:before {\n  content: \"\";\n}\n\n.ion-md-text:before {\n  content: \"\";\n}\n\n.ion-md-thermometer:before {\n  content: \"\";\n}\n\n.ion-md-thumbs-down:before {\n  content: \"\";\n}\n\n.ion-md-thumbs-up:before {\n  content: \"\";\n}\n\n.ion-md-thunderstorm:before {\n  content: \"\";\n}\n\n.ion-md-time:before {\n  content: \"\";\n}\n\n.ion-md-timer:before {\n  content: \"\";\n}\n\n.ion-md-today:before {\n  content: \"\";\n}\n\n.ion-md-train:before {\n  content: \"\";\n}\n\n.ion-md-transgender:before {\n  content: \"\";\n}\n\n.ion-md-trash:before {\n  content: \"\";\n}\n\n.ion-md-trending-down:before {\n  content: \"\";\n}\n\n.ion-md-trending-up:before {\n  content: \"\";\n}\n\n.ion-md-trophy:before {\n  content: \"\";\n}\n\n.ion-md-tv:before {\n  content: \"\";\n}\n\n.ion-md-umbrella:before {\n  content: \"\";\n}\n\n.ion-md-undo:before {\n  content: \"\";\n}\n\n.ion-md-unlock:before {\n  content: \"\";\n}\n\n.ion-md-videocam:before {\n  content: \"\";\n}\n\n.ion-md-volume-high:before {\n  content: \"\";\n}\n\n.ion-md-volume-low:before {\n  content: \"\";\n}\n\n.ion-md-volume-mute:before {\n  content: \"\";\n}\n\n.ion-md-volume-off:before {\n  content: \"\";\n}\n\n.ion-md-walk:before {\n  content: \"\";\n}\n\n.ion-md-wallet:before {\n  content: \"\";\n}\n\n.ion-md-warning:before {\n  content: \"\";\n}\n\n.ion-md-watch:before {\n  content: \"\";\n}\n\n.ion-md-water:before {\n  content: \"\";\n}\n\n.ion-md-wifi:before {\n  content: \"\";\n}\n\n.ion-md-wine:before {\n  content: \"\";\n}\n\n.ion-md-woman:before {\n  content: \"\";\n}\n\n.wrapper {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n.container-fluid {\n  margin-right: auto;\n  margin-left: auto;\n  padding-right: 2rem;\n  padding-left: 2rem;\n}\n\n.row {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -moz-flex: 0 1 auto;\n  -ms-flex: 0 1 auto;\n  flex: 0 1 auto;\n  -moz-flex-direction: row;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  margin-right: -0.5rem;\n  margin-left: -0.5rem;\n}\n\n.row.reverse {\n  -moz-flex-direction: row-reverse;\n  -ms-flex-direction: row-reverse;\n  flex-direction: row-reverse;\n}\n\n.col.reverse {\n  -moz-flex-direction: column-reverse;\n  -ms-flex-direction: column-reverse;\n  flex-direction: column-reverse;\n}\n\n.col-xs {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: auto;\n  flex-basis: auto;\n}\n\n.col-xs-1 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 8.3333333333%;\n  flex-basis: 8.3333333333%;\n  max-width: 8.3333333333%;\n}\n\n.col-xs-2 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 16.6666666667%;\n  flex-basis: 16.6666666667%;\n  max-width: 16.6666666667%;\n}\n\n.col-xs-3 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 25%;\n  flex-basis: 25%;\n  max-width: 25%;\n}\n\n.col-xs-4 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 33.3333333333%;\n  flex-basis: 33.3333333333%;\n  max-width: 33.3333333333%;\n}\n\n.col-xs-5 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 41.6666666667%;\n  flex-basis: 41.6666666667%;\n  max-width: 41.6666666667%;\n}\n\n.col-xs-6 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 50%;\n  flex-basis: 50%;\n  max-width: 50%;\n}\n\n.col-xs-7 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 58.3333333333%;\n  flex-basis: 58.3333333333%;\n  max-width: 58.3333333333%;\n}\n\n.col-xs-8 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 66.6666666667%;\n  flex-basis: 66.6666666667%;\n  max-width: 66.6666666667%;\n}\n\n.col-xs-9 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 75%;\n  flex-basis: 75%;\n  max-width: 75%;\n}\n\n.col-xs-10 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 83.3333333333%;\n  flex-basis: 83.3333333333%;\n  max-width: 83.3333333333%;\n}\n\n.col-xs-11 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 91.6666666667%;\n  flex-basis: 91.6666666667%;\n  max-width: 91.6666666667%;\n}\n\n.col-xs-12 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  -ms-flex-preferred-size: 100%;\n  flex-basis: 100%;\n  max-width: 100%;\n}\n\n.col-xs-offset-1 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 8.3333333333%;\n}\n\n.col-xs-offset-2 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 16.6666666667%;\n}\n\n.col-xs-offset-3 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 25%;\n}\n\n.col-xs-offset-4 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 33.3333333333%;\n}\n\n.col-xs-offset-5 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 41.6666666667%;\n}\n\n.col-xs-offset-6 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 50%;\n}\n\n.col-xs-offset-7 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 58.3333333333%;\n}\n\n.col-xs-offset-8 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 66.6666666667%;\n}\n\n.col-xs-offset-9 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 75%;\n}\n\n.col-xs-offset-10 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 83.3333333333%;\n}\n\n.col-xs-offset-11 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 91.6666666667%;\n}\n\n.col-xs-offset-12 {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-flex-grow: 0;\n  -ms-flex-positive: 0;\n  flex-grow: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  margin-left: 100%;\n}\n\n.col-xs {\n  -moz-flex-grow: 1;\n  -ms-flex-positive: 1;\n  flex-grow: 1;\n  -ms-flex-preferred-size: 0;\n  flex-basis: 0;\n  max-width: 100%;\n}\n\n.start-xs {\n  -moz-justify-content: flex-start;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n  text-align: start;\n}\n\n.center-xs {\n  -moz-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  text-align: center;\n}\n\n.end-xs {\n  -moz-justify-content: flex-end;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n  text-align: end;\n}\n\n.top-xs {\n  -moz-align-items: flex-start;\n  -ms-flex-align: start;\n  align-items: flex-start;\n}\n\n.middle-xs {\n  -moz-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\n\n.bottom-xs {\n  -moz-align-items: flex-end;\n  -ms-flex-align: end;\n  align-items: flex-end;\n}\n\n.around-xs {\n  -moz-justify-content: space-around;\n  -ms-flex-pack: distribute;\n  justify-content: space-around;\n}\n\n.between-xs {\n  -moz-justify-content: space-between;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n}\n\n.first-xs {\n  -ms-flex-order: -1;\n  order: -1;\n}\n\n.last-xs {\n  -ms-flex-order: 1;\n  order: 1;\n}\n\n\@media only screen and (min-width: 768px) {\n  .container {\n    width: 728px;\n  }\n\n  .col-md {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: auto;\n    flex-basis: auto;\n  }\n\n  .col-md-1 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 8.3333333333%;\n    flex-basis: 8.3333333333%;\n    max-width: 8.3333333333%;\n  }\n\n  .col-md-2 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 16.6666666667%;\n    flex-basis: 16.6666666667%;\n    max-width: 16.6666666667%;\n  }\n\n  .col-md-3 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 25%;\n    flex-basis: 25%;\n    max-width: 25%;\n  }\n\n  .col-md-4 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 33.3333333333%;\n    flex-basis: 33.3333333333%;\n    max-width: 33.3333333333%;\n  }\n\n  .col-md-5 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 41.6666666667%;\n    flex-basis: 41.6666666667%;\n    max-width: 41.6666666667%;\n  }\n\n  .col-md-6 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 50%;\n    flex-basis: 50%;\n    max-width: 50%;\n  }\n\n  .col-md-7 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 58.3333333333%;\n    flex-basis: 58.3333333333%;\n    max-width: 58.3333333333%;\n  }\n\n  .col-md-8 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 66.6666666667%;\n    flex-basis: 66.6666666667%;\n    max-width: 66.6666666667%;\n  }\n\n  .col-md-9 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 75%;\n    flex-basis: 75%;\n    max-width: 75%;\n  }\n\n  .col-md-10 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 83.3333333333%;\n    flex-basis: 83.3333333333%;\n    max-width: 83.3333333333%;\n  }\n\n  .col-md-11 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 91.6666666667%;\n    flex-basis: 91.6666666667%;\n    max-width: 91.6666666667%;\n  }\n\n  .col-md-12 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 100%;\n    flex-basis: 100%;\n    max-width: 100%;\n  }\n\n  .col-md-offset-1 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 8.3333333333%;\n  }\n\n  .col-md-offset-2 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 16.6666666667%;\n  }\n\n  .col-md-offset-3 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 25%;\n  }\n\n  .col-md-offset-4 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 33.3333333333%;\n  }\n\n  .col-md-offset-5 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 41.6666666667%;\n  }\n\n  .col-md-offset-6 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 50%;\n  }\n\n  .col-md-offset-7 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 58.3333333333%;\n  }\n\n  .col-md-offset-8 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 66.6666666667%;\n  }\n\n  .col-md-offset-9 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 75%;\n  }\n\n  .col-md-offset-10 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 83.3333333333%;\n  }\n\n  .col-md-offset-11 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 91.6666666667%;\n  }\n\n  .col-md-offset-12 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 100%;\n  }\n\n  .col-md {\n    -moz-flex-grow: 1;\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    -ms-flex-preferred-size: 0;\n    flex-basis: 0;\n    max-width: 100%;\n  }\n\n  .start-md {\n    -moz-justify-content: flex-start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    text-align: start;\n  }\n\n  .center-md {\n    -moz-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    text-align: center;\n  }\n\n  .end-md {\n    -moz-justify-content: flex-end;\n    -ms-flex-pack: end;\n    justify-content: flex-end;\n    text-align: end;\n  }\n\n  .top-md {\n    -moz-align-items: flex-start;\n    -ms-flex-align: start;\n    align-items: flex-start;\n  }\n\n  .middle-md {\n    -moz-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n  }\n\n  .bottom-md {\n    -moz-align-items: flex-end;\n    -ms-flex-align: end;\n    align-items: flex-end;\n  }\n\n  .around-md {\n    -moz-justify-content: space-around;\n    -ms-flex-pack: distribute;\n    justify-content: space-around;\n  }\n\n  .between-md {\n    -moz-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n  }\n\n  .first-md {\n    -ms-flex-order: -1;\n    order: -1;\n  }\n\n  .last-md {\n    -ms-flex-order: 1;\n    order: 1;\n  }\n}\n\@media only screen and (min-width: 1024px) {\n  .container {\n    width: 1024px;\n  }\n\n  .col-lg {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: auto;\n    flex-basis: auto;\n  }\n\n  .col-lg-1 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 8.3333333333%;\n    flex-basis: 8.3333333333%;\n    max-width: 8.3333333333%;\n  }\n\n  .col-lg-2 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 16.6666666667%;\n    flex-basis: 16.6666666667%;\n    max-width: 16.6666666667%;\n  }\n\n  .col-lg-3 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 25%;\n    flex-basis: 25%;\n    max-width: 25%;\n  }\n\n  .col-lg-4 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 33.3333333333%;\n    flex-basis: 33.3333333333%;\n    max-width: 33.3333333333%;\n  }\n\n  .col-lg-5 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 41.6666666667%;\n    flex-basis: 41.6666666667%;\n    max-width: 41.6666666667%;\n  }\n\n  .col-lg-6 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 50%;\n    flex-basis: 50%;\n    max-width: 50%;\n  }\n\n  .col-lg-7 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 58.3333333333%;\n    flex-basis: 58.3333333333%;\n    max-width: 58.3333333333%;\n  }\n\n  .col-lg-8 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 66.6666666667%;\n    flex-basis: 66.6666666667%;\n    max-width: 66.6666666667%;\n  }\n\n  .col-lg-9 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 75%;\n    flex-basis: 75%;\n    max-width: 75%;\n  }\n\n  .col-lg-10 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 83.3333333333%;\n    flex-basis: 83.3333333333%;\n    max-width: 83.3333333333%;\n  }\n\n  .col-lg-11 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 91.6666666667%;\n    flex-basis: 91.6666666667%;\n    max-width: 91.6666666667%;\n  }\n\n  .col-lg-12 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 100%;\n    flex-basis: 100%;\n    max-width: 100%;\n  }\n\n  .col-lg-offset-1 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 8.3333333333%;\n  }\n\n  .col-lg-offset-2 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 16.6666666667%;\n  }\n\n  .col-lg-offset-3 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 25%;\n  }\n\n  .col-lg-offset-4 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 33.3333333333%;\n  }\n\n  .col-lg-offset-5 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 41.6666666667%;\n  }\n\n  .col-lg-offset-6 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 50%;\n  }\n\n  .col-lg-offset-7 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 58.3333333333%;\n  }\n\n  .col-lg-offset-8 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 66.6666666667%;\n  }\n\n  .col-lg-offset-9 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 75%;\n  }\n\n  .col-lg-offset-10 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 83.3333333333%;\n  }\n\n  .col-lg-offset-11 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 91.6666666667%;\n  }\n\n  .col-lg-offset-12 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 100%;\n  }\n\n  .col-lg {\n    -moz-flex-grow: 1;\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    -ms-flex-preferred-size: 0;\n    flex-basis: 0;\n    max-width: 100%;\n  }\n\n  .start-lg {\n    -moz-justify-content: flex-start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    text-align: start;\n  }\n\n  .center-lg {\n    -moz-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    text-align: center;\n  }\n\n  .end-lg {\n    -moz-justify-content: flex-end;\n    -ms-flex-pack: end;\n    justify-content: flex-end;\n    text-align: end;\n  }\n\n  .top-lg {\n    -moz-align-items: flex-start;\n    -ms-flex-align: start;\n    align-items: flex-start;\n  }\n\n  .middle-lg {\n    -moz-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n  }\n\n  .bottom-lg {\n    -moz-align-items: flex-end;\n    -ms-flex-align: end;\n    align-items: flex-end;\n  }\n\n  .around-lg {\n    -moz-justify-content: space-around;\n    -ms-flex-pack: distribute;\n    justify-content: space-around;\n  }\n\n  .between-lg {\n    -moz-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n  }\n\n  .first-lg {\n    -ms-flex-order: -1;\n    order: -1;\n  }\n\n  .last-lg {\n    -ms-flex-order: 1;\n    order: 1;\n  }\n}\n\@media only screen and (min-width: 1366px) {\n  .container {\n    width: 1160px;\n  }\n\n  .col-xlg {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: auto;\n    flex-basis: auto;\n  }\n\n  .col-xlg-1 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 8.3333333333%;\n    flex-basis: 8.3333333333%;\n    max-width: 8.3333333333%;\n  }\n\n  .col-xlg-2 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 16.6666666667%;\n    flex-basis: 16.6666666667%;\n    max-width: 16.6666666667%;\n  }\n\n  .col-xlg-3 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 25%;\n    flex-basis: 25%;\n    max-width: 25%;\n  }\n\n  .col-xlg-4 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 33.3333333333%;\n    flex-basis: 33.3333333333%;\n    max-width: 33.3333333333%;\n  }\n\n  .col-xlg-5 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 41.6666666667%;\n    flex-basis: 41.6666666667%;\n    max-width: 41.6666666667%;\n  }\n\n  .col-xlg-6 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 50%;\n    flex-basis: 50%;\n    max-width: 50%;\n  }\n\n  .col-xlg-7 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 58.3333333333%;\n    flex-basis: 58.3333333333%;\n    max-width: 58.3333333333%;\n  }\n\n  .col-xlg-8 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 66.6666666667%;\n    flex-basis: 66.6666666667%;\n    max-width: 66.6666666667%;\n  }\n\n  .col-xlg-9 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 75%;\n    flex-basis: 75%;\n    max-width: 75%;\n  }\n\n  .col-xlg-10 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 83.3333333333%;\n    flex-basis: 83.3333333333%;\n    max-width: 83.3333333333%;\n  }\n\n  .col-xlg-11 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 91.6666666667%;\n    flex-basis: 91.6666666667%;\n    max-width: 91.6666666667%;\n  }\n\n  .col-xlg-12 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    -ms-flex-preferred-size: 100%;\n    flex-basis: 100%;\n    max-width: 100%;\n  }\n\n  .col-xlg-offset-1 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 8.3333333333%;\n  }\n\n  .col-xlg-offset-2 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 16.6666666667%;\n  }\n\n  .col-xlg-offset-3 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 25%;\n  }\n\n  .col-xlg-offset-4 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 33.3333333333%;\n  }\n\n  .col-xlg-offset-5 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 41.6666666667%;\n  }\n\n  .col-xlg-offset-6 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 50%;\n  }\n\n  .col-xlg-offset-7 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 58.3333333333%;\n  }\n\n  .col-xlg-offset-8 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 66.6666666667%;\n  }\n\n  .col-xlg-offset-9 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 75%;\n  }\n\n  .col-xlg-offset-10 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 83.3333333333%;\n  }\n\n  .col-xlg-offset-11 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 91.6666666667%;\n  }\n\n  .col-xlg-offset-12 {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -moz-flex-grow: 0;\n    -ms-flex-positive: 0;\n    flex-grow: 0;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    margin-left: 100%;\n  }\n\n  .col-xlg {\n    -moz-flex-grow: 1;\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    -ms-flex-preferred-size: 0;\n    flex-basis: 0;\n    max-width: 100%;\n  }\n\n  .start-xlg {\n    -moz-justify-content: flex-start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    text-align: start;\n  }\n\n  .center-xlg {\n    -moz-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    text-align: center;\n  }\n\n  .end-xlg {\n    -moz-justify-content: flex-end;\n    -ms-flex-pack: end;\n    justify-content: flex-end;\n    text-align: end;\n  }\n\n  .top-xlg {\n    -moz-align-items: flex-start;\n    -ms-flex-align: start;\n    align-items: flex-start;\n  }\n\n  .middle-xlg {\n    -moz-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n  }\n\n  .bottom-xlg {\n    -moz-align-items: flex-end;\n    -ms-flex-align: end;\n    align-items: flex-end;\n  }\n\n  .around-xlg {\n    -moz-justify-content: space-around;\n    -ms-flex-pack: distribute;\n    justify-content: space-around;\n  }\n\n  .between-xlg {\n    -moz-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n  }\n\n  .first-xlg {\n    -ms-flex-order: -1;\n    order: -1;\n  }\n\n  .last-xlg {\n    -ms-flex-order: 1;\n    order: 1;\n  }\n}\n:root {\n  --primaryColor: #dd0060;\n  --secondaryColor: #37a58c;\n  --tertiaryColor: #000000;\n  --quaternaryColor: #ffffff;\n  --quinaryColor: #7f7f7f;\n  --senaryColor: #e5e5e5;\n  --septenaryColor: #f2f2f2;\n  --octonaryColor: #bfbfbf;\n  --nonaryColor: #b1b2b3;\n  --decenaryColor: rgba(0, 0, 0, 0.05);\n  --undenaryColor: #d9d9d9;\n  --duodenaryColor: rgba(0, 0, 0, 0.25);\n  --thirteenthColor: #b0b0b0;\n  --fourteenthColor: rgba(0, 0, 0, 0.50);\n  --fifteenthColor: #818181;\n  --sixteenthColor: #4e4e4e;\n  --seventeenthColor: rgba(0, 0, 0, 0.3);\n  --nineteenthColor: #ff9500;\n}\n\n.container-fluid {\n  margin: 0 auto;\n  width: 100%;\n  max-width: 1280px;\n  padding: 0 2rem;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.main-container {\n  width: 100%;\n  height: 100%;\n  overflow-x: hidden;\n  overflow: auto;\n}\n\n.default-header {\n  height: 6.4rem;\n  width: 100%;\n  background-color: var(--quaternaryColor, #ffffff);\n}\n.default-header__content {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n  -ms-flex-align: center;\n  align-items: center;\n  height: 100%;\n}\n\n.page {\n  margin-top: 18px;\n  max-height: calc(100% - 6.4rem - 18px);\n  overflow: hidden;\n  overflow-y: auto;\n}\n\n.primary-background {\n  background-color: #ffffff !important;\n}\n\n.secondary-background {\n  background-color: rgba(0, 0, 0, 0.05) !important;\n}\n\n.tertiary-background {\n  background-color: #b1b2b3 !important;\n}\n\n.quaternary-background {\n  background-color: #000000 !important;\n}\n\n.quinary-background {\n  background-color: #37a58c !important;\n}\n\nhtml * {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\nbody, h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4 {\n  font-family: \"BrixSansRegular\";\n  font-weight: 300;\n  line-height: 1.5em;\n}\n\nh1, .h1 {\n  font-size: 3.6rem;\n  font-family: \"BrixSansBlack\";\n  font-weight: 900;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.11;\n  letter-spacing: 0.3px;\n  color: var(--tertiaryColor, #000000);\n}\n\nh2, .h2 {\n  font-size: 2.8rem;\n  font-family: \"BrixSansBlack\";\n  font-weight: 900;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.14;\n  letter-spacing: 0.27px;\n  color: var(--tertiaryColor, #000000);\n}\n\nh3, .h3 {\n  font-size: 2.4rem;\n  font-family: \"BrixSansBold\";\n  font-weight: bold;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.17;\n  letter-spacing: 0.3px;\n  color: var(--tertiaryColor, #000000);\n}\n\nh4, .h4 {\n  font-size: 1.8rem;\n  font-family: \"BrixSansBold\";\n  font-weight: bold;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.33;\n  letter-spacing: 0.23px;\n  color: var(--tertiaryColor, #000000);\n}\n\nh5, .h5 {\n  font-size: 1.7rem;\n  line-height: 1.4em;\n  margin-bottom: 15px;\n}\n\nh6, .h6 {\n  font-size: 1.6rem;\n  text-transform: uppercase;\n  font-weight: 500;\n}\n\na.link {\n  font-family: \"BrixSansBold\";\n  font-size: 14px;\n  font-weight: normal;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.33;\n  letter-spacing: 0.27px;\n  color: var(--primaryColor, #dd0060);\n  text-transform: capitalize;\n  cursor: pointer;\n}\n\n.link.primary-link {\n  font-size: 1.2rem;\n  display: block;\n  width: 100%;\n}\n\n.secondary-link {\n  display: block;\n  width: 100%;\n}\n\n.card-blog .card-title {\n  font-weight: 700;\n}\n\n.description,\n.card-description,\n.footer-big p {\n  color: var(--senaryColor, #e5e5e5);\n}\n\n.abstract {\n  font-family: \"BrixSansBold\";\n  font-size: 1.8rem;\n  font-weight: bold;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.33;\n  letter-spacing: 0.17px;\n  color: var(--tertiaryColor, #000000);\n}\n\n.copy {\n  font-family: \"BrixSansRegular\";\n  font-size: 1.8rem;\n  font-weight: normal;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.33;\n  letter-spacing: 0.17px;\n  color: var(--tertiaryColor, #000000);\n}\n\n.copy-small {\n  font-family: \"BrixSansRegular\";\n  font-size: 1.6rem;\n  font-weight: normal;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.38;\n  letter-spacing: 0.15px;\n  color: var(--tertiaryColor, #000000);\n}\n\n.highlighter-text {\n  font-family: \"BrixSansLight\";\n  font-size: 2.4rem;\n  font-weight: 300;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.33;\n  letter-spacing: 0.23px;\n  color: var(--tertiaryColor, #000000);\n}\n\n.additional-copy {\n  font-family: \"BrixSansRegular\";\n  font-size: 1.8rem;\n  font-weight: normal;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.33;\n  letter-spacing: 0.23px;\n  color: var(--quinaryColor, #7f7f7f);\n}\n\n.additional-copy-small {\n  font-family: \"BrixSansRegular\";\n  font-size: 1.4rem;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.29;\n  letter-spacing: 0.13px;\n  color: var(--quinaryColor, #7f7f7f);\n}\n\n.label {\n  font-family: \"BrixSansRegular\";\n  font-size: 1.2rem;\n  font-weight: normal;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.25;\n  letter-spacing: 0.2px;\n  color: var(--octonaryColor, #bfbfbf);\n  display: block;\n  text-transform: uppercase;\n  width: 100%;\n  margin-bottom: 8px;\n}\n\n.align-items-center {\n  -ms-flex-align: center !important;\n  align-items: center !important;\n}\n\n.no-margin {\n  margin-top: 0 !important;\n  margin-right: 0 !important;\n  margin-bottom: 0 !important;\n  margin-left: 0 !important;\n}\n\n.card {\n  display: block;\n  overflow: hidden;\n  margin: 12px;\n  border-radius: 2px;\n  width: calc(100% - 24px);\n  font-size: 1.4rem;\n  background: var(--quaternaryColor, #ffffff);\n  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);\n}\n\n.no-padding {\n  padding-top: 0 !important;\n  padding-right: 0 !important;\n  padding-bottom: 0 !important;\n  padding-left: 0 !important;\n}\n\n.text-wrap {\n  white-space: normal !important;\n  word-wrap: break-word;\n}\n\n.row {\n  margin-right: 0;\n  margin-left: 0;\n}\n.row.align-items-start {\n  -ms-flex-align: start;\n  align-items: flex-start;\n}\n\n.tab-container {\n  margin-bottom: 5.9rem;\n  width: 100%;\n}\n.tab-container .inner-wrapper {\n  padding: 20px;\n}\n\n\@media screen and (min-width: 1024px) {\n  .tab-container {\n    width: calc(100% - 59px);\n  }\n}\n\@media only screen and (min-width: 768px) {\n  .col-md-auto {\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    width: auto;\n  }\n}\n\@media only screen and (min-width: 1024px) {\n  .col-lg-auto {\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    width: auto;\n  }\n}\n\@media only screen and (min-width: 1366px) {\n  .col-xlg-auto {\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    width: auto;\n  }\n}\n:root {\n  width: 100vw;\n  height: 100vh;\n  overflow-x: hidden;\n  overflow-y: auto;\n  margin: 0;\n  padding: 0;\n  background-color: var(--quaternaryColor, #ffffff);\n}\n:root body {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n}\n\n\@font-face {\n  font-family: \"icomoon\";\n  src: url(\"./../assets/fonts/rh-icons/icomoon.eot?xac4ys\");\n  src: url(\"./../assets/fonts/rh-icons/icomoon.eot?xac4ys#iefix\") format(\"embedded-opentype\"), url(\"./../assets/fonts/rh-icons/icomoon.ttf?xac4ys\") format(\"truetype\"), url(\"./../assets/fonts/rh-icons/icomoon.woff?xac4ys\") format(\"woff\"), url(\"./../assets/fonts/rh-icons/icomoon.svg?xac4ys#icomoon\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n  font-display: block;\n  font-size: inherit;\n  color: inherit;\n}\n[class^=icon-], [class*=\" icon-\"] {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: \"icomoon\" !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  font-size: inherit;\n  color: inherit;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.icon-new_pairing_icon .path1:before {\n  content: \"\";\n  color: black;\n}\n\n.icon-new_pairing_icon .path2:before {\n  content: \"\";\n  margin-left: -2.09765625em;\n  color: black;\n}\n\n.icon-new_pairing_icon .path3:before {\n  content: \"\";\n  margin-left: -2.09765625em;\n  color: black;\n}\n\n.icon-new_pairing_icon .path4:before {\n  content: \"\";\n  margin-left: -2.09765625em;\n  color: black;\n}\n\n.icon-new_pairing_icon .path5:before {\n  content: \"\";\n  margin-left: -2.09765625em;\n  color: #37a58c;\n}\n\n.icon-notification-fill:before {\n  content: \"\";\n  color: #dd0060;\n}\n\n.icon-notification:before {\n  content: \"\";\n}\n\n.icon-checkmark:before {\n  content: \"\";\n  color: #dd0060;\n}\n\n.icon-plus:before {\n  content: \"\";\n  color: #fff;\n}\n\n.icon-next:before {\n  content: \"\";\n  font-family: \"icomoon\";\n}\n\n.icon-rz-schritt-9-1 .path1:before {\n  content: \"\";\n  color: #37a58c;\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-9-1 .path2:before {\n  content: \"\";\n  margin-left: -1em;\n  color: black;\n}\n\n.icon-rz-schritt-9-1 .path3:before {\n  content: \"\";\n  margin-left: -1em;\n  color: black;\n}\n\n.icon-rz-schritt-9-1 .path4:before {\n  content: \"\";\n  margin-left: -1em;\n  color: black;\n}\n\n.icon-time:before {\n  content: \"\";\n}\n\n.icon-time-filled:before {\n  content: \"\";\n}\n\n.icon-settings:before {\n  content: \"\";\n}\n\n.icon-settings-filled:before {\n  content: \"\";\n}\n\n.icon-rz-willkommen .path1:before {\n  content: \"\";\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-willkommen .path2:before {\n  content: \"\";\n  margin-left: -0.7841796875em;\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-9-0 .path1:before {\n  content: \"\";\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-9-0 .path2:before {\n  content: \"\";\n  margin-left: -0.8017578125em;\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-8-0 .path1:before {\n  content: \"\";\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-8-0 .path2:before {\n  content: \"\";\n  margin-left: -1.59375em;\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-7-0 .path1:before {\n  content: \"\";\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-7-0 .path2:before {\n  content: \"\";\n  margin-left: -1em;\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-7-0 .path3:before {\n  content: \"\";\n  margin-left: -1em;\n  color: var(--tertiaryColor, #000000);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-7-0 .path4:before {\n  content: \"\";\n  margin-left: -1em;\n  color: var(--tertiaryColor, #000000);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-6-1 .path1:before {\n  content: \"\";\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-6-1 .path2:before {\n  content: \"\";\n  margin-left: -1.693359375em;\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-6-0 .path1:before {\n  content: \"\";\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-6-0 .path2:before {\n  content: \"\";\n  margin-left: -0.748046875em;\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-5-2 .path1:before {\n  content: \"\";\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-5-2 .path2:before {\n  content: \"\";\n  margin-left: -1em;\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-5-1 .path1:before {\n  content: \"\";\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-5-1 .path2:before {\n  content: \"\";\n  margin-left: -1em;\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-5-0 .path1:before {\n  content: \"\";\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-5-0 .path2:before {\n  content: \"\";\n  margin-left: -1em;\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-4-0 .path1:before {\n  content: \"\";\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-4-0 .path2:before {\n  content: \"\";\n  margin-left: -1.888671875em;\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-3-0 .path1:before {\n  content: \"\";\n  color: var(--secondaryColor, #37a58c);\n  font-size: 102px;\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-3-0 .path2:before {\n  content: \"\";\n  margin-left: -1.3525390625em;\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-2-0 .path1:before {\n  content: \"\";\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-schritt-2-0 .path2:before {\n  content: \"\";\n  margin-left: -1em;\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-1-0 .path1:before {\n  content: \"\";\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-rz-schritt-1-0 .path2:before {\n  content: \"\";\n  margin-left: -0.98828125em;\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-abschluss .path1:before {\n  content: \"\";\n  color: var(--tertiaryColor, #000000);\n}\n\n.icon-rz-abschluss .path2:before {\n  content: \"\";\n  margin-left: -0.927734375em;\n  color: var(--secondaryColor, #37a58c);\n  position: absolute;\n  left: 0;\n}\n\n.icon-home:before {\n  content: \"\";\n}\n\n.icon-home-filled:before {\n  content: \"\";\n}\n\n.icon-group-3:before {\n  content: \"\";\n}\n\n.icon-rehau_logo .path1:before {\n  content: \"\";\n}\n\n.icon-rehau_logo .path2:before {\n  content: \"\";\n  margin-left: -3.0625em;\n}\n\n.icon-rehau_logo .path3:before {\n  content: \"\";\n  margin-left: -3.0625em;\n}\n\n.icon-rehau_logo .path4:before {\n  content: \"\";\n  margin-left: -3.0625em;\n  opacity: 0.8;\n}\n\n:root {\n  font-size: 62.5%;\n  font-family: \"BrixSansRegular\";\n  font-weight: 400;\n}\n:root i[class^=icon-], :root i[class*=icon-] {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: \"icomoon\" !important;\n  speak-as: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n:host {\n  font-family: \"BrixSansRegular\";\n  font-weight: 400;\n}\n:host i[class^=icon-], :host i[class*=icon-] {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: \"icomoon\" !important;\n  speak-as: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n:host input {\n  outline: none;\n}\n:host .box-padding {\n  padding: 1.6rem 1.2rem;\n}\n:host .containerBox {\n  max-width: 35rem;\n  height: 4.4rem;\n}\n:host .input-field {\n  width: 100%;\n  height: 100%;\n  border: none;\n  font-family: \"BrixSansBold\";\n  font-size: 1.8rem;\n  line-height: 1;\n  letter-spacing: 0.027rem;\n  padding: 0 1.2rem;\n  color: var(--tertiaryColor, #000000);\n  border: solid 0.1rem var(--quinaryColor, #7f7f7f);\n}\n:host .input-field:focus, :host .input-field:active {\n  outline: none;\n  border-color: var(--tertiaryColor, #000000);\n}\n:host .input-field.error {\n  border-color: var(--primaryColor, #dd0060);\n  position: relative;\n}\n:host .label-white {\n  color: var(--quaternaryColor, #ffffff);\n}\n:host .textback {\n  color: var(--tertiaryColor, #000000);\n}\n:host .input-field::-webkit-input-placeholder {\n  color: var(--tertiaryColor, #000000);\n  opacity: 1;\n  /* Firefox */\n}\n:host .input-field::-moz-placeholder {\n  color: var(--tertiaryColor, #000000);\n  opacity: 1;\n  /* Firefox */\n}\n:host .input-field:-ms-input-placeholder {\n  color: var(--tertiaryColor, #000000);\n  opacity: 1;\n  /* Firefox */\n}\n:host .input-field::-ms-input-placeholder {\n  color: var(--tertiaryColor, #000000);\n  opacity: 1;\n  /* Firefox */\n}\n:host .input-field::placeholder {\n  color: var(--tertiaryColor, #000000);\n  opacity: 1;\n  /* Firefox */\n}\n:host .input-field:-ms-input-placeholder {\n  /* Internet Explorer 10-11 */\n  color: var(--tertiaryColor, #000000);\n}\n:host .input-field::-ms-input-placeholder {\n  /* Microsoft Edge */\n  color: var(--tertiaryColor, #000000);\n}\n:host .container2 {\n  max-width: 3.2rem;\n  padding-left: 0.8rem;\n  padding-right: 0;\n}\n:host .description {\n  height: auto;\n  max-height: 5rem;\n  line-height: 2rem;\n  overflow: hidden;\n  width: 100%;\n  background-color: transparent;\n  position: relative;\n  z-index: 990;\n}\n:host .description span {\n  display: block;\n  padding: 0.6rem 0 1.7rem 0;\n  font-size: 1.4rem;\n}\n:host .error {\n  height: auto;\n  line-height: 2rem;\n  max-height: 6rem;\n  overflow: hidden;\n  width: 100%;\n  color: var(--primaryColor, #dd0060);\n  background-color: var(--quaternaryColor, #ffffff);\n  bottom: 0.1rem;\n  z-index: 55;\n}\n:host .error span {\n  display: block;\n  padding: 0.8rem;\n  font-size: 1.4rem;\n}\n:host .calendar-style {\n  position: absolute;\n  z-index: 2500;\n  right: 0;\n  width: 100%;\n  left: 0;\n  top: 0;\n}"; }
};

export { MhPropMolecule as rh_textbox };
