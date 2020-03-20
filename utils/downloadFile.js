import RNFetchBlob from 'rn-fetch-blob';
import {CONTENT_BASE_URL, ACCESS_TOKEN} from './config';
import {PermissionsAndroid} from 'react-native';

export default async function downloadFile(path, name) {
  const {config, fs} = RNFetchBlob;
  const URL = `${CONTENT_BASE_URL}/files/download`;
  const HEADER = {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Dropbox-API-Arg': JSON.stringify({
      path,
    }),
  };
  let DownloadDir = fs.dirs.DownloadDir;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path: DownloadDir + `/${name}`,
      description: `DBCloud Sync: ${name}`,
    },
  };
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'DBCloud Sync needs access to memory to download the content',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      config(options)
        .fetch('GET', URL, HEADER)
        .then(res => {})
        .catch(err => {});
    }
  } catch (err) {}
}
