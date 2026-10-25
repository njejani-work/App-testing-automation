import type sharp from 'sharp';
/**
 * @deprecated Sharp-backed image helpers are deprecated and will be removed in a future major version.
 * Consumers are expected to implement this functionality on their side.
 * @returns The sharp module for image processing
 */
export declare function requireSharp(): typeof sharp;
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
export declare function cropBase64Image(base64Image: string, rect: sharp.Region): Promise<string>;
//# sourceMappingURL=image-util.d.ts.map