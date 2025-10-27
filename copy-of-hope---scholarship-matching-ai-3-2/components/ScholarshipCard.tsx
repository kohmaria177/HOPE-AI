
import React from 'react';
import { MatchResult } from '../types';

interface ScholarshipCardProps {
  result: MatchResult;
}

const DifficultyBadge: React.FC<{ difficulty: 'Easy' | 'Medium' | 'Hard' }> = ({ difficulty }) => {
  const styles = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800',
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${styles[difficulty]}`}>{difficulty}</span>;
};

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ result }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div className="mb-3 sm:mb-0">
            <span className="text-sm font-semibold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">RANK {result.rank}</span>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">{result.name}</h3>
            <p className="text-md text-gray-500">{result.provider}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-3xl font-extrabold text-indigo-600">
              ¥{result.amount_per_year.toLocaleString()}
              <span className="text-lg font-medium text-gray-500">/年</span>
            </p>
            <p className="text-sm text-gray-500">締切: {result.deadline}</p>
          </div>
        </div>

        <div className="my-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2">💡 マッチング理由</h4>
          <p className="text-gray-600">{result.why_match}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">✅ 申請TODOリスト</h4>
            <ul className="space-y-2 text-gray-600">
              {result.todo.map((task, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">詳細情報</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-24">難易度:</span>
                <DifficultyBadge difficulty={result.difficulty} />
              </div>
              <div className="flex items-center">
                 <span className="font-medium text-gray-700 w-24">公式サイト:</span>
                <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 hover:underline truncate">
                  詳細を確認する
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
