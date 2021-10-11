import { InsertEventParam } from 'src/service/event/type';

export type EventGetParam = {
  currentPage: string;
  returnCount: string;
  [key: string]: string | string[];
};

type EventPostParam = {
  event: InsertEventParam;
};
