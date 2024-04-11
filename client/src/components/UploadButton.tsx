import { useRef } from "react";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import useUploadMedia from "../hooks/useUploadMedia";

const UploadButton = () => {
  const { mutate } = useUploadMedia();
  const toast = useRef<Toast>(null);

  const onUpload = async ({ files }: FileUploadHandlerEvent) => {
    const formData = new FormData();

    files.forEach((file: File) => {
      formData.append("upload", file);
    });

    mutate(formData);

    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "File Uploaded",
    });
  };
  return (
    <>
      <Toast ref={toast}></Toast>
      <FileUpload
        className="btn"
        mode="basic"
        accept=".png, .jpeg, .jpg, .webp, .gif, .mp4"
        maxFileSize={250_000_000}
        customUpload
        uploadHandler={onUpload}
        auto
        multiple
        chooseLabel="Upload"
      />
    </>
  );
};

export default UploadButton;
