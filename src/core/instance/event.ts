import WspEditor from "./index";
import  {
    getElementByClass
} from '../../util/index';

interface WspEditorConstructor {
    new (options: any): WspEditor
}

export function eventMixin(WspEditor: WspEditorConstructor) {
    WspEditor.prototype.getHtml = function() {
        let self = this,
            html = self.$contentArea.innerHTML;

        const inputRE = /<input class="img-des-input" placeholder="图片描述\(最多50字\)" maxlength="50">/g;
        const emptySpanRE = /<span class="img-des" style="display: none"><\/span>/g;
        const noneRE = /display: none/g;
        const positionRelativeRE = /positionRelative/g;
        const imgSrcRE = /src="(.*?)"/g;

        html = html.replace(inputRE, '<span class="input-place-span"></span>')
        .replace(emptySpanRE, '<span class="empty-span"></span>')
        .replace(noneRE, 'position: absolute')
        .replace(positionRelativeRE, 'position: relative');
        
        let tempR: any,
            imgList: Array<string> = [];

        while(tempR = imgSrcRE.exec(html)) {
            imgList.push(tempR[1]);
        }

        return {
            content: html,
            imgList: imgList
        };
    };

    WspEditor.prototype.setHtml = function(html: string) {
        let self = this;
        const endPRE = /<\/p>$/g;
        const inputPlaceSpanRE = /<span class="input-place-span"><\/span>/g;
        const emptySpanRE = /<span class="empty-span"><\/span>/g;
        const hideSpanRE = /position: absolute;/g;

        //如果结尾元素不是</p>，则在尾部添加</p>
        if (!endPRE.test(html)) {
            html = html + '<p><br></p>';
        } 

        html = html.replace(inputPlaceSpanRE, '<input class="img-des-input" placeholder="图片描述(最多50字)" maxlength="50">');
        html = html.replace(emptySpanRE, '<span class="img-des" style="display: none"></span>');
        html = html.replace(hideSpanRE, 'display: none;');

        self.$contentArea.innerHTML = html;

        bindInputEvent(self);
    }
}

//绑定输入框事件
function bindInputEvent(editor: WspEditor) {
    let $imgContainerList = getElementByClass('wsp-img-container');

    Object.keys($imgContainerList).forEach(function(key: any) {
        let $imgContainer = < Element >$imgContainerList[key];

        if ($imgContainer.nodeType === 1) {

            let $childNodes = $imgContainer.childNodes,
                $input: any = null,
                $span: any = null;
            Object.keys($childNodes).forEach(function(key: any) {
                let $node: Element = <Element>$childNodes[key];
                if ($node.nodeType === 1) {
                    $node.className === 'img-des-input' ? $input = <HTMLInputElement>$node : '';
                    $node.className === 'img-des' ? $span = <HTMLSpanElement>$node : '';
                }
            });
            
            $input.value = $span.innerHTML;
            $input.addEventListener('input', function() {
                $span.innerText = $input.value;
            });
        }
    });
}