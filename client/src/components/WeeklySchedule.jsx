import React, { useState, useEffect } from 'react';
import WeekCalendar from './Calendar/WeekCalendar';

const WeeklySchedule = () => {
  const [schedule, setSchedule] = useState();

  useEffect(() => {
    // const day = [];
    // const dayMinutes = 60 * 24;
    // for (let time = 0; time < dayMinutes; time + 15) {
    //   day.push(time);
    // }
    // console.log('day: ', day);
  }, []);

  return (
    <div>
      <h1>
        Weekly Schedule
      </h1>
      <WeekCalendar />
    </div>
  );
};

export default WeeklySchedule;
