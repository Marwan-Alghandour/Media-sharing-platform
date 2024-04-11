import MediaCardContainer from "./components/MediaCardContainer";
import UploadButton from "./components/UploadButton";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <div className="wall mx-2 my-4">
        <MediaCardContainer />
      </div>
      <UploadButton />
    </>
  );
}

export default App;
