import { useState } from "react";
import Modal from "./modal";
import axios from "axios";
import EmailSent from "./emailSent";
import Cookies from "js-cookie";

const Auth = ({ setIsLoggedIn, setAccessToken, setUser }) => {
  const [activeModal, setActiveModal] = useState("Login");
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (activeModal === "Login") {
        const response = await axios.post(
          "https://vbjhkslbynflsvvdiohz.supabase.co/auth/v1/token?grant_type=password",
          {
            ...inputs,
          },
          {
            headers: {
              apiKey: "",
            },
          }
        );

        const { access_token, user } = response.data;
        setAccessToken(access_token);
        setUser((prev) => {
          return { ...prev, id: user.id, email: user.email };
        });
        setIsLoggedIn(true);
        Cookies.set(
          "user",
          JSON.stringify({ ...user, accessToken: access_token }),
          { expires: 1, path: "/" }
        );
      } else {
        await axios.post(
          "https://vbjhkslbynflsvvdiohz.supabase.co/auth/v1/signup",
          {
            ...inputs,
          },
          {
            headers: {
              apiKey:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiamhrc2xieW5mbHN2dmRpb2h6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzgyMjkxOSwiZXhwIjoyMDY5Mzk4OTE5fQ.QE9o33tvAmXHG0PvfbxQ7T2W6nSiAzSTJDSdUFxzXPY",
            },
          }
        );

        setActiveModal("email sent");
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }

    setLoading(false);
  };
  return (
    <section className="signup-login-section">
      {activeModal !== "email sent" && (
        <div className="signup-login-toggles">
          <button
            onClick={() => {
              setActiveModal("Login");
              setError(false);
            }}
            style={{
              borderBottom:
                activeModal === "Login" ? "3px solid orangered" : "none",
            }}
          >
            Login
          </button>
          <button
            onClick={() => {
              setActiveModal("Signup");
              setError(false);
            }}
            style={{
              borderBottom:
                activeModal === "Signup" ? "3px solid orangered" : "none",
            }}
          >
            Sign Up
          </button>
        </div>
      )}
      {activeModal !== "email sent" ? (
        <Modal
          activeModal={activeModal}
          inputs={inputs}
          setInputs={setInputs}
          handleSubmit={handleSubmit}
          setError={setError}
          error={error}
          loading={loading}
        />
      ) : (
        <EmailSent setActiveModal={setActiveModal} />
      )}
    </section>
  );
};

export default Auth;
