import { useState, useEffect } from "react";

export const LiveTimer = ({ initialDate }: any) => {
  const [startTime] = useState(initialDate); // Record the start time when the component mounts
  const [elapsedTime, setElapsedTime] = useState("");

  useEffect(() => {
    const timerId = setInterval(() => {
      const now: any = new Date().getTime();
      const elapsedTimeInMilliseconds = now - new Date(startTime).getTime(); // Calculate elapsed time
      const totalSeconds = Math.floor(elapsedTimeInMilliseconds / 1000);
      const minutes = Math.floor(totalSeconds / 60) % 60;
      let hours = Math.floor(totalSeconds / 3600);
      const days = Math.floor(totalSeconds / (3600 * 30));
      const seconds = totalSeconds % 60;
      hours = hours % 24;
      if (days) {
        setElapsedTime(
          `${days} days ${hours} hours ${minutes} mins ${seconds} sec`
        );
      } else if (hours) {
        setElapsedTime(`${hours} hours ${minutes} mins ${seconds} sec`);
      } else {
        setElapsedTime(`${minutes} mins ${seconds} sec`);
      }
    }, 1000);

    return () => clearInterval(timerId); // Clean up the interval on unmount
  }, [initialDate]);

  return <>{elapsedTime}</>;
};

export const LiveTimerMinSec = ({ initialDate }: any) => {
  const [startTime] = useState(initialDate); // Record the start time when the component mounts
  const [elapsedTime, setElapsedTime] = useState("");

  useEffect(() => {
    const timerId = setInterval(() => {
      const now: any = new Date().getTime();
      const elapsedTimeInMilliseconds = now - new Date(startTime).getTime(); // Calculate elapsed time
      const totalSeconds = Math.floor(elapsedTimeInMilliseconds / 1000);
      const minutes = Math.floor(totalSeconds / 60) % 60;
      const hours = Math.floor(totalSeconds / 3600);
      const seconds = totalSeconds % 60;

      if (hours) {
        setElapsedTime(`${hours}:${minutes}:${seconds}`);
      } else {
        setElapsedTime(`${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(timerId); // Clean up the interval on unmount
  }, [initialDate]);

  return <>{elapsedTime}</>;
};
