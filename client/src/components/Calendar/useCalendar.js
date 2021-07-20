import { useContext } from 'react';
import CalendarContext from './CalendarContext';

export default function useCalendar() {
  return useContext(CalendarContext);
}
