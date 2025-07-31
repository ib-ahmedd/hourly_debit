import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Customers from "./customers";
import CustomerRegistration from "./customerRegistration";
import CustomerDebitLog from "./customerDebitLog";
import Cookies from "js-cookie";

const UserDashboard = ({ accessToken, user, setIsLoggedIn }) => {
  const [customers, setCustomers] = useState([]);
  const [sectionOnScreen, setSectionOnScreen] = useState("Customers");
  const [fetchCustomers, setFetchCustomers] = useState(true);
  const [debitLogs, setDebitLogs] = useState([]);
  const [logOwner, setLogOwner] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [loadingDebitLogs, setLoadingDebitLogs] = useState(false);

  const apiKey = process.env.REACT_APP_API_KEY;

  const getCustomers = useCallback(async () => {
    try {
      const url =
        "https://vbjhkslbynflsvvdiohz.supabase.co/functions/v1/get-customers/";
      const response = await axios.get(url + user.id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCustomers(response.data);
      setFetchCustomers(false);
    } catch (err) {
      console.log(err);
    }
    setPageLoading(false);
  }, [accessToken, user.id]);

  const getDebitLogs = async (customerName, customerID) => {
    setLoadingDebitLogs(true);
    setLogOwner(customerName);
    try {
      const response = await axios.get(
        "https://vbjhkslbynflsvvdiohz.supabase.co/functions/v1/view-customer-details/" +
          customerID,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setDebitLogs((prev) => [...prev, ...response.data]);
    } catch (err) {
      console.log(err);
    }
    setLoadingDebitLogs(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://vbjhkslbynflsvvdiohz.supabase.co/auth/v1/logout",
        {},
        {
          headers: {
            apikey: apiKey,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setIsLoggedIn(false);
      Cookies.remove("user");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (fetchCustomers) {
      getCustomers();
    }
  }, [fetchCustomers, getCustomers]);
  return (
    <section className="user-dashboard">
      <h1>{user.email}</h1>
      <div className="page-items-container">
        <aside className="toggle-btns">
          <button
            onClick={() => {
              setSectionOnScreen("Customers");
            }}
          >
            Customers
          </button>
          <button
            onClick={() => {
              setSectionOnScreen("Register Customers");
              setDebitLogs([]);
              setLogOwner("");
            }}
          >
            Register customer
          </button>
          <button onClick={handleLogout}>Log out</button>
        </aside>
        <div className="center-div">
          {sectionOnScreen === "Customers" ? (
            <Customers
              customers={customers}
              email={user.email}
              getDebitLogs={getDebitLogs}
              loadingDebitLogs={loadingDebitLogs}
              pageLoading={pageLoading}
            />
          ) : (
            <CustomerRegistration
              accessToken={accessToken}
              user_id={user.id}
              setFetchCustomers={setFetchCustomers}
              setSectionOnScreen={setSectionOnScreen}
            />
          )}
        </div>
        <CustomerDebitLog
          debitLogs={debitLogs}
          logOwner={logOwner}
          loadingDebitLogs={loadingDebitLogs}
        />
      </div>
    </section>
  );
};

export default UserDashboard;
