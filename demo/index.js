import WspEditor from '../src/core/instance/index.ts';

import '../src/theme-default/index.less';

new WspEditor({
    id: 'app',
    uploadOption: {
        url: 'http://file.wspvideo.com/digitop/file/bulkUpload?token=sessionId:49fcb40b-53fe-400b-915e-879fc8c4a779',
        uploadFileName: 'file'
    }
});