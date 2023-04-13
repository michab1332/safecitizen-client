import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import Popup from "../../components/Popup";

import "../Signin/sign.css";

const Signup = () => {
    const [state, setState] = useState({
        name: "",
        password: "",
        email: "",
        error: ""
    });
    const navigate = useNavigate();

    const handleOnInputChange = (e) => {
        setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const handleOnSignup = (e) => {
        e.preventDefault();
        if (state.name !== "" && state.password !== "") {
            axios.post("https://safecitizen-api.onrender.com/api/auth/signup", {
                name: state.name,
                password: state.password,
                email: state.email
            }).then((response) => {
                navigate("/signin");
            }).catch(err => {
                setState(prevState => ({
                    ...prevState,
                    error: err.response.data.message
                }))
            });
            return;
        }
        setState(prevState => ({
            ...prevState,
            error: "Uzupełnij dane"
        }))
    }

    return (
        <div className="signContainer">
            <Popup text={state.error} warning />
            <form className="signContainer__form" onSubmit={handleOnSignup}>
                <p className="signContainer__text">Załóż konto</p>
                <input type="text" onChange={handleOnInputChange} className="signcontainer__input" placeholder="Name" name="name" />
                <input type="email" onChange={handleOnInputChange} className="signcontainer__input" placeholder="E-mail" name="email" />
                <input type="password" onChange={handleOnInputChange} className="signcontainer__input" placeholder="Password" name="password" />
                <button className="signContainer__button">Załóż konto</button>
                <Link to="/signin" className="singContainer__textSmall">lub zaloguj się</Link>
            </form>
        </div>
    )
}

export default Signup;

//pk.eyJ1IjoiY29kZXJhbGV4aXMiLCJhIjoiY2p6eTl5bXp4MHMyazNtcGF2M3h2eGI1NSJ9.L3s-fvwkr0UEtK6rF0K85Q
//pk.eyJ1IjoicXVpZXQtMG8iLCJhIjoiY2w5MzJrcDl1MG1zdjN2bW8zZjkxemtzNCJ9.BBLdw6P0tJFu1VLtm_0zDg