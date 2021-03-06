import WspEditor from '../instance/index';
import { createElement, execCommand, clearCommonClass } from '../../util/index';

export default function createTitle(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $title:Element = createElement('label');
    $title.className = 'icon icon-title';


    $title.addEventListener('click',function(){
        WspEditor.resetSelectionRange(editor._currentRange);

        //判断工具栏标题选中状态
        let parentNode = this.parentNode;
        clearCommonClass(parentNode);
        
        if(this.className === 'icon icon-title-active'){
            //标题工具已经选中
            this.className = 'icon icon-title';
            if (WspEditor.getSelectionNode().tagName){
                //当标题文本为空时
                WspEditor.getSelectionNode().remove();
                execCommand('insertHTML', '<p><br></p>');
            }else{
                // 输入标题后取消标题工具
                let text = WspEditor.getSelectionNode();
                WspEditor.getSelectionNode().remove();
                execCommand('insertHTML', `<p>${text.nodeValue}</p>`);
            }
        }else{
            // 标题工具未选中
            let node = WspEditor.getSelectionNode().parentNode.tagName.toLowerCase();//获取光标所在的节点元素
            if (node === 'li' || node === 'ul' || node === 'ol' || node === 'b') {
                execCommand('insertHTML', '<p><br></p>');
            }
            execCommand('formatBlock', '<h1>');
            this.className = 'icon icon-title-active';
        }
    });

    $toolBar.appendChild($title);

}