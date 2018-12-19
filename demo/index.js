import WspEditor from '../src/core/instance/index.ts';

import '../src/theme-default/index.less';

let editor = new WspEditor({
    id: 'app',
    uploadOption: {
        url: 'http://file.wspvideo.com/digitop/file/bulkUpload?token=sessionId:92b4cb8f-9cfe-401e-be04-b38f842df1d6',
        uploadFileName: 'file'
    }
});

let $button = document.getElementById('button'),
    $content = document.getElementById('content');

$button.addEventListener('click', function() {
    $content.innerHTML = editor.getHtml();
});
