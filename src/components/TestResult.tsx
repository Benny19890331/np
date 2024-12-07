import React, { useMemo } from 'react';
import { getPersonalityType } from '../utils/results';

interface TestResultProps {
  answers: number[];
}

export function TestResult({ answers }: TestResultProps) {
  const result = useMemo(() => getPersonalityType(answers), [answers]);
  
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">測驗結果</h2>
      <div className="mb-6">
        <img
          src={result.imageUrl}
          alt={result.type}
          className="w-48 h-48 object-cover rounded-full mx-auto mb-4 shadow-lg"
        />
        <h3 className="text-2xl font-semibold text-blue-600 mb-2">
          你是 {result.type}
        </h3>
      </div>
      <div className="text-left bg-gray-50 p-6 rounded-lg">
        <h4 className="text-xl font-semibold mb-3">什麼是{result.type.replace(/[大]/, '')}？</h4>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {result.description}
        </p>
      </div>
    </div>
  );
}