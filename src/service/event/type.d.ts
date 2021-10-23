import { QueryParam } from 'src/pages/api/event';
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
