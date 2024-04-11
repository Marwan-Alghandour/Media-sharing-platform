import { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MediaCard from "./MediaCard";
import useMedia from "../hooks/useMedia";

const MediaCardContainer = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useMedia();

  if (error) return <p>{error.message}</p>;

  const fetchedGamesCount =
    data?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;

  return (
    <InfiniteScroll
      dataLength={fetchedGamesCount}
      hasMore={hasNextPage}
      next={() => fetchNextPage()}
      loader={<h4>Loading...</h4>}
    >
      {isLoading && <h4>Content is Loading...</h4>}
      {data?.pages.map((page, index) => (
        <Fragment key={index}>
          {page.results.map((media) => (
            <MediaCard key={media.id} media={media} />
          ))}
        </Fragment>
      ))}
    </InfiniteScroll>
  );
};

export default MediaCardContainer;
