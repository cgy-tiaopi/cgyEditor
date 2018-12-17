
//获取selection对象方法
export function getSelection():Selection {
    if (window.getSelection) {
        return window.getSelection();
    } else if (window.document.getSelection) {
        return document.getSelection();
    }
}

//获取selection对象所选区域方法
export function getSelectionRange(): Range {
    let range = getSelection().getRangeAt(0);
    return range;
}

//获取光标所处位置的节点
export function getSelectionNode(): Node {
    let elem = getSelectionRange().commonAncestorContainer;
    return elem;
}