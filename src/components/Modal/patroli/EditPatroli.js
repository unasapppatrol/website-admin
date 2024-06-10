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
import { GetPosByInstansi } from "../../../api/pos";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../../layouts/loader/Loader";
import { updatePatroli } from "../../../api/patroli";

function ModalEditPatroli({ openModal, closeModal, data }) {
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
  const [status, setStatus] = useState("");
  const [lokasiPos, setLokasiPos] = useState("");
  const [notes, setNotes] = useState("");
  const [waktuPatroli, setWaktuPatroli] = useState("");
  const [namaInstansi, setNamaInstansi] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      setUsername(data.username || "");
      setNamaInstansi(data.nama_instansi || "");
      setStatus(data.status);
      setLokasiPos(data.lokasi_pos || "");
      setNotes(data.notes || "");
      setWaktuPatroli(data.createdAt || "");
    }
  }, [data]);

  const {
    isLoading: isLoadingPos,
    isError: isErrorPos,
    data: dataPos,
    error: errorPos,
  } = useQuery({
    queryKey: ["getPos", { lokasi_pos: namaInstansi }],
    queryFn: ({ queryKey }) => GetPosByInstansi(queryKey[1]),
  });
  if (isLoadingPos) {
    return <p>Loading pos....</p>;
  }

  const handleOnEdit = () => {
    setIsEdit(true);
  };

  const newData = {
    nama_instansi: namaInstansi,
    lokasi_pos: lokasiPos,
    status: status,
  };

  const handleOnSubmit = async () => {
    setIsLoadingUpdate(true);
    try {
      const response = await updatePatroli(data._id, newData);
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
        setErrorMsg("terjadi kesalahan dalam memperbarui data patroli");
        setTimeout(() => {
          setIsError(false);
          setErrorMsg("");
        }, 2000);
      }
    } catch (error) {
      setIsLoadingUpdate(false);
      setIsError(true);
      setErrorMsg("terjadi kesalahan dalam memperbarui data patroli");
      setTimeout(() => {
        setIsError(false);
        setErrorMsg("");
      }, 2000);
    }
    await queryClient.refetchQueries("getPatroli");
  };
  return (
    <Modal
      isOpen={openModal}
      onClosed={closeModal}
      className="custom-modal-width"
    >
      {isLoadingUpdate && <Loader />}

      <ModalHeader toggle={closeModal}>
        Form Edit Patroli {username}
      </ModalHeader>

      {isLoading && <p>Memuat data detail Patroli</p>}
      <div className="d-flex justify-content-end mx-4 mt-3">
        <Button color="warning" onClick={handleOnEdit} className="">
          <i className="bi bi-pencil-square"></i>
        </Button>
      </div>

      <ModalBody>
        {isErrorPos && (
          <p>Terjadi kesalahan dalam mengambil data pos ,{errorPos.message}</p>
        )}
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
                <Label for="instansi patroli">Instansi Patroli</Label>
                {isEdit ? (
                  <Input
                    id="instansi patroli"
                    name="instansi patroli"
                    type="select"
                    value={namaInstansi}
                    onChange={(e) => setNamaInstansi(e.target.value)}
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
                    defaultValue={namaInstansi}
                    readOnly
                  />
                )}
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="status patroli">Status Patroli</Label>
                {isEdit ? (
                  <Input
                    id="status patroli"
                    name="status patroli"
                    type="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">----------</option>
                    <option value="Kebakaran">Kebakaran</option>
                    <option value="Aman">Aman</option>
                    <option value="Demonstrasi">Demonstrasi</option>
                    <option value="Pencurian">Pencurian</option>
                  </Input>
                ) : (
                  <Input
                    id="status patroli"
                    name="status patroli"
                    type="text"
                    defaultValue={status}
                    readOnly
                  />
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="Lokasi Patroli">Lokasi Patroli</Label>
                {isEdit ? (
                  <Input
                    id="Lokasi Patroli"
                    name="Lokasi Patroli"
                    type={"select"}
                    value={lokasiPos}
                    onChange={(e) => setLokasiPos(e.target.value)}
                  >
                    {dataPos.map((dat, id) => {
                      return (
                        <option value={dat.lokasi_barcode} key={id}>
                          {dat.lokasi_barcode}
                        </option>
                      );
                    })}
                  </Input>
                ) : (
                  <Input
                    id="Lokasi Patroli"
                    name="Lokasi Patroli"
                    type={"text"}
                    defaultValue={lokasiPos}
                    readOnly
                  ></Input>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="Tanggal Patroli">Tanggal Patroli</Label>
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
                <Label for="Waktu Patroli">Waktu Patroli</Label>
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
          <Row>
            <Col>
              <FormGroup>
                <Label for="Catatan">Catatan Patroli</Label>
                <Input
                  id="Catatan"
                  name="Catatan"
                  type="text"
                  defaultValue={notes}
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

export default ModalEditPatroli;
