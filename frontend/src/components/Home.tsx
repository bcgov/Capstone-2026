import { Footer, Header, Button } from "@bcgov/design-system-react-components";
import '@bcgov/bc-sans/css/BC_Sans.css';
import { useFeedback } from "../feedback/FeedbackProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";


function Home() {
  const navigate = useNavigate();
  const { apiBaseUrl, openFeedbackForm } = useFeedback();
  const [buttonCounter, setButtonCounter] = useState(0);
  const { isAuthenticated } = useAuth();

  function incrementButtonCounter() {
    setButtonCounter(prev => prev + 1);
  }

  function changeBackground() {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    document.body.style.backgroundColor = randomColor;
  }
  const handleButtonClick = async () => {
    const response = await fetch(`${apiBaseUrl}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        button_click_count: buttonCounter
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log("User data updated successfully:", data);
    } else {
      console.error("Failed to update user data:", data);
    }
  }

  return (
    <>
      <div style={{ margin: 0 }}>
        <Header title={"Capstone 2026 - Test App"}>
          {isAuthenticated ? (
            <>
              <Button
                variant="primary"
                onPress={() => navigate("/dashboard/formBuilder")}
              >
                Dashboard
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              onPress={() => navigate("/login")}
            >
              Dashboard
            </Button>
          )}
        </Header>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span style={{ display: "inline-block", margin: "20px 10px" }} />
          <h1 style={{ fontFamily: "BC Sans" }}>Welcome Capstone 2026!</h1>
          <Button onPress={() => {
            incrementButtonCounter();
            changeBackground();
          }}>
            Change Background Color
          </Button>

          <Button style={{ margin: "10px 0px" }} onPress={() => {
            handleButtonClick();
            openFeedbackForm(1);
          }}>
            Select Background Color
          </Button>

          <h3 className="row" style={{ fontFamily: "BC Sans" }}>
            Here are some helpful resources:
          </h3>
          <a href="https://mvp.developer.gov.bc.ca/docs/default/component/bc-design-system" style={{ fontFamily: "BC Sans" }}>
            B.C. Design System
          </a>
          <a href="https://www2.gov.bc.ca/gov/content/digital/design-system" style={{ fontFamily: "BC Sans" }}>
            B.C. Design System Component Library
          </a>
          <a href="https://developer.gov.bc.ca/docs/default/component/bc-developer-guide" style={{ fontFamily: "BC Sans" }}>
            BC Developer Guide
          </a>
          <span style={{ display: "inline-block", margin: "80px 10px" }} />
        </div>
        <div>
          <Footer />
        </div>

      </div>
    </>
  );
}

export default Home;