import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/apiClient";

const useLikeMedia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, liked }: { id: number; liked: boolean }) => {
      const apiClient = new APIClient<{ liked: boolean }>(`/like/${id}`);

      return apiClient.put({ liked });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },
  });
};

export default useLikeMedia;
