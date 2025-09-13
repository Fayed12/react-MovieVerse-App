import "./login-failed.css";

function LoginFailedPopup() {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>❌ Login failed</h2>
        <p>please try again, password or email is wrong!</p>
      </div>
    </div>
  );
}

export default LoginFailedPopup;
