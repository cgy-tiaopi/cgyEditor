import WspEditor from '../instance';
import createUndo from './undo';
import createRedo from './redo';
import createTitle from './title';
import createOrderedList from './orderedList';
import createUnorderedList from './unorderedList'


export default function addUserOperation(options: any, editor: WspEditor) {
    createUndo(options, editor);
    createRedo(options, editor);
    createTitle(options,editor);
    createOrderedList(options, editor);
    createUnorderedList(options, editor);
}