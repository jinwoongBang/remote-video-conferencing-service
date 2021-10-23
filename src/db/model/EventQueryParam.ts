import { EventGetParam } from 'src/pages/api/event/type';
import * as _ from 'lodash';

class QueryParam {
  _returnCount?: string;
  _currentPage?: string;
  fromDate?: string;
  toDate?: string;
  _status?: string;
  code?: string;
  title?: string;
  _id?: string;

  constructor({
    returnCount,
    currentPage,
    fromDate,
    toDate,
    status,
    code,
    title,
    id,
  }: EventGetParam) {
    this._returnCount = returnCount;
    this._currentPage = currentPage;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this._status = status;
    this.code = code;
    this.title = title;
    this._id = id;
  }

  get returnCount() {
    return Number(this._returnCount);
  }

  get currentPage() {
    return Number(this._currentPage);
  }

  get limit() {
    return this.returnCount;
  }

  get offset() {
    return this.returnCount * this.currentPage;
  }

  get status() {
    return Number(this._status);
  }

  get id() {
    return Number(this._id);
  }

  get hasId() {
    return !_.isEmpty(this._id);
  }

  getParamList() {
    const { limit, offset, fromDate, toDate, status, code, title } = this;
    const list: (string | number)[] = [];
    fromDate && list.push(fromDate);
    toDate && list.push(toDate);
    status < 2 && list.push(status);
    code && list.push(code);
    title && list.push(`%${title}%`);
    list.push(limit);
    list.push(offset);

    return list;
  }
}

export default QueryParam;
