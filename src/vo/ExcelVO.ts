export interface IExcel {
  ID: number;
  FILE_NAME: string;
  TYPE: number;
  COLUMN_COUNT?: number;
  IS_DELETED?: number;
  ADD_USER_COUNT: number;
  DATE_OF_DELETED?: string;
  DATE_OF_CREATED: string;
}
