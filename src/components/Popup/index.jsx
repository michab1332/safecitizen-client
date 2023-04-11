import { useEffect, useState } from "react";
import "./popup.css";

export default function Popup({ text, timeout }) {
    const [textPopup, setTextPopup] = useState(text);

    useEffect(() => {
        if (textPopup !== "" && timeout === true) {
            const timerId = setTimeout(() => {
                setTextPopup("");
            }, 3000);

            return () => {
                clearTimeout(timerId);
            };
        }
    }, [textPopup]);

    useEffect(() => {
        setTextPopup(text)
    }, [text]);

    return (<div className={textPopup !== "" ? 'popupContainer' : 'popupContainer__none'}>{textPopup}</div>);
}
