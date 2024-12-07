import React, { useState, useCallback } from 'react';
import { Infinity } from 'lucide-react';
import { questions } from './data/questions';
import { TestResult } from './components/TestResult';
import { Question } from './components/Question';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = useCallback((answer: number) => {
    setAnswers(prev => [...prev, answer]);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  }, [currentQuestion]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setAnswers(prev => prev.slice(0, -1));
    }
  }, [currentQuestion]);

  const handleRestart = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsComplete(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <header className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Infinity className="w-16 h-16 text-yellow-500" />
          </div>
          <h1 className="text-4xl font-bold mb-2">人性探索測試</h1>
          <img
            src="https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&q=80&w=2070"
            alt="Mindfulness"
            className="w-full h-48 object-cover rounded-lg shadow-lg mb-6"
          />
        </header>

        <main className="bg-white rounded-lg shadow-lg p-6">
          {!isComplete ? (
            <Question
              question={questions[currentQuestion]}
              onAnswer={handleAnswer}
              onPrevious={handlePrevious}
              currentNumber={currentQuestion + 1}
              total={questions.length}
              showPrevious={currentQuestion > 0}
            />
          ) : (
            <div>
              <TestResult answers={answers} />
              <button
                onClick={handleRestart}
                className="mt-8 w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                重新測試
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;