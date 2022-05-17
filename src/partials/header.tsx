import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from '@src/contexts/themeContext';

export default function Header() {
    const { theme, setTheme } = useContext(ThemeContext);
    const themeToggle = useRef<HTMLInputElement>(null);
    const [isToggled, setIsToggled] = useState(false);

    const pages = ['Trang chủ', 'Giới thiệu', 'Dịch vụ'];

    useEffect(() => {
        setIsToggled(theme === 'dark');
    }, []);

    useEffect(() => {
        isToggled ? setTheme('dark') : setTheme('light');
    }, [isToggled])

    return (
        <header className={"py-4 px-8 text-white bg-light dark:bg-dark"}>
            <nav className="flex">
                <ul className="flex mr-auto py-2">
                    <li className="mr-2">
                        <a href="/">
                            <img src={`/logo-${theme === 'dark' ? 'light' : 'dark'}.svg`} className="w-6 h-6" alt="Logo" />
                        </a>
                    </li>
                    {pages.map((page, index) => (
                        <li key={index} className="mx-2">
                            <a href="/" className="hover:text-shade">{page}</a>
                        </li>
                    ))}
                    <li className="ml-2">
                        <a href="/" className="bg-dark dark:bg-light hover:bg-shade dark:hover:bg-shade rounded-md px-3 py-2">Liên hệ</a>
                    </li>
                </ul>
                <ul className="flex ml-auto">
                    <label htmlFor="themeToggle" className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input type="checkbox" ref={themeToggle} id="themeToggle" checked={isToggled} className="sr-only peer" onChange={() => setIsToggled(!isToggled)} />
                            <div className="peer-checked:bg-light bg-dark w-14 h-8 rounded-full">
                                {isToggled ? <FontAwesomeIcon className="text-white absolute left-2 top-2 w-4 h-4" icon={faMoon} /> : <FontAwesomeIcon className="text-white absolute left-8 top-2 w-4 h-4" icon={faSun} />}
                            </div>
                            <div className="peer-checked:translate-x-full absolute bg-white flex w-6 h-6 left-1 top-1 flex items-center justify-center rounded-full transition"></div>
                        </div>
                    </label>
                </ul>
            </nav>
        </header>
    )
}