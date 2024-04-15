import { useState } from "react";
import { ActivityIndicator, Button, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";
import useUploadMedia from "../hooks/useUploadMedia";

const UploadButton = () => {
  const [visible, setVisible] = useState(false);
  const { mutate, isPending, isSuccess } = useUploadMedia();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
    });

    const formData = new FormData();

    if (result.assets) {
      result.assets.forEach((file: ImagePicker.ImagePickerAsset) => {
        formData.append("upload", {
          uri: file.uri,
          name: file.fileName,
          type: file.mimeType,
        } as any);
      });

      mutate(formData);

      isSuccess && setVisible(true);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {isPending ? (
          <ActivityIndicator color="#fff" style={styles.loadingIcon} />
        ) : (
          <AntDesign.Button
            name="plus"
            backgroundColor="#6366f1"
            onPress={pickImage}
            style={styles.btn}
          >
            Upload
          </AntDesign.Button>
        )}
      </View>
      <Snackbar
        style={styles.snackbar}
        visible={visible}
        onIconPress={() => setVisible(false)}
        duration={1000}
        onDismiss={() => setVisible(false)}
      >
        Media got uploaded successfully.
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: "0%",
    bottom: "0%",
    marginHorizontal: 5,
    marginVertical: 5,
  },
  btn: {
    padding: 15,
  },
  loadingIcon: {
    backgroundColor: "#6366f1",
    borderRadius: 5,
    padding: 15,
  },
  snackbar: {
    backgroundColor: "#009400",
  },
});

export default UploadButton;
