import WspEditor from '../instance';
import { createElement, execCommand } from '../../util';

export default function createBold(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $bold: Element = createElement('label');
    $bold.innerHTML = '加粗';

    $bold.addEventListener('click', function () {
        WspEditor.resetSelectionRange(editor._currentRange);
        execCommand('bold');
        console.log('queryCommandState--', document.queryCommandState('bold'));
        if (document.queryCommandState('bold')) {
            this.className = 'active';
        } else {
            this.className = '';
        }
    });

    $toolBar.appendChild($bold);

}