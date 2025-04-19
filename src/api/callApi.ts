import { post, ResultPromise } from '../api/ajax';
import { ChatbotProps, FilePathProps, ChatbotAskProps } from "../api/interface";

import { _URL } from "./apiUrl";

export const getFileData = (body: FilePathProps): ResultPromise => {
  return post(_URL.FILE_DATA, body);
};

export const postKendraSearch = (body: ChatbotProps): ResultPromise => {
  return post(_URL.KENDRA_SEARCH, body);
};

export const postChatGpt = (body: ChatbotAskProps): ResultPromise => {
  return post(_URL.CHAT_BOT, body);
};