import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { ThemeContext } from '@src/contexts/themeContext';
import { ContactModalContext } from '@src/contexts/contactModalContext';

export default function Header() {
    const { theme, setTheme } = useContext(ThemeContext);
    const { setModalState } = useContext(ContactModalContext);
    const [isToggled, setIsToggled] = useState(false);

    const pages = ['Trang chủ', 'Giới thiệu', 'Dịch vụ'];

    useEffect(() => {
        setIsToggled(theme === 'dark');
    }, []);

    useEffect(() => {
        isToggled ? setTheme('dark') : setTheme('light');
    }, [isToggled])

    return (
        <header className="py-4 px-6 text-white bg-light dark:bg-dark">
            <nav className="flex">
                <ul className="flex mr-auto py-2">
                    <li className="mr-2">
                        <Link href="/" className="flex items-center">
                            {theme === 'dark' ? (
                                <img src="/logo-dark.svg" alt="Logo" className="w-6 h-6" />
                            ) : (
                                <img src="/logo-light.svg" alt="Logo" className="w-6 h-6" />
                            )}
                        </Link>
                    </li>
                    {pages.map((page, index) => (
                        <li key={index} className="mx-2 flex items-center hover:bg-shade dark:hover:bg-shade rounded-md px-3 py-1">
                            <Link href="/">{page}</Link>
                        </li>
                    ))}
                    <li className="mx-2">
                        <button
                            onClick={setModalState.bind(null, true)}
                            className="bg-dark dark:bg-light hover:bg-shade dark:hover:bg-shade rounded-md px-3 py-1"
                        >
                            Liên hệ
                        </button>
                    </li>
                </ul>
                <ul className="flex ml-auto">
                    <label htmlFor="themeToggle" className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input type="checkbox" id="themeToggle" checked={isToggled} className="sr-only peer" onChange={() => setIsToggled(!isToggled)} />
                            <div className="peer-checked:bg-light bg-dark w-14 h-8 rounded-full">
                                <i className={"text-white absolute left-2 top-2 w-4 h-4 fas " + (isToggled ? "fa-moon" : "fa-sun translate-x-6")}></i>
                            </div>
                            <div className="peer-checked:translate-x-full absolute bg-white flex w-6 h-6 left-1 top-1 flex items-center justify-center rounded-full transition"></div>
                        </div>
                    </label>
                </ul>
            </nav>
        </header>
    )
}