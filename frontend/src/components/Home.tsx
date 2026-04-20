import { Footer, Header } from "@bcgov/design-system-react-components";

function Home() {
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
