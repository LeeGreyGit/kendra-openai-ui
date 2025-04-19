// @flow
// It's impossible to define type because of unpredictable input
/* eslint-disable */
import { DevTenantUrlHeaderKey,} from '../api/constants';
import fetch from 'isomorphic-fetch';
import qs from 'query-string';

export class AjaxError extends Error {
  response: Response;

  status: number;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
    this.status = response.status;
  }
}
export type response = Response | any;
export type error = Error | any;

type Result<T, K> = {
  response?: T;
  error?: K;
  status?: number;
};

type Options = {
  error?: Object;
  loading?: Object;
};

export type ResultPromise<T = response, K = error> = Promise<Result<T, K>>;
const myFetch = fetch;

const request = (
  method: string,
  url: string,
  body?: Object,
  headers?: Object,
  options?: Options,
): ResultPromise => {
  const init: any = {
    method,
  };

  init.headers = Object.assign({ ...sessionHeader() }, headers);

  if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
    if (body instanceof FormData) {
      init.body = body;
    } else {
      init.headers.Accept = 'application/json';
      if (!('Content-Type' in init.headers)) {
        init.headers['Content-Type'] = 'application/json';
      }

      // Fileの場合
      if (body instanceof File) {
        init.body = body;
      } else {
        init.body = JSON.stringify(body);
      }
    }
  }

  init.headers.Accept = 'application/json';
  if (!(body instanceof FormData) && !('Content-Type' in init.headers)) {
    init.headers['Content-Type'] = 'application/json';
  }

  let myUrl =
    (method === 'GET' || method === 'DELETE') && body instanceof Object
      ? `${url}?${(qs.stringify as any)(body)}`
      : url;
  if (method === 'GET' || method === 'DELETE') {
    init.headers.Accept = 'application/json';
    if (!('Content-Type' in init.headers)) {
      init.headers['Content-Type'] = 'application/json';
    }
  }
  return myFetch(myUrl, init)
    .then((response: any) => {
      if (!response.ok) {
        const err = new AjaxError(response);
        const clonedResponse = response.clone();
        // createApiErrorHandler({
        //   dispatch: store.dispatch,
        //   response: clonedResponse,
        // });
        return Promise.reject(err);
      }
      return new Promise((resolve, reject) => {
        if (response.headers.get('content-disposition')) {
          response.blob().then((body: any) => {
            let contentDisposition = response.headers.get(
              'content-disposition'
            );
            let fileName = contentDisposition.split('=')[1];
            resolve({
              responseBody: { fileName: fileName, file: body, fileType: response.headers.get('content-type')},
              info: { status: response.status },
            });
          });
        } else {
          response.text().then((text: string) => {
            resolve({ responseText: text, info: { status: response.status } });
          });
        }
      });
    })
    .then(({ responseText, responseBody, info }: any) => {
      try {
        if (responseBody) {
          return { response: responseBody, ...info };
        } else {
          return { response: JSON.parse(responseText), ...info };
        }
      } catch (e) {
        return { response: responseText, ...info };
      }
    })
    .catch(async (error: error) => {
      let res = ''
      try {
        res = JSON.parse(await error?.response?.text());
      } catch (error) {
        console.error('Failed to parse JSON:', error);
      }
      typeof errorHandler === 'function' && errorHandler(error);
      return {
        error: res,
        status: error.status,
      };
    });
};

window.addEventListener('unhandledrejection', function (event) {
  event.preventDefault();
});

const sessionHeader = () => {
  const header: any = [];
  if (process.env.NODE_ENV == "development") {
    header[DevTenantUrlHeaderKey] = process.env.X_URL || location.hostname
  }
  return header;
};

export const get = (
  url: string,
  query?: Object,
  headers?: Object,
  options?: Options
): ResultPromise => request('GET', url, query, headers);

export const patch = (
  url: string,
  body?: Object,
  headers?: Object,
  options?: Options
): ResultPromise => request('PATCH', url, body, headers, options);

export const put = (
  url: string,
  body?: Object,
  headers?: Object,
  options?: Options
): ResultPromise => request('PUT', url, body, headers, options);

export const del = (
  url: string,
  headers?: Object,
  options?: Options
): ResultPromise => request('DELETE', url, undefined, headers, options);

export const post = (
  url: string,
  body?: Object,
  headers?: Object,
  options?: Options
): ResultPromise => request('POST', url, body, headers, options);

let errorHandler: Function | null | undefined = null;
export function setApiErrorHandler(handler: (e: Error) => void) {
  errorHandler = handler;
}
