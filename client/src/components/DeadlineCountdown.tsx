import { useEffect, useState } from "react";

interface DeadlineCountdownProps {
  deadlineDate: Date;
}

export function DeadlineCountdown({ deadlineDate }: DeadlineCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const deadline = deadlineDate.getTime();
      const diff = deadline - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
        setExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setExpired(true);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [deadlineDate]);

  const TimerBox = ({ value, label }: { value: number; label: string }) => (
    <div className="text-center">
      <div className="font-bold text-xl sm:text-2xl text-red-600">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-xs font-semibold uppercase text-muted-foreground">
        {label}
      </div>
    </div>
  );

  if (expired) {
    return (
      <div className="text-sm font-medium text-red-600">
        Deadline Expired
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm font-medium text-muted-foreground">Countdown:</span>
      <div className="flex gap-1.5">
        <TimerBox value={timeLeft.days} label="D" />
        <TimerBox value={timeLeft.hours} label="H" />
        <TimerBox value={timeLeft.minutes} label="M" />
        <TimerBox value={timeLeft.seconds} label="S" />
      </div>
    </div>
  );
}
