import { useState, memo } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { Video, ResizeMode } from "expo-av";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import Media from "../entities/Media";
import useLikeMedia from "../hooks/useLikeMedia";
import ImageFullScreen from "./ImageFullScreen";

interface Props {
  media: Media;
}

const Card = ({ media }: Props) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [liked, setLiked] = useState(media.liked);
  const { mutate } = useLikeMedia();

  const onClickLike = () => {
    setLiked(!liked);
    mutate({ id: media.id, liked: !media.liked });
  };

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      setIsFullScreen(true);
    });

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      onClickLike();
    });

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
          <View style={styles.mediaContainer}>
            {media.type.startsWith("image") ? (
              <>
                <Image
                  source={{ uri: media.path }}
                  resizeMode="contain"
                  style={styles.img}
                  alt={media.name}
                />
                <ImageFullScreen
                  url={media.path}
                  fullscreen={isFullScreen}
                  closeFullScreen={() => setIsFullScreen(false)}
                />
              </>
            ) : (
              <Video
                style={styles.video}
                source={{
                  uri: media.path,
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
              />
            )}
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
      <View style={styles.iconContainer}>
        <AntDesign
          name={liked ? "heart" : "hearto"}
          size={Dimensions.get("window").height * 0.05}
          color="red"
          onPress={onClickLike}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  mediaContainer: {
    height: Dimensions.get("window").height * 0.4,
    width: "100%",
    backgroundColor: "#000",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
  iconContainer: {
    marginTop: 3,
    marginHorizontal: 4,
  },
});

export default memo(Card);
