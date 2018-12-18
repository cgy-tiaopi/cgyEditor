import WspEditor from '../instance';
import createUndo from './undo';
import createRedo from './redo';
import createFileImport from './file';
import createTitle from './title';

export default function addUserOperation(options: any, editor: WspEditor) {
    createUndo(options, editor);
    createRedo(options, editor);
    createFileImport(options, editor);
    createTitle(options,editor);
}