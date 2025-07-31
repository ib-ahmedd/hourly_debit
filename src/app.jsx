import { useEffect, useState } from "react";
import "./index.css";
import Auth from "./components/auth";
import UserDashboard from "./components/userDashboard";
import Cookies from "js-cookie";
// import "dotenv/config";

const App = () => {
  //   console.log(process.env.API_KEY);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState({ id: "", email: "" });

  useEffect(() => {
    const storedUser = Cookies.get("user") && JSON.parse(Cookies.get("user"));
    if (storedUser) {
      setAccessToken(storedUser.accessToken);
      setUser((prev) => {
        return { ...prev, id: storedUser.id, email: storedUser.email };
      });
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      {!isLoggedIn ? (
        <Auth
          setAccessToken={setAccessToken}
          setIsLoggedIn={setIsLoggedIn}
          setUser={setUser}
        />
      ) : (
        <UserDashboard
          user={user}
          accessToken={accessToken}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </>
  );
};

export default App;
