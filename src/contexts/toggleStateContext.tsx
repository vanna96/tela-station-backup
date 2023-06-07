import { createContext, useContext, useState } from "react";


const ToggleState = createContext();
const SetToggleState = createContext();

export function useToggleStateContext() {
  return useContext(ToggleState);
}
export function useToggleStateContextUpdate() {
  return useContext(SetToggleState);
}
export function ToggleStateContextProvider({ children }:any) {
  
  const [stateToggle, setStateToggle] = useState(true);
  return (
    <ToggleState.Provider value={stateToggle}>
      <SetToggleState.Provider value={setStateToggle}>
        {children}
      </SetToggleState.Provider>
    </ToggleState.Provider>
  )
}
