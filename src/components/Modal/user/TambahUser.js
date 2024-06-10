import React, { useState } from "react";
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
  Col,
  Alert,
} from "reactstrap";
import "../ModalScale.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUser } from "../../../api/users";
import Loader from "../../../layouts/loader/Loader";
import { AlertSuccess, AlertError } from "../../Alert";
import { ClipLoading } from "../../Loading";

function ModalAddUser({ openModal, closeModal, setModalTambah }) {
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [domisili, setDomisili] = useState("");
  const [unitKerja, setUnitKerja] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState(null);
  const [tempatLahir, setTempatLahir] = useState("");
  const [nomorHp, setNomorHp] = useState("");
  const [role, setRole] = useState("");

  const [successCreate, setSuccessCreate] = useState(false);
  const [errorCreate, setErrorCreate] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const createUserMutation = useMutation({
    mutationKey: "create_user",
    mutationFn: CreateUser,
    onSuccess: async () => {
      setIsLoading(false);
      setSuccessCreate(true);
      setMessage("User berhasil dibuat");
      setTimeout(() => {
        setSuccessCreate(false);
        setNamaLengkap("");
        setMessage("");
        setUsername("");
        setEmail("");
        setPassword("");
        setUnitKerja("");
        setTanggalLahir("");
        setTempatLahir("");
        setNomorHp("");
        setRole("");
        setDomisili("");
        setModalTambah(false);
      }, 2000);
    },
    onError: (error) => {
      setIsLoading(false);
      setErrorCreate(true);
      setMessage("Terjadi kesalahan, atau ulangi", error.message);
      setTimeout(() => {
        setErrorCreate(false);
        setMessage("");
      }, 3000);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const createData = {
    username: username,
    email: email,
    password: password,
    role: role,
    no_hp: nomorHp,
    domisili: domisili,
    tempat_lahir: tempatLahir,
    tanggal_lahir: tanggalLahir,
    unit_kerja: unitKerja,
    nama_lengkap: namaLengkap,
  };
  const handleTambahUser = async () => {
    setIsLoading(true);
    createUserMutation.mutate(createData);
  };
  return (
    <div>
      <Modal
        isOpen={openModal}
        onClosed={closeModal}
        className="custom-modal-width"
      >
        <ModalHeader toggle={closeModal}>Form Tambah User</ModalHeader>
        <ModalBody>
          {successCreate && (
            <AlertSuccess
              messages={message}
              key={"success"}
              refetch={"getUsers"}
            />
          )}
          {errorCreate && (
            <AlertError messages={message} key={"error"} refetch={"getUsers"} />
          )}
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="username">Nama Lengkap</Label>
                  <Input
                    id="namaLengkap"
                    name="namaLengkap"
                    type="text"
                    value={namaLengkap || ""}
                    onChange={(e) => setNamaLengkap(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={username || ""}
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
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
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
                      value={password || ""}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      onClick={toggleShowPassword}
                      color="warning"
                      className="mx-2"
                    >
                      {showPassword ? (
                        <i className="bi bi-eye-slash-fill"></i>
                      ) : (
                        <i className="bi bi-eye-fill"></i>
                      )}
                    </Button>
                  </div>
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <Label for="tempat_lahir">Role User</Label>
                  <Input
                    id="role"
                    name="role"
                    type="select"
                    value={role || ""}
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
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="tanggal_lahir">Tanggal Lahir</Label>
                  <Input
                    id="tanggal_lahir"
                    name="tanggal_lahir"
                    type="date"
                    value={tanggalLahir || ""}
                    onChange={(e) => setTanggalLahir(e.target.value)}
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
                    value={tempatLahir || ""}
                    onChange={(e) => setTempatLahir(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="unit_kerja">Unit Kerja</Label>
                  <Input
                    id="unit_kerja"
                    name="unit_kerja"
                    type="select"
                    value={unitKerja || ""}
                    onChange={(e) => setUnitKerja(e.target.value)}
                  >
                    <option value="">Pilih Unit Kerja</option>
                    <option value="UNAS Pejanten">UNAS Pejaten</option>
                    <option value="UNAS Ragunan">UNAS Ragunan</option>
                    <option value="UNAS Bambu Kuning">UNAS Bambu Kuning</option>
                  </Input>
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
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleTambahUser}>
            {isLoading ? <ClipLoading /> : "Buat user"}
          </Button>{" "}
          <Button color="danger" onClick={closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalAddUser;
