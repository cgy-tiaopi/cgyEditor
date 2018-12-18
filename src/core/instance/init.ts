
import {
    error,
    isEmpty,
    isString,
    createElement,
    getElementById,
    setAttribute
} from '../../util';

import addUserOperation from '../toolBar';
import bindEvent from '../contentArea';

import WspEditor from '.';

export function initMixin(WspEditor) {
    WspEditor.prototype._init = function(options) {

        let _editor: WspEditor = this;

        if (!options || isEmpty(options.id)) {
            error('初始化参数中缺少绑定id字段');
            return;
        }

        //初始化编辑器
        initEditor(options, _editor);
    }
}

function initEditor(options: any, editor: WspEditor) {
    let containerId = options.id;

    //判断生成容器Id是否传入
    if (!isString(containerId)) {
        error('id不是一个字符串');
    }

    let $container = getElementById(containerId);
    let $editor = createElement('div');

    $container.appendChild($editor);

    setAttribute($editor, {
        class: "wsp-editor"
    });

    //初始化标题输入框
    editor.$titleInput = initTitleInput($editor);

    //初始化工具栏
    editor.$toolBar = initToolBar($editor);
    addUserOperation(options, editor);

    //初始化内容输入框
    editor.$contentArea = initContentArea($editor);
    bindEvent(options, editor);

    //初始化光标位置
    initRange(editor);
}

function initTitleInput(parentNode: Element) {
    let $titleInput = createElement('input');

    setAttribute($titleInput, {
        placeholder: "标题",
        class: "wsp-title-input"
    });

    parentNode.appendChild($titleInput);

    return $titleInput;
}

function initToolBar(parentNode: Element) {
    let $toolBar = createElement('div');

    setAttribute($toolBar, {
        class: 'wsp-tool-bar'
    });

    parentNode.appendChild($toolBar);

    return $toolBar;
}

function initContentArea(parentNode: Element) {
    let $contentArea = createElement('div');

    setAttribute($contentArea, {
        contentEditable: true,
        class: 'wsp-content-area'
    });

    $contentArea.innerHTML = "<p><br></p>";

    parentNode.appendChild($contentArea);

    return $contentArea;
}

export function initRange(editor: WspEditor) {
    let range = document.createRange();
    let selection = document.getSelection();
    
    range.selectNodeContents(editor.$contentArea);
    selection.removeAllRanges();
    selection.addRange(range);

    editor._currentRange = range;
} 