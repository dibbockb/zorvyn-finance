import { createContext, useContext, useState } from "react";

const ModalContext = createContext<{
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
}>
    ({ isOpen: false, setIsOpen: () => { } });

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <ModalContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);