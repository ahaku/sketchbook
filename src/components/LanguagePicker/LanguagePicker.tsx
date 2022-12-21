import React from "react";
import { useLanguageContext } from "../../language/LanguageContext";
import s from "./LanguagePicker.module.scss";
import languageList from "../../language/languageList";

const LanguagePicker = () => {
  const { langCode, setLangCode } = useLanguageContext();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLangCode(e.target.value);
  };

  return (
    <select
      className={s.languagePicker}
      name="language"
      defaultValue={langCode}
      onChange={handleChange}
      title={"Excalidraw language"}
    >
      {languageList.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};

export default LanguagePicker;
