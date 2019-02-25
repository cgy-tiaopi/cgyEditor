import WspEditor from '../instance/index';
import {
    createElement,
    execCommand
} from '../../util/index';


export default function createUndo(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $undo: Element = createElement('label');
    $undo.className = 'icon icon-undo';

    $undo.addEventListener('click', function() {
        execCommand('undo');
    });

    $toolBar.appendChild($undo);
}