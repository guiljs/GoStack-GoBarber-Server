export default interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(fie: string): Promise<void>;
}
