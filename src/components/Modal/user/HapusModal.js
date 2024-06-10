import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../ModalScale.css";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../../api/users";
import { AlertError, AlertSuccess } from "../../Alert";
import { ClipLoading } from "../../Loading";

function ModalHapusUser({ openModal, closeModal, data, setModalHapus }) {
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [errorDelete, setErrorDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteUserMutation = useMutation({
    mutationKey: "deleteUser",
    mutationFn: deleteUser,
    onSuccess: async () => {
      setIsLoading(false);
      setSuccessDelete(true);
      setSuccessMessage("data user berhasil dihapus");
      setModalHapus(false);
    },
    onError: (error) => {
      setIsLoading(false);

      setErrorDelete(true);
      setErrorMessage(`Terjadi kesalahan dalam menghapus data user`, error);
    },
  });
  const handleOnDelete = async () => {
    setIsLoading(true);
    deleteUserMutation.mutate(data._id);
  };
  return (
    <div>
      <Modal
        isOpen={openModal}
        onClosed={closeModal}
        className="custom-modal-delete"
      >
        <ModalHeader toggle={closeModal}>Hapus user ? </ModalHeader>
        <ModalBody>username {data.username} akan dihapus</ModalBody>
        {successDelete && (
          <AlertSuccess messages={successMessage} refetch={"getUsers"} />
        )}
        {errorDelete && (
          <AlertError messages={errorMessage} refetch={"getUsers"} />
        )}
        <ModalFooter>
          <Button color="danger" onClick={handleOnDelete}>
            {isLoading ? <ClipLoading /> : "Hapus"}
          </Button>{" "}
          <Button outline color="danger" onClick={closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalHapusUser;
