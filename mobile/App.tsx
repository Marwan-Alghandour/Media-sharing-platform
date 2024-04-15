import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import MediaCardContainer from "./components/MediaCardContainer";
import UploadButton from "./components/UploadButton";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <PaperProvider>
            <SafeAreaView style={styles.container}>
              <MediaCardContainer />
              <UploadButton />
            </SafeAreaView>
          </PaperProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
