export const isString = (value) => typeof value === 'string';
export const toJsonString = (value) => {
    if (isString(value)) {
        return value;
    }
    try {
        return JSON.stringify(value) ?? String(value);
    }
    catch {
        return String(value);
    }
};
