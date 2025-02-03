import { Outlet } from "react-router-dom";
import { Container } from "reactstrap";

const RootLayout = () => {
  return (
    <main>
      <div className="pageWrapper">
        <div className="contentArea">
          <Container className="p-4 wrapper" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default RootLayout;
