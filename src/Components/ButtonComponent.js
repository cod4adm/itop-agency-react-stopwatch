import React from 'react';

function Button(props) {
  return (
    <div>
      {
        props.timerStatus !== 1 && <button
          className='stopwatch-btn stopwatch-btn-gre'
          onClick={props.start}
        >Start</button>
      }

      {
        props.timerStatus === 1 && <button
          className='stopwatch-btn stopwatch-btn-red'
          onClick={props.stop}
        >Stop</button>
      }

      <button
        className='stopwatch-btn stopwatch-btn-yel'
        onClick={(event) => props.wait(event)}
        disabled={props.timerStatus === 0}
      >Wait</button>
      <button
        className='stopwatch-btn stopwatch-btn-red'
        onClick={props.reset}
        disabled={props.timerStatus === 0}
      >Reset</button>
    </div>
  );
}

export default Button;