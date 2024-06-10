import { Col, Row, Alert } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import { GetUsers } from "../api/users";
import Loader from "../layouts/loader/Loader";
import { GetAbsensi } from "../api/absensi";
import { getPatroliByInstansi } from "../api/patroli";
import { GetPos } from "../api/pos";
import { useEffect, useState } from "react";
import { useAuth } from "../context/userContext";
import TopCards from "../components/TopCards";
import { GetAllAktivitas } from "../api/aktivitas";

const Starter = () => {
  const { id, user, role } = useAuth();
  const [posPejanten, setPosPejanten] = useState(null);
  const [posRagunan, setPosRagunan] = useState(null);
  const [posBambuKuning, setPosBambuKuning] = useState(null);
  const {
    isLoading: isUsersLoading,
    isError: isUsersError,
    data: dataUsers,
  } = useQuery({
    queryKey: ["getUsers"],
    queryFn: GetUsers,
  });
  const {
    isLoading: isAbsensiLoading,
    isError: isAbsensiError,
    data: dataAbsensi,
  } = useQuery({
    queryKey: ["getAbsensi"],
    queryFn: GetAbsensi,
  });
  const {
    isLoading: isPatroliLoading,
    isError: isPatroliError,
    data: dataPatroli,
  } = useQuery({
    queryKey: ["getPatroli", { nama_instansi: "All" }],
    queryFn: ({ queryKey }) => getPatroliByInstansi(queryKey[1]),
  });
  const {
    isLoading: isAktivitasLoading,
    isError: isAktivitasError,
    data: dataAktivitas,
  } = useQuery({
    queryKey: ["getAktivitas"],
    queryFn: GetAllAktivitas,
  });

  const {
    isLoading: isPosLoading,
    isError: isPosError,
    data: dataPos,
  } = useQuery({
    queryKey: ["getPos"],
    queryFn: GetPos,
  });

  useEffect(() => {
    if (dataPos && dataPos.length) {
      const dataPejanten = dataPos.filter(
        (data) => data.nama_instansi === "UNAS Pejaten"
      );
      setPosPejanten(dataPejanten.length);

      const dataRagunan = dataPos.filter(
        (data) => data.nama_instansi === "UNAS Ragunan"
      );
      setPosRagunan(dataRagunan.length);
      const dataBambuKuning = dataPos.filter(
        (data) => data.nama_instansi === "UNAS Bambu Kuning"
      );
      setPosBambuKuning(dataBambuKuning.length);
    }
  }, [dataPos]);

  if (
    isUsersLoading ||
    isAbsensiLoading ||
    isPatroliLoading ||
    isPosLoading ||
    isAktivitasLoading
  ) {
    return <Loader />;
  }

  return (
    <div className="w-100">
      <div>
        <h2>Selamat datang, {user}</h2>
      </div>
      {/***Top Cards***/}
      {isUsersError && (
        <Alert color="danger">
          terjadi kesalahan dalam mengambil data user atau refresh
        </Alert>
      )}
      {isAbsensiError && (
        <Alert color="danger">
          terjadi kesalahan dalam mengambil data absen atau refresh
        </Alert>
      )}
      {isPatroliError && (
        <Alert color="danger">
          terjadi kesalahan dalam mengambil data patroli atau refresh
        </Alert>
      )}
      {isPosError && (
        <Alert color="danger">
          terjadi kesalahan dalam mengambil data pos atau refresh
        </Alert>
      )}

      <Row className="d-flex">
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-success text-success"
            title="Profit"
            subtitle="Data Users"
            earning={dataUsers.users.length}
            icon="bi bi-people-fill"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Refunds"
            subtitle="Data Absensi"
            earning={dataAbsensi.absen.length}
            icon="bi bi-person-check-fill"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-warning text-warning"
            title="New Project"
            subtitle="Data Patroli"
            earning={dataPatroli.patrols.length}
            icon="bi bi-person-fill-gear"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-warning text-warning"
            title="New Project"
            subtitle="Data Aktivitas"
            earning={dataAktivitas.activities.length}
            icon="bi bi-person-fill-gear"
          />
        </Col>
      </Row>
      <Row>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-info"
            title="Sales"
            subtitle="Data Pos Unas Pejanten"
            earning={posPejanten}
            icon="bi bi-geo-fill"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-info"
            title="Sales"
            subtitle="Data Pos Unas Ragunan"
            earning={posRagunan}
            icon="bi bi-geo-fill"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-info"
            title="Sales"
            subtitle="Data Pos Bambu Kuning"
            earning={posBambuKuning}
            icon="bi bi-geo-fill"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
