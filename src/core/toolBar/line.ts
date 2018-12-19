import WspEditor from '../instance';
import { createElement, execCommand } from '../../util';

export default function createLine(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $line:Element = createElement('label');
    $line.innerHTML = '分割线';

    $line.addEventListener('click',function(){
        WspEditor.resetSelectionRange(editor._currentRange);
        execCommand('insertHorizontalRule');
        execCommand('insertHTML', '<p><br></p>');
    });

    $toolBar.appendChild($line);

}