import WspEditor from "../instance";
import {
    initRange
} from '../instance/init';

export default function keyupEvent(elem: Element, editor: WspEditor) {
    elem.addEventListener('keyup', function(e: KeyboardEvent) {

        //如果按下的是撤回键，
        e.keyCode === 8 ? backUpEvent(editor) : '';
    }); 
}

//撤回键按下事件
function backUpEvent(editor: WspEditor) {
    let range: Range = WspEditor.getSelectionRange();
    let $node: Element = < Element >range.endContainer;

    //判断当前光标所处的节点是否为元素节点
    if ($node.nodeType === 1) {
        let className = $node.getAttribute('class');
        if (className === 'wsp-img-container') {
            let $parentNode = $node.parentElement;
            $parentNode.removeChild($node);
            if ($parentNode.childElementCount === 0) {
                $parentNode.innerHTML = '<p><br></p>';
                initRange(editor);
            }
        }
    }
}