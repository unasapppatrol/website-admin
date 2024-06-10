import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../ModalScale.css";
import QRCode from "qrcode";

function ModalCetakQrCode({ openModal, closeModal, data }) {
  const [namaInstansi, setNamaInstansi] = useState("");
  const [lokasiBarcode, setLokasiBarcode] = useState("");
  const [QrCode, setQrCode] = useState(null);

  useEffect(() => {
    if (data) {
      setNamaInstansi(data.nama_instansi || "");
      setLokasiBarcode(data.lokasi_barcode || "");
    }
  }, [data]);

  const dataToQr = {
    namaInstansi,
    lokasiBarcode,
  };

  const generateQrCode = async () => {
    try {
      const url = JSON.stringify(dataToQr);
      const qrCodeURL = await QRCode.toDataURL(url, {
        width: 800,
        margin: 2,
        color: {
          dark: "#2F3E46",
        },
      });
      setQrCode(qrCodeURL);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  useEffect(() => {
    generateQrCode();
  });

  const handleOnDownload = async () => {
    try {
      const canvas = document.createElement("canvas");
      const img = new Image();
      img.src = QrCode;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${lokasiBarcode}.png`;
        link.click();
      };
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  };

  return (
    <div>
      <Modal
        isOpen={openModal}
        onClosed={closeModal}
        className="custom-modal-delete"
      >
        <ModalHeader toggle={closeModal}>Cetak Barcode ?</ModalHeader>
        <ModalBody className="d-flex justify-content-center">
          {QrCode && (
            <img src={QrCode} alt="qr code" width={300} height={300} />
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleOnDownload}>
            Cetak
          </Button>{" "}
          <Button outline color="danger" onClick={closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalCetakQrCode;
