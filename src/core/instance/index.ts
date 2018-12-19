
import { initMixin } from './init';
import uploadMixin from '../upload';
import { eventMixin } from './event';
import {
    error
} from '../../util';

import {
    getSelection,
    getSelectionRange,
    getSelectionNode,
    resetSelectionRange
} from '../global-api/selection';

const VERSION = '1.0.0';

class WspEditor {
    
    //私有方法
    _init: Function;            //初始化方法
    _options: any;              //初始化参数
    _upload: Function;          //文件上传方法
    _currentRange: Range;       //光标选中范围

    //dom节点
    $titleInput: Element;       //标题输入dom节点
    $toolBar: Element;          //工具栏dom节点      
    $contentArea: Element;      //内容输入框dom节点

    //公有方法
    getHtml: Function;          //获取编辑器内当前文档内容
    setHtml: Function;          //设置编辑器内显示的文档

    //静态方法
    static version: string = VERSION;

    //光标操作方法
    static getSelection: Function = getSelection;
    static getSelectionRange: Function = getSelectionRange;
    static getSelectionNode: Function = getSelectionNode;
    static resetSelectionRange: Function = resetSelectionRange;

    constructor(options: any) {
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
eventMixin(WspEditor);

export default WspEditor;
