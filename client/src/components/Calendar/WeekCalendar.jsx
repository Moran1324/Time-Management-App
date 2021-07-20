import React from 'react';
import { formatDate } from './timeHelpers/functions';
import useCalendar from './useCalendar';

function WeekCalendar() {
  const [calendar, dispatch, ACTIONS] = useCalendar();
  return (
    <>
      <div className="week-calendar">
        {JSON.stringify(calendar, null, 2)}
        {calendar.currentWeek.map((day) => {
          if (!day) return null;
          return (
            <div key={day.name}>
              <h2>{day.name}</h2>
              <h3>{formatDate(day.startTime)}</h3>
            </div>
          );
        })}
      </div>
      <button onClick={() => dispatch(ACTIONS.prevWeek)}>Previous Week</button>
      <button onClick={() => dispatch(ACTIONS.nextWeek)}>Next Week</button>
    </>
  );
}

export default WeekCalendar;
