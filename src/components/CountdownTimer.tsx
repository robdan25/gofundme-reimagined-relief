import { useState, useEffect } from 'react';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      // Set deadline to December 31, 2025 at 11:59 PM
      const deadline = new Date('2025-12-31T23:59:59').getTime();
      const now = new Date().getTime();
      const difference = deadline - now;

      if (difference > 0) {
        setTimeRemaining({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isExpired: false,
        });
      } else {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
      }
    };

    // Calculate immediately
    calculateTimeRemaining();

    // Update every second
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, []);

  if (timeRemaining.isExpired) {
    return (
      <div className="bg-gradient-to-r from-primary to-primary-hover rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 text-center">
        <p className="text-white text-xl sm:text-2xl font-bold">Shipping deadline has passed</p>
        <p className="text-white/80 text-sm sm:text-base mt-2">The duty-free exemption period has ended. Thank you for your support in helping Jamaica recover!</p>
      </div>
    );
  }

  // Mobile compact view
  const CompactTimer = () => (
    <div className="bg-gradient-to-r from-primary/90 to-primary-hover/90 backdrop-blur-sm rounded-lg p-3 mb-6 border border-white/20 shadow-lg md:hidden">
      <div className="flex items-center justify-center gap-2 text-white flex-wrap">
        <span className="text-lg sm:text-xl font-bold">{timeRemaining.days}</span>
        <span className="text-white/70 text-sm">days</span>
        <span className="text-white/40">•</span>
        <span className="text-white/70 text-xs sm:text-sm text-center">Ship supplies by Dec 31</span>
      </div>
    </div>
  );

  // Desktop full view
  const FullTimer = () => (
    <div className="hidden md:block bg-gradient-to-r from-primary/90 to-primary-hover/90 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20 shadow-lg">
      <div className="text-center mb-4">
        <p className="text-white/90 text-sm font-semibold tracking-wider uppercase">
          Time Remaining Until December 31st Shipping Deadline
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/* Days */}
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <div className="text-4xl font-bold text-white mb-1">
            {String(timeRemaining.days).padStart(2, '0')}
          </div>
          <div className="text-xs text-white/80 font-medium uppercase tracking-wider">
            {timeRemaining.days === 1 ? 'Day' : 'Days'}
          </div>
        </div>

        {/* Hours */}
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <div className="text-4xl font-bold text-white mb-1">
            {String(timeRemaining.hours).padStart(2, '0')}
          </div>
          <div className="text-xs text-white/80 font-medium uppercase tracking-wider">
            {timeRemaining.hours === 1 ? 'Hour' : 'Hours'}
          </div>
        </div>

        {/* Minutes */}
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <div className="text-4xl font-bold text-white mb-1">
            {String(timeRemaining.minutes).padStart(2, '0')}
          </div>
          <div className="text-xs text-white/80 font-medium uppercase tracking-wider">
            {timeRemaining.minutes === 1 ? 'Min' : 'Mins'}
          </div>
        </div>

        {/* Seconds */}
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <div className="text-4xl font-bold text-white mb-1 animate-pulse">
            {String(timeRemaining.seconds).padStart(2, '0')}
          </div>
          <div className="text-xs text-white/80 font-medium uppercase tracking-wider">
            {timeRemaining.seconds === 1 ? 'Sec' : 'Secs'}
          </div>
        </div>
      </div>

      <p className="text-white/70 text-sm text-center mt-4">
        All relief goods must be shipped before December 31st, 2025 to qualify for the duty-free exemption granted by the Prime Minister.
      </p>
    </div>
  );

  return (
    <>
      <CompactTimer />
      <FullTimer />
    </>
  );
};

export default CountdownTimer;
