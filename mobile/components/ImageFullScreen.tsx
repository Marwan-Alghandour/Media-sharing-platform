import { Modal } from "react-native";
import ImageViewer, {
  ImageViewerPropsDefine,
} from "react-native-image-zoom-viewer";

interface Props {
  url: string;
  fullscreen: boolean;
  closeFullScreen: () => void;
}

const ImageFullScreen = ({ url, fullscreen, closeFullScreen }: Props) => {
  return (
    <Modal visible={fullscreen} transparent={true}>
      <ImageViewer
        imageUrls={[{ url }]}
        enableImageZoom
        enableSwipeDown
        renderIndicator={(): any => null}
        onSwipeDown={closeFullScreen}
      />
    </Modal>
  );
};

export default ImageFullScreen;
