import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex-1 w-full bg-linear-to-br from-blue-600 via-blue-500 to-teal-400 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-white">
        <Loader2 className="w-12 h-12 animate-spin" />
        <p className="text-lg font-medium text-white/80">Loading weather data...</p>
      </div>
    </div>
  );
}
