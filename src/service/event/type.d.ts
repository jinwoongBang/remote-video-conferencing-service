import EventVO from 'src/vo/EventVO';

export interface SelectEventListParam {
  currentPage: number;
  returnCount: number;
}

export type InsertEventParam = Partial<EventVO>;
