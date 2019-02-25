import WspEditor from "../instance/index";
import { 
    createElement,
    execCommand
 } from "../../util/index";

export default function pasteEvent(elem: Element, options: any, editor: WspEditor) {
    elem.addEventListener('paste', function(e: ClipboardEvent) {

        //阻止原生事件执行
        e.preventDefault();

        if (!e.clipboardData && e.clipboardData.items) {
            return;
        }
        
        let clipboardData: DataTransfer = e.clipboardData,
            clipboardText: string = '',
            imgFile: Array < File > = [ ];
        
        //复制时先获取文字
        clipboardText = clipboardData.getData('text/plain');
        
        //如果有文字则不处理图片
        if (clipboardText) {

            //把文字中的换行符替换为<br>
            clipboardText = clipboardText.replace(/\n/gm, '<br>');

            //执行插入操作，插入复制的文字
            execCommand('insertHTML', clipboardText);

        } else {
            let items = clipboardData.items;
            if (!items) {
                return ;
            }

            for (let i = 0, len = items.length; i < len; i++) {
                let item = items[i];
                if (item.kind === 'file') {
                    let f = item.getAsFile();
                    imgFile.push(f);
                }
            }

            for (let file of imgFile) {
                editor._upload(file, options);
            }
        }
    });
}
