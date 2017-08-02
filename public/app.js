(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var document = require('global/document')
var hyperx = require('hyperx')
var onload = require('on-load')

var SVGNS = 'http://www.w3.org/2000/svg'
var XLINKNS = 'http://www.w3.org/1999/xlink'

var BOOL_PROPS = {
  autofocus: 1,
  checked: 1,
  defaultchecked: 1,
  disabled: 1,
  formnovalidate: 1,
  indeterminate: 1,
  readonly: 1,
  required: 1,
  selected: 1,
  willvalidate: 1
}
var COMMENT_TAG = '!--'
var SVG_TAGS = [
  'svg',
  'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile',
  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
  'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
  'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
  'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
  'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face',
  'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri',
  'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
  'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath',
  'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
  'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref',
  'tspan', 'use', 'view', 'vkern'
]

function belCreateElement (tag, props, children) {
  var el

  // If an svg tag, it needs a namespace
  if (SVG_TAGS.indexOf(tag) !== -1) {
    props.namespace = SVGNS
  }

  // If we are using a namespace
  var ns = false
  if (props.namespace) {
    ns = props.namespace
    delete props.namespace
  }

  // Create the element
  if (ns) {
    el = document.createElementNS(ns, tag)
  } else if (tag === COMMENT_TAG) {
    return document.createComment(props.comment)
  } else {
    el = document.createElement(tag)
  }

  // If adding onload events
  if (props.onload || props.onunload) {
    var load = props.onload || function () {}
    var unload = props.onunload || function () {}
    onload(el, function belOnload () {
      load(el)
    }, function belOnunload () {
      unload(el)
    },
    // We have to use non-standard `caller` to find who invokes `belCreateElement`
    belCreateElement.caller.caller.caller)
    delete props.onload
    delete props.onunload
  }

  // Create the properties
  for (var p in props) {
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase()
      var val = props[p]
      // Normalize className
      if (key === 'classname') {
        key = 'class'
        p = 'class'
      }
      // The for attribute gets transformed to htmlFor, but we just set as for
      if (p === 'htmlFor') {
        p = 'for'
      }
      // If a property is boolean, set itself to the key
      if (BOOL_PROPS[key]) {
        if (val === 'true') val = key
        else if (val === 'false') continue
      }
      // If a property prefers being set directly vs setAttribute
      if (key.slice(0, 2) === 'on') {
        el[p] = val
      } else {
        if (ns) {
          if (p === 'xlink:href') {
            el.setAttributeNS(XLINKNS, p, val)
          } else if (/^xmlns($|:)/i.test(p)) {
            // skip xmlns definitions
          } else {
            el.setAttributeNS(null, p, val)
          }
        } else {
          el.setAttribute(p, val)
        }
      }
    }
  }

  function appendChild (childs) {
    if (!Array.isArray(childs)) return
    for (var i = 0; i < childs.length; i++) {
      var node = childs[i]
      if (Array.isArray(node)) {
        appendChild(node)
        continue
      }

      if (typeof node === 'number' ||
        typeof node === 'boolean' ||
        typeof node === 'function' ||
        node instanceof Date ||
        node instanceof RegExp) {
        node = node.toString()
      }

      if (typeof node === 'string') {
        if (el.lastChild && el.lastChild.nodeName === '#text') {
          el.lastChild.nodeValue += node
          continue
        }
        node = document.createTextNode(node)
      }

      if (node && node.nodeType) {
        el.appendChild(node)
      }
    }
  }
  appendChild(children)

  return el
}

module.exports = hyperx(belCreateElement, {comments: true})
module.exports.default = module.exports
module.exports.createElement = belCreateElement

},{"global/document":4,"hyperx":7,"on-load":9}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
/* global HTMLElement */

'use strict'

module.exports = function emptyElement (element) {
  if (!(element instanceof HTMLElement)) {
    throw new TypeError('Expected an element')
  }

  var node
  while ((node = element.lastChild)) element.removeChild(node)
  return element
}

},{}],4:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":2}],5:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
module.exports = attributeToProperty

var transform = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
}

function attributeToProperty (h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in transform) {
        attrs[transform[attr]] = attrs[attr]
        delete attrs[attr]
      }
    }
    return h(tagName, attrs, children)
  }
}

},{}],7:[function(require,module,exports){
var attrToProp = require('hyperscript-attribute-to-property')

var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
var ATTR_KEY = 5, ATTR_KEY_W = 6
var ATTR_VALUE_W = 7, ATTR_VALUE = 8
var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
var ATTR_EQ = 11, ATTR_BREAK = 12
var COMMENT = 13

module.exports = function (h, opts) {
  if (!opts) opts = {}
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }
  if (opts.attrToProp !== false) {
    h = attrToProp(h)
  }

  return function (strings) {
    var state = TEXT, reg = ''
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
        if (xstate === ATTR) xstate = ATTR_KEY
        p.push([ VAR, xstate, arg ])
        parts.push.apply(parts, p)
      } else parts.push.apply(parts, parse(strings[i]))
    }

    var tree = [null,{},[]]
    var stack = [[tree,-1]]
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], s = p[0]
      if (s === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === OPEN) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])
      } else if (s === ATTR_KEY || (s === VAR && p[1] === ATTR_KEY)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1])
          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey]
                }
              }
            } else {
              key = concat(key, parts[i][2])
            }
          } else break
        }
        if (parts[i][0] === ATTR_EQ) i++
        var j = i
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
            else cur[1][key] = concat(cur[1][key], parts[i][1])
          } else if (parts[i][0] === VAR
          && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
            else cur[1][key] = concat(cur[1][key], parts[i][2])
          } else {
            if (key.length && !cur[1][key] && i === j
            && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }
            break
          }
        }
      } else if (s === ATTR_KEY) {
        cur[1][p[1]] = true
      } else if (s === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true
      } else if (s === CLOSE) {
        if (selfClosing(cur[0]) && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null) p[2] = ''
        else if (!p[2]) p[2] = concat('', p[2])
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2])
        } else {
          cur[2].push(p[2])
        }
      } else if (s === TEXT) {
        cur[2].push(p[1])
      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s)
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift()
    }

    if (tree[2].length > 2
    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
    && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
    }
    return tree[2][0]

    function parse (str) {
      var res = []
      if (state === ATTR_VALUE_W) state = ATTR
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === TEXT && c === '<') {
          if (reg.length) res.push([TEXT, reg])
          reg = ''
          state = OPEN
        } else if (c === '>' && !quot(state) && state !== COMMENT) {
          if (state === OPEN) {
            res.push([OPEN,reg])
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY,reg])
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE,reg])
          }
          res.push([CLOSE])
          reg = ''
          state = TEXT
        } else if (state === COMMENT && /-$/.test(reg) && c === '-') {
          if (opts.comments) {
            res.push([ATTR_VALUE,reg.substr(0, reg.length - 1)],[CLOSE])
          }
          reg = ''
          state = TEXT
        } else if (state === OPEN && /^!--$/.test(reg)) {
          if (opts.comments) {
            res.push([OPEN, reg],[ATTR_KEY,'comment'],[ATTR_EQ])
          }
          reg = c
          state = COMMENT
        } else if (state === TEXT || state === COMMENT) {
          reg += c
        } else if (state === OPEN && /\s/.test(c)) {
          res.push([OPEN, reg])
          reg = ''
          state = ATTR
        } else if (state === OPEN) {
          reg += c
        } else if (state === ATTR && /[^\s"'=/]/.test(c)) {
          state = ATTR_KEY
          reg = c
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length) res.push([ATTR_KEY,reg])
          res.push([ATTR_BREAK])
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY,reg])
          reg = ''
          state = ATTR_KEY_W
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY,reg],[ATTR_EQ])
          reg = ''
          state = ATTR_VALUE_W
        } else if (state === ATTR_KEY) {
          reg += c
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ])
          state = ATTR_VALUE_W
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK])
          if (/[\w-]/.test(c)) {
            reg += c
            state = ATTR_KEY
          } else state = ATTR
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE
          i--
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
        || state === ATTR_VALUE_DQ) {
          reg += c
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT,reg])
        reg = ''
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else return concat('', x)
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
}

var hasOwn = Object.prototype.hasOwnProperty
function has (obj, key) { return hasOwn.call(obj, key) }

var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr', '!--',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function selfClosing (tag) { return closeRE.test(tag) }

},{"hyperscript-attribute-to-property":6}],8:[function(require,module,exports){
'use strict';

var range; // Create a range object for efficently rendering strings to elements.
var NS_XHTML = 'http://www.w3.org/1999/xhtml';

var doc = typeof document === 'undefined' ? undefined : document;

var testEl = doc ?
    doc.body || doc.createElement('div') :
    {};

// Fixes <https://github.com/patrick-steele-idem/morphdom/issues/32>
// (IE7+ support) <=IE7 does not support el.hasAttribute(name)
var actualHasAttributeNS;

if (testEl.hasAttributeNS) {
    actualHasAttributeNS = function(el, namespaceURI, name) {
        return el.hasAttributeNS(namespaceURI, name);
    };
} else if (testEl.hasAttribute) {
    actualHasAttributeNS = function(el, namespaceURI, name) {
        return el.hasAttribute(name);
    };
} else {
    actualHasAttributeNS = function(el, namespaceURI, name) {
        return el.getAttributeNode(namespaceURI, name) != null;
    };
}

var hasAttributeNS = actualHasAttributeNS;


function toElement(str) {
    if (!range && doc.createRange) {
        range = doc.createRange();
        range.selectNode(doc.body);
    }

    var fragment;
    if (range && range.createContextualFragment) {
        fragment = range.createContextualFragment(str);
    } else {
        fragment = doc.createElement('body');
        fragment.innerHTML = str;
    }
    return fragment.childNodes[0];
}

/**
 * Returns true if two node's names are the same.
 *
 * NOTE: We don't bother checking `namespaceURI` because you will never find two HTML elements with the same
 *       nodeName and different namespace URIs.
 *
 * @param {Element} a
 * @param {Element} b The target element
 * @return {boolean}
 */
function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;

    if (fromNodeName === toNodeName) {
        return true;
    }

    if (toEl.actualize &&
        fromNodeName.charCodeAt(0) < 91 && /* from tag name is upper case */
        toNodeName.charCodeAt(0) > 90 /* target tag name is lower case */) {
        // If the target element is a virtual DOM node then we may need to normalize the tag name
        // before comparing. Normal HTML elements that are in the "http://www.w3.org/1999/xhtml"
        // are converted to upper case
        return fromNodeName === toNodeName.toUpperCase();
    } else {
        return false;
    }
}

/**
 * Create an element, optionally with a known namespace URI.
 *
 * @param {string} name the element name, e.g. 'div' or 'svg'
 * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
 * its `xmlns` attribute or its inferred namespace.
 *
 * @return {Element}
 */
function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ?
        doc.createElement(name) :
        doc.createElementNS(namespaceURI, name);
}

/**
 * Copies the children of one DOM element to another DOM element
 */
function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
        var nextChild = curChild.nextSibling;
        toEl.appendChild(curChild);
        curChild = nextChild;
    }
    return toEl;
}

function morphAttrs(fromNode, toNode) {
    var attrs = toNode.attributes;
    var i;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;

    for (i = attrs.length - 1; i >= 0; --i) {
        attr = attrs[i];
        attrName = attr.name;
        attrNamespaceURI = attr.namespaceURI;
        attrValue = attr.value;

        if (attrNamespaceURI) {
            attrName = attr.localName || attrName;
            fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);

            if (fromValue !== attrValue) {
                fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
            }
        } else {
            fromValue = fromNode.getAttribute(attrName);

            if (fromValue !== attrValue) {
                fromNode.setAttribute(attrName, attrValue);
            }
        }
    }

    // Remove any extra attributes found on the original DOM element that
    // weren't found on the target element.
    attrs = fromNode.attributes;

    for (i = attrs.length - 1; i >= 0; --i) {
        attr = attrs[i];
        if (attr.specified !== false) {
            attrName = attr.name;
            attrNamespaceURI = attr.namespaceURI;

            if (attrNamespaceURI) {
                attrName = attr.localName || attrName;

                if (!hasAttributeNS(toNode, attrNamespaceURI, attrName)) {
                    fromNode.removeAttributeNS(attrNamespaceURI, attrName);
                }
            } else {
                if (!hasAttributeNS(toNode, null, attrName)) {
                    fromNode.removeAttribute(attrName);
                }
            }
        }
    }
}

function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
        fromEl[name] = toEl[name];
        if (fromEl[name]) {
            fromEl.setAttribute(name, '');
        } else {
            fromEl.removeAttribute(name, '');
        }
    }
}

var specialElHandlers = {
    /**
     * Needed for IE. Apparently IE doesn't think that "selected" is an
     * attribute when reading over the attributes using selectEl.attributes
     */
    OPTION: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'selected');
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'checked');
        syncBooleanAttrProp(fromEl, toEl, 'disabled');

        if (fromEl.value !== toEl.value) {
            fromEl.value = toEl.value;
        }

        if (!hasAttributeNS(toEl, null, 'value')) {
            fromEl.removeAttribute('value');
        }
    },

    TEXTAREA: function(fromEl, toEl) {
        var newValue = toEl.value;
        if (fromEl.value !== newValue) {
            fromEl.value = newValue;
        }

        var firstChild = fromEl.firstChild;
        if (firstChild) {
            // Needed for IE. Apparently IE sets the placeholder as the
            // node value and vise versa. This ignores an empty update.
            var oldValue = firstChild.nodeValue;

            if (oldValue == newValue || (!newValue && oldValue == fromEl.placeholder)) {
                return;
            }

            firstChild.nodeValue = newValue;
        }
    },
    SELECT: function(fromEl, toEl) {
        if (!hasAttributeNS(toEl, null, 'multiple')) {
            var selectedIndex = -1;
            var i = 0;
            var curChild = toEl.firstChild;
            while(curChild) {
                var nodeName = curChild.nodeName;
                if (nodeName && nodeName.toUpperCase() === 'OPTION') {
                    if (hasAttributeNS(curChild, null, 'selected')) {
                        selectedIndex = i;
                        break;
                    }
                    i++;
                }
                curChild = curChild.nextSibling;
            }

            fromEl.selectedIndex = i;
        }
    }
};

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;

function noop() {}

function defaultGetNodeKey(node) {
    return node.id;
}

function morphdomFactory(morphAttrs) {

    return function morphdom(fromNode, toNode, options) {
        if (!options) {
            options = {};
        }

        if (typeof toNode === 'string') {
            if (fromNode.nodeName === '#document' || fromNode.nodeName === 'HTML') {
                var toNodeHtml = toNode;
                toNode = doc.createElement('html');
                toNode.innerHTML = toNodeHtml;
            } else {
                toNode = toElement(toNode);
            }
        }

        var getNodeKey = options.getNodeKey || defaultGetNodeKey;
        var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
        var onNodeAdded = options.onNodeAdded || noop;
        var onBeforeElUpdated = options.onBeforeElUpdated || noop;
        var onElUpdated = options.onElUpdated || noop;
        var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
        var onNodeDiscarded = options.onNodeDiscarded || noop;
        var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
        var childrenOnly = options.childrenOnly === true;

        // This object is used as a lookup to quickly find all keyed elements in the original DOM tree.
        var fromNodesLookup = {};
        var keyedRemovalList;

        function addKeyedRemoval(key) {
            if (keyedRemovalList) {
                keyedRemovalList.push(key);
            } else {
                keyedRemovalList = [key];
            }
        }

        function walkDiscardedChildNodes(node, skipKeyedNodes) {
            if (node.nodeType === ELEMENT_NODE) {
                var curChild = node.firstChild;
                while (curChild) {

                    var key = undefined;

                    if (skipKeyedNodes && (key = getNodeKey(curChild))) {
                        // If we are skipping keyed nodes then we add the key
                        // to a list so that it can be handled at the very end.
                        addKeyedRemoval(key);
                    } else {
                        // Only report the node as discarded if it is not keyed. We do this because
                        // at the end we loop through all keyed elements that were unmatched
                        // and then discard them in one final pass.
                        onNodeDiscarded(curChild);
                        if (curChild.firstChild) {
                            walkDiscardedChildNodes(curChild, skipKeyedNodes);
                        }
                    }

                    curChild = curChild.nextSibling;
                }
            }
        }

        /**
         * Removes a DOM node out of the original DOM
         *
         * @param  {Node} node The node to remove
         * @param  {Node} parentNode The nodes parent
         * @param  {Boolean} skipKeyedNodes If true then elements with keys will be skipped and not discarded.
         * @return {undefined}
         */
        function removeNode(node, parentNode, skipKeyedNodes) {
            if (onBeforeNodeDiscarded(node) === false) {
                return;
            }

            if (parentNode) {
                parentNode.removeChild(node);
            }

            onNodeDiscarded(node);
            walkDiscardedChildNodes(node, skipKeyedNodes);
        }

        // // TreeWalker implementation is no faster, but keeping this around in case this changes in the future
        // function indexTree(root) {
        //     var treeWalker = document.createTreeWalker(
        //         root,
        //         NodeFilter.SHOW_ELEMENT);
        //
        //     var el;
        //     while((el = treeWalker.nextNode())) {
        //         var key = getNodeKey(el);
        //         if (key) {
        //             fromNodesLookup[key] = el;
        //         }
        //     }
        // }

        // // NodeIterator implementation is no faster, but keeping this around in case this changes in the future
        //
        // function indexTree(node) {
        //     var nodeIterator = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT);
        //     var el;
        //     while((el = nodeIterator.nextNode())) {
        //         var key = getNodeKey(el);
        //         if (key) {
        //             fromNodesLookup[key] = el;
        //         }
        //     }
        // }

        function indexTree(node) {
            if (node.nodeType === ELEMENT_NODE) {
                var curChild = node.firstChild;
                while (curChild) {
                    var key = getNodeKey(curChild);
                    if (key) {
                        fromNodesLookup[key] = curChild;
                    }

                    // Walk recursively
                    indexTree(curChild);

                    curChild = curChild.nextSibling;
                }
            }
        }

        indexTree(fromNode);

        function handleNodeAdded(el) {
            onNodeAdded(el);

            var curChild = el.firstChild;
            while (curChild) {
                var nextSibling = curChild.nextSibling;

                var key = getNodeKey(curChild);
                if (key) {
                    var unmatchedFromEl = fromNodesLookup[key];
                    if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
                        curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
                        morphEl(unmatchedFromEl, curChild);
                    }
                }

                handleNodeAdded(curChild);
                curChild = nextSibling;
            }
        }

        function morphEl(fromEl, toEl, childrenOnly) {
            var toElKey = getNodeKey(toEl);
            var curFromNodeKey;

            if (toElKey) {
                // If an element with an ID is being morphed then it is will be in the final
                // DOM so clear it out of the saved elements collection
                delete fromNodesLookup[toElKey];
            }

            if (toNode.isSameNode && toNode.isSameNode(fromNode)) {
                return;
            }

            if (!childrenOnly) {
                if (onBeforeElUpdated(fromEl, toEl) === false) {
                    return;
                }

                morphAttrs(fromEl, toEl);
                onElUpdated(fromEl);

                if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
                    return;
                }
            }

            if (fromEl.nodeName !== 'TEXTAREA') {
                var curToNodeChild = toEl.firstChild;
                var curFromNodeChild = fromEl.firstChild;
                var curToNodeKey;

                var fromNextSibling;
                var toNextSibling;
                var matchingFromEl;

                outer: while (curToNodeChild) {
                    toNextSibling = curToNodeChild.nextSibling;
                    curToNodeKey = getNodeKey(curToNodeChild);

                    while (curFromNodeChild) {
                        fromNextSibling = curFromNodeChild.nextSibling;

                        if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                            curToNodeChild = toNextSibling;
                            curFromNodeChild = fromNextSibling;
                            continue outer;
                        }

                        curFromNodeKey = getNodeKey(curFromNodeChild);

                        var curFromNodeType = curFromNodeChild.nodeType;

                        var isCompatible = undefined;

                        if (curFromNodeType === curToNodeChild.nodeType) {
                            if (curFromNodeType === ELEMENT_NODE) {
                                // Both nodes being compared are Element nodes

                                if (curToNodeKey) {
                                    // The target node has a key so we want to match it up with the correct element
                                    // in the original DOM tree
                                    if (curToNodeKey !== curFromNodeKey) {
                                        // The current element in the original DOM tree does not have a matching key so
                                        // let's check our lookup to see if there is a matching element in the original
                                        // DOM tree
                                        if ((matchingFromEl = fromNodesLookup[curToNodeKey])) {
                                            if (curFromNodeChild.nextSibling === matchingFromEl) {
                                                // Special case for single element removals. To avoid removing the original
                                                // DOM node out of the tree (since that can break CSS transitions, etc.),
                                                // we will instead discard the current node and wait until the next
                                                // iteration to properly match up the keyed target element with its matching
                                                // element in the original tree
                                                isCompatible = false;
                                            } else {
                                                // We found a matching keyed element somewhere in the original DOM tree.
                                                // Let's moving the original DOM node into the current position and morph
                                                // it.

                                                // NOTE: We use insertBefore instead of replaceChild because we want to go through
                                                // the `removeNode()` function for the node that is being discarded so that
                                                // all lifecycle hooks are correctly invoked
                                                fromEl.insertBefore(matchingFromEl, curFromNodeChild);

                                                fromNextSibling = curFromNodeChild.nextSibling;

                                                if (curFromNodeKey) {
                                                    // Since the node is keyed it might be matched up later so we defer
                                                    // the actual removal to later
                                                    addKeyedRemoval(curFromNodeKey);
                                                } else {
                                                    // NOTE: we skip nested keyed nodes from being removed since there is
                                                    //       still a chance they will be matched up later
                                                    removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                                                }

                                                curFromNodeChild = matchingFromEl;
                                            }
                                        } else {
                                            // The nodes are not compatible since the "to" node has a key and there
                                            // is no matching keyed node in the source tree
                                            isCompatible = false;
                                        }
                                    }
                                } else if (curFromNodeKey) {
                                    // The original has a key
                                    isCompatible = false;
                                }

                                isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                                if (isCompatible) {
                                    // We found compatible DOM elements so transform
                                    // the current "from" node to match the current
                                    // target DOM node.
                                    morphEl(curFromNodeChild, curToNodeChild);
                                }

                            } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                                // Both nodes being compared are Text or Comment nodes
                                isCompatible = true;
                                // Simply update nodeValue on the original node to
                                // change the text value
                                curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                            }
                        }

                        if (isCompatible) {
                            // Advance both the "to" child and the "from" child since we found a match
                            curToNodeChild = toNextSibling;
                            curFromNodeChild = fromNextSibling;
                            continue outer;
                        }

                        // No compatible match so remove the old node from the DOM and continue trying to find a
                        // match in the original DOM. However, we only do this if the from node is not keyed
                        // since it is possible that a keyed node might match up with a node somewhere else in the
                        // target tree and we don't want to discard it just yet since it still might find a
                        // home in the final DOM tree. After everything is done we will remove any keyed nodes
                        // that didn't find a home
                        if (curFromNodeKey) {
                            // Since the node is keyed it might be matched up later so we defer
                            // the actual removal to later
                            addKeyedRemoval(curFromNodeKey);
                        } else {
                            // NOTE: we skip nested keyed nodes from being removed since there is
                            //       still a chance they will be matched up later
                            removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                        }

                        curFromNodeChild = fromNextSibling;
                    }

                    // If we got this far then we did not find a candidate match for
                    // our "to node" and we exhausted all of the children "from"
                    // nodes. Therefore, we will just append the current "to" node
                    // to the end
                    if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
                        fromEl.appendChild(matchingFromEl);
                        morphEl(matchingFromEl, curToNodeChild);
                    } else {
                        var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
                        if (onBeforeNodeAddedResult !== false) {
                            if (onBeforeNodeAddedResult) {
                                curToNodeChild = onBeforeNodeAddedResult;
                            }

                            if (curToNodeChild.actualize) {
                                curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                            }
                            fromEl.appendChild(curToNodeChild);
                            handleNodeAdded(curToNodeChild);
                        }
                    }

                    curToNodeChild = toNextSibling;
                    curFromNodeChild = fromNextSibling;
                }

                // We have processed all of the "to nodes". If curFromNodeChild is
                // non-null then we still have some from nodes left over that need
                // to be removed
                while (curFromNodeChild) {
                    fromNextSibling = curFromNodeChild.nextSibling;
                    if ((curFromNodeKey = getNodeKey(curFromNodeChild))) {
                        // Since the node is keyed it might be matched up later so we defer
                        // the actual removal to later
                        addKeyedRemoval(curFromNodeKey);
                    } else {
                        // NOTE: we skip nested keyed nodes from being removed since there is
                        //       still a chance they will be matched up later
                        removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                    }
                    curFromNodeChild = fromNextSibling;
                }
            }

            var specialElHandler = specialElHandlers[fromEl.nodeName];
            if (specialElHandler) {
                specialElHandler(fromEl, toEl);
            }
        } // END: morphEl(...)

        var morphedNode = fromNode;
        var morphedNodeType = morphedNode.nodeType;
        var toNodeType = toNode.nodeType;

        if (!childrenOnly) {
            // Handle the case where we are given two DOM nodes that are not
            // compatible (e.g. <div> --> <span> or <div> --> TEXT)
            if (morphedNodeType === ELEMENT_NODE) {
                if (toNodeType === ELEMENT_NODE) {
                    if (!compareNodeNames(fromNode, toNode)) {
                        onNodeDiscarded(fromNode);
                        morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
                    }
                } else {
                    // Going from an element node to a text node
                    morphedNode = toNode;
                }
            } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) { // Text or comment node
                if (toNodeType === morphedNodeType) {
                    morphedNode.nodeValue = toNode.nodeValue;
                    return morphedNode;
                } else {
                    // Text node to something else
                    morphedNode = toNode;
                }
            }
        }

        if (morphedNode === toNode) {
            // The "to node" was not compatible with the "from node" so we had to
            // toss out the "from node" and use the "to node"
            onNodeDiscarded(fromNode);
        } else {
            morphEl(morphedNode, toNode, childrenOnly);

            // We now need to loop over any keyed nodes that might need to be
            // removed. We only do the removal if we know that the keyed node
            // never found a match. When a keyed node is matched up we remove
            // it out of fromNodesLookup and we use fromNodesLookup to determine
            // if a keyed node has been matched up or not
            if (keyedRemovalList) {
                for (var i=0, len=keyedRemovalList.length; i<len; i++) {
                    var elToRemove = fromNodesLookup[keyedRemovalList[i]];
                    if (elToRemove) {
                        removeNode(elToRemove, elToRemove.parentNode, false);
                    }
                }
            }
        }

        if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
            if (morphedNode.actualize) {
                morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
            }
            // If we had to swap out the from node with a new node because the old
            // node was not compatible with the target node then we need to
            // replace the old DOM node in the original DOM tree. This is only
            // possible if the original DOM node was part of a DOM tree which
            // we know is the case if it has a parent node.
            fromNode.parentNode.replaceChild(morphedNode, fromNode);
        }

        return morphedNode;
    };
}

var morphdom = morphdomFactory(morphAttrs);

module.exports = morphdom;

},{}],9:[function(require,module,exports){
/* global MutationObserver */
var document = require('global/document')
var window = require('global/window')
var watch = Object.create(null)
var KEY_ID = 'onloadid' + (new Date() % 9e6).toString(36)
var KEY_ATTR = 'data-' + KEY_ID
var INDEX = 0

if (window && window.MutationObserver) {
  var observer = new MutationObserver(function (mutations) {
    if (Object.keys(watch).length < 1) return
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === KEY_ATTR) {
        eachAttr(mutations[i], turnon, turnoff)
        continue
      }
      eachMutation(mutations[i].removedNodes, turnoff)
      eachMutation(mutations[i].addedNodes, turnon)
    }
  })
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [KEY_ATTR]
  })
}

module.exports = function onload (el, on, off, caller) {
  on = on || function () {}
  off = off || function () {}
  el.setAttribute(KEY_ATTR, 'o' + INDEX)
  watch['o' + INDEX] = [on, off, 0, caller || onload.caller]
  INDEX += 1
  return el
}

function turnon (index, el) {
  if (watch[index][0] && watch[index][2] === 0) {
    watch[index][0](el)
    watch[index][2] = 1
  }
}

function turnoff (index, el) {
  if (watch[index][1] && watch[index][2] === 1) {
    watch[index][1](el)
    watch[index][2] = 0
  }
}

function eachAttr (mutation, on, off) {
  var newValue = mutation.target.getAttribute(KEY_ATTR)
  if (sameOrigin(mutation.oldValue, newValue)) {
    watch[newValue] = watch[mutation.oldValue]
    return
  }
  if (watch[mutation.oldValue]) {
    off(mutation.oldValue, mutation.target)
  }
  if (watch[newValue]) {
    on(newValue, mutation.target)
  }
}

function sameOrigin (oldValue, newValue) {
  if (!oldValue || !newValue) return false
  return watch[oldValue][3] === watch[newValue][3]
}

function eachMutation (nodes, fn) {
  var keys = Object.keys(watch)
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] && nodes[i].getAttribute && nodes[i].getAttribute(KEY_ATTR)) {
      var onloadid = nodes[i].getAttribute(KEY_ATTR)
      keys.forEach(function (k) {
        if (onloadid === k) {
          fn(k, nodes[i])
        }
      })
    }
    if (nodes[i].childNodes.length > 0) {
      eachMutation(nodes[i].childNodes, fn)
    }
  }
}

},{"global/document":4,"global/window":5}],10:[function(require,module,exports){
(function (process){
  /* globals require, module */

  'use strict';

  /**
   * Module dependencies.
   */

  var pathtoRegexp = require('path-to-regexp');

  /**
   * Module exports.
   */

  module.exports = page;

  /**
   * Detect click event
   */
  var clickEvent = ('undefined' !== typeof document) && document.ontouchstart ? 'touchstart' : 'click';

  /**
   * To work properly with the URL
   * history.location generated polyfill in https://github.com/devote/HTML5-History-API
   */

  var location = ('undefined' !== typeof window) && (window.history.location || window.location);

  /**
   * Perform initial dispatch.
   */

  var dispatch = true;


  /**
   * Decode URL components (query string, pathname, hash).
   * Accommodates both regular percent encoding and x-www-form-urlencoded format.
   */
  var decodeURLComponents = true;

  /**
   * Base path.
   */

  var base = '';

  /**
   * Running flag.
   */

  var running;

  /**
   * HashBang option
   */

  var hashbang = false;

  /**
   * Previous context, for capturing
   * page exit events.
   */

  var prevContext;

  /**
   * Register `path` with callback `fn()`,
   * or route `path`, or redirection,
   * or `page.start()`.
   *
   *   page(fn);
   *   page('*', fn);
   *   page('/user/:id', load, user);
   *   page('/user/' + user.id, { some: 'thing' });
   *   page('/user/' + user.id);
   *   page('/from', '/to')
   *   page();
   *
   * @param {string|!Function|!Object} path
   * @param {Function=} fn
   * @api public
   */

  function page(path, fn) {
    // <callback>
    if ('function' === typeof path) {
      return page('*', path);
    }

    // route <path> to <callback ...>
    if ('function' === typeof fn) {
      var route = new Route(/** @type {string} */ (path));
      for (var i = 1; i < arguments.length; ++i) {
        page.callbacks.push(route.middleware(arguments[i]));
      }
      // show <path> with [state]
    } else if ('string' === typeof path) {
      page['string' === typeof fn ? 'redirect' : 'show'](path, fn);
      // start [options]
    } else {
      page.start(path);
    }
  }

  /**
   * Callback functions.
   */

  page.callbacks = [];
  page.exits = [];

  /**
   * Current path being processed
   * @type {string}
   */
  page.current = '';

  /**
   * Number of pages navigated to.
   * @type {number}
   *
   *     page.len == 0;
   *     page('/login');
   *     page.len == 1;
   */

  page.len = 0;

  /**
   * Get or set basepath to `path`.
   *
   * @param {string} path
   * @api public
   */

  page.base = function(path) {
    if (0 === arguments.length) return base;
    base = path;
  };

  /**
   * Bind with the given `options`.
   *
   * Options:
   *
   *    - `click` bind to click events [true]
   *    - `popstate` bind to popstate [true]
   *    - `dispatch` perform initial dispatch [true]
   *
   * @param {Object} options
   * @api public
   */

  page.start = function(options) {
    options = options || {};
    if (running) return;
    running = true;
    if (false === options.dispatch) dispatch = false;
    if (false === options.decodeURLComponents) decodeURLComponents = false;
    if (false !== options.popstate) window.addEventListener('popstate', onpopstate, false);
    if (false !== options.click) {
      document.addEventListener(clickEvent, onclick, false);
    }
    if (true === options.hashbang) hashbang = true;
    if (!dispatch) return;
    var url = (hashbang && ~location.hash.indexOf('#!')) ? location.hash.substr(2) + location.search : location.pathname + location.search + location.hash;
    page.replace(url, null, true, dispatch);
  };

  /**
   * Unbind click and popstate event handlers.
   *
   * @api public
   */

  page.stop = function() {
    if (!running) return;
    page.current = '';
    page.len = 0;
    running = false;
    document.removeEventListener(clickEvent, onclick, false);
    window.removeEventListener('popstate', onpopstate, false);
  };

  /**
   * Show `path` with optional `state` object.
   *
   * @param {string} path
   * @param {Object=} state
   * @param {boolean=} dispatch
   * @param {boolean=} push
   * @return {!Context}
   * @api public
   */

  page.show = function(path, state, dispatch, push) {
    var ctx = new Context(path, state);
    page.current = ctx.path;
    if (false !== dispatch) page.dispatch(ctx);
    if (false !== ctx.handled && false !== push) ctx.pushState();
    return ctx;
  };

  /**
   * Goes back in the history
   * Back should always let the current route push state and then go back.
   *
   * @param {string} path - fallback path to go back if no more history exists, if undefined defaults to page.base
   * @param {Object=} state
   * @api public
   */

  page.back = function(path, state) {
    if (page.len > 0) {
      // this may need more testing to see if all browsers
      // wait for the next tick to go back in history
      history.back();
      page.len--;
    } else if (path) {
      setTimeout(function() {
        page.show(path, state);
      });
    }else{
      setTimeout(function() {
        page.show(base, state);
      });
    }
  };


  /**
   * Register route to redirect from one path to other
   * or just redirect to another route
   *
   * @param {string} from - if param 'to' is undefined redirects to 'from'
   * @param {string=} to
   * @api public
   */
  page.redirect = function(from, to) {
    // Define route from a path to another
    if ('string' === typeof from && 'string' === typeof to) {
      page(from, function(e) {
        setTimeout(function() {
          page.replace(/** @type {!string} */ (to));
        }, 0);
      });
    }

    // Wait for the push state and replace it with another
    if ('string' === typeof from && 'undefined' === typeof to) {
      setTimeout(function() {
        page.replace(from);
      }, 0);
    }
  };

  /**
   * Replace `path` with optional `state` object.
   *
   * @param {string} path
   * @param {Object=} state
   * @param {boolean=} init
   * @param {boolean=} dispatch
   * @return {!Context}
   * @api public
   */


  page.replace = function(path, state, init, dispatch) {
    var ctx = new Context(path, state);
    page.current = ctx.path;
    ctx.init = init;
    ctx.save(); // save before dispatching, which may redirect
    if (false !== dispatch) page.dispatch(ctx);
    return ctx;
  };

  /**
   * Dispatch the given `ctx`.
   *
   * @param {Context} ctx
   * @api private
   */
  page.dispatch = function(ctx) {
    var prev = prevContext,
      i = 0,
      j = 0;

    prevContext = ctx;

    function nextExit() {
      var fn = page.exits[j++];
      if (!fn) return nextEnter();
      fn(prev, nextExit);
    }

    function nextEnter() {
      var fn = page.callbacks[i++];

      if (ctx.path !== page.current) {
        ctx.handled = false;
        return;
      }
      if (!fn) return unhandled(ctx);
      fn(ctx, nextEnter);
    }

    if (prev) {
      nextExit();
    } else {
      nextEnter();
    }
  };

  /**
   * Unhandled `ctx`. When it's not the initial
   * popstate then redirect. If you wish to handle
   * 404s on your own use `page('*', callback)`.
   *
   * @param {Context} ctx
   * @api private
   */
  function unhandled(ctx) {
    if (ctx.handled) return;
    var current;

    if (hashbang) {
      current = base + location.hash.replace('#!', '');
    } else {
      current = location.pathname + location.search;
    }

    if (current === ctx.canonicalPath) return;
    page.stop();
    ctx.handled = false;
    location.href = ctx.canonicalPath;
  }

  /**
   * Register an exit route on `path` with
   * callback `fn()`, which will be called
   * on the previous context when a new
   * page is visited.
   */
  page.exit = function(path, fn) {
    if (typeof path === 'function') {
      return page.exit('*', path);
    }

    var route = new Route(path);
    for (var i = 1; i < arguments.length; ++i) {
      page.exits.push(route.middleware(arguments[i]));
    }
  };

  /**
   * Remove URL encoding from the given `str`.
   * Accommodates whitespace in both x-www-form-urlencoded
   * and regular percent-encoded form.
   *
   * @param {string} val - URL component to decode
   */
  function decodeURLEncodedURIComponent(val) {
    if (typeof val !== 'string') { return val; }
    return decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, ' ')) : val;
  }

  /**
   * Initialize a new "request" `Context`
   * with the given `path` and optional initial `state`.
   *
   * @constructor
   * @param {string} path
   * @param {Object=} state
   * @api public
   */

  function Context(path, state) {
    if ('/' === path[0] && 0 !== path.indexOf(base)) path = base + (hashbang ? '#!' : '') + path;
    var i = path.indexOf('?');

    this.canonicalPath = path;
    this.path = path.replace(base, '') || '/';
    if (hashbang) this.path = this.path.replace('#!', '') || '/';

    this.title = document.title;
    this.state = state || {};
    this.state.path = path;
    this.querystring = ~i ? decodeURLEncodedURIComponent(path.slice(i + 1)) : '';
    this.pathname = decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
    this.params = {};

    // fragment
    this.hash = '';
    if (!hashbang) {
      if (!~this.path.indexOf('#')) return;
      var parts = this.path.split('#');
      this.path = parts[0];
      this.hash = decodeURLEncodedURIComponent(parts[1]) || '';
      this.querystring = this.querystring.split('#')[0];
    }
  }

  /**
   * Expose `Context`.
   */

  page.Context = Context;

  /**
   * Push state.
   *
   * @api private
   */

  Context.prototype.pushState = function() {
    page.len++;
    history.pushState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };

  /**
   * Save the context state.
   *
   * @api public
   */

  Context.prototype.save = function() {
    history.replaceState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };

  /**
   * Initialize `Route` with the given HTTP `path`,
   * and an array of `callbacks` and `options`.
   *
   * Options:
   *
   *   - `sensitive`    enable case-sensitive routes
   *   - `strict`       enable strict matching for trailing slashes
   *
   * @constructor
   * @param {string} path
   * @param {Object=} options
   * @api private
   */

  function Route(path, options) {
    options = options || {};
    this.path = (path === '*') ? '(.*)' : path;
    this.method = 'GET';
    this.regexp = pathtoRegexp(this.path,
      this.keys = [],
      options);
  }

  /**
   * Expose `Route`.
   */

  page.Route = Route;

  /**
   * Return route middleware with
   * the given callback `fn()`.
   *
   * @param {Function} fn
   * @return {Function}
   * @api public
   */

  Route.prototype.middleware = function(fn) {
    var self = this;
    return function(ctx, next) {
      if (self.match(ctx.path, ctx.params)) return fn(ctx, next);
      next();
    };
  };

  /**
   * Check if this route matches `path`, if so
   * populate `params`.
   *
   * @param {string} path
   * @param {Object} params
   * @return {boolean}
   * @api private
   */

  Route.prototype.match = function(path, params) {
    var keys = this.keys,
      qsIndex = path.indexOf('?'),
      pathname = ~qsIndex ? path.slice(0, qsIndex) : path,
      m = this.regexp.exec(decodeURIComponent(pathname));

    if (!m) return false;

    for (var i = 1, len = m.length; i < len; ++i) {
      var key = keys[i - 1];
      var val = decodeURLEncodedURIComponent(m[i]);
      if (val !== undefined || !(hasOwnProperty.call(params, key.name))) {
        params[key.name] = val;
      }
    }

    return true;
  };


  /**
   * Handle "populate" events.
   */

  var onpopstate = (function () {
    var loaded = false;
    if ('undefined' === typeof window) {
      return;
    }
    if (document.readyState === 'complete') {
      loaded = true;
    } else {
      window.addEventListener('load', function() {
        setTimeout(function() {
          loaded = true;
        }, 0);
      });
    }
    return function onpopstate(e) {
      if (!loaded) return;
      if (e.state) {
        var path = e.state.path;
        page.replace(path, e.state);
      } else {
        page.show(location.pathname + location.hash, undefined, undefined, false);
      }
    };
  })();
  /**
   * Handle "click" events.
   */

  function onclick(e) {

    if (1 !== which(e)) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (e.defaultPrevented) return;



    // ensure link
    // use shadow dom when available
    var el = e.path ? e.path[0] : e.target;
    while (el && 'A' !== el.nodeName) el = el.parentNode;
    if (!el || 'A' !== el.nodeName) return;



    // Ignore if tag has
    // 1. "download" attribute
    // 2. rel="external" attribute
    if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;

    // ensure non-hash for the same path
    var link = el.getAttribute('href');
    if (!hashbang && el.pathname === location.pathname && (el.hash || '#' === link)) return;



    // Check for mailto: in the href
    if (link && link.indexOf('mailto:') > -1) return;

    // check target
    if (el.target) return;

    // x-origin
    if (!sameOrigin(el.href)) return;



    // rebuild path
    var path = el.pathname + el.search + (el.hash || '');

    // strip leading "/[drive letter]:" on NW.js on Windows
    if (typeof process !== 'undefined' && path.match(/^\/[a-zA-Z]:\//)) {
      path = path.replace(/^\/[a-zA-Z]:\//, '/');
    }

    // same page
    var orig = path;

    if (path.indexOf(base) === 0) {
      path = path.substr(base.length);
    }

    if (hashbang) path = path.replace('#!', '');

    if (base && orig === path) return;

    e.preventDefault();
    page.show(orig);
  }

  /**
   * Event button.
   */

  function which(e) {
    e = e || window.event;
    return null === e.which ? e.button : e.which;
  }

  /**
   * Check if `href` is the same origin.
   */

  function sameOrigin(href) {
    var origin = location.protocol + '//' + location.hostname;
    if (location.port) origin += ':' + location.port;
    return (href && (0 === href.indexOf(origin)));
  }

  page.sameOrigin = sameOrigin;

}).call(this,require('_process'))
},{"_process":13,"path-to-regexp":12}],11:[function(require,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],12:[function(require,module,exports){
var isarray = require('isarray')

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {String} str
 * @return {Array}
 */
function parse (str) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var suffix = res[6]
    var asterisk = res[7]

    var repeat = suffix === '+' || suffix === '*'
    var optional = suffix === '?' || suffix === '*'
    var delimiter = prefix || '/'
    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      pattern: escapeGroup(pattern)
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {String}   str
 * @return {Function}
 */
function compile (str) {
  return tokensToFunction(parse(str))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^' + tokens[i].pattern + '$')
    }
  }

  return function (obj) {
    var path = ''
    var data = obj || {}

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encodeURIComponent(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = encodeURIComponent(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {String} str
 * @return {String}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {String} group
 * @return {String}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {RegExp} re
 * @param  {Array}  keys
 * @return {RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {String}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {RegExp} path
 * @param  {Array}  keys
 * @return {RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {Array}  path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {String} path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function stringToRegexp (path, keys, options) {
  var tokens = parse(path)
  var re = tokensToRegExp(tokens, options)

  // Attach keys back to the regexp.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] !== 'string') {
      keys.push(tokens[i])
    }
  }

  return attachKeys(re, keys)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {Array}  tokens
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function tokensToRegExp (tokens, options) {
  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''
  var lastToken = tokens[tokens.length - 1]
  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = token.pattern

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (prefix) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithSlash ? '' : '(?=\\/|$)'
  }

  return new RegExp('^' + route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(String|RegExp|Array)} path
 * @param  {Array}                 [keys]
 * @param  {Object}                [options]
 * @return {RegExp}
 */
function pathToRegexp (path, keys, options) {
  keys = keys || []

  if (!isarray(keys)) {
    options = keys
    keys = []
  } else if (!options) {
    options = {}
  }

  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys, options)
  }

  if (isarray(path)) {
    return arrayToRegexp(path, keys, options)
  }

  return stringToRegexp(path, keys, options)
}

},{"isarray":11}],13:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],14:[function(require,module,exports){
var bel = require('bel') // turns template tag into DOM elements
var morphdom = require('morphdom') // efficiently diffs + morphs two DOM elements
var defaultEvents = require('./update-events.js') // default events to be copied when dom elements update

module.exports = bel

// TODO move this + defaultEvents to a new module once we receive more feedback
module.exports.update = function (fromNode, toNode, opts) {
  if (!opts) opts = {}
  if (opts.events !== false) {
    if (!opts.onBeforeElUpdated) opts.onBeforeElUpdated = copier
  }

  return morphdom(fromNode, toNode, opts)

  // morphdom only copies attributes. we decided we also wanted to copy events
  // that can be set via attributes
  function copier (f, t) {
    // copy events:
    var events = opts.events || defaultEvents
    for (var i = 0; i < events.length; i++) {
      var ev = events[i]
      if (t[ev]) { // if new element has a whitelisted attribute
        f[ev] = t[ev] // update existing element
      } else if (f[ev]) { // if existing element has it and new one doesnt
        f[ev] = undefined // remove it from existing element
      }
    }
    var oldValue = f.value
    var newValue = t.value
    // copy values for form elements
    if ((f.nodeName === 'INPUT' && f.type !== 'file') || f.nodeName === 'SELECT') {
      if (!newValue) {
        t.value = f.value
      } else if (newValue !== oldValue) {
        f.value = newValue
      }
    } else if (f.nodeName === 'TEXTAREA') {
      if (t.getAttribute('value') === null) f.value = t.value
    }
  }
}

},{"./update-events.js":15,"bel":1,"morphdom":8}],15:[function(require,module,exports){
module.exports = [
  // attribute events (can be set with attributes)
  'onclick',
  'ondblclick',
  'onmousedown',
  'onmouseup',
  'onmouseover',
  'onmousemove',
  'onmouseout',
  'ondragstart',
  'ondrag',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondrop',
  'ondragend',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onunload',
  'onabort',
  'onerror',
  'onresize',
  'onscroll',
  'onselect',
  'onchange',
  'onsubmit',
  'onreset',
  'onfocus',
  'onblur',
  'oninput',
  // other common events
  'oncontextmenu',
  'onfocusin',
  'onfocusout'
]

},{}],16:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['<article>\n\t\t\t\t\t<section class="redesSociales"> \n\t\t\t\t\t<div id ="rowShareFacebook" class="row align-center align-middle">\n\t\t\t\t\t\t<div id = "columnShareFacebook" class="columns">\n\t\t\t\t\t\t\t<button id="shareFB" class="button"> </button>\n\t\t\t\t\t\t</div>\t\n\t\t\t\t    </div>\t\n\t\t            </section>\n\t\t            <section class="fondo">                \n\t                 \t<div class="row align-center" id="camera">\n\t\t\t\t\t    \t<div id="calloutCamera" class="callout alert">\n\t\t\t\t\t        \t<a id="btnCameraCanvas" class="button"></a> \n\t\t\t\t\t        \t<canvas id="canvas"></canvas>\n\t\t\t\t\t      \t</div>\n\t\t\t\t\t      \t<div class="reveal" id="menuEmoticons" data-reveal data-closable>\n\t\t\t\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t\t\t  <div class="small-4 large-3 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnEmoticons1" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-4 large-3 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnEmoticons2" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-4 large-3 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnEmoticons3" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-4 large-3 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnEmoticons4" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-4 large-3 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnEmoticons5" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-4 large-3 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnEmoticons6" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t      \t<button class="close-button" data-close aria-label="Close modal" type="button" id="closeButtonEmoticons">\n\t\t\t\t\t\t   \t\t\t<span aria-hidden="true">x</span>\n\t\t\t\t\t\t  \t  \t</button>\n\t\t\t\t\t\t  \t</div>\n\t\t\t\t\t\t   \t<div class="reveal" id="menuLabels" data-reveal>\n\t\t\t\t\t\t   \t\t<div class="row">\n\t\t\t\t\t\t\t\t  <div class="small-6 large-6 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnLabel1" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-6 large-6 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnLabel2" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t      \t<button class="close-button" data-close aria-label="Close modal" type="button" id="closeButtonLabels">\n\t\t\t\t\t\t   \t\t\t<span aria-hidden="true">x</span>\n\t\t\t\t\t\t  \t  \t</button>\n\t\t\t\t\t\t  \t</div>\n\t\t\t\t\t\t  \t<div class="reveal" id="menuFilters" data-reveal>\n\t\t\t\t\t\t   \t\t<div class="row">\n\t\t\t\t\t\t\t\t  <div class="small-6 large-6 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnFilter1" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-6 large-6 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnFilter2" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-6 large-6 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnFilter3" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-6 large-6 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnFilter4" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-6 large-6 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnFilter5" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-6 large-6 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnFilter6" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t      \t<button class="close-button" data-close aria-label="Close modal" type="button" id="closeButtonFilters">\n\t\t\t\t\t\t   \t\t\t<span aria-hidden="true">x</span>\n\t\t\t\t\t\t  \t  \t</button>\n\t\t\t\t\t\t  \t</div>\n\t\t\t\t\t\t  \t\t<div class="reveal" id="menuPencils" data-reveal>\n\t\t\t\t\t\t   \t\t<div class="row">\n\t\t\t\t\t\t\t\t  <div class="small-4 large-4 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnColor1" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-4 large-4 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnColor2" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-4 large-4 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnColor3" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-4 large-4 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnColor4" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-4 large-4 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnColor5" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-4 large-4 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnColor6" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t      \t<button class="close-button" data-close aria-label="Close modal" type="button" id="closeButtonPencils">\n\t\t\t\t\t\t   \t\t\t<span aria-hidden="true">x</span>\n\t\t\t\t\t\t  \t  \t</button>\n\t\t\t\t\t\t  \t</div>\n\n\t\t\t\t\t    </div>\n\t                \t<div class="row align-center" id="panel">\n\t\t\t\t\t    \t<div id="calloutPanel" class="callout primary">\n\t\t\t\t\t      \t\t<div class="expanded button-group" id="controles"  >\n\t\t\t\t\t      \t\t\t<button id="btnClear" class="button">  </button>\n\t\t\t\t\t\t      \t\t<input type="file" capture="camera" accept="image/*" id="takePictureField" style="display: none;" />\n\t\t\t\t\t\t      \t\t<button class="button" id = "btnCamera" type="button" value="Camara" onclick="document.getElementById(\'takePictureField\').click();">  </button>\n\t\t\t\t\t\t      \t\t<button id="btnOk" class="button">  </button> \n\t\t\t\t\t      \t\t</div>\n\t\t\t\t\t        \t<div class="row" id="tools" >\n\t\t\t\t\t        \t\t<div id="colTools1" class="column small-3" data-open="menuFilters"> \n\t\t\t\t\t        \t\t  \t\t\n\t\t\t\t\t\t\t\t\t         <svg id ="btnFilters"  height="60px" width="60px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n\t\t\t\t\t\t\t\t\t\t\t    \n\t\t\t\t\t\t\t\t\t         <defs>\n\t\t\t\t\t\t\t\t\t\t        <circle id="path-1" cx="256" cy="256" r="256"/>\n\t\t\t\t\t\t\t\t\t\t    </defs>\n\t\t\t\t\t\t\t\t\t\t    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n\t\t\t\t\t\t\t\t\t\t        <g id="Artboard-3" transform="translate(-2411.000000, -702.000000)">\n\t\t\t\t\t\t\t\t\t\t            <g id="filter" transform="translate(2411.000000, 702.000000)">\n\t\t\t\t\t\t\t\t\t\t                <mask fill="white">\n\t\t\t\t\t\t\t\t\t\t                    <use xlink:href="#path-1"/>\n\t\t\t\t\t\t\t\t\t\t                </mask>\n\t\t\t\t\t\t\t\t\t\t                <use id="fillBtnFiltros" fill="#5C6BC0" xlink:href="#path-1"/>\n\t\t\t\t\t\t\t\t\t\t                <g id="Group" mask="url(#mask-2)">\n\t\t\t\t\t\t\t\t\t\t                    <g transform="translate(49.000000, 67.000000)">\n\t\t\t\t\t\t\t\t\t\t                        <g transform="translate(0.000000, 106.000000)">\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="fillBtnFiltrosRectangle" fill="#212121" points="17.8 299.8 0.4 282.4 232 51 249.5 68.4"/>\n\t\t\t\t\t\t\t\t\t\t                            <rect id="fillBtnFiltros1" fill="#F5F5F5" transform="translate(266.074325, 34.336595) rotate(45.000000) translate(-266.074325, -34.336595) " x="253.774443" y="-1.5130612" width="24.5997641" height="71.6993124"/>\n\t\t\t\t\t\t\t\t\t\t                        </g>\n\t\t\t\t\t\t\t\t\t\t                        <g transform="translate(161.000000, 0.000000)">\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#F5F5F5" points="48.3 0.9 59.6 11.1 74.4 7.6 68.2 21.5 76.2 34.5 61 32.9 51.1 44.5 48 29.6 33.9 23.7 47.1 16.1"/>\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#FFFFFF" points="18 74.4 14.3 79.3 16.2 85.1 10.4 83.1 5.5 86.8 5.6 80.6 0.6 77.1 6.4 75.3 8.3 69.4 11.8 74.5"/>\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#FFFFFF" points="59.8 123.8 53.9 131.5 57 140.8 47.8 137.6 40 143.4 40.2 133.7 32.2 128 41.5 125.2 44.5 115.9 50 123.9"/>\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#FFFFFF" points="100.9 93.9 97.2 98.8 99.1 104.6 93.3 102.6 88.4 106.3 88.5 100.1 83.5 96.5 89.4 94.7 91.2 88.9 94.7 93.9"/>\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#FFFFFF" points="136.5 38.6 130.6 46.4 133.7 55.6 124.5 52.4 116.7 58.2 116.9 48.5 109 42.8 118.3 40 121.2 30.7 126.8 38.7"/>\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#FFFFFF" points="205.8 20.7 200 34.8 208.3 47.5 193.1 46.4 183.6 58.2 180 43.4 165.7 38 178.7 30 179.5 14.8 191.1 24.6"/>\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#FFFFFF" points="171.1 97.4 167.4 102.3 169.3 108.2 163.5 106.2 158.6 109.8 158.7 103.7 153.7 100.1 159.6 98.3 161.4 92.5 164.9 97.5"/>\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#FFFFFF" points="244.5 85.2 240.8 90.1 242.8 95.9 237 93.9 232 97.6 232.1 91.4 227.1 87.9 233 86.1 234.8 80.2 238.4 85.2"/>\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#FFFFFF" points="176.1 148.2 170.3 156 173.4 165.2 164.2 162 156.4 167.8 156.5 158.1 148.6 152.4 157.9 149.6 160.8 140.3 166.4 148.3"/>\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#FFFFFF" points="256.1 148.1 249.3 161.7 256.7 175 241.6 172.8 231.3 183.9 228.7 168.9 214.9 162.5 228.4 155.4 230.3 140.3 241.2 151"/>\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#FFFFFF" points="159.7 205.8 158.5 221 170.3 230.6 155.5 234.2 150.1 248.4 142.1 235.4 126.9 234.6 136.8 223 132.8 208.3 146.9 214.1"/>\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#FFFFFF" points="235.8 221.2 230 229 233.1 238.2 223.9 235.1 216.1 240.9 216.2 231.1 208.3 225.5 217.6 222.6 220.5 213.4 226.1 221.3"/>\n\t\t\t\t\t\t\t\t\t\t                        </g>\n\t\t\t\t\t\t\t\t\t\t                    </g>\n\t\t\t\t\t\t\t\t\t\t                </g>\n\t\t\t\t\t\t\t\t\t\t            </g>\n\t\t\t\t\t\t\t\t\t\t        </g>\n\t\t\t\t\t\t\t\t\t\t    </g>\n\n\t\t\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t        \t\t</div>\n  \t\t\t\t\t\t\t\t\t<div id="colTools2" class="column small-3" data-open="menuEmoticons" > \n\t  \t\t\t\t\t\t\t\t\t <svg id ="btnEmoticons"  height="60px" width="60px" viewBox="0 0 127 127" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n\t\t\t\t\t\t\t\t\t\t\n\t  \t\t\t\t\t\t\t\t\t     <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n\t\t\t\t\t\t\t\t\t\t        <g id="Artboard-3" transform="translate(-1782.000000, -1176.000000)">\n\t\t\t\t\t\t\t\t\t\t            <g id="emoticon" transform="translate(1782.000000, 1176.000000)">\n\t\t\t\t\t\t\t\t\t\t                <circle id="fillBtnEmoticons" fill="#FFC10E" cx="63.5" cy="63.417" r="63.333"/>\n\t\t\t\t\t\t\t\t\t\t                <path d="M44.256,43.721 C49.7490241,43.721 54.202,39.5218787 54.202,34.342 C54.202,29.1621213 49.7490241,24.963 44.256,24.963 C38.7629759,24.963 34.31,29.1621213 34.31,34.342 C34.31,39.5218787 38.7629759,43.721 44.256,43.721 Z M63.499,114.677 C79.1325244,114.677 91.806,102.108737 91.806,86.605 C91.806,71.1012625 79.1325244,58.533 63.499,58.533 C47.8654756,58.533 35.192,71.1012625 35.192,86.605 C35.192,102.108737 47.8654756,114.677 63.499,114.677 Z M81.86,50.954 C91.0351065,50.954 98.473,43.5161065 98.473,34.341 C98.473,25.1658935 91.0351065,17.728 81.86,17.728 C72.6848935,17.728 65.247,25.1658935 65.247,34.341 C65.247,43.5161065 72.6848935,50.954 81.86,50.954 Z" id="fillBtnEmoticonsInside" fill="#333333"/>\n\t\t\t\t\t\t\t\t\t\t            </g>\n\t\t\t\t\t\t\t\t\t\t        </g>\n\t\t\t\t\t\t\t\t\t\t    </g>\n\t\t\t\t\t\t\t\t\t\t</svg>\n  \t\t\t\t\t\t\t\t\t</div>\n  \t\t\t\t\t\t\t\t\t<div id="colTools3" class="column small-3" data-open="menuLabels"> \n  \t\t\t\t\t\t\t\t\n  \t\t\t\t\t\t\t\t     <svg id ="btnLabels"  height="60px" width="60px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n\t\t\t\t\t\t\t\t\t\t\t    <circle id="path-1" cx="256" cy="256" r="256"/>\n\t\t\t\t\t\t\t\t\t\t\t    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n\t\t\t\t\t\t\t\t\t\t\t        <g id="Artboard-3" transform="translate(-1589.000000, -530.000000)">\n\t\t\t\t\t\t\t\t\t\t\t            <g id="text" transform="translate(1589.000000, 530.000000)">\n\t\t\t\t\t\t\t\t\t\t\t                <mask id="mask-2" fill="white">\n\t\t\t\t\t\t\t\t\t\t\t                    <use xlink:href="#path-1"/>\n\t\t\t\t\t\t\t\t\t\t\t                </mask>\n\t\t\t\t\t\t\t\t\t\t\t                <use id="fillBtnLabels" fill="#F6A623" xlink:href="#path-1"/>\n\t\t\t\t\t\t\t\t\t\t\t                <path d="M338.544218,145.5 L273.857143,145.5 L273.857143,366 L322.809524,378.25 L322.809524,390.5 L188.190476,390.5 L188.190476,378.25 L237.142857,366 L237.142857,145.5 L172.455782,145.5 L163.714286,206.75 L139.238095,206.75 L139.238095,121 L157.595238,121 L353.404762,121 L371.761905,121 L371.761905,206.75 L347.285714,206.75 L338.544218,145.5 Z" id="Combined-Shape" fill="#FFFFFF" mask="url(#mask-2)"/>\n\t\t\t\t\t\t\t\t\t\t\t            </g>\n\t\t\t\t\t\t\t\t\t\t\t        </g>\n\t\t\t\t\t\t\t\t\t\t\t    </g>\n\t\t\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t        \t\t   \n\t\t\t\t\t        \t\t</div>\n  \t\t\t\t\t\t\t\t\t<div id="colTools4" class="column small-3" data-open="menuPencils"> \n  \t\t\t\t\t\t\t\t\t    <svg id ="btnPencils"  height="60px" width="60px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n\t\t\t\t\t\t\t\t\t\t\t<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n\t\t\t\t\t\t\t\t\t\t        <g id="Artboard-3" transform="translate(-2462.000000, -1285.000000)">\n\t\t\t\t\t\t\t\t\t\t            <g id="pencil" transform="translate(2462.000000, 1285.000000)">\n\t\t\t\t\t\t\t\t\t\t                <circle id="fillBtnPencils" fill="#FC5454" cx="256" cy="256" r="256"/>\n\t\t\t\t\t\t\t\t\t\t                <g id="Painting_Tools" transform="translate(132.000000, 128.000000)">\n\t\t\t\t\t\t\t\t\t\t                    <g id="Painting_Tools_1_">\n\t\t\t\t\t\t\t\t\t\t                        <g id="Pallet">\n\t\t\t\t\t\t\t\t\t\t                            <path d="M226.947,121.323 C187.947,116.823 142.947,188.823 115.114,135.489 C98.175,103.031 158.705,87.411 173.114,58.823 C199.197,7.073 136.665,0.597 127.566,0.597 C57.204,0.597 0.164,57.637 0.164,127.999 C0.164,198.361 57.204,255.401 127.566,255.401 C176.683,255.401 219.301,227.602 240.564,186.883 C250.683,162.947 253.567,124.395 226.947,121.323 Z" id="Shape" fill="#F1F2F2"/>\n\t\t\t\t\t\t\t\t\t\t                            <circle id="fillBtnPencilsOval1" fill="#6CBE45" cx="107.802" cy="34.23" r="20.978"/>\n\t\t\t\t\t\t\t\t\t\t                            <circle id="fillBtnPencilsOval2" fill="#F7EC23" cx="42.947" cy="90.323" r="20.978"/>\n\t\t\t\t\t\t\t\t\t\t                            <circle id="fillBtnPencilsOval3" fill="#EE2435" cx="42.947" cy="170.823" r="20.978"/>\n\t\t\t\t\t\t\t\t\t\t                            <circle id="fillBtnPencilsOval4" fill="#71D0F6" cx="119.694" cy="225.823" r="20.978"/>\n\t\t\t\t\t\t\t\t\t\t                            <circle id="fillBtnPencilsOval5" fill="#9C6FB0" cx="202.947" cy="181.823" r="20.978"/>\n\t\t\t\t\t\t\t\t\t\t                        </g>\n\t\t\t\t\t\t\t\t\t\t                        <g id="Brush" transform="translate(75.000000, 43.000000)">\n\t\t\t\t\t\t\t\t\t\t                            <path d="M152.268,18.259 C157.888,12.219 161.516,6.308 160.331,5.122 C159.146,3.936 157.204,1.996 156.018,0.809 C154.832,-0.378 148.92,3.251 142.881,8.872 L40.58,104.072 C34.541,109.692 31.54,116.231 33.912,118.603 C36.284,120.975 40.165,124.857 42.537,127.228 C44.909,129.6 51.448,126.599 57.068,120.56 L152.268,18.259 Z" id="pencilBarra1" fill="#000000"/>\n\t\t\t\t\t\t\t\t\t\t                            <path d="M46.884,114.255 C40.978,108.35 31.3,108.453 25.265,114.486 L35.958,125.18 L46.651,135.873 C52.687,129.84 52.79,120.161 46.884,114.255 Z" id="pencilBarra2" fill="#000000"/>\n\t\t\t\t\t\t\t\t\t\t                            <path d="M25.469,114.689 C25.469,114.689 -6.306,125.509 1.744,159.8 C1.744,159.8 8.827,154.661 18.648,154.778 C42.374,155.139 46.855,136.076 46.855,136.076 L25.469,114.689 Z" id="pencilBarra3" fill="#DB8F27"/>\n\t\t\t\t\t\t\t\t\t\t                        </g>\n\t\t\t\t\t\t\t\t\t\t                    </g>\n\t\t\t\t\t\t\t\t\t\t                </g>\n\t\t\t\t\t\t\t\t\t\t            </g>\n\t\t\t\t\t\t\t\t\t\t        </g>\n\t\t\t\t\t\t\t\t\t\t    </g>   \n\n\t\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\t\n  \t\t\t\t\t\t\t\t\t</div>\n\n  \t\t\t\t\t\t\t\t\t\n\t\t\t\t\t        \t</div>\n\t\t\t\t\t    \t</div>\n\t\t\t\t\t    </div>\n\t\t\t\t\t \n\t                </section>\n\t                  \n                  </article>\n\t            '], ['<article>\n\t\t\t\t\t<section class="redesSociales"> \n\t\t\t\t\t<div id ="rowShareFacebook" class="row align-center align-middle">\n\t\t\t\t\t\t<div id = "columnShareFacebook" class="columns">\n\t\t\t\t\t\t\t<button id="shareFB" class="button"> </button>\n\t\t\t\t\t\t</div>\t\n\t\t\t\t    </div>\t\n\t\t            </section>\n\t\t            <section class="fondo">                \n\t                 \t<div class="row align-center" id="camera">\n\t\t\t\t\t    \t<div id="calloutCamera" class="callout alert">\n\t\t\t\t\t        \t<a id="btnCameraCanvas" class="button"></a> \n\t\t\t\t\t        \t<canvas id="canvas"></canvas>\n\t\t\t\t\t      \t</div>\n\t\t\t\t\t      \t<div class="reveal" id="menuEmoticons" data-reveal data-closable>\n\t\t\t\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t\t\t  <div class="small-4 large-3 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnEmoticons1" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-4 large-3 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnEmoticons2" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-4 large-3 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnEmoticons3" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-4 large-3 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnEmoticons4" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-4 large-3 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnEmoticons5" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-4 large-3 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnEmoticons6" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t      \t<button class="close-button" data-close aria-label="Close modal" type="button" id="closeButtonEmoticons">\n\t\t\t\t\t\t   \t\t\t<span aria-hidden="true">x</span>\n\t\t\t\t\t\t  \t  \t</button>\n\t\t\t\t\t\t  \t</div>\n\t\t\t\t\t\t   \t<div class="reveal" id="menuLabels" data-reveal>\n\t\t\t\t\t\t   \t\t<div class="row">\n\t\t\t\t\t\t\t\t  <div class="small-6 large-6 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnLabel1" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-6 large-6 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnLabel2" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t      \t<button class="close-button" data-close aria-label="Close modal" type="button" id="closeButtonLabels">\n\t\t\t\t\t\t   \t\t\t<span aria-hidden="true">x</span>\n\t\t\t\t\t\t  \t  \t</button>\n\t\t\t\t\t\t  \t</div>\n\t\t\t\t\t\t  \t<div class="reveal" id="menuFilters" data-reveal>\n\t\t\t\t\t\t   \t\t<div class="row">\n\t\t\t\t\t\t\t\t  <div class="small-6 large-6 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnFilter1" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-6 large-6 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnFilter2" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-6 large-6 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnFilter3" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-6 large-6 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnFilter4" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-6 large-6 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnFilter5" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-6 large-6 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnFilter6" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t      \t<button class="close-button" data-close aria-label="Close modal" type="button" id="closeButtonFilters">\n\t\t\t\t\t\t   \t\t\t<span aria-hidden="true">x</span>\n\t\t\t\t\t\t  \t  \t</button>\n\t\t\t\t\t\t  \t</div>\n\t\t\t\t\t\t  \t\t<div class="reveal" id="menuPencils" data-reveal>\n\t\t\t\t\t\t   \t\t<div class="row">\n\t\t\t\t\t\t\t\t  <div class="small-4 large-4 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnColor1" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-4 large-4 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnColor2" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-4 large-4 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnColor3" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-4 large-4 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnColor4" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-4 large-4 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnColor5" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t  <div class="small-4 large-4 columns">\n\t\t\t\t\t\t\t\t\t<a id="btnColor6" class="button"></a>\n\t\t\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t      \t<button class="close-button" data-close aria-label="Close modal" type="button" id="closeButtonPencils">\n\t\t\t\t\t\t   \t\t\t<span aria-hidden="true">x</span>\n\t\t\t\t\t\t  \t  \t</button>\n\t\t\t\t\t\t  \t</div>\n\n\t\t\t\t\t    </div>\n\t                \t<div class="row align-center" id="panel">\n\t\t\t\t\t    \t<div id="calloutPanel" class="callout primary">\n\t\t\t\t\t      \t\t<div class="expanded button-group" id="controles"  >\n\t\t\t\t\t      \t\t\t<button id="btnClear" class="button">  </button>\n\t\t\t\t\t\t      \t\t<input type="file" capture="camera" accept="image/*" id="takePictureField" style="display: none;" />\n\t\t\t\t\t\t      \t\t<button class="button" id = "btnCamera" type="button" value="Camara" onclick="document.getElementById(\'takePictureField\').click();">  </button>\n\t\t\t\t\t\t      \t\t<button id="btnOk" class="button">  </button> \n\t\t\t\t\t      \t\t</div>\n\t\t\t\t\t        \t<div class="row" id="tools" >\n\t\t\t\t\t        \t\t<div id="colTools1" class="column small-3" data-open="menuFilters"> \n\t\t\t\t\t        \t\t  \t\t\n\t\t\t\t\t\t\t\t\t         <svg id ="btnFilters"  height="60px" width="60px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n\t\t\t\t\t\t\t\t\t\t\t    \n\t\t\t\t\t\t\t\t\t         <defs>\n\t\t\t\t\t\t\t\t\t\t        <circle id="path-1" cx="256" cy="256" r="256"/>\n\t\t\t\t\t\t\t\t\t\t    </defs>\n\t\t\t\t\t\t\t\t\t\t    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n\t\t\t\t\t\t\t\t\t\t        <g id="Artboard-3" transform="translate(-2411.000000, -702.000000)">\n\t\t\t\t\t\t\t\t\t\t            <g id="filter" transform="translate(2411.000000, 702.000000)">\n\t\t\t\t\t\t\t\t\t\t                <mask fill="white">\n\t\t\t\t\t\t\t\t\t\t                    <use xlink:href="#path-1"/>\n\t\t\t\t\t\t\t\t\t\t                </mask>\n\t\t\t\t\t\t\t\t\t\t                <use id="fillBtnFiltros" fill="#5C6BC0" xlink:href="#path-1"/>\n\t\t\t\t\t\t\t\t\t\t                <g id="Group" mask="url(#mask-2)">\n\t\t\t\t\t\t\t\t\t\t                    <g transform="translate(49.000000, 67.000000)">\n\t\t\t\t\t\t\t\t\t\t                        <g transform="translate(0.000000, 106.000000)">\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="fillBtnFiltrosRectangle" fill="#212121" points="17.8 299.8 0.4 282.4 232 51 249.5 68.4"/>\n\t\t\t\t\t\t\t\t\t\t                            <rect id="fillBtnFiltros1" fill="#F5F5F5" transform="translate(266.074325, 34.336595) rotate(45.000000) translate(-266.074325, -34.336595) " x="253.774443" y="-1.5130612" width="24.5997641" height="71.6993124"/>\n\t\t\t\t\t\t\t\t\t\t                        </g>\n\t\t\t\t\t\t\t\t\t\t                        <g transform="translate(161.000000, 0.000000)">\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#F5F5F5" points="48.3 0.9 59.6 11.1 74.4 7.6 68.2 21.5 76.2 34.5 61 32.9 51.1 44.5 48 29.6 33.9 23.7 47.1 16.1"/>\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#FFFFFF" points="18 74.4 14.3 79.3 16.2 85.1 10.4 83.1 5.5 86.8 5.6 80.6 0.6 77.1 6.4 75.3 8.3 69.4 11.8 74.5"/>\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#FFFFFF" points="59.8 123.8 53.9 131.5 57 140.8 47.8 137.6 40 143.4 40.2 133.7 32.2 128 41.5 125.2 44.5 115.9 50 123.9"/>\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#FFFFFF" points="100.9 93.9 97.2 98.8 99.1 104.6 93.3 102.6 88.4 106.3 88.5 100.1 83.5 96.5 89.4 94.7 91.2 88.9 94.7 93.9"/>\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#FFFFFF" points="136.5 38.6 130.6 46.4 133.7 55.6 124.5 52.4 116.7 58.2 116.9 48.5 109 42.8 118.3 40 121.2 30.7 126.8 38.7"/>\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#FFFFFF" points="205.8 20.7 200 34.8 208.3 47.5 193.1 46.4 183.6 58.2 180 43.4 165.7 38 178.7 30 179.5 14.8 191.1 24.6"/>\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#FFFFFF" points="171.1 97.4 167.4 102.3 169.3 108.2 163.5 106.2 158.6 109.8 158.7 103.7 153.7 100.1 159.6 98.3 161.4 92.5 164.9 97.5"/>\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#FFFFFF" points="244.5 85.2 240.8 90.1 242.8 95.9 237 93.9 232 97.6 232.1 91.4 227.1 87.9 233 86.1 234.8 80.2 238.4 85.2"/>\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#FFFFFF" points="176.1 148.2 170.3 156 173.4 165.2 164.2 162 156.4 167.8 156.5 158.1 148.6 152.4 157.9 149.6 160.8 140.3 166.4 148.3"/>\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#FFFFFF" points="256.1 148.1 249.3 161.7 256.7 175 241.6 172.8 231.3 183.9 228.7 168.9 214.9 162.5 228.4 155.4 230.3 140.3 241.2 151"/>\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#FFFFFF" points="159.7 205.8 158.5 221 170.3 230.6 155.5 234.2 150.1 248.4 142.1 235.4 126.9 234.6 136.8 223 132.8 208.3 146.9 214.1"/>\n\t\t\t\t\t\t\t\t\t\t                            <polygon id="Shape" fill="#FFFFFF" points="235.8 221.2 230 229 233.1 238.2 223.9 235.1 216.1 240.9 216.2 231.1 208.3 225.5 217.6 222.6 220.5 213.4 226.1 221.3"/>\n\t\t\t\t\t\t\t\t\t\t                        </g>\n\t\t\t\t\t\t\t\t\t\t                    </g>\n\t\t\t\t\t\t\t\t\t\t                </g>\n\t\t\t\t\t\t\t\t\t\t            </g>\n\t\t\t\t\t\t\t\t\t\t        </g>\n\t\t\t\t\t\t\t\t\t\t    </g>\n\n\t\t\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t        \t\t</div>\n  \t\t\t\t\t\t\t\t\t<div id="colTools2" class="column small-3" data-open="menuEmoticons" > \n\t  \t\t\t\t\t\t\t\t\t <svg id ="btnEmoticons"  height="60px" width="60px" viewBox="0 0 127 127" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n\t\t\t\t\t\t\t\t\t\t\n\t  \t\t\t\t\t\t\t\t\t     <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n\t\t\t\t\t\t\t\t\t\t        <g id="Artboard-3" transform="translate(-1782.000000, -1176.000000)">\n\t\t\t\t\t\t\t\t\t\t            <g id="emoticon" transform="translate(1782.000000, 1176.000000)">\n\t\t\t\t\t\t\t\t\t\t                <circle id="fillBtnEmoticons" fill="#FFC10E" cx="63.5" cy="63.417" r="63.333"/>\n\t\t\t\t\t\t\t\t\t\t                <path d="M44.256,43.721 C49.7490241,43.721 54.202,39.5218787 54.202,34.342 C54.202,29.1621213 49.7490241,24.963 44.256,24.963 C38.7629759,24.963 34.31,29.1621213 34.31,34.342 C34.31,39.5218787 38.7629759,43.721 44.256,43.721 Z M63.499,114.677 C79.1325244,114.677 91.806,102.108737 91.806,86.605 C91.806,71.1012625 79.1325244,58.533 63.499,58.533 C47.8654756,58.533 35.192,71.1012625 35.192,86.605 C35.192,102.108737 47.8654756,114.677 63.499,114.677 Z M81.86,50.954 C91.0351065,50.954 98.473,43.5161065 98.473,34.341 C98.473,25.1658935 91.0351065,17.728 81.86,17.728 C72.6848935,17.728 65.247,25.1658935 65.247,34.341 C65.247,43.5161065 72.6848935,50.954 81.86,50.954 Z" id="fillBtnEmoticonsInside" fill="#333333"/>\n\t\t\t\t\t\t\t\t\t\t            </g>\n\t\t\t\t\t\t\t\t\t\t        </g>\n\t\t\t\t\t\t\t\t\t\t    </g>\n\t\t\t\t\t\t\t\t\t\t</svg>\n  \t\t\t\t\t\t\t\t\t</div>\n  \t\t\t\t\t\t\t\t\t<div id="colTools3" class="column small-3" data-open="menuLabels"> \n  \t\t\t\t\t\t\t\t\n  \t\t\t\t\t\t\t\t     <svg id ="btnLabels"  height="60px" width="60px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n\t\t\t\t\t\t\t\t\t\t\t    <circle id="path-1" cx="256" cy="256" r="256"/>\n\t\t\t\t\t\t\t\t\t\t\t    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n\t\t\t\t\t\t\t\t\t\t\t        <g id="Artboard-3" transform="translate(-1589.000000, -530.000000)">\n\t\t\t\t\t\t\t\t\t\t\t            <g id="text" transform="translate(1589.000000, 530.000000)">\n\t\t\t\t\t\t\t\t\t\t\t                <mask id="mask-2" fill="white">\n\t\t\t\t\t\t\t\t\t\t\t                    <use xlink:href="#path-1"/>\n\t\t\t\t\t\t\t\t\t\t\t                </mask>\n\t\t\t\t\t\t\t\t\t\t\t                <use id="fillBtnLabels" fill="#F6A623" xlink:href="#path-1"/>\n\t\t\t\t\t\t\t\t\t\t\t                <path d="M338.544218,145.5 L273.857143,145.5 L273.857143,366 L322.809524,378.25 L322.809524,390.5 L188.190476,390.5 L188.190476,378.25 L237.142857,366 L237.142857,145.5 L172.455782,145.5 L163.714286,206.75 L139.238095,206.75 L139.238095,121 L157.595238,121 L353.404762,121 L371.761905,121 L371.761905,206.75 L347.285714,206.75 L338.544218,145.5 Z" id="Combined-Shape" fill="#FFFFFF" mask="url(#mask-2)"/>\n\t\t\t\t\t\t\t\t\t\t\t            </g>\n\t\t\t\t\t\t\t\t\t\t\t        </g>\n\t\t\t\t\t\t\t\t\t\t\t    </g>\n\t\t\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t        \t\t   \n\t\t\t\t\t        \t\t</div>\n  \t\t\t\t\t\t\t\t\t<div id="colTools4" class="column small-3" data-open="menuPencils"> \n  \t\t\t\t\t\t\t\t\t    <svg id ="btnPencils"  height="60px" width="60px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n\t\t\t\t\t\t\t\t\t\t\t<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n\t\t\t\t\t\t\t\t\t\t        <g id="Artboard-3" transform="translate(-2462.000000, -1285.000000)">\n\t\t\t\t\t\t\t\t\t\t            <g id="pencil" transform="translate(2462.000000, 1285.000000)">\n\t\t\t\t\t\t\t\t\t\t                <circle id="fillBtnPencils" fill="#FC5454" cx="256" cy="256" r="256"/>\n\t\t\t\t\t\t\t\t\t\t                <g id="Painting_Tools" transform="translate(132.000000, 128.000000)">\n\t\t\t\t\t\t\t\t\t\t                    <g id="Painting_Tools_1_">\n\t\t\t\t\t\t\t\t\t\t                        <g id="Pallet">\n\t\t\t\t\t\t\t\t\t\t                            <path d="M226.947,121.323 C187.947,116.823 142.947,188.823 115.114,135.489 C98.175,103.031 158.705,87.411 173.114,58.823 C199.197,7.073 136.665,0.597 127.566,0.597 C57.204,0.597 0.164,57.637 0.164,127.999 C0.164,198.361 57.204,255.401 127.566,255.401 C176.683,255.401 219.301,227.602 240.564,186.883 C250.683,162.947 253.567,124.395 226.947,121.323 Z" id="Shape" fill="#F1F2F2"/>\n\t\t\t\t\t\t\t\t\t\t                            <circle id="fillBtnPencilsOval1" fill="#6CBE45" cx="107.802" cy="34.23" r="20.978"/>\n\t\t\t\t\t\t\t\t\t\t                            <circle id="fillBtnPencilsOval2" fill="#F7EC23" cx="42.947" cy="90.323" r="20.978"/>\n\t\t\t\t\t\t\t\t\t\t                            <circle id="fillBtnPencilsOval3" fill="#EE2435" cx="42.947" cy="170.823" r="20.978"/>\n\t\t\t\t\t\t\t\t\t\t                            <circle id="fillBtnPencilsOval4" fill="#71D0F6" cx="119.694" cy="225.823" r="20.978"/>\n\t\t\t\t\t\t\t\t\t\t                            <circle id="fillBtnPencilsOval5" fill="#9C6FB0" cx="202.947" cy="181.823" r="20.978"/>\n\t\t\t\t\t\t\t\t\t\t                        </g>\n\t\t\t\t\t\t\t\t\t\t                        <g id="Brush" transform="translate(75.000000, 43.000000)">\n\t\t\t\t\t\t\t\t\t\t                            <path d="M152.268,18.259 C157.888,12.219 161.516,6.308 160.331,5.122 C159.146,3.936 157.204,1.996 156.018,0.809 C154.832,-0.378 148.92,3.251 142.881,8.872 L40.58,104.072 C34.541,109.692 31.54,116.231 33.912,118.603 C36.284,120.975 40.165,124.857 42.537,127.228 C44.909,129.6 51.448,126.599 57.068,120.56 L152.268,18.259 Z" id="pencilBarra1" fill="#000000"/>\n\t\t\t\t\t\t\t\t\t\t                            <path d="M46.884,114.255 C40.978,108.35 31.3,108.453 25.265,114.486 L35.958,125.18 L46.651,135.873 C52.687,129.84 52.79,120.161 46.884,114.255 Z" id="pencilBarra2" fill="#000000"/>\n\t\t\t\t\t\t\t\t\t\t                            <path d="M25.469,114.689 C25.469,114.689 -6.306,125.509 1.744,159.8 C1.744,159.8 8.827,154.661 18.648,154.778 C42.374,155.139 46.855,136.076 46.855,136.076 L25.469,114.689 Z" id="pencilBarra3" fill="#DB8F27"/>\n\t\t\t\t\t\t\t\t\t\t                        </g>\n\t\t\t\t\t\t\t\t\t\t                    </g>\n\t\t\t\t\t\t\t\t\t\t                </g>\n\t\t\t\t\t\t\t\t\t\t            </g>\n\t\t\t\t\t\t\t\t\t\t        </g>\n\t\t\t\t\t\t\t\t\t\t    </g>   \n\n\t\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\t\n  \t\t\t\t\t\t\t\t\t</div>\n\n  \t\t\t\t\t\t\t\t\t\n\t\t\t\t\t        \t</div>\n\t\t\t\t\t    \t</div>\n\t\t\t\t\t    </div>\n\t\t\t\t\t \n\t                </section>\n\t                  \n                  </article>\n\t            ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var page = require('page');
var yo = require('yo-yo');
var empty = require('empty-element');

var main = document.getElementById('main-container');

page('/', function (ctx, next) {
	var el = yo(_templateObject);
	empty(main).appendChild(el);
});

page();

},{"empty-element":3,"page":10,"yo-yo":14}]},{},[16]);
