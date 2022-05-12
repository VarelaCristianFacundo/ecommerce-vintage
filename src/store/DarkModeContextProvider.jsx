import React, { createContext, useContext, useState } from 'react'

const DarkModeContext = createContext({});

export const useDarkModeContext = () => useContext(DarkModeContext)

const DarkModeContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true)

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    };

    return (
        <useDarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </useDarkModeContext.Provider>
    )
}

export default DarkModeContextProvider