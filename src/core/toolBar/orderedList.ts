/*
*有序列表
*/
import WspEditor from '../instance/index';
import {
    createElement,
    execCommand,
    clearCommonClass,
    notify,
} from '../../util/index';


export default function createOrderedList(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $orderList: Element = createElement('label');
    $orderList.className = "icon icon-orderList";

    // 向观察者模式发送取消有序列表事件
    notify.add('cancelOrder', function() {
        console.log($orderList);
        $orderList.className = 'icon icon-orderList';
    });

    $orderList.addEventListener('click', function() {

        WspEditor.resetSelectionRange(editor._currentRange);

        execCommand('insertOrderedList');

        //控制现实隐藏样式
        let parentNode = this.parentNode;
        clearCommonClass(parentNode);
        if (document.queryCommandState('insertOrderedList')) {
            this.className='icon icon-orderList-active';
            
            // 取消无序队列的选中状态
            notify.trigger('cancelUnOrder');

        } else {
            this.className='icon icon-orderList';

        }
    });

    $toolBar.appendChild($orderList);
}