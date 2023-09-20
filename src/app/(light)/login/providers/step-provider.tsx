import { PropsWithChildren, createContext, useContext, useState } from "react";

import { Step } from "../types";

type State = {
  step: Step;
  values?: {
    email: string;
  }
}

type StepContextType = {
  setState: (step: State) => void;
} & State;

const StepContext = createContext<StepContextType>({} as StepContextType);

export default function StepProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<State>({
    step: 'initial',
    values: undefined
  });
  return <StepContext.Provider value={{ ...state, setState }}>{children}</StepContext.Provider>
}

export const useStepState = () => useContext(StepContext);
