import WspEditor from '../instance';
import {
    createElement,
    execCommand
} from '../../util';


export default function createUndo(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $undo: Element = createElement('label');
    $undo.innerHTML = '撤销';

    $undo.addEventListener('click', function() {
        execCommand('undo');
    });

    $toolBar.appendChild($undo);
}