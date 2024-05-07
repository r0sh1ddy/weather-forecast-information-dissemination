import React, { useState } from 'react';
import moment from 'moment';

function Calendar(){
const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());

  const startDay = currentDate.clone().startOf('month').startOf('week');
  const endDay = currentDate.clone().endOf('month').endOf('week');
  const day = startDay.clone().subtract(1, 'day');
  const calendar = [];

  while (day.isBefore(endDay, 'day')) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, 'day').clone())
    );
  }

  const isSelected = (day) => {
    return currentDate.isSame(day, 'day');
  };

  const beforeToday = (day) => {
    return day.isBefore(moment(), 'day');
  };

  const isToday = (day) => {
    return day.isSame(moment(), 'day');
  };

  const currentMonth = () => {
    return currentDate.format('MMMM');
  };

  const currentYear = () => {
    return currentDate.format('YYYY');
  };

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, 'month'));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>Prev</button>
        <div>
          {currentMonth()} {currentYear()}
        </div>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <div className="calendar-body">
        <div className="calendar-week">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        {calendar.map((week, index) => (
          <div key={index} className="calendar-week">
            {week.map((day, index) => (
              <div
                key={index}
                className={`calendar-day ${isSelected(day) ? 'selected' : ''} ${
                  beforeToday(day) ? 'before-today' : ''
                } ${isToday(day) ? 'today' : ''}`}
              >
                {day.format('D')}

                
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
}
export default Calendar;