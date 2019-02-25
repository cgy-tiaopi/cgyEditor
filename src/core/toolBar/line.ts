import WspEditor from '../instance/index';
import { createElement, execCommand } from '../../util/index';

export default function createLine(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $line:Element = createElement('label');
    $line.className = "icon icon-line";

    $line.addEventListener('click',function(){
        WspEditor.resetSelectionRange(editor._currentRange);
        execCommand('insertHorizontalRule');
        execCommand('insertHTML', '<p><br></p>');
    });

    $toolBar.appendChild($line);

}