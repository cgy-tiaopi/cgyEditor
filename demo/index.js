import WspEditor from '../src/core/instance/index.ts';

import '../src/theme-default/index.less';

let editor = new WspEditor({
    id: 'app',
    uploadOption: {
        url: 'http://file.wspvideo.com/digitop/file/bulkUpload?token=sessionId:92b4cb8f-9cfe-401e-be04-b38f842df1d6',
        uploadFileName: 'file'
    }
});

// editor.setHtml(`<div class="wsp-img-container" style="position: relative; width: 100%">
// <img src=" http://qiniu.wspvideo.com/1545289602341_%E6%B5%8B%E8%AF%95%E5%9B%BE%E7%89%87.jpeg?e=1860649602&amp;token=k4766khqOxj6vpQDJ9RV9IZ4dgCs94868VEnszUt:h1ZmuXF3IuOEmx5fKV57r6ifMzg=&amp;key=1545289602341_测试图片.jpeg "><span class="input-place-span"></span><span class="img-des" style="width: 100%; position: absolute; bottom: 5px; left: 0; width: 100%; background-color: rgba(0, 0, 0, 0.3);">测试上传</span>
// </div><p><br></p>`);

let $button = document.getElementById('button'),
    $content = document.getElementById('content');

$button.addEventListener('click', function() {
    $content.innerHTML = editor.getHtml();
});
