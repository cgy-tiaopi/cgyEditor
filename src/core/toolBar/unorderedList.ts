/*
*无序列表
*/
import WspEditor from '../instance';
import {
    createElement,
    execCommand
} from '../../util';


export default function createUnorderedList(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $redo: Element = createElement('label');
    $redo.innerHTML = '无序列表';

    $redo.addEventListener('click', function() {
        //检查当前光标所在地方是否有有序列表
        if (document.queryCommandState('insertOrderedList')) {
            return;
        }
        console.log(editor._currentRange);
        WspEditor.resetSelectionRange(editor._currentRange);

        execCommand('insertUnorderedList');
    });

    $toolBar.appendChild($redo);
}