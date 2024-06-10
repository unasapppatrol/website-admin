import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Alert,
  Col,
} from "reactstrap";
import "../ModalScale.css";
import { formatTanggal } from "../../../utils/DateFormat";
import { useQuery } from "@tanstack/react-query";
import { GetUser } from "../../../api/users";

function ModalDetailUser({ openModal, closeModal, data }) {
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {}, [data]);
  const {
    isLoading,
    isError,
    data: dataUser,
    error,
  } = useQuery({
    queryKey: ["data_users_id", data?._id],
    queryFn: () => (data?._id ? GetUser(data._id) : Promise.resolve(null)),
    enabled: !!data?._id,
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (!data) {
    return null;
  }

  if (isError) {
    return <p>Terjadi kesalahan dalam mengambil data user, {error}</p>;
  }
  return (
    <Modal
      isOpen={openModal}
      onClosed={closeModal}
      className="custom-modal-width"
    >
      <ModalHeader toggle={closeModal}>Form detail user</ModalHeader>
      <ModalBody>
        {isLoading ? (
          <p>Mengambil data user ...</p>
        ) : (
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    defaultValue={dataUser ? dataUser.username : ""}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={dataUser ? dataUser.email : ""}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <div
                    style={{
                      display: "flex",
                      border: 1,
                    }}
                  >
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      defaultValue={dataUser ? dataUser.password : ""}
                    />
                    <Button onClick={toggleShowPassword} color="warning">
                      {showPassword ? (
                        <i className="bi bi-eye-slash-fill"></i>
                      ) : (
                        <i className="bi bi-eye-fill"></i>
                      )}
                    </Button>
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="role">Role</Label>
                  <Input
                    id="role"
                    name="role"
                    type="text"
                    defaultValue={dataUser ? dataUser.role : ""}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="unit_kerja">Unit Kerja</Label>
                  <Input
                    id="unit_kerja"
                    name="unit_kerja"
                    defaultValue={dataUser ? dataUser.unit_kerja : ""}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <Label for="tanggal_lahir">Tempat, Tanggal Lahir</Label>
                <FormGroup>
                  <Col className="d-flex flex-row justify-content-center">
                    <Input
                      id="tempat_lahir"
                      name="tempat_lahir"
                      type="text"
                      defaultValue={dataUser ? dataUser.tempat_lahir : ""}
                    />
                    <Input
                      id="tanggal_lahir"
                      name="tanggal_lahir"
                      type="text"
                      defaultValue={
                        dataUser ? formatTanggal(dataUser.tanggal_lahir) : ""
                      }
                    />
                  </Col>
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <Label for="no_hp">Nomor HP</Label>
                  <Input
                    id="no_hp"
                    name="no_hp"
                    type="number"
                    defaultValue={dataUser ? dataUser.no_hp : ""}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="domisili">Domisili</Label>
                  <Input
                    id="domisili"
                    name="domisili"
                    type="text"
                    defaultValue={dataUser ? dataUser.domisili : ""}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={closeModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalDetailUser;
