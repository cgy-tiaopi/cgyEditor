import WspEditor from '../instance/index';
import {
    createElement,
    execCommand
} from '../../util/index';


export default function createRedo(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $redo: Element = createElement('label');
    $redo.className = 'icon icon-redo';

    $redo.addEventListener('click', function() {
        execCommand('redo');
    });

    $toolBar.appendChild($redo);
}