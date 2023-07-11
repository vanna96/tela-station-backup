
import React from "react";

export type ThemContextProps = boolean;

type ThemeContextProp = {
  collapse: ThemContextProps;
  setCollapse: (value: ThemContextProps) => void;
};

export const CollaseContext = React.createContext<ThemeContextProp>({
  collapse: false,
  setCollapse: () => undefined,
});

export const useCollaseContext = () => {
  const [collapse, setCollapse] = React.useState<ThemContextProps>(true);
  const contextValue: ThemeContextProp = {
    collapse,
    setCollapse,
  };
  return contextValue;
};
