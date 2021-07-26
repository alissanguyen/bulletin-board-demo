import * as React from "react";

interface StateUpdateFn<T> {
  (previousState: T): T;
}

type UseStateWithHistoryReturnValue<T> = [
  T,
  React.Dispatch<React.SetStateAction<T>>,
  () => void,
  boolean,
  () => void,
  boolean,
  () => void
];

export const useStateWithHistory = <T>(
  initialState: T
): UseStateWithHistoryReturnValue<T> => {
  const [state, dispatch] = React.useReducer<ReducerFn<T>, State<T>>(
    reducer,
    {
      history: [initialState],
      historyPointer: 0,
    },
    () => {
      return {
        history: [initialState],
        historyPointer: 0,
      };
    }
  );

  const storedInitialState = React.useRef(() => initialState);


  const currentState = state.history[state.historyPointer];

  /** Want to expose these two, so consumers of this hook know if fiddling with history is possible. */
  const undoIsPossible = state.history.length > 1 && state.historyPointer > 0;
  const redoIsPossible = state.historyPointer < state.history.length - 1;

  const setState: React.Dispatch<React.SetStateAction<T>> = (stateUpdate) => {
    dispatch({
      type: "ADD_TO_STATE_ACTION",
      data: stateUpdate,
    });
  };

  const undo = () => {
    if (undoIsPossible) {
      dispatch({ type: "UNDO_ACTION" });
    }
  };

  const redo = () => {
    if (redoIsPossible) {
      dispatch({ type: "REDO_ACTION" });
    }
  };

  /** Sometimes the user takes some action that necessitates clearing all history. */
  const clearHistory = () => {
    dispatch({
      data: storedInitialState.current,
      type: "CLEAR_HISTORY_ACTION",
    });
  };

  /**
   * The first two elements returned are the exact same as `useState`, so you can use
   * this to replace `useState`, even if you never end up using the `undo` functionality.
   */
  return [
    currentState,
    setState,
    undo,
    undoIsPossible,
    redo,
    redoIsPossible,
    clearHistory,
  ];
};

const isStateUpdateFunction = <T>(value: any): value is StateUpdateFn<T> => {
  return typeof value === "function";
};

interface State<T> {
  history: T[];
  /**
   * To implement redo functionality, it's not enough to overwrite history.
   * `currentState` will be `history[historyPointer]`, and `undo`s will
   * decrement the pointer, and `redo`s will increment it.
   */
  historyPointer: number;
}

interface AddToStateAction<T> {
  type: "ADD_TO_STATE_ACTION";
  data: React.SetStateAction<T>;
}

interface UndoAction {
  type: "UNDO_ACTION";
}

interface RedoAction {
  type: "REDO_ACTION";
}

interface ClearHistoryAction<T> {
  type: "CLEAR_HISTORY_ACTION";
  data: React.SetStateAction<T>;
}

type ActionType<T> =
  | AddToStateAction<T>
  | UndoAction
  | RedoAction
  | ClearHistoryAction<T>;

interface ReducerFn<T> {
  (state: State<T>, action: ActionType<T>): State<T>;
}

/**
 * Add logic to make sure we don't go out of bounds of the array
 */
const reducer = <T>(state: State<T>, action: ActionType<T>): State<T> => {
  switch (action.type) {
    case "ADD_TO_STATE_ACTION": {
      const stateUpdate = action.data;
      const nextState = isStateUpdateFunction<T>(stateUpdate)
        ? stateUpdate(state.history[state.historyPointer])
        : stateUpdate;

      const shouldRemoveFirstElementOfHistory = state.historyPointer >= 4;

      const nextHistory = state.history
        .slice(
          shouldRemoveFirstElementOfHistory ? 1 : 0,
          state.historyPointer + 1
        )
        .concat([nextState]);

      const returnValue = {
        history: nextHistory,
        historyPointer: shouldRemoveFirstElementOfHistory
          ? state.historyPointer
          : state.historyPointer + 1,
      };
      if (shouldRemoveFirstElementOfHistory) {
        debugger;
      }

      return returnValue;
    }

    case "REDO_ACTION":
      return {
        ...state,
        historyPointer: state.historyPointer + 1,
      };
    case "UNDO_ACTION":
      return {
        ...state,
        historyPointer: state.historyPointer - 1,
      };
    case "CLEAR_HISTORY_ACTION":
      const stateUpdate = action.data;
      const nextState = isStateUpdateFunction<T>(stateUpdate)
        ? stateUpdate(state.history[state.historyPointer])
        : stateUpdate;

      return {
        historyPointer: 0,
        history: [nextState],
      };
    default:
      return state;
  }
};
