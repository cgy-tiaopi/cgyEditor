import WspEditor from '../instance/index';
import { createElement, execCommand } from '../../util/index';

export default function createBold(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $bold: Element = createElement('label');
    $bold.className = "icon icon-bold";

    let oldRangeStart = 0;//保存输入之前的光标

    $bold.addEventListener('click', function () {
        WspEditor.resetSelectionRange(editor._currentRange);
        if (editor._currentRange.startOffset === editor._currentRange.endOffset && editor._currentRange.startOffset === oldRangeStart){
            // range起止位置相同，无拖蓝 且 点击加粗前无输入文本
            if (this.className.indexOf('icon-bold-active') != -1) {
                // 当前加粗状态
                WspEditor.resetSelectionRange(editor._currentRange);    //重置光标以使指令失效
                this.className = 'icon icon-bold';
                oldRangeStart = editor._currentRange.startOffset;
            } else {
                // 当前未加粗状态
                execCommand('bold');
                this.className = 'icon icon-bold-active';
                oldRangeStart = editor._currentRange.startOffset;
            }
        }else{
            // 选择文本，有拖蓝
            execCommand('bold');
            if (document.queryCommandState('bold')) {
                this.className = 'icon icon-bold-active';
            } else {
                this.className = 'icon icon-bold';
            }
            oldRangeStart = editor._currentRange.startOffset;
        }
        // console.log('后queryCommandState--', document.queryCommandState('bold'));

    });

    $toolBar.appendChild($bold);

}