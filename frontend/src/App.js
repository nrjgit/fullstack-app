import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import NavBar from './components/NavBar';
import { jwtDecode } from "jwt-decode";
import FooterPage from './components/Footer';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;  
function App() {
  console.log("clientId", clientId);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Login Success:", credentialResponse);

    const decodedToken = jwtDecode(credentialResponse.credential);
    const name = decodedToken.name || "User"; // Default if name is missing
    
    setIsLoggedIn(true);
    setUserName(name);
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <NavBar  isLoggedIn={isLoggedIn} userName={userName} />  
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>React Google Sign-In</h1>

        {!isLoggedIn ? (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        ) : (
          <div>
            <h2>You are logged in!</h2>
            <p>Welcome, {userName}!</p>
          </div>
        )}
      </div>
      <footer className="App-footer">
        <FooterPage />
      </footer>
    </GoogleOAuthProvider>
  );
}

export default App;