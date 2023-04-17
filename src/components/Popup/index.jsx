import { useEffect, useState, useRef } from "react";
import "./popup.css";

export default function Popup({ text, timeout, warning }) {
    const [textPopup, setTextPopup] = useState(text);
    const popupRef = useRef();

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

    useEffect(() => {
        popupRef.current.style.backgroundColor = warning ? "#ff3333" : "#339cff";
    });

    return (<div ref={popupRef} className={textPopup !== "" ? 'popupContainer' : 'popupContainer__none'}>{textPopup}</div>);
}
