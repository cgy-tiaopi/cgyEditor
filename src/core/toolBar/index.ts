import WspEditor from '../instance';
import createBold from './bold';
import createUndo from './undo';
import createRedo from './redo';
import createFileImport from './file';

export default function addUserOperation(options: any, editor: WspEditor) {
    createBold(options, editor);
    createUndo(options, editor);
    createRedo(options, editor);
    createFileImport(options, editor);
}