import WspEditor from '../instance';
import createUndo from './undo';
import createRedo from './redo';

export default function addUserOperation(options: any, editor: WspEditor) {
    createUndo(options, editor);
    createRedo(options, editor);
}