import * as _ from 'lodash';

interface OTAUrlUtils {
  isEnvProduction: boolean;
  isEnvDevelopment: boolean;
  protocol: string;
  hostname?: string;
  port?: string;
  contextPath?: string;
}

class UrlUtils implements OTAUrlUtils {
  isEnvProduction = process.env.NODE_ENV === 'production';
  isEnvDevelopment = process.env.NODE_ENV === 'development';

  protocol = window.location.protocol || 'http';

  hostname = process.env.HOSTNAME || window.location.hostname;

  port = process.env.PORT || window.location.port;

  contextPath = process.env.CONTEXT_PATH;

  constructor() {
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
