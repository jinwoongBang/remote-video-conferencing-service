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

  protected async excuteInsertQuery(
    tableName: string,
    param: { [key: string]: any },
  ) {
    let insertKeyQuery = `INSERT INTO ` + tableName + ` ( `;
    let insertValueQuery = `VALUES ( `;

    Object.keys(param).forEach((key, index) => {
      let value = param[key];

      let insertValue = '';
      if (typeof value === 'string') {
        insertValue = this.addSingleQuotation(value);
      } else {
        insertValue = value;
      }

      if (index == 0) {
        insertKeyQuery += key;
        insertValueQuery += insertValue;
      } else {
        insertKeyQuery += ', ' + key;
        insertValueQuery += ', ' + insertValue;
      }
    });

    insertKeyQuery += ' ) ';
    insertValueQuery += ' ) ';

    const query = insertKeyQuery + insertValueQuery;

    console.log('query: ', query);

    let error;
    let conn;
    let result;
    try {
      conn = await this.getConnection();
      console.log(query);
      result = await conn.query(query);
    } catch (e) {
      console.error(e);
      error = e;
    } finally {
      await conn?.release();
    }
    if (error) throw error;
    return JSON.parse(JSON.stringify(result));
  }

  protected async excuteMultiInsertQuery(
    tableName: string,
    param: { [key: string]: any }[],
  ) {
    let insertKeyQuery = `INSERT INTO ` + tableName + ` ( `;
    let insertValueQuery = `VALUES ( `;

    param.forEach((object, paramIndex) => {
      Object.keys(object).forEach((key, index) => {
        let value = object[key] ?? null;

        let insertValue = '';
        if (typeof value === 'string') {
          insertValue = this.addSingleQuotation(value);
        } else {
          insertValue = value;
        }
        if (paramIndex == 0) insertKeyQuery += index == 0 ? key : `, ${key}`;
        insertValueQuery += index == 0 ? insertValue : `, ${insertValue}`;
      });
      insertValueQuery += paramIndex == param.length - 1 ? '' : ' ) , (';
    });

    insertKeyQuery += ' ) ';
    insertValueQuery += ' ) ';

    const query = insertKeyQuery + insertValueQuery;

    console.log('query: ', query);

    let error;
    let conn;
    let result;
    try {
      conn = await this.getConnection();
      console.log(query);
      result = await conn.query(query);
    } catch (e) {
      console.error(e);
      error = e;
    } finally {
      await conn?.release();
    }
    if (error) throw error;
    return JSON.parse(JSON.stringify(result));
  }
}

export default OTAService;
