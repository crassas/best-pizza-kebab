import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";

function dataUrlToBlob(dataUrl: string): Blob {
  const [meta, payload] = dataUrl.split(",", 2);
  if (!meta || !payload) throw new Error("Invalid image data");
  const mime = /data:([^;]+)/.exec(meta)?.[1] || "image/jpeg";
  const binary = atob(payload);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

export async function uploadDishPhoto(dishId: string, dataUrl: string): Promise<string> {
  const blob = dataUrlToBlob(dataUrl);
  if (!blob.type.startsWith("image/")) throw new Error("Only image files are allowed");
  if (blob.size > 5 * 1024 * 1024) throw new Error("Image is too large after compression");

  const extension = blob.type.includes("png") ? "png" : blob.type.includes("webp") ? "webp" : "jpg";
  const path = `dish-images/${dishId}/${Date.now()}.${extension}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, blob, { contentType: blob.type, cacheControl: "public,max-age=31536000,immutable" });
  return getDownloadURL(storageRef);
}
