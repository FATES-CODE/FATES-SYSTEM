import { ref } from 'vue';

const getInitialLang = () => {
  try {
    const saved = localStorage.getItem('site_lang');
    if (saved && ['ja', 'en', 'ko'].includes(saved)) {
      return saved;
    }
  } catch (e) {}
  return 'ja';
};

export const currentLang = ref(getInitialLang());


export function setLanguage(lang) {
  if (['ja', 'en', 'ko'].includes(lang)) {
    currentLang.value = lang;
    try {
      localStorage.setItem('site_lang', lang);
    } catch (e) {}
  }
}
