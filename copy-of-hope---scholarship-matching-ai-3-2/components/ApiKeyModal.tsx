import React, { useState, useEffect } from 'react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSave }) => {
  const [key, setKey] = useState('');

  useEffect(() => {
    if (isOpen) {
      setKey(localStorage.getItem('gemini-api-key') || '');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (key.trim()) {
      onSave(key.trim());
    }
  };
  
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full m-4 transform transition-all duration-300 scale-95 animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">APIキーを設定</h2>
        <p className="text-gray-600 mb-6">
          このアプリを使用するにはGoogle AIのAPIキーが必要です。
          <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold hover:underline">
            Google AI Studio
          </a>
          でキーを取得し、以下に貼り付けてください。
        </p>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="APIキーをここに貼り付け"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-6 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-semibold transition-colors">
            キャンセル
          </button>
          <button 
            onClick={handleSave} 
            className="px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 font-semibold transition-colors shadow-md disabled:bg-indigo-300"
            disabled={!key.trim()}
          >
            保存して開始
          </button>
        </div>
      </div>
       <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
