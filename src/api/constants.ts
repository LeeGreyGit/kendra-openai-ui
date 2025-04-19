// セッションID
export const SessionHeaderKey = 'X-HTSSN-ID';

// 開発モード場合：接続先のテナントURLのヘッダキー
export const DevTenantUrlHeaderKey = 'X-URL';

// セッションID
export const session: {sessionId: string} = {
  sessionId: '',
};

// apサーバーのコンテキストパス
export const ApiContextName = 'app';

export const SessionCookie: any = {
  key: 'sessionId',
  userId: 'userId',
  userTypeSv: 'userTypeSv',
  userName: 'userName',
};

export const HTTP_STATUS = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  GATEWAY_TIMEOUT: 504,
};

export const API_CODE_ERROR = {
  DATA_NOT_EXIST: 'CE0004',
};

export const KEY_CODE = {
  ENTER: 'Enter',
};

export const STATUS_SV = {
  ENROLLED: 1,
  LEAVING: 2,
};

export const USER_TYPE_SV = {
  ADMIN: 1,
  NORMAL: 2,
};

export const SIZE = {
  SIZE_10: 10,
  SIZE_100: 100,
  SIZE_2000: 2000,
};

export const ENROLLMENT_STATUS = {
  ENROLLED: 1,
  LEAVING: 2,
};

export const FORMAT_DATE = 'yyyy/MM/dd';
export const FORMAT_DATE_SERVER = 'YYYY-MM-DDTHH:mm:ss';

export const DEFAUT_ERROR_500 = {
  title: 'Error',
  message: [
    'リクエストが失敗しました。しばらくたってからお試しください。',
    'それでも解決しない場合はシステム担当者にご確認ください。',
  ],
  exception: '',
  date: null,
  transactionId: null,
};

export const ITEM_TYPE = {
  TEXT: 1,
  DATE: 2,
  FILE: 3,
};

export const ITEM_INFO_TYPE = {
  BASIC: 1,
  DETAIL: 2,
};

export const ICON_SIZE = {
  AVATAR: '40px',
  NORMAL: '100px',
  LARGE: '240px',
};

export const FILE_SIZE = {
  SIZE_1MB: 1048576, // 1MB
  SIZE_10MB: 10485760, // 10MB
};

export const SCREEN_ID = {
  LOGOUT: 'GBS-021',
  HOME: 'GBS-010',
  MEMBER_LIST: 'GBS-030',
  MEMBER_DETAIL: 'GBS-031',
  MEMBER_EDIT: 'GBS-032',
  USER_LIST: 'GBS-040',
  ITEM_LIST: 'GBS-050',
  SETTINGs: 'GBS-010',
};

export const SETTINGS = {
  PASSWORD: 1,
  LIST: 2,
};

export const sideBarWidth = 240;
export const headerHeight = 60;
