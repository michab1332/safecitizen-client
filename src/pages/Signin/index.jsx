import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";

import Popup from "../../components/Popup";

import "./sign.css";

const Signin = () => {
    const [state, setState] = useState({
        name: "",
        password: "",
        error: ""
    });
    const dispatch = useDispatch();
    const { user, loading } = useSelector(state => state.user);
    const navigate = useNavigate();

    const handleOnInputChange = (e) => {
        setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const handleSignin = (e) => {
        e.preventDefault();
        if (state.name !== "" && state.password !== "") {
            dispatch(loginStart());
            axios.post("https://safecitizen-api.onrender.com/api/auth/signin", {
                name: state.name,
                password: state.password
            }, { credentials: true }).then((response) => {
                dispatch(loginSuccess(response.data));
            }).catch(err => {
                dispatch(loginFailure());
                setState(prevState => ({
                    ...prevState,
                    error: err.response.data.message
                }));
            });
            return;
        }
        setState(prevState => ({
            ...prevState,
            error: "Uzupełnij dane"
        }));
    }
    console.log(loading)

    useEffect(() => {
        if (user !== null) {
            navigate("/");
        }
    }, [user]);

    return (
        <div className="signContainer">
            <Popup text={loading === true ? "Loading..." : ""} />
            <Popup text={state.error} warning timeout />
            <form className="signContainer__form" onSubmit={handleSignin}>
                <p className="signContainer__text">Zaloguj się</p>
                <input onChange={handleOnInputChange} type="text" className="signcontainer__input" placeholder="Name" name="name" />
                <input onChange={handleOnInputChange} type="password" className="signcontainer__input" placeholder="Password" name="password" />
                <button className="signContainer__button">Zaloguj się</button>
                <Link to="/signup" className="singContainer__textSmall">lub zarejestruj sie</Link>
            </form>
        </div>
    )
}

export default Signin;