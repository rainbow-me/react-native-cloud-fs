export interface BackupFile {
  name: string;
  id: string;
  path: string; // iOS only
  lastModified: string;
}

export interface ListFilesResult {
  files: BackupFile[];
}

interface RNCloudFSMethods {
  logout(): Promise<void>;
  loginIfNeeded(): Promise<void>; // Android only
  listFiles(listFilesParams: {
    scope: String;
    targetPath: string;
  }): Promise<ListFilesResult>;
  deleteFromCloud(file: BackupFile): Promise<void>;
  copyToCloud(copyToCloudParams: {
    mimeType: string;
    scope: string;
    sourcePath: { path: string } | { uri: string };
    targetPath: string;
  });
  fileExists(fileExistsParam: {
    scope: string;
    targetPath?: string;
    fileId?: string;
  }): Promise<boolean>;
  getIcloudDocument(filename: string): Promise<string>; // iOS only
  getGoogleDriveDocument(id: string): Promise<string>; // android only
  syncCloud(): Promise<boolean>; // iOS only
  isAvailable(): Promise<boolean>; // iOS only

  // Android only
  downloadFile(params: {
    fileId: string;
    destinationPath?: string; // if not provided, file will be downloaded to the app's cache directory
    fileName?: string; // if not provided, file will be downloaded with fileId as name
  });
}

declare const RNCloudFS: RNCloudFSMethods;
export default RNCloudFS;
