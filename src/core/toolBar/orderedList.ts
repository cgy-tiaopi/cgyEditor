/*
*有序列表
*/
import WspEditor from '../instance/index';
import {
    createElement,
    execCommand,
    clearCommonClass
} from '../../util/index';


export default function createOrderedList(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $redo: Element = createElement('label');
    $redo.innerHTML = '有序列表';

    $redo.addEventListener('click', function() {

        WspEditor.resetSelectionRange(editor._currentRange);

        execCommand('insertOrderedList');

        //控制现实隐藏样式
        let parentNode = this.parentNode;
        clearCommonClass(parentNode);
        if (document.queryCommandState('insertOrderedList')) {
            this.className='active';
        } else {
            this.className='';

        }

        // let lists = document.querySelectorAll("ol");
        // for (let i = 0; i < lists.length; i++) {
        //     let ele = lists[i]; // ol
        //     let parentNode = ele.parentNode;
        //     console.log(parentNode);
        //     if (parentNode.nodeName === 'P') {
        //         console.log('in');
        //         console.log(parentNode);
        //         console.log(parentNode.previousSibling);
        //         parentNode.previousSibling.appendChild(ele);
        //         parentNode.parentNode.removeChild(parentNode);
        //     }
        // }

    });

    $toolBar.appendChild($redo);
}