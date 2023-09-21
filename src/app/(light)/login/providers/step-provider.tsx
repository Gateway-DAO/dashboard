"use client"
import { Session } from "next-auth";
import { PropsWithChildren, createContext, useContext, useState } from "react";

import { Step } from "../types";
import getStep from "../utils/get-step";

type State = {
  step: Step;
  values?: {
    email: string;
  }
}

type StepContextType = {
  setStepState: (step: State) => void;
} & State;

const StepContext = createContext<StepContextType>({} as StepContextType);

export default function StepProvider({ children, session }: PropsWithChildren<{ session: Session | null }>) {
  const [state, setStepState] = useState<State>(() => {
    const step = getStep(session);
    return {
      step,
    }
  });

  return <StepContext.Provider value={{ ...state, setStepState }}>{children}</StepContext.Provider>
}

export const useStepState = () => useContext(StepContext);
