import WspEditor from '../instance';
import createUndo from './undo';
import createRedo from './redo';
import createTitle from './title';
import createLine from './line';
import createOrderedList from './orderedList';


export default function addUserOperation(options: any, editor: WspEditor) {
    createUndo(options, editor);
    createRedo(options, editor);
    createTitle(options,editor);
    createLine(options,editor);
    createOrderedList(options, editor);

}