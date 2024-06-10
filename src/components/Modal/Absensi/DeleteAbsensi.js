import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "../ModalScale.css";
import { deleteAbsensi } from "../../../api/absensi";
import { ClipLoading } from "../../Loading";

function ModalHapusAbsensi({ openModal, closeModal, data }) {
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);

  const deleteAbsensiMutation = useMutation({
    mutationFn: deleteAbsensi,
    onSuccess: async () => {
      setIsLoading(false);
      await queryClient.refetchQueries(["getAbsensi"]);
      closeModal();
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteAbsensiMutation.mutate(data._id);
  };

  return (
    <Modal
      isOpen={openModal}
      onClosed={closeModal}
      className="custom-modal-delete"
    >
      <ModalHeader toggle={closeModal}>Hapus absensi ? </ModalHeader>
      <ModalBody>data absen {data.username} akan dihapus</ModalBody>
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

export default ModalHapusAbsensi;
