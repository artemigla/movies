import { createContext } from "react";
export const theme = {
    light: {
        background: '#eeeeee',
        color: '#444444'
    },
    dark: {
        background: '#333333',
        color: '#eeeeee'
    }
}
export const ThemeContext = createContext({theme: theme.dark, toggleTheme: () => {
    console.log(theme.dark);
}});