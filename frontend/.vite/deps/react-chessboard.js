import {
  require_react
} from "./chunk-6GAV2S6I.js";
import {
  __commonJS,
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
    "use strict";
    (function() {
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return (type.displayName || "Context") + ".Provider";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        try {
          testStringCoercion(value);
          var JSCompiler_inline_result = false;
        } catch (e) {
          JSCompiler_inline_result = true;
        }
        if (JSCompiler_inline_result) {
          JSCompiler_inline_result = console;
          var JSCompiler_temp_const = JSCompiler_inline_result.error;
          var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          JSCompiler_temp_const.call(
            JSCompiler_inline_result,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            JSCompiler_inline_result$jscomp$0
          );
          return testStringCoercion(value);
        }
      }
      function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
          return "<...>";
        try {
          var name = getComponentNameFromType(type);
          return name ? "<" + name + ">" : "<...>";
        } catch (x) {
          return "<...>";
        }
      }
      function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
      }
      function UnknownOwner() {
        return Error("react-stack-top-frame");
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) return false;
        }
        return void 0 !== config.key;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
        }
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
      }
      function ReactElement(type, key, self2, source, owner, props, debugStack, debugTask) {
        self2 = props.ref;
        type = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          props,
          _owner: owner
        };
        null !== (void 0 !== self2 ? self2 : null) ? Object.defineProperty(type, "ref", {
          enumerable: false,
          get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null
        });
        Object.defineProperty(type, "_debugStack", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
      }
      function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self2, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children)
          if (isStaticChildren)
            if (isArrayImpl(children)) {
              for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
                validateChildKeys(children[isStaticChildren]);
              Object.freeze && Object.freeze(children);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
          children = getComponentNameFromType(type);
          var keys = Object.keys(config).filter(function(k) {
            return "key" !== k;
          });
          isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
          didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
            isStaticChildren,
            children,
            keys,
            children
          ), didWarnAboutKeySpread[children + isStaticChildren] = true);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
          maybeKey = {};
          for (var propName in config)
            "key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(
          maybeKey,
          "function" === typeof type ? type.displayName || type.name || "Unknown" : type
        );
        return ReactElement(
          type,
          children,
          self2,
          source,
          getOwner(),
          maybeKey,
          debugStack,
          debugTask
        );
      }
      function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
      }
      var React = require_react(), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      Symbol.for("react.provider");
      var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
      };
      React = {
        "react-stack-bottom-frame": function(callStackForError) {
          return callStackForError();
        }
      };
      var specialPropKeyWarningShown;
      var didWarnAboutElementRef = {};
      var unknownOwnerDebugStack = React["react-stack-bottom-frame"].bind(
        React,
        UnknownOwner
      )();
      var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
      var didWarnAboutKeySpread = {};
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.jsx = function(type, config, maybeKey, source, self2) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          false,
          source,
          self2,
          trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
      exports.jsxs = function(type, config, maybeKey, source, self2) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          true,
          source,
          self2,
          trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
    })();
  }
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_jsx_runtime_development();
    }
  }
});

// node_modules/react-chessboard/dist/index.esm.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_react = __toESM(require_react());
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
var COLUMNS = "abcdefgh".split("");
var START_POSITION_OBJECT = {
  a8: "bR",
  b8: "bN",
  c8: "bB",
  d8: "bQ",
  e8: "bK",
  f8: "bB",
  g8: "bN",
  h8: "bR",
  a7: "bP",
  b7: "bP",
  c7: "bP",
  d7: "bP",
  e7: "bP",
  f7: "bP",
  g7: "bP",
  h7: "bP",
  a2: "wP",
  b2: "wP",
  c2: "wP",
  d2: "wP",
  e2: "wP",
  f2: "wP",
  g2: "wP",
  h2: "wP",
  a1: "wR",
  b1: "wN",
  c1: "wB",
  d1: "wQ",
  e1: "wK",
  f1: "wB",
  g1: "wN",
  h1: "wR"
};
var WHITE_COLUMN_VALUES = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7
};
var BLACK_COLUMN_VALUES = {
  a: 7,
  b: 6,
  c: 5,
  d: 4,
  e: 3,
  f: 2,
  g: 1,
  h: 0
};
var WHITE_ROWS = [7, 6, 5, 4, 3, 2, 1, 0];
var BLACK_ROWS = [0, 1, 2, 3, 4, 5, 6, 7];
var defaultPieces = {
  wP: (0, import_jsx_runtime.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: (0, import_jsx_runtime.jsx)("path", { d: "m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z", style: {
    opacity: "1",
    fill: "#ffffff",
    fillOpacity: "1",
    fillRule: "nonzero",
    stroke: "#000000",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "miter",
    strokeMiterlimit: "4",
    strokeDasharray: "none",
    strokeOpacity: "1"
  } }) })),
  wR: (0, import_jsx_runtime.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: (0, import_jsx_runtime.jsxs)("g", Object.assign({ style: {
    opacity: "1",
    fill: "#ffffff",
    fillOpacity: "1",
    fillRule: "evenodd",
    stroke: "#000000",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeMiterlimit: "4",
    strokeDasharray: "none",
    strokeOpacity: "1"
  } }, { children: [(0, import_jsx_runtime.jsx)("path", { d: "M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z ", style: { strokeLinecap: "butt" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z ", style: { strokeLinecap: "butt" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14", style: { strokeLinecap: "butt" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 34,14 L 31,17 L 14,17 L 11,14" }), (0, import_jsx_runtime.jsx)("path", { d: "M 31,17 L 31,29.5 L 14,29.5 L 14,17", style: { strokeLinecap: "butt", strokeLinejoin: "miter" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5" }), (0, import_jsx_runtime.jsx)("path", { d: "M 11,14 L 34,14", style: { fill: "none", stroke: "#000000", strokeLinejoin: "miter" } })] })) })),
  wN: (0, import_jsx_runtime.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: (0, import_jsx_runtime.jsxs)("g", Object.assign({ style: {
    opacity: "1",
    fill: "none",
    fillOpacity: "1",
    fillRule: "evenodd",
    stroke: "#000000",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeMiterlimit: "4",
    strokeDasharray: "none",
    strokeOpacity: "1"
  } }, { children: [(0, import_jsx_runtime.jsx)("path", { d: "M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18", style: { fill: "#ffffff", stroke: "#000000" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10", style: { fill: "#ffffff", stroke: "#000000" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z", style: { fill: "#000000", stroke: "#000000" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z", transform: "matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)", style: { fill: "#000000", stroke: "#000000" } })] })) })),
  wB: (0, import_jsx_runtime.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: (0, import_jsx_runtime.jsxs)("g", Object.assign({ style: {
    opacity: "1",
    fill: "none",
    fillRule: "evenodd",
    fillOpacity: "1",
    stroke: "#000000",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeMiterlimit: "4",
    strokeDasharray: "none",
    strokeOpacity: "1"
  } }, { children: [(0, import_jsx_runtime.jsxs)("g", Object.assign({ style: { fill: "#ffffff", stroke: "#000000", strokeLinecap: "butt" } }, { children: [(0, import_jsx_runtime.jsx)("path", { d: "M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z" }), (0, import_jsx_runtime.jsx)("path", { d: "M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" }), (0, import_jsx_runtime.jsx)("path", { d: "M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" })] })), (0, import_jsx_runtime.jsx)("path", { d: "M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18", style: { fill: "none", stroke: "#000000", strokeLinejoin: "miter" } })] })) })),
  wQ: (0, import_jsx_runtime.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: (0, import_jsx_runtime.jsxs)("g", Object.assign({ style: {
    fill: "#ffffff",
    stroke: "#000000",
    strokeWidth: "1.5",
    strokeLinejoin: "round"
  } }, { children: [(0, import_jsx_runtime.jsx)("path", { d: "M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z" }), (0, import_jsx_runtime.jsx)("path", { d: "M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 11,36 11,36 C 9.5,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z" }), (0, import_jsx_runtime.jsx)("path", { d: "M 11.5,30 C 15,29 30,29 33.5,30", style: { fill: "none" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 12,33.5 C 18,32.5 27,32.5 33,33.5", style: { fill: "none" } }), (0, import_jsx_runtime.jsx)("circle", { cx: "6", cy: "12", r: "2" }), (0, import_jsx_runtime.jsx)("circle", { cx: "14", cy: "9", r: "2" }), (0, import_jsx_runtime.jsx)("circle", { cx: "22.5", cy: "8", r: "2" }), (0, import_jsx_runtime.jsx)("circle", { cx: "31", cy: "9", r: "2" }), (0, import_jsx_runtime.jsx)("circle", { cx: "39", cy: "12", r: "2" })] })) })),
  wK: (0, import_jsx_runtime.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: (0, import_jsx_runtime.jsxs)("g", Object.assign({ style: {
    fill: "none",
    fillOpacity: "1",
    fillRule: "evenodd",
    stroke: "#000000",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeMiterlimit: "4",
    strokeDasharray: "none",
    strokeOpacity: "1"
  } }, { children: [(0, import_jsx_runtime.jsx)("path", { d: "M 22.5,11.63 L 22.5,6", style: { fill: "none", stroke: "#000000", strokeLinejoin: "miter" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 20,8 L 25,8", style: { fill: "none", stroke: "#000000", strokeLinejoin: "miter" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25", style: {
    fill: "#ffffff",
    stroke: "#000000",
    strokeLinecap: "butt",
    strokeLinejoin: "miter"
  } }), (0, import_jsx_runtime.jsx)("path", { d: "M 12.5,37 C 18,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 12.5,30 12.5,30 L 12.5,37", style: { fill: "#ffffff", stroke: "#000000" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 12.5,30 C 18,27 27,27 32.5,30", style: { fill: "none", stroke: "#000000" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 12.5,33.5 C 18,30.5 27,30.5 32.5,33.5", style: { fill: "none", stroke: "#000000" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 12.5,37 C 18,34 27,34 32.5,37", style: { fill: "none", stroke: "#000000" } })] })) })),
  bP: (0, import_jsx_runtime.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: (0, import_jsx_runtime.jsx)("path", { d: "m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z", style: {
    opacity: "1",
    fill: "#000000",
    fillOpacity: "1",
    fillRule: "nonzero",
    stroke: "#000000",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "miter",
    strokeMiterlimit: "4",
    strokeDasharray: "none",
    strokeOpacity: "1"
  } }) })),
  bR: (0, import_jsx_runtime.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: (0, import_jsx_runtime.jsxs)("g", Object.assign({ style: {
    opacity: "1",
    fill: "#000000",
    fillOpacity: "1",
    fillRule: "evenodd",
    stroke: "#000000",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeMiterlimit: "4",
    strokeDasharray: "none",
    strokeOpacity: "1"
  } }, { children: [(0, import_jsx_runtime.jsx)("path", { d: "M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z ", style: { strokeLinecap: "butt" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z ", style: { strokeLinecap: "butt" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z ", style: { strokeLinecap: "butt" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z ", style: { strokeLinecap: "butt", strokeLinejoin: "miter" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z ", style: { strokeLinecap: "butt" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z ", style: { strokeLinecap: "butt" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 12,35.5 L 33,35.5 L 33,35.5", style: {
    fill: "none",
    stroke: "#ffffff",
    strokeWidth: "1",
    strokeLinejoin: "miter"
  } }), (0, import_jsx_runtime.jsx)("path", { d: "M 13,31.5 L 32,31.5", style: {
    fill: "none",
    stroke: "#ffffff",
    strokeWidth: "1",
    strokeLinejoin: "miter"
  } }), (0, import_jsx_runtime.jsx)("path", { d: "M 14,29.5 L 31,29.5", style: {
    fill: "none",
    stroke: "#ffffff",
    strokeWidth: "1",
    strokeLinejoin: "miter"
  } }), (0, import_jsx_runtime.jsx)("path", { d: "M 14,16.5 L 31,16.5", style: {
    fill: "none",
    stroke: "#ffffff",
    strokeWidth: "1",
    strokeLinejoin: "miter"
  } }), (0, import_jsx_runtime.jsx)("path", { d: "M 11,14 L 34,14", style: {
    fill: "none",
    stroke: "#ffffff",
    strokeWidth: "1",
    strokeLinejoin: "miter"
  } })] })) })),
  bN: (0, import_jsx_runtime.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: (0, import_jsx_runtime.jsxs)("g", Object.assign({ style: {
    opacity: "1",
    fill: "none",
    fillOpacity: "1",
    fillRule: "evenodd",
    stroke: "#000000",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeMiterlimit: "4",
    strokeDasharray: "none",
    strokeOpacity: "1"
  } }, { children: [(0, import_jsx_runtime.jsx)("path", { d: "M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18", style: { fill: "#000000", stroke: "#000000" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10", style: { fill: "#000000", stroke: "#000000" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z", style: { fill: "#ffffff", stroke: "#ffffff" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z", transform: "matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)", style: { fill: "#ffffff", stroke: "#ffffff" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z ", style: { fill: "#ffffff", stroke: "none" } })] })) })),
  bB: (0, import_jsx_runtime.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: (0, import_jsx_runtime.jsxs)("g", Object.assign({ style: {
    opacity: "1",
    fill: "none",
    fillRule: "evenodd",
    fillOpacity: "1",
    stroke: "#000000",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeMiterlimit: "4",
    strokeDasharray: "none",
    strokeOpacity: "1"
  } }, { children: [(0, import_jsx_runtime.jsxs)("g", Object.assign({ style: { fill: "#000000", stroke: "#000000", strokeLinecap: "butt" } }, { children: [(0, import_jsx_runtime.jsx)("path", { d: "M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z" }), (0, import_jsx_runtime.jsx)("path", { d: "M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" }), (0, import_jsx_runtime.jsx)("path", { d: "M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" })] })), (0, import_jsx_runtime.jsx)("path", { d: "M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18", style: { fill: "none", stroke: "#ffffff", strokeLinejoin: "miter" } })] })) })),
  bQ: (0, import_jsx_runtime.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: (0, import_jsx_runtime.jsxs)("g", Object.assign({ style: {
    fill: "#000000",
    stroke: "#000000",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  } }, { children: [(0, import_jsx_runtime.jsx)("path", { d: "M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z", style: { strokeLinecap: "butt", fill: "#000000" } }), (0, import_jsx_runtime.jsx)("path", { d: "m 9,26 c 0,2 1.5,2 2.5,4 1,1.5 1,1 0.5,3.5 -1.5,1 -1,2.5 -1,2.5 -1.5,1.5 0,2.5 0,2.5 6.5,1 16.5,1 23,0 0,0 1.5,-1 0,-2.5 0,0 0.5,-1.5 -1,-2.5 -0.5,-2.5 -0.5,-2 0.5,-3.5 1,-2 2.5,-2 2.5,-4 -8.5,-1.5 -18.5,-1.5 -27,0 z" }), (0, import_jsx_runtime.jsx)("path", { d: "M 11.5,30 C 15,29 30,29 33.5,30" }), (0, import_jsx_runtime.jsx)("path", { d: "m 12,33.5 c 6,-1 15,-1 21,0" }), (0, import_jsx_runtime.jsx)("circle", { cx: "6", cy: "12", r: "2" }), (0, import_jsx_runtime.jsx)("circle", { cx: "14", cy: "9", r: "2" }), (0, import_jsx_runtime.jsx)("circle", { cx: "22.5", cy: "8", r: "2" }), (0, import_jsx_runtime.jsx)("circle", { cx: "31", cy: "9", r: "2" }), (0, import_jsx_runtime.jsx)("circle", { cx: "39", cy: "12", r: "2" }), (0, import_jsx_runtime.jsx)("path", { d: "M 11,38.5 A 35,35 1 0 0 34,38.5", style: { fill: "none", stroke: "#000000", strokeLinecap: "butt" } }), (0, import_jsx_runtime.jsxs)("g", Object.assign({ style: { fill: "none", stroke: "#ffffff" } }, { children: [(0, import_jsx_runtime.jsx)("path", { d: "M 11,29 A 35,35 1 0 1 34,29" }), (0, import_jsx_runtime.jsx)("path", { d: "M 12.5,31.5 L 32.5,31.5" }), (0, import_jsx_runtime.jsx)("path", { d: "M 11.5,34.5 A 35,35 1 0 0 33.5,34.5" }), (0, import_jsx_runtime.jsx)("path", { d: "M 10.5,37.5 A 35,35 1 0 0 34.5,37.5" })] }))] })) })),
  bK: (0, import_jsx_runtime.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: "45", height: "45" }, { children: (0, import_jsx_runtime.jsxs)("g", Object.assign({ style: {
    fill: "none",
    fillOpacity: "1",
    fillRule: "evenodd",
    stroke: "#000000",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeMiterlimit: "4",
    strokeDasharray: "none",
    strokeOpacity: "1"
  } }, { children: [(0, import_jsx_runtime.jsx)("path", { d: "M 22.5,11.63 L 22.5,6", style: { fill: "none", stroke: "#000000", strokeLinejoin: "miter" }, id: "path6570" }), (0, import_jsx_runtime.jsx)("path", { d: "M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25", style: {
    fill: "#000000",
    fillOpacity: "1",
    strokeLinecap: "butt",
    strokeLinejoin: "miter"
  } }), (0, import_jsx_runtime.jsx)("path", { d: "M 12.5,37 C 18,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 12.5,30 12.5,30 L 12.5,37", style: { fill: "#000000", stroke: "#000000" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 20,8 L 25,8", style: { fill: "none", stroke: "#000000", strokeLinejoin: "miter" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.5,26.6 L 22.5,24.5 C 20,18 10.85,14 6.97,19.85 C 4.5,25.5 13,29.5 13,29.5", style: { fill: "none", stroke: "#ffffff" } }), (0, import_jsx_runtime.jsx)("path", { d: "M 12.5,30 C 18,27 27,27 32.5,30 M 12.5,33.5 C 18,30.5 27,30.5 32.5,33.5 M 12.5,37 C 18,34 27,34 32.5,37", style: { fill: "none", stroke: "#ffffff" } })] })) }))
};
function getRelativeCoords(boardOrientation, boardWidth, square) {
  const squareWidth = boardWidth / 8;
  const columns = boardOrientation === "white" ? WHITE_COLUMN_VALUES : BLACK_COLUMN_VALUES;
  const rows = boardOrientation === "white" ? WHITE_ROWS : BLACK_ROWS;
  const x = columns[square[0]] * squareWidth + squareWidth / 2;
  const y = rows[parseInt(square[1], 10) - 1] * squareWidth + squareWidth / 2;
  return { x, y };
}
function isDifferentFromStart(newPosition) {
  let isDifferent = false;
  Object.keys(START_POSITION_OBJECT).forEach((square) => {
    if (newPosition[square] !== START_POSITION_OBJECT[square])
      isDifferent = true;
  });
  Object.keys(newPosition).forEach((square) => {
    if (START_POSITION_OBJECT[square] !== newPosition[square])
      isDifferent = true;
  });
  return isDifferent;
}
function getPositionDifferences(currentPosition, newPosition) {
  const difference = {
    removed: {},
    added: {}
  };
  Object.keys(currentPosition).forEach((square) => {
    if (newPosition[square] !== currentPosition[square])
      difference.removed[square] = currentPosition[square];
  });
  Object.keys(newPosition).forEach((square) => {
    if (currentPosition[square] !== newPosition[square])
      difference.added[square] = newPosition[square];
  });
  return difference;
}
function convertPositionToObject(position) {
  if (position === "start") {
    return START_POSITION_OBJECT;
  }
  if (typeof position === "string") {
    return fenToObj(position);
  }
  return position;
}
function fenToObj(fen) {
  if (!isValidFen(fen))
    return {};
  fen = fen.replace(/ .+$/, "");
  const rows = fen.split("/");
  const position = {};
  let currentRow = 8;
  for (let i = 0; i < 8; i++) {
    const row = rows[i].split("");
    let colIdx = 0;
    for (let j = 0; j < row.length; j++) {
      if (row[j].search(/[1-8]/) !== -1) {
        const numEmptySquares = parseInt(row[j], 10);
        colIdx = colIdx + numEmptySquares;
      } else {
        const square = COLUMNS[colIdx] + currentRow;
        position[square] = fenToPieceCode(row[j]);
        colIdx = colIdx + 1;
      }
    }
    currentRow = currentRow - 1;
  }
  return position;
}
function isValidFen(fen) {
  fen = fen.replace(/ .+$/, "");
  fen = expandFenEmptySquares(fen);
  const chunks = fen.split("/");
  if (chunks.length !== 8)
    return false;
  for (let i = 0; i < 8; i++) {
    if (chunks[i].length !== 8 || chunks[i].search(/[^kqrnbpKQRNBP1]/) !== -1) {
      return false;
    }
  }
  return true;
}
function expandFenEmptySquares(fen) {
  return fen.replace(/8/g, "11111111").replace(/7/g, "1111111").replace(/6/g, "111111").replace(/5/g, "11111").replace(/4/g, "1111").replace(/3/g, "111").replace(/2/g, "11");
}
function fenToPieceCode(piece) {
  if (piece.toLowerCase() === piece) {
    return "b" + piece.toUpperCase();
  }
  return "w" + piece.toUpperCase();
}
var useArrows = (customArrows, areArrowsAllowed = true, onArrowsChange, customArrowColor) => {
  const [customArrowsSet, setCustomArrows] = (0, import_react.useState)([]);
  const [arrows, setArrows] = (0, import_react.useState)([]);
  const [newArrow, setNewArrow] = (0, import_react.useState)();
  (0, import_react.useEffect)(() => {
    if (Array.isArray(customArrows)) {
      clearArrows();
      setCustomArrows(
        //filter out arrows which starts and ends in the same square
        customArrows === null || customArrows === void 0 ? void 0 : customArrows.filter((arrow) => arrow[0] !== arrow[1])
      );
    }
  }, [customArrows]);
  (0, import_react.useEffect)(() => {
    onArrowsChange === null || onArrowsChange === void 0 ? void 0 : onArrowsChange(arrows);
  }, [arrows]);
  function clearArrows() {
    setArrows([]);
    setNewArrow(void 0);
  }
  const drawNewArrow = (fromSquare, toSquare) => {
    if (!areArrowsAllowed)
      return;
    setNewArrow([fromSquare, toSquare, customArrowColor]);
  };
  const allBoardArrows = [...arrows, ...customArrowsSet];
  const onArrowDrawEnd = (fromSquare, toSquare) => {
    if (fromSquare === toSquare || !areArrowsAllowed)
      return;
    let arrowsCopy;
    const newArrow2 = [fromSquare, toSquare, customArrowColor];
    const isNewArrowUnique = allBoardArrows.every(([arrowFrom, arrowTo]) => {
      return !(arrowFrom === fromSquare && arrowTo === toSquare);
    });
    if (isNewArrowUnique) {
      arrowsCopy = [...arrows, newArrow2];
    } else {
      arrowsCopy = arrows.filter(([arrowFrom, arrowTo]) => {
        return !(arrowFrom === fromSquare && arrowTo === toSquare);
      });
    }
    setNewArrow(void 0);
    setArrows(arrowsCopy);
  };
  return {
    arrows: allBoardArrows,
    newArrow,
    clearArrows,
    drawNewArrow,
    setArrows,
    onArrowDrawEnd
  };
};
var ChessboardContext = (0, import_react.createContext)({});
var useChessboard = () => (0, import_react.useContext)(ChessboardContext);
var ChessboardProvider = (0, import_react.forwardRef)(({ allowDragOutsideBoard = true, animationDuration = 300, areArrowsAllowed = true, arePiecesDraggable = true, arePremovesAllowed = false, autoPromoteToQueen = false, boardOrientation = "white", boardWidth, children, clearPremovesOnRightClick = true, customArrows, customArrowColor = "rgb(255,170,0)", customBoardStyle, customNotationStyle, customDarkSquareStyle = { backgroundColor: "#B58863" }, customDropSquareStyle = {
  boxShadow: "inset 0 0 1px 6px rgba(255,255,255,0.75)"
}, customLightSquareStyle = { backgroundColor: "#F0D9B5" }, customPieces, customPremoveDarkSquareStyle = { backgroundColor: "#A42323" }, customPremoveLightSquareStyle = { backgroundColor: "#BD2828" }, customSquare = "div", customSquareStyles, dropOffBoardAction = "snapback", id = 0, isDraggablePiece = () => true, getPositionObject = () => {
}, onArrowsChange = () => {
}, onDragOverSquare = () => {
}, onMouseOutSquare = () => {
}, onMouseOverSquare = () => {
}, onPieceClick = () => {
}, onPieceDragBegin = () => {
}, onPieceDragEnd = () => {
}, onPieceDrop = () => true, onPieceDropOffBoard = () => {
}, onPromotionCheck = (sourceSquare, targetSquare, piece) => {
  return (piece === "wP" && sourceSquare[1] === "7" && targetSquare[1] === "8" || piece === "bP" && sourceSquare[1] === "2" && targetSquare[1] === "1") && Math.abs(sourceSquare.charCodeAt(0) - targetSquare.charCodeAt(0)) <= 1;
}, onPromotionPieceSelect = () => true, onSparePieceDrop = () => true, onSquareClick = () => {
}, onSquareRightClick = () => {
}, position = "start", promotionDialogVariant = "default", promotionToSquare = null, showBoardNotation = true, showPromotionDialog = false, snapToCursor = true }, ref) => {
  const [currentPosition, setCurrentPosition] = (0, import_react.useState)(convertPositionToObject(position));
  const [positionDifferences, setPositionDifferences] = (0, import_react.useState)({ removed: {}, added: {} });
  const [lastPieceColour, setLastPieceColour] = (0, import_react.useState)(void 0);
  const [showPromoteDialog, setShowPromoteDialog] = (0, import_react.useState)(showPromotionDialog && !autoPromoteToQueen);
  const [promoteFromSquare, setPromoteFromSquare] = (0, import_react.useState)(null);
  const [promoteToSquare, setPromoteToSquare] = (0, import_react.useState)(promotionToSquare);
  const [premoves, setPremoves] = (0, import_react.useState)([]);
  const premovesRef = (0, import_react.useRef)(premoves);
  const [currentRightClickDown, setCurrentRightClickDown] = (0, import_react.useState)();
  const [chessPieces, setChessPieces] = (0, import_react.useState)(Object.assign(Object.assign({}, defaultPieces), customPieces));
  const [wasManualDrop, setWasManualDrop] = (0, import_react.useState)(false);
  const previousTimeoutRef = (0, import_react.useRef)();
  const [isWaitingForAnimation, setIsWaitingForAnimation] = (0, import_react.useState)(false);
  const [lastSquareDraggedOver, setLastSquareDraggedOver] = (0, import_react.useState)(null);
  (0, import_react.useImperativeHandle)(ref, () => ({
    clearPremoves(clearLastPieceColour = true) {
      clearPremoves(clearLastPieceColour);
    }
  }));
  (0, import_react.useEffect)(() => {
    setChessPieces(Object.assign(Object.assign({}, defaultPieces), customPieces));
  }, [customPieces]);
  (0, import_react.useEffect)(() => {
    setShowPromoteDialog(showPromotionDialog);
    setPromoteToSquare(promotionToSquare);
  }, [promotionToSquare, showPromotionDialog]);
  (0, import_react.useEffect)(() => {
    var _a, _b, _c;
    clearPromotion();
    const newPosition = convertPositionToObject(position);
    const differences = getPositionDifferences(currentPosition, newPosition);
    const newPieceColour = ((_a = Object.keys(differences.added)) === null || _a === void 0 ? void 0 : _a.length) <= 2 ? (_c = (_b = Object.entries(differences.added)) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c[1][0] : void 0;
    if (isWaitingForAnimation) {
      setCurrentPosition(newPosition);
      setIsWaitingForAnimation(false);
      arePremovesAllowed && attemptPremove(newPieceColour);
      if (previousTimeoutRef.current) {
        clearTimeout(previousTimeoutRef.current);
      }
    } else {
      if (wasManualDrop) {
        setCurrentPosition(newPosition);
        setIsWaitingForAnimation(false);
        arePremovesAllowed && attemptPremove(newPieceColour);
      } else {
        if (isDifferentFromStart(newPosition) && lastPieceColour !== void 0) {
          setLastPieceColour(newPieceColour);
        } else if (!isDifferentFromStart(newPosition)) {
          setLastPieceColour("b");
        } else {
          setLastPieceColour(void 0);
        }
        setPositionDifferences(differences);
        setIsWaitingForAnimation(true);
        const newTimeout = setTimeout(() => {
          setCurrentPosition(newPosition);
          setIsWaitingForAnimation(false);
          arePremovesAllowed && attemptPremove(newPieceColour);
        }, animationDuration);
        previousTimeoutRef.current = newTimeout;
      }
    }
    setWasManualDrop(false);
    getPositionObject(newPosition);
    clearArrows();
    return () => {
      clearTimeout(previousTimeoutRef.current);
    };
  }, [position]);
  const { arrows, newArrow, clearArrows, drawNewArrow, onArrowDrawEnd } = useArrows(customArrows, areArrowsAllowed, onArrowsChange, customArrowColor);
  function handleSetPosition(sourceSq, targetSq, piece, wasManualDropOverride) {
    if (sourceSq === targetSq) {
      return;
    }
    clearArrows();
    if (arePremovesAllowed && isWaitingForAnimation || arePremovesAllowed && (lastPieceColour === piece[0] || premovesRef.current.filter((p) => p.piece[0] === piece[0]).length > 0)) {
      const oldPremoves = [...premovesRef.current];
      oldPremoves.push({ sourceSq, targetSq, piece });
      premovesRef.current = oldPremoves;
      setPremoves([...oldPremoves]);
      clearPromotion();
      return;
    }
    if (!arePremovesAllowed && isWaitingForAnimation)
      return;
    const newOnDropPosition = Object.assign({}, currentPosition);
    setWasManualDrop(!!wasManualDropOverride);
    setLastPieceColour(piece[0]);
    if (onPieceDrop.length) {
      const isValidMove = onPieceDrop(sourceSq, targetSq, piece);
      if (!isValidMove) {
        clearPremoves();
        setWasManualDrop(false);
      }
    } else {
      delete newOnDropPosition[sourceSq];
      newOnDropPosition[targetSq] = piece;
      setCurrentPosition(newOnDropPosition);
    }
    clearPromotion();
    getPositionObject(newOnDropPosition);
  }
  function deletePieceFromSquare(square) {
    const positionCopy = Object.assign({}, currentPosition);
    delete positionCopy[square];
    setCurrentPosition(positionCopy);
    getPositionObject(positionCopy);
  }
  function attemptPremove(newPieceColour) {
    if (premovesRef.current.length === 0)
      return;
    const premove = premovesRef.current[0];
    if (premove.piece[0] !== void 0 && premove.piece[0] !== newPieceColour && onPieceDrop.length) {
      setLastPieceColour(premove.piece[0]);
      setWasManualDrop(true);
      const isValidMove = onPieceDrop(premove.sourceSq, premove.targetSq, premove.piece);
      if (isValidMove) {
        const oldPremoves = [...premovesRef.current];
        oldPremoves.shift();
        premovesRef.current = oldPremoves;
        setPremoves([...oldPremoves]);
      } else {
        clearPremoves();
      }
    }
  }
  function handleSparePieceDrop(piece, targetSq) {
    const isValidDrop = onSparePieceDrop(piece, targetSq);
    if (!isValidDrop)
      return;
    const newOnDropPosition = Object.assign({}, currentPosition);
    newOnDropPosition[targetSq] = piece;
    setCurrentPosition(newOnDropPosition);
    getPositionObject(newOnDropPosition);
  }
  function clearPremoves(clearLastPieceColour = true) {
    if (clearLastPieceColour)
      setLastPieceColour(void 0);
    premovesRef.current = [];
    setPremoves([]);
  }
  function clearPromotion() {
    setPromoteFromSquare(null);
    setPromoteToSquare(null);
    setShowPromoteDialog(false);
  }
  function onRightClickDown(square) {
    setCurrentRightClickDown(square);
  }
  function onRightClickUp(square) {
    if (currentRightClickDown) {
      if (currentRightClickDown === square) {
        setCurrentRightClickDown(void 0);
        clearPremovesOnRightClick && clearPremoves(false);
        onSquareRightClick(square);
        return;
      }
    } else
      setCurrentRightClickDown(void 0);
  }
  function clearCurrentRightClickDown() {
    setCurrentRightClickDown(void 0);
  }
  const ChessboardProviderContextValue = {
    allowDragOutsideBoard,
    animationDuration,
    arePiecesDraggable,
    arePremovesAllowed,
    arrows,
    autoPromoteToQueen,
    boardOrientation,
    boardWidth,
    chessPieces,
    clearArrows,
    clearCurrentRightClickDown,
    currentPosition,
    currentRightClickDown,
    customArrowColor,
    customBoardStyle,
    customDarkSquareStyle,
    customDropSquareStyle,
    customLightSquareStyle,
    customNotationStyle,
    customPremoveDarkSquareStyle,
    customPremoveLightSquareStyle,
    customSquare,
    customSquareStyles,
    deletePieceFromSquare,
    drawNewArrow,
    dropOffBoardAction,
    handleSetPosition,
    handleSparePieceDrop,
    id,
    isDraggablePiece,
    isWaitingForAnimation,
    lastPieceColour,
    lastSquareDraggedOver,
    newArrow,
    onArrowDrawEnd,
    onDragOverSquare,
    onMouseOutSquare,
    onMouseOverSquare,
    onPieceClick,
    onPieceDragBegin,
    onPieceDragEnd,
    onPieceDrop,
    onPieceDropOffBoard,
    onPromotionCheck,
    onPromotionPieceSelect,
    onRightClickDown,
    onRightClickUp,
    onSparePieceDrop,
    onSquareClick,
    positionDifferences,
    premoves,
    promoteFromSquare,
    promoteToSquare,
    promotionDialogVariant,
    setLastSquareDraggedOver,
    setPromoteFromSquare,
    setPromoteToSquare,
    setShowPromoteDialog,
    showBoardNotation,
    showPromoteDialog,
    snapToCursor
  };
  return (0, import_jsx_runtime.jsx)(ChessboardContext.Provider, Object.assign({ value: ChessboardProviderContextValue }, { children }));
});
function Notation({ row, col }) {
  const { boardOrientation, boardWidth, customDarkSquareStyle, customLightSquareStyle, customNotationStyle } = useChessboard();
  const whiteColor = customLightSquareStyle.backgroundColor;
  const blackColor = customDarkSquareStyle.backgroundColor;
  const isRow = col === 0;
  const isColumn = row === 7;
  const isBottomLeftSquare = isRow && isColumn;
  function getRow() {
    return boardOrientation === "white" ? 8 - row : row + 1;
  }
  function getColumn() {
    return boardOrientation === "black" ? COLUMNS[7 - col] : COLUMNS[col];
  }
  function renderBottomLeft() {
    return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("div", Object.assign({ style: Object.assign(Object.assign({ zIndex: 3, position: "absolute" }, { color: whiteColor }), numericStyle(boardWidth, customNotationStyle)) }, { children: getRow() })), (0, import_jsx_runtime.jsx)("div", Object.assign({ style: Object.assign(Object.assign({ zIndex: 3, position: "absolute" }, { color: whiteColor }), alphaStyle(boardWidth, customNotationStyle)) }, { children: getColumn() }))] });
  }
  function renderLetters() {
    return (0, import_jsx_runtime.jsx)("div", Object.assign({ style: Object.assign(Object.assign({ userSelect: "none", zIndex: 3, position: "absolute" }, { color: col % 2 !== 0 ? blackColor : whiteColor }), alphaStyle(boardWidth, customNotationStyle)) }, { children: getColumn() }));
  }
  function renderNumbers() {
    return (0, import_jsx_runtime.jsx)("div", Object.assign({ style: Object.assign(Object.assign({ userSelect: "none", zIndex: 3, position: "absolute" }, boardOrientation === "black" ? { color: row % 2 === 0 ? blackColor : whiteColor } : { color: row % 2 === 0 ? blackColor : whiteColor }), numericStyle(boardWidth, customNotationStyle)) }, { children: getRow() }));
  }
  if (isBottomLeftSquare) {
    return renderBottomLeft();
  }
  if (isColumn) {
    return renderLetters();
  }
  if (isRow) {
    return renderNumbers();
  }
  return null;
}
var alphaStyle = (width, customNotationStyle) => Object.assign({ alignSelf: "flex-end", paddingLeft: width / 8 - width / 48, fontSize: width / 48 }, customNotationStyle);
var numericStyle = (width, customNotationStyle) => Object.assign({ alignSelf: "flex-start", paddingRight: width / 8 - width / 48, fontSize: width / 48 }, customNotationStyle);
var DndContext = (0, import_react.createContext)({
  dragDropManager: void 0
});
var $$observable = function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
}();
var randomString = function randomString2() {
  return Math.random().toString(36).substring(7).split("").join(".");
};
var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};
function isPlainObject(obj) {
  if (typeof obj !== "object" || obj === null) return false;
  var proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}
function miniKindOf(val) {
  if (val === void 0) return "undefined";
  if (val === null) return "null";
  var type = typeof val;
  switch (type) {
    case "boolean":
    case "string":
    case "number":
    case "symbol":
    case "function": {
      return type;
    }
  }
  if (Array.isArray(val)) return "array";
  if (isDate(val)) return "date";
  if (isError(val)) return "error";
  var constructorName = ctorName(val);
  switch (constructorName) {
    case "Symbol":
    case "Promise":
    case "WeakMap":
    case "WeakSet":
    case "Map":
    case "Set":
      return constructorName;
  }
  return type.slice(8, -1).toLowerCase().replace(/\s/g, "");
}
function ctorName(val) {
  return typeof val.constructor === "function" ? val.constructor.name : null;
}
function isError(val) {
  return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
}
function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
}
function kindOf(val) {
  var typeOfVal = typeof val;
  if (true) {
    typeOfVal = miniKindOf(val);
  }
  return typeOfVal;
}
function createStore(reducer, preloadedState, enhancer) {
  var _ref2;
  if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
    throw new Error(false ? formatProdErrorMessage(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  }
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = void 0;
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error(false ? formatProdErrorMessage(1) : "Expected the enhancer to be a function. Instead, received: '" + kindOf(enhancer) + "'");
    }
    return enhancer(createStore)(reducer, preloadedState);
  }
  if (typeof reducer !== "function") {
    throw new Error(false ? formatProdErrorMessage(2) : "Expected the root reducer to be a function. Instead, received: '" + kindOf(reducer) + "'");
  }
  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  function getState() {
    if (isDispatching) {
      throw new Error(false ? formatProdErrorMessage(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    }
    return currentState;
  }
  function subscribe(listener) {
    if (typeof listener !== "function") {
      throw new Error(false ? formatProdErrorMessage(4) : "Expected the listener to be a function. Instead, received: '" + kindOf(listener) + "'");
    }
    if (isDispatching) {
      throw new Error(false ? formatProdErrorMessage(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    }
    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      if (isDispatching) {
        throw new Error(false ? formatProdErrorMessage(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(false ? formatProdErrorMessage(7) : "Actions must be plain objects. Instead, the actual type was: '" + kindOf(action) + "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.");
    }
    if (typeof action.type === "undefined") {
      throw new Error(false ? formatProdErrorMessage(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    }
    if (isDispatching) {
      throw new Error(false ? formatProdErrorMessage(9) : "Reducers may not dispatch actions.");
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }
    return action;
  }
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== "function") {
      throw new Error(false ? formatProdErrorMessage(10) : "Expected the nextReducer to be a function. Instead, received: '" + kindOf(nextReducer));
    }
    currentReducer = nextReducer;
    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  function observable() {
    var _ref;
    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe2(observer) {
        if (typeof observer !== "object" || observer === null) {
          throw new Error(false ? formatProdErrorMessage(11) : "Expected the observer to be an object. Instead, received: '" + kindOf(observer) + "'");
        }
        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }
        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe
        };
      }
    }, _ref[$$observable] = function() {
      return this;
    }, _ref;
  }
  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch,
    subscribe,
    getState,
    replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}
function warning(message) {
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(message);
  }
  try {
    throw new Error(message);
  } catch (e) {
  }
}
function isCrushed() {
}
if (typeof isCrushed.name === "string" && isCrushed.name !== "isCrushed") {
  warning('You are currently using minified code outside of NODE_ENV === "production". This means that you are running a slower development build of Redux. You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) to ensure you have the correct code for your production build.');
}
function invariant(condition, format, ...args) {
  if (isProduction()) {
    if (format === void 0) {
      throw new Error("invariant requires an error message argument");
    }
  }
  if (!condition) {
    let error;
    if (format === void 0) {
      error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    } else {
      let argIndex = 0;
      error = new Error(format.replace(/%s/g, function() {
        return args[argIndex++];
      }));
      error.name = "Invariant Violation";
    }
    error.framesToPop = 1;
    throw error;
  }
}
function isProduction() {
  return typeof process !== "undefined" && false;
}
function get(obj, path, defaultValue) {
  return path.split(".").reduce(
    (a, c) => a && a[c] ? a[c] : defaultValue || null,
    obj
  );
}
function without$1(items, item) {
  return items.filter(
    (i) => i !== item
  );
}
function isObject(input) {
  return typeof input === "object";
}
function xor(itemsA, itemsB) {
  const map = /* @__PURE__ */ new Map();
  const insertItem = (item) => {
    map.set(item, map.has(item) ? map.get(item) + 1 : 1);
  };
  itemsA.forEach(insertItem);
  itemsB.forEach(insertItem);
  const result = [];
  map.forEach((count, key) => {
    if (count === 1) {
      result.push(key);
    }
  });
  return result;
}
function intersection(itemsA, itemsB) {
  return itemsA.filter(
    (t) => itemsB.indexOf(t) > -1
  );
}
var INIT_COORDS = "dnd-core/INIT_COORDS";
var BEGIN_DRAG = "dnd-core/BEGIN_DRAG";
var PUBLISH_DRAG_SOURCE = "dnd-core/PUBLISH_DRAG_SOURCE";
var HOVER = "dnd-core/HOVER";
var DROP = "dnd-core/DROP";
var END_DRAG = "dnd-core/END_DRAG";
function setClientOffset(clientOffset, sourceClientOffset) {
  return {
    type: INIT_COORDS,
    payload: {
      sourceClientOffset: sourceClientOffset || null,
      clientOffset: clientOffset || null
    }
  };
}
var ResetCoordinatesAction = {
  type: INIT_COORDS,
  payload: {
    clientOffset: null,
    sourceClientOffset: null
  }
};
function createBeginDrag(manager) {
  return function beginDrag(sourceIds = [], options = {
    publishSource: true
  }) {
    const { publishSource = true, clientOffset, getSourceClientOffset: getSourceClientOffset2 } = options;
    const monitor = manager.getMonitor();
    const registry = manager.getRegistry();
    manager.dispatch(setClientOffset(clientOffset));
    verifyInvariants$1(sourceIds, monitor, registry);
    const sourceId = getDraggableSource(sourceIds, monitor);
    if (sourceId == null) {
      manager.dispatch(ResetCoordinatesAction);
      return;
    }
    let sourceClientOffset = null;
    if (clientOffset) {
      if (!getSourceClientOffset2) {
        throw new Error("getSourceClientOffset must be defined");
      }
      verifyGetSourceClientOffsetIsFunction(getSourceClientOffset2);
      sourceClientOffset = getSourceClientOffset2(sourceId);
    }
    manager.dispatch(setClientOffset(clientOffset, sourceClientOffset));
    const source = registry.getSource(sourceId);
    const item = source.beginDrag(monitor, sourceId);
    if (item == null) {
      return void 0;
    }
    verifyItemIsObject(item);
    registry.pinSource(sourceId);
    const itemType = registry.getSourceType(sourceId);
    return {
      type: BEGIN_DRAG,
      payload: {
        itemType,
        item,
        sourceId,
        clientOffset: clientOffset || null,
        sourceClientOffset: sourceClientOffset || null,
        isSourcePublic: !!publishSource
      }
    };
  };
}
function verifyInvariants$1(sourceIds, monitor, registry) {
  invariant(!monitor.isDragging(), "Cannot call beginDrag while dragging.");
  sourceIds.forEach(function(sourceId) {
    invariant(registry.getSource(sourceId), "Expected sourceIds to be registered.");
  });
}
function verifyGetSourceClientOffsetIsFunction(getSourceClientOffset2) {
  invariant(typeof getSourceClientOffset2 === "function", "When clientOffset is provided, getSourceClientOffset must be a function.");
}
function verifyItemIsObject(item) {
  invariant(isObject(item), "Item must be an object.");
}
function getDraggableSource(sourceIds, monitor) {
  let sourceId = null;
  for (let i = sourceIds.length - 1; i >= 0; i--) {
    if (monitor.canDragSource(sourceIds[i])) {
      sourceId = sourceIds[i];
      break;
    }
  }
  return sourceId;
}
function _defineProperty$4(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectSpread$4(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys.forEach(function(key) {
      _defineProperty$4(target, key, source[key]);
    });
  }
  return target;
}
function createDrop(manager) {
  return function drop(options = {}) {
    const monitor = manager.getMonitor();
    const registry = manager.getRegistry();
    verifyInvariants(monitor);
    const targetIds = getDroppableTargets(monitor);
    targetIds.forEach((targetId, index) => {
      const dropResult = determineDropResult(targetId, index, registry, monitor);
      const action = {
        type: DROP,
        payload: {
          dropResult: _objectSpread$4({}, options, dropResult)
        }
      };
      manager.dispatch(action);
    });
  };
}
function verifyInvariants(monitor) {
  invariant(monitor.isDragging(), "Cannot call drop while not dragging.");
  invariant(!monitor.didDrop(), "Cannot call drop twice during one drag operation.");
}
function determineDropResult(targetId, index, registry, monitor) {
  const target = registry.getTarget(targetId);
  let dropResult = target ? target.drop(monitor, targetId) : void 0;
  verifyDropResultType(dropResult);
  if (typeof dropResult === "undefined") {
    dropResult = index === 0 ? {} : monitor.getDropResult();
  }
  return dropResult;
}
function verifyDropResultType(dropResult) {
  invariant(typeof dropResult === "undefined" || isObject(dropResult), "Drop result must either be an object or undefined.");
}
function getDroppableTargets(monitor) {
  const targetIds = monitor.getTargetIds().filter(monitor.canDropOnTarget, monitor);
  targetIds.reverse();
  return targetIds;
}
function createEndDrag(manager) {
  return function endDrag() {
    const monitor = manager.getMonitor();
    const registry = manager.getRegistry();
    verifyIsDragging(monitor);
    const sourceId = monitor.getSourceId();
    if (sourceId != null) {
      const source = registry.getSource(sourceId, true);
      source.endDrag(monitor, sourceId);
      registry.unpinSource();
    }
    return {
      type: END_DRAG
    };
  };
}
function verifyIsDragging(monitor) {
  invariant(monitor.isDragging(), "Cannot call endDrag while not dragging.");
}
function matchesType(targetType, draggedItemType) {
  if (draggedItemType === null) {
    return targetType === null;
  }
  return Array.isArray(targetType) ? targetType.some(
    (t) => t === draggedItemType
  ) : targetType === draggedItemType;
}
function createHover(manager) {
  return function hover(targetIdsArg, { clientOffset } = {}) {
    verifyTargetIdsIsArray(targetIdsArg);
    const targetIds = targetIdsArg.slice(0);
    const monitor = manager.getMonitor();
    const registry = manager.getRegistry();
    const draggedItemType = monitor.getItemType();
    removeNonMatchingTargetIds(targetIds, registry, draggedItemType);
    checkInvariants(targetIds, monitor, registry);
    hoverAllTargets(targetIds, monitor, registry);
    return {
      type: HOVER,
      payload: {
        targetIds,
        clientOffset: clientOffset || null
      }
    };
  };
}
function verifyTargetIdsIsArray(targetIdsArg) {
  invariant(Array.isArray(targetIdsArg), "Expected targetIds to be an array.");
}
function checkInvariants(targetIds, monitor, registry) {
  invariant(monitor.isDragging(), "Cannot call hover while not dragging.");
  invariant(!monitor.didDrop(), "Cannot call hover after drop.");
  for (let i = 0; i < targetIds.length; i++) {
    const targetId = targetIds[i];
    invariant(targetIds.lastIndexOf(targetId) === i, "Expected targetIds to be unique in the passed array.");
    const target = registry.getTarget(targetId);
    invariant(target, "Expected targetIds to be registered.");
  }
}
function removeNonMatchingTargetIds(targetIds, registry, draggedItemType) {
  for (let i = targetIds.length - 1; i >= 0; i--) {
    const targetId = targetIds[i];
    const targetType = registry.getTargetType(targetId);
    if (!matchesType(targetType, draggedItemType)) {
      targetIds.splice(i, 1);
    }
  }
}
function hoverAllTargets(targetIds, monitor, registry) {
  targetIds.forEach(function(targetId) {
    const target = registry.getTarget(targetId);
    target.hover(monitor, targetId);
  });
}
function createPublishDragSource(manager) {
  return function publishDragSource() {
    const monitor = manager.getMonitor();
    if (monitor.isDragging()) {
      return {
        type: PUBLISH_DRAG_SOURCE
      };
    }
    return;
  };
}
function createDragDropActions(manager) {
  return {
    beginDrag: createBeginDrag(manager),
    publishDragSource: createPublishDragSource(manager),
    hover: createHover(manager),
    drop: createDrop(manager),
    endDrag: createEndDrag(manager)
  };
}
var DragDropManagerImpl = class {
  receiveBackend(backend) {
    this.backend = backend;
  }
  getMonitor() {
    return this.monitor;
  }
  getBackend() {
    return this.backend;
  }
  getRegistry() {
    return this.monitor.registry;
  }
  getActions() {
    const manager = this;
    const { dispatch } = this.store;
    function bindActionCreator(actionCreator) {
      return (...args) => {
        const action = actionCreator.apply(manager, args);
        if (typeof action !== "undefined") {
          dispatch(action);
        }
      };
    }
    const actions = createDragDropActions(this);
    return Object.keys(actions).reduce((boundActions, key) => {
      const action = actions[key];
      boundActions[key] = bindActionCreator(action);
      return boundActions;
    }, {});
  }
  dispatch(action) {
    this.store.dispatch(action);
  }
  constructor(store, monitor) {
    this.isSetUp = false;
    this.handleRefCountChange = () => {
      const shouldSetUp = this.store.getState().refCount > 0;
      if (this.backend) {
        if (shouldSetUp && !this.isSetUp) {
          this.backend.setup();
          this.isSetUp = true;
        } else if (!shouldSetUp && this.isSetUp) {
          this.backend.teardown();
          this.isSetUp = false;
        }
      }
    };
    this.store = store;
    this.monitor = monitor;
    store.subscribe(this.handleRefCountChange);
  }
};
function add(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y
  };
}
function subtract(a, b) {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  };
}
function getSourceClientOffset(state) {
  const { clientOffset, initialClientOffset, initialSourceClientOffset } = state;
  if (!clientOffset || !initialClientOffset || !initialSourceClientOffset) {
    return null;
  }
  return subtract(add(clientOffset, initialSourceClientOffset), initialClientOffset);
}
function getDifferenceFromInitialOffset(state) {
  const { clientOffset, initialClientOffset } = state;
  if (!clientOffset || !initialClientOffset) {
    return null;
  }
  return subtract(clientOffset, initialClientOffset);
}
var NONE = [];
var ALL = [];
NONE.__IS_NONE__ = true;
ALL.__IS_ALL__ = true;
function areDirty(dirtyIds, handlerIds) {
  if (dirtyIds === NONE) {
    return false;
  }
  if (dirtyIds === ALL || typeof handlerIds === "undefined") {
    return true;
  }
  const commonIds = intersection(handlerIds, dirtyIds);
  return commonIds.length > 0;
}
var DragDropMonitorImpl = class {
  subscribeToStateChange(listener, options = {}) {
    const { handlerIds } = options;
    invariant(typeof listener === "function", "listener must be a function.");
    invariant(typeof handlerIds === "undefined" || Array.isArray(handlerIds), "handlerIds, when specified, must be an array of strings.");
    let prevStateId = this.store.getState().stateId;
    const handleChange = () => {
      const state = this.store.getState();
      const currentStateId = state.stateId;
      try {
        const canSkipListener = currentStateId === prevStateId || currentStateId === prevStateId + 1 && !areDirty(state.dirtyHandlerIds, handlerIds);
        if (!canSkipListener) {
          listener();
        }
      } finally {
        prevStateId = currentStateId;
      }
    };
    return this.store.subscribe(handleChange);
  }
  subscribeToOffsetChange(listener) {
    invariant(typeof listener === "function", "listener must be a function.");
    let previousState = this.store.getState().dragOffset;
    const handleChange = () => {
      const nextState = this.store.getState().dragOffset;
      if (nextState === previousState) {
        return;
      }
      previousState = nextState;
      listener();
    };
    return this.store.subscribe(handleChange);
  }
  canDragSource(sourceId) {
    if (!sourceId) {
      return false;
    }
    const source = this.registry.getSource(sourceId);
    invariant(source, `Expected to find a valid source. sourceId=${sourceId}`);
    if (this.isDragging()) {
      return false;
    }
    return source.canDrag(this, sourceId);
  }
  canDropOnTarget(targetId) {
    if (!targetId) {
      return false;
    }
    const target = this.registry.getTarget(targetId);
    invariant(target, `Expected to find a valid target. targetId=${targetId}`);
    if (!this.isDragging() || this.didDrop()) {
      return false;
    }
    const targetType = this.registry.getTargetType(targetId);
    const draggedItemType = this.getItemType();
    return matchesType(targetType, draggedItemType) && target.canDrop(this, targetId);
  }
  isDragging() {
    return Boolean(this.getItemType());
  }
  isDraggingSource(sourceId) {
    if (!sourceId) {
      return false;
    }
    const source = this.registry.getSource(sourceId, true);
    invariant(source, `Expected to find a valid source. sourceId=${sourceId}`);
    if (!this.isDragging() || !this.isSourcePublic()) {
      return false;
    }
    const sourceType = this.registry.getSourceType(sourceId);
    const draggedItemType = this.getItemType();
    if (sourceType !== draggedItemType) {
      return false;
    }
    return source.isDragging(this, sourceId);
  }
  isOverTarget(targetId, options = {
    shallow: false
  }) {
    if (!targetId) {
      return false;
    }
    const { shallow } = options;
    if (!this.isDragging()) {
      return false;
    }
    const targetType = this.registry.getTargetType(targetId);
    const draggedItemType = this.getItemType();
    if (draggedItemType && !matchesType(targetType, draggedItemType)) {
      return false;
    }
    const targetIds = this.getTargetIds();
    if (!targetIds.length) {
      return false;
    }
    const index = targetIds.indexOf(targetId);
    if (shallow) {
      return index === targetIds.length - 1;
    } else {
      return index > -1;
    }
  }
  getItemType() {
    return this.store.getState().dragOperation.itemType;
  }
  getItem() {
    return this.store.getState().dragOperation.item;
  }
  getSourceId() {
    return this.store.getState().dragOperation.sourceId;
  }
  getTargetIds() {
    return this.store.getState().dragOperation.targetIds;
  }
  getDropResult() {
    return this.store.getState().dragOperation.dropResult;
  }
  didDrop() {
    return this.store.getState().dragOperation.didDrop;
  }
  isSourcePublic() {
    return Boolean(this.store.getState().dragOperation.isSourcePublic);
  }
  getInitialClientOffset() {
    return this.store.getState().dragOffset.initialClientOffset;
  }
  getInitialSourceClientOffset() {
    return this.store.getState().dragOffset.initialSourceClientOffset;
  }
  getClientOffset() {
    return this.store.getState().dragOffset.clientOffset;
  }
  getSourceClientOffset() {
    return getSourceClientOffset(this.store.getState().dragOffset);
  }
  getDifferenceFromInitialOffset() {
    return getDifferenceFromInitialOffset(this.store.getState().dragOffset);
  }
  constructor(store, registry) {
    this.store = store;
    this.registry = registry;
  }
};
var scope = typeof global !== "undefined" ? global : self;
var BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver;
function makeRequestCallFromTimer(callback) {
  return function requestCall() {
    const timeoutHandle = setTimeout(handleTimer, 0);
    const intervalHandle = setInterval(handleTimer, 50);
    function handleTimer() {
      clearTimeout(timeoutHandle);
      clearInterval(intervalHandle);
      callback();
    }
  };
}
function makeRequestCallFromMutationObserver(callback) {
  let toggle = 1;
  const observer = new BrowserMutationObserver(callback);
  const node = document.createTextNode("");
  observer.observe(node, {
    characterData: true
  });
  return function requestCall() {
    toggle = -toggle;
    node.data = toggle;
  };
}
var makeRequestCall = typeof BrowserMutationObserver === "function" ? (
  // reliably everywhere they are implemented.
  // They are implemented in all modern browsers.
  //
  // - Android 4-4.3
  // - Chrome 26-34
  // - Firefox 14-29
  // - Internet Explorer 11
  // - iPad Safari 6-7.1
  // - iPhone Safari 7-7.1
  // - Safari 6-7
  makeRequestCallFromMutationObserver
) : (
  // task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
  // 11-12, and in web workers in many engines.
  // Although message channels yield to any queued rendering and IO tasks, they
  // would be better than imposing the 4ms delay of timers.
  // However, they do not work reliably in Internet Explorer or Safari.
  // Internet Explorer 10 is the only browser that has setImmediate but does
  // not have MutationObservers.
  // Although setImmediate yields to the browser's renderer, it would be
  // preferrable to falling back to setTimeout since it does not have
  // the minimum 4ms penalty.
  // Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
  // Desktop to a lesser extent) that renders both setImmediate and
  // MessageChannel useless for the purposes of ASAP.
  // https://github.com/kriskowal/q/issues/396
  // Timers are implemented universally.
  // We fall back to timers in workers in most engines, and in foreground
  // contexts in the following browsers.
  // However, note that even this simple case requires nuances to operate in a
  // broad spectrum of browsers.
  //
  // - Firefox 3-13
  // - Internet Explorer 6-9
  // - iPad Safari 4.3
  // - Lynx 2.8.7
  makeRequestCallFromTimer
);
var AsapQueue = class {
  // Use the fastest means possible to execute a task in its own turn, with
  // priority over other events including IO, animation, reflow, and redraw
  // events in browsers.
  //
  // An exception thrown by a task will permanently interrupt the processing of
  // subsequent tasks. The higher level `asap` function ensures that if an
  // exception is thrown by a task, that the task queue will continue flushing as
  // soon as possible, but if you use `rawAsap` directly, you are responsible to
  // either ensure that no exceptions are thrown from your task, or to manually
  // call `rawAsap.requestFlush` if an exception is thrown.
  enqueueTask(task) {
    const { queue: q, requestFlush } = this;
    if (!q.length) {
      requestFlush();
      this.flushing = true;
    }
    q[q.length] = task;
  }
  constructor() {
    this.queue = [];
    this.pendingErrors = [];
    this.flushing = false;
    this.index = 0;
    this.capacity = 1024;
    this.flush = () => {
      const { queue: q } = this;
      while (this.index < q.length) {
        const currentIndex = this.index;
        this.index++;
        q[currentIndex].call();
        if (this.index > this.capacity) {
          for (let scan = 0, newLength = q.length - this.index; scan < newLength; scan++) {
            q[scan] = q[scan + this.index];
          }
          q.length -= this.index;
          this.index = 0;
        }
      }
      q.length = 0;
      this.index = 0;
      this.flushing = false;
    };
    this.registerPendingError = (err) => {
      this.pendingErrors.push(err);
      this.requestErrorThrow();
    };
    this.requestFlush = makeRequestCall(this.flush);
    this.requestErrorThrow = makeRequestCallFromTimer(() => {
      if (this.pendingErrors.length) {
        throw this.pendingErrors.shift();
      }
    });
  }
};
var RawTask = class {
  call() {
    try {
      this.task && this.task();
    } catch (error) {
      this.onError(error);
    } finally {
      this.task = null;
      this.release(this);
    }
  }
  constructor(onError, release) {
    this.onError = onError;
    this.release = release;
    this.task = null;
  }
};
var TaskFactory = class {
  create(task) {
    const tasks = this.freeTasks;
    const t1 = tasks.length ? tasks.pop() : new RawTask(
      this.onError,
      (t) => tasks[tasks.length] = t
    );
    t1.task = task;
    return t1;
  }
  constructor(onError) {
    this.onError = onError;
    this.freeTasks = [];
  }
};
var asapQueue = new AsapQueue();
var taskFactory = new TaskFactory(asapQueue.registerPendingError);
function asap(task) {
  asapQueue.enqueueTask(taskFactory.create(task));
}
var ADD_SOURCE = "dnd-core/ADD_SOURCE";
var ADD_TARGET = "dnd-core/ADD_TARGET";
var REMOVE_SOURCE = "dnd-core/REMOVE_SOURCE";
var REMOVE_TARGET = "dnd-core/REMOVE_TARGET";
function addSource(sourceId) {
  return {
    type: ADD_SOURCE,
    payload: {
      sourceId
    }
  };
}
function addTarget(targetId) {
  return {
    type: ADD_TARGET,
    payload: {
      targetId
    }
  };
}
function removeSource(sourceId) {
  return {
    type: REMOVE_SOURCE,
    payload: {
      sourceId
    }
  };
}
function removeTarget(targetId) {
  return {
    type: REMOVE_TARGET,
    payload: {
      targetId
    }
  };
}
function validateSourceContract(source) {
  invariant(typeof source.canDrag === "function", "Expected canDrag to be a function.");
  invariant(typeof source.beginDrag === "function", "Expected beginDrag to be a function.");
  invariant(typeof source.endDrag === "function", "Expected endDrag to be a function.");
}
function validateTargetContract(target) {
  invariant(typeof target.canDrop === "function", "Expected canDrop to be a function.");
  invariant(typeof target.hover === "function", "Expected hover to be a function.");
  invariant(typeof target.drop === "function", "Expected beginDrag to be a function.");
}
function validateType(type, allowArray) {
  if (allowArray && Array.isArray(type)) {
    type.forEach(
      (t) => validateType(t, false)
    );
    return;
  }
  invariant(typeof type === "string" || typeof type === "symbol", allowArray ? "Type can only be a string, a symbol, or an array of either." : "Type can only be a string or a symbol.");
}
var HandlerRole;
(function(HandlerRole2) {
  HandlerRole2["SOURCE"] = "SOURCE";
  HandlerRole2["TARGET"] = "TARGET";
})(HandlerRole || (HandlerRole = {}));
var nextUniqueId = 0;
function getNextUniqueId() {
  return nextUniqueId++;
}
function getNextHandlerId(role) {
  const id = getNextUniqueId().toString();
  switch (role) {
    case HandlerRole.SOURCE:
      return `S${id}`;
    case HandlerRole.TARGET:
      return `T${id}`;
    default:
      throw new Error(`Unknown Handler Role: ${role}`);
  }
}
function parseRoleFromHandlerId(handlerId) {
  switch (handlerId[0]) {
    case "S":
      return HandlerRole.SOURCE;
    case "T":
      return HandlerRole.TARGET;
    default:
      throw new Error(`Cannot parse handler ID: ${handlerId}`);
  }
}
function mapContainsValue(map, searchValue) {
  const entries = map.entries();
  let isDone = false;
  do {
    const { done, value: [, value] } = entries.next();
    if (value === searchValue) {
      return true;
    }
    isDone = !!done;
  } while (!isDone);
  return false;
}
var HandlerRegistryImpl = class {
  addSource(type, source) {
    validateType(type);
    validateSourceContract(source);
    const sourceId = this.addHandler(HandlerRole.SOURCE, type, source);
    this.store.dispatch(addSource(sourceId));
    return sourceId;
  }
  addTarget(type, target) {
    validateType(type, true);
    validateTargetContract(target);
    const targetId = this.addHandler(HandlerRole.TARGET, type, target);
    this.store.dispatch(addTarget(targetId));
    return targetId;
  }
  containsHandler(handler) {
    return mapContainsValue(this.dragSources, handler) || mapContainsValue(this.dropTargets, handler);
  }
  getSource(sourceId, includePinned = false) {
    invariant(this.isSourceId(sourceId), "Expected a valid source ID.");
    const isPinned = includePinned && sourceId === this.pinnedSourceId;
    const source = isPinned ? this.pinnedSource : this.dragSources.get(sourceId);
    return source;
  }
  getTarget(targetId) {
    invariant(this.isTargetId(targetId), "Expected a valid target ID.");
    return this.dropTargets.get(targetId);
  }
  getSourceType(sourceId) {
    invariant(this.isSourceId(sourceId), "Expected a valid source ID.");
    return this.types.get(sourceId);
  }
  getTargetType(targetId) {
    invariant(this.isTargetId(targetId), "Expected a valid target ID.");
    return this.types.get(targetId);
  }
  isSourceId(handlerId) {
    const role = parseRoleFromHandlerId(handlerId);
    return role === HandlerRole.SOURCE;
  }
  isTargetId(handlerId) {
    const role = parseRoleFromHandlerId(handlerId);
    return role === HandlerRole.TARGET;
  }
  removeSource(sourceId) {
    invariant(this.getSource(sourceId), "Expected an existing source.");
    this.store.dispatch(removeSource(sourceId));
    asap(() => {
      this.dragSources.delete(sourceId);
      this.types.delete(sourceId);
    });
  }
  removeTarget(targetId) {
    invariant(this.getTarget(targetId), "Expected an existing target.");
    this.store.dispatch(removeTarget(targetId));
    this.dropTargets.delete(targetId);
    this.types.delete(targetId);
  }
  pinSource(sourceId) {
    const source = this.getSource(sourceId);
    invariant(source, "Expected an existing source.");
    this.pinnedSourceId = sourceId;
    this.pinnedSource = source;
  }
  unpinSource() {
    invariant(this.pinnedSource, "No source is pinned at the time.");
    this.pinnedSourceId = null;
    this.pinnedSource = null;
  }
  addHandler(role, type, handler) {
    const id = getNextHandlerId(role);
    this.types.set(id, type);
    if (role === HandlerRole.SOURCE) {
      this.dragSources.set(id, handler);
    } else if (role === HandlerRole.TARGET) {
      this.dropTargets.set(id, handler);
    }
    return id;
  }
  constructor(store) {
    this.types = /* @__PURE__ */ new Map();
    this.dragSources = /* @__PURE__ */ new Map();
    this.dropTargets = /* @__PURE__ */ new Map();
    this.pinnedSourceId = null;
    this.pinnedSource = null;
    this.store = store;
  }
};
var strictEquality = (a, b) => a === b;
function areCoordsEqual(offsetA, offsetB) {
  if (!offsetA && !offsetB) {
    return true;
  } else if (!offsetA || !offsetB) {
    return false;
  } else {
    return offsetA.x === offsetB.x && offsetA.y === offsetB.y;
  }
}
function areArraysEqual(a, b, isEqual = strictEquality) {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; ++i) {
    if (!isEqual(a[i], b[i])) {
      return false;
    }
  }
  return true;
}
function reduce$5(_state = NONE, action) {
  switch (action.type) {
    case HOVER:
      break;
    case ADD_SOURCE:
    case ADD_TARGET:
    case REMOVE_TARGET:
    case REMOVE_SOURCE:
      return NONE;
    case BEGIN_DRAG:
    case PUBLISH_DRAG_SOURCE:
    case END_DRAG:
    case DROP:
    default:
      return ALL;
  }
  const { targetIds = [], prevTargetIds = [] } = action.payload;
  const result = xor(targetIds, prevTargetIds);
  const didChange = result.length > 0 || !areArraysEqual(targetIds, prevTargetIds);
  if (!didChange) {
    return NONE;
  }
  const prevInnermostTargetId = prevTargetIds[prevTargetIds.length - 1];
  const innermostTargetId = targetIds[targetIds.length - 1];
  if (prevInnermostTargetId !== innermostTargetId) {
    if (prevInnermostTargetId) {
      result.push(prevInnermostTargetId);
    }
    if (innermostTargetId) {
      result.push(innermostTargetId);
    }
  }
  return result;
}
function _defineProperty$3(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectSpread$3(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys.forEach(function(key) {
      _defineProperty$3(target, key, source[key]);
    });
  }
  return target;
}
var initialState$1 = {
  initialSourceClientOffset: null,
  initialClientOffset: null,
  clientOffset: null
};
function reduce$4(state = initialState$1, action) {
  const { payload } = action;
  switch (action.type) {
    case INIT_COORDS:
    case BEGIN_DRAG:
      return {
        initialSourceClientOffset: payload.sourceClientOffset,
        initialClientOffset: payload.clientOffset,
        clientOffset: payload.clientOffset
      };
    case HOVER:
      if (areCoordsEqual(state.clientOffset, payload.clientOffset)) {
        return state;
      }
      return _objectSpread$3({}, state, {
        clientOffset: payload.clientOffset
      });
    case END_DRAG:
    case DROP:
      return initialState$1;
    default:
      return state;
  }
}
function _defineProperty$2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys.forEach(function(key) {
      _defineProperty$2(target, key, source[key]);
    });
  }
  return target;
}
var initialState = {
  itemType: null,
  item: null,
  sourceId: null,
  targetIds: [],
  dropResult: null,
  didDrop: false,
  isSourcePublic: null
};
function reduce$3(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case BEGIN_DRAG:
      return _objectSpread$2({}, state, {
        itemType: payload.itemType,
        item: payload.item,
        sourceId: payload.sourceId,
        isSourcePublic: payload.isSourcePublic,
        dropResult: null,
        didDrop: false
      });
    case PUBLISH_DRAG_SOURCE:
      return _objectSpread$2({}, state, {
        isSourcePublic: true
      });
    case HOVER:
      return _objectSpread$2({}, state, {
        targetIds: payload.targetIds
      });
    case REMOVE_TARGET:
      if (state.targetIds.indexOf(payload.targetId) === -1) {
        return state;
      }
      return _objectSpread$2({}, state, {
        targetIds: without$1(state.targetIds, payload.targetId)
      });
    case DROP:
      return _objectSpread$2({}, state, {
        dropResult: payload.dropResult,
        didDrop: true,
        targetIds: []
      });
    case END_DRAG:
      return _objectSpread$2({}, state, {
        itemType: null,
        item: null,
        sourceId: null,
        dropResult: null,
        didDrop: false,
        isSourcePublic: null,
        targetIds: []
      });
    default:
      return state;
  }
}
function reduce$2(state = 0, action) {
  switch (action.type) {
    case ADD_SOURCE:
    case ADD_TARGET:
      return state + 1;
    case REMOVE_SOURCE:
    case REMOVE_TARGET:
      return state - 1;
    default:
      return state;
  }
}
function reduce$1(state = 0) {
  return state + 1;
}
function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys.forEach(function(key) {
      _defineProperty$1(target, key, source[key]);
    });
  }
  return target;
}
function reduce(state = {}, action) {
  return {
    dirtyHandlerIds: reduce$5(state.dirtyHandlerIds, {
      type: action.type,
      payload: _objectSpread$1({}, action.payload, {
        prevTargetIds: get(state, "dragOperation.targetIds", [])
      })
    }),
    dragOffset: reduce$4(state.dragOffset, action),
    refCount: reduce$2(state.refCount, action),
    dragOperation: reduce$3(state.dragOperation, action),
    stateId: reduce$1(state.stateId)
  };
}
function createDragDropManager(backendFactory, globalContext = void 0, backendOptions = {}, debugMode = false) {
  const store = makeStoreInstance(debugMode);
  const monitor = new DragDropMonitorImpl(store, new HandlerRegistryImpl(store));
  const manager = new DragDropManagerImpl(store, monitor);
  const backend = backendFactory(manager, globalContext, backendOptions);
  manager.receiveBackend(backend);
  return manager;
}
function makeStoreInstance(debugMode) {
  const reduxDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__;
  return createStore(reduce, debugMode && reduxDevTools && reduxDevTools({
    name: "dnd-core",
    instanceId: "dnd-core"
  }));
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var refCount = 0;
var INSTANCE_SYM = Symbol.for("__REACT_DND_CONTEXT_INSTANCE__");
var DndProvider = (0, import_react.memo)(function DndProvider2(_param) {
  var { children } = _param, props = _objectWithoutProperties(_param, [
    "children"
  ]);
  const [manager, isGlobalInstance] = getDndContextValue(props);
  (0, import_react.useEffect)(() => {
    if (isGlobalInstance) {
      const context = getGlobalContext();
      ++refCount;
      return () => {
        if (--refCount === 0) {
          context[INSTANCE_SYM] = null;
        }
      };
    }
    return;
  }, []);
  return (0, import_jsx_runtime.jsx)(DndContext.Provider, {
    value: manager,
    children
  });
});
function getDndContextValue(props) {
  if ("manager" in props) {
    const manager2 = {
      dragDropManager: props.manager
    };
    return [
      manager2,
      false
    ];
  }
  const manager = createSingletonDndContext(props.backend, props.context, props.options, props.debugMode);
  const isGlobalInstance = !props.context;
  return [
    manager,
    isGlobalInstance
  ];
}
function createSingletonDndContext(backend, context = getGlobalContext(), options, debugMode) {
  const ctx = context;
  if (!ctx[INSTANCE_SYM]) {
    ctx[INSTANCE_SYM] = {
      dragDropManager: createDragDropManager(backend, context, options, debugMode)
    };
  }
  return ctx[INSTANCE_SYM];
}
function getGlobalContext() {
  return typeof global !== "undefined" ? global : window;
}
var fastDeepEqual = function equal(a, b) {
  if (a === b) return true;
  if (a && b && typeof a == "object" && typeof b == "object") {
    if (a.constructor !== b.constructor) return false;
    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0; )
        if (!equal(a[i], b[i])) return false;
      return true;
    }
    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;
    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    for (i = length; i-- !== 0; ) {
      var key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }
    return true;
  }
  return a !== a && b !== b;
};
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
function useCollector(monitor, collect, onUpdate) {
  const [collected, setCollected] = (0, import_react.useState)(
    () => collect(monitor)
  );
  const updateCollected = (0, import_react.useCallback)(() => {
    const nextValue = collect(monitor);
    if (!fastDeepEqual(collected, nextValue)) {
      setCollected(nextValue);
      if (onUpdate) {
        onUpdate();
      }
    }
  }, [
    collected,
    monitor,
    onUpdate
  ]);
  useIsomorphicLayoutEffect(updateCollected);
  return [
    collected,
    updateCollected
  ];
}
function useMonitorOutput(monitor, collect, onCollect) {
  const [collected, updateCollected] = useCollector(monitor, collect, onCollect);
  useIsomorphicLayoutEffect(function subscribeToMonitorStateChange() {
    const handlerId = monitor.getHandlerId();
    if (handlerId == null) {
      return;
    }
    return monitor.subscribeToStateChange(updateCollected, {
      handlerIds: [
        handlerId
      ]
    });
  }, [
    monitor,
    updateCollected
  ]);
  return collected;
}
function useCollectedProps(collector, monitor, connector) {
  return useMonitorOutput(
    monitor,
    collector || (() => ({})),
    () => connector.reconnect()
  );
}
function useOptionalFactory(arg, deps) {
  const memoDeps = [
    ...deps || []
  ];
  if (deps == null && typeof arg !== "function") {
    memoDeps.push(arg);
  }
  return (0, import_react.useMemo)(() => {
    return typeof arg === "function" ? arg() : arg;
  }, memoDeps);
}
function useConnectDragSource(connector) {
  return (0, import_react.useMemo)(
    () => connector.hooks.dragSource(),
    [
      connector
    ]
  );
}
function useConnectDragPreview(connector) {
  return (0, import_react.useMemo)(
    () => connector.hooks.dragPreview(),
    [
      connector
    ]
  );
}
var isCallingCanDrag = false;
var isCallingIsDragging = false;
var DragSourceMonitorImpl = class {
  receiveHandlerId(sourceId) {
    this.sourceId = sourceId;
  }
  getHandlerId() {
    return this.sourceId;
  }
  canDrag() {
    invariant(!isCallingCanDrag, "You may not call monitor.canDrag() inside your canDrag() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");
    try {
      isCallingCanDrag = true;
      return this.internalMonitor.canDragSource(this.sourceId);
    } finally {
      isCallingCanDrag = false;
    }
  }
  isDragging() {
    if (!this.sourceId) {
      return false;
    }
    invariant(!isCallingIsDragging, "You may not call monitor.isDragging() inside your isDragging() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");
    try {
      isCallingIsDragging = true;
      return this.internalMonitor.isDraggingSource(this.sourceId);
    } finally {
      isCallingIsDragging = false;
    }
  }
  subscribeToStateChange(listener, options) {
    return this.internalMonitor.subscribeToStateChange(listener, options);
  }
  isDraggingSource(sourceId) {
    return this.internalMonitor.isDraggingSource(sourceId);
  }
  isOverTarget(targetId, options) {
    return this.internalMonitor.isOverTarget(targetId, options);
  }
  getTargetIds() {
    return this.internalMonitor.getTargetIds();
  }
  isSourcePublic() {
    return this.internalMonitor.isSourcePublic();
  }
  getSourceId() {
    return this.internalMonitor.getSourceId();
  }
  subscribeToOffsetChange(listener) {
    return this.internalMonitor.subscribeToOffsetChange(listener);
  }
  canDragSource(sourceId) {
    return this.internalMonitor.canDragSource(sourceId);
  }
  canDropOnTarget(targetId) {
    return this.internalMonitor.canDropOnTarget(targetId);
  }
  getItemType() {
    return this.internalMonitor.getItemType();
  }
  getItem() {
    return this.internalMonitor.getItem();
  }
  getDropResult() {
    return this.internalMonitor.getDropResult();
  }
  didDrop() {
    return this.internalMonitor.didDrop();
  }
  getInitialClientOffset() {
    return this.internalMonitor.getInitialClientOffset();
  }
  getInitialSourceClientOffset() {
    return this.internalMonitor.getInitialSourceClientOffset();
  }
  getSourceClientOffset() {
    return this.internalMonitor.getSourceClientOffset();
  }
  getClientOffset() {
    return this.internalMonitor.getClientOffset();
  }
  getDifferenceFromInitialOffset() {
    return this.internalMonitor.getDifferenceFromInitialOffset();
  }
  constructor(manager) {
    this.sourceId = null;
    this.internalMonitor = manager.getMonitor();
  }
};
var isCallingCanDrop = false;
var DropTargetMonitorImpl = class {
  receiveHandlerId(targetId) {
    this.targetId = targetId;
  }
  getHandlerId() {
    return this.targetId;
  }
  subscribeToStateChange(listener, options) {
    return this.internalMonitor.subscribeToStateChange(listener, options);
  }
  canDrop() {
    if (!this.targetId) {
      return false;
    }
    invariant(!isCallingCanDrop, "You may not call monitor.canDrop() inside your canDrop() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor");
    try {
      isCallingCanDrop = true;
      return this.internalMonitor.canDropOnTarget(this.targetId);
    } finally {
      isCallingCanDrop = false;
    }
  }
  isOver(options) {
    if (!this.targetId) {
      return false;
    }
    return this.internalMonitor.isOverTarget(this.targetId, options);
  }
  getItemType() {
    return this.internalMonitor.getItemType();
  }
  getItem() {
    return this.internalMonitor.getItem();
  }
  getDropResult() {
    return this.internalMonitor.getDropResult();
  }
  didDrop() {
    return this.internalMonitor.didDrop();
  }
  getInitialClientOffset() {
    return this.internalMonitor.getInitialClientOffset();
  }
  getInitialSourceClientOffset() {
    return this.internalMonitor.getInitialSourceClientOffset();
  }
  getSourceClientOffset() {
    return this.internalMonitor.getSourceClientOffset();
  }
  getClientOffset() {
    return this.internalMonitor.getClientOffset();
  }
  getDifferenceFromInitialOffset() {
    return this.internalMonitor.getDifferenceFromInitialOffset();
  }
  constructor(manager) {
    this.targetId = null;
    this.internalMonitor = manager.getMonitor();
  }
};
function registerTarget(type, target, manager) {
  const registry = manager.getRegistry();
  const targetId = registry.addTarget(type, target);
  return [
    targetId,
    () => registry.removeTarget(targetId)
  ];
}
function registerSource(type, source, manager) {
  const registry = manager.getRegistry();
  const sourceId = registry.addSource(type, source);
  return [
    sourceId,
    () => registry.removeSource(sourceId)
  ];
}
function shallowEqual(objA, objB, compare, compareContext) {
  let compareResult = compare ? compare.call(compareContext, objA, objB) : void 0;
  if (compareResult !== void 0) {
    return !!compareResult;
  }
  if (objA === objB) {
    return true;
  }
  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (let idx = 0; idx < keysA.length; idx++) {
    const key = keysA[idx];
    if (!bHasOwnProperty(key)) {
      return false;
    }
    const valueA = objA[key];
    const valueB = objB[key];
    compareResult = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
    if (compareResult === false || compareResult === void 0 && valueA !== valueB) {
      return false;
    }
  }
  return true;
}
function isRef(obj) {
  return (
    // eslint-disable-next-line no-prototype-builtins
    obj !== null && typeof obj === "object" && Object.prototype.hasOwnProperty.call(obj, "current")
  );
}
function throwIfCompositeComponentElement(element) {
  if (typeof element.type === "string") {
    return;
  }
  const displayName = element.type.displayName || element.type.name || "the component";
  throw new Error(`Only native element nodes can now be passed to React DnD connectors.You can either wrap ${displayName} into a <div>, or turn it into a drag source or a drop target itself.`);
}
function wrapHookToRecognizeElement(hook) {
  return (elementOrNode = null, options = null) => {
    if (!(0, import_react.isValidElement)(elementOrNode)) {
      const node = elementOrNode;
      hook(node, options);
      return node;
    }
    const element = elementOrNode;
    throwIfCompositeComponentElement(element);
    const ref = options ? (node) => hook(node, options) : hook;
    return cloneWithRef(element, ref);
  };
}
function wrapConnectorHooks(hooks) {
  const wrappedHooks = {};
  Object.keys(hooks).forEach((key) => {
    const hook = hooks[key];
    if (key.endsWith("Ref")) {
      wrappedHooks[key] = hooks[key];
    } else {
      const wrappedHook = wrapHookToRecognizeElement(hook);
      wrappedHooks[key] = () => wrappedHook;
    }
  });
  return wrappedHooks;
}
function setRef(ref, node) {
  if (typeof ref === "function") {
    ref(node);
  } else {
    ref.current = node;
  }
}
function cloneWithRef(element, newRef) {
  const previousRef = element.ref;
  invariant(typeof previousRef !== "string", "Cannot connect React DnD to an element with an existing string ref. Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. Read more: https://reactjs.org/docs/refs-and-the-dom.html#callback-refs");
  if (!previousRef) {
    return (0, import_react.cloneElement)(element, {
      ref: newRef
    });
  } else {
    return (0, import_react.cloneElement)(element, {
      ref: (node) => {
        setRef(previousRef, node);
        setRef(newRef, node);
      }
    });
  }
}
var SourceConnector = class {
  receiveHandlerId(newHandlerId) {
    if (this.handlerId === newHandlerId) {
      return;
    }
    this.handlerId = newHandlerId;
    this.reconnect();
  }
  get connectTarget() {
    return this.dragSource;
  }
  get dragSourceOptions() {
    return this.dragSourceOptionsInternal;
  }
  set dragSourceOptions(options) {
    this.dragSourceOptionsInternal = options;
  }
  get dragPreviewOptions() {
    return this.dragPreviewOptionsInternal;
  }
  set dragPreviewOptions(options) {
    this.dragPreviewOptionsInternal = options;
  }
  reconnect() {
    const didChange = this.reconnectDragSource();
    this.reconnectDragPreview(didChange);
  }
  reconnectDragSource() {
    const dragSource = this.dragSource;
    const didChange = this.didHandlerIdChange() || this.didConnectedDragSourceChange() || this.didDragSourceOptionsChange();
    if (didChange) {
      this.disconnectDragSource();
    }
    if (!this.handlerId) {
      return didChange;
    }
    if (!dragSource) {
      this.lastConnectedDragSource = dragSource;
      return didChange;
    }
    if (didChange) {
      this.lastConnectedHandlerId = this.handlerId;
      this.lastConnectedDragSource = dragSource;
      this.lastConnectedDragSourceOptions = this.dragSourceOptions;
      this.dragSourceUnsubscribe = this.backend.connectDragSource(this.handlerId, dragSource, this.dragSourceOptions);
    }
    return didChange;
  }
  reconnectDragPreview(forceDidChange = false) {
    const dragPreview = this.dragPreview;
    const didChange = forceDidChange || this.didHandlerIdChange() || this.didConnectedDragPreviewChange() || this.didDragPreviewOptionsChange();
    if (didChange) {
      this.disconnectDragPreview();
    }
    if (!this.handlerId) {
      return;
    }
    if (!dragPreview) {
      this.lastConnectedDragPreview = dragPreview;
      return;
    }
    if (didChange) {
      this.lastConnectedHandlerId = this.handlerId;
      this.lastConnectedDragPreview = dragPreview;
      this.lastConnectedDragPreviewOptions = this.dragPreviewOptions;
      this.dragPreviewUnsubscribe = this.backend.connectDragPreview(this.handlerId, dragPreview, this.dragPreviewOptions);
    }
  }
  didHandlerIdChange() {
    return this.lastConnectedHandlerId !== this.handlerId;
  }
  didConnectedDragSourceChange() {
    return this.lastConnectedDragSource !== this.dragSource;
  }
  didConnectedDragPreviewChange() {
    return this.lastConnectedDragPreview !== this.dragPreview;
  }
  didDragSourceOptionsChange() {
    return !shallowEqual(this.lastConnectedDragSourceOptions, this.dragSourceOptions);
  }
  didDragPreviewOptionsChange() {
    return !shallowEqual(this.lastConnectedDragPreviewOptions, this.dragPreviewOptions);
  }
  disconnectDragSource() {
    if (this.dragSourceUnsubscribe) {
      this.dragSourceUnsubscribe();
      this.dragSourceUnsubscribe = void 0;
    }
  }
  disconnectDragPreview() {
    if (this.dragPreviewUnsubscribe) {
      this.dragPreviewUnsubscribe();
      this.dragPreviewUnsubscribe = void 0;
      this.dragPreviewNode = null;
      this.dragPreviewRef = null;
    }
  }
  get dragSource() {
    return this.dragSourceNode || this.dragSourceRef && this.dragSourceRef.current;
  }
  get dragPreview() {
    return this.dragPreviewNode || this.dragPreviewRef && this.dragPreviewRef.current;
  }
  clearDragSource() {
    this.dragSourceNode = null;
    this.dragSourceRef = null;
  }
  clearDragPreview() {
    this.dragPreviewNode = null;
    this.dragPreviewRef = null;
  }
  constructor(backend) {
    this.hooks = wrapConnectorHooks({
      dragSource: (node, options) => {
        this.clearDragSource();
        this.dragSourceOptions = options || null;
        if (isRef(node)) {
          this.dragSourceRef = node;
        } else {
          this.dragSourceNode = node;
        }
        this.reconnectDragSource();
      },
      dragPreview: (node, options) => {
        this.clearDragPreview();
        this.dragPreviewOptions = options || null;
        if (isRef(node)) {
          this.dragPreviewRef = node;
        } else {
          this.dragPreviewNode = node;
        }
        this.reconnectDragPreview();
      }
    });
    this.handlerId = null;
    this.dragSourceRef = null;
    this.dragSourceOptionsInternal = null;
    this.dragPreviewRef = null;
    this.dragPreviewOptionsInternal = null;
    this.lastConnectedHandlerId = null;
    this.lastConnectedDragSource = null;
    this.lastConnectedDragSourceOptions = null;
    this.lastConnectedDragPreview = null;
    this.lastConnectedDragPreviewOptions = null;
    this.backend = backend;
  }
};
var TargetConnector = class {
  get connectTarget() {
    return this.dropTarget;
  }
  reconnect() {
    const didChange = this.didHandlerIdChange() || this.didDropTargetChange() || this.didOptionsChange();
    if (didChange) {
      this.disconnectDropTarget();
    }
    const dropTarget = this.dropTarget;
    if (!this.handlerId) {
      return;
    }
    if (!dropTarget) {
      this.lastConnectedDropTarget = dropTarget;
      return;
    }
    if (didChange) {
      this.lastConnectedHandlerId = this.handlerId;
      this.lastConnectedDropTarget = dropTarget;
      this.lastConnectedDropTargetOptions = this.dropTargetOptions;
      this.unsubscribeDropTarget = this.backend.connectDropTarget(this.handlerId, dropTarget, this.dropTargetOptions);
    }
  }
  receiveHandlerId(newHandlerId) {
    if (newHandlerId === this.handlerId) {
      return;
    }
    this.handlerId = newHandlerId;
    this.reconnect();
  }
  get dropTargetOptions() {
    return this.dropTargetOptionsInternal;
  }
  set dropTargetOptions(options) {
    this.dropTargetOptionsInternal = options;
  }
  didHandlerIdChange() {
    return this.lastConnectedHandlerId !== this.handlerId;
  }
  didDropTargetChange() {
    return this.lastConnectedDropTarget !== this.dropTarget;
  }
  didOptionsChange() {
    return !shallowEqual(this.lastConnectedDropTargetOptions, this.dropTargetOptions);
  }
  disconnectDropTarget() {
    if (this.unsubscribeDropTarget) {
      this.unsubscribeDropTarget();
      this.unsubscribeDropTarget = void 0;
    }
  }
  get dropTarget() {
    return this.dropTargetNode || this.dropTargetRef && this.dropTargetRef.current;
  }
  clearDropTarget() {
    this.dropTargetRef = null;
    this.dropTargetNode = null;
  }
  constructor(backend) {
    this.hooks = wrapConnectorHooks({
      dropTarget: (node, options) => {
        this.clearDropTarget();
        this.dropTargetOptions = options;
        if (isRef(node)) {
          this.dropTargetRef = node;
        } else {
          this.dropTargetNode = node;
        }
        this.reconnect();
      }
    });
    this.handlerId = null;
    this.dropTargetRef = null;
    this.dropTargetOptionsInternal = null;
    this.lastConnectedHandlerId = null;
    this.lastConnectedDropTarget = null;
    this.lastConnectedDropTargetOptions = null;
    this.backend = backend;
  }
};
function useDragDropManager() {
  const { dragDropManager } = (0, import_react.useContext)(DndContext);
  invariant(dragDropManager != null, "Expected drag drop context");
  return dragDropManager;
}
function useDragSourceConnector(dragSourceOptions, dragPreviewOptions) {
  const manager = useDragDropManager();
  const connector = (0, import_react.useMemo)(
    () => new SourceConnector(manager.getBackend()),
    [
      manager
    ]
  );
  useIsomorphicLayoutEffect(() => {
    connector.dragSourceOptions = dragSourceOptions || null;
    connector.reconnect();
    return () => connector.disconnectDragSource();
  }, [
    connector,
    dragSourceOptions
  ]);
  useIsomorphicLayoutEffect(() => {
    connector.dragPreviewOptions = dragPreviewOptions || null;
    connector.reconnect();
    return () => connector.disconnectDragPreview();
  }, [
    connector,
    dragPreviewOptions
  ]);
  return connector;
}
function useDragSourceMonitor() {
  const manager = useDragDropManager();
  return (0, import_react.useMemo)(
    () => new DragSourceMonitorImpl(manager),
    [
      manager
    ]
  );
}
var DragSourceImpl = class {
  beginDrag() {
    const spec = this.spec;
    const monitor = this.monitor;
    let result = null;
    if (typeof spec.item === "object") {
      result = spec.item;
    } else if (typeof spec.item === "function") {
      result = spec.item(monitor);
    } else {
      result = {};
    }
    return result !== null && result !== void 0 ? result : null;
  }
  canDrag() {
    const spec = this.spec;
    const monitor = this.monitor;
    if (typeof spec.canDrag === "boolean") {
      return spec.canDrag;
    } else if (typeof spec.canDrag === "function") {
      return spec.canDrag(monitor);
    } else {
      return true;
    }
  }
  isDragging(globalMonitor, target) {
    const spec = this.spec;
    const monitor = this.monitor;
    const { isDragging } = spec;
    return isDragging ? isDragging(monitor) : target === globalMonitor.getSourceId();
  }
  endDrag() {
    const spec = this.spec;
    const monitor = this.monitor;
    const connector = this.connector;
    const { end } = spec;
    if (end) {
      end(monitor.getItem(), monitor);
    }
    connector.reconnect();
  }
  constructor(spec, monitor, connector) {
    this.spec = spec;
    this.monitor = monitor;
    this.connector = connector;
  }
};
function useDragSource(spec, monitor, connector) {
  const handler = (0, import_react.useMemo)(
    () => new DragSourceImpl(spec, monitor, connector),
    [
      monitor,
      connector
    ]
  );
  (0, import_react.useEffect)(() => {
    handler.spec = spec;
  }, [
    spec
  ]);
  return handler;
}
function useDragType(spec) {
  return (0, import_react.useMemo)(() => {
    const result = spec.type;
    invariant(result != null, "spec.type must be defined");
    return result;
  }, [
    spec
  ]);
}
function useRegisteredDragSource(spec, monitor, connector) {
  const manager = useDragDropManager();
  const handler = useDragSource(spec, monitor, connector);
  const itemType = useDragType(spec);
  useIsomorphicLayoutEffect(function registerDragSource() {
    if (itemType != null) {
      const [handlerId, unregister] = registerSource(itemType, handler, manager);
      monitor.receiveHandlerId(handlerId);
      connector.receiveHandlerId(handlerId);
      return unregister;
    }
    return;
  }, [
    manager,
    monitor,
    connector,
    handler,
    itemType
  ]);
}
function useDrag(specArg, deps) {
  const spec = useOptionalFactory(specArg, deps);
  invariant(!spec.begin, `useDrag::spec.begin was deprecated in v14. Replace spec.begin() with spec.item(). (see more here - https://react-dnd.github.io/react-dnd/docs/api/use-drag)`);
  const monitor = useDragSourceMonitor();
  const connector = useDragSourceConnector(spec.options, spec.previewOptions);
  useRegisteredDragSource(spec, monitor, connector);
  return [
    useCollectedProps(spec.collect, monitor, connector),
    useConnectDragSource(connector),
    useConnectDragPreview(connector)
  ];
}
function useDragLayer(collect) {
  const dragDropManager = useDragDropManager();
  const monitor = dragDropManager.getMonitor();
  const [collected, updateCollected] = useCollector(monitor, collect);
  (0, import_react.useEffect)(
    () => monitor.subscribeToOffsetChange(updateCollected)
  );
  (0, import_react.useEffect)(
    () => monitor.subscribeToStateChange(updateCollected)
  );
  return collected;
}
function useConnectDropTarget(connector) {
  return (0, import_react.useMemo)(
    () => connector.hooks.dropTarget(),
    [
      connector
    ]
  );
}
function useDropTargetConnector(options) {
  const manager = useDragDropManager();
  const connector = (0, import_react.useMemo)(
    () => new TargetConnector(manager.getBackend()),
    [
      manager
    ]
  );
  useIsomorphicLayoutEffect(() => {
    connector.dropTargetOptions = options || null;
    connector.reconnect();
    return () => connector.disconnectDropTarget();
  }, [
    options
  ]);
  return connector;
}
function useDropTargetMonitor() {
  const manager = useDragDropManager();
  return (0, import_react.useMemo)(
    () => new DropTargetMonitorImpl(manager),
    [
      manager
    ]
  );
}
function useAccept(spec) {
  const { accept } = spec;
  return (0, import_react.useMemo)(() => {
    invariant(spec.accept != null, "accept must be defined");
    return Array.isArray(accept) ? accept : [
      accept
    ];
  }, [
    accept
  ]);
}
var DropTargetImpl = class {
  canDrop() {
    const spec = this.spec;
    const monitor = this.monitor;
    return spec.canDrop ? spec.canDrop(monitor.getItem(), monitor) : true;
  }
  hover() {
    const spec = this.spec;
    const monitor = this.monitor;
    if (spec.hover) {
      spec.hover(monitor.getItem(), monitor);
    }
  }
  drop() {
    const spec = this.spec;
    const monitor = this.monitor;
    if (spec.drop) {
      return spec.drop(monitor.getItem(), monitor);
    }
    return;
  }
  constructor(spec, monitor) {
    this.spec = spec;
    this.monitor = monitor;
  }
};
function useDropTarget(spec, monitor) {
  const dropTarget = (0, import_react.useMemo)(
    () => new DropTargetImpl(spec, monitor),
    [
      monitor
    ]
  );
  (0, import_react.useEffect)(() => {
    dropTarget.spec = spec;
  }, [
    spec
  ]);
  return dropTarget;
}
function useRegisteredDropTarget(spec, monitor, connector) {
  const manager = useDragDropManager();
  const dropTarget = useDropTarget(spec, monitor);
  const accept = useAccept(spec);
  useIsomorphicLayoutEffect(function registerDropTarget() {
    const [handlerId, unregister] = registerTarget(accept, dropTarget, manager);
    monitor.receiveHandlerId(handlerId);
    connector.receiveHandlerId(handlerId);
    return unregister;
  }, [
    manager,
    monitor,
    dropTarget,
    connector,
    accept.map(
      (a) => a.toString()
    ).join("|")
  ]);
}
function useDrop(specArg, deps) {
  const spec = useOptionalFactory(specArg, deps);
  const monitor = useDropTargetMonitor();
  const connector = useDropTargetConnector(spec.options);
  useRegisteredDropTarget(spec, monitor, connector);
  return [
    useCollectedProps(spec.collect, monitor, connector),
    useConnectDropTarget(connector)
  ];
}
function memoize(fn) {
  let result = null;
  const memoized = () => {
    if (result == null) {
      result = fn();
    }
    return result;
  };
  return memoized;
}
function without(items, item) {
  return items.filter(
    (i) => i !== item
  );
}
function union(itemsA, itemsB) {
  const set = /* @__PURE__ */ new Set();
  const insertItem = (item) => set.add(item);
  itemsA.forEach(insertItem);
  itemsB.forEach(insertItem);
  const result = [];
  set.forEach(
    (key) => result.push(key)
  );
  return result;
}
var EnterLeaveCounter = class {
  enter(enteringNode) {
    const previousLength = this.entered.length;
    const isNodeEntered = (node) => this.isNodeInDocument(node) && (!node.contains || node.contains(enteringNode));
    this.entered = union(this.entered.filter(isNodeEntered), [
      enteringNode
    ]);
    return previousLength === 0 && this.entered.length > 0;
  }
  leave(leavingNode) {
    const previousLength = this.entered.length;
    this.entered = without(this.entered.filter(this.isNodeInDocument), leavingNode);
    return previousLength > 0 && this.entered.length === 0;
  }
  reset() {
    this.entered = [];
  }
  constructor(isNodeInDocument) {
    this.entered = [];
    this.isNodeInDocument = isNodeInDocument;
  }
};
var NativeDragSource = class {
  initializeExposedProperties() {
    Object.keys(this.config.exposeProperties).forEach((property) => {
      Object.defineProperty(this.item, property, {
        configurable: true,
        enumerable: true,
        get() {
          console.warn(`Browser doesn't allow reading "${property}" until the drop event.`);
          return null;
        }
      });
    });
  }
  loadDataTransfer(dataTransfer) {
    if (dataTransfer) {
      const newProperties = {};
      Object.keys(this.config.exposeProperties).forEach((property) => {
        const propertyFn = this.config.exposeProperties[property];
        if (propertyFn != null) {
          newProperties[property] = {
            value: propertyFn(dataTransfer, this.config.matchesTypes),
            configurable: true,
            enumerable: true
          };
        }
      });
      Object.defineProperties(this.item, newProperties);
    }
  }
  canDrag() {
    return true;
  }
  beginDrag() {
    return this.item;
  }
  isDragging(monitor, handle) {
    return handle === monitor.getSourceId();
  }
  endDrag() {
  }
  constructor(config) {
    this.config = config;
    this.item = {};
    this.initializeExposedProperties();
  }
};
var FILE = "__NATIVE_FILE__";
var URL = "__NATIVE_URL__";
var TEXT = "__NATIVE_TEXT__";
var HTML = "__NATIVE_HTML__";
var NativeTypes = Object.freeze({
  __proto__: null,
  FILE,
  HTML,
  TEXT,
  URL
});
function getDataFromDataTransfer(dataTransfer, typesToTry, defaultValue) {
  const result = typesToTry.reduce(
    (resultSoFar, typeToTry) => resultSoFar || dataTransfer.getData(typeToTry),
    ""
  );
  return result != null ? result : defaultValue;
}
var nativeTypesConfig = {
  [FILE]: {
    exposeProperties: {
      files: (dataTransfer) => Array.prototype.slice.call(dataTransfer.files),
      items: (dataTransfer) => dataTransfer.items,
      dataTransfer: (dataTransfer) => dataTransfer
    },
    matchesTypes: [
      "Files"
    ]
  },
  [HTML]: {
    exposeProperties: {
      html: (dataTransfer, matchesTypes) => getDataFromDataTransfer(dataTransfer, matchesTypes, ""),
      dataTransfer: (dataTransfer) => dataTransfer
    },
    matchesTypes: [
      "Html",
      "text/html"
    ]
  },
  [URL]: {
    exposeProperties: {
      urls: (dataTransfer, matchesTypes) => getDataFromDataTransfer(dataTransfer, matchesTypes, "").split("\n"),
      dataTransfer: (dataTransfer) => dataTransfer
    },
    matchesTypes: [
      "Url",
      "text/uri-list"
    ]
  },
  [TEXT]: {
    exposeProperties: {
      text: (dataTransfer, matchesTypes) => getDataFromDataTransfer(dataTransfer, matchesTypes, ""),
      dataTransfer: (dataTransfer) => dataTransfer
    },
    matchesTypes: [
      "Text",
      "text/plain"
    ]
  }
};
function createNativeDragSource(type, dataTransfer) {
  const config = nativeTypesConfig[type];
  if (!config) {
    throw new Error(`native type ${type} has no configuration`);
  }
  const result = new NativeDragSource(config);
  result.loadDataTransfer(dataTransfer);
  return result;
}
function matchNativeItemType(dataTransfer) {
  if (!dataTransfer) {
    return null;
  }
  const dataTransferTypes = Array.prototype.slice.call(dataTransfer.types || []);
  return Object.keys(nativeTypesConfig).filter((nativeItemType) => {
    const typeConfig = nativeTypesConfig[nativeItemType];
    if (!(typeConfig === null || typeConfig === void 0 ? void 0 : typeConfig.matchesTypes)) {
      return false;
    }
    return typeConfig.matchesTypes.some(
      (t) => dataTransferTypes.indexOf(t) > -1
    );
  })[0] || null;
}
var isFirefox = memoize(
  () => /firefox/i.test(navigator.userAgent)
);
var isSafari = memoize(
  () => Boolean(window.safari)
);
var MonotonicInterpolant = class {
  interpolate(x) {
    const { xs, ys, c1s, c2s, c3s } = this;
    let i = xs.length - 1;
    if (x === xs[i]) {
      return ys[i];
    }
    let low = 0;
    let high = c3s.length - 1;
    let mid;
    while (low <= high) {
      mid = Math.floor(0.5 * (low + high));
      const xHere = xs[mid];
      if (xHere < x) {
        low = mid + 1;
      } else if (xHere > x) {
        high = mid - 1;
      } else {
        return ys[mid];
      }
    }
    i = Math.max(0, high);
    const diff = x - xs[i];
    const diffSq = diff * diff;
    return ys[i] + c1s[i] * diff + c2s[i] * diffSq + c3s[i] * diff * diffSq;
  }
  constructor(xs, ys) {
    const { length } = xs;
    const indexes = [];
    for (let i = 0; i < length; i++) {
      indexes.push(i);
    }
    indexes.sort(
      (a, b) => xs[a] < xs[b] ? -1 : 1
    );
    const dxs = [];
    const ms = [];
    let dx;
    let dy;
    for (let i1 = 0; i1 < length - 1; i1++) {
      dx = xs[i1 + 1] - xs[i1];
      dy = ys[i1 + 1] - ys[i1];
      dxs.push(dx);
      ms.push(dy / dx);
    }
    const c1s = [
      ms[0]
    ];
    for (let i2 = 0; i2 < dxs.length - 1; i2++) {
      const m2 = ms[i2];
      const mNext = ms[i2 + 1];
      if (m2 * mNext <= 0) {
        c1s.push(0);
      } else {
        dx = dxs[i2];
        const dxNext = dxs[i2 + 1];
        const common = dx + dxNext;
        c1s.push(3 * common / ((common + dxNext) / m2 + (common + dx) / mNext));
      }
    }
    c1s.push(ms[ms.length - 1]);
    const c2s = [];
    const c3s = [];
    let m;
    for (let i3 = 0; i3 < c1s.length - 1; i3++) {
      m = ms[i3];
      const c1 = c1s[i3];
      const invDx = 1 / dxs[i3];
      const common = c1 + c1s[i3 + 1] - m - m;
      c2s.push((m - c1 - common) * invDx);
      c3s.push(common * invDx * invDx);
    }
    this.xs = xs;
    this.ys = ys;
    this.c1s = c1s;
    this.c2s = c2s;
    this.c3s = c3s;
  }
};
var ELEMENT_NODE$1 = 1;
function getNodeClientOffset$1(node) {
  const el = node.nodeType === ELEMENT_NODE$1 ? node : node.parentElement;
  if (!el) {
    return null;
  }
  const { top, left } = el.getBoundingClientRect();
  return {
    x: left,
    y: top
  };
}
function getEventClientOffset$1(e) {
  return {
    x: e.clientX,
    y: e.clientY
  };
}
function isImageNode(node) {
  var ref;
  return node.nodeName === "IMG" && (isFirefox() || !((ref = document.documentElement) === null || ref === void 0 ? void 0 : ref.contains(node)));
}
function getDragPreviewSize(isImage, dragPreview, sourceWidth, sourceHeight) {
  let dragPreviewWidth = isImage ? dragPreview.width : sourceWidth;
  let dragPreviewHeight = isImage ? dragPreview.height : sourceHeight;
  if (isSafari() && isImage) {
    dragPreviewHeight /= window.devicePixelRatio;
    dragPreviewWidth /= window.devicePixelRatio;
  }
  return {
    dragPreviewWidth,
    dragPreviewHeight
  };
}
function getDragPreviewOffset(sourceNode, dragPreview, clientOffset, anchorPoint, offsetPoint) {
  const isImage = isImageNode(dragPreview);
  const dragPreviewNode = isImage ? sourceNode : dragPreview;
  const dragPreviewNodeOffsetFromClient = getNodeClientOffset$1(dragPreviewNode);
  const offsetFromDragPreview = {
    x: clientOffset.x - dragPreviewNodeOffsetFromClient.x,
    y: clientOffset.y - dragPreviewNodeOffsetFromClient.y
  };
  const { offsetWidth: sourceWidth, offsetHeight: sourceHeight } = sourceNode;
  const { anchorX, anchorY } = anchorPoint;
  const { dragPreviewWidth, dragPreviewHeight } = getDragPreviewSize(isImage, dragPreview, sourceWidth, sourceHeight);
  const calculateYOffset = () => {
    const interpolantY = new MonotonicInterpolant([
      0,
      0.5,
      1
    ], [
      // Dock to the top
      offsetFromDragPreview.y,
      // Align at the center
      offsetFromDragPreview.y / sourceHeight * dragPreviewHeight,
      // Dock to the bottom
      offsetFromDragPreview.y + dragPreviewHeight - sourceHeight
    ]);
    let y = interpolantY.interpolate(anchorY);
    if (isSafari() && isImage) {
      y += (window.devicePixelRatio - 1) * dragPreviewHeight;
    }
    return y;
  };
  const calculateXOffset = () => {
    const interpolantX = new MonotonicInterpolant([
      0,
      0.5,
      1
    ], [
      // Dock to the left
      offsetFromDragPreview.x,
      // Align at the center
      offsetFromDragPreview.x / sourceWidth * dragPreviewWidth,
      // Dock to the right
      offsetFromDragPreview.x + dragPreviewWidth - sourceWidth
    ]);
    return interpolantX.interpolate(anchorX);
  };
  const { offsetX, offsetY } = offsetPoint;
  const isManualOffsetX = offsetX === 0 || offsetX;
  const isManualOffsetY = offsetY === 0 || offsetY;
  return {
    x: isManualOffsetX ? offsetX : calculateXOffset(),
    y: isManualOffsetY ? offsetY : calculateYOffset()
  };
}
var OptionsReader$1 = class OptionsReader {
  get window() {
    if (this.globalContext) {
      return this.globalContext;
    } else if (typeof window !== "undefined") {
      return window;
    }
    return void 0;
  }
  get document() {
    var ref;
    if ((ref = this.globalContext) === null || ref === void 0 ? void 0 : ref.document) {
      return this.globalContext.document;
    } else if (this.window) {
      return this.window.document;
    } else {
      return void 0;
    }
  }
  get rootElement() {
    var ref;
    return ((ref = this.optionsArgs) === null || ref === void 0 ? void 0 : ref.rootElement) || this.window;
  }
  constructor(globalContext, options) {
    this.ownerDocument = null;
    this.globalContext = globalContext;
    this.optionsArgs = options;
  }
};
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}
var HTML5BackendImpl = class {
  /**
  * Generate profiling statistics for the HTML5Backend.
  */
  profile() {
    var ref, ref1;
    return {
      sourcePreviewNodes: this.sourcePreviewNodes.size,
      sourcePreviewNodeOptions: this.sourcePreviewNodeOptions.size,
      sourceNodeOptions: this.sourceNodeOptions.size,
      sourceNodes: this.sourceNodes.size,
      dragStartSourceIds: ((ref = this.dragStartSourceIds) === null || ref === void 0 ? void 0 : ref.length) || 0,
      dropTargetIds: this.dropTargetIds.length,
      dragEnterTargetIds: this.dragEnterTargetIds.length,
      dragOverTargetIds: ((ref1 = this.dragOverTargetIds) === null || ref1 === void 0 ? void 0 : ref1.length) || 0
    };
  }
  // public for test
  get window() {
    return this.options.window;
  }
  get document() {
    return this.options.document;
  }
  /**
  * Get the root element to use for event subscriptions
  */
  get rootElement() {
    return this.options.rootElement;
  }
  setup() {
    const root = this.rootElement;
    if (root === void 0) {
      return;
    }
    if (root.__isReactDndBackendSetUp) {
      throw new Error("Cannot have two HTML5 backends at the same time.");
    }
    root.__isReactDndBackendSetUp = true;
    this.addEventListeners(root);
  }
  teardown() {
    const root = this.rootElement;
    if (root === void 0) {
      return;
    }
    root.__isReactDndBackendSetUp = false;
    this.removeEventListeners(this.rootElement);
    this.clearCurrentDragSourceNode();
    if (this.asyncEndDragFrameId) {
      var ref;
      (ref = this.window) === null || ref === void 0 ? void 0 : ref.cancelAnimationFrame(this.asyncEndDragFrameId);
    }
  }
  connectDragPreview(sourceId, node, options) {
    this.sourcePreviewNodeOptions.set(sourceId, options);
    this.sourcePreviewNodes.set(sourceId, node);
    return () => {
      this.sourcePreviewNodes.delete(sourceId);
      this.sourcePreviewNodeOptions.delete(sourceId);
    };
  }
  connectDragSource(sourceId, node, options) {
    this.sourceNodes.set(sourceId, node);
    this.sourceNodeOptions.set(sourceId, options);
    const handleDragStart = (e) => this.handleDragStart(e, sourceId);
    const handleSelectStart = (e) => this.handleSelectStart(e);
    node.setAttribute("draggable", "true");
    node.addEventListener("dragstart", handleDragStart);
    node.addEventListener("selectstart", handleSelectStart);
    return () => {
      this.sourceNodes.delete(sourceId);
      this.sourceNodeOptions.delete(sourceId);
      node.removeEventListener("dragstart", handleDragStart);
      node.removeEventListener("selectstart", handleSelectStart);
      node.setAttribute("draggable", "false");
    };
  }
  connectDropTarget(targetId, node) {
    const handleDragEnter = (e) => this.handleDragEnter(e, targetId);
    const handleDragOver = (e) => this.handleDragOver(e, targetId);
    const handleDrop = (e) => this.handleDrop(e, targetId);
    node.addEventListener("dragenter", handleDragEnter);
    node.addEventListener("dragover", handleDragOver);
    node.addEventListener("drop", handleDrop);
    return () => {
      node.removeEventListener("dragenter", handleDragEnter);
      node.removeEventListener("dragover", handleDragOver);
      node.removeEventListener("drop", handleDrop);
    };
  }
  addEventListeners(target) {
    if (!target.addEventListener) {
      return;
    }
    target.addEventListener("dragstart", this.handleTopDragStart);
    target.addEventListener("dragstart", this.handleTopDragStartCapture, true);
    target.addEventListener("dragend", this.handleTopDragEndCapture, true);
    target.addEventListener("dragenter", this.handleTopDragEnter);
    target.addEventListener("dragenter", this.handleTopDragEnterCapture, true);
    target.addEventListener("dragleave", this.handleTopDragLeaveCapture, true);
    target.addEventListener("dragover", this.handleTopDragOver);
    target.addEventListener("dragover", this.handleTopDragOverCapture, true);
    target.addEventListener("drop", this.handleTopDrop);
    target.addEventListener("drop", this.handleTopDropCapture, true);
  }
  removeEventListeners(target) {
    if (!target.removeEventListener) {
      return;
    }
    target.removeEventListener("dragstart", this.handleTopDragStart);
    target.removeEventListener("dragstart", this.handleTopDragStartCapture, true);
    target.removeEventListener("dragend", this.handleTopDragEndCapture, true);
    target.removeEventListener("dragenter", this.handleTopDragEnter);
    target.removeEventListener("dragenter", this.handleTopDragEnterCapture, true);
    target.removeEventListener("dragleave", this.handleTopDragLeaveCapture, true);
    target.removeEventListener("dragover", this.handleTopDragOver);
    target.removeEventListener("dragover", this.handleTopDragOverCapture, true);
    target.removeEventListener("drop", this.handleTopDrop);
    target.removeEventListener("drop", this.handleTopDropCapture, true);
  }
  getCurrentSourceNodeOptions() {
    const sourceId = this.monitor.getSourceId();
    const sourceNodeOptions = this.sourceNodeOptions.get(sourceId);
    return _objectSpread({
      dropEffect: this.altKeyPressed ? "copy" : "move"
    }, sourceNodeOptions || {});
  }
  getCurrentDropEffect() {
    if (this.isDraggingNativeItem()) {
      return "copy";
    }
    return this.getCurrentSourceNodeOptions().dropEffect;
  }
  getCurrentSourcePreviewNodeOptions() {
    const sourceId = this.monitor.getSourceId();
    const sourcePreviewNodeOptions = this.sourcePreviewNodeOptions.get(sourceId);
    return _objectSpread({
      anchorX: 0.5,
      anchorY: 0.5,
      captureDraggingState: false
    }, sourcePreviewNodeOptions || {});
  }
  isDraggingNativeItem() {
    const itemType = this.monitor.getItemType();
    return Object.keys(NativeTypes).some(
      (key) => NativeTypes[key] === itemType
    );
  }
  beginDragNativeItem(type, dataTransfer) {
    this.clearCurrentDragSourceNode();
    this.currentNativeSource = createNativeDragSource(type, dataTransfer);
    this.currentNativeHandle = this.registry.addSource(type, this.currentNativeSource);
    this.actions.beginDrag([
      this.currentNativeHandle
    ]);
  }
  setCurrentDragSourceNode(node) {
    this.clearCurrentDragSourceNode();
    this.currentDragSourceNode = node;
    const MOUSE_MOVE_TIMEOUT = 1e3;
    this.mouseMoveTimeoutTimer = setTimeout(() => {
      var ref;
      return (ref = this.rootElement) === null || ref === void 0 ? void 0 : ref.addEventListener("mousemove", this.endDragIfSourceWasRemovedFromDOM, true);
    }, MOUSE_MOVE_TIMEOUT);
  }
  clearCurrentDragSourceNode() {
    if (this.currentDragSourceNode) {
      this.currentDragSourceNode = null;
      if (this.rootElement) {
        var ref;
        (ref = this.window) === null || ref === void 0 ? void 0 : ref.clearTimeout(this.mouseMoveTimeoutTimer || void 0);
        this.rootElement.removeEventListener("mousemove", this.endDragIfSourceWasRemovedFromDOM, true);
      }
      this.mouseMoveTimeoutTimer = null;
      return true;
    }
    return false;
  }
  handleDragStart(e, sourceId) {
    if (e.defaultPrevented) {
      return;
    }
    if (!this.dragStartSourceIds) {
      this.dragStartSourceIds = [];
    }
    this.dragStartSourceIds.unshift(sourceId);
  }
  handleDragEnter(_e, targetId) {
    this.dragEnterTargetIds.unshift(targetId);
  }
  handleDragOver(_e, targetId) {
    if (this.dragOverTargetIds === null) {
      this.dragOverTargetIds = [];
    }
    this.dragOverTargetIds.unshift(targetId);
  }
  handleDrop(_e, targetId) {
    this.dropTargetIds.unshift(targetId);
  }
  constructor(manager, globalContext, options) {
    this.sourcePreviewNodes = /* @__PURE__ */ new Map();
    this.sourcePreviewNodeOptions = /* @__PURE__ */ new Map();
    this.sourceNodes = /* @__PURE__ */ new Map();
    this.sourceNodeOptions = /* @__PURE__ */ new Map();
    this.dragStartSourceIds = null;
    this.dropTargetIds = [];
    this.dragEnterTargetIds = [];
    this.currentNativeSource = null;
    this.currentNativeHandle = null;
    this.currentDragSourceNode = null;
    this.altKeyPressed = false;
    this.mouseMoveTimeoutTimer = null;
    this.asyncEndDragFrameId = null;
    this.dragOverTargetIds = null;
    this.lastClientOffset = null;
    this.hoverRafId = null;
    this.getSourceClientOffset = (sourceId) => {
      const source = this.sourceNodes.get(sourceId);
      return source && getNodeClientOffset$1(source) || null;
    };
    this.endDragNativeItem = () => {
      if (!this.isDraggingNativeItem()) {
        return;
      }
      this.actions.endDrag();
      if (this.currentNativeHandle) {
        this.registry.removeSource(this.currentNativeHandle);
      }
      this.currentNativeHandle = null;
      this.currentNativeSource = null;
    };
    this.isNodeInDocument = (node) => {
      return Boolean(node && this.document && this.document.body && this.document.body.contains(node));
    };
    this.endDragIfSourceWasRemovedFromDOM = () => {
      const node = this.currentDragSourceNode;
      if (node == null || this.isNodeInDocument(node)) {
        return;
      }
      if (this.clearCurrentDragSourceNode() && this.monitor.isDragging()) {
        this.actions.endDrag();
      }
      this.cancelHover();
    };
    this.scheduleHover = (dragOverTargetIds) => {
      if (this.hoverRafId === null && typeof requestAnimationFrame !== "undefined") {
        this.hoverRafId = requestAnimationFrame(() => {
          if (this.monitor.isDragging()) {
            this.actions.hover(dragOverTargetIds || [], {
              clientOffset: this.lastClientOffset
            });
          }
          this.hoverRafId = null;
        });
      }
    };
    this.cancelHover = () => {
      if (this.hoverRafId !== null && typeof cancelAnimationFrame !== "undefined") {
        cancelAnimationFrame(this.hoverRafId);
        this.hoverRafId = null;
      }
    };
    this.handleTopDragStartCapture = () => {
      this.clearCurrentDragSourceNode();
      this.dragStartSourceIds = [];
    };
    this.handleTopDragStart = (e) => {
      if (e.defaultPrevented) {
        return;
      }
      const { dragStartSourceIds } = this;
      this.dragStartSourceIds = null;
      const clientOffset = getEventClientOffset$1(e);
      if (this.monitor.isDragging()) {
        this.actions.endDrag();
        this.cancelHover();
      }
      this.actions.beginDrag(dragStartSourceIds || [], {
        publishSource: false,
        getSourceClientOffset: this.getSourceClientOffset,
        clientOffset
      });
      const { dataTransfer } = e;
      const nativeType = matchNativeItemType(dataTransfer);
      if (this.monitor.isDragging()) {
        if (dataTransfer && typeof dataTransfer.setDragImage === "function") {
          const sourceId = this.monitor.getSourceId();
          const sourceNode = this.sourceNodes.get(sourceId);
          const dragPreview = this.sourcePreviewNodes.get(sourceId) || sourceNode;
          if (dragPreview) {
            const { anchorX, anchorY, offsetX, offsetY } = this.getCurrentSourcePreviewNodeOptions();
            const anchorPoint = {
              anchorX,
              anchorY
            };
            const offsetPoint = {
              offsetX,
              offsetY
            };
            const dragPreviewOffset = getDragPreviewOffset(sourceNode, dragPreview, clientOffset, anchorPoint, offsetPoint);
            dataTransfer.setDragImage(dragPreview, dragPreviewOffset.x, dragPreviewOffset.y);
          }
        }
        try {
          dataTransfer === null || dataTransfer === void 0 ? void 0 : dataTransfer.setData("application/json", {});
        } catch (err) {
        }
        this.setCurrentDragSourceNode(e.target);
        const { captureDraggingState } = this.getCurrentSourcePreviewNodeOptions();
        if (!captureDraggingState) {
          setTimeout(
            () => this.actions.publishDragSource(),
            0
          );
        } else {
          this.actions.publishDragSource();
        }
      } else if (nativeType) {
        this.beginDragNativeItem(nativeType);
      } else if (dataTransfer && !dataTransfer.types && (e.target && !e.target.hasAttribute || !e.target.hasAttribute("draggable"))) {
        return;
      } else {
        e.preventDefault();
      }
    };
    this.handleTopDragEndCapture = () => {
      if (this.clearCurrentDragSourceNode() && this.monitor.isDragging()) {
        this.actions.endDrag();
      }
      this.cancelHover();
    };
    this.handleTopDragEnterCapture = (e) => {
      this.dragEnterTargetIds = [];
      if (this.isDraggingNativeItem()) {
        var ref;
        (ref = this.currentNativeSource) === null || ref === void 0 ? void 0 : ref.loadDataTransfer(e.dataTransfer);
      }
      const isFirstEnter = this.enterLeaveCounter.enter(e.target);
      if (!isFirstEnter || this.monitor.isDragging()) {
        return;
      }
      const { dataTransfer } = e;
      const nativeType = matchNativeItemType(dataTransfer);
      if (nativeType) {
        this.beginDragNativeItem(nativeType, dataTransfer);
      }
    };
    this.handleTopDragEnter = (e) => {
      const { dragEnterTargetIds } = this;
      this.dragEnterTargetIds = [];
      if (!this.monitor.isDragging()) {
        return;
      }
      this.altKeyPressed = e.altKey;
      if (dragEnterTargetIds.length > 0) {
        this.actions.hover(dragEnterTargetIds, {
          clientOffset: getEventClientOffset$1(e)
        });
      }
      const canDrop = dragEnterTargetIds.some(
        (targetId) => this.monitor.canDropOnTarget(targetId)
      );
      if (canDrop) {
        e.preventDefault();
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = this.getCurrentDropEffect();
        }
      }
    };
    this.handleTopDragOverCapture = (e) => {
      this.dragOverTargetIds = [];
      if (this.isDraggingNativeItem()) {
        var ref;
        (ref = this.currentNativeSource) === null || ref === void 0 ? void 0 : ref.loadDataTransfer(e.dataTransfer);
      }
    };
    this.handleTopDragOver = (e) => {
      const { dragOverTargetIds } = this;
      this.dragOverTargetIds = [];
      if (!this.monitor.isDragging()) {
        e.preventDefault();
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = "none";
        }
        return;
      }
      this.altKeyPressed = e.altKey;
      this.lastClientOffset = getEventClientOffset$1(e);
      this.scheduleHover(dragOverTargetIds);
      const canDrop = (dragOverTargetIds || []).some(
        (targetId) => this.monitor.canDropOnTarget(targetId)
      );
      if (canDrop) {
        e.preventDefault();
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = this.getCurrentDropEffect();
        }
      } else if (this.isDraggingNativeItem()) {
        e.preventDefault();
      } else {
        e.preventDefault();
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = "none";
        }
      }
    };
    this.handleTopDragLeaveCapture = (e) => {
      if (this.isDraggingNativeItem()) {
        e.preventDefault();
      }
      const isLastLeave = this.enterLeaveCounter.leave(e.target);
      if (!isLastLeave) {
        return;
      }
      if (this.isDraggingNativeItem()) {
        setTimeout(
          () => this.endDragNativeItem(),
          0
        );
      }
      this.cancelHover();
    };
    this.handleTopDropCapture = (e) => {
      this.dropTargetIds = [];
      if (this.isDraggingNativeItem()) {
        var ref;
        e.preventDefault();
        (ref = this.currentNativeSource) === null || ref === void 0 ? void 0 : ref.loadDataTransfer(e.dataTransfer);
      } else if (matchNativeItemType(e.dataTransfer)) {
        e.preventDefault();
      }
      this.enterLeaveCounter.reset();
    };
    this.handleTopDrop = (e) => {
      const { dropTargetIds } = this;
      this.dropTargetIds = [];
      this.actions.hover(dropTargetIds, {
        clientOffset: getEventClientOffset$1(e)
      });
      this.actions.drop({
        dropEffect: this.getCurrentDropEffect()
      });
      if (this.isDraggingNativeItem()) {
        this.endDragNativeItem();
      } else if (this.monitor.isDragging()) {
        this.actions.endDrag();
      }
      this.cancelHover();
    };
    this.handleSelectStart = (e) => {
      const target = e.target;
      if (typeof target.dragDrop !== "function") {
        return;
      }
      if (target.tagName === "INPUT" || target.tagName === "SELECT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }
      e.preventDefault();
      target.dragDrop();
    };
    this.options = new OptionsReader$1(globalContext, options);
    this.actions = manager.getActions();
    this.monitor = manager.getMonitor();
    this.registry = manager.getRegistry();
    this.enterLeaveCounter = new EnterLeaveCounter(this.isNodeInDocument);
  }
};
var emptyImage;
function getEmptyImage() {
  if (!emptyImage) {
    emptyImage = new Image();
    emptyImage.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  }
  return emptyImage;
}
var HTML5Backend = function createBackend(manager, context, options) {
  return new HTML5BackendImpl(manager, context, options);
};
function Piece({ isPremovedPiece = false, piece, square, squares }) {
  const { animationDuration, arePiecesDraggable, boardWidth, boardOrientation, chessPieces, currentPosition, deletePieceFromSquare, dropOffBoardAction, id, isDraggablePiece, isWaitingForAnimation, onPieceClick, onPieceDragBegin, onPieceDragEnd, onPieceDropOffBoard, onPromotionCheck, positionDifferences } = useChessboard();
  const [pieceStyle, setPieceStyle] = (0, import_react.useState)({
    opacity: 1,
    zIndex: 5,
    touchAction: "none",
    cursor: arePiecesDraggable && isDraggablePiece({ piece, sourceSquare: square }) ? "-webkit-grab" : "default"
  });
  const [{ canDrag, isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "piece",
    item: () => {
      onPieceDragBegin(piece, square);
      return { piece, square, id };
    },
    end: (item, monitor) => {
      onPieceDragEnd(piece, square);
      const wasDropOutsideTheBoard = !monitor.didDrop();
      if (wasDropOutsideTheBoard) {
        if (dropOffBoardAction === "trash") {
          deletePieceFromSquare(square);
        }
        onPieceDropOffBoard === null || onPieceDropOffBoard === void 0 ? void 0 : onPieceDropOffBoard(square, piece);
      }
    },
    collect: (monitor) => ({
      canDrag: isDraggablePiece({ piece, sourceSquare: square }),
      isDragging: !!monitor.isDragging()
    })
  }), [piece, square, currentPosition, id]);
  dragPreview(getEmptyImage(), { captureDraggingState: true });
  (0, import_react.useEffect)(() => {
    setPieceStyle((oldPieceStyle) => Object.assign(Object.assign({}, oldPieceStyle), { opacity: isDragging ? 0 : 1 }));
  }, [isDragging]);
  (0, import_react.useEffect)(() => {
    var _a;
    const removedPiece = (_a = positionDifferences.removed) === null || _a === void 0 ? void 0 : _a[square];
    if (!positionDifferences.added || !removedPiece)
      return;
    const newSquare = Object.entries(positionDifferences.added).find(([s, p]) => p === removedPiece || onPromotionCheck(square, s, removedPiece));
    if (isWaitingForAnimation && removedPiece && newSquare && !isPremovedPiece) {
      const sourceSq = square;
      const targetSq = newSquare[0];
      if (sourceSq && targetSq) {
        const squareWidth = boardWidth / 8;
        setPieceStyle((oldPieceStyle) => Object.assign(Object.assign({}, oldPieceStyle), { transform: `translate(${(boardOrientation === "black" ? -1 : 1) * (targetSq.charCodeAt(0) - sourceSq.charCodeAt(0)) * squareWidth}px, ${(boardOrientation === "black" ? -1 : 1) * (Number(sourceSq[1]) - Number(targetSq[1])) * squareWidth}px)`, transition: `transform ${animationDuration}ms`, zIndex: 6 }));
      }
    }
  }, [positionDifferences]);
  (0, import_react.useEffect)(() => {
    const { sourceSq } = getSingleSquareCoordinates();
    if (sourceSq) {
      setPieceStyle((oldPieceStyle) => Object.assign(Object.assign({}, oldPieceStyle), { transform: `translate(${0}px, ${0}px)`, transition: `transform ${0}ms` }));
    }
  }, [currentPosition]);
  (0, import_react.useEffect)(() => {
    setPieceStyle((oldPieceStyle) => Object.assign(Object.assign({}, oldPieceStyle), { cursor: arePiecesDraggable && isDraggablePiece({ piece, sourceSquare: square }) ? "-webkit-grab" : "default" }));
  }, [square, currentPosition, arePiecesDraggable]);
  function getSingleSquareCoordinates() {
    return { sourceSq: squares[square] };
  }
  return (0, import_jsx_runtime.jsx)("div", Object.assign({ ref: arePiecesDraggable && canDrag ? drag : null, onClick: () => onPieceClick(piece, square), "data-piece": piece, style: pieceStyle }, { children: typeof chessPieces[piece] === "function" ? chessPieces[piece]({
    squareWidth: boardWidth / 8,
    isDragging,
    square
  }) : (0, import_jsx_runtime.jsx)("svg", Object.assign({ viewBox: "1 1 43 43", width: boardWidth / 8, height: boardWidth / 8, style: { display: "block" } }, { children: (0, import_jsx_runtime.jsx)("g", { children: chessPieces[piece] }) })) }));
}
function Square({ square, squareColor, setSquares, squareHasPremove, children }) {
  const squareRef = (0, import_react.useRef)(null);
  const { autoPromoteToQueen, boardWidth, boardOrientation, clearArrows, currentPosition, currentRightClickDown, customBoardStyle, customDarkSquareStyle, customDropSquareStyle, customLightSquareStyle, customPremoveDarkSquareStyle, customPremoveLightSquareStyle, customSquare: CustomSquare, customSquareStyles, drawNewArrow, handleSetPosition, handleSparePieceDrop, isWaitingForAnimation, lastPieceColour, lastSquareDraggedOver, onArrowDrawEnd, onDragOverSquare, onMouseOutSquare, onMouseOverSquare, onPieceDrop, onPromotionCheck, onRightClickDown, onRightClickUp, onSquareClick, setLastSquareDraggedOver, setPromoteFromSquare, setPromoteToSquare, setShowPromoteDialog } = useChessboard();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "piece",
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }), [
    square,
    currentPosition,
    onPieceDrop,
    isWaitingForAnimation,
    lastPieceColour
  ]);
  function handleDrop(item) {
    if (item.isSpare) {
      handleSparePieceDrop(item.piece, square);
      return;
    }
    if (onPromotionCheck(item.square, square, item.piece)) {
      if (autoPromoteToQueen) {
        handleSetPosition(item.square, square, item.piece[0] === "w" ? "wQ" : "bQ");
      } else {
        setPromoteFromSquare(item.square);
        setPromoteToSquare(square);
        setShowPromoteDialog(true);
      }
    } else {
      handleSetPosition(item.square, square, item.piece, true);
    }
  }
  (0, import_react.useEffect)(() => {
    if (squareRef.current) {
      const { x, y } = squareRef.current.getBoundingClientRect();
      setSquares((oldSquares) => Object.assign(Object.assign({}, oldSquares), { [square]: { x, y } }));
    }
  }, [boardWidth, boardOrientation]);
  const defaultSquareStyle = Object.assign(Object.assign(Object.assign(Object.assign({}, borderRadius(square, boardOrientation, customBoardStyle)), squareColor === "black" ? customDarkSquareStyle : customLightSquareStyle), squareHasPremove && (squareColor === "black" ? customPremoveDarkSquareStyle : customPremoveLightSquareStyle)), isOver && customDropSquareStyle);
  return (0, import_jsx_runtime.jsx)("div", Object.assign({ ref: drop, style: defaultSquareStyle, "data-square-color": squareColor, "data-square": square, onTouchMove: (e) => {
    var _a;
    const touchLocation = e.touches[0];
    const touchElement = document.elementsFromPoint(touchLocation.clientX, touchLocation.clientY);
    const draggedOverSquare = (_a = touchElement === null || touchElement === void 0 ? void 0 : touchElement.find((el) => el.getAttribute("data-square"))) === null || _a === void 0 ? void 0 : _a.getAttribute("data-square");
    if (draggedOverSquare && draggedOverSquare !== lastSquareDraggedOver) {
      setLastSquareDraggedOver(draggedOverSquare);
      onDragOverSquare(draggedOverSquare);
    }
  }, onMouseOver: (e) => {
    if (e.buttons === 2 && currentRightClickDown) {
      drawNewArrow(currentRightClickDown, square);
    }
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) {
      return;
    }
    onMouseOverSquare(square);
  }, onMouseOut: (e) => {
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget))
      return;
    onMouseOutSquare(square);
  }, onMouseDown: (e) => {
    if (e.button === 2)
      onRightClickDown(square);
  }, onMouseUp: (e) => {
    if (e.button === 2) {
      if (currentRightClickDown)
        onArrowDrawEnd(currentRightClickDown, square);
      onRightClickUp(square);
    }
  }, onDragEnter: () => onDragOverSquare(square), onClick: () => {
    const piece = currentPosition[square];
    onSquareClick(square, piece);
    clearArrows();
  }, onContextMenu: (e) => {
    e.preventDefault();
  } }, { children: typeof CustomSquare === "string" ? (0, import_jsx_runtime.jsx)(
    CustomSquare,
    Object.assign({
      // Type is too complex to properly evaluate, so ignore this line.
      // @ts-ignore
      ref: squareRef,
      style: Object.assign(Object.assign(Object.assign({}, size(boardWidth)), center), !squareHasPremove && (customSquareStyles === null || customSquareStyles === void 0 ? void 0 : customSquareStyles[square]))
    }, { children })
  ) : (0, import_jsx_runtime.jsx)(CustomSquare, Object.assign({ ref: squareRef, square, squareColor, style: Object.assign(Object.assign(Object.assign({}, size(boardWidth)), center), !squareHasPremove && (customSquareStyles === null || customSquareStyles === void 0 ? void 0 : customSquareStyles[square])) }, { children })) }));
}
var center = {
  display: "flex",
  justifyContent: "center"
};
var size = (width) => ({
  width: width / 8,
  height: width / 8
});
var borderRadius = (square, boardOrientation, customBoardStyle) => {
  if (!(customBoardStyle === null || customBoardStyle === void 0 ? void 0 : customBoardStyle.borderRadius))
    return {};
  if (square === "a1") {
    return boardOrientation === "white" ? { borderBottomLeftRadius: customBoardStyle.borderRadius } : { borderTopRightRadius: customBoardStyle.borderRadius };
  }
  if (square === "a8") {
    return boardOrientation === "white" ? { borderTopLeftRadius: customBoardStyle.borderRadius } : { borderBottomRightRadius: customBoardStyle.borderRadius };
  }
  if (square === "h1") {
    return boardOrientation === "white" ? { borderBottomRightRadius: customBoardStyle.borderRadius } : { borderTopLeftRadius: customBoardStyle.borderRadius };
  }
  if (square === "h8") {
    return boardOrientation === "white" ? { borderTopRightRadius: customBoardStyle.borderRadius } : { borderBottomLeftRadius: customBoardStyle.borderRadius };
  }
  return {};
};
function Squares() {
  const [squares, setSquares] = (0, import_react.useState)({});
  const { arePremovesAllowed, boardOrientation, boardWidth, currentPosition, id, premoves, showBoardNotation } = useChessboard();
  const premovesHistory = (0, import_react.useMemo)(() => {
    const result = [];
    if (!arePremovesAllowed)
      return [];
    premoves.forEach((premove, index) => {
      const { sourceSq, targetSq, piece } = premove;
      const relatedPremovedPiece = result.find((p) => {
        var _a;
        return p.piece === piece && ((_a = p.premovesRoute.at(-1)) === null || _a === void 0 ? void 0 : _a.targetSq) === sourceSq;
      });
      if (relatedPremovedPiece) {
        relatedPremovedPiece.premovesRoute.push({ sourceSq, targetSq, index });
      } else {
        result.push({
          piece,
          // index is useful for scenarios where two or more pieces are targeting the same square
          premovesRoute: [{ sourceSq, targetSq, index }]
        });
      }
    });
    return result;
  }, [premoves]);
  return (0, import_jsx_runtime.jsx)("div", Object.assign({ "data-boardid": id }, { children: [...Array(8)].map((_, r) => {
    return (0, import_jsx_runtime.jsx)("div", Object.assign({ style: {
      display: "flex",
      flexWrap: "nowrap",
      width: boardWidth
    } }, { children: [...Array(8)].map((_2, c) => {
      const square = boardOrientation === "black" ? COLUMNS[7 - c] + (r + 1) : COLUMNS[c] + (8 - r);
      const squareColor = c % 2 === r % 2 ? "white" : "black";
      const squareHasPremove = premoves.find((p) => p.sourceSq === square || p.targetSq === square);
      const squareHasPremoveTarget = premovesHistory.filter(({ premovesRoute }) => {
        var _a;
        return ((_a = premovesRoute.at(-1)) === null || _a === void 0 ? void 0 : _a.targetSq) === square;
      }).sort((a, b) => {
        var _a, _b;
        return ((_a = b.premovesRoute.at(-1)) === null || _a === void 0 ? void 0 : _a.index) - ((_b = a.premovesRoute.at(-1)) === null || _b === void 0 ? void 0 : _b.index);
      }).at(0);
      return (0, import_jsx_runtime.jsxs)(Square, Object.assign({ square, squareColor, setSquares, squareHasPremove: !!squareHasPremove }, { children: [!squareHasPremove && currentPosition[square] && (0, import_jsx_runtime.jsx)(Piece, { piece: currentPosition[square], square, squares }), squareHasPremoveTarget && (0, import_jsx_runtime.jsx)(Piece, { isPremovedPiece: true, piece: squareHasPremoveTarget.piece, square, squares }), showBoardNotation && (0, import_jsx_runtime.jsx)(Notation, { row: r, col: c })] }), `${c}${r}`);
    }) }), r.toString());
  }) }));
}
var Arrows = () => {
  const { arrows, newArrow, boardOrientation, boardWidth, customArrowColor: primaryArrowCollor } = useChessboard();
  const arrowsList = [...arrows, newArrow].filter(Boolean);
  return (0, import_jsx_runtime.jsx)("svg", Object.assign({ width: boardWidth, height: boardWidth, style: {
    position: "absolute",
    top: "0",
    left: "0",
    pointerEvents: "none",
    zIndex: "10"
  } }, { children: arrowsList.map((arrow, i) => {
    const [arrowStartField, arrowEndField, arrowColor] = arrow;
    if (arrowStartField === arrowEndField)
      return null;
    const from = getRelativeCoords(boardOrientation, boardWidth, arrowStartField);
    const to = getRelativeCoords(boardOrientation, boardWidth, arrowEndField);
    let ARROW_LENGTH_REDUCER = boardWidth / 32;
    const isArrowActive = i === arrows.length;
    if (arrows.some((restArrow) => restArrow[0] !== arrowStartField && restArrow[1] === arrowEndField) && !isArrowActive) {
      ARROW_LENGTH_REDUCER = boardWidth / 16;
    }
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const r = Math.hypot(dy, dx);
    const end = {
      x: from.x + dx * (r - ARROW_LENGTH_REDUCER) / r,
      y: from.y + dy * (r - ARROW_LENGTH_REDUCER) / r
    };
    return (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [(0, import_jsx_runtime.jsx)("marker", Object.assign({ id: `arrowhead-${i}`, markerWidth: "2", markerHeight: "2.5", refX: "1.25", refY: "1.25", orient: "auto" }, { children: (0, import_jsx_runtime.jsx)("polygon", { points: "0.3 0, 2 1.25, 0.3 2.5", fill: arrowColor !== null && arrowColor !== void 0 ? arrowColor : primaryArrowCollor }) })), (0, import_jsx_runtime.jsx)("line", { x1: from.x, y1: from.y, x2: end.x, y2: end.y, opacity: isArrowActive ? "0.5" : "0.65", stroke: arrowColor !== null && arrowColor !== void 0 ? arrowColor : primaryArrowCollor, strokeWidth: isArrowActive ? 0.9 * boardWidth / 40 : boardWidth / 40, markerEnd: `url(#arrowhead-${i})` })] }, `${arrowStartField}-${arrowEndField}${isArrowActive ? "-active" : ""}`);
  }) }));
};
function PromotionOption({ option }) {
  const [isHover, setIsHover] = (0, import_react.useState)(false);
  const { boardWidth, chessPieces, customDarkSquareStyle, customLightSquareStyle, handleSetPosition, onPromotionPieceSelect, promoteFromSquare, promoteToSquare, promotionDialogVariant } = useChessboard();
  const backgroundColor = () => {
    switch (option[1]) {
      case "Q":
        return customDarkSquareStyle.backgroundColor;
      case "R":
        return customLightSquareStyle.backgroundColor;
      case "N":
        return promotionDialogVariant === "default" ? customLightSquareStyle.backgroundColor : customDarkSquareStyle.backgroundColor;
      case "B":
        return promotionDialogVariant === "default" ? customDarkSquareStyle.backgroundColor : customLightSquareStyle.backgroundColor;
    }
  };
  return (0, import_jsx_runtime.jsx)("div", Object.assign({ onClick: () => {
    if (onPromotionPieceSelect(option, promoteFromSquare !== null && promoteFromSquare !== void 0 ? promoteFromSquare : void 0, promoteToSquare !== null && promoteToSquare !== void 0 ? promoteToSquare : void 0))
      handleSetPosition(promoteFromSquare, promoteToSquare, option, true);
  }, onMouseOver: () => setIsHover(true), onMouseOut: () => setIsHover(false), "data-piece": option, style: {
    cursor: "pointer",
    backgroundColor: isHover ? backgroundColor() : `${backgroundColor()}aa`,
    borderRadius: "4px",
    transition: "all 0.1s ease-out"
  } }, { children: typeof chessPieces[option] === "function" ? (0, import_jsx_runtime.jsx)("div", Object.assign({ style: {
    transition: "all 0.1s ease-out",
    transform: isHover ? "scale(1)" : "scale(0.85)"
  } }, { children: chessPieces[option]({
    squareWidth: boardWidth / 8,
    isDragging: false
  }) })) : (0, import_jsx_runtime.jsx)("svg", Object.assign({ viewBox: "1 1 43 43", width: boardWidth / 8, height: boardWidth / 8, style: {
    transition: "all 0.1s ease-out",
    transform: isHover ? "scale(1)" : "scale(0.85)"
  } }, { children: (0, import_jsx_runtime.jsx)("g", { children: chessPieces[option] }) })) }));
}
function PromotionDialog() {
  const { boardOrientation, boardWidth, promotionDialogVariant, promoteToSquare } = useChessboard();
  const promotePieceColor = (promoteToSquare === null || promoteToSquare === void 0 ? void 0 : promoteToSquare[1]) === "1" ? "b" : "w";
  const promotionOptions = [
    `${promotePieceColor !== null && promotePieceColor !== void 0 ? promotePieceColor : "w"}Q`,
    `${promotePieceColor !== null && promotePieceColor !== void 0 ? promotePieceColor : "w"}R`,
    `${promotePieceColor !== null && promotePieceColor !== void 0 ? promotePieceColor : "w"}N`,
    `${promotePieceColor !== null && promotePieceColor !== void 0 ? promotePieceColor : "w"}B`
  ];
  const dialogStyles = {
    default: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      transform: `translate(${-boardWidth / 8}px, ${-boardWidth / 8}px)`
    },
    vertical: {
      transform: `translate(${-boardWidth / 16}px, ${-boardWidth / 16}px)`
    },
    modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transform: `translate(0px, ${3 * boardWidth / 8}px)`,
      width: "100%",
      height: `${boardWidth / 4}px`,
      top: 0,
      backgroundColor: "white",
      left: 0
    }
  };
  const dialogCoords = getRelativeCoords(boardOrientation, boardWidth, promoteToSquare || "a8");
  return (0, import_jsx_runtime.jsx)("div", Object.assign({ style: Object.assign({ position: "absolute", top: `${dialogCoords === null || dialogCoords === void 0 ? void 0 : dialogCoords.y}px`, left: `${dialogCoords === null || dialogCoords === void 0 ? void 0 : dialogCoords.x}px`, zIndex: 1e3 }, dialogStyles[promotionDialogVariant]), title: "Choose promotion piece" }, { children: promotionOptions.map((option) => (0, import_jsx_runtime.jsx)(PromotionOption, { option }, option)) }));
}
var errorImage = {
  whiteKing: (0, import_jsx_runtime.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", style: {
    shapeRendering: "geometricPrecision",
    textRendering: "geometricPrecision",
    imageRendering: "crisp-edges"
  }, viewBox: "0 0 4210 12970", x: "0px", y: "0px", fillRule: "evenodd", clipRule: "evenodd", width: "250", height: "250" }, { children: (0, import_jsx_runtime.jsx)("g", { children: (0, import_jsx_runtime.jsx)("path", { style: {
    fill: "black",
    fillRule: "nonzero"
  }, d: "M2105 0c169,0 286,160 249,315l200 0c-172,266 -231,479 -256,792 315,-24 530,-86 792,-255l0 897c-265,-171 -479,-231 -792,-256 18,234 75,495 185,682l339 0c233,0 369,269 225,456l545 0 -595 1916c130,94 158,275 59,402 465,0 416,568 51,568l-334 0 465 2867 332 0c250,0 381,306 199,485 162,63 273,220 273,399l0 633 168 0 0 475c-1403,0 -2807,0 -4210,0l0 -475 167 0 0 -633c0,-179 112,-336 274,-399 -181,-178 -52,-485 199,-485l332 0 465 -2867 -335 0c-353,0 -418,-568 51,-568 -98,-127 -70,-308 59,-402l-594 -1916c181,0 363,0 545,0 -144,-187 -9,-456 225,-456l339 0c110,-187 167,-448 185,-682 -315,25 -530,87 -793,256l0 -897c266,171 480,231 793,255 -25,-315 -87,-529 -256,-792l199 0c-36,-155 81,-315 250,-315zm-1994 10012l0 253 3988 0 0 -253c-1330,0 -2659,0 -3988,0zm484 -1060c-174,0 -316,142 -316,316l0 633 3652 0 0 -633c0,-174 -142,-316 -316,-316 -1007,0 -2013,0 -3020,0zm45 -457c-230,0 -225,345 0,345l2930 0c230,0 225,-345 0,-345 -977,0 -1953,0 -2930,0zm2020 -2978l-1111 0 -465 2867 2041 0 -465 -2867zm-1558 -456c-229,0 -224,345 0,345 669,0 1337,0 2005,0 230,0 225,-345 0,-345 -668,0 -1336,0 -2005,0zm1730 -457l-1454 0c-229,0 -224,345 0,345l1454 0c229,0 224,-345 0,-345zm-2064 -1862l544 1751c529,0 1057,0 1586,0l544 -1751c-892,0 -1783,0 -2674,0zm1085 -567l504 0c-126,-247 -163,-526 -177,-800 273,15 553,52 800,177l0 -504c-247,126 -527,163 -800,177 14,-273 51,-552 177,-799 -168,0 -336,0 -504,0 125,247 162,526 177,799 -274,-14 -553,-51 -800,-177l0 504c247,-125 527,-162 800,-177 -15,274 -52,553 -177,800zm969 111l-1434 0c-230,0 -225,345 0,345l1434 0c230,0 225,-345 0,-345zm-717 -2175c-105,0 -175,109 -133,204l266 0c42,-96 -30,-205 -133,-204z" }) }) }))
};
function ErrorBoundary({ children }) {
  try {
    return (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
  } catch (error) {
    console.log(error);
    return (0, import_jsx_runtime.jsx)(WhiteKing, { showError: true });
  }
}
function WhiteKing({ showError = false }) {
  return (0, import_jsx_runtime.jsxs)("div", Object.assign({ style: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  } }, { children: [(0, import_jsx_runtime.jsx)("div", Object.assign({ style: {
    width: 250,
    height: 250,
    transform: "rotate(90deg)"
  } }, { children: errorImage.whiteKing })), showError && (0, import_jsx_runtime.jsx)("h1", { children: "Something went wrong" })] }));
}
function Board() {
  const boardRef = (0, import_react.useRef)(null);
  const { boardWidth, clearCurrentRightClickDown, onPromotionPieceSelect, setShowPromoteDialog, showPromoteDialog, customBoardStyle } = useChessboard();
  (0, import_react.useEffect)(() => {
    function handleClickOutside(event) {
      if (boardRef.current && !boardRef.current.contains(event.target)) {
        clearCurrentRightClickDown();
      }
    }
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);
  return boardWidth ? (0, import_jsx_runtime.jsx)("div", Object.assign({ style: { perspective: "1000px" } }, { children: (0, import_jsx_runtime.jsxs)("div", Object.assign({ ref: boardRef, style: Object.assign(Object.assign({ position: "relative" }, boardStyles(boardWidth)), customBoardStyle) }, { children: [(0, import_jsx_runtime.jsx)(Squares, {}), (0, import_jsx_runtime.jsx)(Arrows, {}), showPromoteDialog && (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("div", { onClick: () => {
    setShowPromoteDialog(false);
    onPromotionPieceSelect === null || onPromotionPieceSelect === void 0 ? void 0 : onPromotionPieceSelect();
  }, style: {
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "100",
    backgroundColor: "rgba(22,21,18,.7)",
    width: boardWidth,
    height: boardWidth
  } }), (0, import_jsx_runtime.jsx)(PromotionDialog, {})] })] })) })) : (0, import_jsx_runtime.jsx)(WhiteKing, {});
}
var boardStyles = (width) => ({
  cursor: "default",
  height: width,
  width
});
var ListenerType;
(function(ListenerType2) {
  ListenerType2["mouse"] = "mouse";
  ListenerType2["touch"] = "touch";
  ListenerType2["keyboard"] = "keyboard";
})(ListenerType || (ListenerType = {}));
var OptionsReader2 = class {
  get delay() {
    var _delay;
    return (_delay = this.args.delay) !== null && _delay !== void 0 ? _delay : 0;
  }
  get scrollAngleRanges() {
    return this.args.scrollAngleRanges;
  }
  get getDropTargetElementsAtPoint() {
    return this.args.getDropTargetElementsAtPoint;
  }
  get ignoreContextMenu() {
    var _ignoreContextMenu;
    return (_ignoreContextMenu = this.args.ignoreContextMenu) !== null && _ignoreContextMenu !== void 0 ? _ignoreContextMenu : false;
  }
  get enableHoverOutsideTarget() {
    var _enableHoverOutsideTarget;
    return (_enableHoverOutsideTarget = this.args.enableHoverOutsideTarget) !== null && _enableHoverOutsideTarget !== void 0 ? _enableHoverOutsideTarget : false;
  }
  get enableKeyboardEvents() {
    var _enableKeyboardEvents;
    return (_enableKeyboardEvents = this.args.enableKeyboardEvents) !== null && _enableKeyboardEvents !== void 0 ? _enableKeyboardEvents : false;
  }
  get enableMouseEvents() {
    var _enableMouseEvents;
    return (_enableMouseEvents = this.args.enableMouseEvents) !== null && _enableMouseEvents !== void 0 ? _enableMouseEvents : false;
  }
  get enableTouchEvents() {
    var _enableTouchEvents;
    return (_enableTouchEvents = this.args.enableTouchEvents) !== null && _enableTouchEvents !== void 0 ? _enableTouchEvents : true;
  }
  get touchSlop() {
    return this.args.touchSlop || 0;
  }
  get delayTouchStart() {
    var ref, ref1;
    var ref2, ref3;
    return (ref3 = (ref2 = (ref = this.args) === null || ref === void 0 ? void 0 : ref.delayTouchStart) !== null && ref2 !== void 0 ? ref2 : (ref1 = this.args) === null || ref1 === void 0 ? void 0 : ref1.delay) !== null && ref3 !== void 0 ? ref3 : 0;
  }
  get delayMouseStart() {
    var ref, ref4;
    var ref5, ref6;
    return (ref6 = (ref5 = (ref = this.args) === null || ref === void 0 ? void 0 : ref.delayMouseStart) !== null && ref5 !== void 0 ? ref5 : (ref4 = this.args) === null || ref4 === void 0 ? void 0 : ref4.delay) !== null && ref6 !== void 0 ? ref6 : 0;
  }
  get window() {
    if (this.context && this.context.window) {
      return this.context.window;
    } else if (typeof window !== "undefined") {
      return window;
    }
    return void 0;
  }
  get document() {
    var ref;
    if ((ref = this.context) === null || ref === void 0 ? void 0 : ref.document) {
      return this.context.document;
    }
    if (this.window) {
      return this.window.document;
    }
    return void 0;
  }
  get rootElement() {
    var ref;
    return ((ref = this.args) === null || ref === void 0 ? void 0 : ref.rootElement) || this.document;
  }
  constructor(args, context) {
    this.args = args;
    this.context = context;
  }
};
function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(Math.abs(x2 - x1), 2) + Math.pow(Math.abs(y2 - y1), 2));
}
function inAngleRanges(x1, y1, x2, y2, angleRanges) {
  if (!angleRanges) {
    return false;
  }
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI + 180;
  for (let i = 0; i < angleRanges.length; ++i) {
    const ar = angleRanges[i];
    if (ar && (ar.start == null || angle >= ar.start) && (ar.end == null || angle <= ar.end)) {
      return true;
    }
  }
  return false;
}
var MouseButtons = {
  Left: 1,
  Right: 2,
  Center: 4
};
var MouseButton = {
  Left: 0,
  Center: 1,
  Right: 2
};
function eventShouldStartDrag(e) {
  return e.button === void 0 || e.button === MouseButton.Left;
}
function eventShouldEndDrag(e) {
  return e.buttons === void 0 || (e.buttons & MouseButtons.Left) === 0;
}
function isTouchEvent(e) {
  return !!e.targetTouches;
}
var ELEMENT_NODE = 1;
function getNodeClientOffset(node) {
  const el = node.nodeType === ELEMENT_NODE ? node : node.parentElement;
  if (!el) {
    return void 0;
  }
  const { top, left } = el.getBoundingClientRect();
  return {
    x: left,
    y: top
  };
}
function getEventClientTouchOffset(e, lastTargetTouchFallback) {
  if (e.targetTouches.length === 1) {
    return getEventClientOffset(e.targetTouches[0]);
  } else if (lastTargetTouchFallback && e.touches.length === 1) {
    if (e.touches[0].target === lastTargetTouchFallback.target) {
      return getEventClientOffset(e.touches[0]);
    }
  }
  return;
}
function getEventClientOffset(e, lastTargetTouchFallback) {
  if (isTouchEvent(e)) {
    return getEventClientTouchOffset(e, lastTargetTouchFallback);
  } else {
    return {
      x: e.clientX,
      y: e.clientY
    };
  }
}
var supportsPassive = (() => {
  let supported = false;
  try {
    addEventListener("test", () => {
    }, Object.defineProperty({}, "passive", {
      get() {
        supported = true;
        return true;
      }
    }));
  } catch (e) {
  }
  return supported;
})();
var eventNames = {
  [ListenerType.mouse]: {
    start: "mousedown",
    move: "mousemove",
    end: "mouseup",
    contextmenu: "contextmenu"
  },
  [ListenerType.touch]: {
    start: "touchstart",
    move: "touchmove",
    end: "touchend"
  },
  [ListenerType.keyboard]: {
    keydown: "keydown"
  }
};
var TouchBackendImpl = class _TouchBackendImpl {
  /**
  * Generate profiling statistics for the HTML5Backend.
  */
  profile() {
    var ref;
    return {
      sourceNodes: this.sourceNodes.size,
      sourcePreviewNodes: this.sourcePreviewNodes.size,
      sourcePreviewNodeOptions: this.sourcePreviewNodeOptions.size,
      targetNodes: this.targetNodes.size,
      dragOverTargetIds: ((ref = this.dragOverTargetIds) === null || ref === void 0 ? void 0 : ref.length) || 0
    };
  }
  // public for test
  get document() {
    return this.options.document;
  }
  setup() {
    const root = this.options.rootElement;
    if (!root) {
      return;
    }
    invariant(!_TouchBackendImpl.isSetUp, "Cannot have two Touch backends at the same time.");
    _TouchBackendImpl.isSetUp = true;
    this.addEventListener(root, "start", this.getTopMoveStartHandler());
    this.addEventListener(root, "start", this.handleTopMoveStartCapture, true);
    this.addEventListener(root, "move", this.handleTopMove);
    this.addEventListener(root, "move", this.handleTopMoveCapture, true);
    this.addEventListener(root, "end", this.handleTopMoveEndCapture, true);
    if (this.options.enableMouseEvents && !this.options.ignoreContextMenu) {
      this.addEventListener(root, "contextmenu", this.handleTopMoveEndCapture);
    }
    if (this.options.enableKeyboardEvents) {
      this.addEventListener(root, "keydown", this.handleCancelOnEscape, true);
    }
  }
  teardown() {
    const root = this.options.rootElement;
    if (!root) {
      return;
    }
    _TouchBackendImpl.isSetUp = false;
    this._mouseClientOffset = {};
    this.removeEventListener(root, "start", this.handleTopMoveStartCapture, true);
    this.removeEventListener(root, "start", this.handleTopMoveStart);
    this.removeEventListener(root, "move", this.handleTopMoveCapture, true);
    this.removeEventListener(root, "move", this.handleTopMove);
    this.removeEventListener(root, "end", this.handleTopMoveEndCapture, true);
    if (this.options.enableMouseEvents && !this.options.ignoreContextMenu) {
      this.removeEventListener(root, "contextmenu", this.handleTopMoveEndCapture);
    }
    if (this.options.enableKeyboardEvents) {
      this.removeEventListener(root, "keydown", this.handleCancelOnEscape, true);
    }
    this.uninstallSourceNodeRemovalObserver();
  }
  addEventListener(subject, event, handler, capture = false) {
    const options = supportsPassive ? {
      capture,
      passive: false
    } : capture;
    this.listenerTypes.forEach(function(listenerType) {
      const evt = eventNames[listenerType][event];
      if (evt) {
        subject.addEventListener(evt, handler, options);
      }
    });
  }
  removeEventListener(subject, event, handler, capture = false) {
    const options = supportsPassive ? {
      capture,
      passive: false
    } : capture;
    this.listenerTypes.forEach(function(listenerType) {
      const evt = eventNames[listenerType][event];
      if (evt) {
        subject.removeEventListener(evt, handler, options);
      }
    });
  }
  connectDragSource(sourceId, node) {
    const handleMoveStart = this.handleMoveStart.bind(this, sourceId);
    this.sourceNodes.set(sourceId, node);
    this.addEventListener(node, "start", handleMoveStart);
    return () => {
      this.sourceNodes.delete(sourceId);
      this.removeEventListener(node, "start", handleMoveStart);
    };
  }
  connectDragPreview(sourceId, node, options) {
    this.sourcePreviewNodeOptions.set(sourceId, options);
    this.sourcePreviewNodes.set(sourceId, node);
    return () => {
      this.sourcePreviewNodes.delete(sourceId);
      this.sourcePreviewNodeOptions.delete(sourceId);
    };
  }
  connectDropTarget(targetId, node) {
    const root = this.options.rootElement;
    if (!this.document || !root) {
      return () => {
      };
    }
    const handleMove = (e) => {
      if (!this.document || !root || !this.monitor.isDragging()) {
        return;
      }
      let coords;
      switch (e.type) {
        case eventNames.mouse.move:
          coords = {
            x: e.clientX,
            y: e.clientY
          };
          break;
        case eventNames.touch.move:
          var ref, ref1;
          coords = {
            x: ((ref = e.touches[0]) === null || ref === void 0 ? void 0 : ref.clientX) || 0,
            y: ((ref1 = e.touches[0]) === null || ref1 === void 0 ? void 0 : ref1.clientY) || 0
          };
          break;
      }
      const droppedOn = coords != null ? this.document.elementFromPoint(coords.x, coords.y) : void 0;
      const childMatch = droppedOn && node.contains(droppedOn);
      if (droppedOn === node || childMatch) {
        return this.handleMove(e, targetId);
      }
    };
    this.addEventListener(this.document.body, "move", handleMove);
    this.targetNodes.set(targetId, node);
    return () => {
      if (this.document) {
        this.targetNodes.delete(targetId);
        this.removeEventListener(this.document.body, "move", handleMove);
      }
    };
  }
  getTopMoveStartHandler() {
    if (!this.options.delayTouchStart && !this.options.delayMouseStart) {
      return this.handleTopMoveStart;
    }
    return this.handleTopMoveStartDelay;
  }
  installSourceNodeRemovalObserver(node) {
    this.uninstallSourceNodeRemovalObserver();
    this.draggedSourceNode = node;
    this.draggedSourceNodeRemovalObserver = new MutationObserver(() => {
      if (node && !node.parentElement) {
        this.resurrectSourceNode();
        this.uninstallSourceNodeRemovalObserver();
      }
    });
    if (!node || !node.parentElement) {
      return;
    }
    this.draggedSourceNodeRemovalObserver.observe(node.parentElement, {
      childList: true
    });
  }
  resurrectSourceNode() {
    if (this.document && this.draggedSourceNode) {
      this.draggedSourceNode.style.display = "none";
      this.draggedSourceNode.removeAttribute("data-reactid");
      this.document.body.appendChild(this.draggedSourceNode);
    }
  }
  uninstallSourceNodeRemovalObserver() {
    if (this.draggedSourceNodeRemovalObserver) {
      this.draggedSourceNodeRemovalObserver.disconnect();
    }
    this.draggedSourceNodeRemovalObserver = void 0;
    this.draggedSourceNode = void 0;
  }
  constructor(manager, context, options) {
    this.getSourceClientOffset = (sourceId) => {
      const element = this.sourceNodes.get(sourceId);
      return element && getNodeClientOffset(element);
    };
    this.handleTopMoveStartCapture = (e) => {
      if (!eventShouldStartDrag(e)) {
        return;
      }
      this.moveStartSourceIds = [];
    };
    this.handleMoveStart = (sourceId) => {
      if (Array.isArray(this.moveStartSourceIds)) {
        this.moveStartSourceIds.unshift(sourceId);
      }
    };
    this.handleTopMoveStart = (e) => {
      if (!eventShouldStartDrag(e)) {
        return;
      }
      const clientOffset = getEventClientOffset(e);
      if (clientOffset) {
        if (isTouchEvent(e)) {
          this.lastTargetTouchFallback = e.targetTouches[0];
        }
        this._mouseClientOffset = clientOffset;
      }
      this.waitingForDelay = false;
    };
    this.handleTopMoveStartDelay = (e) => {
      if (!eventShouldStartDrag(e)) {
        return;
      }
      const delay = e.type === eventNames.touch.start ? this.options.delayTouchStart : this.options.delayMouseStart;
      this.timeout = setTimeout(this.handleTopMoveStart.bind(this, e), delay);
      this.waitingForDelay = true;
    };
    this.handleTopMoveCapture = () => {
      this.dragOverTargetIds = [];
    };
    this.handleMove = (_evt, targetId) => {
      if (this.dragOverTargetIds) {
        this.dragOverTargetIds.unshift(targetId);
      }
    };
    this.handleTopMove = (e1) => {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      if (!this.document || this.waitingForDelay) {
        return;
      }
      const { moveStartSourceIds, dragOverTargetIds } = this;
      const enableHoverOutsideTarget = this.options.enableHoverOutsideTarget;
      const clientOffset = getEventClientOffset(e1, this.lastTargetTouchFallback);
      if (!clientOffset) {
        return;
      }
      if (this._isScrolling || !this.monitor.isDragging() && inAngleRanges(this._mouseClientOffset.x || 0, this._mouseClientOffset.y || 0, clientOffset.x, clientOffset.y, this.options.scrollAngleRanges)) {
        this._isScrolling = true;
        return;
      }
      if (!this.monitor.isDragging() && // eslint-disable-next-line no-prototype-builtins
      this._mouseClientOffset.hasOwnProperty("x") && moveStartSourceIds && distance(this._mouseClientOffset.x || 0, this._mouseClientOffset.y || 0, clientOffset.x, clientOffset.y) > (this.options.touchSlop ? this.options.touchSlop : 0)) {
        this.moveStartSourceIds = void 0;
        this.actions.beginDrag(moveStartSourceIds, {
          clientOffset: this._mouseClientOffset,
          getSourceClientOffset: this.getSourceClientOffset,
          publishSource: false
        });
      }
      if (!this.monitor.isDragging()) {
        return;
      }
      const sourceNode = this.sourceNodes.get(this.monitor.getSourceId());
      this.installSourceNodeRemovalObserver(sourceNode);
      this.actions.publishDragSource();
      if (e1.cancelable) e1.preventDefault();
      const dragOverTargetNodes = (dragOverTargetIds || []).map(
        (key) => this.targetNodes.get(key)
      ).filter(
        (e) => !!e
      );
      const elementsAtPoint = this.options.getDropTargetElementsAtPoint ? this.options.getDropTargetElementsAtPoint(clientOffset.x, clientOffset.y, dragOverTargetNodes) : this.document.elementsFromPoint(clientOffset.x, clientOffset.y);
      const elementsAtPointExtended = [];
      for (const nodeId in elementsAtPoint) {
        if (!elementsAtPoint.hasOwnProperty(nodeId)) {
          continue;
        }
        let currentNode = elementsAtPoint[nodeId];
        if (currentNode != null) {
          elementsAtPointExtended.push(currentNode);
        }
        while (currentNode) {
          currentNode = currentNode.parentElement;
          if (currentNode && elementsAtPointExtended.indexOf(currentNode) === -1) {
            elementsAtPointExtended.push(currentNode);
          }
        }
      }
      const orderedDragOverTargetIds = elementsAtPointExtended.filter(
        (node) => dragOverTargetNodes.indexOf(node) > -1
      ).map(
        (node) => this._getDropTargetId(node)
      ).filter(
        (node) => !!node
      ).filter(
        (id, index, ids) => ids.indexOf(id) === index
      );
      if (enableHoverOutsideTarget) {
        for (const targetId in this.targetNodes) {
          const targetNode = this.targetNodes.get(targetId);
          if (sourceNode && targetNode && targetNode.contains(sourceNode) && orderedDragOverTargetIds.indexOf(targetId) === -1) {
            orderedDragOverTargetIds.unshift(targetId);
            break;
          }
        }
      }
      orderedDragOverTargetIds.reverse();
      this.actions.hover(orderedDragOverTargetIds, {
        clientOffset
      });
    };
    this._getDropTargetId = (node) => {
      const keys = this.targetNodes.keys();
      let next = keys.next();
      while (next.done === false) {
        const targetId = next.value;
        if (node === this.targetNodes.get(targetId)) {
          return targetId;
        } else {
          next = keys.next();
        }
      }
      return void 0;
    };
    this.handleTopMoveEndCapture = (e) => {
      this._isScrolling = false;
      this.lastTargetTouchFallback = void 0;
      if (!eventShouldEndDrag(e)) {
        return;
      }
      if (!this.monitor.isDragging() || this.monitor.didDrop()) {
        this.moveStartSourceIds = void 0;
        return;
      }
      if (e.cancelable) e.preventDefault();
      this._mouseClientOffset = {};
      this.uninstallSourceNodeRemovalObserver();
      this.actions.drop();
      this.actions.endDrag();
    };
    this.handleCancelOnEscape = (e) => {
      if (e.key === "Escape" && this.monitor.isDragging()) {
        this._mouseClientOffset = {};
        this.uninstallSourceNodeRemovalObserver();
        this.actions.endDrag();
      }
    };
    this.options = new OptionsReader2(options, context);
    this.actions = manager.getActions();
    this.monitor = manager.getMonitor();
    this.sourceNodes = /* @__PURE__ */ new Map();
    this.sourcePreviewNodes = /* @__PURE__ */ new Map();
    this.sourcePreviewNodeOptions = /* @__PURE__ */ new Map();
    this.targetNodes = /* @__PURE__ */ new Map();
    this.listenerTypes = [];
    this._mouseClientOffset = {};
    this._isScrolling = false;
    if (this.options.enableMouseEvents) {
      this.listenerTypes.push(ListenerType.mouse);
    }
    if (this.options.enableTouchEvents) {
      this.listenerTypes.push(ListenerType.touch);
    }
    if (this.options.enableKeyboardEvents) {
      this.listenerTypes.push(ListenerType.keyboard);
    }
  }
};
var TouchBackend = function createBackend2(manager, context = {}, options = {}) {
  return new TouchBackendImpl(manager, context, options);
};
var ChessboardDnDContext = (0, import_react.createContext)({ isCustomDndProviderSet: false });
var EmptyProvider = ({ children }) => {
  return (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
};
var ChessboardDnDProvider = ({ children, backend, context, options, debugMode }) => {
  return (0, import_jsx_runtime.jsx)(ChessboardDnDContext.Provider, Object.assign({ value: { isCustomDndProviderSet: true } }, { children: (0, import_jsx_runtime.jsx)(DndProvider, Object.assign({ backend: backend || ("ontouchstart" in window ? TouchBackend : HTML5Backend), context, options, debugMode: debugMode !== null && debugMode !== void 0 ? debugMode : false }, { children })) }));
};
var ChessboardDnDRoot = ({ customDndBackend, customDndBackendOptions, children }) => {
  const [clientWindow, setClientWindow] = (0, import_react.useState)();
  const [backendSet, setBackendSet] = (0, import_react.useState)(false);
  const [isMobile, setIsMobile] = (0, import_react.useState)(false);
  const { isCustomDndProviderSet } = (0, import_react.useContext)(ChessboardDnDContext);
  (0, import_react.useEffect)(() => {
    setIsMobile("ontouchstart" in window);
    setBackendSet(true);
    setClientWindow(window);
  }, []);
  const DnDWrapper = isCustomDndProviderSet ? EmptyProvider : DndProvider;
  if (!backendSet) {
    return null;
  }
  return clientWindow ? (0, import_jsx_runtime.jsx)(DnDWrapper, Object.assign({ backend: customDndBackend || (isMobile ? TouchBackend : HTML5Backend), context: clientWindow, options: customDndBackend ? customDndBackendOptions : void 0 }, { children })) : (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
};
function CustomDragLayer({ boardContainer }) {
  const { boardWidth, chessPieces, id, snapToCursor, allowDragOutsideBoard } = useChessboard();
  const collectedProps = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    clientOffset: monitor.getClientOffset(),
    sourceClientOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }));
  const { isDragging, item, clientOffset, sourceClientOffset } = collectedProps;
  const getItemStyle = (0, import_react.useCallback)((clientOffset2, sourceClientOffset2) => {
    if (!clientOffset2 || !sourceClientOffset2)
      return { display: "none" };
    let { x, y } = snapToCursor ? clientOffset2 : sourceClientOffset2;
    const halfSquareWidth = boardWidth / 8 / 2;
    if (snapToCursor) {
      x -= halfSquareWidth;
      y -= halfSquareWidth;
    }
    if (!allowDragOutsideBoard) {
      const { left, top } = boardContainer;
      const maxLeft = left - halfSquareWidth;
      const maxTop = top - halfSquareWidth;
      const maxRight = left + boardWidth - halfSquareWidth;
      const maxBottom = top + boardWidth - halfSquareWidth;
      x = Math.max(maxLeft, Math.min(x, maxRight));
      y = Math.max(maxTop, Math.min(y, maxBottom));
    }
    const transform = `translate(${x}px, ${y}px)`;
    return {
      transform,
      WebkitTransform: transform,
      touchAction: "none"
    };
  }, [boardWidth, allowDragOutsideBoard, snapToCursor, boardContainer]);
  return isDragging && item.id === id ? (0, import_jsx_runtime.jsx)("div", Object.assign({ style: {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 10,
    left: 0,
    top: 0
  } }, { children: (0, import_jsx_runtime.jsx)("div", Object.assign({ style: getItemStyle(clientOffset, sourceClientOffset) }, { children: typeof chessPieces[item.piece] === "function" ? chessPieces[item.piece]({
    squareWidth: boardWidth / 8,
    isDragging: true
  }) : (0, import_jsx_runtime.jsx)("svg", Object.assign({ viewBox: "1 1 43 43", width: boardWidth / 8, height: boardWidth / 8 }, { children: (0, import_jsx_runtime.jsx)("g", { children: chessPieces[item.piece] }) })) })) })) : null;
}
var SparePiece = ({ piece, width, customPieceJSX, dndId }) => {
  const renderPiece = customPieceJSX !== null && customPieceJSX !== void 0 ? customPieceJSX : defaultPieces[piece];
  const [{ canDrag, isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "piece",
    item: () => {
      return { piece, isSpare: true, id: dndId };
    },
    collect: (monitor) => ({
      canDrag: true,
      isDragging: !!monitor.isDragging()
    })
  }), [piece, dndId]);
  dragPreview(getEmptyImage(), { captureDraggingState: true });
  return (0, import_jsx_runtime.jsx)("div", Object.assign({ ref: canDrag ? drag : null, "data-piece": piece, style: { cursor: "move" } }, { children: typeof renderPiece === "function" ? renderPiece({
    squareWidth: width,
    isDragging
  }) : (0, import_jsx_runtime.jsx)("svg", Object.assign({ viewBox: "1 1 43 43", width, height: width }, { children: (0, import_jsx_runtime.jsx)("g", { children: renderPiece }) })) }));
};
var Chessboard = (0, import_react.forwardRef)((props, ref) => {
  const { customDndBackend, customDndBackendOptions, onBoardWidthChange } = props, otherProps = __rest(props, ["customDndBackend", "customDndBackendOptions", "onBoardWidthChange"]);
  const [boardWidth, setBoardWidth] = (0, import_react.useState)(props.boardWidth);
  const boardRef = (0, import_react.useRef)(null);
  const boardContainerRef = (0, import_react.useRef)(null);
  const [boardContainerPos, setBoardContainerPos] = (0, import_react.useState)({
    left: 0,
    top: 0
  });
  const metrics = (0, import_react.useMemo)(() => {
    var _a;
    return (_a = boardRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
  }, [boardRef.current]);
  (0, import_react.useEffect)(() => {
    boardWidth && (onBoardWidthChange === null || onBoardWidthChange === void 0 ? void 0 : onBoardWidthChange(boardWidth));
  }, [boardWidth]);
  (0, import_react.useEffect)(() => {
    setBoardContainerPos({
      left: (metrics === null || metrics === void 0 ? void 0 : metrics.left) ? metrics === null || metrics === void 0 ? void 0 : metrics.left : 0,
      top: (metrics === null || metrics === void 0 ? void 0 : metrics.top) ? metrics === null || metrics === void 0 ? void 0 : metrics.top : 0
    });
  }, [metrics]);
  (0, import_react.useEffect)(() => {
    var _a;
    if (props.boardWidth === void 0 && ((_a = boardRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth)) {
      const resizeObserver = new ResizeObserver(() => {
        var _a2;
        setBoardWidth((_a2 = boardRef.current) === null || _a2 === void 0 ? void 0 : _a2.offsetWidth);
      });
      resizeObserver.observe(boardRef.current);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [boardRef.current]);
  return (0, import_jsx_runtime.jsx)(ErrorBoundary, { children: (0, import_jsx_runtime.jsxs)("div", Object.assign({ ref: boardContainerRef, style: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  } }, { children: [(0, import_jsx_runtime.jsx)("div", { ref: boardRef, style: { width: "100%" } }), (0, import_jsx_runtime.jsx)(ChessboardDnDRoot, Object.assign({ customDndBackend, customDndBackendOptions }, { children: boardWidth && (0, import_jsx_runtime.jsxs)(ChessboardProvider, Object.assign({ boardWidth }, otherProps, { ref }, { children: [(0, import_jsx_runtime.jsx)(CustomDragLayer, { boardContainer: boardContainerPos }), (0, import_jsx_runtime.jsx)(Board, {})] })) }))] })) });
});
export {
  Chessboard,
  ChessboardDnDProvider,
  SparePiece
};
/*! Bundled license information:

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=react-chessboard.js.map
