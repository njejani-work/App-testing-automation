"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireSharp = requireSharp;
exports.cropBase64Image = cropBase64Image;
let _sharp;
/**
 * @deprecated Sharp-backed image helpers are deprecated and will be removed in a future major version.
 * Consumers are expected to implement this functionality on their side.
 * @returns The sharp module for image processing
 */
function requireSharp() {
    if (!_sharp) {
        try {
            _sharp = require('sharp');
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            throw new Error(`Cannot load the 'sharp' module needed for images processing. ` +
                `Consider visiting https://sharp.pixelplumbing.com/install ` +
                `for troubleshooting. Original error: ${message}`, { cause: err });
        }
    }
    return _sharp;
}
/**
 * @deprecated Sharp-backed image helpers are deprecated and will be removed in a future major version.
 * Consumers are expected to implement this functionality on their side.
 * Crop the image by given rectangle (use base64 string as input and output)
 *
 * @param base64Image The string with base64 encoded image.
 * Supports all image formats natively supported by Sharp library.
 * @param rect The selected region of image
 * @returns base64 encoded string of cropped image
 */
async function cropBase64Image(base64Image, rect) {
    const buf = await requireSharp()(Buffer.from(base64Image, 'base64')).extract(rect).toBuffer();
    return buf.toString('base64');
}
//# sourceMappingURL=image-util.js.map