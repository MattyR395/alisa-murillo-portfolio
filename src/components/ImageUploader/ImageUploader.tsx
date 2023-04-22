import { MouseEvent, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaTrashAlt } from "react-icons/fa";
import style from "./ImageUploader.module.scss";

export type ImageFile = File & {
  preview: string;
};

export default function ImageUploader(props: {
  isDirty: (isDirty: boolean) => void;
  onUpdate: (files: ImageFile[]) => void;
}): JSX.Element {
  const { isDirty, onUpdate } = props;
  const [files, setFiles] = useState<ImageFile[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    onDrop: (acceptedFiles) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    maxSize: 15000000, // 15MB
  });

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

  useEffect(() => {
    isDirty(!!files.length);
    onUpdate(files);
  }, [files, isDirty, onUpdate]);

  const thumbnails = files.map((file, i) => (
    <div className={style["image-uploader__thumb"]} key={i}>
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
    // Make sure to revoke the data URIs to avoid memory leaks.
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

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
