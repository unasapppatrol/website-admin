import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import React, { useState, useEffect } from "react";
import { iconPerson } from "../../utils/icon";

function ModalMaps({ openModal, closeModal, data }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setIsLoading(false); // Atur loading menjadi false ketika data tersedia
    }
  }, [data]);

  return (
    <Modal
      isOpen={openModal}
      onClosed={closeModal}
      className="custom-modal-width"
    >
      <ModalHeader toggle={closeModal}>
        Lokasi Absensi : {data ? data.lokasi_absen : ""}{" "}
      </ModalHeader>
      <ModalBody>
        {isLoading ? (
          <div className="bg bg-warning">
            <p>Loading...</p>
          </div>
        ) : (
          <MapContainer
            center={[data.latitude, data.longitude]}
            zoom={40}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {data.latitude && data.longitude && (
              <Marker
                position={[data.latitude, data.longitude]}
                icon={iconPerson}
              ></Marker>
            )}
          </MapContainer>
        )}
      </ModalBody>
      <ModalFooter>
        <Button outline color="danger" onClick={closeModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalMaps;
