import CustomerInfo from "./customerInfo";

const Customers = ({
  customers,
  getDebitLogs,
  loadingDebitLogs,
  pageLoading,
}) => {
  return (
    <article className="customers">
      <h2>Customers</h2>
      <div className="customer-card-container">
        {pageLoading && <p>Fetching cutomers...</p>}
        {!pageLoading && customers.length < 1
          ? "No customers registered"
          : customers.map((customer, key) => (
              <CustomerInfo
                {...customer}
                key={key}
                getDebitLogs={getDebitLogs}
                loading={loadingDebitLogs}
              />
            ))}
      </div>
    </article>
  );
};

export default Customers;
