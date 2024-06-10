import React, { useState } from "react";
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
import { updatePos } from "../../../api/pos";
import Loader from "../../../layouts/loader/Loader";

function ModalEditPos({ openModal, closeModal, data }) {
  const [loading, setLoading] = useState(false);
  const [namaInstansi, setNamaInstansi] = useState("");
  const [lokasiBarcode, setLokasiBarcode] = useState("");

  const editData = {
    nama_instansi: namaInstansi,
    lokasi_barcode: lokasiBarcode,
  };

  const handleOnUpdate = async () => {
    try {
      setLoading(true);
      await updatePos(data._id, editData);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        isOpen={openModal}
        onClosed={closeModal}
        className="custom-modal-delete"
      >
        <ModalHeader toggle={closeModal}>Form Edit User</ModalHeader>

        <ModalBody>
          {loading && <Loader />}
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="username">Nama Instansi</Label>
                  <Input
                    id="nama_instansi"
                    name="nama_instansi"
                    type="select"
                    onChange={(e) => setNamaInstansi(e.target.value)}
                  >
                    <option>UNAS Pejanten</option>
                    <option>UNAS Ragunan</option>
                    <option>UNAS Bambu Kuning</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="email">Lokasi Barcode</Label>
                  <Input
                    id="lokasi"
                    name="lokasi_barcode"
                    type="text"
                    placeholder={data.lokasi_barcode}
                    value={lokasiBarcode}
                    onChange={(e) => setLokasiBarcode(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={handleOnUpdate}>
            Update
          </Button>{" "}
          <Button color="danger" onClick={closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalEditPos;
