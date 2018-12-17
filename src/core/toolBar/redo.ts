import WspEditor from '../instance';
import {
    createElement,
    execCommand
} from '../../util';


export default function createRedo(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $redo: Element = createElement('label');
    $redo.innerHTML = '恢复';

    $redo.addEventListener('click', function() {
        execCommand('redo');
    });

    $toolBar.appendChild($redo);
}