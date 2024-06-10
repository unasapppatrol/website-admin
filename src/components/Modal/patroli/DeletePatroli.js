import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "../ModalScale.css";
import { deletePatroli } from "../../../api/patroli";
import { ClipLoading } from "../../Loading";

function ModalHapusPatroli({ openModal, closeModal, data }) {
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);

  const deleteAbsensiMutation = useMutation({
    mutationFn: deletePatroli,
    onSuccess: async () => {
      setIsLoading(true);
      await queryClient.refetchQueries(["getPatroli"]);
      closeModal();
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const handleDelete = async () => {
    setIsLoading(true);
    deleteAbsensiMutation.mutate(data._id);
  };

  return (
    <Modal
      isOpen={openModal}
      onClosed={closeModal}
      className="custom-modal-delete"
    >
      <ModalHeader toggle={closeModal}>Hapus patroli ? </ModalHeader>
      <ModalBody>data laporan patroli {data.username} akan dihapus</ModalBody>
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

export default ModalHapusPatroli;
