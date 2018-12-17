import WspEditor from '../src/core/instance/index.ts';

import '../src/theme-default/index.less';

new WspEditor({
    id: 'app',
    uploadOption: {
        url: 'http://file.wspvideo.com/digitop/file/bulkUpload?token=sessionId:cce9a32c-b04d-420a-987d-f7a7307314d4',
        uploadFileName: 'file'
    }
});