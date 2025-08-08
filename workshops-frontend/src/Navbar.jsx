import { useEffect, useState } from "react";
import Button from "./components/Button";
import { Sun, Moon } from "lucide-react";
 
const saveTheme = (theme) => {
    localStorage.theme = theme
}

const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

const loadTheme = () => {
    if (!('theme' in localStorage)) {
        const theme = getSystemTheme();
        saveTheme(theme);
        return theme;
    } else return localStorage.theme
}

const realizeTheme = (theme) => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

export default function NavBar(props) {
    const [isOpen, setIsOpen] = useState(false);

    const [theme, setTheme] = useState(loadTheme());

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        saveTheme(newTheme);
        realizeTheme(newTheme);
    }

    useEffect(() => {
        setTheme(loadTheme());
        realizeTheme(theme);
    }, [theme]);

    return <nav className="mb-2 bg-white shadow dark:bg-gray-800 flex justify-between">
        <div className="container flex items-center justify-between p-4 mx-auto text-gray-600 capitalize dark:text-gray-300">
            <div>
                <span><h2 className="text-lg font-bold">Gruppen-Tool</h2></span>
            </div>

            <span className="text-xs">Made with ♥ by <a href="https://jonas-bernard.dev">Jonas Bernard</a></span>

            <div className="flex gap-4">
                <Button>
                <a href="https://www.buymeacoffee.com/JonasBernard" target="_blank" rel="noreferrer">
                    <img src="/bmc-full-logo.svg" alt="Buy me a coffe" width={120} />
                </a>
                </Button>
                <div className="relative inline-block">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-gray-900 dark:bg-gray-700"
                    >
                        {theme === 'dark' ? <Sun className="text-yellow-500" /> : <Moon className="text-white" />}
                    </button>
                </div>
            </div>
        </div>
    </nav>
}