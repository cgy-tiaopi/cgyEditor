import WspEditor from '../instance';
import { createElement, execCommand } from '../../util';
import { resetSelectionRange} from '../global-api/selection'

export default function createTitle(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $title:Element = createElement('label');
    $title.innerHTML = '标题';

    $title.addEventListener('click',function(){
        resetSelectionRange(editor._currentRange);
        execCommand('formatBlock','<h1>');
    });

    $toolBar.appendChild($title);

}