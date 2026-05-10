import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorCardProps {
  message: string;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl text-white max-w-md mx-auto">
      <AlertCircle className="w-12 h-12 text-yellow-300 mb-4" />
      <p className="text-center font-medium">{message}</p>
    </div>
  );
};

export default ErrorCard;
