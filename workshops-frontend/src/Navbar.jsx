import { useEffect, useState } from "react";
import Button from "./components/Button";
 
const saveTheme = (theme) => {
    localStorage.theme = theme
}

const loadTheme = () => {
    if (!('theme' in localStorage)) {
        saveTheme("system");
        return "system"
    } else return localStorage.theme
}

const realizeTheme = (theme) => {
    if (theme === "system") {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
    }

    if (theme === 'dark') {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

const printTheme = (theme) => {
    switch (theme) {
        case "light": return "Hell"
        case "dark": return "Dunkel"
        default: return "System"
    }
}

export default function NavBar(props) {
    const [isOpen, setIsOpen] = useState(false);

    const [theme, setTheme] = useState(loadTheme());

    const onThemeSelect = (t) => {
        saveTheme(t);
        setTheme(t);
        realizeTheme(t);
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
                <a href="https://www.buymeacoffee.com/JonasBernard" target="_blank">
                    <img src="/bmc-full-logo.svg" alt="Buy me a coffe" width={120} />
                </a>
                </Button>
                <div className="relative inline-block">
                    <button onClick={() => setIsOpen((wasOpen) => !wasOpen)} className="flex items-center gap-1 relative z-10 p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none">
                        Theme: {printTheme(theme)}
                        <svg className="w-5 h-5 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <div
                        // onClick={() => isOpen = false}
                        className={"flex flex-col "
                        + "absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right "
                        + "bg-white rounded-md shadow-xl dark:bg-gray-800 "
                        + "transition-opacity " + (isOpen ? "opacity-100 visible" : "opacity-0 invisible") }
                    >
                        <button onClick={() => onThemeSelect("light")} className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"> Hell </button>
                        <button onClick={() => onThemeSelect("dark")} className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"> Dunkel </button>
                        <button onClick={() => onThemeSelect("system")} className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"> System </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
}