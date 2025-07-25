import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '@/lib/firebaseConfig';
import uuid from 'react-native-uuid';

const storage = getStorage(app);

export async function pickAndUploadImage(): Promise<string | null> {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.8,
  });

  if (result.cancelled || !result.assets?.[0]?.uri) return null;

  const uri = result.assets[0].uri;
  const response = await fetch(uri);
  const blob = await response.blob();

  const imageRef = ref(storage, `images/${uuid.v4()}`);
  await uploadBytes(imageRef, blob);
  const downloadURL = await getDownloadURL(imageRef);

  return downloadURL;
}
