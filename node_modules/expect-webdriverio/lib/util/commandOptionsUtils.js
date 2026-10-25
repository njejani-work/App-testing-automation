export const isDefinedPlainObject = (obj) => {
    if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
        return true;
    }
    return false;
};
