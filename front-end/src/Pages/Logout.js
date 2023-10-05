import {useCookies} from "react-cookie";

const Logout = () => {
  const [cookies,, removeCookie] = useCookies();

  removeCookie("userID");

  window.location.assign("/login");

  return <div className="pending">Logging out...</div>
};

export default Logout;