import React from "react";

export type ThemContextProps = 'light' | 'dark';

// export const ThemeContext = React.createContext('light');

// const themeColor = (value: ThemContextProps) => {
//     switch
// }


type ThemeContextProp = {
    theme: ThemContextProps;
    setTheme: (value: ThemContextProps) => void;
};

export const ThemeContext = React.createContext<ThemeContextProp>({
    theme: 'light',
    setTheme: () => undefined,
});

export const useThemeContext = () => {
    const [theme, setTheme] = React.useState<ThemContextProps>('light');

    const contextValue: ThemeContextProp = {
        theme,
        setTheme,
    };

    return contextValue;
};