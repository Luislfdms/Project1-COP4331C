import {useCookies} from "react-cookie";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const [,, removeCookie] = useCookies();
  const history = useHistory();

  removeCookie("userID");

  history.push("/login");

  return <div className="pending">Logging out...</div>
};

export default Logout;