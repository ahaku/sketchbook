import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks";
import { defaultLang } from "@excalidraw/excalidraw";

interface LanguageContextData {
  langCode: string;
  setLangCode: (langCode: string) => void;
}

const LanguageContext = createContext<LanguageContextData>({
  langCode: defaultLang.code,
  setLangCode: () => {},
});

export const useLanguageContext = () => useContext(LanguageContext);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [langCode, setLangCode] = useLocalStorage<string>(
    "language",
    defaultLang.code
  );

  return (
    <LanguageContext.Provider value={{ langCode, setLangCode }}>
      {children}
    </LanguageContext.Provider>
  );
};
