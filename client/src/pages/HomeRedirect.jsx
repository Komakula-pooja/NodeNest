import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("Token");

        if (token === null) {
            navigate("/signup");
        } else {
            navigate("/home");
        }
    }, [navigate]);
};

const HomeRedirect = () => {
    useAuthRedirect();

  return (
    <>
    <h1>Loading..</h1>
    </>
  )
}

export default HomeRedirect

