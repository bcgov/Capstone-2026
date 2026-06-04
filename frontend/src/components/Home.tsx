import { Footer, Header, Button, Dialog, DialogTrigger, Modal } from "@bcgov/design-system-react-components";
import { useState, useEffect } from "react";
import FeedbackForm from "./FeedbackForm";
import '@bcgov/bc-sans/css/BC_Sans.css';
import type { FeedbackFormData } from "../types/feedback";


function Home() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
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
          <DialogTrigger>
            <Button onPress={() => {
              changeBackground();
              setIsAlertOpen(true);
            }}>
              Change Background Color
            </Button>

            <Modal
              isOpen={isAlertOpen}
              onOpenChange={setIsAlertOpen}
              isDismissable
              style={{
                position: "absolute",
                bottom: "1rem",
                right: "1rem"
              }}
            >
              <Dialog
                isCloseable
                aria-label="Feedback form prompt dialog"
              >
                <div style={{ padding: "1rem" }}>
                  <h2 style={{ fontFamily: "BC Sans" }}>Would you like to tell us about your experience?</h2>

                  <Button onPress={() => {
                    setIsFormOpen(true);
                    setIsAlertOpen(false);
                  }}
                    style={{ margin: "5px" }}
                  >
                    Yes
                  </Button>
                  <Button variant="secondary"
                    onPress={() => setIsAlertOpen(false)}
                    style={{ margin: "5px" }}
                  >
                    No
                  </Button>
                </div>
              </Dialog>
            </Modal>
          </DialogTrigger>

          <FeedbackForm
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
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