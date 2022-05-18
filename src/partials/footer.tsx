export default function Footer() {
    const contactInfo = [{
        icon: "fa-envelope-square",
        info: "luongxuantrungdung211@gmail.com"
    }, {
        icon: "fa-phone-square",
        info: "(+84) 093-436-8160"
    }];

    const socialMedia = [{
        icon: "fa-github",
        link: "https://github.com/LuongXuanTrungDung",
    }, {
        icon: "fa-linkedin",
        link: "https://www.linkedin.com/in/adrian-luong-3a3a99202/"
    }];

    return (
        <footer className="py-4 px-6 text-white bg-light dark:bg-dark">
            <nav className="flex">
                <ul className="flex mr-auto py-2">
                    {contactInfo.map((contact, index) => (
                        <li key={index} className="mr-4">
                            <a href="/" className="hover:text-shade dark:hover:text-shade">
                                <i className={"mr-1 text-lg fas " + contact.icon}></i>
                                <span className="ml-1">{contact.info}</span>
                            </a>
                        </li>
                    ))}
                    {socialMedia.map((media, index) => (
                        <li key={index} className={index == 0 ? "mr-2" : "ml-2"}>
                            <a href={media.link} className="hover:text-shade dark:hover:text-shade">
                                <i className={"text-lg fab " + media.icon}></i>
                            </a>
                        </li>
                    ))}
                </ul>
                <ul className="flex ml-auto mr-2 items-center">
                    <p className="text-sm">MIT @2022</p>
                </ul>
            </nav>
        </footer>
    );
}