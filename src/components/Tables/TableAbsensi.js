import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import { getAbsensiByLokasi } from "../../api/absensi";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../layouts/loader/Loader";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Perlu diimpor untuk menggunakan metode autoTable
import { DateFormat, TimeFormat } from "../../utils/DateFormat";
import ModalHapusAbsensi from "../Modal/Absensi/DeleteAbsensi";
import ModalImage from "../Modal/ModalImage";
import ModalMaps from "../Modal/ModalMaps";
import ModalDetailAbsensi from "../Modal/Absensi/DetailAbsensi";
import PaginationComponent from "./Pagination";
import ModalEditAbsensi from "../Modal/Absensi/EditAbsensi";
import logo from "../../assets/images/logos/logo_unas.png";
const TableAbsensi = () => {
  const [lokasi, setLokasi] = useState("All");
  const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dataDelete, setDataDelete] = useState(null);
  const [dataDetail, setDataDetail] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [dataImage, setDataImage] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [dataMap, setDataMap] = useState(null);
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["getAbsensiByLokasi", { lokasi_absen: lokasi }],
    queryFn: ({ queryKey }) => getAbsensiByLokasi(queryKey[1]),
  });

  if (isLoading) {
    return <Loader />;
  }

  const downloadPDF = () => {
    setLoading(true);

    const doc = new jsPDF();
    const header = (data) => {
      doc.addImage(logo, "PNG", data.settings.margin.left, 10, 30, 30);
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.setFont("helvetica", "normal");
      doc.text(`Laporan Absensi ${lokasi}`, data.settings.margin.left + 35, 20);
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

    doc.autoTable({
      didDrawPage: header,
      margin: { top: 50 },
      head: [
        [
          "nama Lengkap",
          "lokasi Absen",
          "Tanggal Absensi",
          "Jam Masuk",
          "Jam Keluar",
          "Total jam kerja",
        ],
      ],
      body: data.absen.map((tdata) => [
        tdata.nama_lengkap,
        tdata.lokasi_absen,
        DateFormat(tdata.createdAt),
        TimeFormat(tdata.checkInTime),
        TimeFormat(tdata.checkOutTime),
        tdata.total_jam_kerja,
      ]),
    });

    doc.save("absensi.pdf");
    setLoading(false);
  };
  const handlOnDelete = async (data) => {
    setDataDelete(data);
    setIsDelete(true);
  };

  const handleOnDetail = async (data) => {
    setDataDetail(data);
    setIsDetail(true);
  };
  const handleOnEdit = async (data) => {
    setDataEdit(data);
    setIsEdit(true);
  };

  const getImageLink = (link) => {
    if (!link) {
      return "";
    }
    var newLink = link.replace(
      "https://drive.google.com/uc?export=view&id=",
      "https://lh3.google.com/u/0/d/"
    );

    return newLink;
  };

  const handleShowImage = (tdata) => {
    setShowImage(true);
    setDataImage(tdata);
  };

  const handleCloseImage = () => {
    setShowImage(false);
  };

  const handleShowMap = (tdata) => {
    setShowMap(true);
    setDataMap(tdata);
  };

  const handleCloseMap = () => {
    setShowMap(false);
  };

  const sortedData = [...data.absen].sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    if (sortDirection === "asc") {
      return timeA - timeB;
    } else {
      return timeB - timeA;
    }
  });

  // Mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h6" className="border-bottom p-3 mb-2">
            <i className="bi bi-card-text me-2"> </i>
            Data Presensi
          </CardTitle>
          {isError && <Alert color="danger">{error.message}</Alert>}
          <div className="border-bottom my-3">
            <FormGroup className="w-25 ">
              <Label for="lokasiSelect">Lokasi Absen : {lokasi}</Label>
              <Input
                id="lokasiSelect"
                name="select"
                type="select"
                onChange={(e) => setLokasi(e.target.value)}
              >
                <option value="All">Semua Lokasi</option>
                <option value="UNAS Pejaten">UNAS Pejaten</option>
                <option value="UNAS Ragunan">UNAS Ragunan</option>
                <option value="UNAS Bambu Kuning">UNAS Bambu Kuning</option>
              </Input>
            </FormGroup>
          </div>
          <div className="d-flex justify-content-end">
            <Button
              className="btn mx-2"
              outline
              color="secondary"
              onClick={() =>
                setSortDirection(sortDirection === "asc" ? "desc" : "asc")
              }
            >
              <i className="bi bi-sort-alpha-down"></i>{" "}
            </Button>
            <Button
              className="btn"
              outline
              color="primary"
              onClick={downloadPDF}
              disabled={loading}
            >
              Export
              <i className="mx-2 bi bi-file-earmark-pdf-fill"></i>
            </Button>
          </div>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th className="">Petugas</th>
                <th className="">Lokasi Absen</th>
                <th className="">Koordinat</th>
                <th className="">Tanggal Absen</th>
                <th className="">Jam Masuk - Keluar</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.absen &&
                sortedData
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((tdata, index) => (
                    <tr key={index} className="border-top">
                      <td>
                        <span className="text-muted">{tdata.nama_lengkap}</span>
                      </td>
                      <td>
                        {" "}
                        <span className="text-muted">{tdata.lokasi_absen}</span>
                      </td>

                      <td className="text-center">
                        <Col onClick={() => handleShowMap(tdata)} className="">
                          <span className="text-muted bg ">
                            <i className="bi bi-geo fs-5 text-danger"></i>
                          </span>
                        </Col>
                      </td>
                      <td>
                        <span className="text-muted">
                          {DateFormat(tdata.createdAt)}
                        </span>
                      </td>
                      <td>
                        <span className="text-white mx-2 rounded bg bg-success px-2 py-1">
                          {TimeFormat(tdata.checkInTime)}
                        </span>
                        <span> - </span>
                        <span className="text-white mx-2 rounded bg bg-danger px-2 py-1">
                          {TimeFormat(tdata.checkOutTime)}
                        </span>
                      </td>
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
                          color="primary"
                          onClick={() => handleOnDetail(tdata)}
                        >
                          <i className="bi bi-eye-fill"></i>
                        </Button>
                        <Button
                          className="btn btn-edit"
                          outline
                          color="warning"
                          onClick={() => handleOnEdit(tdata)}
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </Button>
                        <Button
                          className="btn btn-hapus"
                          outline
                          color="danger"
                          onClick={() => handlOnDelete(tdata)}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={
              data && data.absen
                ? Math.ceil(data.absen.length / itemsPerPage)
                : 0
            }
            paginate={paginate}
          />
          {isDelete && (
            <ModalHapusAbsensi
              openModal={isDelete}
              data={dataDelete}
              closeModal={() => setIsDelete(false)}
            />
          )}
          {isDetail && (
            <ModalDetailAbsensi
              openModal={isDetail}
              data={dataDetail}
              closeModal={() => setIsDetail(false)}
            />
          )}
          {isEdit && (
            <ModalEditAbsensi
              openModal={isEdit}
              data={dataEdit}
              closeModal={() => setIsEdit(false)}
            />
          )}
          <ModalImage
            openModal={showImage}
            closeModal={handleCloseImage}
            data={dataImage}
          />
          <ModalMaps
            openModal={showMap}
            closeModal={handleCloseMap}
            data={dataMap}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default TableAbsensi;
