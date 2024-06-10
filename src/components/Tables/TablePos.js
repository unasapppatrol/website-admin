import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  Table,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useQuery } from "@tanstack/react-query";
import { GetPos, GetPosByInstansi } from "../../api/pos";
import ModalHapusPos from "../Modal/pos/DeletePos";
import ModalAddPos from "../Modal/pos/TambahPos";
import PaginationComponent from "./Pagination";
import Loader from "../../layouts/loader/Loader";
import ModalCetakQrCode from "../Modal/pos/QrCode";
import logo from "../../assets/images/logos/logo_unas.png";

function TablePos() {
  const [selectedInstansi, setSelectedInstansi] = useState("All");
  const [modalTambah, setModalTambah] = useState(false);
  const [modalHapus, setModalHapus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Tentukan jumlah item per halaman
  const [hapusData, setHapusData] = useState([]);
  const [ModalQrcode, setModalQrcode] = useState(false);
  const [dataQrcode, setDataQrcode] = useState([]);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["getPos", { lokasi_pos: selectedInstansi }],
    queryFn: ({ queryKey }) => GetPosByInstansi(queryKey[1]),
  });

  const openModalTambah = () => {
    setModalTambah(true);
  };
  const closeModalTambah = () => {
    setModalTambah(false);
  };

  const handleHapusPos = (data) => {
    setHapusData(data);
    setModalHapus(true);
  };
  const hanldeClosePos = () => {
    setModalHapus(false);
  };

  const handleQrcode = (data) => {
    setModalQrcode(true);
    setDataQrcode(data);
  };
  const handleCloseQrcode = () => {
    setModalQrcode(false);
  };
  const downloadPDF = () => {
    const doc = new jsPDF();

    const header = (data) => {
      doc.addImage(logo, "PNG", data.settings.margin.left, 10, 30, 30);
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Rekap data pos ${selectedInstansi}`,
        data.settings.margin.left + 35,
        20
      );
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(
        "Jl. Sawo Manila No.61, RT.14/RW.7, Pejaten Bar., Ps. Minggu, Kota Jakarta Selatan",
        data.settings.margin.left + 35,
        30,
        data.settings.width - data.settings.margin.right,
        40
      );
      doc.text(
        "Daerah Khusus Ibukota Jakarta 12520",
        data.settings.margin.left + 35,
        35,
        data.settings.width - data.settings.margin.right,
        40
      );
      doc.text(
        "Telepon: (021) 7806700 | Email: info@unas.ac.id",
        data.settings.margin.left + 35,
        40
      );

      doc.line(
        data.settings.margin.left,
        45,
        doc.internal.pageSize.width - data.settings.margin.right,
        45
      );
    };
    const columns = ["Nama Instansi", "Lokasi Pos"];

    const rows = [];
    data.forEach((tdata) => {
      rows.push([tdata.nama_instansi, tdata.lokasi_barcode]);
    });

    const options = {
      exclude: ["Action"],
    };

    doc.autoTable({
      didDrawPage: header,
      margin: { top: 50 },
      head: [columns],
      body: rows,
      options,
    });

    doc.save("data pos.pdf");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    ? data.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = data && data ? Math.ceil(data.length / itemsPerPage) : 0;

  // Mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    <div>
      <h2>Terjadi kesalahan, refresh ulang</h2>
    </div>;
  }
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h6" className="border-bottom p-3 mb-2">
            <i className="bi bi-card-text me-2"> </i>
            Data Pos
          </CardTitle>
          <div className="border-bottom my-3">
            <FormGroup className="w-50 ">
              <Label for="lokasiSelect">Instansi : </Label>
              <Input
                id="lokasiSelect"
                name="select"
                type="select"
                value={selectedInstansi}
                onChange={(e) => setSelectedInstansi(e.target.value)}
              >
                <option value="All">Semua Instansi</option>
                <option value="UNAS Pejaten">UNAS Pejaten</option>
                <option value="UNAS Ragunan">UNAS Ragunan</option>
                <option value="UNAS Bambu Kuning">UNAS Bambu Kuning</option>
              </Input>
            </FormGroup>
          </div>
          <div>Total Pos {data ? data.length : "-"}</div>
          <div className="d-flex justify-content-end button-group my-2">
            <Button
              className="btn"
              outline
              color="success"
              onClick={openModalTambah}
            >
              Tambah <i className="bi bi-person-fill-add"></i>
            </Button>
            <Button
              className="btn"
              outline
              color="primary"
              onClick={downloadPDF}
            >
              Export
              <i className="mx-2 bi bi-file-earmark-pdf-fill"></i>
            </Button>
          </div>
          <Table bordered striped>
            <thead>
              <tr>
                <th>Nama Instansi</th>
                <th>Lokasi Barcode</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                currentItems.map((data, id) => {
                  return (
                    <tr key={id}>
                      <td>{data.nama_instansi}</td>
                      <td>{data.lokasi_barcode}</td>
                      <td
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          className="btn btn-hapus"
                          outline
                          color="danger"
                          onClick={() => {
                            handleHapusPos(data);
                          }}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </Button>
                        <Button
                          className="btn btn-edit"
                          outline
                          color="primary"
                          onClick={() => handleQrcode(data)}
                        >
                          <i className="bi bi-upc-scan"></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />

          <ModalAddPos
            openModal={modalTambah}
            closeModal={closeModalTambah}
            setModalTambah={setModalTambah}
          />
          <ModalHapusPos
            openModal={modalHapus}
            closeModal={hanldeClosePos}
            data={hapusData}
          />
          <ModalCetakQrCode
            openModal={ModalQrcode}
            closeModal={handleCloseQrcode}
            data={dataQrcode}
          />
        </CardBody>
      </Card>
    </div>
  );
}

export default TablePos;
