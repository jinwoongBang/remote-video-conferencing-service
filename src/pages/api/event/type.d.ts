import { InsertEventParam } from 'src/service/event/type';
import EventVO from 'src/vo/EventVO';

export type EventGetParam = {
  currentPage: string;
  returnCount: string;
} & {
  fromDate: string;
  toDate: string;
  status: string;
  code: string;
  title: string;
  id?: string;
};

type EventPostParam = {
  event: InsertEventParam;
};
