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

function ModalDetailAktivitas({ openModal, closeModal, data }) {
  // DATA
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [username, setUsername] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [waktuPatroli, setWaktuPatroli] = useState("");
  const [namaInstansi, setNamaInstansi] = useState("");

  if (isLoading) {
    <Loader />;
  }

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      setUsername(data.username || "");
      setNamaLengkap(data.nama_lengkap || "");
      setNamaInstansi(data.instansi_aktivitas || "");
      setLocation(data.pos_aktivitas || "");
      setNotes(data.notes_aktivitas || "");
      setWaktuPatroli(data.createdAt || "");
    }
  }, [data]); // Mereact hanya ketika properti data berubah

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
                <Label for="instansi patroli">Instansi Aktivitas</Label>
                <Input
                  id="instansi patroli"
                  name="instansi patroli"
                  type="text"
                  defaultValue={namaInstansi}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="Lokasi Patroli">Lokasi Aktivitas</Label>
                <Input
                  id="Lokasi Patroli"
                  name="Lokasi Patroli"
                  type="text"
                  defaultValue={location}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="Tanggal Patroli">Tanggal Aktivitas</Label>
                <Input
                  id="Tanggal Patroli"
                  name="Tanggal Patroli"
                  type="text"
                  defaultValue={waktuPatroli ? DateFormat(waktuPatroli) : ""}
                  disabled
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="Waktu Patroli">Waktu Aktivitas</Label>
                <Input
                  id="Waktu Patroli"
                  name="Waktu Patroli"
                  type="text"
                  defaultValue={waktuPatroli ? TimeFormat(waktuPatroli) : ""}
                  disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="Catatan">Catatan Aktivitas</Label>
                <Input
                  id="Catatan"
                  name="Catatan"
                  type="text"
                  defaultValue={notes}
                />
              </FormGroup>
            </Col>
          </Row>
          {data.image.map((dat, id) => (
            <div
              key={id}
              style={{ position: "relative", width: "400px", height: "300px" }}
            >
              {isLoadingImage && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  Load image
                </div>
              )}
              <img
                src={getImageLink(dat)}
                alt="drive"
                width="400"
                height="300"
                style={{
                  margin: "10px",
                  display: isLoading ? "none" : "block",
                }}
                onLoad={() => setIsLoadingImage(false)}
              />
            </div>
          ))}
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

export default ModalDetailAktivitas;
