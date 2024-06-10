import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
import "../ModalScale.css";
import { useMutation } from "@tanstack/react-query";
import { deletePos } from "../../../api/pos";
import { AlertSuccess, AlertError } from "../../Alert";
import { ClipLoading } from "../../Loading";

function ModalHapusPos({ openModal, closeModal, data }) {
  const [alertVisibleSuccess, setAlertVisibleSuccess] = useState(false);
  const [alertVisibleError, setAlertVisibleError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const deletePosMutation = useMutation({
    mutationFn: deletePos,
    onSuccess: async () => {
      setAlertVisibleSuccess(true);
      setIsLoading(false);
      setSuccessMessage("Data pos berhasil dihapus");
      setTimeout(() => {
        setAlertVisibleSuccess(false);
        closeModal();
      }, 2000);
    },
    onError: (error) => {
      setIsLoading(false);
      setAlertVisibleError(true);
      setErrorMessage(
        "Terjadi kesalahan dalam menghapus data pos",
        error.message
      );
      setTimeout(() => {
        setAlertVisibleError(false);
        closeModal();
      }, 2000);
    },
  });

  const handleDelete = async () => {
    setIsLoading(true);
    deletePosMutation.mutate(data._id);
  };

  return (
    <div>
      <Modal
        isOpen={openModal}
        onClosed={closeModal}
        className="custom-modal-delete"
      >
        <ModalHeader toggle={closeModal}>Hapus Pos ? </ModalHeader>

        <ModalBody>
          {alertVisibleSuccess && (
            <AlertSuccess messages={successMessage} refetch={"getPos"} />
          )}
          {alertVisibleError && (
            <AlertError messages={errorMessage} refetch={"getPos"} />
          )}
          Lokasi {data.lokasi_barcode} dari {data.nama_instansi} akan dihapus
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            {isLoading ? <ClipLoading isloading={isLoading} /> : "Hapus"}
          </Button>{" "}
          <Button outline color="danger" onClick={closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalHapusPos;
