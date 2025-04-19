export interface FileInfo {
  fileBody: string;
  fileName: string;
  filePath: string;
  fileUrl: string;
}

export interface PageProps {
  page: number;
  total: number;
  fromIndex: number;
  toIndex: number;
}

export interface DataSearch {
  paging: PageProps;
  data: Array<FileInfo>;
}

export interface FileResponse {
  file: Blob;
  fileName: string;
  fileType: string;
}

export interface ResponseError {
  title?: number;
  message?: Array<ResponseMessage>;
}

export interface ResponseMessage {
  code?: string;
  msg?: string;
}
export interface ChatbotProps {
  queryText?: string;
  sortData?: string;
  sortOrder?: string;
  page?: number;
  size?: number;
}
export interface FilePathProps{
 filePath: string;
}
export interface ChatbotAskProps {
  message: string;
}

export interface ChatBotHistory {
  user?: string;
  bot?: string;
};