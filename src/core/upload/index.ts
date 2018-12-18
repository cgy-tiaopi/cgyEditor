
import {
    error,
    execCommand
} from '../../util';
import WspEditor from '../instance';

interface responseBody {
    errno: number,
    data: Array<string>
}

export default function uploadMixin(WspEditor) {
    WspEditor.prototype._upload = function(file: File) {
        let self = this,
            uploadOptions = this._options.uploadOption || {};

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

                        //执行插入操作，插入复制的图片
                        execCommand('insertHTML', `<img src=' ${ result.data[0] } '/>`);
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