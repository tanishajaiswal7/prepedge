// GoogleRedirectHandler.jsx
import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DataContext } from "../context/DataProvider";

const GoogleRedirectHandler = () => {
  const { setUser } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const userParam = params.get("user");

    if (token && userParam) {
      const user = JSON.parse(decodeURIComponent(userParam));
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser({ token, ...user });
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [location]);

  return <p>Loading...</p>;
};

export default GoogleRedirectHandler;
