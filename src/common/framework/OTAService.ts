/**
 * db
 */
import connectionPool from 'src/db';

abstract class OTAService {
  protected async getConnection() {
    return await connectionPool.getConnection();
  }

  protected async excuteQuery(query: string, param?: any[]) {
    let error;
    let conn;
    let result;

    try {
      conn = await this.getConnection();
      result = param ? await conn.query(query, param) : await conn.query(query);
    } catch (e) {
      console.error(e);
      error = e;
    } finally {
      await conn?.release();
    }

    if (error) throw error;

    return result;
  }

  protected createWhereClause(
    param: { [key: string]: any },
    separator = ' AND ',
  ) {
    const paramList: string[] = [];

    Object.keys(param).forEach((operatorKey, index) => {
      let value = param[operatorKey];

      if (value === undefined) {
        return;
      } else if (typeof value === 'string') {
        value = this.addSingleQuotation(value);
      }

      paramList.push(`${operatorKey} = ${value}`);
    });

    return paramList.join(separator);
  }

  private addSingleQuotation(value: string) {
    return `'${value}'`;
  }
}

export default OTAService;
