
import WspEditor from '../core/instance/index';

export function createElement(elem: string): Element {
    return document.createElement(elem);
}

export function getElementById(elemId: string): Element {
    return document.getElementById(elemId);
}

// export function getElementByTag(tagName: string): NodeListOf<Element> {
//     return document.getElementsByTagName(tagName);
// }

export function getElementByClass(className: string): HTMLCollectionOf<Element> {
    return document.getElementsByClassName(className);
}

export function setAttribute(target: Element, attr: object): void {
    
    if (!target.setAttribute) return;

    Object.keys(attr).forEach((key) => {
        target.setAttribute(key, attr[key]);
    });
}