import WspEditor from "../instance";

export default function keydownEvent(elem: Element, editor: WspEditor) {
    elem.addEventListener('keydown', function(e: any) {
        let elemHtml = elem.innerHTML;
        
        e.keyCode === 8 && elemHtml === "<p><br></p>" ? e.preventDefault() : '';
    });
}