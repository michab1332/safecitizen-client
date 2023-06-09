import { useState } from 'react';
import { Link } from 'react-router-dom';

import "./header.css";
import Logo from "../../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../redux/userSlice';

const Header = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <header>
            <div className="header-logo">
                <p className="header-text">SafeCitizen</p>
                <img src={Logo} alt="logo" className="header-logoIcon" />
            </div>
            <Link className={user ? "header__link-hidden" : "header__link"} to="/signin">Zaloguj się</Link>
            <p onClick={handleLogout} className={user ? "header__link" : "header__link-hidden"}>Wyloguj się</p>
        </header>
    )
}

export default Header;