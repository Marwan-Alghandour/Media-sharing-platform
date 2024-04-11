import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/apiClient";

const useLikeMedia = () => {
  return useMutation({
    mutationFn: ({ id, liked }: { id: number; liked: boolean }) => {
      const apiClient = new APIClient<{ liked: boolean }>(`/like/${id}`);

      return apiClient.put({ liked });
    },
    // onSuccess: () => {},
  });
};

export default useLikeMedia;
