import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import {CONTENT_BASE_URL, ACCESS_TOKEN} from './config';

export default async function upload(currentDirectory = '') {
  const {uri, name} = await filePicker();

  const URL = `${CONTENT_BASE_URL}/files/upload`;
  const HEADER = {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Dropbox-API-Arg': JSON.stringify({
      path: `${currentDirectory}/${name}`,
      mode: 'add',
      autorename: true,
      mute: false,
    }),
    'Content-Type': 'application/octet-stream',
  };

  RNFetchBlob.fetch('POST', URL, HEADER, RNFetchBlob.wrap(uri))
    .then(res => {})
    .catch(err => {});
}

async function filePicker() {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    return res;
  } catch (err) {}
}
