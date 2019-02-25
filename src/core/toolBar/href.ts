import WspEditor from '../instance/index';
import { 
    createElement, 
    execCommand,
    setAttribute,
    notify
} from '../../util/index';

export default function createHref(options: any, editor: WspEditor) {
    let $toolBar = editor.$toolBar;

    let $href: Element = createElement('label');

    setAttribute($href, {
        class: 'icon icon-insert'
    });
    
    let $hrefInputWrap = createHrefInput(),
        isShowInput = false;

    notify.add('closeHrefDialog', function() {
        let value = arguments[0] ? arguments[0] : null;
        if (value) {

            // 重置光标所处的位置
            WspEditor.resetSelectionRange(editor._currentRange);

            // 在光标位置处执行插入指令
            execCommand('insertHTML', 
                '<a href=' + value.linkValue +'>' + value.contentValue + '</a>');
        }
        isShowInput = false;
        editor.$toolBar.removeChild($hrefInputWrap);
    });

    $href.addEventListener('click', function() {
        if (isShowInput) {
            isShowInput = !isShowInput;
            editor.$toolBar.removeChild($hrefInputWrap);
        } else {
            isShowInput = !isShowInput;
            editor.$toolBar.appendChild($hrefInputWrap);
        }
    });

    $toolBar.appendChild($href);
}

function createHrefInput() {
    let $hrefInputWrap: Element = createElement('div');

    setAttribute($hrefInputWrap, {
        class: 'href-input-wrap'
    });

    // 链接插入框标题
    let $title: Element = createElement('h3');
    $title.textContent = "插入链接";
    setAttribute($title, {
        class: 'href-input-title'
    });

    // 链接内容输入框
    let $contentInput: HTMLInputElement = <HTMLInputElement>createElement('input');
    setAttribute($contentInput, {
        class: 'href-content-input',
        placeholder: '请输入链接文字'
    });

    // 链接url输入框
    let $linkInput: HTMLInputElement = <HTMLInputElement>createElement('input');
    setAttribute($linkInput, {
        class: 'href-content-input',
        placeholder: '请输入链接地址'
    });

    // 取消插入按钮
    let $btnCancel: Element = createElement('label');
    $btnCancel.textContent = '取消';
    setAttribute($btnCancel, {
        class: 'href-cancel-btn href-btn'
    });

    // 监听取消按钮点击事件
    $btnCancel.addEventListener('click', function() {

        // 清空输入框
        $contentInput.value = '';
        $linkInput.value = '';

        // 向观察者发送取消插入url事件
        notify.trigger('closeHrefDialog');
    });

    // 插入按钮
    let $btnConfirm: Element = createElement('label');
    $btnConfirm.textContent = '插入';
    setAttribute($btnConfirm, {
        class: 'href-confirm-btn href-btn'
    });

    // 监听插入按钮点击事件
    $btnConfirm.addEventListener('click', function() {
        let obj = {
            contentValue: $contentInput.value,
            linkValue: $linkInput.value
        }

        // 向观察者发送取消插入url事件
        notify.trigger('closeHrefDialog', obj);

        // 清空输入框
        $contentInput.value = '';
        $linkInput.value = '';
    });

    // 添加元素的container上
    $hrefInputWrap.appendChild($title);
    $hrefInputWrap.appendChild($contentInput);
    $hrefInputWrap.appendChild($linkInput);
    $hrefInputWrap.appendChild($btnCancel);
    $hrefInputWrap.appendChild($btnConfirm);

    return $hrefInputWrap;
}