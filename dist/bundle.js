/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content/hex.html":
/*!******************************!*\
  !*** ./src/content/hex.html ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = `<p>Work in progress</p>`;\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://mcu-tools/./src/content/hex.html?\n}");

/***/ }),

/***/ "./src/content/oled.html":
/*!*******************************!*\
  !*** ./src/content/oled.html ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = `<div class=\"panel\">\r\n\t<div class=\"controls\">\r\n\t\t<label>Scale:\r\n\t\t\t<select id=\"scale\">\r\n\t\t\t\t<option value=\"1\">1×</option>\r\n\t\t\t\t<option value=\"2\">2×</option>\r\n\t\t\t\t<option value=\"3\">3×</option>\r\n\t\t\t\t<option value=\"4\" selected>4×</option>\r\n\t\t\t\t<option value=\"6\">6×</option>\r\n\t\t\t\t<option value=\"8\">8×</option>\r\n\t\t\t</select>\r\n\t\t</label>\r\n\r\n\t\t<label><input type=\"checkbox\" id=\"invert\">Invert</label>\r\n\t\t<label><input type=\"checkbox\" id=\"grid\"> Show grid</label>\r\n\r\n\t\t<button id=\"refresh\">Refresh</button>\r\n\t\t<button id=\"download-png\">Download PNG</button>\r\n\t\t<button id=\"downloadBinBtn\">Scarica file binario</button>\r\n\t</div>\r\n\r\n\t<p>Inserisci i valori esadecimali separati da spazi o virgole:</p>\r\n\t<textarea id=\"hexInput\">0x00</textarea>\r\n</div>\r\n\r\n<div style=\"display:flex; gap:16px; align-items:flex-start\">\r\n\t<canvas id=\"oledCanvas\" width=\"128\" height=\"64\"></canvas>\r\n</div>`;\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://mcu-tools/./src/content/oled.html?\n}");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _content_hex_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./content/hex.html */ \"./src/content/hex.html\");\n/* harmony import */ var _content_oled_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./content/oled.html */ \"./src/content/oled.html\");\n\r\n\r\n\r\n\r\nconst contentMap = {\r\n    hex: _content_hex_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\r\n    oled: _content_oled_html__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\r\n};\r\n\r\nfunction loadContent(page) {\r\n    const content = document.getElementById(\"content\");\r\n    content.innerHTML = contentMap[page] || \"<p>Pagina non trovata</p>\";\r\n}\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n\tdocument.querySelectorAll(\"nav div\").forEach(element => {\r\n\t\telement.addEventListener(\"click\", (event) => {\r\n\t\t\tevent.preventDefault();\r\n\t\t\tloadContent(element.id);\r\n\t\t});\r\n\t});\r\n});\n\n//# sourceURL=webpack://mcu-tools/./src/index.js?\n}");

/***/ })

/******/ 	});
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;