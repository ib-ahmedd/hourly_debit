const EmailSent = ({ setActiveModal }) => {
  return (
    <div className="email-sent">
      <p>
        A confirmation link has been sent to your email. Use link to confirm
        email.
      </p>
      <button
        onClick={() => {
          setActiveModal("Login");
        }}
      >
        Back to login
      </button>
    </div>
  );
};

export default EmailSent;
