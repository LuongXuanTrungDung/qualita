import { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ThemeContext } from '@src/contexts/themeContext';

export default function Header() {
    const { theme, setTheme } = useContext(ThemeContext);
    const [isToggled, setIsToggled] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    const pages = ['Trang chủ', 'Giới thiệu', 'Dịch vụ', 'Liên hệ'];

    useEffect(()    => {
        setIsToggled(theme === 'dark');
    }, []);

    useEffect(() => {
        isToggled ? setTheme('dark') : setTheme('light');
    }, [isToggled])

    return (
        <header ref={headerRef} className="py-4 px-6 sticky absolute top-0 left-0">
            <nav className="flex">
                <ul className="flex mr-auto py-2">
                    <li className="mr-2 flex items-center">
                        <Link href="/" className="flex items-center">
                            <img src="/logo.svg" alt="Logo" className="w-6 h-6" />
                        </Link>
                    </li>
                    {pages.map((page, index) => (
                        <li key={index} className="mx-2 flex items-center hover:text-primary dark:text-white dark:hover:bg-primary rounded-md px-3 py-1">
                            <Link href="/">{page}</Link>
                        </li>
                    ))}
                </ul>
                <ul className="flex ml-auto">
                    <label htmlFor="themeToggle" className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input type="checkbox" id="themeToggle" checked={isToggled} className="sr-only peer" onChange={() => setIsToggled(!isToggled)} />
                            <div className="peer-checked:bg-gray-700 bg-gray-300 w-14 h-8 rounded-full">
                                <i className={"text-black dark:text-white absolute left-2 top-2 w-4 h-4 fas " + (isToggled ? "fa-moon" : "fa-sun translate-x-6")}></i>
                            </div>
                            <div className="peer-checked:translate-x-full absolute bg-white flex w-6 h-6 left-1 top-1 flex items-center justify-center rounded-full transition"></div>
                        </div>
                    </label>
                </ul>
            </nav>
        </header>
    )
}