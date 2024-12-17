import { useContext } from "react";
import { InfoContext } from "../provider/ContextProvider";
import { ContextValue as ProviderContextValue } from "../provider/ContextProvider";
export const useInfoContext: () => ProviderContextValue = () => {
  const context = useContext(InfoContext);
  if (!context) {
    throw new Error(
      "useInfoContext must be used within an InfoContextProvider"
    );
  }
  return context;
};
