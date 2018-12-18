import WspEditor from "../instance";

export default function focusEvent(elem: Element, editor: WspEditor) {
    elem.addEventListener('blur', function(e) {
        console.log('失去焦点---');
        
    });
}