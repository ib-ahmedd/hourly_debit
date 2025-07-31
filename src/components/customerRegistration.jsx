import axios from "axios";
import { useState } from "react";

const CustomerRegistration = ({
  accessToken,
  user_id,
  setFetchCustomers,
  setSectionOnScreen,
}) => {
  const [inputs, setInputs] = useState({
    name: "",
    balance: "",
    hourly_debit_amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
    setError(false);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios.post(
        "https://vbjhkslbynflsvvdiohz.supabase.co/functions/v1/create-client",
        {
          ...inputs,
          user_id: user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setInputs({
        name: "",
        balance: "",
        hourly_debit_amount: "",
      });
      setFetchCustomers(true);
      setSectionOnScreen("Customers");
    } catch (err) {
      console.log(err);
      setError(true);
    }
    setLoading(false);
  };
  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2>Register Customer</h2>
      <input
        type="text"
        name="name"
        value={inputs.name}
        placeholder="Enter customer name"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="balance"
        value={inputs.balance}
        placeholder="Enter customer balance"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="hourly_debit_amount"
        value={inputs.hourly_debit_amount}
        placeholder="Enter hourly debit amount"
        onChange={handleChange}
        required
      />
      {loading ? (
        <button disabled style={{ opacity: "0.7" }}>
          Loading...
        </button>
      ) : (
        <button>Register</button>
      )}
      {error && (
        <p>Error registering user. Check input fields and try again!</p>
      )}
    </form>
  );
};

export default CustomerRegistration;
