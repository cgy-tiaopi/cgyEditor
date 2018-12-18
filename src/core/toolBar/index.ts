import WspEditor from '../instance';
import createUndo from './undo';
import createRedo from './redo';
import createBold from './bold';
import createFileImport from './file';
import createTitle from './title';
import createLine from './line';
import createOrderedList from './orderedList';
import createUnorderedList from './unorderedList'


export default function addUserOperation(options: any, editor: WspEditor) {
    createUndo(options, editor);
    createRedo(options, editor);
    createBold(options,editor);
    createFileImport(options, editor);
    createTitle(options,editor);
    createLine(options,editor);
    createOrderedList(options, editor);
    createUnorderedList(options, editor);
}