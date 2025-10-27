
import React from 'react';
import { MatchResult } from '../types';
import { ScholarshipCard } from './ScholarshipCard';

interface ResultsDisplayProps {
  results: MatchResult[];
  onReset: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight sm:text-5xl">あなたに最適な奨学金</h1>
        <p className="mt-4 text-xl text-gray-600">AIが選んだTOP5の結果はこちらです。</p>
      </div>
      
      {results.length > 0 ? (
        <div className="space-y-6">
          {results.sort((a, b) => a.rank - b.rank).map((result) => (
            <ScholarshipCard key={result.rank} result={result} />
          ))}
        </div>
      ) : (
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-600">適切な奨学金が見つかりませんでした。条件を変更して再試行してください。</p>
        </div>
      )}

      <div className="mt-12 text-center">
        <button
          onClick={onReset}
          className="px-8 py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          もう一度診断する
        </button>
      </div>
    </div>
  );
};
