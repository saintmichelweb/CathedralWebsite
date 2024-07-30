import React, { useState } from 'react';

function TimeSelector() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const hourOptions = Array.from({ length: 24 }, (_, index) => index);
  const minuteOptions = Array.from({ length: 60 }, (_, index) => index);

  return (
    <div>
      <select value={hours} onChange={(e) => setHours(parseInt(e.target.value))}>
        {hourOptions.map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </select>
      :
      <select value={minutes} onChange={(e) => setMinutes(parseInt(e.target.value))}>
        {minuteOptions.map((minute) => (
          <option key={minute} value={minute}>
            {minute}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TimeSelector;