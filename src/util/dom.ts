
import WspEditor from '../core/instance';

export function createElement(elem: string): Element {
    return document.createElement(elem);
}

export function getElementById(elemId: string): Element {
    return document.getElementById(elemId);
}

export function setAttribute(target: Element, attr: object): void {
    
    if (!target.setAttribute) return;

    Object.keys(attr).forEach((key) => {
        target.setAttribute(key, attr[key]);
    });
}