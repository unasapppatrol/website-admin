import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "../ModalScale.css";
import { deleteAktivitas } from "../../../api/aktivitas";
import { ClipLoading } from "../../Loading";

function ModalHapusAktivitas({ openModal, closeModal, data }) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const deleteAktivitasMutation = useMutation({
    mutationFn: deleteAktivitas,
    onSuccess: async () => {
      setIsLoading(false);
      await queryClient.refetchQueries(["getAktivitas"]);
      closeModal();
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const handleDelete = async () => {
    setIsLoading(true);
    deleteAktivitasMutation.mutate(data._id);
  };

  return (
    <Modal
      isOpen={openModal}
      onClosed={closeModal}
      className="custom-modal-delete"
    >
      <ModalHeader toggle={closeModal}>Hapus laporan aktivitas ? </ModalHeader>
      <ModalBody>data laporan aktivitas {data.username} akan dihapus</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={handleDelete}>
          {isLoading ? <ClipLoading /> : "Hapus"}
        </Button>{" "}
        <Button outline color="danger" onClick={closeModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalHapusAktivitas;
