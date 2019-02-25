
//获取selection对象方法
export function getSelection(): Selection {
    if (window.getSelection) {
        return window.getSelection();
    } else {
        return document.getSelection();
    }
}

//获取selection对象所选区域方法
export function getSelectionRange(): Range {
    let range = getSelection().getRangeAt(0);
    return range;
}

//重置光标选中区域到上一次失去焦点的位置
export function resetSelectionRange(range: Range): void {
    let selection = getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}

//获取光标所处位置的节点
export function getSelectionNode(): Node {
    let elem = getSelectionRange().commonAncestorContainer;
    return elem;
}

