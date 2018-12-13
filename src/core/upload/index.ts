

export default function uploadMixin(WspEditor) {
    WspEditor.prototype._upload = function(uploadList: [ File ]) {
        let uploadOptions = this._options.uploadOption;

        let xhr = new XMLHttpRequest(); 
         xhr.open('POST', uploadOptions.url);

        //设置超时时间
        xhr.timeout = 30000;

        //如果有自定义请求头
        uploadOptions.uploadHeader ? setHeader(uploadOptions.uploadHeader, xhr) : '';

        
    }
}

function setHeader(headers: any, xhr: XMLHttpRequest) {
    Object.keys(headers).forEach(function(key) {
        xhr.setRequestHeader(key, headers[key]);
    }) ;
}