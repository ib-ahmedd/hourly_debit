import LogInfo from "./logInfo";

const CustomerDebitLog = ({ debitLogs, logOwner, loadingDebitLogs }) => {
  return (
    <article className="customer-debit-logs">
      <h3>{logOwner} Logs:</h3>
      {loadingDebitLogs && <p>Fetch user's debit logs...</p>}
      {!loadingDebitLogs && debitLogs.length < 1 && "No debit log"}
      {!loadingDebitLogs &&
        debitLogs.length > 0 &&
        debitLogs.map((log, key) => <LogInfo key={key} {...log} />)}
    </article>
  );
};

export default CustomerDebitLog;
