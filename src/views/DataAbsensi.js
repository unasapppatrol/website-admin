import React from "react";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import TableAbsensi from "../components/Tables/TableAbsensi";

function DataAbsensi() {
  return (
    <Row>
      <Col lg="12">
        <TableAbsensi />
      </Col>
    </Row>
  );
}

export default DataAbsensi;
