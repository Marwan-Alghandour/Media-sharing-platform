import { useInfiniteQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/apiClient";
import Media from "../entities/Media";

const apiClient = new APIClient<Media>("/");

const useMedia = () => {
  return useInfiniteQuery<FetchResponse<Media>, Error>({
    queryKey: ["media"],
    queryFn: ({ pageParam }) =>
      apiClient.getAll({
        params: {
          page: pageParam,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 60000,
  });
};

export default useMedia;
