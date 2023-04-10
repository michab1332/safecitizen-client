import "./popup.css";

export default function Popup({ text }) {
    const content = text !== "" ? <div className='popupContainer'>{text}</div> : null;
    return (content);
}
