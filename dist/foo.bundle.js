/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/yourprojectfile.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.mjs":
/*!***********************!*\
  !*** ./src/index.mjs ***!
  \***********************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction noop() { }\nfunction run(fn) {\n    return fn();\n}\nfunction blank_object() {\n    return Object.create(null);\n}\nfunction run_all(fns) {\n    fns.forEach(run);\n}\nfunction is_function(thing) {\n    return typeof thing === 'function';\n}\nfunction safe_not_equal(a, b) {\n    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');\n}\n\nfunction append(target, node) {\n    target.appendChild(node);\n}\nfunction insert(target, node, anchor) {\n    target.insertBefore(node, anchor || null);\n}\nfunction detach(node) {\n    node.parentNode.removeChild(node);\n}\nfunction element(name) {\n    return document.createElement(name);\n}\nfunction text(data) {\n    return document.createTextNode(data);\n}\nfunction children(element) {\n    return Array.from(element.childNodes);\n}\nfunction set_data(text, data) {\n    data = '' + data;\n    if (text.data !== data)\n        text.data = data;\n}\n\nlet current_component;\nfunction set_current_component(component) {\n    current_component = component;\n}\n\nconst dirty_components = [];\nconst binding_callbacks = [];\nconst render_callbacks = [];\nconst flush_callbacks = [];\nconst resolved_promise = Promise.resolve();\nlet update_scheduled = false;\nfunction schedule_update() {\n    if (!update_scheduled) {\n        update_scheduled = true;\n        resolved_promise.then(flush);\n    }\n}\nfunction add_render_callback(fn) {\n    render_callbacks.push(fn);\n}\nfunction flush() {\n    const seen_callbacks = new Set();\n    do {\n        // first, call beforeUpdate functions\n        // and update components\n        while (dirty_components.length) {\n            const component = dirty_components.shift();\n            set_current_component(component);\n            update(component.$$);\n        }\n        while (binding_callbacks.length)\n            binding_callbacks.pop()();\n        // then, once components are updated, call\n        // afterUpdate functions. This may cause\n        // subsequent updates...\n        for (let i = 0; i < render_callbacks.length; i += 1) {\n            const callback = render_callbacks[i];\n            if (!seen_callbacks.has(callback)) {\n                callback();\n                // ...so guard against infinite loops\n                seen_callbacks.add(callback);\n            }\n        }\n        render_callbacks.length = 0;\n    } while (dirty_components.length);\n    while (flush_callbacks.length) {\n        flush_callbacks.pop()();\n    }\n    update_scheduled = false;\n}\nfunction update($$) {\n    if ($$.fragment !== null) {\n        $$.update();\n        run_all($$.before_update);\n        $$.fragment && $$.fragment.p($$.ctx, $$.dirty);\n        $$.dirty = [-1];\n        $$.after_update.forEach(add_render_callback);\n    }\n}\nconst outroing = new Set();\nfunction transition_in(block, local) {\n    if (block && block.i) {\n        outroing.delete(block);\n        block.i(local);\n    }\n}\nfunction mount_component(component, target, anchor) {\n    const { fragment, on_mount, on_destroy, after_update } = component.$$;\n    fragment && fragment.m(target, anchor);\n    // onMount happens before the initial afterUpdate\n    add_render_callback(() => {\n        const new_on_destroy = on_mount.map(run).filter(is_function);\n        if (on_destroy) {\n            on_destroy.push(...new_on_destroy);\n        }\n        else {\n            // Edge case - component was destroyed immediately,\n            // most likely as a result of a binding initialising\n            run_all(new_on_destroy);\n        }\n        component.$$.on_mount = [];\n    });\n    after_update.forEach(add_render_callback);\n}\nfunction destroy_component(component, detaching) {\n    const $$ = component.$$;\n    if ($$.fragment !== null) {\n        run_all($$.on_destroy);\n        $$.fragment && $$.fragment.d(detaching);\n        // TODO null out other refs, including component.$$ (but need to\n        // preserve final state?)\n        $$.on_destroy = $$.fragment = null;\n        $$.ctx = [];\n    }\n}\nfunction make_dirty(component, i) {\n    if (component.$$.dirty[0] === -1) {\n        dirty_components.push(component);\n        schedule_update();\n        component.$$.dirty.fill(0);\n    }\n    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));\n}\nfunction init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {\n    const parent_component = current_component;\n    set_current_component(component);\n    const prop_values = options.props || {};\n    const $$ = component.$$ = {\n        fragment: null,\n        ctx: null,\n        // state\n        props,\n        update: noop,\n        not_equal,\n        bound: blank_object(),\n        // lifecycle\n        on_mount: [],\n        on_destroy: [],\n        before_update: [],\n        after_update: [],\n        context: new Map(parent_component ? parent_component.$$.context : []),\n        // everything else\n        callbacks: blank_object(),\n        dirty\n    };\n    let ready = false;\n    $$.ctx = instance\n        ? instance(component, prop_values, (i, ret, value = ret) => {\n            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {\n                if ($$.bound[i])\n                    $$.bound[i](value);\n                if (ready)\n                    make_dirty(component, i);\n            }\n            return ret;\n        })\n        : [];\n    $$.update();\n    ready = true;\n    run_all($$.before_update);\n    // `false` as a special case of no DOM component\n    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;\n    if (options.target) {\n        if (options.hydrate) {\n            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion\n            $$.fragment && $$.fragment.l(children(options.target));\n        }\n        else {\n            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion\n            $$.fragment && $$.fragment.c();\n        }\n        if (options.intro)\n            transition_in(component.$$.fragment);\n        mount_component(component, options.target, options.anchor);\n        flush();\n    }\n    set_current_component(parent_component);\n}\nlet SvelteElement;\nif (typeof HTMLElement === 'function') {\n    SvelteElement = class extends HTMLElement {\n        constructor() {\n            super();\n            this.attachShadow({ mode: 'open' });\n        }\n        connectedCallback() {\n            // @ts-ignore todo: improve typings\n            for (const key in this.$$.slotted) {\n                // @ts-ignore todo: improve typings\n                this.appendChild(this.$$.slotted[key]);\n            }\n        }\n        attributeChangedCallback(attr, _oldValue, newValue) {\n            this[attr] = newValue;\n        }\n        $destroy() {\n            destroy_component(this, 1);\n            this.$destroy = noop;\n        }\n        $on(type, callback) {\n            // TODO should this delegate to addEventListener?\n            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));\n            callbacks.push(callback);\n            return () => {\n                const index = callbacks.indexOf(callback);\n                if (index !== -1)\n                    callbacks.splice(index, 1);\n            };\n        }\n        $set() {\n            // overridden by instance, if it has props\n        }\n    };\n}\n\n/* src\\index.svelte generated by Svelte v3.16.1 */\n\nfunction create_fragment(ctx) {\n\tlet h2;\n\tlet t0;\n\tlet t1;\n\n\treturn {\n\t\tc() {\n\t\t\th2 = element(\"h2\");\n\t\t\tt0 = text(\"Hello my name is \");\n\t\t\tt1 = text(/*name*/ ctx[0]);\n\t\t\tthis.c = noop;\n\t\t},\n\t\tm(target, anchor) {\n\t\t\tinsert(target, h2, anchor);\n\t\t\tappend(h2, t0);\n\t\t\tappend(h2, t1);\n\t\t},\n\t\tp(ctx, [dirty]) {\n\t\t\tif (dirty & /*name*/ 1) set_data(t1, /*name*/ ctx[0]);\n\t\t},\n\t\ti: noop,\n\t\to: noop,\n\t\td(detaching) {\n\t\t\tif (detaching) detach(h2);\n\t\t}\n\t};\n}\n\nfunction instance($$self, $$props, $$invalidate) {\n\tlet { name = \"Mark\" } = $$props;\n\n\t$$self.$set = $$props => {\n\t\tif (\"name\" in $$props) $$invalidate(0, name = $$props.name);\n\t};\n\n\treturn [name];\n}\n\nclass Src extends SvelteElement {\n\tconstructor(options) {\n\t\tsuper();\n\t\tinit(this, { target: this.shadowRoot }, instance, create_fragment, safe_not_equal, { name: 0 });\n\n\t\tif (options) {\n\t\t\tif (options.target) {\n\t\t\t\tinsert(options.target, this, options.anchor);\n\t\t\t}\n\n\t\t\tif (options.props) {\n\t\t\t\tthis.$set(options.props);\n\t\t\t\tflush();\n\t\t\t}\n\t\t}\n\t}\n\n\tstatic get observedAttributes() {\n\t\treturn [\"name\"];\n\t}\n\n\tget name() {\n\t\treturn this.$$.ctx[0];\n\t}\n\n\tset name(name) {\n\t\tthis.$set({ name });\n\t\tflush();\n\t}\n}\n\ncustomElements.define(\"my-component\", Src);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Src);\n\n\n//# sourceURL=webpack:///./src/index.mjs?");

/***/ }),

/***/ "./src/yourprojectfile.js":
/*!********************************!*\
  !*** ./src/yourprojectfile.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.mjs */ \"./src/index.mjs\");\n\n\n//# sourceURL=webpack:///./src/yourprojectfile.js?");

/***/ })

/******/ });