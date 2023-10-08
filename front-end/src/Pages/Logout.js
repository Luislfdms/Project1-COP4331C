import {useCookies} from "react-cookie";
import { useHistory } from "react-router-dom";
import {useEffect} from "react";

const Logout = () => {
  const [,, removeCookie] = useCookies();
  const history = useHistory(["userID"]);

  useEffect(() => {
    removeCookie("userID");

    history.push("/login", {msg: "Logged out successfully"});
  })
  

  return <div className="pending">Logging out...</div>
};

export default Logout;