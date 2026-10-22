import { ref } from 'vue';

const getInitialLang = () => {
  try {
    const saved = localStorage.getItem('site_lang');
    if (saved && ['ko', 'ja', 'en'].includes(saved)) {
      return saved;
    }
  } catch (e) {}
  return 'ko';
};

export const currentLang = ref(getInitialLang());


export function setLanguage(lang) {
  if (['ko', 'ja', 'en'].includes(lang)) {
    currentLang.value = lang;
    try {
      localStorage.setItem('site_lang', lang);
    } catch (e) {}
  }
}
