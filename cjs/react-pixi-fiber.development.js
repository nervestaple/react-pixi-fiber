'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var PIXI = require('pixi.js');
var ReactFiberReconciler = _interopDefault(require('react-reconciler'));
var React = _interopDefault(require('react'));

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

{
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

var invariant_1 = invariant;

var INJECTED_TYPES = {};
function injectType(type, behavior) {
  INJECTED_TYPES[type] = behavior;
  return type;
}
function createInjectedTypeInstance(type, props, internalInstanceHandle, applyDisplayObjectProps) {
  var instance;

  if (type in INJECTED_TYPES) {
    var injectedType = INJECTED_TYPES[type];
    var customDisplayObject;

    if (typeof injectedType === "function") {
      customDisplayObject = injectedType;
    } else if (typeof injectedType.customDisplayObject === "function") {
      customDisplayObject = injectedType.customDisplayObject;
    }

    invariant_1(customDisplayObject, "Invalid Component injected to ReactPixiFiber: `%s`.", type);
    instance = customDisplayObject(props);

    if (typeof injectedType.customApplyProps === "function") {
      instance._customApplyProps = injectedType.customApplyProps.bind({
        // See: https://github.com/Izzimach/react-pixi/blob/a25196251a13ed9bb116a8576d93e9fceac2a14c/src/ReactPIXI.js#L953
        applyDisplayObjectProps: applyDisplayObjectProps.bind(null, instance)
      });
    }

    if (typeof injectedType.customDidAttach === "function") {
      instance._customDidAttach = injectedType.customDidAttach;
    }

    if (typeof injectedType.customWillDetach === "function") {
      instance._customWillDetach = injectedType.customWillDetach;
    }
  }

  return instance;
}
function isInjectedType(type) {
  return typeof INJECTED_TYPES[type] !== "undefined";
}

function CustomPIXIComponent(behavior, type) {
  invariant_1(typeof type === "string", "Invalid argument `type` of type `%s` supplied to `CustomPIXIComponent`, expected `string`.", _typeof(type));
  return injectType(type, behavior);
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction;

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction_1;

{
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var warning_1 = warning;

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

{
  var invariant$1 = invariant_1;
  var warning$1 = warning_1;
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant$1(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }
        warning$1(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning$1(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

var checkPropTypes_1 = checkPropTypes;

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant_1(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if ('development' !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning_1(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction_1.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      warning_1(false, 'Invalid argument supplied to oneOf, expected an instance of array.');
      return emptyFunction_1.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      warning_1(false, 'Invalid argument supplied to oneOfType, expected an instance of array.');
      return emptyFunction_1.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning_1(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction_1.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = objectAssign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

{
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
}
});

var name = "react-pixi-fiber";
var version = "0.4.3";
var description = "React Fiber renderer for PixiJS";
var main = "index.js";
var author = "Michal Ochman";
var license = "MIT";
var repository = "github:nervestaple/react-pixi-fiber";
var typings = "./index.d.ts";
var files = ["LICENSE", "README.md", "index.d.ts", "index.js", "react-pixi-alias.js", "cjs/", "src/"];
var dependencies = {
  "fbjs": "^0.8.0",
  "performance-now": "^2.1.0",
  "react-reconciler": "^0.8.0-alpha.3"
};
var peerDependencies = {
  "pixi.js": "^4.4.0",
  "react": "^16.3.0-rc.0",
  "react-dom": "^16.3.0-rc.0"
};
var devDependencies = {
  "@babel/core": "^7.0.0-beta.42",
  "@babel/preset-env": "^7.0.0-beta.42",
  "@babel/preset-react": "^7.0.0-beta.42",
  "@babel/preset-stage-0": "^7.0.0-beta.42",
  "@types/pixi.js": "^4.4.0",
  "@types/react": "^16.0.0",
  "babel-core": "^7.0.0-bridge.0",
  "babel-eslint": "^8.2.1",
  "babel-jest": "^22.4.1",
  "babel-plugin-rewire": "^1.1.0",
  "babel-preset-env": "^1.6.1",
  "canvas-prebuilt": "^1.6.5-prerelease.1",
  "codecov": "^3.0.0",
  "eslint": "^4.17.0",
  "eslint-config-prettier": "^2.9.0",
  "eslint-plugin-babel": "^4.1.0",
  "eslint-plugin-import": "^2.8.0",
  "eslint-plugin-prettier": "^2.6.0",
  "eslint-plugin-promise": "^3.6.0",
  "eslint-plugin-react": "^7.6.1",
  "jest": "^22.4.2",
  "pixi.js": "^4.4.0",
  "prettier": "^1.9.2",
  "react": "16.3.0-rc.0",
  "react-dom": "16.3.0-rc.0",
  "react-test-renderer": "^16.0.0",
  "rollup": "^0.56.3",
  "rollup-plugin-babel": "^4.0.0-beta.3",
  "rollup-plugin-commonjs": "^8.3.0",
  "rollup-plugin-json": "^2.3.0",
  "rollup-plugin-node-globals": "^1.1.0",
  "rollup-plugin-node-resolve": "^3.0.3",
  "rollup-plugin-replace": "^2.0.0",
  "rollup-plugin-uglify": "^3.0.0"
};
var scripts = {
  "build": "npm run build:prod && npm run build:dev",
  "build:dev": "npm run build:index:dev && npm run build:alias:dev",
  "build:prod": "npm run build:index:prod && npm run build:alias:prod",
  "build:alias:dev": "NODE_ENV=development rollup -c config/rollup.alias.js",
  "build:alias:prod": "rollup -c config/rollup.alias.js",
  "build:index:dev": "NODE_ENV=development rollup -c config/rollup.index.js",
  "build:index:prod": "rollup -c config/rollup.index.js",
  "eslint": "eslint src",
  "eslint-check": "eslint --print-config .eslintrc.json | eslint-config-prettier-check",
  "prepublish": "npm run build",
  "test": "jest"
};
var jest = {
  "coverageDirectory": "coverage",
  "coverageReporters": ["lcov", "text-summary"],
  "collectCoverageFrom": ["src/**/*.js"],
  "globals": {
    "true": true
  },
  "setupFiles": ["./test/jest.setupPixi.js"],
  "transform": {
    "^.+\\.js$": "babel-jest"
  }
};
var pkg = {
  name: name,
  version: version,
  description: description,
  main: main,
  author: author,
  license: license,
  repository: repository,
  typings: typings,
  files: files,
  dependencies: dependencies,
  peerDependencies: peerDependencies,
  devDependencies: devDependencies,
  scripts: scripts,
  jest: jest
};

var CHILDREN = "children"; // List of props that should be handled in a specific way

var RESERVED_PROPS = _defineProperty({}, CHILDREN, true); // List of default values for DisplayObject members

var DEFAULT_PROPS = {
  alpha: 1,
  buttonMode: false,
  cacheAsBitmap: false,
  cursor: "auto",
  filterArea: null,
  filters: null,
  hitArea: null,
  interactive: false,
  // localTransform  // readonly
  mask: null,
  // TODO move parent to RESERVED_PROPS?
  // parent  // readonly
  pivot: 0,
  position: 0,
  renderable: true,
  rotation: 0,
  scale: 1,
  skew: 0,
  transform: null,
  visible: true,
  // worldAlpha  // readonly
  // worldTransform  // readonly
  // worldVisible  // readonly
  x: 0,
  y: 0
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

var emptyObject = {};

{
  Object.freeze(emptyObject);
}

var emptyObject_1 = emptyObject;

var global$1 = typeof global !== "undefined" ? global :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {}

// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global$1.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof global$1.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

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
function nextTick(fun) {
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
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser = true;
var env = {};
var argv = [];
var version$1 = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;

function binding(name) {
    throw new Error('process.binding is not supported');
}

function cwd () { return '/' }
function chdir (dir) {
    throw new Error('process.chdir is not supported');
}function umask() { return 0; }

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance$1 = global$1.performance || {};
var performanceNow =
  performance$1.now        ||
  performance$1.mozNow     ||
  performance$1.msNow      ||
  performance$1.oNow       ||
  performance$1.webkitNow  ||
  function(){ return (new Date()).getTime() };

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow.call(performance$1)*1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime%1)*1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds<0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds,nanoseconds]
}

var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}

var process = {
  nextTick: nextTick,
  title: title,
  browser: browser,
  env: env,
  argv: argv,
  version: version$1,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

var performanceNow$1 = createCommonjsModule(function (module) {
// Generated by CoffeeScript 1.12.2
(function() {
  var getNanoSeconds, hrtime$$1, loadTime, moduleLoadTime, nodeLoadTime, upTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };
    hrtime$$1 = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime$$1();
      return hr[0] * 1e9 + hr[1];
    };
    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(commonjsGlobal);


});

// List of types supported by ReactPixiFiber
var TYPES = {
  BITMAP_TEXT: "bitmap-text",
  CONTAINER: "container",
  GRAPHICS: "graphics",
  PARTICLE_CONTAINER: "particle-container",
  SPRITE: "sprite",
  TEXT: "text",
  TILING_SPRITE: "tiling-sprite"
};

/* Helper Methods */

var not = function not(fn) {
  return function () {
    return !fn.apply(void 0, arguments);
  };
};
var including = function including(props) {
  return function (key) {
    return props.indexOf(key) !== -1;
  };
};
function filterByKey(inputObject, filter) {
  var exportObject = {};
  Object.keys(inputObject).filter(filter).forEach(function (key) {
    exportObject[key] = inputObject[key];
  });
  return exportObject;
}
/* Concrete Helper Methods */

var includingReservedProps = including(Object.keys(RESERVED_PROPS));
/* PIXI related Methods */
// Converts value to an array of coordinates

function parsePoint(value) {
  var arr = [];

  if (typeof value === "undefined") {
    return arr;
  } else if (typeof value === "string") {
    arr = value.split(",");
  } else if (typeof value === "number") {
    arr = [value];
  } else if (Array.isArray(value)) {
    // shallow copy the array
    arr = value.slice();
  } else if (typeof value.x !== "undefined" && typeof value.y !== "undefined") {
    arr = [value.x, value.y];
  }

  return arr.map(Number);
}
function isPointType(value) {
  return value instanceof PIXI.Point || value instanceof PIXI.ObservablePoint;
} // Set props on a DisplayObject by checking the type. If a PIXI.Point or
// a PIXI.ObservablePoint is having its value set, then either a comma-separated
// string with in the form of "x,y" or a size 2 array with index 0 being the x
// coordinate and index 1 being the y coordinate.
// See: https://github.com/Izzimach/react-pixi/blob/a25196251a13ed9bb116a8576d93e9fceac2a14c/src/ReactPIXI.js#L114

function setPixiValue(instance, propName, value) {
  if (isPointType(instance[propName]) && isPointType(value)) {
    // Just copy the data if a Point type is being assigned to a Point type
    instance[propName].copy(value);
  } else if (isPointType(instance[propName])) {
    // Parse value if a non-Point type is being assigned to a Point type
    var coordinateData = parsePoint(value);
    invariant_1(typeof coordinateData !== "undefined" && coordinateData.length > 0 && coordinateData.length < 3, "The property `%s` is a PIXI.Point or PIXI.ObservablePoint and must be set to a comma-separated string of " + "either 1 or 2 coordinates, a 1 or 2 element array containing coordinates, or a PIXI Point/ObservablePoint. " + "If only one coordinate is given then X and Y will be set to the provided value. Received: `%s` of type `%s`.", propName, JSON.stringify(value), _typeof(value));
    instance[propName].set(coordinateData.shift(), coordinateData.shift());
  } else {
    // Just assign the value directly if a non-Point type is being assigned to a non-Point type
    instance[propName] = value;
  }
}

/* Render Methods */
// TODO consider whitelisting props based on component type

function defaultApplyProps(instance, oldProps, newProps) {
  Object.keys(newProps).filter(not(includingReservedProps)).forEach(function (propName) {
    var value = newProps[propName]; // Set value if defined

    if (typeof value !== "undefined") {
      setPixiValue(instance, propName, value);
    } else if (typeof instance[propName] !== "undefined" && typeof DEFAULT_PROPS[propName] !== "undefined") {
      // Reset to default value (if it is defined) when display object had prop set and no longer has
      console.warn("setting default value: ".concat(propName, " was ").concat(instance[propName], " is ").concat(value, " for"), instance);
      setPixiValue(instance, propName, DEFAULT_PROPS[propName]);
    } else {
      console.warn("ignoring prop: ".concat(propName, " was ").concat(instance[propName], " is ").concat(value, " for"), instance);
    }
  });
}
function applyProps(instance, oldProps, newProps) {
  if (typeof instance._customApplyProps === "function") {
    instance._customApplyProps(instance, oldProps, newProps);
  } else {
    defaultApplyProps(instance, oldProps, newProps);
  }
} // Calculate the diff between the two objects.
// See: https://github.com/facebook/react/blob/97e2911/packages/react-dom/src/client/ReactDOMFiberComponent.js#L546

function diffProps(pixiElement, type, lastRawProps, nextRawProps, rootContainerElement) {
  var updatePayload = null;
  var lastProps = lastRawProps;
  var nextProps = nextRawProps;
  var propKey;

  for (propKey in lastProps) {
    if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null) {
      continue;
    }

    if (propKey === CHILDREN) {// Noop. Text children not supported
    } else {
      // For all other deleted properties we add it to the queue. We use
      // the whitelist in the commit phase instead.
      (updatePayload = updatePayload || []).push(propKey, null);
    }
  }

  for (propKey in nextProps) {
    var nextProp = nextProps[propKey];
    var lastProp = lastProps != null ? lastProps[propKey] : undefined;

    if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || nextProp == null && lastProp == null) {
      continue;
    }

    if (propKey === CHILDREN) {// Noop. Text children not supported
    } else {
      // For any other property we always add it to the queue and then we
      // filter it out using the whitelist during the commit.
      (updatePayload = updatePayload || []).push(propKey, nextProp);
    }
  }

  return updatePayload;
}
/* PixiJS Renderer */

function appendChild(parentInstance, child) {
  // TODO do we need to remove the child first if it's already added?
  parentInstance.removeChild(child);
  parentInstance.addChild(child);

  if (typeof child._customDidAttach === "function") {
    child._customDidAttach(child);
  }
}
function removeChild(parentInstance, child) {
  if (typeof child._customWillDetach === "function") {
    child._customWillDetach(child);
  }

  parentInstance.removeChild(child);
  child.destroy();
}
function insertBefore(parentInstance, child, beforeChild) {
  invariant_1(child !== beforeChild, "ReactPixiFiber cannot insert node before itself");
  var childExists = parentInstance.children.indexOf(child) !== -1;
  var index = parentInstance.getChildIndex(beforeChild);

  if (childExists) {
    parentInstance.setChildIndex(child, index);
  } else {
    parentInstance.addChildAt(child, index);
  }
}
function commitUpdate(instance, updatePayload, type, lastRawProps, nextRawProps, internalInstanceHandle) {
  // injected types need to have full control over passed props
  if (isInjectedType(type)) {
    applyProps(instance, lastRawProps, nextRawProps);
    return;
  } // updatePayload is in the form of [propKey1, propValue1, ...]


  var updatedPropKeys = including(updatePayload.filter(function (item, i) {
    return i % 2 === 0;
  }));
  var oldProps = filterByKey(lastRawProps, updatedPropKeys);
  var newProps = filterByKey(nextRawProps, updatedPropKeys); // regular components only receive props that have changed

  applyProps(instance, oldProps, newProps);
}
function createInstance(type, props, internalInstanceHandle) {
  var instance;

  switch (type) {
    case TYPES.BITMAP_TEXT:
      instance = new PIXI.extras.BitmapText(props.text, props.style);
      break;

    case TYPES.CONTAINER:
      instance = new PIXI.Container();
      break;

    case TYPES.GRAPHICS:
      instance = new PIXI.Graphics();
      break;

    case TYPES.PARTICLE_CONTAINER:
      instance = new PIXI.particles.ParticleContainer(props.maxSize, props.properties, props.batchSize, props.autoResize);
      break;

    case TYPES.SPRITE:
      instance = new PIXI.Sprite(props.texture);
      break;

    case TYPES.TEXT:
      instance = new PIXI.Text(props.text, props.style, props.canvas);
      break;

    case TYPES.TILING_SPRITE:
      instance = new PIXI.extras.TilingSprite(props.texture, props.width, props.height);
      break;

    default:
      instance = createInjectedTypeInstance(type, props, internalInstanceHandle, defaultApplyProps);
      break;
  }

  invariant_1(instance, "ReactPixiFiber does not support the type: `%s`.", type);
  applyProps(instance, {}, props);
  return instance;
}
function createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
  invariant_1(false, "ReactPixiFiber does not support text instances. Use Text component instead.");
}
function finalizeInitialChildren(pixiElement, type, props, rootContainerInstance) {
  return false;
}
function getChildHostContext(parentHostContext, type) {
  return emptyObject_1;
}
function getRootHostContext(rootContainerInstance) {
  return emptyObject_1;
}
function getPublicInstance(inst) {
  return inst;
}
function prepareForCommit() {// Noop
}
function prepareUpdate(pixiElement, type, oldProps, newProps, rootContainerInstance, hostContext) {
  return diffProps(pixiElement, type, oldProps, newProps, rootContainerInstance);
}
function resetAfterCommit() {// Noop
}
function resetTextContent(pixiElement) {// Noop
}
function shouldDeprioritizeSubtree(type, props) {
  var isAlphaVisible = typeof props.alpha === "undefined" || props.alpha > 0;
  var isRenderable = typeof props.renderable === "undefined" || props.renderable === true;
  var isVisible = typeof props.visible === "undefined" || props.visible === true;
  return !(isAlphaVisible && isRenderable && isVisible);
}
function shouldSetTextContent(type, props) {
  return false;
}
function commitTextUpdate(textInstance, oldText, newText) {// Noop
}
function commitMount(instance, type, newProps) {// Noop
}
var ReactPixiFiber = ReactFiberReconciler({
  appendInitialChild: appendChild,
  createInstance: createInstance,
  createTextInstance: createTextInstance,
  finalizeInitialChildren: finalizeInitialChildren,
  getChildHostContext: getChildHostContext,
  getRootHostContext: getRootHostContext,
  getPublicInstance: getPublicInstance,
  now: performanceNow$1,
  prepareForCommit: prepareForCommit,
  prepareUpdate: prepareUpdate,
  resetAfterCommit: resetAfterCommit,
  resetTextContent: resetTextContent,
  shouldDeprioritizeSubtree: shouldDeprioritizeSubtree,
  shouldSetTextContent: shouldSetTextContent,
  useSyncScheduling: true,
  mutation: {
    appendChild: appendChild,
    appendChildToContainer: appendChild,
    commitMount: commitMount,
    commitTextUpdate: commitTextUpdate,
    commitUpdate: commitUpdate,
    insertBefore: insertBefore,
    insertInContainerBefore: insertBefore,
    removeChild: removeChild,
    removeChildFromContainer: removeChild
  }
});

function validateCanvas(props, propName, componentName) {
  // Let's assume that element is canvas if the element is Element and implements getContext
  var element = props[propName];

  if (typeof element === "undefined") {
    return;
  }

  var isCanvas = element instanceof Element && typeof element.getContext === "function";

  if (!isCanvas) {
    var propType = _typeof(element);

    return new Error("Invalid prop '".concat(propName, "' of type '").concat(propType, "' supplied to '").concat(componentName, "', expected '<canvas> Element'."));
  }
}
var propTypes$1 = {
  options: propTypes.shape({
    antialias: propTypes.bool,
    autoStart: propTypes.bool,
    backgroundColor: propTypes.number,
    clearBeforeRender: propTypes.bool,
    forceCanvas: propTypes.bool,
    forceFXAA: propTypes.bool,
    height: propTypes.number,
    legacy: propTypes.bool,
    powerPreference: propTypes.string,
    preserveDrawingBuffer: propTypes.bool,
    resolution: propTypes.number,
    roundPixels: propTypes.bool,
    sharedLoader: propTypes.bool,
    sharedTicker: propTypes.bool,
    transparent: propTypes.bool,
    view: validateCanvas,
    width: propTypes.number
  }),
  children: propTypes.node,
  height: propTypes.number,
  width: propTypes.number
};
var childContextTypes = {
  app: propTypes.object
};
var includingDisplayObjectProps = including(Object.keys(DEFAULT_PROPS));
var includingStageProps = including(Object.keys(propTypes$1));
var includingCanvasProps = function includingCanvasProps(key) {
  return !includingDisplayObjectProps(key) && !includingStageProps(key);
};
var getCanvasProps = function getCanvasProps(props) {
  return filterByKey(props, includingCanvasProps);
};
var getDisplayObjectProps = function getDisplayObjectProps(props) {
  return filterByKey(props, includingDisplayObjectProps);
};

var Stage =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Stage, _React$Component);

  function Stage() {
    _classCallCheck(this, Stage);

    return _possibleConstructorReturn(this, (Stage.__proto__ || Object.getPrototypeOf(Stage)).apply(this, arguments));
  }

  _createClass(Stage, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        app: this._app
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          children = _props.children,
          height = _props.height,
          options = _props.options,
          width = _props.width;
      this._app = new PIXI.Application(width, height, _objectSpread({
        view: this._canvas
      }, options)); // Apply root Container props

      var stageProps = getDisplayObjectProps(this.props);
      applyProps(this._app.stage, {}, stageProps); // Perhaps this should use the standalone render method somehow, the only differences now are:
      // - parentContainer
      // - callback
      // - return value

      this._mountNode = ReactPixiFiber.createContainer(this._app.stage);
      ReactPixiFiber.updateContainer(children, this._mountNode, this);
      ReactPixiFiber.injectIntoDevTools({
        findFiberByHostInstance: ReactPixiFiber.findFiberByHostInstance,
        bundleType: 1,
        version: pkg.version,
        rendererPackageName: pkg.name
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _props2 = this.props,
          children = _props2.children,
          height = _props2.height,
          width = _props2.width; // Apply root Container props

      var stageProps = getDisplayObjectProps(this.props);
      applyProps(this._app.stage, {}, stageProps); // Root container has been resized - resize renderer

      if (height !== prevProps.height || width !== prevProps.width) {
        this._app.renderer.resize(width, height);
      }

      ReactPixiFiber.updateContainer(children, this._mountNode, this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      ReactPixiFiber.updateContainer(null, this._mountNode, this);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var options = this.props.options;
      var canvasProps = getCanvasProps(this.props); // Do not render anything if view is passed to options

      if (typeof options !== "undefined" && options.view) {
        return null;
      } else {
        return React.createElement("canvas", _extends({
          ref: function ref(_ref) {
            return _this._canvas = _ref;
          }
        }, canvasProps));
      }
    }
  }]);

  return Stage;
}(React.Component);

Stage.propTypes = propTypes$1;
Stage.childContextTypes = childContextTypes;

var roots = new Map();
/*
 * element should be any instance of PIXI DisplayObject
 * containerTag should be an instance of PIXI root Container (i.e. the Stage)
 */

function render(element, containerTag, callback) {
  var root = roots.get(containerTag);

  if (!root) {
    root = ReactPixiFiber.createContainer(containerTag);
    roots.set(containerTag, root);
  }

  ReactPixiFiber.updateContainer(element, root, undefined, callback);
  ReactPixiFiber.injectIntoDevTools({
    findFiberByHostInstance: ReactPixiFiber.findFiberByHostInstance,
    bundleType: 1,
    version: pkg.version,
    rendererPackageName: pkg.name
  });
  return ReactPixiFiber.getPublicRootInstance(root);
}

var BitmapText = TYPES.BITMAP_TEXT;
var Container = TYPES.CONTAINER;
var Graphics = TYPES.GRAPHICS;
var ParticleContainer = TYPES.PARTICLE_CONTAINER;
var Sprite = TYPES.SPRITE;
var Text = TYPES.TEXT;
var TilingSprite = TYPES.TILING_SPRITE;

exports.CustomPIXIComponent = CustomPIXIComponent;
exports.Stage = Stage;
exports.render = render;
exports.BitmapText = BitmapText;
exports.Container = Container;
exports.Graphics = Graphics;
exports.ParticleContainer = ParticleContainer;
exports.Sprite = Sprite;
exports.Text = Text;
exports.TilingSprite = TilingSprite;
