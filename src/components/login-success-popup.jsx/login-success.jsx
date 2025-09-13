import "./login-success.css";

function LoginSuccessPopup() {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>✅ Login Successful</h2>
              <p>Welcome back! You have logged in successfully.</p>
              <span>please wait!</span>
      </div>
    </div>
  );
}

export default LoginSuccessPopup;
