import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/apiClient";

const apiClient = new APIClient<FormData>("/upload");

const useUploadMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (files: FormData) =>
      apiClient.post(files, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },
  });
};

export default useUploadMedia;
