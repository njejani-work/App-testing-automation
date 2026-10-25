"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readPackageSync = exports.readPackage = exports.packageDirectorySync = exports.createBase64EncodeStream = void 0;
/**
 * Package-internal utilities. Not exported from `@appium/support`.
 */
var base64_encode_stream_1 = require("./base64-encode-stream");
Object.defineProperty(exports, "createBase64EncodeStream", { enumerable: true, get: function () { return base64_encode_stream_1.createBase64EncodeStream; } });
var read_package_1 = require("./read-package");
Object.defineProperty(exports, "packageDirectorySync", { enumerable: true, get: function () { return read_package_1.packageDirectorySync; } });
Object.defineProperty(exports, "readPackage", { enumerable: true, get: function () { return read_package_1.readPackage; } });
Object.defineProperty(exports, "readPackageSync", { enumerable: true, get: function () { return read_package_1.readPackageSync; } });
//# sourceMappingURL=index.js.map