import type { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'cyan' | 'purple' | 'green' | 'blue';
}

const variantClasses = {
  cyan: 'bg-cyan-600',
  purple: 'bg-purple-600',
  green: 'bg-green-600',
  blue: 'bg-blue-600',
};

export function StatsCard({
  title,
  value,
  icon,
  trend,
  variant = 'cyan',
}: StatsCardProps) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {trend && (
            <div
              className={`flex items-center space-x-1 text-sm ${
                trend.isPositive ? 'text-green-400' : 'text-red-400'
              }`}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {trend.isPositive ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                )}
              </svg>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        <div className={`rounded-lg p-3 ${variantClasses[variant]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
