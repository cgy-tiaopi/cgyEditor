
import { initMixin } from './init';
import uploadMixin from '../upload';
import {
    error
} from '../../util';


class WspEditor {
    
    _init: Function;            //初始化方法
    _upload: Function;          //文件上传方法
    $titleInput: Element;       //标题输入dom节点
    $toolBar: Element;         
    $contentArea: Element;
    isClean: boolean;
    _options: any;
    

    constructor(options:any) {
        if (!(this instanceof WspEditor )) {
            error('请使用new方法初始化wspeditor实例');
            return;
        }
        this._options = options;
        this._init(options);
    }
}

initMixin(WspEditor);
uploadMixin(WspEditor);

export default WspEditor;
