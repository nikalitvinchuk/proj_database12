import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const checkSession = async () => {
    const res = await axios.get("/session");
    console.log(res.data);
    return res.data.loggedIn;
};

const withAuth = (Component) => {
    const AuthenticatedComponent = (props) => {
        const navigate = useNavigate();
        const [isLoggedIn, setIsLoggedIn] = useState(false);

        console.log("test");
        useEffect(() => {
            const checkAuth = () => {
                const loggedIn = checkSession();
                setIsLoggedIn(loggedIn);
            };
            checkAuth();
        }, []);

        if (!isLoggedIn) {
            navigate("/login");
            return null;
        }

        return <Component {...props} />;
    };

    return AuthenticatedComponent;
};

export default withAuth;
