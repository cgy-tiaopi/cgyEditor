import WspEditor from '../instance';
import { createElement, execCommand } from '../../util';

export default function createBold(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $bold: Element = createElement('label');
    $bold.innerHTML = '加粗';

    let oldRangeStart = 0;//保存输入之前的光标

    $bold.addEventListener('click', function () {
        WspEditor.resetSelectionRange(editor._currentRange);

        if (editor._currentRange.startOffset === editor._currentRange.endOffset && editor._currentRange.startOffset === oldRangeStart){
            // range起止位置相同，无拖蓝 且 点击加粗前无输入文本
            if (this.className === 'bold') {
                // 当前加粗状态
                WspEditor.resetSelectionRange(editor._currentRange);    //重置光标以使指令失效
                this.className = '';
                oldRangeStart = editor._currentRange.startOffset;
            } else {
                // 当前未加粗状态
                execCommand('bold');
                this.className = 'bold';
                oldRangeStart = editor._currentRange.startOffset;
            }
        }else{
            // 选择文本，有拖蓝
            execCommand('bold');
            if (document.queryCommandState('bold')) {
                this.className = 'bold';
            } else {
                this.className = '';
            }
            oldRangeStart = editor._currentRange.startOffset;
        }
        // console.log('后queryCommandState--', document.queryCommandState('bold'));

    });

    $toolBar.appendChild($bold);

}