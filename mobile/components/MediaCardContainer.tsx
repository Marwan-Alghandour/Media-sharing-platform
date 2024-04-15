import { StyleSheet, FlatList, Text } from "react-native";
import MediaCard from "./MediaCard";
import useMedia from "../hooks/useMedia";

const MediaCardContainer = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useMedia();

  if (error) return <Text>{error.message}</Text>;

  const media = data?.pages.map((page) => page.results).flat() || [];

  const loadMore = () => hasNextPage && fetchNextPage();

  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <FlatList
      data={media}
      keyExtractor={(media) => media.id.toString()}
      renderItem={({ item }) => <MediaCard media={item} />}
      onEndReached={loadMore}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 5,
    paddingBottom: 50,
  },
});
export default MediaCardContainer;
