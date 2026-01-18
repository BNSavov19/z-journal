import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

const sanitizeFileName = (name: string) =>
  name.replace(/[^a-zA-Z0-9._-]/g, "_");

const createUploadPath = (file: File, folder: string) => {
  const safeName = sanitizeFileName(file.name || "image");
  const extension = safeName.includes(".") ? "" : ".jpg";
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${folder}/${id}-${safeName}${extension}`;
};

export const uploadImage = async (file: File, folder = "images") => {
  const path = createUploadPath(file, folder);
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file, {
    contentType: file.type || "image/jpeg"
  });
  return getDownloadURL(snapshot.ref);
};
