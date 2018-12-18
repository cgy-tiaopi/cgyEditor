
import { initMixin } from './init';
import uploadMixin from '../upload';
import {
    error
} from '../../util';

import {
    getSelection,
    getSelectionRange,
    getSelectionNode
} from '../global-api/selection';

const VERSION = '1.0.0';

class WspEditor {
    
    _init: Function;            //初始化方法
    _options: any;              //初始化参数
    _upload: Function;          //文件上传方法
    _currentRange: Range;         //光标选中范围
    $titleInput: Element;       //标题输入dom节点
    $toolBar: Element;          //工具栏dom节点      
    $contentArea: Element;      //内容输入框dom节点

    //静态方法
    static version: string = VERSION;

    //光标操作方法
    static getSelection: Function = getSelection;
    static getSelectionRange: Function = getSelectionRange;
    static getSelectionNode: Function = getSelectionNode;

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
