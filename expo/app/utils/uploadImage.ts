import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/lib/firebaseConfig';

export const uploadImageAsync = async (uri: string, path: string): Promise<string> => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, blob);
  const downloadUrl = await getDownloadURL(storageRef);
  return downloadUrl;
};

