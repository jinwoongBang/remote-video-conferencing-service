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
      console.log(query);
      result = param ? await conn.query(query, param) : await conn.query(query);
    } catch (e) {
      console.error(e);
      error = e;
    } finally {
      await conn?.release();
    }

    if (error) throw error;

    return JSON.parse(JSON.stringify(result));
  }

  protected createWhereClause(
    param: { [key: string]: any },
    separator = ' AND ',
  ) {
    const paramList: string[] = [];

    Object.keys(param).forEach((key, index) => {
      let value = param[key];

      if (value === undefined) {
        return;
      } else if (typeof value === 'string') {
        value = this.addSingleQuotation(value);
      }

      paramList.push(`${key} = ${value}`);
    });

    return paramList.join(separator);
  }

  protected createInsertColumn(
    param: { [key: string]: any },
    separator = ', ',
  ) {
    return Object.keys(param).join(separator);
  }

  protected createInsertValuesByQuestionMark(param: { [key: string]: any }) {
    const length = Object.keys(param).length;
    const values = new Array(length).fill('?').join(',');

    return values;
  }

  private addSingleQuotation(value: string) {
    return `'${value}'`;
  }
}

export default OTAService;
