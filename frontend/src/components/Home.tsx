import { Footer, Header, Button } from "@bcgov/design-system-react-components";
import '@bcgov/bc-sans/css/BC_Sans.css';
import { useFeedback } from "../feedback/FeedbackProvider";
import { useNavigate } from "react-router-dom";

function Home() {
  const { openFeedbackForm } = useFeedback();
  const navigate = useNavigate();

  function changeBackground() {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    document.body.style.backgroundColor = randomColor;
  }

  return (
    <>
      <div style={{ margin: 0 }}>
        <Header title={"Capstone 2026 - Test App"}>
          <Button
            variant="primary"
            onPress={() => navigate("/dashboard")}
          >
            Form Builder
          </Button>
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
            changeBackground();
          }}>
            Change Background Color
          </Button>

          <Button style={{ margin: "10px 0px" }} onPress={() => {
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