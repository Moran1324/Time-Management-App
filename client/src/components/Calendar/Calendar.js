/* eslint-disable max-classes-per-file */
import {
  dayHours, OneDay, OneWeek, WeekDays,
} from './timeHelpers/values';
import { getDayIndex } from './timeHelpers/functions';

class CalendarDay {
  constructor(name, startTime, endTime) {
    this.name = name;
    this.startTime = startTime;
    this.endTime = endTime;
    // this.events = [];
  }
}

class CalendarWeek {
  constructor(dateInMs = Date.now()) {
    const day = new Date(dateInMs);

    const currentDayIndex = getDayIndex(day.getTime());

    const tempCurrentWeek = new Array(7).fill(0);

    const currentDay = new CalendarDay(
      WeekDays[currentDayIndex].name,
      day.setHours(0, 0, 0, 0),
      day.setHours(23, 59, 59),
    );

    this.currentWeek = tempCurrentWeek.map((day, index) => {
      if (index === currentDayIndex) return currentDay;
      return new CalendarDay(
        WeekDays[index].name,
        currentDay.startTime + (index - currentDayIndex) * OneDay,
        currentDay.endTime + (index - currentDayIndex) * OneDay,
      );
    });
  }
}

export default class Calendar {
  constructor(startHourIndex = 7, endHourIndex = 23, events, rightToLeft = false) {
    // define current week
    this.currentWeek = [...new CalendarWeek().currentWeek, null];

    const displayHours = dayHours.slice(startHourIndex, endHourIndex);

    // define events arrays by hours
  }

  static nextWeek(currentWeekStartInMs) {
    return [...new CalendarWeek(currentWeekStartInMs + OneWeek).currentWeek, null];
  }

  static prevWeek(currentWeekStartInMs) {
    return [...new CalendarWeek(currentWeekStartInMs - OneWeek).currentWeek, null];
  }
}

// new Array(7).fill({dayName: '', dayStartTime: })
