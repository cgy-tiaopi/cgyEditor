import WspEditor from "../instance";
import focusEvent from './focus';
import inputEvent from './input';
import keyupEvent from './keyup';
import keydownEvent from './keydown';
import pasteEvent from './paste';

export default function bindEvent(options: any, editor: WspEditor) {
    let $contentArea = editor.$contentArea;

    focusEvent($contentArea, editor);
    inputEvent($contentArea, editor);
    keyupEvent($contentArea, editor);
    keydownEvent($contentArea, editor);
    pasteEvent($contentArea, options, editor);

}