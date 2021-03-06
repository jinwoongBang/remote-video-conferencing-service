import * as _ from 'lodash';

interface OTAUrlUtils {
  isEnvProduction: boolean;
  isEnvDevelopment: boolean;
  protocol: string;
  hostname?: string;
  port?: string;
  contextPath?: string;
}

const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = '3000';

class UrlUtils implements OTAUrlUtils {
  isEnvProduction = process.env.NODE_ENV === 'production';
  isEnvDevelopment = process.env.NODE_ENV === 'development';

  protocol = 'http';
  hostname = process.env.HOSTNAME || DEFAULT_HOST;
  port = process.env.PORT || DEFAULT_PORT;
  contextPath = '/api';

  constructor() {
    if (!this.hostname && typeof window !== 'undefined') {
      this.hostname = window.location.hostname;
    }

    if (!this.port && typeof window !== 'undefined') {
      this.port = window.location.port;
    }

    console.log({ URLInfo: { ...this } });
  }

  get baseURL() {
    const isPort = Boolean(this.port);
    let contextPath = this.contextPath;
    if (contextPath && !contextPath.startsWith('/')) {
      contextPath = `/${contextPath}`;
    }

    const hasPortUrl = `${this.protocol}://${this.hostname}:${this.port}${contextPath}`;
    const hasNotPortUrl = `${this.protocol}://${this.hostname}${contextPath}`;

    return isPort ? hasPortUrl : hasNotPortUrl;
  }

  /**
   * @description 이건 그냥 예씨이며, baseURL 기준으로 추가되는 URL 들을 관리하면 좋을 듯
   * @param path 폴더 경로를 포함하는 파일명 또는 파일명
   * @returns streamingURL(비디오 스트리밍 경로)
   */
  getStreamingURL(path?: string) {
    return `${this.baseURL}/streaming/${path}`;
  }
}

export default UrlUtils;
