import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { defaultData } from "./default-data";
import type { CMSData } from "./types";

const CMS_DOC = doc(db, "cms", "content");

export const ensureCMSData = async () => {
  const snapshot = await getDoc(CMS_DOC);
  if (!snapshot.exists()) {
    await setDoc(CMS_DOC, defaultData);
    return defaultData;
  }
  return snapshot.data() as CMSData;
};

export const subscribeCMSData = async (onChange: (data: CMSData) => void) => {
  const initial = await ensureCMSData();
  const unsubscribe = onSnapshot(CMS_DOC, (snapshot) => {
    if (snapshot.exists()) {
      onChange(snapshot.data() as CMSData);
    }
  });
  return { initial, unsubscribe };
};

export const saveCMSData = async (data: CMSData) => {
  await setDoc(CMS_DOC, data);
};

export const resetCMSData = async () => {
  await setDoc(CMS_DOC, defaultData);
};
