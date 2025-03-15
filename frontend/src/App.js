import React, { Component } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import request from "superagent";
import NavBar from "./components/NavBar";
import FooterPage from "./components/Footer";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const apiKey = process.env.REACT_APP_PARKWHIZ_API_KEY;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userName: "",
      places: [],
      selectedPlace: null,
      latitude: null,  // ✅ Store lat & long in state
      longitude: null,
    };
  }

  componentDidMount() {
    console.log("App mounted! Fetching user location...");
    
    // ✅ Fetch user location dynamically
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User Coordinates:", latitude, longitude);

        // ✅ Update state first, then fetch parking data
        this.setState({ latitude, longitude }, () => {
          this.fetchParkingLocations();
        });
      },
      (error) => {
        console.error("Error fetching location:", error);
      }
    );
  }

  fetchParkingLocations = () => {
    const { latitude, longitude } = this.state;

    if (!latitude || !longitude) {
      console.error("Latitude and Longitude are missing!");
      return;
    }

    if (!apiKey) {
      console.error("API Key is missing! Check your .env file.");
      return;
    }

    // const url = `http://api.parkwhiz.com/v4/quotes/?start_time=2018-04-23T12:00&end_time=2018-04-23T20:00&api_key=${apiKey}&q=coordinates:${latitude},${longitude}`;

    const url = `http://api.parkwhiz.com/v4/quotes/?start_time=2018-04-23T12:00&end_time=2018-04-23T20:00&api_key=${apiKey}&q=coordinates:37.791365,-122.393741`;


    console.log("Fetching parking locations:", url);

    request
      .get(url)
      .then((res) => {
        if (res.ok) {
          console.log("API Response:", res.body);
          this.setState({
            places: res.body,
            selectedPlace: res.body.length > 0 ? res.body[0] : null,
          });
        } else {
          console.log("No parking data found");
        }
      })
      .catch((err) => console.error("API Error:", err));
  };

  handleLoginSuccess = (credentialResponse) => {
    console.log("Login Success:", credentialResponse);
    const decodedToken = jwtDecode(credentialResponse.credential);
    const name = decodedToken.name || "User";

    this.setState({ isLoggedIn: true, userName: name });
  };

  handleLoginError = () => {
    console.log("Login Failed");
  };

  render() {
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <NavBar isLoggedIn={this.state.isLoggedIn} userName={this.state.userName} />

        <div style={{ textAlign: "center", marginTop: "50px" }}>
          {!this.state.isLoggedIn ? (
            <GoogleLogin onSuccess={this.handleLoginSuccess} onError={this.handleLoginError} />
          ) : (
            <div>
              <h2>You are logged in!</h2>
              <p>Welcome, {this.state.userName}!</p>
            </div>
          )}
        </div>

        {/* Display Fetched Places */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3>Available Parking Places</h3>
          {this.state.places.length > 0 ? (
            <ul>
              {this.state.places.map((place, index) => {
                console.log("Checking place data:", place); // Debugging ke liye

                const location = place?._embedded?.["pw:location"];

                const locationName = location?.name || "Unknown Location";
                const address = location?.address1 || "";
                const city = location?.city || "";
                const state = location?.state || "";

                const fullAddress = `${locationName}, ${address}, ${city}, ${state}`.trim();

                return <li key={index}>{fullAddress !== ", , ," ? fullAddress : "Location Not Available"}</li>;
              })}
            </ul>
          ) : (
            <p>No parking data available.</p>
          )}
        </div>

        <footer className="App-footer">
          <FooterPage />
        </footer>
      </GoogleOAuthProvider>
    );
  }
}

export default App;
