import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const checkSession = async () => {
    try {
        const res = await axios.get("http://localhost:5000/session", { withCredentials: true });
        return res.data.loggedIn;
      } catch (error) {
        console.log(error);
        return false;
      }
};

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const checkAuth = async () => {
      const loggedIn = await checkSession();
      setIsLoggedIn(loggedIn);
      if (!loggedIn) {
        console.log("NIE UDAŁO SIĘ ZALOGOWAĆ");
        navigate("/login");
      } else {
        console.log("UDAŁO SIĘ ZALOGOWAĆ");
      }
    };

    useEffect(() => {
      checkAuth();
    }, [checkAuth]);

    useEffect(() => {
      const handleLocationChange = () => {
        checkAuth();
      };

      window.addEventListener("popstate", handleLocationChange);
      return () => {
        window.removeEventListener("popstate", handleLocationChange);
      };
    }, []);

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
