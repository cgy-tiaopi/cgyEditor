import WspEditor from '../instance';
import {
    createElement,
    setAttribute,
} from '../../util';


export default function createFileImport(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $createFile: Element = createElement('label');
    $createFile.innerHTML = '文件插入';

    let $fileInput: HTMLInputElement = <HTMLInputElement>createElement('input');
    setAttribute($fileInput, {
        type: 'file',
        class: 'display-none',
        multiple: true
    });

    $fileInput.addEventListener('change', function(e: Event) {
        let fileList: FileList = $fileInput.files;

        Object.keys(fileList).forEach(function(key) {
            let file: File = fileList[key];
            editor._upload(file);
        })
    })

    $createFile.appendChild($fileInput);
    $toolBar.appendChild($createFile);
}