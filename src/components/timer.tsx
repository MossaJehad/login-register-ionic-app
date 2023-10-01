import { useState, useEffect } from 'react';

function CountdownTimer({ initialCounter }:any) {
  const [counter, setCounter] = useState(initialCounter);

  useEffect(() => {
    const timer:any = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <>{counter}</>
  );
}

export default CountdownTimer;