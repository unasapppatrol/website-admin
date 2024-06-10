import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Table,
  Button,
  Alert,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../layouts/loader/Loader";
import { DateFormat, TimeFormat } from "../../utils/DateFormat";
import jsPDF from "jspdf";
import "jspdf-autotable";
import PaginationComponent from "./Pagination";
import { getAktivitasByInstansi } from "../../api/aktivitas";
import ModalHapusAktivitas from "../Modal/aktivitas/ModalHapusAktivitas";
import ModalDetailAktivitas from "../Modal/aktivitas/ModalDetailAktivitas";
import ModalEditAktivitas from "../Modal/aktivitas/ModalEditAktivitas";
import logo from "../../assets/images/logos/logo_unas.png";

const TableAktivitas = () => {
  const [instansi, setInstansi] = useState("All");
  const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [dataDelete, setDataDelete] = useState(null);
  const [dataDetail, setDataDetail] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Tentukan jumlah item per halaman
  const [sortDirection, setSortDirection] = useState("desc");

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["getAktivitas", { nama_instansi: instansi }],
    queryFn: ({ queryKey }) => getAktivitasByInstansi(queryKey[1]),
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
      doc.text(
        `Laporan Aktivitas ${instansi}`,
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
    const columns = [
      "Petugas",
      "Instansi Aktivitas",
      "Pos Aktivitas",
      "Tanggal Aktivitas",
      "Jam Aktivitas",
    ];

    const rows = [];
    data.activities.forEach((tdata) => {
      rows.push([
        tdata.nama_lengkap,
        tdata.instansi_aktivitas,
        tdata.pos_aktivitas,
        DateFormat(tdata.createdAt),
        [TimeFormat(tdata.createdAt), "WIB"],
      ]);
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

    doc.save("aktivitas.pdf");
    setLoading(false);
  };

  const handlOnDelete = async (data) => {
    setDataDelete(data);
    setIsDelete(true);
  };

  const handleOnEdit = async (data) => {
    setDataEdit(data);
    setIsEdit(true);
  };

  const handleOnDetail = async (data) => {
    setDataDetail(data);
    setIsDetail(true);
  };

  // Hitung indeks data awal dan akhir untuk paginasi
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const sortedData = [...data.activities].sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    if (sortDirection === "asc") {
      return timeA - timeB;
    } else {
      return timeB - timeA;
    }
  });
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSort = () => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);
  };

  return (
    <div>
      <Card>
        <CardBody>
          {isError && <Alert color="danger">{error.message}</Alert>}
          <CardTitle tag="h6" className="border-bottom p-3 mb-2">
            <i className="bi bi-card-text me-2"> </i>
            Data Aktivitas
          </CardTitle>
          <div className="border-bottom my-2">
            <FormGroup className="w-25">
              <Label for="lokasiSelect">Instansi Aktivitas : {instansi} </Label>
              <Input
                id="lokasiSelect"
                name="select"
                type="select"
                onChange={(e) => setInstansi(e.target.value)}
              >
                <option value="All">Semua Instansi</option>
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
                <th className="text-center">Petugas</th>
                <th className="text-center">Instansi </th>
                <th className="text-center">Lokasi Pos</th>
                <th className="text-center">Tanggal Aktivitas</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.activities &&
                currentItems.map((tdata, index) => (
                  <tr key={index} className="border-top">
                    <td>
                      <span className="text-muted">{tdata.nama_lengkap}</span>
                    </td>
                    <td className="text-muted">{tdata.instansi_aktivitas}</td>
                    <td className="text-muted"> {tdata.pos_aktivitas}</td>
                    <td className="w-25">
                      <span className="text-muted">
                        {DateFormat(tdata.createdAt)}
                      </span>
                      <span className="text-white mx-2 rounded bg bg-primary px-2 py-1">
                        {TimeFormat(tdata.createdAt)}
                      </span>
                    </td>

                    <td
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        className="btn btn-hapus mx-1"
                        outline
                        color="danger"
                        onClick={() => handlOnDelete(tdata)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </Button>
                      <Button
                        className="btn btn-edit mx-1"
                        outline
                        color="warning"
                        onClick={() => handleOnEdit(tdata)}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </Button>
                      <Button
                        className="btn btn-detail mx-1"
                        outline
                        color="primary"
                        onClick={() => handleOnDetail(tdata)}
                      >
                        <i className="bi bi-eye-fill"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
          {isDelete && (
            <ModalHapusAktivitas
              openModal={isDelete}
              data={dataDelete}
              closeModal={() => setIsDelete(false)}
            />
          )}
          {isDetail && (
            <ModalDetailAktivitas
              openModal={isDetail}
              data={dataDetail}
              closeModal={() => setIsDetail(false)}
            />
          )}
          {isEdit && (
            <ModalEditAktivitas
              openModal={isEdit}
              data={dataEdit}
              closeModal={() => setIsEdit(false)}
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default TableAktivitas;
