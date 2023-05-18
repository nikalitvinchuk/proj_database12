import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const checkSession = async () => {
    const res = await axios.get("http://localhost:5000/session");
    console.log(res.data);
    return res.data.loggedIn;
};

const withAuth = (Component) => {
    const AuthenticatedComponent = (props) => {
        const navigate = useNavigate();
        const [isLoggedIn, setIsLoggedIn] = useState(null);

        console.log("test");
        useEffect(() => {
            const checkAuth = async () => {
                const loggedIn = await checkSession();
                setIsLoggedIn(loggedIn);
            };
            checkAuth();
        }, []);
        console.log(isLoggedIn)
        if (isLoggedIn != null) {
            if (!isLoggedIn) {
                console.log("NIE UDA�O SIE ZALOGOWA�")
                navigate("/login")
                return false;
            } else {
                console.log("UDA�O SI� ZALOGOWA�")
            }
        }

        return <Component {...props} />;

    };

    return AuthenticatedComponent;
};

export default withAuth;