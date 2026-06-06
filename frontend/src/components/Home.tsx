import { Footer, Header, Button } from "@bcgov/design-system-react-components";
import { useState, useEffect } from "react";
import FeedbackForm from "./FeedbackForm";
import '@bcgov/bc-sans/css/BC_Sans.css';
import type { FeedbackFormData } from "../types/feedback";
import FeedbackPrompt from "./FeedbackPrompt";

function Home() {
  const [isFeedbackPromptOpen, setIsFeedbackPromptOpen] = useState(false);
  const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState(false);
  const [formData, setFormData] = useState<FeedbackFormData>({
    id: 0,
    name: '',
    description: '',
    questions: []
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/form/1')
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
      })
      .catch((err) => console.error("DB Fetch Error:", err));
  }, []);

  function changeBackground() {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    document.body.style.backgroundColor = randomColor;
  }

  return (
    <>
      <div style={{ margin: 0 }}>
        <Header title={"Capstone 2026"}> </Header>
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
            setIsFeedbackPromptOpen(true);
          }}>
            Change Background Color
          </Button>

          <FeedbackPrompt
            isOpen={isFeedbackPromptOpen}
            setIsOpen={setIsFeedbackPromptOpen}
            onAccept={() => setIsFeedbackFormOpen(true)}
          />

          <FeedbackForm
            isFormOpen={isFeedbackFormOpen}
            setIsFormOpen={setIsFeedbackFormOpen}
            formData={formData}
          />

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