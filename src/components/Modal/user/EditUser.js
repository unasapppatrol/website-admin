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
import { useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../../api/users";
import { formatTanggal } from "../../../utils/DateFormat";
import { ClipLoading } from "../../Loading";
import { AlertError, AlertSuccess } from "../../Alert";

function ModalEditUser({ openModal, closeModal, data, setModalEdit }) {
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);

  // DATA
  const [namaLengkap, setNamaLengkap] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [domisili, setDomisili] = useState("");
  const [unitKerja, setUnitKerja] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState(null);
  const [tempatLahir, setTempatLahir] = useState("");
  const [nomorHp, setNomorHp] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (data) {
      setNamaLengkap(data.nama_lengkap || "");
      setUsername(data.username || "");
      setEmail(data.email || "");
      setPassword(data.password || "");
      setDomisili(data.domisili || "");
      setUnitKerja(data.unit_kerja || "");
      setTanggalLahir(data.tanggal_lahir || "");
      setTempatLahir(data.tempat_lahir || "");
      setNomorHp(data.no_hp || "");
      setRole(data.role || "");
    }
  }, [data]);

  // STATE
  const [alertVisible, setAlertVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const newData = {
    nama_lengkap: namaLengkap,
    username: username,
    email: email,
    password: password,
    role: role,
    no_hp: nomorHp,
    domisili: domisili,
    tempat_lahir: tempatLahir,
    tanggal_lahir: tanggalLahir,
    unit_kerja: unitKerja,
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await updateUser(data._id, newData);
      if (response.status === 200) {
        setIsLoading(false);
        setAlertVisible(true);
        setSuccessMessage(`Data ${namaLengkap} berhasil di update`);
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000);
        setTimeout(() => {
          setModalEdit(false);
        }, 3000);
      } else {
        setIsLoading(false);
        setIsError(true);
        setErrorMessage("terjadi kesalahan dalam register user");
        setTimeout(() => {
          setIsError("");
          setErrorMessage("");
        }, 3000);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError("terjadi kesalahan dalam register user");
      setErrorMessage(error.message);
      setTimeout(() => {
        setIsError("");
        setErrorMessage("");
      }, 3000);
    }
    await queryClient.refetchQueries("getUsers");
  };
  return (
    <Modal
      isOpen={openModal}
      onClosed={closeModal}
      className="custom-modal-width"
    >
      <ModalHeader toggle={closeModal}>Form Edit User</ModalHeader>

      <ModalBody>
        <div className="mx-2">
          {alertVisible && (
            <AlertSuccess messages={successMessage} key={"success"} />
          )}
          {isError && <AlertError messages={errorMessage} key={"error"} />}
        </div>
        <Form>
          <Row>
            <Col>
              <FormGroup>
                <Label for="nama Lengkap">Nama Lengkap</Label>
                <Input
                  id="nama Lengkap"
                  name="nama Lengkap"
                  type="text"
                  value={namaLengkap}
                  onChange={(e) => setNamaLengkap(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button onClick={toggleShowPassword}>
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
                  type="select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">----</option>

                  <option value="chief">chief security</option>
                  <option value="danru">danru</option>
                  <option value="anggota">anggota security</option>
                  <option value="admin">admin</option>
                </Input>
              </FormGroup>
            </Col>

            <Col>
              <FormGroup>
                <Label for="unit_kerja">Unit Kerja</Label>
                <Input
                  id="unit_kerja"
                  name="unit_kerja"
                  type="select"
                  value={unitKerja}
                  onChange={(e) => setUnitKerja(e.target.value)}
                >
                  <option value="">Pilih Unit Kerja</option>
                  <option value="UNAS Pejanten">UNAS Pejanten</option>
                  <option value="UNAS Ragunan">UNAS Ragunan</option>
                  <option value="UNAS Bambu Kuning">UNAS Bambu Kuning</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="tanggal_lahir">Tanggal Lahir</Label>
                <Input
                  id="tanggal_lahir"
                  name="tanggal_lahir"
                  type="date"
                  value={formatTanggal(tanggalLahir)}
                  onChange={(e) => setTanggalLahir(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col>
              <FormGroup>
                <Label for="no_hp">Nomor HP</Label>
                <Input
                  id="no_hp"
                  name="no_hp"
                  type="number"
                  value={nomorHp}
                  onChange={(e) => setNomorHp(e.target.value)}
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
                  value={domisili}
                  onChange={(e) => setDomisili(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="tempat_lahir">Tempat Lahir</Label>
                <Input
                  id="tempat_lahir"
                  name="tempat_lahir"
                  type="text"
                  value={tempatLahir}
                  onChange={(e) => setTempatLahir(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={handleUpdate}>
          {isLoading ? <ClipLoading /> : "Update"}
        </Button>
        <Button color="danger" onClick={closeModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalEditUser;
