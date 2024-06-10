import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

export const AlertSuccess = ({ messages, refetch }) => {
  const queryClient = useQueryClient();
  Swal.fire({
    title: messages,
    icon: "success",
    confirmButtonText: "Close",
  }).then((result) => {
    if (result.isConfirmed) {
      queryClient.refetchQueries(refetch);
    }
  });
};

export const AlertError = ({ messages, refetch }) => {
  const queryClient = useQueryClient();

  Swal.fire({
    title: messages,
    icon: "error",
    confirmButtonText: "Close",
  }).then((result) => {
    if (result.isConfirmed) {
      queryClient.refetchQueries(refetch);
    }
  });
};
