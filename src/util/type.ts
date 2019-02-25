
export let isEmpty = function(value: any) {
    return value === undefined || value === null;
}

export let isString = function(str: any) {
    return typeof str === 'string' && str.constructor === String;
}