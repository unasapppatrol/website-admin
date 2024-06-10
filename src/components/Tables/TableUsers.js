import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Table,
  CardSubtitle,
} from "reactstrap";
import { GetUsers } from "../../api/users";
import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Perlu diimpor untuk menggunakan metode autoTable()

import Loader from "../../layouts/loader/Loader";
import ModalAddUser from "../Modal/user/TambahUser";
import ModalEditUser from "../Modal/user/EditUser";
import ModalHapusUser from "../Modal/user/HapusModal";
import ModalDetailUser from "../Modal/user/DetailUser";
import logo from "../../assets/images/logos/logo_unas.png";

function TableUsers() {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalTambah, setModalTambah] = useState(false);
  const [modalHapus, setModalHapus] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const [userUpdate, setUserUpdate] = useState([]);
  const [userDetail, setUserDetail] = useState([]);

  const EditModal = (tdata) => {
    setUserUpdate(tdata);
    setModalEdit(true);
  };
  const closeEditModal = () => {
    setModalEdit(false);
  };
  const TambahModal = (tdata) => {
    setUserUpdate(tdata);
    setModalTambah(true);
  };
  const closeTambahModal = () => {
    setModalTambah(false);
  };
  const HapusModal = (tdata) => {
    setUserUpdate(tdata);
    setModalHapus(true);
  };
  const closeHapusModal = () => {
    setModalHapus(false);
  };
  const detailModal = (tdata) => {
    setUserDetail(tdata);
    setModalDetail(true);
  };
  const closeDetailModal = () => {
    setModalDetail(false);
  };
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["getUsers"],
    queryFn: GetUsers,
  });

  const downloadPDF = () => {
    const doc = new jsPDF();
    const header = (data) => {
      doc.addImage(logo, "PNG", data.settings.margin.left, 10, 30, 30);
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.setFont("helvetica", "normal");
      doc.text("Rekap data user", data.settings.margin.left + 35, 20);
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
    // Menentukan kolom-kolom yang ingin dicetak ke dalam file PDF
    const columns = ["Nama Lengkap", "Username", "Email", "Domisili"];

    // Menyiapkan data untuk dicetak
    const rows = [];
    data.users.forEach((tdata) => {
      rows.push([
        tdata.nama_lengkap,
        tdata.username,
        tdata.email,
        tdata.domisili,
      ]);
    });

    // Mengatur opsi eksklusi untuk kolom "Action"
    const options = {
      // Eksklusi kolom "Action" dari pencetakan
      exclude: ["Action"],
    };

    // Mencetak data ke dalam file PDF
    doc.autoTable({
      didDrawPage: header,
      margin: { top: 50 },
      head: [columns],
      body: rows,
      options,
    });

    // Menyimpan file PDF
    doc.save("user.pdf");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h6" className="border-bottom p-3 mb-2">
            <i className="bi bi-card-text me-2"> </i>
            Data Users
          </CardTitle>
          {isError && (
            <span>Terjadi kesalahan dalam mengambil data user , {error}</span>
          )}
          <div className="button-group">
            <Button
              className="btn"
              outline
              color="success"
              onClick={TambahModal}
            >
              Tambah <i className="bi bi-person-fill-add"></i>
            </Button>
            <Button
              className="btn"
              outline
              color="primary"
              onClick={downloadPDF}
            >
              <span>Export</span>
              <i className="bi bi-file-earmark-pdf-fill"></i>
            </Button>
          </div>
          <Table
            className="no-wrap mt-3 align-middle actual-doc"
            responsive
            borderless
          >
            <thead>
              <tr>
                <th>Nama Lengkap</th>
                <th>Email</th>
                <th>No Telp</th>
                <th>Alamat</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.users &&
                data.users.map((tdata, index) => (
                  <tr key={index} className="border-top">
                    <td>{tdata.nama_lengkap}</td>
                    <td>{tdata.email}</td>
                    <td>{tdata.no_hp}</td>
                    <td>{tdata.domisili}</td>
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
                          HapusModal(tdata);
                        }}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </Button>
                      <Button
                        className="btn btn-edit"
                        outline
                        color="warning"
                        onClick={() => {
                          EditModal(tdata);
                        }}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </Button>
                      <Button
                        className="btn btn-edit"
                        outline
                        color="primary"
                        onClick={() => {
                          detailModal(tdata);
                        }}
                      >
                        <i className="bi bi-eye-fill"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <ModalEditUser
        openModal={modalEdit}
        closeModal={closeEditModal}
        data={userUpdate}
        setModalEdit={setModalEdit}
      />
      <ModalAddUser
        openModal={modalTambah}
        closeModal={closeTambahModal}
        data={userUpdate}
        setModalTambah={setModalTambah}
      />
      <ModalHapusUser
        openModal={modalHapus}
        closeModal={closeHapusModal}
        data={userUpdate}
        setModalHapus={setModalHapus}
      />
      <ModalDetailUser
        openModal={modalDetail}
        closeModal={closeDetailModal}
        data={userDetail}
      />
    </div>
  );
}

export default TableUsers;
