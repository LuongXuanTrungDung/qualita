import { createContext, useState } from "react";

interface ContactModalContextInterface {
    modalState: boolean;
    setModalState: (state: boolean) => void;
}

export const ContactModalContext = createContext<ContactModalContextInterface>({
    modalState: false,
    setModalState: (state: boolean) => { }
});

export function ContactModalContextrovider(props: any) {
    const [isModalShown, setIsModalShown] = useState(false);
    const contextValue = {
        modalState: isModalShown,
        setModalState: setIsModalShown
    }

    return (
        <ContactModalContext.Provider value={contextValue}>
            {props.children}
        </ContactModalContext.Provider>
    )
}