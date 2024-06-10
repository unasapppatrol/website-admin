import React from "react";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import TableAktivitas from "../components/Tables/TableAktivitas";

function DataAktivitas() {
  return (
    <Row>
      <Col lg="12">
        <TableAktivitas />
      </Col>
    </Row>
  );
}

export default DataAktivitas;
