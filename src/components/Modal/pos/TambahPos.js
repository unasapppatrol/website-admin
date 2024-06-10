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
} from "reactstrap";
import "../ModalScale.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePos } from "../../../api/pos";
import { AlertError, AlertSuccess } from "../../Alert";
import { ClipLoading } from "../../Loading";

function ModalAddPos({ openModal, closeModal, setModalTambah }) {
  const [namaInstansi, setNamaInstansi] = useState("UNAS Pejaten");
  const [lokasiPos, setLokasiPos] = useState("");
  const [alertVisibleSuccess, setAlertVisibleSuccess] = useState(false);
  const [alertVisibleError, setAlertVisibleError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createPosMutation = useMutation({
    mutationFn: CreatePos,
    onSuccess: async () => {
      setIsLoading(false);
      setSuccessMessage(`Data Pos ${namaInstansi} berhasil ditambah`);
      setAlertVisibleSuccess(true);
      setNamaInstansi("UNAS Pejaten");
      setLokasiPos("");
      setModalTambah(false);
    },
    onError: (error) => {
      setIsLoading(false);
      setAlertVisibleError(true);
      setErrorMessage("Gagal menambah pos. Silakan coba lagi", error);
    },
  });

  const handleTambahPos = async () => {
    setIsLoading(true);
    createPosMutation.mutate({
      nama_instansi: namaInstansi,
      lokasi_barcode: lokasiPos,
    });
  };

  return (
    <div>
      <Modal
        isOpen={openModal}
        onClosed={closeModal}
        className="custom-modal-delete"
      >
        <ModalHeader toggle={closeModal} className="mb-2">
          Form Tambah Pos
        </ModalHeader>

        <div className="mx-2">
          {alertVisibleSuccess && (
            <AlertSuccess messages={successMessage} refetch={"getPos"} />
          )}
          {alertVisibleError && (
            <AlertError messages={errorMessage} refetch={"getPos"} />
          )}
        </div>
        <ModalBody>
          <Form>
            <Row>
              <FormGroup>
                <Label for="nama_instansi">Nama Instansi</Label>
                <Input
                  id="nama_instansi"
                  name="nama_instansi"
                  type="select"
                  onChange={(e) => setNamaInstansi(e.target.value)}
                >
                  <option value="UNAS Pejaten">UNAS Pejaten</option>
                  <option value="UNAS Ragunan">UNAS Ragunan</option>
                  <option value="UNAS Bambu Kuning">UNAS Bambu Kuning</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="lokasi_barcode">Lokasi Pos Barcode</Label>
                <Input
                  id="lokasi_barcode"
                  name="lokasi_barcode"
                  type="ltext"
                  onChange={(e) => setLokasiPos(e.target.value)}
                />
              </FormGroup>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleTambahPos}>
            {isLoading ? <ClipLoading isloading={isLoading} /> : "Tambah"}
          </Button>
          <Button color="danger" onClick={closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalAddPos;
