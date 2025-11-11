import React, { useContext } from "react";
import { useImmerReducer } from "use-immer";
import type { TBetReducerAction } from "~/types/bet";
import {
  betInitialState,
  betReducer,
  type TBetInitialState,
} from "~/features/bet/reducer/BetReducer";

type TBetContext = {
  state: TBetInitialState;
  dispatch: React.ActionDispatch<[action: TBetReducerAction]>;
};

const BetContext = React.createContext<TBetContext | null>(null);

export const useBetContext = () => {
  const context = useContext(BetContext);
  if (!context) {
    throw new Error("useBetContext must be used within a BetProvider");
  }
  return context;
};

export const BetProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useImmerReducer(betReducer, betInitialState);

  return (
    <BetContext.Provider value={{ state, dispatch }}>
      {children}
    </BetContext.Provider>
  );
};
