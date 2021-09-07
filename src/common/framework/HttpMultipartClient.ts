import axios, { AxiosError, AxiosResponse } from 'axios';
import qs from 'query-string';
import HTTPStatusCode, { StatusCodes } from 'http-status-codes';

import UrlUtils from 'src/common/utils/UrlUtils';

import {
  NetworkError,
  ServiceError,
  InternalServerError,
} from 'src/common/framework/Error';
import OTAResponse from 'src/common/framework/OTAResponse';

const HttpMultipartClient = axios.create({
  baseURL: new UrlUtils().baseURL,
  timeout: 20 * 1000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

/**
 * 서버 요청에 성공하였으나,
 * 서버 내부 로직 상 예외가 발생하였을 경우 처리
 *
 * @param response
 * @returns
 */
function onFulfilledResponse(
  response: AxiosResponse<OTAResponse<any>>,
): AxiosResponse<OTAResponse<any>> {
  const { data, status } = response;
  const { code, message, success } = response.data;
  const httpStatusMessage = HTTPStatusCode.getStatusText(status);

  if (!success) {
    throw new InternalServerError({
      statusCode: status,
      name: httpStatusMessage,
      message: message,
    });
  }

  return response;
}

/**
 * 서버 요청 자체가 실패하였을 경우
 *
 * @param error
 * @returns
 */
function onRejectedResponse(
  error: AxiosError,
): Promise<NetworkError | ServiceError> {
  console.error(error);
  const { response, code, message } = error;
  if (response) {
    const { status, data } = response as AxiosResponse<OTAResponse<any>>;
    return Promise.reject(
      new InternalServerError({
        statusCode: status,
        name: message,
        message: message,
      }),
    );
  }

  return Promise.reject(new NetworkError());
}

// HttpMultipartClient.interceptors.response.use(
//   onFulfilledResponse,
//   onRejectedResponse,
// );

export default HttpMultipartClient;
