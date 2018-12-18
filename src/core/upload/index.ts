import {
    error,
    execCommand
} from '../../util';
import WspEditor from '../instance';
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
                        WspEditor.resetSelectionRange(self._currentRange);

                        //执行插入操作，插入复制的图片
                        execCommand('insertHTML', 
                            `<div class="wsp-img-container">
                                <img src=' ${ result.data[0] } ' style="width: 100%"/>
                                <input placeholder='图片描述(最多50字)' maxlength="50"/>
                            </div>
                            <p>
                                <br>
                            </p>`
                        );
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