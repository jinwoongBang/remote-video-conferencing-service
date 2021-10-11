import EventOptionVO from 'src/vo/EventOptionVO';

export type SelectEventOptionListByEventIdListParam = { eventIdList: number[] };
export type InsertEventOptionParam = Partial<EventOptionVO>[];
