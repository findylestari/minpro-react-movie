import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";

function NavBar() {
    const [username, setUsername] = useState();

    useEffect(() => {
        if (localStorage.getItem("sessionID")) {
            const getAccount = async () => {
                try {
                    let response = await axios.get(
                        `${process.env.REACT_APP_APIURL}account?api_key=${
                            process.env.REACT_APP_APIKEY
                        }&session_id=${localStorage.getItem("sessionID")}`
                    );
                    setUsername(response.data.username);
                } catch (error) {
                    console.log(error);
                }
            };
            getAccount();
        }
    }, []);

    const renderLoginLogout = () => {
        if (localStorage.getItem("sessionID")) {
            const handleLogout = async () => {
                try {
                    await axios({
                        method: "delete",
                        url: `${process.env.REACT_APP_APIURL}authentication/session?api_key=${process.env.REACT_APP_APIKEY}`,
                        data: {
                            session_id: localStorage.getItem("sessionID"),
                        },
                    });
                } catch (error) {
                    console.log(error);
                }
                localStorage.removeItem("sessionID");
                window.location.href = "/";
            };
            return (
                <>
                    <li className="nav-item">
                        <a className="nav-link" href="/#" onClick={handleLogout}>Logout</a>
                    </li>
                </>
            );
        }

        return (
            <>
                <li className="nav-item">
                    <a className="nav-link" href="/login" >
                        Login
                    </a>
                </li>
                
            </>
        );
    };

    const renderUserName = () => {
        return (
            <>
                <ul className="navbar-nav me-auto">
                    <li className="nav-link">
                        {username}
                    </li>
                </ul>
            </>
        );
    };

    return (
        <>
            <nav className="navbar sticky-top navbar-expand-lg bg-dark px-4">
                <div className="container-fluid">
                    <a className="navbar-brand d-flex align-items-center navbar-logo text-decoration-none" href="/">
                    <h4 className="navbar-brand"> NOBARKUY</h4>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="ri-menu-line"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {renderUserName()}
                        <span>
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/Movie">Movie</a>
                                </li>
                                {renderLoginLogout()}
                            </ul>
                        </span>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;
