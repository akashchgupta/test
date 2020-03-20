# DBCloud Sync - A Dropbox Client Made Completely in React Native.

### Feature

- This app doesn't use OAuth. So you need your "Access Token" from Dropbox App console.
- It lists all the files and folder in a given directory.
- We an explore inside a directory by pressing the Directory.
- We can dowload files by pressing the downlaod icon on right of each file.
- This app implements download_zip endpoint allowing us to download a directory as .zip file.
- The AppBar has three Icons(Right to Left):
  -- Refresh: Refresh the current directory listing.
  -- Home: Navigate to the home directory.
  -- Upload: Upload a file and press Refresh button to see updated listing.

### Upload File

1. Click on the upload icon on AppBar.
2. Choose a file.
3. Uploading started.
4. Click on refresh button to see updated directory listing.

### Download File/Folder

1. Click on the download button next to each file/folder.
2. Give external storage permission.
3. Download starts. See the download manager in notification.

### Download APK

[Link](https://raw.githubusercontent.com/akashchgupta/test/master/android/app-release.apk 'DBCloud Sync')

### Build from source:

1. git clone https://github.com/akashchgupta/test.git
2. npm install
3. react-native link react-native-document-picker
4. react-native link rn-fetch-blob
5. Add your ACCESS_TOKEN in './utils/config.js'
6. npm run android

### TODO

- Implement stack navigation.
- Add OAuth for dynamic "Access Token" generation.
- To implement other Dropbox API endpoints like: create, rename, delete, etc.
