// import React, { useState, useEffect } from "react";
// import "../CSS/UserLogin.css";

// import { useNavigate } from "react-router-dom";

// const UserLogin = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [countdown, setCountdown] = useState(0);
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [enteredOtp, setEnteredOtp] = useState("");
//   const navigate = useNavigate();
//   // Countdown effect
//   useEffect(() => {
//     let timer;
//     if (countdown > 0) {
//       timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
//     }
//     return () => clearInterval(timer);
//   }, [countdown]);

//   // Generate OTP
//   const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

//   // Handle sending OTP
//   const handleSendOtp = () => {
//     if (phoneNumber.length !== 10) {
//       alert("Please enter a valid 10-digit mobile number");
//       return;
//     }

//     const otp = generateOtp();
//     localStorage.setItem("otp", otp); // store OTP in localStorage
//     console.log("Generated OTP:", otp); // for demo
//     setOtpSent(true);
//     setCountdown(30);
//     alert(`OTP sent to your mobile number! [Demo OTP: ${otp}]`);
//   };

//   // Handle OTP verification
//   const handleVerifyOtp = (e) => {
//     e.preventDefault();
//     const storedOtp = localStorage.getItem("otp");
//     if (enteredOtp === storedOtp) {
 
//       localStorage.removeItem("otp");
//       navigate("/user-dashboard");
//       // Reset form
//       setOtpSent(false);
//       setCountdown(0);
//       setPhoneNumber("");
//       setEnteredOtp("");
//       if (isSignUp) {
//         setName("");
//         setEmail("");
//         setIsSignUp(false); // redirect to login after sign up
//       }
//     } else {
//       alert("Invalid OTP! Please try again.");
//     }
//   };

//   return (
//     <div className="userlogin-container">
//        <div className="login-left">
//         <h1>WELCOME</h1>
//         <h3>YOUR HEADLINE NAME</h3>
//         <p>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//           tempor incididunt ut labore et dolore magna aliqua.
//         </p>
//       </div>

//       <div className="login-right">
//         <div className="login-box">
//           {!isSignUp ? (
//             <>
//               <h2>User Login</h2>
//               <p className="login-subtext">
//                 Login with your registered mobile number
//               </p>

//               <input
//                 type="tel"
//                 placeholder="Enter Mobile Number"
//                 maxLength="10"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//               />

//               {!otpSent ? (
//                 <button
//                   className="send-btn"
//                   onClick={handleSendOtp}
//                   disabled={!phoneNumber || phoneNumber.length < 10}
//                 >
//                   Send OTP
//                 </button>
//               ) : (
//                 <button
//                   className="send-btn"
//                   onClick={handleSendOtp}
//                   disabled={countdown > 0}
//                 >
//                   {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
//                 </button>
//               )}

//               {otpSent && (
//                 <form onSubmit={handleVerifyOtp} className="otp-section">
//                   <input
//                     type="text"
//                     placeholder="Enter OTP"
//                     maxLength="6"
//                     value={enteredOtp}
//                     onChange={(e) => setEnteredOtp(e.target.value)}
//                     required
//                   />
//                   <button type="submit" className="verify-btn">
//                     Verify OTP
//                   </button>
//                 </form>
//               )}

//               <p className="signup-text">
//                 Don't have an account?{" "}
//                 <span className="signup-link" onClick={() => setIsSignUp(true)}>
//                   Sign up now
//                 </span>
//               </p>
//             </>
//           ) : (
//             <>
//               <h2>Sign Up</h2>
//               <p className="login-subtext">Create an account to get started</p>

//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <input
//                 type="tel"
//                 placeholder="Mobile Number"
//                 maxLength="10"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 required
//               />

//               {!otpSent ? (
//                 <button
//                   className="send-btn"
//                   onClick={handleSendOtp}
//                   disabled={!phoneNumber || phoneNumber.length < 10}
//                 >
//                   Send OTP
//                 </button>
                
                
//               ) : (
//                 <button
//                   className="send-btn"
//                   onClick={handleSendOtp}
//                   disabled={countdown > 0}
//                 >
//                   {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
//                 </button>
//               )}

//               {otpSent && (
//                 <form onSubmit={handleVerifyOtp} className="otp-section">
//                   <input
//                     type="text"
//                     placeholder="Enter OTP"
//                     maxLength="6"
//                     value={enteredOtp}
//                     onChange={(e) => setEnteredOtp(e.target.value)}
//                     required
//                   />
//                   <button type="submit" className="verify-btn">
//                     Verify OTP
//                   </button>
//                 </form>
//               )}

//               <p className="signup-text">
//                 Already have an account?{" "}
//                 <span className="signup-link" onClick={() => setIsSignUp(false)}>
//                   Login here
//                 </span>
//               </p>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;


import React, { useState, useEffect } from "react";
import "../CSS/UserLogin.css";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [loginMethod, setLoginMethod] = useState("otp"); // new
  const navigate = useNavigate();

  // Countdown effect
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Generate OTP
  const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

  // Handle sending OTP
  const handleSendOtp = () => {
    if (phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    const otp = generateOtp();
    localStorage.setItem("otp", otp); // store OTP in localStorage
    console.log("Generated OTP:", otp);
    setOtpSent(true);
    setCountdown(30);
    alert(`OTP sent to your mobile number! [Demo OTP: ${otp}]`);
  };

  // Handle OTP verification
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const storedOtp = localStorage.getItem("otp");
    if (enteredOtp === storedOtp) {
      localStorage.removeItem("otp");
      navigate("/user-dashboard");
      resetForm();
    } else {
      alert("Invalid OTP! Please try again.");
    }
  };

  // Handle password login
  const handlePasswordLogin = (e) => {
    e.preventDefault();
    if (!phoneNumber || !password) {
      alert("Please enter mobile number and password");
      return;
    }

    // Demo: just navigate
   
    navigate("/user-dashboard");
    resetForm();
  };

  // Reset all fields
  const resetForm = () => {
    setOtpSent(false);
    setCountdown(0);
    setPhoneNumber("");
    setEnteredOtp("");
    setPassword("");
    if (isSignUp) {
      setName("");
      setEmail("");
      setIsSignUp(false);
    }
  };

  return (
    <div className="userlogin-container">
      <div className="login-left">
        <h1>WELCOME</h1>
        <h3>YOUR HEADLINE NAME</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="login-right">
        <div className="login-box">
          {!isSignUp ? (
            <>
              <h2>User Login</h2>
              <p className="login-subtext">
                Choose your preferred login method
              </p>

              {/* Login method toggle */}
              <div className="login-method">
                <label>
                  <input
                    type="radio"
                    name="loginMethod"
                    value="otp"
                    checked={loginMethod === "otp"}
                    onChange={(e) => setLoginMethod(e.target.value)}
                  />
                  Login with OTP
                </label>
                <label>
                  <input
                    type="radio"
                    name="loginMethod"
                    value="password"
                    checked={loginMethod === "password"}
                    onChange={(e) => setLoginMethod(e.target.value)}
                  />
                  Login with Password
                </label>
              </div>

              {loginMethod === "otp" ? (
                <>
                  <input
                    type="tel"
                    placeholder="Enter Mobile Number"
                    maxLength="10"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />

                  {!otpSent ? (
                    <button
                      className="send-btn"
                      onClick={handleSendOtp}
                      disabled={!phoneNumber || phoneNumber.length < 10}
                    >
                      Send OTP
                    </button>
                  ) : (
                    <button
                      className="send-btn"
                      onClick={handleSendOtp}
                      disabled={countdown > 0}
                    >
                      {countdown > 0
                        ? `Resend in ${countdown}s`
                        : "Resend OTP"}
                    </button>
                  )}

                  {otpSent && (
                    <form onSubmit={handleVerifyOtp} className="otp-section">
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        maxLength="6"
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value)}
                        required
                      />
                      <button type="submit" className="verify-btn">
                        Verify OTP
                      </button>
                    </form>
                  )}
                </>
              ) : (
                <form onSubmit={handlePasswordLogin} className="password-login">
                  <input
                    type="tel"
                    placeholder="Enter Mobile Number"
                    maxLength="10"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="submit" className="verify-btn">
                    Login
                  </button>
                </form>
              )}

              <p className="signup-text">
                Don’t have an account?{" "}
                <span className="signup-link" onClick={() => setIsSignUp(true)}>
                  Sign up now
                </span>
              </p>
            </>
          ) : (
            <>
              <h2>Sign Up</h2>
              <p className="login-subtext">Create an account to get started</p>

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                maxLength="10"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />

              {!otpSent ? (
                <button
                  className="send-btn"
                  onClick={handleSendOtp}
                  disabled={!phoneNumber || phoneNumber.length < 10}
                >
                  Send OTP
                </button>
              ) : (
                <button
                  className="send-btn"
                  onClick={handleSendOtp}
                  disabled={countdown > 0}
                >
                  {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
                </button>
              )}

              {otpSent && (
                <form onSubmit={handleVerifyOtp} className="otp-section">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    maxLength="6"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    required
                  />
                  <button type="submit" className="verify-btn">
                    Verify OTP
                  </button>
                </form>
              )}

              <p className="signup-text">
                Already have an account?{" "}
                <span className="signup-link" onClick={() => setIsSignUp(false)}>
                  Login here
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
