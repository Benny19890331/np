import React, { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { QuestionType } from '../types';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (answer: number) => void;
  onPrevious: () => void;
  currentNumber: number;
  total: number;
  showPrevious: boolean;
}

export function Question({ 
  question, 
  onAnswer, 
  onPrevious,
  currentNumber, 
  total,
  showPrevious 
}: QuestionProps) {
  const shuffledOptions = useMemo(() => {
    return [...question.options].sort(() => Math.random() - 0.5);
  }, [question]);

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">
            問題 {currentNumber} / {total}
          </div>
          {showPrevious && (
            <button
              onClick={onPrevious}
              className="flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              上一題
            </button>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
      </div>
      
      <div className="space-y-3">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option.value)}
            className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}