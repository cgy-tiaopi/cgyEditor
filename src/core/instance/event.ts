import WspEditor from ".";
import  {
    getElementByClass
} from '../../util';

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

        html = html.replace(inputRE, '<span class="input-place-span"></span>')
        .replace(emptySpanRE, '<span class="empty-span"></span>')
        .replace(noneRE, 'width: 100%; position: absolute; bottom: 5px; left: 0; width: 100%; background-color: rgba(0, 0, 0, 0.3)')
        .replace(positionRelativeRE, 'position: relative');

        return html;
    };

    WspEditor.prototype.setHtml = function(html: string) {
        let self = this;
        
        const endPRE = /<\/p>$/g;
        const inputPlaceSpanRE = /<span class="input-place-span"><\/span>/g;
        const emptySpanRE = /<span class="empty-span"><\/span>/g;
        const hideSpanRE = /width: 100%; position: absolute; bottom: 5px; left: 0; width: 100%; background-color: rgba\(0, 0, 0, 0.3\)/g;

        //如果结尾元素不是</p>，则在尾部添加</p>
        if (!endPRE.test(html)) {
            html = html + '<p><br></p>';
        } 

        console.log(hideSpanRE.test(html));

        html = html.replace(inputPlaceSpanRE, '<input class="img-des-input" placeholder="图片描述(最多50字)" maxlength="50">');
        html = html.replace(emptySpanRE, '<span class="img-des" style="display: none"></span>');
        html = html.replace(hideSpanRE, 'display: none');

        self.$contentArea.innerHTML = html;

        bindInputEvent(self);
    }
}

//绑定输入框事件
function bindInputEvent(editor: WspEditor) {
    let $imgContainerList = getElementByClass('wsp-img-container');

    console.log($imgContainerList);

    Object.keys($imgContainerList).forEach(function(key) {
        let $imgContainer = < Element >$imgContainerList[key];

        if ($imgContainer.nodeType === 1) {

            let $childNodes = $imgContainer.childNodes,
                $input: HTMLInputElement = void 0,
                $span: HTMLSpanElement = void 0;
            Object.keys($childNodes).forEach(function(key) {
                let $node = $childNodes[key];
                console.log($node);
                if ($node.nodeType === 1) {
                    $node.className === 'img-des-input' ? $input = $node : '';
                    $node.className === 'img-des' ? $span = $node : '';
                }
            });

            $input.addEventListener('input', function() {
                $span.innerText = $input.value;
            });
        }
    });
}