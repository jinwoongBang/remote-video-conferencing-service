import type { NextApiRequest, NextApiResponse } from 'next';

abstract class OTAController {
  private request: NextApiRequest;
  private response: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.request = req;
    this.response = res;
  }

  protected abstract doGet(
    request: NextApiRequest,
    response: NextApiResponse,
  ): Promise<any>;

  protected abstract doPost(
    request: NextApiRequest,
    response: NextApiResponse,
  ): Promise<any>;

  protected abstract doPut(
    request: NextApiRequest,
    response: NextApiResponse,
  ): Promise<any>;

  protected abstract doDelete(
    request: NextApiRequest,
    response: NextApiResponse,
  ): Promise<any>;

  public createPaginationParam() {}

  public async service() {
    const { method, body, query, url } = this.request;
    console.log(
      `[${method}] url : ${url}, query : ${JSON.stringify(
        query,
      )}, body: ${JSON.stringify(body)}`,
    );
    switch (this.request.method) {
      case 'GET':
        await this.doGet(this.request, this.response);
        break;
      case 'POST':
        await this.doPost(this.request, this.response);
        break;
      case 'PUT':
        await this.doPut(this.request, this.response);
        break;
      case 'DELETE':
        await this.doDelete(this.request, this.response);
        break;
      default:
        throw new Error('지정된 Method API 가 존재하지 않습니다.');
    }
  }
}

export default OTAController;
