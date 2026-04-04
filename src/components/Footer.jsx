import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GiMushroom } from 'react-icons/gi';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-white/5 bg-navy-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
              <GiMushroom className="text-white text-sm" />
            </div>
            <span className="text-white font-bold">MycoNaturals</span>
          </Link>
          <div className="text-center">
            <p className="text-white/30 text-sm">{t('footer.copy')}</p>
            <p className="text-white/15 text-xs mt-1">{t('footer.tag')}</p>
          </div>
          <div className="flex gap-4 text-white/25 text-xs">
            <Link to="/guide" className="hover:text-white/50 transition-colors">{t('nav.guide')}</Link>
            <Link to="/franchise" className="hover:text-white/50 transition-colors">{t('nav.franchise')}</Link>
            <Link to="/dashboard" className="hover:text-white/50 transition-colors">{t('nav.dashboard')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
