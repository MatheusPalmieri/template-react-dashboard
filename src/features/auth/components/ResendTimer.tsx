interface ResendTimerProps {
  remainingTime: number;
}

export function ResendTimer({ remainingTime }: ResendTimerProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center space-x-2 rounded-xl bg-white/5 p-3">
      <svg
        className="h-5 w-5 text-cyan-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="text-sm text-gray-300">
        Reenviar disponível em{' '}
        <span className="font-mono font-semibold text-cyan-400">
          {formatTime(remainingTime)}
        </span>
      </span>
    </div>
  );
}
