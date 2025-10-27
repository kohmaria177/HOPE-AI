import React, { useState } from 'react';
import { Profile, Grade, Prefecture, IncomeBand, Major, Gender, AcademicPerformance } from '../types';

interface OnboardingFormProps {
  onSubmit: (profile: Profile) => void;
}

const StepIndicator: React.FC<{ currentStep: number; totalSteps: number }> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-center items-center space-x-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full transition-colors duration-300 ${
            index + 1 <= currentStep ? 'bg-indigo-600' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export const OnboardingForm: React.FC<OnboardingFormProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Profile>({
    grade: Grade.HighSchool3,
    prefecture: Prefecture.Tokyo,
    incomeBand: IncomeBand.From2MTo4M,
    major: Major.Other,
    gender: Gender.Other,
    academicPerformance: AcademicPerformance.NotProvided,
    fromCare: false,
    lineOptIn: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setProfile(prev => ({ ...prev, [name]: checked }));
    } else {
      const { value } = e.target;
      setProfile(prev => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">あなたの基本情報</h2>
            <p className="text-gray-600 mb-6 text-center">最適な奨学金を見つけるために教えてください。</p>
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700">学年</span>
                <select name="grade" value={profile.grade} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  {Object.values(Grade).map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-gray-700">お住まいの都道府県</span>
                <select name="prefecture" value={profile.prefecture} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  {Object.values(Prefecture).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-gray-700">性別</span>
                <select name="gender" value={profile.gender} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  {Object.values(Gender).map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </label>
               <label className="flex items-center space-x-3 mt-4 p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="fromCare"
                  checked={profile.fromCare}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700">社会的養護（児童養護施設、里親家庭など）の経験がありますか？</span>
              </label>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">学業と経済状況について</h2>
            <p className="text-gray-600 mb-6 text-center">よりパーソナライズされた提案のために必要です。</p>
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700">興味のある学問分野</span>
                <select name="major" value={profile.major} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  {Object.values(Major).map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-gray-700">現在の成績（分かる範囲で）</span>
                <select name="academicPerformance" value={profile.academicPerformance} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  {Object.values(AcademicPerformance).map(ap => <option key={ap} value={ap}>{ap}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-gray-700">世帯年収</span>
                <select name="incomeBand" value={profile.incomeBand} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  {Object.values(IncomeBand).map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </label>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">最後に</h2>
            <p className="text-gray-600 mb-6 text-center">あと少しです！</p>
            <div className="space-y-4">
              <label className="flex items-center space-x-3 mt-4 p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="lineOptIn"
                  checked={profile.lineOptIn}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700">LINEで申請期限のリマインダーを受け取る</span>
              </label>
            </div>
            <div className="mt-6 text-xs text-gray-500">
              <p>入力された情報は、奨学金のマッチング目的にのみ使用されます。詳しくは<a href="#" className="text-indigo-600 hover:underline">プライバシーポリシー</a>をご確認ください。</p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <StepIndicator currentStep={step} totalSteps={3} />
      <form onSubmit={handleSubmit}>
        <div className="min-h-[280px]">
         {renderStep()}
        </div>
        <div className="mt-8 flex justify-between items-center">
          {step > 1 ? (
            <button type="button" onClick={prevStep} className="px-6 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
              戻る
            </button>
          ) : <div />}
          {step < 3 ? (
            <button type="button" onClick={nextStep} className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
              次へ
            </button>
          ) : (
            <button type="submit" className="px-6 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-md">
              結果を見る
            </button>
          )}
        </div>
      </form>
    </div>
  );
};