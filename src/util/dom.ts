
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

export function insertHTML(value: any): void {
    //判断浏览器是否支持insertHTML编辑指令
    if (document.queryCommandSupported('insertHTML')) {
        document.execCommand('insertHTML', false, value);
    } 
}