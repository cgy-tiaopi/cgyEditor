/*
*有序列表
*/
import WspEditor from '../instance';
import {
    createElement,
    execCommand
} from '../../util';


export default function createOrderedList(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $redo: Element = createElement('label');
    $redo.innerHTML = '  有序列表';

    $redo.addEventListener('click', function() {
        //检查当前光标所在地方是否有有序列表
        if (document.queryCommandState('insertOrderedList')) {
            return;
        }
        console.log(editor._currentRange);
        WspEditor.resetSelectionRange(editor._currentRange);

        execCommand('insertOrderedList');

        // let lists = document.querySelectorAll("ol, ul");
        // for (let i = 0; i < lists.length; i++) {
        //     let ele = lists[i]; // ol
        //     let parentNode = ele.parentNode;
        //     console.log(ele);
        //     console.log(parentNode.lastChild);
        //     // if (parentNode.tagName === 'P' && parentNode.lastChild === parentNode.firstChild) {
        //     //     parentNode.insertAdjacentElement('beforebegin', ele);
        //     //     parentNode.remove()
        //     // }
        // }

    });

    $toolBar.appendChild($redo);
}