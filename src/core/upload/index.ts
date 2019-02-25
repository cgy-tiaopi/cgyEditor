import {
    error,
    execCommand,
    createElement,
    setAttribute
} from '../../util/index';
import WspEditor from '../instance/index';
import { 
    initRange
} from '../instance/init';

interface WspEditorConstructor {
    new (options: any): WspEditor
}

interface ListItem {
    key: string,
    url: string
}

interface ResponseModel {
    list: Array<ListItem>
}

interface responseBody {
    code: number,
    errno: number,
    data: ResponseModel
}

export default function uploadMixin(editorConstructor: WspEditorConstructor) {
    editorConstructor.prototype._upload = function(file: File, options: any) {
        const fileType = file.type;
        if (WspEditor.allowUploadType.indexOf(fileType) === -1) {
            if (options && typeof options.errorCallback === 'function') {
                options.errorCallback({
                    code: '-1',
                    msg: '不支持的文件类型'
                });
            }
            return;
        }

        let self: WspEditor = this;
        let uploadOptions = this._options.uploadOption || {};

        // 创建formData对象，将文件存入formData中
        let formData = new FormData();
        formData.append(uploadOptions.uploadFileName || file.name, file);

        // 判断用户是否自己设置请求body
        let requestBody = uploadOptions.body;
        if (requestBody) {

            // 将用户设置的body以key-value的形式放入formData中
            Object.keys(requestBody).forEach(function(key) {
                formData.append(key, requestBody[key]);
            });
        }

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
                    if (result.code === 1) {

                        // 重置光标所处位置
                        WspEditor.resetSelectionRange(self._currentRange);

                        // 插入图片
                        insertImg(result.data.list[0].url);
                        
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
function insertImg(imgUrl: string) {
    //执行插入操作，插入上传的图片
    execCommand('insertHTML', 
        '<div class="wsp-img-container" style="positionRelative; width: 100%">'
        + '<img style="width: 100%" src=" ' + imgUrl + ' "/>'
        + '<input class="img-des-input" placeholder="图片描述(最多50字)" maxlength="50">'
        + '<span class="img-des" style="display: none; bottom: 5px; left: 0; width: 100%; background-color: rgba(0, 0, 0, 0.3); color: #fff; text-align: center; font-size: 20px; padding: 4px 0px; box-sizing: border-box;">'
        + '</span></div><p><br/></p>'
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