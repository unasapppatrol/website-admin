import { Row, Col } from "reactstrap";
import TableUsers from "../components/Tables/TableUsers";

const Tables = () => {
  return (
    <Row>
      <Col lg="12">
        <TableUsers />
      </Col>
    </Row>
  );
};

export default Tables;
