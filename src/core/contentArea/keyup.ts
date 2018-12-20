import WspEditor from "../instance";
import {
    initRange
} from '../instance/init';

export default function keyupEvent(elem: Element, editor: WspEditor) {
    elem.addEventListener('keyup', function(e: KeyboardEvent) {

        //如果按下的是撤回键，
        e.keyCode === 8 ? backUpEvent(editor) : '';

        if (e.keyCode === 8) {
            listenChange(editor);
        }
    }); 
}

//撤回键按下事件
function backUpEvent(editor: WspEditor) {
    let range: Range = WspEditor.getSelectionRange();
    let $node: Element = < Element >range.endContainer,
        $contentArea = editor.$contentArea;

    if ($contentArea.innerHTML === '') {
        $contentArea.innerHTML = '<p><br></p>';
        initRange(editor);
    }

    console.log(range);

    //判断当前光标所处的节点是否为元素节点
    if ($node.nodeType === 1) {
        let className = $node.getAttribute('class'),
            $parentNode = $node.parentElement;

        if (className === 'wsp-img-container') {
            $parentNode.removeChild($node);
            if ($parentNode.childElementCount === 0) {
                $parentNode.innerHTML = '<p><br></p>';
                initRange(editor);
            }
        }
    }
}

//监听文本变化，取消选中的工具栏标签
function listenChange(editor: WspEditor) {
    //动态监听有序列表
    if (!document.queryCommandState('insertOrderedList')) {
        let childNodes = editor.$toolBar.childNodes;
        childNodes.forEach(function (value) {
            let $elem: Element = void 0;
            if (value.nodeType === 1) {
                $elem = < Element >value;
            }
            if ($elem.textContent === '有序列表') {
                $elem.className = '';
            }
        })
    }

    //动态监听无序列表
    if (!document.queryCommandState('insertUnorderedList')) {
        let childNodes = editor.$toolBar.childNodes;
        childNodes.forEach(function (value) {
            let $elem: Element = void 0;
            if (value.nodeType === 1) {
                $elem = < Element >value;
            }
            if ($elem.textContent === '无序列表') {
                $elem.className = '';
            }
        })
    }
}