import { createFileRoute, Link } from '@tanstack/react-router';
import { BarChart3 } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationContext';

export const Route = createFileRoute('/')({
  component: LandingPage,
});

function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-emerald-100 p-8">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 text-center">
        {t('landing.title')}
      </h1>
      <p className="text-2xl text-gray-600 mb-12 text-center">
        {t('landing.subtitle')}
      </p>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <Link
          to="/operation-select"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-2xl py-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105 active:scale-95 text-center"
        >
          {t('common.startPractice')}
        </Link>
        <Link
          to="/stats"
          className="bg-green-600 hover:bg-green-700 text-white font-bold text-2xl py-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
        >
          <BarChart3 size={32} />
          {t('common.viewProgress')}
        </Link>
      </div>
    </div>
  );
}
