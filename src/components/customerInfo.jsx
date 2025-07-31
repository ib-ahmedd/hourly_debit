const CustomerInfo = ({
  id,
  name,
  balance,
  hourly_debit_amount,
  last_debited_at,
  getDebitLogs,
  loading,
}) => {
  return (
    <div className="customer-info">
      <h3>Name: {name}</h3>
      <p>Balance: {balance}</p>
      <p>Hourly debit amount: {hourly_debit_amount}</p>
      <p>Last debited at: {last_debited_at}</p>
      {loading ? (
        <button disabled style={{ opacity: "0.7" }}>
          View customer debit log
        </button>
      ) : (
        <button
          onClick={() => {
            getDebitLogs(name, id);
          }}
        >
          View customer debit log
        </button>
      )}
    </div>
  );
};

export default CustomerInfo;
