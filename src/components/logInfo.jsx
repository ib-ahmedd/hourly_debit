const LogInfo = ({ status, amount, created_at }) => {
  return (
    <div className="log-info">
      <p>Status: {status}</p>
      <p>Amount debited: {amount}</p>
      <p>Transaction time: {created_at}</p>
    </div>
  );
};
export default LogInfo;
