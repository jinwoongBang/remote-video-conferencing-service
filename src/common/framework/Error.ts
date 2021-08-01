import {
  StatusCodes,
  ReasonPhrases,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';

export interface ErrorProps {
  statusCode?: StatusCodes;
  name: string;
  message: string;
}

/**
 * @description OTA Error(On The Air 약자) 추상 인터페이스
 */
interface OTAError {
  statusCode: StatusCodes;
  name: string;
  message: string;
}

/**
 * @description 서버와 연결 자체가 불가 할 경우
 */
export class NetworkError extends Error implements OTAError {
  statusCode: StatusCodes;
  name: string;
  message: string;

  constructor({ name, message }: ErrorProps) {
    const _name = name || 'NETWORK ERROR';
    const _message = message || 'Web Server Is Down.';
    super(_message);
    this.statusCode = 521;
    this.name = name;
    this.message = _message;
  }
}

/**
 * @description 서버에 응답은 성공했으나 Front 내부 로직에서 예외가 발생 할 경우
 */
export class ServiceError extends Error implements OTAError {
  statusCode: StatusCodes;
  name: string;
  message: string;

  constructor({ message }: ErrorProps) {
    super(message);
    this.statusCode = StatusCodes.SERVICE_UNAVAILABLE;
    this.name = ReasonPhrases.SERVICE_UNAVAILABLE;
    this.message = message;
  }
}

/**
 * @description 서버에 응답은 성공했으나 Server 내부 로직에서 예외 발생한 경우
 */
export class InternalServerError extends Error implements OTAError {
  statusCode: StatusCodes;
  name: string;
  message: string;

  constructor({ message, statusCode, name }: ErrorProps) {
    super(message);
    this.statusCode = statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    this.name = name;
    this.message = message;
  }
}
