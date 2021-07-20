import React, { useReducer, createContext } from 'react';
import Calendar from './Calendar';

const CalendarContext = createContext();

/* export */ const ACTIONS = {
  nextWeek: 'next-week',
  prevWeek: 'previous-week',
  insertEvents: 'insert-events',
};

const USER_ACTIONS = {
  nextWeek: { type: 'next-week' },
  prevWeek: { type: 'previous-week' },
  insertEvents: { type: 'insert-events' },
};

const calendarReducer = (calendar, action) => {
  switch (action.type) {
    case ACTIONS.nextWeek:
      return { ...calendar, currentWeek: Calendar.nextWeek(calendar.currentWeek[0].startTime) };
      // return calendar;

    case ACTIONS.prevWeek:
      return { ...calendar, currentWeek: Calendar.prevWeek(calendar.currentWeek[0].startTime) };

    case ACTIONS.insertEvents:
      return calendar.insertEvents(action.payload);

    default:
      return calendar;
  }
};

export function CalendarProvider({ children }) {
  const [calendar, dispatch] = useReducer(calendarReducer, new Calendar());

  const value = [calendar, dispatch, USER_ACTIONS];
  // const displayCalendar = calendar.reduce((accArr, weekDay) => {

  // }, []);
  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}

export default CalendarContext;
