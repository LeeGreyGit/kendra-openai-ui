import messages from '../locales/messages.json';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  ja: {
    translation: messages,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ja',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
