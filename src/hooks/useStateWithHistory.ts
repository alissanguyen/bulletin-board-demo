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
  () => void,
  T[]
];

export const useStateWithHistory = <T>(
  initialState: T
): UseStateWithHistoryReturnValue<T> => {
  const [history, setHistory] = React.useState<T[]>([initialState]);

  /**
   * To implement redo functionality, it's not enough to overwrite history.
   * `currentState` will be `history[historyPointer]`, and `undo`s will
   * decrement the pointer, and `redo`s will increment it.
   */
  const [historyPointer, setHistoryPointer] = React.useState(0);

  /**
   * Cannot undo/redo more than 5 actions
   */
  if (history.length > 6) {
    const newHistoty = [...history];
    newHistoty.splice(0, 1);
    setHistory(newHistoty);
    setHistoryPointer((prev) => prev - 1);
  }

  const currentState = history[historyPointer];

  /** Want to expose these two, so consumers of this hook know if fiddling with history is possible. */
  const undoIsPossible = history.length > 1 && historyPointer > 0;
  const redoIsPossible = historyPointer < history.length - 1;

  const setState: React.Dispatch<React.SetStateAction<T>> = (stateUpdate) => {
    const newState = isStateUpdateFunction<T>(stateUpdate)
      ? stateUpdate(currentState)
      : stateUpdate;

    /**
     * When performing a state change, discard all history past this point. For example, if the
     * user `undo`s 5 times, then does something to trigger a state change, we lose that history
     * and rebuild it starting from `historyPointer`. */
    setHistory((prevHistory) =>
      prevHistory.slice(0, historyPointer + 1).concat([newState])
    );
    setHistoryPointer((prevHistoryPointer) => prevHistoryPointer + 1);
  };

  const undo = () => {
    if (undoIsPossible) {
      setHistoryPointer((prevHistoryPointer) => prevHistoryPointer - 1);
    }
  };

  const redo = () => {
    if (redoIsPossible) {
      setHistoryPointer((prevHistoryPointer) => prevHistoryPointer + 1);
    }
  };

  /** Sometimes the user takes some action that necessitates clearing all history. */
  const clearHistory = () => {
    setHistory([initialState]);
    setHistoryPointer(0);
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
    history,
  ];
};

const isStateUpdateFunction = <T>(value: any): value is StateUpdateFn<T> => {
  return typeof value === "function";
};
