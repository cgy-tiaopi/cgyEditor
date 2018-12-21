import WspEditor from "../instance/index";

export default function focusEvent(elem: Element, editor: WspEditor) {
    elem.addEventListener('blur', function(e) {
        let range = WspEditor.getSelectionRange();
        editor._currentRange = range;
    });
}