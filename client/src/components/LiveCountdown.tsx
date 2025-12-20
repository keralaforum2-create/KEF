import { useEffect, useState } from "react";

export function LiveCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Event date: January 7, 2026 at 9:00 AM
      const eventDate = new Date(2026, 0, 7, 9, 0, 0).getTime();
      const now = new Date().getTime();
      const diff = eventDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      } else {
        // Event has started
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimerBox = ({ value, label }: { value: number; label: string }) => (
    <div className="text-center">
      <div className="font-black text-3xl sm:text-4xl" style={{ color: "hsl(174 100% 29%)" }}>
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider mt-1" style={{ color: "hsl(220 13% 54%)" }}>
        {label}
      </div>
    </div>
  );

  return (
    <div className="flex justify-center gap-3 sm:gap-4">
      <TimerBox value={timeLeft.days} label="DAYS" />
      <TimerBox value={timeLeft.hours} label="HRS" />
      <TimerBox value={timeLeft.minutes} label="MIN" />
      <TimerBox value={timeLeft.seconds} label="SEC" />
    </div>
  );
}
