import React, { useState, useEffect } from 'react';
import { Clock, RotateCcw } from 'lucide-react';

interface TimerProps {
  onReset?: () => void;
  className?: string;
}

const Timer: React.FC<TimerProps> = ({ onReset, className = '' }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setTime(0);
    onReset?.();
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="flex items-center space-x-2 bg-black bg-opacity-30 backdrop-blur-md rounded-lg px-4 py-2 text-white">
        <Clock className="h-5 w-5 text-yellow-400" />
        <span className="text-xl font-mono font-bold">{formatTime(time)}</span>
      </div>
      <button
        onClick={handleReset}
        className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition-colors"
        title="Reset Timer"
      >
        <RotateCcw className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Timer;