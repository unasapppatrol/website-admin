import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#FFF",
};

export const ClipLoading = ({ isloading }) => {
  return (
    <ClipLoader
      loading={isloading}
      cssOverride={override}
      size={30}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
