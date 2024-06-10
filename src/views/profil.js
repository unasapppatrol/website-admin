import React, { useEffect, useState } from "react";
import { Form, FormGroup, Input, Label, Button, Row, Col } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import { GetUser } from "../api/users";
import { useAuth } from "../context/userContext";
import { formatTanggal } from "../utils/DateFormat";
import { updateUser } from "../api/users";
import Loader from "../layouts/loader/Loader";
import { ClipLoading } from "../components/Loading";
import { AlertSuccess } from "../components/Alert";
function Profil() {
  const { id } = useAuth();
  const [namaLengkap, setNamaLengkap] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [domisili, setDomisili] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState(null);
  const [tempatLahir, setTempatLahir] = useState("");
  const [nomorHp, setNomorHp] = useState("");

  const [isLoadingUp, setIsLoadingUp] = useState(false);
  const [successUp, setSuccessUp] = useState(false);
  const [errorUp, setErrorUp] = useState(false);
  const [message, setMessage] = useState("");
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["getAdmin", id],
    queryFn: () => GetUser(id),
  });

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setNamaLengkap(data ? data.nama_lengkap : "");
      setUsername(data ? data.username : "");
      setEmail(data ? data.email : "");
      setPassword(data ? data.password : "");
      setNomorHp(data ? data.no_hp : "");
      setDomisili(data ? data.domisili : "");
      setTempatLahir(data ? data.tempat_lahir : "");
      setTanggalLahir(data ? data.tanggal_lahir : "");
    }
  }, [data, isLoading, isError]);

  const handleUpdate = async () => {
    setIsLoadingUp(true);
    try {
      const newData = {
        nama_lengkap: namaLengkap,
        username: username,
        email: email,
        password: password,
        no_hp: nomorHp,
        domisili: domisili,
        tempat_lahir: tempatLahir,
        tanggal_lahir: tanggalLahir,
      };
      const response = await updateUser(id, newData);
      if (response.status === 200) {
        setSuccessUp(true);
        setMessage("Data berhasil diperbarui");
        setIsLoadingUp(false);
      } else {
        setErrorUp(true);
        setMessage("Terjadi kesalahan dalam memperbarui data");
      }
    } catch (error) {
      setErrorUp(true);
      setMessage("Terjadi kesalahan dalam memperbarui data: " + error.message);
    } finally {
      setTimeout(() => {
        setSuccessUp(false);
        setErrorUp(false);
        setMessage("");
      }, 2000);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="nama_lengkap">Nama Lengkap</Label>
          <Input
            id="nama_lengkap"
            name="nama_lengkap"
            type="text"
            value={namaLengkap}
            onChange={(e) => setNamaLengkap(e.target.value)}
          />
        </FormGroup>
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
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="no_hp">NO HP</Label>
          <Input
            id="no_hp"
            name="no_hp"
            type="number"
            value={nomorHp}
            onChange={(e) => setNomorHp(e.target.value)}
          />
        </FormGroup>

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
        <FormGroup>
          <Label for="password">Tempat, Tanggal Lahir</Label>
          <Row>
            <Col className="d-flex flex-row justify-content-center">
              <Input
                id="tempat_lahir"
                name="tempat_lahir"
                placeholder="Tempat lahir"
                type="text"
                className="w-25"
                value={tempatLahir}
                onChange={(e) => setTempatLahir(e.target.value)}
              />
              <Input
                id="tanggal_lahir"
                name="tanggal_lahir"
                placeholder="Tanggal lahir"
                type="date"
                className="w-75"
                value={formatTanggal(tanggalLahir)}
                onChange={(e) => setTanggalLahir(e.target.value)}
              />
            </Col>
          </Row>
        </FormGroup>
        <Row>
          <Col className="d-flex flex-row justify-content-start">
            <Button onClick={handleUpdate} color="warning">
              {isLoadingUp ? <ClipLoading /> : "Update"}
            </Button>
            {successUp && (
              <AlertSuccess messages={message} refetch={"getAdmin"} />
            )}
            {errorUp && (
              <AlertSuccess messages={message} refetch={"getAdmin"} />
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Profil;
