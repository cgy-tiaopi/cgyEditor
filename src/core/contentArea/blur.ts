import WspEditor from "../instance";

export default function focusEvent(elem: Element, editor: WspEditor) {
    elem.addEventListener('blur', function(e) {
        let range = WspEditor.getSelectionRange();
        editor._currentRange = range;
    });
}