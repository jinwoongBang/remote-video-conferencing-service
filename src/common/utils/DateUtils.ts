import { format as dateFnsFormat } from 'date-fns';

class DateUtils {
  parseStringToMilliseconds(dateString: string) {
    return Date.parse(dateString);
  }

  parseMillisecondsToDate(millisecondsDate: number) {
    const date = new Date();
    date.setTime(millisecondsDate);
    return date;
  }

  format(dateString: string, format?: string) {
    const milliseconds = this.parseStringToMilliseconds(dateString);
    const date = this.parseMillisecondsToDate(milliseconds);

    return dateFnsFormat(date, format || 'yyyy-MM-dd');
  }
}

export default DateUtils;
