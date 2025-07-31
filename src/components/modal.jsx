const Modal = ({
  activeModal,
  inputs,
  setInputs,
  handleSubmit,
  error,
  setError,
  loading,
}) => {
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
    setError(false);
  };
  return (
    <form
      className="modal"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
        onChange={handleInputs}
        type="text"
        name="email"
        value={inputs.email}
        placeholder="Input email"
      />
      <input
        onChange={handleInputs}
        type="password"
        name="password"
        value={inputs.password}
        placeholder="Input password"
      />
      {loading ? (
        <button disabled style={{ opacity: "0.7" }}>
          Loading...
        </button>
      ) : (
        <button>{activeModal}</button>
      )}
      {error && (
        <p>Error during {activeModal}. Check input details and try again!</p>
      )}
    </form>
  );
};

export default Modal;
