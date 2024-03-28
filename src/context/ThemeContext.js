import { createContext, useState } from "react";
export const theme = {
    light: {
        background: '#eeeeee',
        color: '#333333'
    },
    dark: {
        background: '#333333',
        color: '#eeeeee'
    }
}
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    return (
        <ThemeContext.Provider value={{ theme, darkMode, setDarkMode }}>
            {children}
        </ThemeContext.Provider>
    )
}