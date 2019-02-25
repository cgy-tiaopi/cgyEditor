import WspEditor from '../instance/index';
import {
    createElement,
    setAttribute,
} from '../../util/index';


export default function createFileImport(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $createFile: Element = createElement('label');
    $createFile.className = 'icon icon-img';

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
            editor._upload(file, options);
        })
    })

    $createFile.appendChild($fileInput);
    $toolBar.appendChild($createFile);
}