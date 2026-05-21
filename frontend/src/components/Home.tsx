import { Footer, Header, ButtonGroup, Button, Dialog, DialogTrigger, Select, Modal, Form, TextField} from "@bcgov/design-system-react-components";
function Home() {

  function changeBackground() {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    document.body.style.backgroundColor = randomColor;
  }

  return (
    <>
      <body style={{ margin: 0 }}>
        <Header title={"Capstone 2026"}> </Header>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span style={{ display: "inline-block", margin: "20px 10px" }} />
          <h1>Welcome Capstone 2026!</h1>
          <DialogTrigger>
            <Button>
              Open
            </Button>
            <Modal isDismissable>
              <Dialog
                isCloseable
                role="dialog"
              >
                <div
                  style={{
                    padding: '1rem'
                  }}
                >
                  <span
                    style={{
                      font: '700 1.25rem/2.125rem \'BC Sans\''
                    }}
                  >
                    This dialog contains a form
                  </span>
                  <Form
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}
                  >
                    <TextField
                      isRequired
                      label="Name"
                    />
                    <TextField
                      isRequired
                      label="Email address"
                      type="email"
                    />
                    <Select
                      isRequired
                      items={[
                        {
                          id: 'chilliwack',
                          label: 'Chilliwack'
                        },
                        {
                          id: 'kelowna',
                          label: 'Kelowna'
                        },
                        {
                          id: 'kamloops',
                          label: 'Kamloops'
                        },
                        {
                          id: 'nanaimo',
                          label: 'Nanaimo'
                        },
                        {
                          id: 'princegeorge',
                          label: 'Prince George'
                        },
                        {
                          id: 'vancouver',
                          label: 'Vancouver'
                        },
                        {
                          id: 'victoria',
                          label: 'Victoria'
                        }
                      ]}
                      label="City"
                    />
                    <ButtonGroup
                      alignment="start"
                      orientation="horizontal"
                    >
                      <Button
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                      <Button
                        type="reset"
                        variant="secondary"
                      >
                        Reset
                      </Button>
                    </ButtonGroup>
                  </Form>
                </div>
              </Dialog>
            </Modal>
          </DialogTrigger>
         <h3 className="row">Here are some helpful resources:</h3>
          <a href="https://mvp.developer.gov.bc.ca/docs/default/component/bc-design-system">
            B.C. Design System
          </a>
          <a href="https://www2.gov.bc.ca/gov/content/digital/design-system">
            B.C. Design System Component Library
          </a>
          <a href="https://developer.gov.bc.ca/docs/default/component/bc-developer-guide">
            BC Developer Guide
          </a>
          <span style={{ display: "inline-block", margin: "80px 10px" }} />
        </div>
        <div>
          <Footer />
        </div>

      </body>
    </>
  );
}

export default Home;
