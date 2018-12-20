import {
    error,
    execCommand,
    createElement,
    setAttribute
} from '../../util';
import WspEditor from '../instance';
import { 
    initRange
} from '../instance/init';

interface WspEditorConstructor {
    new (options: any): WspEditor
}

interface responseBody {
    errno: number,
    data: Array<string>
}

export default function uploadMixin(editorConstructor: WspEditorConstructor) {
    editorConstructor.prototype._upload = function(file: File) {
        let self: WspEditor = this;
        let uploadOptions = this._options.uploadOption || {};

        let formData = new FormData();
        formData.append(uploadOptions.uploadFileName || file.name, file);

        let xhr = new XMLHttpRequest(); 
        try {
            if (uploadOptions.url === undefined) {
                throw 'uploadUrl not exist';
            }
            xhr.open('POST', uploadOptions.url);

            //设置超时时间
            xhr.timeout = 30000;

            //如果有自定义请求头
            uploadOptions.uploadHeader ? setHeader(uploadOptions.uploadHeader, xhr) : '';

            xhr.onreadystatechange = function() {
                let result:responseBody = void 0;

                if (xhr.readyState === 4) {
                    if (xhr.status < 200  && xhr.status >= 300) {
                        uploadOptions.failHooks ? uploadOptions.failHooks(xhr) : '';
                    }
                    result = JSON.parse(xhr.responseText);

                    if (result.errno === 0) {

                        //重置光标所处位置
                        WspEditor.resetSelectionRange(self._currentRange);

                        insertImg(result.data[0]);
                        
                        uploadOptions.successHooks ? uploadOptions.successHooks(xhr) : '';
                    }
                }
            }
            xhr.send(formData);

        } catch(err) {
            error(err);
        }
    }
}

function setHeader(headers: any, xhr: XMLHttpRequest) {
    Object.keys(headers).forEach(function(key) {
        xhr.setRequestHeader(key, headers[key]);
    }) ;
}

//插入图片方法
function insertImg(imgUrl) {

    //执行插入操作，插入上传的图片
    execCommand('insertHTML', 
        `<div class="wsp-img-container" style="positionRelative; width: 100%">
            <img src=" ${ imgUrl } "/><input class="img-des-input" placeholder="图片描述(最多50字)" maxlength="50"><span class="img-des" style="display: none;"></span>
        </div><p><br/></p>`
    );

    //获取到当前光标所处的元素
    let $elem = < HTMLElement >WspEditor.getSelectionNode(),
        $imgContainer = < HTMLElement >$elem.previousSibling;

    //遍历查找带有wsp-img-container类的元素
    while($imgContainer) {
        if ($imgContainer.getAttribute('class') === 'wsp-img-container') {
            break;
        }
        $imgContainer = < HTMLElement >$imgContainer.previousSibling;
    };

    let $childNodeList = $imgContainer.childNodes,
        $input: HTMLInputElement = void 0,
        $imgDes: HTMLSpanElement = void 0;

    Object.keys($childNodeList).forEach(function(key) {
        let $node: HTMLElement = $childNodeList[key];
        if ($node.nodeType === 1) {
            $node.getAttribute('class') === 'img-des-input' ? $input = < HTMLInputElement >$node : '';
            $node.getAttribute('class') === 'img-des' ? $imgDes = < HTMLSpanElement >$node : '';
        }
    });

    $input.addEventListener('input', function() {
        $imgDes.innerText = $input.value;
    });
}