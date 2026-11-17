'use client';
import { useLang } from '@/context/AppContext';
import { localePath } from '@/lib/locale';

// One line under each lead form: sending it is consent under the privacy
// policy (Uzbekistan's personal data law requires the consent to be informed).
const TEXT = {
  en: ['By sending, you agree to our ', 'privacy policy', '.'],
  ru: ['Отправляя форму, вы соглашаетесь с ', 'политикой конфиденциальности', '.'],
  uz: ['Yuborish orqali ', 'maxfiylik siyosati', 'ga rozilik bildirasiz.'],
  'uz-cyr': ['Юбориш орқали ', 'махфийлик сиёсати', 'га розилик билдирасиз.'],
  kaa: ['Jiberiw arqalı ', 'qupıyalıq siyasatı', 'na razılıq bildiresiz.'],
};

export default function FormConsent() {
  const lang = useLang();
  const [pre, link, post] = TEXT[lang] || TEXT.uz;
  return (
    <p className="form-consent">
      {pre}
      <a href={localePath(lang, '/privacy')} target="_blank" rel="noopener">{link}</a>
      {post}
    </p>
  );
}
