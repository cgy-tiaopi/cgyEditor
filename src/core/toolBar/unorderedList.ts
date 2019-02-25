/*
*无序列表
*/
import WspEditor from '../instance/index';
import {
    createElement,
    execCommand,
    clearCommonClass,
    notify
} from '../../util/index';


export default function createUnorderedList(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $unOrderList: Element = createElement('label');
    $unOrderList.className = "icon icon-unorderList";

    notify.add('cancelUnOrder', function() {
        $unOrderList.className = 'icon icon-unorderList'
    });

    $unOrderList.addEventListener('click', function() {
        WspEditor.resetSelectionRange(editor._currentRange);

        execCommand('insertUnorderedList');

        //控制现实隐藏样式
        let parentNode = this.parentNode;
        clearCommonClass(parentNode);

        if (document.queryCommandState('insertUnorderedList')) {
            this.className='icon icon-unorderList-active';

            // 取消有序队列的选中状态
            notify.trigger('cancelOrder');
            
        } else {
            this.className='icon icon-unorderList';
        }
    });

    $toolBar.appendChild($unOrderList);
}