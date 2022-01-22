import React from "react";
import { DictionaryType, loadDictionary } from "../dictionary";

interface NoDictionary {
  state: "no-dictionary";
}

interface LoadingDictionary {
  state: "loading-dictionary";
  dictionaryType: DictionaryType;
}

interface ErrorLoadingDictionary {
  state: "error-loading-dictionary";
  dictionaryType: DictionaryType;
  error: string;
}

interface ReadyDictionary {
  state: "ready-dictionary";
  type: DictionaryType;
  dictionary: string[];
}

export type DictionaryState =
  | NoDictionary
  | LoadingDictionary
  | ErrorLoadingDictionary
  | ReadyDictionary;

export function tryGetType(dictionary: DictionaryState): DictionaryType | undefined {
  switch (dictionary.state) {
    case "no-dictionary":
      return undefined;
    case "loading-dictionary":
      return dictionary.dictionaryType;
    case "error-loading-dictionary":
      return dictionary.dictionaryType;
    case "ready-dictionary":
      return dictionary.type;
  }
}

export interface DictionaryData {
  state: DictionaryState;
  loadDictionary: (dictionaryType: DictionaryType) => void;
}

export function useDictionary(): DictionaryData {
  const [state, setState] = React.useState<DictionaryState>({
    state: "no-dictionary",
  });

  const _loadDictionary = React.useCallback(
    async (dictionaryType: DictionaryType) => {
      setState({ state: "loading-dictionary", dictionaryType });
      try {
        const dictionary = await loadDictionary(dictionaryType);
        setState({ state: "ready-dictionary", type: dictionaryType, dictionary });
      } catch (error) {
        setState({
          state: "error-loading-dictionary",
          dictionaryType,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    },
    []
  );
  
  React.useEffect(() => {
      _loadDictionary(DictionaryType.WordsAlpha);
  }, [_loadDictionary])

  return {
    state,
    loadDictionary: _loadDictionary,
  };
}
