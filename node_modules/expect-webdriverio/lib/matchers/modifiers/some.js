const SOME_TAG = 'expect-webdriverio.some';
const SOME_SYMBOL = Symbol.for(SOME_TAG);
export class SomeElementsWrapper {
    elements;
    [SOME_SYMBOL] = true;
    constructor(elements) {
        this.elements = elements;
    }
}
export function some(elements) {
    return new SomeElementsWrapper(elements);
}
export function isSomeWrapper(value) {
    return value instanceof SomeElementsWrapper || value?.[SOME_SYMBOL] === true;
}
