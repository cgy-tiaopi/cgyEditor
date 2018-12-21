import WspEditor from "../instance/index";

export default function keydownEvent(elem: Element, editor: WspEditor) {
    elem.addEventListener('keydown', function(e: any) {
        let elemHtml = editor.$contentArea.innerHTML;

        if (e.keyCode === 8 && elemHtml === "<p><br></p>") {
            e.preventDefault();
            return;
        }
        
        // e.keyCode === 8 && elemHtml === "<p><br></p>" ? e.preventDefault() : '';
    });
}