import { MouseEvent, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaTrashAlt } from "react-icons/fa";
import style from "./ImageUploader.module.scss";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export default function ImageUploader(): JSX.Element {
  const [files, setFiles] = useState<
    {
      preview: string;
      name: string;
    }[]
  >([]);

  /**
   * Removes image from the list.
   *
   * @param index index of the image to remove.
   */
  const handleImageDelete = (event: MouseEvent, index: number) => {
    event.stopPropagation();

    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbnails = files.map((file, i) => (
    <div className={style["image-uploader__thumb"]} key={file.name}>
      <button
        onClick={(e) => handleImageDelete(e, i)}
        className={`form-control form-control--icon ${style["image-uploader__thumb__delete"]}`}
      >
        <FaTrashAlt />
      </button>
      <img
        src={file.preview}
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div {...getRootProps({ className: style["image-uploader"] })}>
      <input {...getInputProps()} />

      {!files.length && (
        <div className={style["image-uploader__message"]}>
          Drag and drop some files here, or click to select them
        </div>
      )}

      {thumbnails}
    </div>
  );
}
