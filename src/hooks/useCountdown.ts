import { useState, useEffect } from 'react';

interface TimeLeft { days: string; hours: string; mins: string; secs: string; }

export function useCountdown(targetDateStr: string): TimeLeft {
  const pad = (n: number) => String(n).padStart(2, '0');

  const calc = () => {
    if (!targetDateStr) return { days: '00', hours: '00', mins: '00', secs: '00' };

    const diff = new Date(targetDateStr).getTime() - Date.now();

    if (isNaN(diff) || diff <= 0) return { days: '00', hours: '00', mins: '00', secs: '00' };

    return {
      days:  pad(Math.floor(diff / 86400000)),
      hours: pad(Math.floor((diff % 86400000) / 3600000)),
      mins:  pad(Math.floor((diff % 3600000) / 60000)),
      secs:  pad(Math.floor((diff % 60000) / 1000)),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calc);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(id);
  }, [targetDateStr]);

  return timeLeft;
}
