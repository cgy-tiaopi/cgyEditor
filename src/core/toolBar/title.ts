import WspEditor from '../instance';
import { createElement, execCommand } from '../../util';

export default function createTitle(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $title:Element = createElement('label');
    $title.innerHTML = '标题';

    $title.addEventListener('click',function(){
        WspEditor.resetSelectionRange(editor._currentRange);
        execCommand('formatBlock','<h1>');
    });

    $toolBar.appendChild($title);

}