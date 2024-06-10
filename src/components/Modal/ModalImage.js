import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ModalImage({ openModal, closeModal, data }) {
  const [loading, setLoading] = useState(true); // State untuk mengontrol loading

  useEffect(() => {
    if (data) {
      setLoading(false); // Atur loading menjadi false ketika data tersedia
    }
  }, [data]);

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
      className="custom-modal-delete"
    >
      <ModalHeader toggle={closeModal}>Preview Image</ModalHeader>
      <ModalBody>
        {loading ? ( // Tampilkan loading jika loading adalah true
          <div>Loading...</div>
        ) : (
          // Tampilkan gambar setelah loading selesai
          <img
            src={getImageLink(data.image)}
            alt="drive"
            width="100%"
            height="100%"
          />
        )}
      </ModalBody>
      <ModalFooter>
        <Button outline color="danger" onClick={closeModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalImage;
