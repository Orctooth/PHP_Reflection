/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(5);
var objectDefinePropertyModile = __webpack_require__(20);

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperty: objectDefinePropertyModile.f
});


/***/ }),
/* 2 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(3);
var getOwnPropertyDescriptor = __webpack_require__(4).f;
var createNonEnumerableProperty = __webpack_require__(19);
var redefine = __webpack_require__(22);
var setGlobal = __webpack_require__(23);
var copyConstructorProperties = __webpack_require__(33);
var isForced = __webpack_require__(45);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),
/* 3 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(5);
var propertyIsEnumerableModule = __webpack_require__(7);
var createPropertyDescriptor = __webpack_require__(8);
var toIndexedObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(13);
var has = __webpack_require__(15);
var IE8_DOM_DEFINE = __webpack_require__(17);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),
/* 5 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(6);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),
/* 6 */
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),
/* 8 */
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 9 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(10);
var requireObjectCoercible = __webpack_require__(12);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),
/* 10 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(6);
var classof = __webpack_require__(11);

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),
/* 11 */
/***/ (function(module) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 12 */
/***/ (function(module) {

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),
/* 13 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(14);

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 14 */
/***/ (function(module) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 15 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toObject = __webpack_require__(16);

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};


/***/ }),
/* 16 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(12);

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),
/* 17 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(5);
var fails = __webpack_require__(6);
var createElement = __webpack_require__(18);

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),
/* 18 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(3);
var isObject = __webpack_require__(14);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),
/* 19 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(5);
var definePropertyModule = __webpack_require__(20);
var createPropertyDescriptor = __webpack_require__(8);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(5);
var IE8_DOM_DEFINE = __webpack_require__(17);
var anObject = __webpack_require__(21);
var toPrimitive = __webpack_require__(13);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 21 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(14);

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),
/* 22 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(3);
var createNonEnumerableProperty = __webpack_require__(19);
var has = __webpack_require__(15);
var setGlobal = __webpack_require__(23);
var inspectSource = __webpack_require__(24);
var InternalStateModule = __webpack_require__(26);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) {
      createNonEnumerableProperty(value, 'name', key);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),
/* 23 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(3);
var createNonEnumerableProperty = __webpack_require__(19);

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),
/* 24 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var store = __webpack_require__(25);

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),
/* 25 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(3);
var setGlobal = __webpack_require__(23);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),
/* 26 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(27);
var global = __webpack_require__(3);
var isObject = __webpack_require__(14);
var createNonEnumerableProperty = __webpack_require__(19);
var objectHas = __webpack_require__(15);
var shared = __webpack_require__(25);
var sharedKey = __webpack_require__(28);
var hiddenKeys = __webpack_require__(32);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),
/* 27 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(3);
var inspectSource = __webpack_require__(24);

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),
/* 28 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(29);
var uid = __webpack_require__(31);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),
/* 29 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var IS_PURE = __webpack_require__(30);
var store = __webpack_require__(25);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.12.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 30 */
/***/ (function(module) {

module.exports = false;


/***/ }),
/* 31 */
/***/ (function(module) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),
/* 32 */
/***/ (function(module) {

module.exports = {};


/***/ }),
/* 33 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var has = __webpack_require__(15);
var ownKeys = __webpack_require__(34);
var getOwnPropertyDescriptorModule = __webpack_require__(4);
var definePropertyModule = __webpack_require__(20);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),
/* 34 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(35);
var getOwnPropertyNamesModule = __webpack_require__(37);
var getOwnPropertySymbolsModule = __webpack_require__(44);
var anObject = __webpack_require__(21);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),
/* 35 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var path = __webpack_require__(36);
var global = __webpack_require__(3);

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),
/* 36 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(3);

module.exports = global;


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(38);
var enumBugKeys = __webpack_require__(43);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),
/* 38 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var has = __webpack_require__(15);
var toIndexedObject = __webpack_require__(9);
var indexOf = __webpack_require__(39).indexOf;
var hiddenKeys = __webpack_require__(32);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 39 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(9);
var toLength = __webpack_require__(40);
var toAbsoluteIndex = __webpack_require__(42);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),
/* 40 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toInteger = __webpack_require__(41);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),
/* 41 */
/***/ (function(module) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),
/* 42 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toInteger = __webpack_require__(41);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),
/* 43 */
/***/ (function(module) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 45 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(6);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var global = __webpack_require__(3);
var getBuiltIn = __webpack_require__(35);
var IS_PURE = __webpack_require__(30);
var DESCRIPTORS = __webpack_require__(5);
var NATIVE_SYMBOL = __webpack_require__(47);
var USE_SYMBOL_AS_UID = __webpack_require__(50);
var fails = __webpack_require__(6);
var has = __webpack_require__(15);
var isArray = __webpack_require__(51);
var isObject = __webpack_require__(14);
var anObject = __webpack_require__(21);
var toObject = __webpack_require__(16);
var toIndexedObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(13);
var createPropertyDescriptor = __webpack_require__(8);
var nativeObjectCreate = __webpack_require__(52);
var objectKeys = __webpack_require__(54);
var getOwnPropertyNamesModule = __webpack_require__(37);
var getOwnPropertyNamesExternal = __webpack_require__(56);
var getOwnPropertySymbolsModule = __webpack_require__(44);
var getOwnPropertyDescriptorModule = __webpack_require__(4);
var definePropertyModule = __webpack_require__(20);
var propertyIsEnumerableModule = __webpack_require__(7);
var createNonEnumerableProperty = __webpack_require__(19);
var redefine = __webpack_require__(22);
var shared = __webpack_require__(29);
var sharedKey = __webpack_require__(28);
var hiddenKeys = __webpack_require__(32);
var uid = __webpack_require__(31);
var wellKnownSymbol = __webpack_require__(57);
var wrappedWellKnownSymbolModule = __webpack_require__(58);
var defineWellKnownSymbol = __webpack_require__(59);
var setToStringTag = __webpack_require__(60);
var InternalStateModule = __webpack_require__(26);
var $forEach = __webpack_require__(61).forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.es/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),
/* 47 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(48);
var fails = __webpack_require__(6);

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  return !String(Symbol()) ||
    // Chrome 38 Symbol has incorrect toString conversion
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),
/* 48 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(3);
var userAgent = __webpack_require__(49);

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),
/* 49 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(35);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),
/* 50 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(47);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),
/* 51 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(11);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),
/* 52 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var anObject = __webpack_require__(21);
var defineProperties = __webpack_require__(53);
var enumBugKeys = __webpack_require__(43);
var hiddenKeys = __webpack_require__(32);
var html = __webpack_require__(55);
var documentCreateElement = __webpack_require__(18);
var sharedKey = __webpack_require__(28);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject -- old IE */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),
/* 53 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(5);
var definePropertyModule = __webpack_require__(20);
var anObject = __webpack_require__(21);
var objectKeys = __webpack_require__(54);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),
/* 54 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(38);
var enumBugKeys = __webpack_require__(43);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),
/* 55 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(35);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),
/* 56 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-object-getownpropertynames -- safe */
var toIndexedObject = __webpack_require__(9);
var $getOwnPropertyNames = __webpack_require__(37).f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};


/***/ }),
/* 57 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(3);
var shared = __webpack_require__(29);
var has = __webpack_require__(15);
var uid = __webpack_require__(31);
var NATIVE_SYMBOL = __webpack_require__(47);
var USE_SYMBOL_AS_UID = __webpack_require__(50);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && has(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(57);

exports.f = wellKnownSymbol;


/***/ }),
/* 59 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var path = __webpack_require__(36);
var has = __webpack_require__(15);
var wrappedWellKnownSymbolModule = __webpack_require__(58);
var defineProperty = __webpack_require__(20).f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),
/* 60 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var defineProperty = __webpack_require__(20).f;
var has = __webpack_require__(15);
var wellKnownSymbol = __webpack_require__(57);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),
/* 61 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var bind = __webpack_require__(62);
var IndexedObject = __webpack_require__(10);
var toObject = __webpack_require__(16);
var toLength = __webpack_require__(40);
var arraySpeciesCreate = __webpack_require__(64);

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_OUT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push.call(target, value); // filterOut
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterOut` method
  // https://github.com/tc39/proposal-array-filtering
  filterOut: createMethod(7)
};


/***/ }),
/* 62 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aFunction = __webpack_require__(63);

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 63 */
/***/ (function(module) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),
/* 64 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(14);
var isArray = __webpack_require__(51);
var wellKnownSymbol = __webpack_require__(57);

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),
/* 65 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.es/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(5);
var global = __webpack_require__(3);
var has = __webpack_require__(15);
var isObject = __webpack_require__(14);
var defineProperty = __webpack_require__(20).f;
var copyConstructorProperties = __webpack_require__(33);

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(67);
var redefine = __webpack_require__(22);
var toString = __webpack_require__(68);

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),
/* 67 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(57);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),
/* 68 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(67);
var classof = __webpack_require__(69);

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),
/* 69 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(67);
var classofRaw = __webpack_require__(11);
var wellKnownSymbol = __webpack_require__(57);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),
/* 70 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(59);

// `Symbol.toStringTag` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.tostringtag
defineWellKnownSymbol('toStringTag');


/***/ }),
/* 71 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(3);
var setToStringTag = __webpack_require__(60);

// JSON[@@toStringTag] property
// https://tc39.es/ecma262/#sec-json-@@tostringtag
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 72 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var setToStringTag = __webpack_require__(60);

// Math[@@toStringTag] property
// https://tc39.es/ecma262/#sec-math-@@tostringtag
setToStringTag(Math, 'Math', true);


/***/ }),
/* 73 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(5);
var create = __webpack_require__(52);

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  create: create
});


/***/ }),
/* 74 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2);
var bind = __webpack_require__(75);

// `Function.prototype.bind` method
// https://tc39.es/ecma262/#sec-function.prototype.bind
$({ target: 'Function', proto: true }, {
  bind: bind
});


/***/ }),
/* 75 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(63);
var isObject = __webpack_require__(14);

var slice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func -- we have no proper alternatives, IE8- only
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind
module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = slice.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(slice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};


/***/ }),
/* 76 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var exec = __webpack_require__(77);

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),
/* 77 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

/* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var regexpFlags = __webpack_require__(78);
var stickyHelpers = __webpack_require__(79);
var shared = __webpack_require__(29);

var nativeExec = RegExp.prototype.exec;
var nativeReplace = shared('native-string-replace', String.prototype.replace);

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),
/* 78 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(21);

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 79 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(6);

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),
/* 80 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(81);
var anObject = __webpack_require__(21);
var toLength = __webpack_require__(40);
var requireObjectCoercible = __webpack_require__(12);
var advanceStringIndex = __webpack_require__(82);
var regExpExec = __webpack_require__(84);

// @@match logic
fixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative(nativeMatch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),
/* 81 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(76);
var redefine = __webpack_require__(22);
var regexpExec = __webpack_require__(77);
var fails = __webpack_require__(6);
var wellKnownSymbol = __webpack_require__(57);
var createNonEnumerableProperty = __webpack_require__(19);

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExpPrototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};


/***/ }),
/* 82 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(83).charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),
/* 83 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toInteger = __webpack_require__(41);
var requireObjectCoercible = __webpack_require__(12);

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),
/* 84 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(11);
var regexpExec = __webpack_require__(77);

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),
/* 85 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2);
var global = __webpack_require__(3);
var userAgent = __webpack_require__(49);

var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

var wrap = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
$({ global: true, bind: true, forced: MSIE }, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 86 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var isObject = __webpack_require__(14);
var isArray = __webpack_require__(51);
var toAbsoluteIndex = __webpack_require__(42);
var toLength = __webpack_require__(40);
var toIndexedObject = __webpack_require__(9);
var createProperty = __webpack_require__(87);
var wellKnownSymbol = __webpack_require__(57);
var arrayMethodHasSpeciesSupport = __webpack_require__(88);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),
/* 87 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__(13);
var definePropertyModule = __webpack_require__(20);
var createPropertyDescriptor = __webpack_require__(8);

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),
/* 88 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(6);
var wellKnownSymbol = __webpack_require__(57);
var V8_VERSION = __webpack_require__(48);

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),
/* 89 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(81);
var isRegExp = __webpack_require__(90);
var anObject = __webpack_require__(21);
var requireObjectCoercible = __webpack_require__(12);
var speciesConstructor = __webpack_require__(91);
var advanceStringIndex = __webpack_require__(82);
var toLength = __webpack_require__(40);
var callRegExpExec = __webpack_require__(84);
var regexpExec = __webpack_require__(77);
var stickyHelpers = __webpack_require__(79);

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// @@split logic
fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (UNSUPPORTED_Y ? 'g' : 'y');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? S.slice(q) : S);
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, UNSUPPORTED_Y);


/***/ }),
/* 90 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(14);
var classof = __webpack_require__(11);
var wellKnownSymbol = __webpack_require__(57);

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),
/* 91 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var anObject = __webpack_require__(21);
var aFunction = __webpack_require__(63);
var wellKnownSymbol = __webpack_require__(57);

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),
/* 92 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var forEach = __webpack_require__(93);

// `Array.prototype.forEach` method
// https://tc39.es/ecma262/#sec-array.prototype.foreach
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),
/* 93 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__(61).forEach;
var arrayMethodIsStrict = __webpack_require__(94);

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),
/* 94 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(6);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),
/* 95 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(3);
var DOMIterables = __webpack_require__(96);
var forEach = __webpack_require__(93);
var createNonEnumerableProperty = __webpack_require__(19);

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}


/***/ }),
/* 96 */
/***/ (function(module) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),
/* 97 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var $filter = __webpack_require__(61).filter;
var arrayMethodHasSpeciesSupport = __webpack_require__(88);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 98 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2);
var toObject = __webpack_require__(16);
var nativeKeys = __webpack_require__(54);
var fails = __webpack_require__(6);

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),
/* 99 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var $map = __webpack_require__(61).map;
var arrayMethodHasSpeciesSupport = __webpack_require__(88);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 100 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

/* eslint-disable es/no-array-prototype-indexof -- required for testing */
var $ = __webpack_require__(2);
var $indexOf = __webpack_require__(39).indexOf;
var arrayMethodIsStrict = __webpack_require__(94);

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 101 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var IndexedObject = __webpack_require__(10);
var toIndexedObject = __webpack_require__(9);
var arrayMethodIsStrict = __webpack_require__(94);

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 102 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var redefine = __webpack_require__(22);

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime;

// `Date.prototype.toString` method
// https://tc39.es/ecma262/#sec-date.prototype.tostring
if (new Date(NaN) + '' != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare -- NaN check
    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 103 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var redefine = __webpack_require__(22);
var anObject = __webpack_require__(21);
var fails = __webpack_require__(6);
var flags = __webpack_require__(78);

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),
/* 104 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2);
var parseIntImplementation = __webpack_require__(105);

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
$({ global: true, forced: parseInt != parseIntImplementation }, {
  parseInt: parseIntImplementation
});


/***/ }),
/* 105 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(3);
var trim = __webpack_require__(106).trim;
var whitespaces = __webpack_require__(107);

var $parseInt = global.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22;

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
module.exports = FORCED ? function parseInt(string, radix) {
  var S = trim(String(string));
  return $parseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 106 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(12);
var whitespaces = __webpack_require__(107);

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),
/* 107 */
/***/ (function(module) {

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 108 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(81);
var anObject = __webpack_require__(21);
var toLength = __webpack_require__(40);
var toInteger = __webpack_require__(41);
var requireObjectCoercible = __webpack_require__(12);
var advanceStringIndex = __webpack_require__(82);
var getSubstitution = __webpack_require__(109);
var regExpExec = __webpack_require__(84);

var max = Math.max;
var min = Math.min;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];
});


/***/ }),
/* 109 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toObject = __webpack_require__(16);

var floor = Math.floor;
var replace = ''.replace;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace.call(replacement, symbols, function (match, ch) {
    var capture;
    switch (ch.charAt(0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return str.slice(0, position);
      case "'": return str.slice(tailPos);
      case '<':
        capture = namedCaptures[ch.slice(1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),
/* 110 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(81);
var anObject = __webpack_require__(21);
var requireObjectCoercible = __webpack_require__(12);
var sameValue = __webpack_require__(111);
var regExpExec = __webpack_require__(84);

// @@search logic
fixRegExpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.es/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible(this);
      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative(nativeSearch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});


/***/ }),
/* 111 */
/***/ (function(module) {

// `SameValue` abstract operation
// https://tc39.es/ecma262/#sec-samevalue
// eslint-disable-next-line es/no-object-is -- safe
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 112 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var $trim = __webpack_require__(106).trim;
var forcedStringTrimMethod = __webpack_require__(113);

// `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});


/***/ }),
/* 113 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(6);
var whitespaces = __webpack_require__(107);

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};


/***/ }),
/* 114 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var isArray = __webpack_require__(51);

var nativeReverse = [].reverse;
var test = [1, 2];

// `Array.prototype.reverse` method
// https://tc39.es/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794
$({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {
  reverse: function reverse() {
    // eslint-disable-next-line no-self-assign -- dirty hack
    if (isArray(this)) this.length = this.length;
    return nativeReverse.call(this);
  }
});


/***/ }),
/* 115 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var createHTML = __webpack_require__(116);
var forcedStringHTMLMethod = __webpack_require__(117);

// `String.prototype.fixed` method
// https://tc39.es/ecma262/#sec-string.prototype.fixed
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('fixed') }, {
  fixed: function fixed() {
    return createHTML(this, 'tt', '', '');
  }
});


/***/ }),
/* 116 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(12);

var quot = /"/g;

// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
// https://tc39.es/ecma262/#sec-createhtml
module.exports = function (string, tag, attribute, value) {
  var S = String(requireObjectCoercible(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};


/***/ }),
/* 117 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(6);

// check the existence of a method, lowercase
// of a tag and escaping quotes in arguments
module.exports = function (METHOD_NAME) {
  return fails(function () {
    var test = ''[METHOD_NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  });
};


/***/ }),
/* 118 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(59);

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),
/* 119 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(9);
var addToUnscopables = __webpack_require__(120);
var Iterators = __webpack_require__(121);
var InternalStateModule = __webpack_require__(26);
var defineIterator = __webpack_require__(122);

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 120 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(57);
var create = __webpack_require__(52);
var definePropertyModule = __webpack_require__(20);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),
/* 121 */
/***/ (function(module) {

module.exports = {};


/***/ }),
/* 122 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2);
var createIteratorConstructor = __webpack_require__(123);
var getPrototypeOf = __webpack_require__(125);
var setPrototypeOf = __webpack_require__(127);
var setToStringTag = __webpack_require__(60);
var createNonEnumerableProperty = __webpack_require__(19);
var redefine = __webpack_require__(22);
var wellKnownSymbol = __webpack_require__(57);
var IS_PURE = __webpack_require__(30);
var Iterators = __webpack_require__(121);
var IteratorsCore = __webpack_require__(124);

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),
/* 123 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__(124).IteratorPrototype;
var create = __webpack_require__(52);
var createPropertyDescriptor = __webpack_require__(8);
var setToStringTag = __webpack_require__(60);
var Iterators = __webpack_require__(121);

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),
/* 124 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(6);
var getPrototypeOf = __webpack_require__(125);
var createNonEnumerableProperty = __webpack_require__(19);
var has = __webpack_require__(15);
var wellKnownSymbol = __webpack_require__(57);
var IS_PURE = __webpack_require__(30);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if ((!IS_PURE || NEW_ITERATOR_PROTOTYPE) && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),
/* 125 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var has = __webpack_require__(15);
var toObject = __webpack_require__(16);
var sharedKey = __webpack_require__(28);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(126);

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),
/* 126 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(6);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),
/* 127 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var anObject = __webpack_require__(21);
var aPossiblePrototype = __webpack_require__(128);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),
/* 128 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(14);

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),
/* 129 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(83).charAt;
var InternalStateModule = __webpack_require__(26);
var defineIterator = __webpack_require__(122);

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 130 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(3);
var DOMIterables = __webpack_require__(96);
var ArrayIteratorMethods = __webpack_require__(119);
var createNonEnumerableProperty = __webpack_require__(19);
var wellKnownSymbol = __webpack_require__(57);

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(46);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(65);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_symbol_to_string_tag_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(70);
/* harmony import */ var core_js_modules_es_symbol_to_string_tag_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_string_tag_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_json_to_string_tag_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(71);
/* harmony import */ var core_js_modules_es_json_to_string_tag_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_json_to_string_tag_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_math_to_string_tag_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(72);
/* harmony import */ var core_js_modules_es_math_to_string_tag_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_math_to_string_tag_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(73);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(74);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(76);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(80);
/* harmony import */ var core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(85);
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(86);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(89);
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(92);
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(95);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(97);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(98);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(99);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_array_index_of_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(100);
/* harmony import */ var core_js_modules_es_array_index_of_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(101);
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(102);
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(103);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(104);
/* harmony import */ var core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(108);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(110);
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(112);
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var core_js_modules_es_array_reverse_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(114);
/* harmony import */ var core_js_modules_es_array_reverse_js__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reverse_js__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var core_js_modules_es_string_fixed_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(115);
/* harmony import */ var core_js_modules_es_string_fixed_js__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_fixed_js__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(118);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(119);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(129);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(130);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_32__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


































!function (e) {
  var t = {};

  function n(i) {
    if (t[i]) return t[i].exports;
    var s = t[i] = {
      i: i,
      l: !1,
      exports: {}
    };
    return e[i].call(s.exports, s, s.exports, n), s.l = !0, s.exports;
  }

  n.m = e, n.c = t, n.d = function (e, t, i) {
    n.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: i
    });
  }, n.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    });
  }, n.t = function (e, t) {
    if (1 & t && (e = n(e)), 8 & t) return e;
    if (4 & t && "object" == _typeof(e) && e && e.__esModule) return e;
    var i = Object.create(null);
    if (n.r(i), Object.defineProperty(i, "default", {
      enumerable: !0,
      value: e
    }), 2 & t && "string" != typeof e) for (var s in e) {
      n.d(i, s, function (t) {
        return e[t];
      }.bind(null, s));
    }
    return i;
  }, n.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e["default"];
    } : function () {
      return e;
    };
    return n.d(t, "a", t), t;
  }, n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, n.p = "", n(n.s = 0);
}([function (e, t, n) {
  "use strict";

  n.r(t);
  var i = {
    hooks: {},
    extensions: [],
    wrappers: [],
    navbar: {
      add: !0,
      sticky: !0,
      title: "Menu",
      titleLink: "parent"
    },
    onClick: {
      close: null,
      preventDefault: null,
      setSelected: !0
    },
    slidingSubmenus: !0
  },
      s = {
    classNames: {
      inset: "Inset",
      nolistview: "NoListview",
      nopanel: "NoPanel",
      panel: "Panel",
      selected: "Selected",
      vertical: "Vertical"
    },
    language: null,
    openingInterval: 25,
    panelNodetype: ["ul", "ol", "div"],
    transitionDuration: 400
  };

  function a(e, t) {
    for (var n in "object" != o(e) && (e = {}), "object" != o(t) && (t = {}), t) {
      t.hasOwnProperty(n) && (void 0 === e[n] ? e[n] = t[n] : "object" == o(e[n]) && a(e[n], t[n]));
    }

    return e;
  }

  function o(e) {
    return {}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function r(e, t, n) {
    if ("function" == typeof t) {
      var i = t.call(e);
      if (void 0 !== i) return i;
    }

    return null !== t && "function" != typeof t && void 0 !== t || void 0 === n ? t : n;
  }

  function c(e, t, n) {
    var i = !1,
        s = function s(n) {
      void 0 !== n && n.target !== e || (i || (e.removeEventListener("transitionend", s), e.removeEventListener("webkitTransitionEnd", s), t.call(e)), i = !0);
    };

    e.addEventListener("transitionend", s), e.addEventListener("webkitTransitionEnd", s), setTimeout(s, 1.1 * n);
  }

  function m() {
    return "mm-" + l++;
  }

  var l = 0;

  function d(e) {
    return "mm-" == e.slice(0, 3) ? e.slice(3) : e;
  }

  var p = {};

  function u(e, t) {
    void 0 === p[t] && (p[t] = {}), a(p[t], e);
  }

  var f = {
    Menu: "منو"
  },
      h = {
    Menu: "Menü"
  },
      v = {
    Menu: "Меню"
  };

  function b(e) {
    var t = e.split("."),
        n = document.createElement(t.shift());
    return t.forEach(function (e) {
      n.classList.add(e);
    }), n;
  }

  function g(e, t) {
    return Array.prototype.slice.call(e.querySelectorAll(t));
  }

  function _(e, t) {
    var n = Array.prototype.slice.call(e.children);
    return t ? n.filter(function (e) {
      return e.matches(t);
    }) : n;
  }

  function y(e, t) {
    for (var n = [], i = e.parentElement; i;) {
      n.push(i), i = i.parentElement;
    }

    return t ? n.filter(function (e) {
      return e.matches(t);
    }) : n;
  }

  function L(e) {
    return e.filter(function (e) {
      return !e.matches(".mm-hidden");
    });
  }

  function w(e) {
    var t = [];
    return L(e).forEach(function (e) {
      t.push.apply(t, _(e, "a.mm-listitem__text"));
    }), t.filter(function (e) {
      return !e.matches(".mm-btn_next");
    });
  }

  function E(e, t, n) {
    e.matches("." + t) && (e.classList.remove(t), e.classList.add(n));
  }

  var x = {};

  function P(e, t, n) {
    "number" == typeof e && (e = "(min-width: " + e + "px)"), x[e] = x[e] || [], x[e].push({
      yes: t,
      no: n
    });
  }

  function k(e, t) {
    for (var n = t.matches ? "yes" : "no", i = 0; i < x[e].length; i++) {
      x[e][i][n]();
    }
  }

  u({
    Menu: "Menu"
  }, "nl"), u(f, "fa"), u(h, "de"), u(v, "ru");

  var S = function () {
    function e(t, n, i) {
      return this.opts = a(n, e.options), this.conf = a(i, e.configs), this._api = ["bind", "initPanel", "initListview", "openPanel", "closePanel", "closeAllPanels", "setSelected"], this.node = {}, this.vars = {}, this.hook = {}, this.clck = [], this.node.menu = "string" == typeof t ? document.querySelector(t) : t, "function" == typeof this._deprecatedWarnings && this._deprecatedWarnings(), this._initWrappers(), this._initAddons(), this._initExtensions(), this._initHooks(), this._initAPI(), this._initMenu(), this._initPanels(), this._initOpened(), this._initAnchors(), function () {
        var e = function e(_e2) {
          var t = window.matchMedia(_e2);
          k(_e2, t), t.onchange = function (n) {
            k(_e2, t);
          };
        };

        for (var t in x) {
          e(t);
        }
      }(), this;
    }

    return e.prototype.openPanel = function (e, t) {
      var n = this;

      if (this.trigger("openPanel:before", [e]), e && (e.matches(".mm-panel") || (e = e.closest(".mm-panel")), e)) {
        if ("boolean" != typeof t && (t = !0), e.parentElement.matches(".mm-listitem_vertical")) {
          y(e, ".mm-listitem_vertical").forEach(function (e) {
            e.classList.add("mm-listitem_opened"), _(e, ".mm-panel").forEach(function (e) {
              e.classList.remove("mm-hidden");
            });
          });
          var i = y(e, ".mm-panel").filter(function (e) {
            return !e.parentElement.matches(".mm-listitem_vertical");
          });
          this.trigger("openPanel:start", [e]), i.length && this.openPanel(i[0]), this.trigger("openPanel:finish", [e]);
        } else {
          if (e.matches(".mm-panel_opened")) return;

          var s = _(this.node.pnls, ".mm-panel"),
              a = _(this.node.pnls, ".mm-panel_opened")[0];

          s.filter(function (t) {
            return t !== e;
          }).forEach(function (e) {
            e.classList.remove("mm-panel_opened-parent");
          });

          for (var o = e.mmParent; o;) {
            (o = o.closest(".mm-panel")) && (o.parentElement.matches(".mm-listitem_vertical") || o.classList.add("mm-panel_opened-parent"), o = o.mmParent);
          }

          s.forEach(function (e) {
            e.classList.remove("mm-panel_highest");
          }), s.filter(function (e) {
            return e !== a;
          }).filter(function (t) {
            return t !== e;
          }).forEach(function (e) {
            e.classList.add("mm-hidden");
          }), e.classList.remove("mm-hidden");

          var r = function r() {
            a && a.classList.remove("mm-panel_opened"), e.classList.add("mm-panel_opened"), e.matches(".mm-panel_opened-parent") ? (a && a.classList.add("mm-panel_highest"), e.classList.remove("mm-panel_opened-parent")) : (a && a.classList.add("mm-panel_opened-parent"), e.classList.add("mm-panel_highest")), n.trigger("openPanel:start", [e]);
          },
              m = function m() {
            a && (a.classList.remove("mm-panel_highest"), a.classList.add("mm-hidden")), e.classList.remove("mm-panel_highest"), n.trigger("openPanel:finish", [e]);
          };

          t && !e.matches(".mm-panel_noanimation") ? setTimeout(function () {
            c(e, function () {
              m();
            }, n.conf.transitionDuration), r();
          }, this.conf.openingInterval) : (r(), m());
        }

        this.trigger("openPanel:after", [e]);
      }
    }, e.prototype.closePanel = function (e) {
      this.trigger("closePanel:before", [e]);
      var t = e.parentElement;
      t.matches(".mm-listitem_vertical") && (t.classList.remove("mm-listitem_opened"), e.classList.add("mm-hidden"), this.trigger("closePanel", [e])), this.trigger("closePanel:after", [e]);
    }, e.prototype.closeAllPanels = function (e) {
      this.trigger("closeAllPanels:before"), this.node.pnls.querySelectorAll(".mm-listitem").forEach(function (e) {
        e.classList.remove("mm-listitem_selected"), e.classList.remove("mm-listitem_opened");
      });

      var t = _(this.node.pnls, ".mm-panel"),
          n = e || t[0];

      _(this.node.pnls, ".mm-panel").forEach(function (e) {
        e !== n && (e.classList.remove("mm-panel_opened"), e.classList.remove("mm-panel_opened-parent"), e.classList.remove("mm-panel_highest"), e.classList.add("mm-hidden"));
      }), this.openPanel(n, !1), this.trigger("closeAllPanels:after");
    }, e.prototype.togglePanel = function (e) {
      var t = e.parentElement;
      t.matches(".mm-listitem_vertical") && this[t.matches(".mm-listitem_opened") ? "closePanel" : "openPanel"](e);
    }, e.prototype.setSelected = function (e) {
      this.trigger("setSelected:before", [e]), g(this.node.menu, ".mm-listitem_selected").forEach(function (e) {
        e.classList.remove("mm-listitem_selected");
      }), e.classList.add("mm-listitem_selected"), this.trigger("setSelected:after", [e]);
    }, e.prototype.bind = function (e, t) {
      this.hook[e] = this.hook[e] || [], this.hook[e].push(t);
    }, e.prototype.trigger = function (e, t) {
      if (this.hook[e]) for (var n = 0, i = this.hook[e].length; n < i; n++) {
        this.hook[e][n].apply(this, t);
      }
    }, e.prototype._initAPI = function () {
      var e = this,
          t = this;
      this.API = {}, this._api.forEach(function (n) {
        e.API[n] = function () {
          var e = t[n].apply(t, arguments);
          return void 0 === e ? t.API : e;
        };
      }), this.node.menu.mmApi = this.API;
    }, e.prototype._initHooks = function () {
      for (var e in this.opts.hooks) {
        this.bind(e, this.opts.hooks[e]);
      }
    }, e.prototype._initWrappers = function () {
      this.trigger("initWrappers:before");

      for (var t = 0; t < this.opts.wrappers.length; t++) {
        var n = e.wrappers[this.opts.wrappers[t]];
        "function" == typeof n && n.call(this);
      }

      this.trigger("initWrappers:after");
    }, e.prototype._initAddons = function () {
      for (var t in this.trigger("initAddons:before"), e.addons) {
        e.addons[t].call(this);
      }

      this.trigger("initAddons:after");
    }, e.prototype._initExtensions = function () {
      var e = this;
      this.trigger("initExtensions:before"), "array" == o(this.opts.extensions) && (this.opts.extensions = {
        all: this.opts.extensions
      }), Object.keys(this.opts.extensions).forEach(function (t) {
        var n = e.opts.extensions[t].map(function (e) {
          return "mm-menu_" + e;
        });
        n.length && P(t, function () {
          n.forEach(function (t) {
            e.node.menu.classList.add(t);
          });
        }, function () {
          n.forEach(function (t) {
            e.node.menu.classList.remove(t);
          });
        });
      }), this.trigger("initExtensions:after");
    }, e.prototype._initMenu = function () {
      var e = this;
      this.trigger("initMenu:before"), this.node.wrpr = this.node.wrpr || this.node.menu.parentElement, this.node.wrpr.classList.add("mm-wrapper"), this.node.menu.id = this.node.menu.id || m();
      var t = b("div.mm-panels");
      _(this.node.menu).forEach(function (n) {
        e.conf.panelNodetype.indexOf(n.nodeName.toLowerCase()) > -1 && t.append(n);
      }), this.node.menu.append(t), this.node.pnls = t, this.node.menu.classList.add("mm-menu"), this.trigger("initMenu:after");
    }, e.prototype._initPanels = function () {
      var e = this;
      this.trigger("initPanels:before"), this.clck.push(function (t, n) {
        if (n.inMenu) {
          var i = t.getAttribute("href");
          if (i && i.length > 1 && "#" == i.slice(0, 1)) try {
            var s = g(e.node.menu, i)[0];
            if (s && s.matches(".mm-panel")) return t.parentElement.matches(".mm-listitem_vertical") ? e.togglePanel(s) : e.openPanel(s), !0;
          } catch (e) {}
        }
      }), _(this.node.pnls).forEach(function (t) {
        e.initPanel(t);
      }), this.trigger("initPanels:after");
    }, e.prototype.initPanel = function (e) {
      var t = this,
          n = this.conf.panelNodetype.join(", ");

      if (e.matches(n) && (e.matches(".mm-panel") || (e = this._initPanel(e)), e)) {
        var i = [];
        i.push.apply(i, _(e, "." + this.conf.classNames.panel)), _(e, ".mm-listview").forEach(function (e) {
          _(e, ".mm-listitem").forEach(function (e) {
            i.push.apply(i, _(e, n));
          });
        }), i.forEach(function (e) {
          t.initPanel(e);
        });
      }
    }, e.prototype._initPanel = function (e) {
      var t = this;
      if (this.trigger("initPanel:before", [e]), E(e, this.conf.classNames.panel, "mm-panel"), E(e, this.conf.classNames.nopanel, "mm-nopanel"), E(e, this.conf.classNames.inset, "mm-listview_inset"), e.matches(".mm-listview_inset") && e.classList.add("mm-nopanel"), e.matches(".mm-nopanel")) return null;
      var n = e.id || m(),
          i = e.matches("." + this.conf.classNames.vertical) || !this.opts.slidingSubmenus;

      if (e.classList.remove(this.conf.classNames.vertical), e.matches("ul, ol")) {
        e.removeAttribute("id");
        var s = b("div");
        e.before(s), s.append(e), e = s;
      }

      e.id = n, e.classList.add("mm-panel"), e.classList.add("mm-hidden");
      var a = [e.parentElement].filter(function (e) {
        return e.matches("li");
      })[0];

      if (i ? a && a.classList.add("mm-listitem_vertical") : this.node.pnls.append(e), a && (a.mmChild = e, e.mmParent = a, a && a.matches(".mm-listitem") && !_(a, ".mm-btn").length)) {
        var o = _(a, ".mm-listitem__text")[0];

        if (o) {
          var r = b("a.mm-btn.mm-btn_next.mm-listitem__btn");
          r.setAttribute("href", "#" + e.id), o.matches("span") ? (r.classList.add("mm-listitem__text"), r.innerHTML = o.innerHTML, a.insertBefore(r, o.nextElementSibling), o.remove()) : a.insertBefore(r, _(a, ".mm-panel")[0]);
        }
      }

      return this._initNavbar(e), _(e, "ul, ol").forEach(function (e) {
        t.initListview(e);
      }), this.trigger("initPanel:after", [e]), e;
    }, e.prototype._initNavbar = function (e) {
      if (this.trigger("initNavbar:before", [e]), !_(e, ".mm-navbar").length) {
        var t = null,
            n = null;

        if (e.getAttribute("data-mm-parent") ? n = g(this.node.pnls, e.getAttribute("data-mm-parent"))[0] : (t = e.mmParent) && (n = t.closest(".mm-panel")), !t || !t.matches(".mm-listitem_vertical")) {
          var i = b("div.mm-navbar");

          if (this.opts.navbar.add ? this.opts.navbar.sticky && i.classList.add("mm-navbar_sticky") : i.classList.add("mm-hidden"), n) {
            var s = b("a.mm-btn.mm-btn_prev.mm-navbar__btn");
            s.setAttribute("href", "#" + n.id), i.append(s);
          }

          var a = null;
          t ? a = _(t, ".mm-listitem__text")[0] : n && (a = g(n, 'a[href="#' + e.id + '"]')[0]);
          var o = b("a.mm-navbar__title"),
              r = b("span");

          switch (o.append(r), r.innerHTML = e.getAttribute("data-mm-title") || (a ? a.textContent : "") || this.i18n(this.opts.navbar.title) || this.i18n("Menu"), this.opts.navbar.titleLink) {
            case "anchor":
              a && o.setAttribute("href", a.getAttribute("href"));
              break;

            case "parent":
              n && o.setAttribute("href", "#" + n.id);
          }

          i.append(o), e.prepend(i), this.trigger("initNavbar:after", [e]);
        }
      }
    }, e.prototype.initListview = function (e) {
      var t = this;
      this.trigger("initListview:before", [e]), E(e, this.conf.classNames.nolistview, "mm-nolistview"), e.matches(".mm-nolistview") || (e.classList.add("mm-listview"), _(e).forEach(function (e) {
        e.classList.add("mm-listitem"), E(e, t.conf.classNames.selected, "mm-listitem_selected"), _(e, "a, span").forEach(function (e) {
          e.matches(".mm-btn") || e.classList.add("mm-listitem__text");
        });
      })), this.trigger("initListview:after", [e]);
    }, e.prototype._initOpened = function () {
      this.trigger("initOpened:before");
      var e = this.node.pnls.querySelectorAll(".mm-listitem_selected"),
          t = null;
      e.forEach(function (e) {
        t = e, e.classList.remove("mm-listitem_selected");
      }), t && t.classList.add("mm-listitem_selected");
      var n = t ? t.closest(".mm-panel") : _(this.node.pnls, ".mm-panel")[0];
      this.openPanel(n, !1), this.trigger("initOpened:after");
    }, e.prototype._initAnchors = function () {
      var e = this;
      this.trigger("initAnchors:before"), document.addEventListener("click", function (t) {
        var n = t.target.closest("a[href]");

        if (n) {
          for (var i = {
            inMenu: n.closest(".mm-menu") === e.node.menu,
            inListview: n.matches(".mm-listitem > a"),
            toExternal: n.matches('[rel="external"]') || n.matches('[target="_blank"]')
          }, s = {
            close: null,
            setSelected: null,
            preventDefault: "#" == n.getAttribute("href").slice(0, 1)
          }, c = 0; c < e.clck.length; c++) {
            var m = e.clck[c].call(e, n, i);

            if (m) {
              if ("boolean" == typeof m) return void t.preventDefault();
              "object" == o(m) && (s = a(m, s));
            }
          }

          i.inMenu && i.inListview && !i.toExternal && (r(n, e.opts.onClick.setSelected, s.setSelected) && e.setSelected(n.parentElement), r(n, e.opts.onClick.preventDefault, s.preventDefault) && t.preventDefault(), r(n, e.opts.onClick.close, s.close) && e.opts.offCanvas && "function" == typeof e.close && e.close());
        }
      }, !0), this.trigger("initAnchors:after");
    }, e.prototype.i18n = function (e) {
      return function (e, t) {
        return "string" == typeof t && void 0 !== p[t] && p[t][e] || e;
      }(e, this.conf.language);
    }, e.options = i, e.configs = s, e.addons = {}, e.wrappers = {}, e.node = {}, e.vars = {}, e;
  }(),
      M = {
    blockUI: !0,
    moveBackground: !0
  };

  var A = {
    clone: !1,
    menu: {
      insertMethod: "prepend",
      insertSelector: "body"
    },
    page: {
      nodetype: "div",
      selector: null,
      noSelector: []
    }
  };

  function T(e) {
    return e ? e.charAt(0).toUpperCase() + e.slice(1) : "";
  }

  function C(e, t, n) {
    var i = t.split(".");
    e[t = "mmEvent" + T(i[0]) + T(i[1])] = e[t] || [], e[t].push(n), e.addEventListener(i[0], n);
  }

  function N(e, t) {
    var n = t.split(".");
    t = "mmEvent" + T(n[0]) + T(n[1]), (e[t] || []).forEach(function (t) {
      e.removeEventListener(n[0], t);
    });
  }

  S.options.offCanvas = M, S.configs.offCanvas = A;
  S.prototype.open = function () {
    var e = this;
    this.trigger("open:before"), this.vars.opened || (this._openSetup(), setTimeout(function () {
      e._openStart();
    }, this.conf.openingInterval), this.trigger("open:after"));
  }, S.prototype._openSetup = function () {
    var e = this,
        t = this.opts.offCanvas;
    this.closeAllOthers(), function (e, t, n) {
      var i = t.split(".");
      (e[t = "mmEvent" + T(i[0]) + T(i[1])] || []).forEach(function (e) {
        e(n || {});
      });
    }(window, "resize.page", {
      force: !0
    });
    var n = ["mm-wrapper_opened"];
    t.blockUI && n.push("mm-wrapper_blocking"), "modal" == t.blockUI && n.push("mm-wrapper_modal"), t.moveBackground && n.push("mm-wrapper_background"), n.forEach(function (t) {
      e.node.wrpr.classList.add(t);
    }), setTimeout(function () {
      e.vars.opened = !0;
    }, this.conf.openingInterval), this.node.menu.classList.add("mm-menu_opened");
  }, S.prototype._openStart = function () {
    var e = this;
    c(S.node.page, function () {
      e.trigger("open:finish");
    }, this.conf.transitionDuration), this.trigger("open:start"), this.node.wrpr.classList.add("mm-wrapper_opening");
  }, S.prototype.close = function () {
    var e = this;
    this.trigger("close:before"), this.vars.opened && (c(S.node.page, function () {
      e.node.menu.classList.remove("mm-menu_opened");
      ["mm-wrapper_opened", "mm-wrapper_blocking", "mm-wrapper_modal", "mm-wrapper_background"].forEach(function (t) {
        e.node.wrpr.classList.remove(t);
      }), e.vars.opened = !1, e.trigger("close:finish");
    }, this.conf.transitionDuration), this.trigger("close:start"), document.querySelector('.hamburger-2').classList.remove("is-active"), document.querySelector('.hamburger').classList.remove("is-active"), this.node.wrpr.classList.remove("mm-wrapper_opening"), this.trigger("close:after"));
  }, S.prototype.closeAllOthers = function () {
    var e = this;
    g(document.body, ".mm-menu_offcanvas").forEach(function (t) {
      if (t !== e.node.menu) {
        var n = t.mmApi;
        n && n.close && n.close();
      }
    });
  }, S.prototype.setPage = function (e) {
    this.trigger("setPage:before", [e]);
    var t = this.conf.offCanvas;

    if (!e) {
      var n = "string" == typeof t.page.selector ? g(document.body, t.page.selector) : _(document.body, t.page.nodetype);

      if (n = n.filter(function (e) {
        return !e.matches(".mm-menu, .mm-wrapper__blocker");
      }), t.page.noSelector.length && (n = n.filter(function (e) {
        return !e.matches(t.page.noSelector.join(", "));
      })), n.length > 1) {
        var i = b("div");
        n[0].before(i), n.forEach(function (e) {
          i.append(e);
        }), n = [i];
      }

      e = n[0];
    }

    e.classList.add("mm-page"), e.classList.add("mm-slideout"), e.id = e.id || m(), S.node.page = e, this.trigger("setPage:after", [e]);
  };

  var H = function H() {
    var e = this;
    N(document.body, "keydown.tabguard"), C(document.body, "keydown.tabguard", function (t) {
      9 == t.keyCode && e.node.wrpr.matches(".mm-wrapper_opened") && t.preventDefault();
    });
  },
      j = function j() {
    var e = this;
    this.trigger("initBlocker:before");
    var t = this.opts.offCanvas,
        n = this.conf.offCanvas;

    if (t.blockUI) {
      if (!S.node.blck) {
        var i = b("div.mm-wrapper__blocker.mm-slideout");
        i.innerHTML = "<a></a>", document.querySelector(n.menu.insertSelector).append(i), S.node.blck = i;
      }

      var s = function s(t) {
        t.preventDefault(), t.stopPropagation(), e.node.wrpr.matches(".mm-wrapper_modal") || e.close();
      };

      S.node.blck.addEventListener("mousedown", s), S.node.blck.addEventListener("touchstart", s), S.node.blck.addEventListener("touchmove", s), this.trigger("initBlocker:after");
    }
  },
      D = {
    aria: !0,
    text: !0
  };

  var I = {
    text: {
      closeMenu: "Close menu",
      closeSubmenu: "Close submenu",
      openSubmenu: "Open submenu",
      toggleSubmenu: "Toggle submenu"
    }
  },
      O = {
    "Close menu": "بستن منو",
    "Close submenu": "بستن زیرمنو",
    "Open submenu": "بازکردن زیرمنو",
    "Toggle submenu": "سوییچ زیرمنو"
  },
      q = {
    "Close menu": "Menü schließen",
    "Close submenu": "Untermenü schließen",
    "Open submenu": "Untermenü öffnen",
    "Toggle submenu": "Untermenü wechseln"
  },
      B = {
    "Close menu": "Закрыть меню",
    "Close submenu": "Закрыть подменю",
    "Open submenu": "Открыть подменю",
    "Toggle submenu": "Переключить подменю"
  };
  u({
    "Close menu": "Menu sluiten",
    "Close submenu": "Submenu sluiten",
    "Open submenu": "Submenu openen",
    "Toggle submenu": "Submenu wisselen"
  }, "nl"), u(O, "fa"), u(q, "de"), u(B, "ru"), S.options.screenReader = D, S.configs.screenReader = I;
  var z;
  z = function z(e, t, n) {
    e[t] = n, n ? e.setAttribute(t, n.toString()) : e.removeAttribute(t);
  }, S.sr_aria = function (e, t, n) {
    z(e, "aria-" + t, n);
  }, S.sr_role = function (e, t) {
    z(e, "role", t);
  }, S.sr_text = function (e) {
    return '<span class="mm-sronly">' + e + "</span>";
  };
  var R = {
    fix: !0
  };
  var U = "ontouchstart" in window || !!navigator.msMaxTouchPoints || !1;
  S.options.scrollBugFix = R;
  var W = {
    height: "default"
  };
  S.options.autoHeight = W;
  var Y = {
    close: !1,
    open: !1
  };
  S.options.backButton = Y;
  var F = {
    add: !1,
    visible: {
      min: 1,
      max: 3
    }
  };
  S.options.columns = F;
  var X = {
    add: !1,
    addTo: "panels",
    count: !1
  };
  S.options.counters = X, S.configs.classNames.counters = {
    counter: "Counter"
  };
  var V = {
    add: !1,
    addTo: "panels"
  };
  S.options.dividers = V, S.configs.classNames.divider = "Divider";
  var Z = {
    open: !1,
    node: null
  };

  var G = "ontouchstart" in window || !!navigator.msMaxTouchPoints || !1,
      K = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
      Q = {
    start: 15,
    swipe: 15
  },
      J = {
    x: ["Right", "Left"],
    y: ["Down", "Up"]
  },
      $ = 0,
      ee = 1,
      te = 2,
      ne = function ne(e, t) {
    return "string" == typeof e && "%" == e.slice(-1) && (e = t * ((e = parseInt(e.slice(0, -1), 10)) / 100)), e;
  },
      ie = function () {
    function e(e, t, n) {
      this.surface = e, this.area = a(t, K), this.treshold = a(n, Q), this.surface.mmHasDragEvents || (this.surface.addEventListener(G ? "touchstart" : "mousedown", this.start.bind(this)), this.surface.addEventListener(G ? "touchend" : "mouseup", this.stop.bind(this)), this.surface.addEventListener(G ? "touchleave" : "mouseleave", this.stop.bind(this)), this.surface.addEventListener(G ? "touchmove" : "mousemove", this.move.bind(this))), this.surface.mmHasDragEvents = !0;
    }

    return e.prototype.start = function (e) {
      this.currentPosition = {
        x: e.touches ? e.touches[0].pageX : e.pageX || 0,
        y: e.touches ? e.touches[0].pageY : e.pageY || 0
      };
      var t = this.surface.clientWidth,
          n = this.surface.clientHeight,
          i = ne(this.area.top, n);

      if (!("number" == typeof i && this.currentPosition.y < i)) {
        var s = ne(this.area.right, t);

        if (!("number" == typeof s && (s = t - s, this.currentPosition.x > s))) {
          var a = ne(this.area.bottom, n);

          if (!("number" == typeof a && (a = n - a, this.currentPosition.y > a))) {
            var o = ne(this.area.left, t);
            "number" == typeof o && this.currentPosition.x < o || (this.startPosition = {
              x: this.currentPosition.x,
              y: this.currentPosition.y
            }, this.state = ee);
          }
        }
      }
    }, e.prototype.stop = function (e) {
      if (this.state == te) {
        var t = this._dragDirection(),
            n = this._eventDetail(t);

        if (this._dispatchEvents("drag*End", n), Math.abs(this.movement[this.axis]) > this.treshold.swipe) {
          var i = this._swipeDirection();

          n.direction = i, this._dispatchEvents("swipe*", n);
        }
      }

      this.state = $;
    }, e.prototype.move = function (e) {
      switch (this.state) {
        case ee:
        case te:
          var t = {
            x: e.changedTouches ? e.touches[0].pageX : e.pageX || 0,
            y: e.changedTouches ? e.touches[0].pageY : e.pageY || 0
          };
          this.movement = {
            x: t.x - this.currentPosition.x,
            y: t.y - this.currentPosition.y
          }, this.distance = {
            x: t.x - this.startPosition.x,
            y: t.y - this.startPosition.y
          }, this.currentPosition = {
            x: t.x,
            y: t.y
          }, this.axis = Math.abs(this.distance.x) > Math.abs(this.distance.y) ? "x" : "y";

          var n = this._dragDirection(),
              i = this._eventDetail(n);

          this.state == ee && Math.abs(this.distance[this.axis]) > this.treshold.start && (this._dispatchEvents("drag*Start", i), this.state = te), this.state == te && this._dispatchEvents("drag*Move", i);
      }
    }, e.prototype._eventDetail = function (e) {
      var t = this.distance.x,
          n = this.distance.y;
      return "x" == this.axis && (t -= t > 0 ? this.treshold.start : 0 - this.treshold.start), "y" == this.axis && (n -= n > 0 ? this.treshold.start : 0 - this.treshold.start), {
        axis: this.axis,
        direction: e,
        movementX: this.movement.x,
        movementY: this.movement.y,
        distanceX: t,
        distanceY: n
      };
    }, e.prototype._dispatchEvents = function (e, t) {
      var n = new CustomEvent(e.replace("*", ""), {
        detail: t
      });
      this.surface.dispatchEvent(n);
      var i = new CustomEvent(e.replace("*", this.axis.toUpperCase()), {
        detail: t
      });
      this.surface.dispatchEvent(i);
      var s = new CustomEvent(e.replace("*", t.direction), {
        detail: t
      });
      this.surface.dispatchEvent(s);
    }, e.prototype._dragDirection = function () {
      return J[this.axis][this.distance[this.axis] > 0 ? 0 : 1];
    }, e.prototype._swipeDirection = function () {
      return J[this.axis][this.movement[this.axis] > 0 ? 0 : 1];
    }, e;
  }(),
      se = null,
      ae = null,
      oe = 0,
      re = function re(e) {
    var t = this,
        n = {},
        i = !1,
        s = function s() {
      var e = Object.keys(t.opts.extensions);
      e.length ? (P(e.join(", "), function () {}, function () {
        n = ce(n, [], t.node.menu);
      }), e.forEach(function (e) {
        P(e, function () {
          n = ce(n, t.opts.extensions[e], t.node.menu);
        }, function () {});
      })) : n = ce(n, [], t.node.menu);
    };

    ae && (N(ae, "dragStart"), N(ae, "dragMove"), N(ae, "dragEnd")), se = new ie(ae = e), s(), s = function s() {}, ae && (C(ae, "dragStart", function (e) {
      e.detail.direction == n.direction && (i = !0, t.node.wrpr.classList.add("mm-wrapper_dragging"), t._openSetup(), t.trigger("open:start"), oe = t.node.menu["x" == n.axis ? "clientWidth" : "clientHeight"]);
    }), C(ae, "dragMove", function (e) {
      if (e.detail.axis == n.axis && i) {
        var t = e.detail["distance" + n.axis.toUpperCase()];

        switch (n.position) {
          case "right":
          case "bottom":
            t = Math.min(Math.max(t, -oe), 0);
            break;

          default:
            t = Math.max(Math.min(t, oe), 0);
        }

        if ("front" == n.zposition) switch (n.position) {
          case "right":
          case "bottom":
            t += oe;
            break;

          default:
            t -= oe;
        }
        n.slideOutNodes.forEach(function (e) {
          e.style.transform = "translate" + n.axis.toUpperCase() + "(" + t + "px)";
        });
      }
    }), C(ae, "dragEnd", function (e) {
      if (e.detail.axis == n.axis && i) {
        i = !1, t.node.wrpr.classList.remove("mm-wrapper_dragging"), n.slideOutNodes.forEach(function (e) {
          e.style.transform = "";
        });
        var s = Math.abs(e.detail["distance" + n.axis.toUpperCase()]) >= .75 * oe;

        if (!s) {
          var a = e.detail["movement" + n.axis.toUpperCase()];

          switch (n.position) {
            case "right":
            case "bottom":
              s = a <= 0;
              break;

            default:
              s = a >= 0;
          }
        }

        s ? t._openStart() : t.close();
      }
    }));
  },
      ce = function ce(e, t, n) {
    switch (e.position = "left", e.zposition = "back", ["right", "top", "bottom"].forEach(function (n) {
      t.indexOf("position-" + n) > -1 && (e.position = n);
    }), ["front", "top", "bottom"].forEach(function (n) {
      t.indexOf("position-" + n) > -1 && (e.zposition = "front");
    }), se.area = {
      top: "bottom" == e.position ? "75%" : 0,
      right: "left" == e.position ? "75%" : 0,
      bottom: "top" == e.position ? "75%" : 0,
      left: "right" == e.position ? "75%" : 0
    }, e.position) {
      case "top":
      case "bottom":
        e.axis = "y";
        break;

      default:
        e.axis = "x";
    }

    switch (e.position) {
      case "top":
        e.direction = "Down";
        break;

      case "right":
        e.direction = "Left";
        break;

      case "bottom":
        e.direction = "Up";
        break;

      default:
        e.direction = "Right";
    }

    switch (e.zposition) {
      case "front":
        e.slideOutNodes = [n];
        break;

      default:
        e.slideOutNodes = g(document.body, ".mm-slideout");
    }

    return e;
  };

  S.options.drag = Z;
  var me = {
    drop: !1,
    fitViewport: !0,
    event: "click",
    position: {},
    tip: !0
  };
  var le = {
    offset: {
      button: {
        x: -5,
        y: 5
      },
      viewport: {
        x: 20,
        y: 20
      }
    },
    height: {
      max: 880
    },
    width: {
      max: 440
    }
  };
  S.options.dropdown = me, S.configs.dropdown = le;
  var de = {
    insertMethod: "append",
    insertSelector: "body"
  };
  S.configs.fixedElements = de, S.configs.classNames.fixedElements = {
    fixed: "Fixed"
  };
  var pe = {
    use: !1,
    top: [],
    bottom: [],
    position: "left",
    type: "default"
  };
  S.options.iconbar = pe;
  var ue = {
    add: !1,
    blockPanel: !0,
    hideDivider: !1,
    hideNavbar: !0,
    visible: 3
  };
  S.options.iconPanels = ue;
  var fe = {
    enable: !1,
    enhance: !1
  };
  S.options.keyboardNavigation = fe;

  var he = function he(e) {
    var t = this;
    N(document.body, "keydown.tabguard"), N(document.body, "focusin.tabguard"), C(document.body, "focusin.tabguard", function (e) {
      if (t.node.wrpr.matches(".mm-wrapper_opened")) {
        var n = e.target;

        if (n.matches(".mm-tabend")) {
          var i = void 0;
          n.parentElement.matches(".mm-menu") && S.node.blck && (i = S.node.blck), n.parentElement.matches(".mm-wrapper__blocker") && (i = g(document.body, ".mm-menu_offcanvas.mm-menu_opened")[0]), i || (i = n.parentElement), i && _(i, ".mm-tabstart")[0].focus();
        }
      }
    }), N(document.body, "keydown.navigate"), C(document.body, "keydown.navigate", function (t) {
      var n = t.target,
          i = n.closest(".mm-menu");

      if (i) {
        i.mmApi;
        if (!n.matches("input, textarea")) switch (t.keyCode) {
          case 13:
            (n.matches(".mm-toggle") || n.matches(".mm-check")) && n.dispatchEvent(new Event("click"));
            break;

          case 32:
          case 37:
          case 38:
          case 39:
          case 40:
            t.preventDefault();
        }
        if (e) if (n.matches("input")) switch (t.keyCode) {
          case 27:
            n.value = "";
        } else {
          var s = i.mmApi;

          switch (t.keyCode) {
            case 8:
              var a = g(i, ".mm-panel_opened")[0].mmParent;
              a && s.openPanel(a.closest(".mm-panel"));
              break;

            case 27:
              i.matches(".mm-menu_offcanvas") && s.close();
          }
        }
      }
    });
  },
      ve = {
    load: !1
  };

  S.options.lazySubmenus = ve;
  var be = [];
  var ge = {
    breadcrumbs: {
      separator: "/",
      removeFirst: !1
    }
  };

  function _e() {
    var e = this,
        t = this.opts.navbars;

    if (void 0 !== t) {
      t instanceof Array || (t = [t]);
      var n = {};
      t.length && (t.forEach(function (t) {
        if (!(t = function (e) {
          return "boolean" == typeof e && e && (e = {}), "object" != _typeof(e) && (e = {}), void 0 === e.content && (e.content = ["prev", "title"]), e.content instanceof Array || (e.content = [e.content]), void 0 === e.use && (e.use = !0), "boolean" == typeof e.use && e.use && (e.use = !0), e;
        }(t)).use) return !1;
        var i = b("div.mm-navbar"),
            s = t.position;
        "bottom" !== s && (s = "top"), n[s] || (n[s] = b("div.mm-navbars_" + s)), n[s].append(i);

        for (var a = 0, o = t.content.length; a < o; a++) {
          var r,
              c = t.content[a];
          if ("string" == typeof c) {
            if ("function" == typeof (r = _e.navbarContents[c])) r.call(e, i);else {
              var m = b("span");
              m.innerHTML = c;

              var l = _(m);

              1 == l.length && (m = l[0]), i.append(m);
            }
          } else i.append(c);
        }

        "string" == typeof t.type && "function" == typeof (r = _e.navbarTypes[t.type]) && r.call(e, i);
        "boolean" != typeof t.use && P(t.use, function () {
          i.classList.remove("mm-hidden"), S.sr_aria(i, "hidden", !1);
        }, function () {
          i.classList.add("mm-hidden"), S.sr_aria(i, "hidden", !0);
        });
      }), this.bind("initMenu:after", function () {
        for (var t in n) {
          e.node.menu["bottom" == t ? "append" : "prepend"](n[t]);
        }
      }));
    }
  }

  S.options.navbars = be, S.configs.navbars = ge, S.configs.classNames.navbars = {
    panelPrev: "Prev",
    panelTitle: "Title"
  }, _e.navbarContents = {
    breadcrumbs: function breadcrumbs(e) {
      var t = this,
          n = b("div.mm-navbar__breadcrumbs");
      e.append(n), this.bind("initNavbar:after", function (e) {
        if (!e.querySelector(".mm-navbar__breadcrumbs")) {
          _(e, ".mm-navbar")[0].classList.add("mm-hidden");

          for (var n = [], i = b("span.mm-navbar__breadcrumbs"), s = e, a = !0; s;) {
            if (!(s = s.closest(".mm-panel")).parentElement.matches(".mm-listitem_vertical")) {
              var o = g(s, ".mm-navbar__title span")[0];

              if (o) {
                var r = o.textContent;
                r.length && n.unshift(a ? "<span>" + r + "</span>" : '<a href="#' + s.id + '">' + r + "</a>");
              }

              a = !1;
            }

            s = s.mmParent;
          }

          t.conf.navbars.breadcrumbs.removeFirst && n.shift(), i.innerHTML = n.join('<span class="mm-separator">' + t.conf.navbars.breadcrumbs.separator + "</span>"), _(e, ".mm-navbar")[0].append(i);
        }
      }), this.bind("openPanel:start", function (e) {
        var t = e.querySelector(".mm-navbar__breadcrumbs");
        n.innerHTML = t ? t.innerHTML : "";
      }), this.bind("initNavbar:after:sr-aria", function (e) {
        g(e, ".mm-breadcrumbs a").forEach(function (e) {
          S.sr_aria(e, "owns", e.getAttribute("href").slice(1));
        });
      });
    },
    close: function close(e) {
      var t = this,
          n = b("a.mm-btn.mm-btn_close.mm-navbar__btn");
      e.append(n), this.bind("setPage:after", function (e) {
        n.setAttribute("href", "#" + e.id);
      }), this.bind("setPage:after:sr-text", function () {
        n.innerHTML = S.sr_text(t.i18n(t.conf.screenReader.text.closeMenu));
      });
    },
    prev: function prev(e) {
      var t,
          n,
          i,
          s = this,
          a = b("a.mm-btn.mm-btn_prev.mm-navbar__btn");
      e.append(a), this.bind("initNavbar:after", function (e) {
        _(e, ".mm-navbar")[0].classList.add("mm-hidden");
      }), this.bind("openPanel:start", function (e) {
        e.parentElement.matches(".mm-listitem_vertical") || ((t = e.querySelector("." + s.conf.classNames.navbars.panelPrev)) || (t = e.querySelector(".mm-navbar__btn.mm-btn_prev")), n = t ? t.getAttribute("href") : "", i = t ? t.innerHTML : "", n ? a.setAttribute("href", n) : a.removeAttribute("href"), a.classList[n || i ? "remove" : "add"]("mm-hidden"), a.innerHTML = i);
      }), this.bind("initNavbar:after:sr-aria", function (e) {
        S.sr_aria(e.querySelector(".mm-navbar"), "hidden", !0);
      }), this.bind("openPanel:start:sr-aria", function (e) {
        S.sr_aria(a, "hidden", a.matches(".mm-hidden")), S.sr_aria(a, "owns", (a.getAttribute("href") || "").slice(1));
      });
    },
    searchfield: function searchfield(e) {
      "object" != o(this.opts.searchfield) && (this.opts.searchfield = {});
      var t = b("div.mm-navbar__searchfield");
      e.append(t), this.opts.searchfield.add = !0, this.opts.searchfield.addTo = [t];
    },
    title: function title(e) {
      var t,
          n,
          i,
          s,
          a = this,
          o = b("a.mm-navbar__title"),
          r = b("span");
      o.append(r), e.append(o), this.bind("openPanel:start", function (e) {
        e.parentElement.matches(".mm-listitem_vertical") || ((i = e.querySelector("." + a.conf.classNames.navbars.panelTitle)) || (i = e.querySelector(".mm-navbar__title span")), (t = i && i.closest("a") ? i.closest("a").getAttribute("href") : "") ? o.setAttribute("href", t) : o.removeAttribute("href"), n = i ? i.innerHTML : "", r.innerHTML = n);
      }), this.bind("openPanel:start:sr-aria", function (e) {
        if (a.opts.screenReader.text) {
          if (!s) _(a.node.menu, ".mm-navbars_top, .mm-navbars_bottom").forEach(function (e) {
            var t = e.querySelector(".mm-btn_prev");
            t && (s = t);
          });

          if (s) {
            var t = !0;
            "parent" == a.opts.navbar.titleLink && (t = !s.matches(".mm-hidden")), S.sr_aria(o, "hidden", t);
          }
        }
      });
    }
  }, _e.navbarTypes = {
    tabs: function tabs(e) {
      var t = this;
      e.classList.add("mm-navbar_tabs"), e.parentElement.classList.add("mm-navbars_has-tabs");

      var n = _(e, "a");

      e.addEventListener("click", function (e) {
        var n = e.target;
        if (n.matches("a")) if (n.matches(".mm-navbar__tab_selected")) e.stopImmediatePropagation();else try {
          t.openPanel(t.node.menu.querySelector(n.getAttribute("href")), !1), e.stopImmediatePropagation();
        } catch (e) {}
      }), this.bind("openPanel:start", function e(t) {
        n.forEach(function (e) {
          e.classList.remove("mm-navbar__tab_selected");
        });
        var i = n.filter(function (e) {
          return e.matches('[href="#' + t.id + '"]');
        })[0];
        if (i) i.classList.add("mm-navbar__tab_selected");else {
          var s = t.mmParent;
          s && e.call(this, s.closest(".mm-panel"));
        }
      });
    }
  };
  var ye = {
    scroll: !1,
    update: !1
  };
  var Le = {
    scrollOffset: 0,
    updateOffset: 50
  };
  S.options.pageScroll = ye, S.configs.pageScroll = Le;
  var we = {
    add: !1,
    addTo: "panels",
    cancel: !1,
    noResults: "No results found.",
    placeholder: "Search",
    panel: {
      add: !1,
      dividers: !0,
      fx: "none",
      id: null,
      splash: null,
      title: "Search"
    },
    search: !0,
    showTextItems: !1,
    showSubPanels: !0
  };

  var Ee = {
    clear: !1,
    form: !1,
    input: !1,
    submit: !1
  },
      xe = {
    Search: "جستجو",
    "No results found.": "نتیجه‌ای یافت نشد.",
    cancel: "انصراف"
  },
      Pe = {
    Search: "Suche",
    "No results found.": "Keine Ergebnisse gefunden.",
    cancel: "beenden"
  },
      ke = {
    Search: "Найти",
    "No results found.": "Ничего не найдено.",
    cancel: "отменить"
  },
      Se = function Se() {
    for (var e = 0, t = 0, n = arguments.length; t < n; t++) {
      e += arguments[t].length;
    }

    var i = Array(e),
        s = 0;

    for (t = 0; t < n; t++) {
      for (var a = arguments[t], o = 0, r = a.length; o < r; o++, s++) {
        i[s] = a[o];
      }
    }

    return i;
  };

  u({
    Search: "Zoeken",
    "No results found.": "Geen resultaten gevonden.",
    cancel: "annuleren"
  }, "nl"), u(xe, "fa"), u(Pe, "de"), u(ke, "ru"), S.options.searchfield = we, S.configs.searchfield = Ee;

  var Me = function Me() {
    var e = this.opts.searchfield,
        t = (this.conf.searchfield, _(this.node.pnls, ".mm-panel_search")[0]);
    if (t) return t;
    t = b("div.mm-panel.mm-panel_search.mm-hidden"), e.panel.id && (t.id = e.panel.id), e.panel.title && t.setAttribute("data-mm-title", e.panel.title);
    var n = b("ul");

    switch (t.append(n), this.node.pnls.append(t), this.initListview(n), this._initNavbar(t), e.panel.fx) {
      case !1:
        break;

      case "none":
        t.classList.add("mm-panel_noanimation");
        break;

      default:
        t.classList.add("mm-panel_fx-" + e.panel.fx);
    }

    if (e.panel.splash) {
      var i = b("div.mm-panel__content");
      i.innerHTML = e.panel.splash, t.append(i);
    }

    return t.classList.add("mm-panel"), t.classList.add("mm-hidden"), this.node.pnls.append(t), t;
  },
      Ae = function Ae(e) {
    var t = this.opts.searchfield,
        n = this.conf.searchfield;
    if (e.parentElement.matches(".mm-listitem_vertical")) return null;
    if (a = g(e, ".mm-searchfield")[0]) return a;

    function i(e, t) {
      if (t) for (var n in t) {
        e.setAttribute(n, t[n]);
      }
    }

    var s,
        a = b((n.form ? "form" : "div") + ".mm-searchfield"),
        o = b("div.mm-searchfield__input"),
        r = b("input");
    (r.type = "text", r.autocomplete = "off", r.placeholder = this.i18n(t.placeholder), o.append(r), a.append(o), e.prepend(a), i(r, n.input), n.clear) && ((s = b("a.mm-btn.mm-btn_close.mm-searchfield__btn")).setAttribute("href", "#"), o.append(s));
    (i(a, n.form), n.form && n.submit && !n.clear) && ((s = b("a.mm-btn.mm-btn_next.mm-searchfield__btn")).setAttribute("href", "#"), o.append(s));
    t.cancel && ((s = b("a.mm-searchfield__cancel")).setAttribute("href", "#"), s.textContent = this.i18n("cancel"), a.append(s));
    return a;
  },
      Te = function Te(e) {
    var t = this,
        n = this.opts.searchfield,
        i = (this.conf.searchfield, {});
    e.closest(".mm-panel_search") ? (i.panels = g(this.node.pnls, ".mm-panel"), i.noresults = [e.closest(".mm-panel")]) : e.closest(".mm-panel") ? (i.panels = [e.closest(".mm-panel")], i.noresults = i.panels) : (i.panels = g(this.node.pnls, ".mm-panel"), i.noresults = [this.node.menu]), i.panels = i.panels.filter(function (e) {
      return !e.matches(".mm-panel_search");
    }), i.panels = i.panels.filter(function (e) {
      return !e.parentElement.matches(".mm-listitem_vertical");
    }), i.listitems = [], i.dividers = [], i.panels.forEach(function (e) {
      var t, n;
      (t = i.listitems).push.apply(t, g(e, ".mm-listitem")), (n = i.dividers).push.apply(n, g(e, ".mm-divider"));
    });

    var s = _(this.node.pnls, ".mm-panel_search")[0],
        a = g(e, "input")[0],
        o = g(e, ".mm-searchfield__cancel")[0];

    a.mmSearchfield = i, n.panel.add && n.panel.splash && (N(a, "focus.splash"), C(a, "focus.splash", function (e) {
      t.openPanel(s);
    })), n.cancel && (N(a, "focus.cancel"), C(a, "focus.cancel", function (e) {
      o.classList.add("mm-searchfield__cancel-active");
    }), N(o, "click.splash"), C(o, "click.splash", function (e) {
      if (e.preventDefault(), o.classList.remove("mm-searchfield__cancel-active"), s.matches(".mm-panel_opened")) {
        var n = _(t.node.pnls, ".mm-panel_opened-parent");

        n.length && t.openPanel(n[n.length - 1]);
      }
    })), n.panel.add && "panel" == n.addTo && this.bind("openPanel:finish", function (e) {
      e === s && a.focus();
    }), N(a, "input.search"), C(a, "input.search", function (e) {
      switch (e.keyCode) {
        case 9:
        case 16:
        case 17:
        case 18:
        case 37:
        case 38:
        case 39:
        case 40:
          break;

        default:
          t.search(a);
      }
    }), this.search(a);
  },
      Ce = function Ce(e) {
    if (e) {
      var t = this.opts.searchfield;
      this.conf.searchfield;

      if (e.closest(".mm-panel") || (e = _(this.node.pnls, ".mm-panel")[0]), !_(e, ".mm-panel__noresultsmsg").length) {
        var n = b("div.mm-panel__noresultsmsg.mm-hidden");
        n.innerHTML = this.i18n(t.noResults), e.append(n);
      }
    }
  };

  S.prototype.search = function (e, t) {
    var n,
        i = this,
        s = this.opts.searchfield;
    this.conf.searchfield;
    t = (t = t || "" + e.value).toLowerCase().trim();

    var a = e.mmSearchfield,
        o = g(e.closest(".mm-searchfield"), ".mm-btn"),
        r = _(this.node.pnls, ".mm-panel_search")[0],
        c = a.panels,
        m = a.noresults,
        l = a.listitems,
        d = a.dividers;

    if (l.forEach(function (e) {
      e.classList.remove("mm-listitem_nosubitems"), e.classList.remove("mm-listitem_onlysubitems"), e.classList.remove("mm-hidden");
    }), r && (_(r, ".mm-listview")[0].innerHTML = ""), c.forEach(function (e) {
      e.scrollTop = 0;
    }), t.length) {
      d.forEach(function (e) {
        e.classList.add("mm-hidden");
      }), l.forEach(function (e) {
        var n,
            i = _(e, ".mm-listitem__text")[0],
            a = !1;

        i && (n = i, Array.prototype.slice.call(n.childNodes).filter(function (e) {
          return 3 == e.nodeType;
        }).map(function (e) {
          return e.textContent;
        }).join(" ")).toLowerCase().indexOf(t) > -1 && (i.matches(".mm-listitem__btn") ? s.showSubPanels && (a = !0) : (i.matches("a") || s.showTextItems) && (a = !0)), a || e.classList.add("mm-hidden");
      });
      var p = l.filter(function (e) {
        return !e.matches(".mm-hidden");
      }).length;

      if (s.panel.add) {
        var u = [];
        c.forEach(function (e) {
          var t = L(g(e, ".mm-listitem"));

          if ((t = t.filter(function (e) {
            return !e.matches(".mm-hidden");
          })).length) {
            if (s.panel.dividers) {
              var n = b("li.mm-divider"),
                  i = g(e, ".mm-navbar__title")[0];
              i && (n.innerHTML = i.innerHTML, u.push(n));
            }

            t.forEach(function (e) {
              u.push(e.cloneNode(!0));
            });
          }
        }), u.forEach(function (e) {
          e.querySelectorAll(".mm-toggle, .mm-check").forEach(function (e) {
            e.remove();
          });
        }), (n = _(r, ".mm-listview")[0]).append.apply(n, u), this.openPanel(r);
      } else s.showSubPanels && c.forEach(function (e) {
        L(g(e, ".mm-listitem")).forEach(function (e) {
          var t = e.mmChild;
          t && g(t, ".mm-listitem").forEach(function (e) {
            e.classList.remove("mm-hidden");
          });
        });
      }), Se(c).reverse().forEach(function (t, n) {
        var s = t.mmParent;
        s && (L(g(t, ".mm-listitem")).length ? (s.matches(".mm-hidden") && s.classList.remove("mm-hidden"), s.classList.add("mm-listitem_onlysubitems")) : e.closest(".mm-panel") || ((t.matches(".mm-panel_opened") || t.matches(".mm-panel_opened-parent")) && setTimeout(function () {
          i.openPanel(s.closest(".mm-panel"));
        }, (n + 1) * (1.5 * i.conf.openingInterval)), s.classList.add("mm-listitem_nosubitems")));
      }), c.forEach(function (e) {
        L(g(e, ".mm-listitem")).forEach(function (e) {
          y(e, ".mm-listitem_vertical").forEach(function (e) {
            e.matches(".mm-hidden") && (e.classList.remove("mm-hidden"), e.classList.add("mm-listitem_onlysubitems"));
          });
        });
      }), c.forEach(function (e) {
        L(g(e, ".mm-listitem")).forEach(function (e) {
          var t = function (e, t) {
            for (var n = [], i = e.previousElementSibling; i;) {
              t && !i.matches(t) || n.push(i), i = i.previousElementSibling;
            }

            return n;
          }(e, ".mm-divider")[0];

          t && t.classList.remove("mm-hidden");
        });
      });

      o.forEach(function (e) {
        return e.classList.remove("mm-hidden");
      }), m.forEach(function (e) {
        g(e, ".mm-panel__noresultsmsg").forEach(function (e) {
          return e.classList[p ? "add" : "remove"]("mm-hidden");
        });
      }), s.panel.add && (s.panel.splash && g(r, ".mm-panel__content").forEach(function (e) {
        return e.classList.add("mm-hidden");
      }), l.forEach(function (e) {
        return e.classList.remove("mm-hidden");
      }), d.forEach(function (e) {
        return e.classList.remove("mm-hidden");
      }));
    } else if (l.forEach(function (e) {
      return e.classList.remove("mm-hidden");
    }), d.forEach(function (e) {
      return e.classList.remove("mm-hidden");
    }), o.forEach(function (e) {
      return e.classList.add("mm-hidden");
    }), m.forEach(function (e) {
      g(e, ".mm-panel__noresultsmsg").forEach(function (e) {
        return e.classList.add("mm-hidden");
      });
    }), s.panel.add) if (s.panel.splash) g(r, ".mm-panel__content").forEach(function (e) {
      return e.classList.remove("mm-hidden");
    });else if (!e.closest(".mm-panel_search")) {
      var f = _(this.node.pnls, ".mm-panel_opened-parent");

      this.openPanel(f.slice(-1)[0]);
    }

    this.trigger("updateListview");
  };

  var Ne = {
    add: !1,
    addTo: "panels"
  };
  S.options.sectionIndexer = Ne;
  var He = {
    current: !0,
    hover: !1,
    parent: !1
  };
  S.options.setSelected = He;
  var je = {
    collapsed: {
      use: !1,
      blockMenu: !0,
      hideDivider: !1,
      hideNavbar: !0
    },
    expanded: {
      use: !1,
      initial: "open"
    }
  };
  S.options.sidebar = je;
  S.configs.classNames.toggles = {
    toggle: "Toggle",
    check: "Check"
  };
  /*!
   * mmenu.js
   * mmenujs.com
   *
   * Copyright (c) Fred Heusschen
   * frebsite.nl
   */

  S.addons = {
    offcanvas: function offcanvas() {
      var e = this;

      if (this.opts.offCanvas) {
        var t = function (e) {
          return "object" != _typeof(e) && (e = {}), e;
        }(this.opts.offCanvas);

        this.opts.offCanvas = a(t, S.options.offCanvas);
        var n = this.conf.offCanvas;
        this._api.push("open", "close", "setPage"), this.vars.opened = !1, this.bind("initMenu:before", function () {
          n.clone && (e.node.menu = e.node.menu.cloneNode(!0), e.node.menu.id && (e.node.menu.id = "mm-" + e.node.menu.id), g(e.node.menu, "[id]").forEach(function (e) {
            e.id = "mm-" + e.id;
          })), e.node.wrpr = document.body, document.querySelector(n.menu.insertSelector)[n.menu.insertMethod](e.node.menu);
        }), this.bind("initMenu:after", function () {
          j.call(e), e.setPage(S.node.page), H.call(e), e.node.menu.classList.add("mm-menu_offcanvas");
          var t = window.location.hash;

          if (t) {
            var n = d(e.node.menu.id);
            n && n == t.slice(1) && setTimeout(function () {
              e.open();
            }, 1e3);
          }
        }), this.bind("setPage:after", function (e) {
          S.node.blck && _(S.node.blck, "a").forEach(function (t) {
            t.setAttribute("href", "#" + e.id);
          });
        }), this.bind("open:start:sr-aria", function () {
          S.sr_aria(e.node.menu, "hidden", !1);
        }), this.bind("close:finish:sr-aria", function () {
          S.sr_aria(e.node.menu, "hidden", !0);
        }), this.bind("initMenu:after:sr-aria", function () {
          S.sr_aria(e.node.menu, "hidden", !0);
        }), this.bind("initBlocker:after:sr-text", function () {
          _(S.node.blck, "a").forEach(function (t) {
            t.innerHTML = S.sr_text(e.i18n(e.conf.screenReader.text.closeMenu));
          });
        }), this.clck.push(function (t, n) {
          var i = d(e.node.menu.id);

          if (i && t.matches('[href="#' + i + '"]')) {
            if (n.inMenu) return e.open(), !0;
            var s = t.closest(".mm-menu");

            if (s) {
              var a = s.mmApi;
              if (a && a.close) return a.close(), c(s, function () {
                e.open();
              }, e.conf.transitionDuration), !0;
            }

            return e.open(), !0;
          }

          if ((i = S.node.page.id) && t.matches('[href="#' + i + '"]')) return e.close(), !0;
        });
      }
    },
    screenReader: function screenReader() {
      var e = this,
          t = function (e) {
        return "boolean" == typeof e && (e = {
          aria: e,
          text: e
        }), "object" != _typeof(e) && (e = {}), e;
      }(this.opts.screenReader);

      this.opts.screenReader = a(t, S.options.screenReader);
      var n = this.conf.screenReader;
      t.aria && (this.bind("initAddons:after", function () {
        e.bind("initMenu:after", function () {
          this.trigger("initMenu:after:sr-aria", [].slice.call(arguments));
        }), e.bind("initNavbar:after", function () {
          this.trigger("initNavbar:after:sr-aria", [].slice.call(arguments));
        }), e.bind("openPanel:start", function () {
          this.trigger("openPanel:start:sr-aria", [].slice.call(arguments));
        }), e.bind("close:start", function () {
          this.trigger("close:start:sr-aria", [].slice.call(arguments));
        }), e.bind("close:finish", function () {
          this.trigger("close:finish:sr-aria", [].slice.call(arguments));
        }), e.bind("open:start", function () {
          this.trigger("open:start:sr-aria", [].slice.call(arguments));
        }), e.bind("initOpened:after", function () {
          this.trigger("initOpened:after:sr-aria", [].slice.call(arguments));
        });
      }), this.bind("updateListview", function () {
        e.node.pnls.querySelectorAll(".mm-listitem").forEach(function (e) {
          S.sr_aria(e, "hidden", e.matches(".mm-hidden"));
        });
      }), this.bind("openPanel:start", function (t) {
        var n = g(e.node.pnls, ".mm-panel").filter(function (e) {
          return e !== t;
        }).filter(function (e) {
          return !e.parentElement.matches(".mm-panel");
        }),
            i = [t];
        g(t, ".mm-listitem_vertical .mm-listitem_opened").forEach(function (e) {
          i.push.apply(i, _(e, ".mm-panel"));
        }), n.forEach(function (e) {
          S.sr_aria(e, "hidden", !0);
        }), i.forEach(function (e) {
          S.sr_aria(e, "hidden", !1);
        });
      }), this.bind("closePanel", function (e) {
        S.sr_aria(e, "hidden", !0);
      }), this.bind("initNavbar:after", function (e) {
        var t = _(e, ".mm-navbar")[0],
            n = t.matches(".mm-hidden");

        S.sr_aria(t, "hidden", n);
      }), t.text && "parent" == this.opts.navbar.titleLink && this.bind("initNavbar:after", function (e) {
        var t = _(e, ".mm-navbar")[0],
            n = !!t.querySelector(".mm-btn_prev");

        S.sr_aria(g(t, ".mm-navbar__title")[0], "hidden", n);
      })), t.text && (this.bind("initAddons:after", function () {
        e.bind("setPage:after", function () {
          this.trigger("setPage:after:sr-text", [].slice.call(arguments));
        }), e.bind("initBlocker:after", function () {
          this.trigger("initBlocker:after:sr-text", [].slice.call(arguments));
        });
      }), this.bind("initNavbar:after", function (t) {
        var i = _(t, ".mm-navbar")[0];

        if (i) {
          var s = _(i, ".mm-btn_prev")[0];

          s && (s.innerHTML = S.sr_text(e.i18n(n.text.closeSubmenu)));
        }
      }), this.bind("initListview:after", function (t) {
        var i = t.closest(".mm-panel").mmParent;

        if (i) {
          var s = _(i, ".mm-btn_next")[0];

          if (s) {
            var a = e.i18n(n.text[s.parentElement.matches(".mm-listitem_vertical") ? "toggleSubmenu" : "openSubmenu"]);
            s.innerHTML += S.sr_text(a);
          }
        }
      }));
    },
    scrollBugFix: function scrollBugFix() {
      var e = this;

      if (U && this.opts.offCanvas && this.opts.offCanvas.blockUI) {
        var t = function (e) {
          return "boolean" == typeof e && (e = {
            fix: e
          }), "object" != _typeof(e) && (e = {}), e;
        }(this.opts.scrollBugFix);

        if (this.opts.scrollBugFix = a(t, S.options.scrollBugFix), t.fix) {
          var n,
              i,
              s = (n = this.node.menu, i = "", n.addEventListener("touchmove", function (e) {
            i = "", e.movementY > 0 ? i = "down" : e.movementY < 0 && (i = "up");
          }), {
            get: function get() {
              return i;
            }
          });
          this.node.menu.addEventListener("scroll", o, {
            passive: !1
          }), this.node.menu.addEventListener("touchmove", function (e) {
            var t = e.target.closest(".mm-panel, .mm-iconbar__top, .mm-iconbar__bottom");
            t && t.closest(".mm-listitem_vertical") && (t = y(t, ".mm-panel").pop()), t ? (t.scrollHeight === t.offsetHeight || 0 == t.scrollTop && "down" == s.get() || t.scrollHeight == t.scrollTop + t.offsetHeight && "up" == s.get()) && o(e) : o(e);
          }, {
            passive: !1
          }), this.bind("open:start", function () {
            var t = _(e.node.pnls, ".mm-panel_opened")[0];

            t && (t.scrollTop = 0);
          }), window.addEventListener("orientationchange", function (t) {
            var n = _(e.node.pnls, ".mm-panel_opened")[0];

            n && (n.scrollTop = 0, n.style["-webkit-overflow-scrolling"] = "auto", n.style["-webkit-overflow-scrolling"] = "touch");
          });
        }
      }

      function o(e) {
        e.preventDefault(), e.stopPropagation();
      }
    },
    autoHeight: function autoHeight() {
      var e = this,
          t = function (e) {
        return "boolean" == typeof e && e && (e = {
          height: "auto"
        }), "string" == typeof e && (e = {
          height: e
        }), "object" != _typeof(e) && (e = {}), e;
      }(this.opts.autoHeight);

      if (this.opts.autoHeight = a(t, S.options.autoHeight), "auto" == t.height || "highest" == t.height) {
        var n,
            i = (n = function n(e) {
          return e.parentElement.matches(".mm-listitem_vertical") && (e = y(e, ".mm-panel").filter(function (e) {
            return !e.parentElement.matches(".mm-listitem_vertical");
          })[0]), e;
        }, function () {
          if (!e.opts.offCanvas || e.vars.opened) {
            var i,
                s,
                a = 0,
                o = e.node.menu.offsetHeight - e.node.pnls.offsetHeight;
            e.node.menu.classList.add("mm-menu_autoheight-measuring"), "auto" == t.height ? ((s = _(e.node.pnls, ".mm-panel_opened")[0]) && (s = n(s)), s || (s = _(e.node.pnls, ".mm-panel")[0]), a = s.scrollHeight) : "highest" == t.height && (i = 0, _(e.node.pnls, ".mm-panel").forEach(function (e) {
              e = n(e), i = Math.max(i, e.scrollHeight);
            }), a = i), e.node.menu.style.height = a + o + "px", e.node.menu.classList.remove("mm-menu_autoheight-measuring");
          }
        });
        this.bind("initMenu:after", function () {
          e.node.menu.classList.add("mm-menu_autoheight");
        }), this.opts.offCanvas && this.bind("open:start", i), "highest" == t.height && this.bind("initPanels:after", i), "auto" == t.height && (this.bind("updateListview", i), this.bind("openPanel:start", i));
      }
    },
    backButton: function backButton() {
      var e = this;

      if (this.opts.offCanvas) {
        var t = function (e) {
          return "boolean" == typeof e && (e = {
            close: e
          }), "object" != _typeof(e) && (e = {}), e;
        }(this.opts.backButton);

        this.opts.backButton = a(t, S.options.backButton);
        var n = "#" + this.node.menu.id;

        if (t.close) {
          var i = [],
              s = function s() {
            i = [n], _(e.node.pnls, ".mm-panel_opened, .mm-panel_opened-parent").forEach(function (e) {
              i.push("#" + e.id);
            });
          };

          this.bind("open:finish", function () {
            history.pushState(null, document.title, n);
          }), this.bind("open:finish", s), this.bind("openPanel:finish", s), this.bind("close:finish", function () {
            i = [], history.back(), history.pushState(null, document.title, location.pathname + location.search);
          }), window.addEventListener("popstate", function (t) {
            if (e.vars.opened && i.length) {
              var s = (i = i.slice(0, -1))[i.length - 1];
              s == n ? e.close() : (e.openPanel(e.node.menu.querySelector(s)), history.pushState(null, document.title, n));
            }
          });
        }

        t.open && window.addEventListener("popstate", function (t) {
          e.vars.opened || location.hash != n || e.open();
        });
      }
    },
    columns: function columns() {
      var e = this,
          t = function (e) {
        return "boolean" == typeof e && (e = {
          add: e
        }), "number" == typeof e && (e = {
          add: !0,
          visible: e
        }), "object" != _typeof(e) && (e = {}), "number" == typeof e.visible && (e.visible = {
          min: e.visible,
          max: e.visible
        }), e;
      }(this.opts.columns);

      if (this.opts.columns = a(t, S.options.columns), t.add) {
        t.visible.min = Math.max(1, Math.min(6, t.visible.min)), t.visible.max = Math.max(t.visible.min, Math.min(6, t.visible.max));

        for (var n = [], i = [], s = ["mm-panel_opened", "mm-panel_opened-parent", "mm-panel_highest"], o = 0; o <= t.visible.max; o++) {
          n.push("mm-menu_columns-" + o), i.push("mm-panel_columns-" + o);
        }

        s.push.apply(s, i), this.bind("openPanel:before", function (t) {
          var n;

          if (t && (n = t.mmParent), n && !n.classList.contains("mm-listitem_vertical") && (n = n.closest(".mm-panel"))) {
            var i = n.className;
            if (i.length && (i = i.split("mm-panel_columns-")[1])) for (var a = parseInt(i.split(" ")[0], 10) + 1; a > 0;) {
              if (!(t = _(e.node.pnls, ".mm-panel_columns-" + a)[0])) {
                a = -1;
                break;
              }

              a++, t.classList.add("mm-hidden"), s.forEach(function (e) {
                t.classList.remove(e);
              });
            }
          }
        }), this.bind("openPanel:start", function (s) {
          if (s) {
            var a = s.mmParent;
            if (a && a.classList.contains("mm-listitem_vertical")) return;
          }

          var o = _(e.node.pnls, ".mm-panel_opened-parent").length;

          s.matches(".mm-panel_opened-parent") || o++, o = Math.min(t.visible.max, Math.max(t.visible.min, o)), n.forEach(function (t) {
            e.node.menu.classList.remove(t);
          }), e.node.menu.classList.add("mm-menu_columns-" + o);
          var r = [];
          _(e.node.pnls, ".mm-panel").forEach(function (e) {
            i.forEach(function (t) {
              e.classList.remove(t);
            }), e.matches(".mm-panel_opened-parent") && r.push(e);
          }), r.push(s), r.slice(-t.visible.max).forEach(function (e, t) {
            e.classList.add("mm-panel_columns-" + t);
          });
        });
      }
    },
    counters: function counters() {
      var e = this,
          t = function (e) {
        return "boolean" == typeof e && (e = {
          add: e,
          addTo: "panels",
          count: e
        }), "object" != _typeof(e) && (e = {}), "panels" == e.addTo && (e.addTo = ".mm-listview"), e;
      }(this.opts.counters);

      if (this.opts.counters = a(t, S.options.counters), this.bind("initListview:after", function (t) {
        var n = e.conf.classNames.counters.counter;
        g(t, "." + n).forEach(function (e) {
          E(e, n, "mm-counter");
        });
      }), t.add && this.bind("initListview:after", function (e) {
        if (e.matches(t.addTo)) {
          var n = e.closest(".mm-panel").mmParent;

          if (n && !g(n, ".mm-counter").length) {
            var i = _(n, ".mm-btn")[0];

            i && i.prepend(b("span.mm-counter"));
          }
        }
      }), t.count) {
        var n = function n(t) {
          (t ? [t.closest(".mm-panel")] : _(e.node.pnls, ".mm-panel")).forEach(function (e) {
            var t = e.mmParent;

            if (t) {
              var n = g(t, ".mm-counter")[0];

              if (n) {
                var i = [];
                _(e, ".mm-listview").forEach(function (e) {
                  i.push.apply(i, _(e));
                }), n.innerHTML = L(i).length.toString();
              }
            }
          });
        };

        this.bind("initListview:after", n), this.bind("updateListview", n);
      }
    },
    dividers: function dividers() {
      var e = this,
          t = function (e) {
        return "boolean" == typeof e && (e = {
          add: e
        }), "object" != _typeof(e) && (e = {}), "panels" == e.addTo && (e.addTo = ".mm-listview"), e;
      }(this.opts.dividers);

      this.opts.dividers = a(t, S.options.dividers), this.bind("initListview:after", function (t) {
        _(t).forEach(function (t) {
          E(t, e.conf.classNames.divider, "mm-divider"), t.matches(".mm-divider") && t.classList.remove("mm-listitem");
        });
      }), t.add && this.bind("initListview:after", function (e) {
        if (e.matches(t.addTo)) {
          g(e, ".mm-divider").forEach(function (e) {
            e.remove();
          });
          var n = "";
          L(_(e)).forEach(function (t) {
            var i = _(t, ".mm-listitem__text")[0].textContent.trim().toLowerCase()[0];

            if (i.length && i != n) {
              n = i;
              var s = b("li.mm-divider");
              s.textContent = i, e.insertBefore(s, t);
            }
          });
        }
      });
    },
    drag: function drag() {
      var e = this;

      if (this.opts.offCanvas) {
        var t = function (e) {
          return "boolean" == typeof e && (e = {
            open: e
          }), "object" != _typeof(e) && (e = {}), e;
        }(this.opts.drag);

        this.opts.drag = a(t, S.options.drag), t.open && this.bind("setPage:after", function (n) {
          re.call(e, t.node || n);
        });
      }
    },
    dropdown: function dropdown() {
      var e = this;

      if (this.opts.offCanvas) {
        var t = function (e) {
          return "boolean" == typeof e && e && (e = {
            drop: e
          }), "object" != _typeof(e) && (e = {}), "string" == typeof e.position && (e.position = {
            of: e.position
          }), e;
        }(this.opts.dropdown);

        this.opts.dropdown = a(t, S.options.dropdown);
        var n = this.conf.dropdown;

        if (t.drop) {
          var i;
          this.bind("initMenu:after", function () {
            if (e.node.menu.classList.add("mm-menu_dropdown"), "string" != typeof t.position.of) {
              var n = d(e.node.menu.id);
              n && (t.position.of = '[href="#' + n + '"]');
            }

            if ("string" == typeof t.position.of) {
              i = g(document.body, t.position.of)[0];
              var s = t.event.split(" ");
              1 == s.length && (s[1] = s[0]), "hover" == s[0] && i.addEventListener("mouseenter", function () {
                e.open();
              }, {
                passive: !0
              }), "hover" == s[1] && e.node.menu.addEventListener("mouseleave", function () {
                e.close();
              }, {
                passive: !0
              });
            }
          }), this.bind("open:start", function () {
            e.node.menu.mmStyle = e.node.menu.getAttribute("style"), e.node.wrpr.classList.add("mm-wrapper_dropdown");
          }), this.bind("close:finish", function () {
            e.node.menu.setAttribute("style", e.node.menu.mmStyle), e.node.wrpr.classList.remove("mm-wrapper_dropdown");
          });

          var s = function s(e, _s) {
            var a,
                o,
                r,
                c = _s[0],
                m = _s[1],
                l = "x" == e ? "offsetWidth" : "offsetHeight",
                d = "x" == e ? "left" : "top",
                p = "x" == e ? "right" : "bottom",
                u = "x" == e ? "width" : "height",
                f = "x" == e ? "innerWidth" : "innerHeight",
                h = "x" == e ? "maxWidth" : "maxHeight",
                v = null,
                b = (a = d, i.getBoundingClientRect()[a] + document.body["left" === a ? "scrollLeft" : "scrollTop"]),
                g = b + i[l],
                _ = window[f],
                y = n.offset.button[e] + n.offset.viewport[e];
            if (t.position[e]) switch (t.position[e]) {
              case "left":
              case "bottom":
                v = "after";
                break;

              case "right":
              case "top":
                v = "before";
            }
            return null === v && (v = b + (g - b) / 2 < _ / 2 ? "after" : "before"), "after" == v ? (r = _ - ((o = "x" == e ? b : g) + y), c[d] = o + n.offset.button[e] + "px", c[p] = "auto", t.tip && m.push("mm-menu_tip-" + ("x" == e ? "left" : "top"))) : (r = (o = "x" == e ? g : b) - y, c[p] = "calc( 100% - " + (o - n.offset.button[e]) + "px )", c[d] = "auto", t.tip && m.push("mm-menu_tip-" + ("x" == e ? "right" : "bottom"))), t.fitViewport && (c[h] = Math.min(n[u].max, r) + "px"), [c, m];
          };

          this.bind("open:start", o), window.addEventListener("resize", function (t) {
            o.call(e);
          }, {
            passive: !0
          }), this.opts.offCanvas.blockUI || window.addEventListener("scroll", function (t) {
            o.call(e);
          }, {
            passive: !0
          });
        }
      }

      function o() {
        var e = this;

        if (this.vars.opened) {
          this.node.menu.setAttribute("style", this.node.menu.mmStyle);
          var n = [{}, []];

          for (var i in n = s.call(this, "y", n), (n = s.call(this, "x", n))[0]) {
            this.node.menu.style[i] = n[0][i];
          }

          if (t.tip) {
            ["mm-menu_tip-left", "mm-menu_tip-right", "mm-menu_tip-top", "mm-menu_tip-bottom"].forEach(function (t) {
              e.node.menu.classList.remove(t);
            }), n[1].forEach(function (t) {
              e.node.menu.classList.add(t);
            });
          }
        }
      }
    },
    fixedElements: function fixedElements() {
      var e = this;

      if (this.opts.offCanvas) {
        var t,
            n,
            i = this.conf.fixedElements;
        this.bind("setPage:after", function (s) {
          t = e.conf.classNames.fixedElements.fixed, n = g(document, i.insertSelector)[0], g(s, "." + t).forEach(function (e) {
            E(e, t, "mm-slideout"), n[i.insertMethod](e);
          });
        });
      }
    },
    iconbar: function iconbar() {
      var e,
          t = this,
          n = function (e) {
        return "array" == o(e) && (e = {
          use: !0,
          top: e
        }), "object" != o(e) && (e = {}), void 0 === e.use && (e.use = !0), "boolean" == typeof e.use && e.use && (e.use = !0), e;
      }(this.opts.iconbar);

      if ((this.opts.iconbar = a(n, S.options.iconbar), n.use) && (["top", "bottom"].forEach(function (t, i) {
        var s = n[t];
        "array" != o(s) && (s = [s]);

        for (var a = b("div.mm-iconbar__" + t), r = 0, c = s.length; r < c; r++) {
          "string" == typeof s[r] ? a.innerHTML += s[r] : a.append(s[r]);
        }

        a.children.length && (e || (e = b("div.mm-iconbar")), e.append(a));
      }), e)) {
        this.bind("initMenu:after", function () {
          t.node.menu.prepend(e);
        });

        var i = "mm-menu_iconbar-" + n.position,
            s = function s() {
          t.node.menu.classList.add(i), S.sr_aria(e, "hidden", !1);
        };

        if ("boolean" == typeof n.use ? this.bind("initMenu:after", s) : P(n.use, s, function () {
          t.node.menu.classList.remove(i), S.sr_aria(e, "hidden", !0);
        }), "tabs" == n.type) {
          e.classList.add("mm-iconbar_tabs"), e.addEventListener("click", function (e) {
            var n = e.target;
            if (n.matches("a")) if (n.matches(".mm-iconbar__tab_selected")) e.stopImmediatePropagation();else try {
              var i = t.node.menu.querySelector(n.getAttribute("href"))[0];
              i && i.matches(".mm-panel") && (e.preventDefault(), e.stopImmediatePropagation(), t.openPanel(i, !1));
            } catch (e) {}
          });

          var r = function r(t) {
            g(e, "a").forEach(function (e) {
              e.classList.remove("mm-iconbar__tab_selected");
            });
            var n = g(e, '[href="#' + t.id + '"]')[0];
            if (n) n.classList.add("mm-iconbar__tab_selected");else {
              var i = t.mmParent;
              i && r(i.closest(".mm-panel"));
            }
          };

          this.bind("openPanel:start", r);
        }
      }
    },
    iconPanels: function iconPanels() {
      var e = this,
          t = function (e) {
        return "boolean" == typeof e && (e = {
          add: e
        }), "number" != typeof e && "string" != typeof e || (e = {
          add: !0,
          visible: e
        }), "object" != _typeof(e) && (e = {}), e;
      }(this.opts.iconPanels);

      this.opts.iconPanels = a(t, S.options.iconPanels);
      var n = !1;

      if ("first" == t.visible && (n = !0, t.visible = 1), t.visible = Math.min(3, Math.max(1, t.visible)), t.visible++, t.add) {
        this.bind("initMenu:after", function () {
          var n = ["mm-menu_iconpanel"];
          t.hideNavbar && n.push("mm-menu_hidenavbar"), t.hideDivider && n.push("mm-menu_hidedivider"), n.forEach(function (t) {
            e.node.menu.classList.add(t);
          });
        });
        var i = [];
        if (!n) for (var s = 0; s <= t.visible; s++) {
          i.push("mm-panel_iconpanel-" + s);
        }
        this.bind("openPanel:start", function (s) {
          var a = _(e.node.pnls, ".mm-panel");

          if (!(s = s || a[0]).parentElement.matches(".mm-listitem_vertical")) if (n) a.forEach(function (e, t) {
            e.classList[0 == t ? "add" : "remove"]("mm-panel_iconpanel-first");
          });else {
            a.forEach(function (e) {
              i.forEach(function (t) {
                e.classList.remove(t);
              });
            }), a = a.filter(function (e) {
              return e.matches(".mm-panel_opened-parent");
            });
            var o = !1;
            a.forEach(function (e) {
              s === e && (o = !0);
            }), o || a.push(s), a.forEach(function (e) {
              e.classList.remove("mm-hidden");
            }), (a = a.slice(-t.visible)).forEach(function (e, t) {
              e.classList.add("mm-panel_iconpanel-" + t);
            });
          }
        }), this.bind("initPanel:after", function (e) {
          if (t.blockPanel && !e.parentElement.matches(".mm-listitem_vertical") && !_(e, ".mm-panel__blocker")[0]) {
            var n = b("a.mm-panel__blocker");
            n.setAttribute("href", "#" + e.closest(".mm-panel").id), e.prepend(n);
          }
        });
      }
    },
    keyboardNavigation: function keyboardNavigation() {
      var e = this;

      if (!U) {
        var t = function (e) {
          return "boolean" != typeof e && "string" != typeof e || (e = {
            enable: e
          }), "object" != _typeof(e) && (e = {}), e;
        }(this.opts.keyboardNavigation);

        if (this.opts.keyboardNavigation = a(t, S.options.keyboardNavigation), t.enable) {
          var n = b("button.mm-tabstart.mm-sronly"),
              i = b("button.mm-tabend.mm-sronly"),
              s = b("button.mm-tabend.mm-sronly");
          this.bind("initMenu:after", function () {
            t.enhance && e.node.menu.classList.add("mm-menu_keyboardfocus"), he.call(e, t.enhance);
          }), this.bind("initOpened:before", function () {
            e.node.menu.prepend(n), e.node.menu.append(i), _(e.node.menu, ".mm-navbars-top, .mm-navbars-bottom").forEach(function (e) {
              e.querySelectorAll(".mm-navbar__title").forEach(function (e) {
                e.setAttribute("tabindex", "-1");
              });
            });
          }), this.bind("initBlocker:after", function () {
            S.node.blck.append(s), _(S.node.blck, "a")[0].classList.add("mm-tabstart");
          });

          var o = "input, select, textarea, button, label, a[href]",
              r = function r(n) {
            n = n || _(e.node.pnls, ".mm-panel_opened")[0];
            var i = null,
                s = document.activeElement.closest(".mm-navbar");

            if (!s || s.closest(".mm-menu") != e.node.menu) {
              if ("default" == t.enable && ((i = g(n, ".mm-listview a[href]:not(.mm-hidden)")[0]) || (i = g(n, o + ":not(.mm-hidden)")[0]), !i)) {
                var a = [];
                _(e.node.menu, ".mm-navbars_top, .mm-navbars_bottom").forEach(function (e) {
                  a.push.apply(a, g(e, o + ":not(.mm-hidden)"));
                }), i = a[0];
              }

              i || (i = _(e.node.menu, ".mm-tabstart")[0]), i && i.focus();
            }
          };

          this.bind("open:finish", r), this.bind("openPanel:finish", r), this.bind("initOpened:after:sr-aria", function () {
            [e.node.menu, S.node.blck].forEach(function (e) {
              _(e, ".mm-tabstart, .mm-tabend").forEach(function (e) {
                S.sr_aria(e, "hidden", !0), S.sr_role(e, "presentation");
              });
            });
          });
        }
      }
    },
    lazySubmenus: function lazySubmenus() {
      var e = this,
          t = function (e) {
        return "boolean" == typeof e && (e = {
          load: e
        }), "object" != _typeof(e) && (e = {}), e;
      }(this.opts.lazySubmenus);

      this.opts.lazySubmenus = a(t, S.options.lazySubmenus), t.load && (this.bind("initPanels:before", function () {
        var t = [];
        g(e.node.pnls, "li").forEach(function (n) {
          t.push.apply(t, _(n, e.conf.panelNodetype.join(", ")));
        }), t.filter(function (e) {
          return !e.matches(".mm-listview_inset");
        }).filter(function (e) {
          return !e.matches(".mm-nolistview");
        }).filter(function (e) {
          return !e.matches(".mm-nopanel");
        }).forEach(function (e) {
          ["mm-panel_lazysubmenu", "mm-nolistview", "mm-nopanel"].forEach(function (t) {
            e.classList.add(t);
          });
        });
      }), this.bind("initPanels:before", function () {
        var t = [];
        g(e.node.pnls, "." + e.conf.classNames.selected).forEach(function (e) {
          t.push.apply(t, y(e, ".mm-panel_lazysubmenu"));
        }), t.length && t.forEach(function (e) {
          console.log(e);
          ["mm-panel_lazysubmenu", "mm-nolistview", "mm-nopanel"].forEach(function (t) {
            e.classList.remove(t);
          });
        });
      }), this.bind("openPanel:before", function (t) {
        var n = g(t, ".mm-panel_lazysubmenu").filter(function (e) {
          return !e.matches(".mm-panel_lazysubmenu .mm-panel_lazysubmenu");
        });
        t.matches(".mm-panel_lazysubmenu") && n.unshift(t), n.forEach(function (t) {
          ["mm-panel_lazysubmenu", "mm-nolistview", "mm-nopanel"].forEach(function (e) {
            t.classList.remove(e);
          }), e.initPanel(t);
        });
      }));
    },
    navbars: _e,
    pageScroll: function pageScroll() {
      var e = this,
          t = function (e) {
        return "boolean" == typeof e && (e = {
          scroll: e
        }), "object" != _typeof(e) && (e = {}), e;
      }(this.opts.pageScroll);

      this.opts.pageScroll = a(t, S.options.pageScroll);
      var n,
          i = this.conf.pageScroll;

      function s() {
        n && window.scrollTo({
          top: n.getBoundingClientRect().top + document.scrollingElement.scrollTop - i.scrollOffset,
          behavior: "smooth"
        }), n = null;
      }

      function o(e) {
        try {
          return "#" != e && "#" == e.slice(0, 1) ? S.node.page.querySelector(e) : null;
        } catch (e) {
          return null;
        }
      }

      if (t.scroll && this.bind("close:finish", function () {
        s();
      }), this.opts.offCanvas && t.scroll && this.clck.push(function (t, i) {
        if (n = null, i.inMenu) {
          var a = t.getAttribute("href");
          if (n = o(a)) return e.node.menu.matches(".mm-menu_sidebar-expanded") && e.node.wrpr.matches(".mm-wrapper_sidebar-expanded") ? void s() : {
            close: !0
          };
        }
      }), t.update) {
        var r = [];
        this.bind("initListview:after", function (e) {
          w(_(e, ".mm-listitem")).forEach(function (e) {
            var t = o(e.getAttribute("href"));
            t && r.unshift(t);
          });
        });
        var c = -1;
        window.addEventListener("scroll", function (t) {
          for (var n = window.scrollY, s = 0; s < r.length; s++) {
            if (r[s].offsetTop < n + i.updateOffset) {
              if (c !== s) {
                c = s;
                var a = w(g(_(e.node.pnls, ".mm-panel_opened")[0], ".mm-listitem"));
                (a = a.filter(function (e) {
                  return e.matches('[href="#' + r[s].id + '"]');
                })).length && e.setSelected(a[0].parentElement);
              }

              break;
            }
          }
        });
      }
    },
    searchfield: function searchfield() {
      var e = this,
          t = function (e) {
        return "boolean" == typeof e && (e = {
          add: e
        }), "object" != _typeof(e) && (e = {}), "boolean" == typeof e.panel && (e.panel = {
          add: e.panel
        }), "object" != _typeof(e.panel) && (e.panel = {}), "panel" == e.addTo && (e.panel.add = !0), e.panel.add && (e.showSubPanels = !1, e.panel.splash && (e.cancel = !0)), e;
      }(this.opts.searchfield);

      this.opts.searchfield = a(t, S.options.searchfield);
      this.conf.searchfield;
      t.add && (this.bind("close:start", function () {
        g(e.node.menu, ".mm-searchfield").forEach(function (e) {
          e.blur();
        });
      }), this.bind("initPanel:after", function (n) {
        var i = null;
        t.panel.add && (i = Me.call(e));
        var s = null;

        switch (t.addTo) {
          case "panels":
            s = [n];
            break;

          case "panel":
            s = [i];
            break;

          default:
            "string" == typeof t.addTo ? s = g(e.node.menu, t.addTo) : "array" == o(t.addTo) && (s = t.addTo);
        }

        s.forEach(function (n) {
          n = Ae.call(e, n), t.search && n && Te.call(e, n);
        }), t.noResults && Ce.call(e, t.panel.add ? i : n);
      }), this.clck.push(function (t, n) {
        if (n.inMenu && t.matches(".mm-searchfield__btn")) {
          if (t.matches(".mm-btn_close")) {
            var i = g(s = t.closest(".mm-searchfield"), "input")[0];
            return i.value = "", e.search(i), !0;
          }

          var s;
          if (t.matches(".mm-btn_next")) return (s = t.closest("form")) && s.submit(), !0;
        }
      }));
    },
    sectionIndexer: function sectionIndexer() {
      var e = this,
          t = function (e) {
        return "boolean" == typeof e && (e = {
          add: e
        }), "object" != _typeof(e) && (e = {}), e;
      }(this.opts.sectionIndexer);

      this.opts.sectionIndexer = a(t, S.options.sectionIndexer), t.add && this.bind("initPanels:after", function () {
        if (!e.node.indx) {
          var t = "";
          "abcdefghijklmnopqrstuvwxyz".split("").forEach(function (e) {
            t += '<a href="#">' + e + "</a>";
          });
          var n = b("div.mm-sectionindexer");
          n.innerHTML = t, e.node.pnls.prepend(n), e.node.indx = n, e.node.indx.addEventListener("click", function (e) {
            e.target.matches("a") && e.preventDefault();
          });

          var i = function i(t) {
            if (t.target.matches("a")) {
              var n = t.target.textContent,
                  i = _(e.node.pnls, ".mm-panel_opened")[0],
                  s = -1,
                  a = i.scrollTop;

              i.scrollTop = 0, g(i, ".mm-divider").filter(function (e) {
                return !e.matches(".mm-hidden");
              }).forEach(function (e) {
                s < 0 && n == e.textContent.trim().slice(0, 1).toLowerCase() && (s = e.offsetTop);
              }), i.scrollTop = s > -1 ? s : a;
            }
          };

          U ? (e.node.indx.addEventListener("touchstart", i), e.node.indx.addEventListener("touchmove", i)) : e.node.indx.addEventListener("mouseover", i);
        }

        e.bind("openPanel:start", function (t) {
          var n = g(t, ".mm-divider").filter(function (e) {
            return !e.matches(".mm-hidden");
          }).length;
          e.node.indx.classList[n ? "add" : "remove"]("mm-sectionindexer_active");
        });
      });
    },
    setSelected: function setSelected() {
      var e = this,
          t = function (e) {
        return "boolean" == typeof e && (e = {
          hover: e,
          parent: e
        }), "object" != _typeof(e) && (e = {}), e;
      }(this.opts.setSelected);

      if (this.opts.setSelected = a(t, S.options.setSelected), "detect" == t.current) {
        var n = function n(t) {
          t = t.split("?")[0].split("#")[0];
          var i = e.node.menu.querySelector('a[href="' + t + '"], a[href="' + t + '/"]');
          if (i) e.setSelected(i.parentElement);else {
            var s = t.split("/").slice(0, -1);
            s.length && n(s.join("/"));
          }
        };

        this.bind("initMenu:after", function () {
          n.call(e, window.location.href);
        });
      } else t.current || this.bind("initListview:after", function (e) {
        _(e, ".mm-listitem_selected").forEach(function (e) {
          e.classList.remove("mm-listitem_selected");
        });
      });

      t.hover && this.bind("initMenu:after", function () {
        e.node.menu.classList.add("mm-menu_selected-hover");
      }), t.parent && (this.bind("openPanel:finish", function (t) {
        g(e.node.pnls, ".mm-listitem_selected-parent").forEach(function (e) {
          e.classList.remove("mm-listitem_selected-parent");
        });

        for (var n = t.mmParent; n;) {
          n.matches(".mm-listitem_vertical") || n.classList.add("mm-listitem_selected-parent"), n = (n = n.closest(".mm-panel")).mmParent;
        }
      }), this.bind("initMenu:after", function () {
        e.node.menu.classList.add("mm-menu_selected-parent");
      }));
    },
    sidebar: function sidebar() {
      var e = this;

      if (this.opts.offCanvas) {
        var t = function (e) {
          return ("string" == typeof e || "boolean" == typeof e && e || "number" == typeof e) && (e = {
            expanded: e
          }), "object" != _typeof(e) && (e = {}), "boolean" == typeof e.collapsed && e.collapsed && (e.collapsed = {
            use: !0
          }), "string" != typeof e.collapsed && "number" != typeof e.collapsed || (e.collapsed = {
            use: e.collapsed
          }), "object" != _typeof(e.collapsed) && (e.collapsed = {}), "boolean" == typeof e.expanded && e.expanded && (e.expanded = {
            use: !0
          }), "string" != typeof e.expanded && "number" != typeof e.expanded || (e.expanded = {
            use: e.expanded
          }), "object" != _typeof(e.expanded) && (e.expanded = {}), e;
        }(this.opts.sidebar);

        if (this.opts.sidebar = a(t, S.options.sidebar), t.collapsed.use) {
          this.bind("initMenu:after", function () {
            if (e.node.menu.classList.add("mm-menu_sidebar-collapsed"), t.collapsed.blockMenu && e.opts.offCanvas && !_(e.node.menu, ".mm-menu__blocker")[0]) {
              var n = b("a.mm-menu__blocker");
              n.setAttribute("href", "#" + e.node.menu.id), e.node.menu.prepend(n);
            }

            t.collapsed.hideNavbar && e.node.menu.classList.add("mm-menu_hidenavbar"), t.collapsed.hideDivider && e.node.menu.classList.add("mm-menu_hidedivider");
          });

          var n = function n() {
            e.node.wrpr.classList.add("mm-wrapper_sidebar-collapsed");
          },
              i = function i() {
            e.node.wrpr.classList.remove("mm-wrapper_sidebar-collapsed");
          };

          "boolean" == typeof t.collapsed.use ? this.bind("initMenu:after", n) : P(t.collapsed.use, n, i);
        }

        if (t.expanded.use) {
          this.bind("initMenu:after", function () {
            e.node.menu.classList.add("mm-menu_sidebar-expanded");
          });
          n = function n() {
            e.node.wrpr.classList.add("mm-wrapper_sidebar-expanded"), e.node.wrpr.matches(".mm-wrapper_sidebar-closed") || e.open();
          }, i = function i() {
            e.node.wrpr.classList.remove("mm-wrapper_sidebar-expanded"), e.close();
          };
          "boolean" == typeof t.expanded.use ? this.bind("initMenu:after", n) : P(t.expanded.use, n, i), this.bind("close:start", function () {
            e.node.wrpr.matches(".mm-wrapper_sidebar-expanded") && (e.node.wrpr.classList.add("mm-wrapper_sidebar-closed"), "remember" == t.expanded.initial && window.localStorage.setItem("mmenuExpandedState", "closed"));
          }), this.bind("open:start", function () {
            e.node.wrpr.matches(".mm-wrapper_sidebar-expanded") && (e.node.wrpr.classList.remove("mm-wrapper_sidebar-closed"), "remember" == t.expanded.initial && window.localStorage.setItem("mmenuExpandedState", "open"));
          });
          var s = t.expanded.initial;

          if ("remember" == t.expanded.initial) {
            var o = window.localStorage.getItem("mmenuExpandedState");

            switch (o) {
              case "open":
              case "closed":
                s = o;
            }
          }

          "closed" == s && this.bind("initMenu:after", function () {
            e.node.wrpr.classList.add("mm-wrapper_sidebar-closed");
          }), this.clck.push(function (n, i) {
            if (i.inMenu && i.inListview && e.node.wrpr.matches(".mm-wrapper_sidebar-expanded")) return {
              close: "closed" == t.expanded.initial
            };
          });
        }
      }
    },
    toggles: function toggles() {
      var e = this;
      this.bind("initPanel:after", function (t) {
        g(t, "input").forEach(function (t) {
          E(t, e.conf.classNames.toggles.toggle, "mm-toggle"), E(t, e.conf.classNames.toggles.check, "mm-check");
        });
      });
    }
  }, S.wrappers = {
    angular: function angular() {
      this.opts.onClick = {
        close: !0,
        preventDefault: !1,
        setSelected: !0
      };
    },
    bootstrap: function bootstrap() {
      var e = this;

      if (this.node.menu.matches(".navbar-collapse")) {
        this.conf.offCanvas && (this.conf.offCanvas.clone = !1);
        var t = b("nav"),
            n = b("div");
        t.append(n), _(this.node.menu).forEach(function (t) {
          switch (!0) {
            case t.matches(".navbar-nav"):
              n.append(function (e) {
                var t = b("ul");
                return g(e, ".nav-item").forEach(function (e) {
                  var n = b("li");

                  if (e.matches(".active") && n.classList.add("Selected"), !e.matches(".nav-link")) {
                    var i = _(e, ".dropdown-menu")[0];

                    i && n.append(o(i)), e = _(e, ".nav-link")[0];
                  }

                  n.prepend(a(e)), t.append(n);
                }), t;
              }(t));
              break;

            case t.matches(".dropdown-menu"):
              n.append(o(t));
              break;

            case t.matches(".form-inline"):
              e.conf.searchfield.form = {
                action: t.getAttribute("action") || null,
                method: t.getAttribute("method") || null
              }, e.conf.searchfield.input = {
                name: t.querySelector("input").getAttribute("name") || null
              }, e.conf.searchfield.clear = !1, e.conf.searchfield.submit = !0;
              break;

            default:
              n.append(t.cloneNode(!0));
          }
        }), this.bind("initMenu:before", function () {
          document.body.prepend(t), e.node.menu = t;
        });
        var i = this.node.menu.parentElement;

        if (i) {
          var s = i.querySelector(".navbar-toggler");
          s && (s.removeAttribute("data-target"), s.removeAttribute("aria-controls"), s.outerHTML = s.outerHTML, (s = i.querySelector(".navbar-toggler")).addEventListener("click", function (t) {
            t.preventDefault(), t.stopImmediatePropagation(), e[e.vars.opened ? "close" : "open"]();
          }));
        }
      }

      function a(e) {
        for (var t = b(e.matches("a") ? "a" : "span"), n = ["href", "title", "target"], i = 0; i < n.length; i++) {
          e.getAttribute(n[i]) && t.setAttribute(n[i], e.getAttribute(n[i]));
        }

        return t.innerHTML = e.innerHTML, g(t, ".sr-only").forEach(function (e) {
          e.remove();
        }), t;
      }

      function o(e) {
        var t = b("ul");
        return _(e).forEach(function (e) {
          var n = b("li");
          e.matches(".dropdown-divider") ? n.classList.add("Divider") : e.matches(".dropdown-item") && n.append(a(e)), t.append(n);
        }), t;
      }
    },
    olark: function olark() {
      this.conf.offCanvas.page.noSelector.push("#olark");
    },
    turbolinks: function turbolinks() {
      var e;
      document.addEventListener("turbolinks:before-visit", function (t) {
        e = document.querySelector(".mm-wrapper").className.split(" ").filter(function (e) {
          return /mm-/.test(e);
        });
      }), document.addEventListener("turbolinks:load", function (t) {
        void 0 !== e && (document.querySelector(".mm-wrapper").className = e);
      });
    },
    wordpress: function wordpress() {
      this.conf.classNames.selected = "current-menu-item";
      var e = document.getElementById("wpadminbar");
      e && (e.style.position = "fixed", e.classList.add("mm-slideout"));
    }
  };
  var De;
  t["default"] = S;
  window && (window.Mmenu = S), (De = window.jQuery || window.Zepto || null) && (De.fn.mmenu = function (e, t) {
    var n = De();
    return this.each(function (i, s) {
      if (!s.mmApi) {
        var a = new S(s, e, t),
            o = De(a.node.menu);
        o.data("mmenu", a.API), n = n.add(o);
      }
    }), n;
  });
}]);
}();
/******/ })()
;