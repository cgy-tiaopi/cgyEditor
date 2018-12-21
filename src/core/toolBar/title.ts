import WspEditor from '../instance';
import { createElement, execCommand, clearCommonClass } from '../../util';

export default function createTitle(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $title:Element = createElement('label');
    $title.innerHTML = '标题';

    $title.addEventListener('click',function(){
        WspEditor.resetSelectionRange(editor._currentRange);

        //判断工具栏标题选中状态
        let parentNode = this.parentNode;
        clearCommonClass(parentNode);
        
        if(this.className === 'title'){
            //标题工具已经选中
            this.className = '';
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
            if (node === 'li' || node === 'ul' || node === 'ol') {
                execCommand('insertHTML', '<p><br></p>');
            }
            execCommand('formatBlock', '<h1>');
            this.className = 'title';
        }
    });

    $toolBar.appendChild($title);

}