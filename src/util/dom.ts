

export function createElement(elem: string) {
    return document.createElement(elem);
}

export function getElementById(elemId: string) {
    return document.getElementById(elemId);
}

export function setAttribute(target, attr) {
    
    if (!target.setAttribute) return;

    Object.keys(attr).forEach((key) => {
        target.setAttribute(key, attr[key]);
    });
}