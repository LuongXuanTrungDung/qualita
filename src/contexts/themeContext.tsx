import { createContext, useEffect, useState } from "react";

interface ThemeContextInterface {
    theme: string;
    setTheme: (newTheme: string) => void;
}

export const ThemeContext = createContext<ThemeContextInterface>({
    theme: 'light',
    setTheme: (newTheme: string) => { }
});

export function ThemeContextProvider(props: any) {
    const getInitialTheme = () => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
    }

    const [colorMode, setColorMode] = useState(getInitialTheme);

    useEffect(() => {
        if (typeof colorMode !== 'undefined') {
            if (colorMode == 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, [colorMode]);

    const contextValues: ThemeContextInterface = {
        theme: (typeof colorMode !== 'undefined' && colorMode != null) ? colorMode : 'light',
        setTheme: (newTheme) => setColorMode(newTheme)
    }

    return (
        <ThemeContext.Provider value={contextValues}>
            {props.children}
        </ThemeContext.Provider>
    )
}