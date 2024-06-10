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
  Col,
} from "reactstrap";
import "../ModalScale.css";
import Loader from "../../../layouts/loader/Loader";
import { DateFormat, TimeFormat } from "../../../utils/DateFormat";

function ModalDetailAbsensi({ openModal, closeModal, data }) {
  // DATA
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [lokasiAbsen, setLokasiAbsen] = useState("");
  const [waktuPatroli, setWaktuPatroli] = useState("");
  const [namaInstansi, setNamaInstansi] = useState("");

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      setUsername(data.username || "");
      setNamaLengkap(data.nama_lengkap || "");
      setNamaInstansi(data.nama_instansi || "");
      setLokasiAbsen(data.lokasi_absen || "");
      setWaktuPatroli(data.createdAt || "");
    }
  }, [data]); // Mereact hanya ketika properti data berubah

  if (isLoading) {
    <Loader />;
  }

  const getImageLink = (link) => {
    if (!link) {
      return ""; // Return empty string if link is null or undefined
    }
    var newLink = link.replace(
      "https://drive.google.com/uc?export=view&id=",
      "https://lh3.google.com/u/0/d/"
    );

    return newLink;
  };
  return (
    <Modal
      isOpen={openModal}
      onClosed={closeModal}
      className="custom-modal-width"
    >
      <ModalHeader toggle={closeModal}>Form Detail {username}</ModalHeader>

      <ModalBody>
        <Form>
          <Row>
            <Col>
              <FormGroup>
                <Label for="petugas">Petugas</Label>
                <Input
                  id="petugas"
                  name="petugas"
                  type="text"
                  defaultValue={namaLengkap}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="Lokasi Absen">Lokasi Absensi</Label>
                <Input
                  id="Lokasi Absen"
                  name="Lokasi Absen"
                  type="text"
                  defaultValue={lokasiAbsen}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row></Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="Tanggal Patroli">Tanggal Absensi</Label>
                <Input
                  id="Tanggal Patroli"
                  name="Tanggal Patroli"
                  type="text"
                  defaultValue={waktuPatroli ? DateFormat(waktuPatroli) : ""}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="Waktu Patroli">Waktu Absensi</Label>
                <Input
                  id="Waktu Patroli"
                  name="Waktu Patroli"
                  type="text"
                  defaultValue={waktuPatroli ? TimeFormat(waktuPatroli) : ""}
                  readOnly
                />
              </FormGroup>
            </Col>
          </Row>
          <Row></Row>
          <img
            src={getImageLink(data.image)}
            alt="drive"
            width="400"
            height="300"
          />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={closeModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalDetailAbsensi;
