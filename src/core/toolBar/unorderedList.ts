/*
*无序列表
*/
import WspEditor from '../instance';
import {
    createElement,
    execCommand,
    clearCommonClass
} from '../../util';


export default function createUnorderedList(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $redo: Element = createElement('label');
    $redo.innerHTML = '无序列表';

    $redo.addEventListener('click', function() {
        WspEditor.resetSelectionRange(editor._currentRange);

        execCommand('insertUnorderedList');

        //控制现实隐藏样式
        let parentNode = this.parentNode;
        clearCommonClass(parentNode);

        if (document.queryCommandState('insertUnorderedList')) {
            this.className='active';
        } else {
            this.className='';
        }
    });

    $toolBar.appendChild($redo);
}