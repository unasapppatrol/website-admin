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
import { getPatroli, getPatroliByInstansi } from "../../api/patroli";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../layouts/loader/Loader";
import { DateFormat } from "../../utils/DateFormat";
import { TimeFormat } from "../../utils/TimeFormat";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Perlu diimpor untuk menggunakan metode autoTable
import PaginationComponent from "./Pagination";
import ModalHapusPatroli from "../Modal/patroli/DeletePatroli";
import ModalDetailPatroli from "../Modal/patroli/DetailPatroli";
import ModalEditPatroli from "../Modal/patroli/EditPatroli";
import logo from "../../assets/images/logos/logo_unas.png";

const TablePatroli = () => {
  const [instansi, setInstansi] = useState("All");
  const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dataDelete, setDataDelete] = useState(null);
  const [dataDetail, setDataDetail] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Tentukan jumlah item per halaman
  const [sortDirection, setSortDirection] = useState("desc");

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["getPatroli", { nama_instansi: instansi }],
    queryFn: ({ queryKey }) => getPatroliByInstansi(queryKey[1]),
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
        `Laporan Patroli ${instansi}`,
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

    doc.autoTable({
      didDrawPage: header,
      margin: { top: 50 },
      head: [
        [
          "Petugas",
          "lokasi Pos",
          "instansi patroli",
          "status",
          "Tanggal patroli",
          "Jam patroli",
        ],
      ],
      body: data.patrols.map((tdata) => [
        tdata.nama_lengkap,
        tdata.lokasi_pos,
        tdata.nama_instansi,
        tdata.status,
        DateFormat(tdata.createdAt),
        [TimeFormat(tdata.createdAt), "WIB"],
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

  // Hitung indeks data awal dan akhir untuk paginasi
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const sortedData = [...data.patrols].sort((a, b) => {
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
            Data Patroli
          </CardTitle>
          <div className="border-bottom my-2">
            <FormGroup className="w-25">
              <Label for="lokasiSelect">Instansi Patroli : {instansi} </Label>
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
                <th>Petugas</th>
                <th>Lokasi Pos</th>
                <th>Status</th>
                <th>Waktu Patroli</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.patrols &&
                currentItems.map((tdata, index) => (
                  <tr key={index} className="border-top">
                    <td>
                      <span className="">{tdata.nama_lengkap}</span>
                    </td>
                    <td className="mw-50"> {tdata.lokasi_pos}</td>
                    <td>
                      {tdata.status === "Kebakaran" ? (
                        <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                      ) : tdata.status === "Demonstrasi" ? (
                        <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                      ) : tdata.status === "Pencurian" ? (
                        <span className="p-2 bg-secondary rounded-circle d-inline-block ms-3"></span>
                      ) : (
                        <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                      )}
                    </td>
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
            <ModalHapusPatroli
              openModal={isDelete}
              data={dataDelete}
              closeModal={() => setIsDelete(false)}
            />
          )}
          {isEdit && (
            <ModalEditPatroli
              openModal={isEdit}
              data={dataEdit}
              closeModal={() => setIsEdit(false)}
            />
          )}
          {isDetail && (
            <ModalDetailPatroli
              openModal={isDetail}
              data={dataDetail}
              closeModal={() => setIsDetail(false)}
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default TablePatroli;
