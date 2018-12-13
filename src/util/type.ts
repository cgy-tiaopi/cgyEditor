
export let isEmpty = function(value) {
    return value === undefined || value === null;
}

export let isString = function(str) {
    return typeof str === 'string' && str.constructor === String;
}