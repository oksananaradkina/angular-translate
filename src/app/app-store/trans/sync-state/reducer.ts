import { StoreState } from './state';

import initialState = StoreState.initialState;
import State = StoreState.State;
import { StoreActions } from './actions';

import featureAdapter = StoreState.featureAdapter;

export function reducer(state: State = initialState, action: StoreActions.Actions) {
  let stateNew: State;

  switch (action.type) {

    case StoreActions.Types.ADD_STATE:
      stateNew = featureAdapter.addOne({
        originalId: action.originalId,
        selectedTransId: null,
        originalScroll: 0,
        translatedScroll: 0
      }, state);
      break;
    case StoreActions.Types.SELECT_TRANSLATE_LINE:

      stateNew = featureAdapter.updateOne<State>({
        id: action.originalId,
        changes: { selectedTransId: action.transId }
      }, state);
      break;
    case StoreActions.Types.SCROLL_ORIGINAL:
      stateNew = featureAdapter.updateOne<State>({
        id: action.originalId,
        changes: { originalScroll: action.scroll }
      }, state);
      break;

    case StoreActions.Types.SCROLL_TRANSLATED:
      stateNew = featureAdapter.updateOne<State>({
        id: action.originalId,
        changes: { translatedScroll: action.scroll }
      }, state);

    default:
      stateNew = state;
  }
  return stateNew;
}
