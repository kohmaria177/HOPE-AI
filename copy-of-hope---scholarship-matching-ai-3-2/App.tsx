import React, { useState, useCallback, useEffect } from 'react';
import { Page, Profile, MatchResult } from './types';
import { OnboardingForm } from './components/OnboardingForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { ApiKeyModal } from './components/ApiKeyModal';
import { findMatchingScholarships } from './services/geminiService';
import { scheduleLineReminders } from './services/notificationService';
import { SCHOLARSHIP_DATA } from './constants';

const HomePage: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="text-center">
    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
      <span className="block">あなたの人生に</span>
      <span className="block text-indigo-600">新たな選択肢を</span>
    </h1>
    <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
      HOPEは、AIを活用してあなたにぴったりの奨学金や支援制度を見つけるお手伝いをします。
      いくつかの簡単な質問に答えるだけで、自分に合った制度を見つけられます
    </p>
    <div className="mt-10">
      <button
        onClick={onStart}
        className="px-10 py-4 text-lg font-bold text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
      >
        奨学金を探す
      </button>
    </div>
    <p className="mt-8 text-sm text-gray-500">
      本アプリケーションのご利用には、Google AIのAPIキーが必要です。<br />
      「奨学金を探す」ボタンをクリックして、APIキーを設定してください。
    </p>
  </div>
);

const LoadingPage: React.FC = () => (
  <div className="text-center p-8 bg-white rounded-lg shadow-md">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
    <h2 className="mt-6 text-2xl font-semibold text-gray-800">AIがあなたに最適な奨学金を検索中...</h2>
    <p className="mt-2 text-gray-600">結果が出るまで、しばらくお待ちください。</p>
  </div>
);


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  const handleStart = () => {
    const storedApiKey = localStorage.getItem('gemini-api-key');
    if (storedApiKey) {
      setCurrentPage(Page.Onboarding);
    } else {
      setIsApiKeyModalOpen(true);
    }
  };

  const handleSaveApiKey = (key: string) => {
    if (key) {
      localStorage.setItem('gemini-api-key', key);
      setIsApiKeyModalOpen(false);
      // If user was at home, move to onboarding
      if (currentPage === Page.Home) {
        setCurrentPage(Page.Onboarding);
      }
    }
  };

  const handleFormSubmit = useCallback(async (profile: Profile) => {
    setCurrentPage(Page.Loading);
    setError(null);
    try {
      const results = await findMatchingScholarships(profile, SCHOLARSHIP_DATA);
      setMatchResults(results);

      if (profile.lineOptIn && results.length > 0) {
        scheduleLineReminders(results);
      }

      setCurrentPage(Page.Results);
    } catch (err) {
      if (err instanceof Error && /API key/i.test(err.message)) {
         setError(err.message);
         setIsApiKeyModalOpen(true);
      } else {
         setError('マッチング処理中にエラーが発生しました。時間をおいて再度お試しください。');
      }
      setCurrentPage(Page.Onboarding); // Go back to form on error
    }
  }, []);

  const reset = () => {
    setCurrentPage(Page.Home);
    setMatchResults([]);
    setError(null);
  }

  const renderContent = () => {
    switch (currentPage) {
      case Page.Home:
        return <HomePage onStart={handleStart} />;
      case Page.Onboarding:
        return (
          <>
            {error && <div className="mb-4 p-4 text-center text-red-700 bg-red-100 rounded-lg">{error}</div>}
            <OnboardingForm onSubmit={handleFormSubmit} />
          </>
        );
      case Page.Loading:
        return <LoadingPage />;
      case Page.Results:
        return <ResultsDisplay results={matchResults} onReset={reset} />;
      default:
        return <HomePage onStart={handleStart} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      <header className="py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600 tracking-wider">
            HOPE
          </div>
          <button
            onClick={() => setIsApiKeyModalOpen(true)}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="APIキーを設定"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} HOPE Project. All rights reserved.</p>
      </footer>
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSave={handleSaveApiKey}
      />
    </div>
  );
};

export default App;
