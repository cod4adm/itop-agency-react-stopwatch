import React from 'react';

function Display({seconds, minutes, hours}) {
  return (
    <div>
      <span>{hours >= 10 ? hours : '0' + hours}</span>
      <span>{minutes >= 10 ? minutes : '0' + minutes}</span>
      <span>{seconds >= 10 ? seconds : '0' + seconds}</span>
    </div>
  );
}

export default Display;
