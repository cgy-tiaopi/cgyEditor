import WspEditor from '../instance';
import {
    createElement,
    execCommand,
    setAttribute
} from '../../util';


export default function createFileImport(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $createFile: Element = createElement('label');
    $createFile.innerHTML = '文件插入';

    let $fileInput: Element = createElement('input');
    setAttribute($fileInput, {
        type: 'file',
        class: 'display-none'
    });

    $createFile.appendChild($fileInput);
    $toolBar.appendChild($createFile);
}