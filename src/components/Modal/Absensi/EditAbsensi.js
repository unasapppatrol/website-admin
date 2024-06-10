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
import { DateFormat, TimeFormat } from "../../../utils/DateFormat";
import { useQueryClient } from "@tanstack/react-query";
import { updateAktivitas } from "../../../api/aktivitas";
import Loader from "../../../layouts/loader/Loader";

function ModalEditAbsensi({ openModal, closeModal, data }) {
  const queryClient = useQueryClient();
  // DATA
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState("");
  const [waktuPatroli, setWaktuPatroli] = useState("");
  const [lokasiAbsen, setLokasiAbsen] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      setUsername(data.username || "");
      setLokasiAbsen(data.lokasi_absen || "");
      setWaktuPatroli(data.checkInTime || "");
    }
  }, [data]);

  const handleOnEdit = () => {
    setIsEdit(true);
  };

  const newData = {};

  const handleOnSubmit = async () => {
    setIsLoadingUpdate(true);
    try {
      const response = await updateAktivitas(data._id, newData);
      if (response.status === 200) {
        setIsSuccess(true);
        setIsLoadingUpdate(false);
        setAlertVisible(true);
        setSuccessMsg(response.data.message);
        setTimeout(() => {
          setAlertVisible(false);
          setIsSuccess(false);
          setSuccessMsg("");
          closeModal();
        }, 2000);
      } else {
        setIsLoadingUpdate(false);
        setIsError(true);
        setErrorMsg("terjadi kesalahan dalam memperbarui data aktivitas");
        setTimeout(() => {
          setIsError(false);
          setErrorMsg("");
        }, 2000);
      }
    } catch (error) {
      setIsLoadingUpdate(false);
      setIsError(true);
      setErrorMsg("terjadi kesalahan dalam memperbarui data aktivitas");
      setTimeout(() => {
        setIsError(false);
        setErrorMsg("");
      }, 2000);
    }
    await queryClient.refetchQueries("getAktivitas");
  };
  return (
    <Modal
      isOpen={openModal}
      onClosed={closeModal}
      className="custom-modal-width"
    >
      {isLoadingUpdate && <Loader />}

      <ModalHeader toggle={closeModal}>
        Form edit absensi {username}
      </ModalHeader>

      {isLoading && <p>Memuat data detail aktivitas</p>}
      <div className="d-flex justify-content-end mx-4 mt-3">
        <Button color="warning" onClick={handleOnEdit} className="">
          <i className="bi bi-pencil-square"></i>
        </Button>
      </div>

      <ModalBody>
        {isError && (
          <div className="alert alert-danger" role="alert">
            {errorMsg}
          </div>
        )}
        {isSuccess && (
          <div className="alert alert-success" role="alert">
            {successMsg}
          </div>
        )}
        <Form>
          <Row>
            <Col>
              <FormGroup>
                <Label for="instansi patroli">Lokasi Absen</Label>
                {isEdit ? (
                  <Input
                    id="instansi patroli"
                    name="instansi patroli"
                    type="select"
                    value={lokasiAbsen}
                    onChange={(e) => setLokasiAbsen(e.target.value)}
                  >
                    <option value="">----------</option>
                    <option value="UNAS Pejaten">UNAS Pejaten</option>
                    <option value="UNAS Ragunan">UNAS Ragunan</option>
                    <option value="UNAS Bambu Kuning">UNAS Bambu Kuning</option>
                  </Input>
                ) : (
                  <Input
                    id="instansi patroli"
                    name="instansi patroli"
                    type="text"
                    defaultValue={lokasiAbsen}
                    readOnly
                  />
                )}
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
                  readOnly
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
                  readOnly
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleOnSubmit}>
          Kirim Perubahan
        </Button>
        <Button color="danger" onClick={closeModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalEditAbsensi;
