import QueryParam from 'src/db/model/EventQueryParam';
import EventVO from 'src/vo/EventVO';

type PaginationType = {
  currentPage: number;
  returnCount: number;
};

export type SelectEventListParam = QueryParam;
export type SelectOneEventParam = {
  id: number;
};

export type InsertEventParam = Partial<EventVO>;
