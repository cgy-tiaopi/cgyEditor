import WspEditor from "../instance/index";

export default function focusEvent(elem: Element, editor: WspEditor) {
    // 监听编辑器失去焦点事件
    elem.addEventListener('blur', function(e) {

        // 当编辑器失去焦点时记录光标所处的位置
        let range = WspEditor.getSelectionRange();
        editor._currentRange = range;
    });
}