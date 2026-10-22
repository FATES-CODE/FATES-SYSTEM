<template>
  <SubPageLayout
    :category-title="content.banner.categoryTitle"
    :category-en="content.banner.categoryEn"
    category-url="/contact"
    :page-title="content.banner.pageTitle"
    :page-description="content.banner.pageDescription"
    hero-image="/images/company/business-innovation.jpg"
    :tabs="content.tabs"
  >
    <div class="quiry-page">
      <div class="sub-headline-box">

        <h2 class="sub-main-title">{{ content.headline.title }}</h2>
        <p class="section-intro">
          {{ content.headline.intro }}
        </p>
      </div>

      <div class="quiry-layout-grid">
        <div class="inquiry-form-card">
          <form @submit.prevent="handleSubmit" class="inquiry-form">
            <div class="form-row">
              <div class="form-group">
                <label for="companyName" class="form-label">{{ content.form.companyLabel }}</label>
                <input 
                  type="text" 
                  id="companyName" 
                  v-model="formData.company" 
                  :placeholder="content.form.companyPlaceholder"
                  class="form-input" 
                />
              </div>
              <div class="form-group">
                <label for="userName" class="form-label required">{{ content.form.nameLabel }}</label>
                <input 
                  type="text" 
                  id="userName" 
                  v-model="formData.name" 
                  :placeholder="content.form.namePlaceholder"
                  class="form-input" 
                  required 
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="userEmail" class="form-label required">{{ content.form.emailLabel }}</label>
                <input 
                  type="email" 
                  id="userEmail" 
                  v-model="formData.email" 
                  :placeholder="content.form.emailPlaceholder" 
                  class="form-input" 
                  required 
                />
              </div>
              <div class="form-group">
                <label for="userPhone" class="form-label required">{{ content.form.phoneLabel }}</label>
                <input 
                  type="tel" 
                  id="userPhone" 
                  v-model="formData.phone" 
                  :placeholder="content.form.phonePlaceholder"
                  class="form-input" 
                  required 
                />
              </div>
            </div>

            <!-- 제목 -->
            <div class="form-group">
              <label for="inquiryTitle" class="form-label required">{{ content.form.titleLabel }}</label>
              <input 
                type="text" 
                id="inquiryTitle" 
                v-model="formData.title" 
                :placeholder="content.form.titlePlaceholder"
                class="form-input" 
                required 
              />
            </div>

            <div class="form-group">
              <label for="inquiryMessage" class="form-label required">{{ content.form.messageLabel }}</label>
              <textarea 
                id="inquiryMessage" 
                v-model="formData.message" 
                rows="6" 
                :placeholder="content.form.messagePlaceholder"
                class="form-textarea" 
                required
              ></textarea>
            </div>

            <div class="form-privacy-box">
              <label class="checkbox-label">
                <input type="checkbox" v-model="formData.agreePrivacy" required />
                <span>{{ content.form.privacyConsent }}</span>
              </label>
              <p class="privacy-notice">
                {{ content.form.privacyNotice }}
              </p>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-submit-inquiry" :disabled="isSubmitting">
                <span v-if="!isSubmitting">{{ content.form.submitBtn }} &rarr;</span>
                <span v-else>{{ content.form.submittingBtn }}</span>
              </button>
            </div>



            <div v-if="errorMessage" class="inquiry-error-alert">
              <span class="error-icon">✕</span>
              <div>
                <strong>{{ content.form.errorTitle }}</strong>
                <p>{{ errorMessage }}</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </SubPageLayout>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import SubPageLayout from '../common/SubPageLayout.vue';
import { currentLang, setLanguage } from '../../composables/useLanguage.js';

const switchLang = (code) => {
  setLanguage(code);
};

const inquiryData = {
  ko: {
    banner: {
      categoryTitle: '연락처',
      categoryEn: 'CONTACT US',
      pageTitle: '문의사항',

    },
    tabs: [
      { name: '문의사항', url: '/quiry' },
      { name: '오시는길', url: '/location' }
    ],
    headline: {
      badge: 'ONLINE INQUIRY',
      title: '온라인 비즈니스 문의',
      intro: '언제든 편하게 연락주세요'
    },
    form: {
      categoryLabel: '문의 부문',
      categories: [
        { val: 'food', label: '개호식품' },
        { val: 'money', label: '금고' },
        { val: 'product', label: '생활용품' },
        { val: 'chemical', label: '화학제품' },
        { val: 'general', label: '기타/일반제휴' }
      ],

      companyLabel: '회사',
      companyPlaceholder: 'azamino',
      nameLabel: '담당자',
      namePlaceholder: '홍길동',
      emailLabel: '이메일',
      emailPlaceholder: 'azamino.ltd@gmail.com',
      phoneLabel: '연락처',
      phonePlaceholder: '010-1234-5678',
      titleLabel: '문의 제목',
      titlePlaceholder: '문의내용을 입력해주세요',
      messageLabel: '문의 내용',
      messagePlaceholder: '문의하고자 하는 내용을 적어주세요',
      privacyConsent: '개인정보 수집 및 이용에 동의합니다. (필수)',
      privacyNotice: '수집 항목: 회사명, 성명, 이메일, 연락처 | 수집 목적: 고객 문의 응대 및 상담 안내 | 보유 기간: 상담 종료 후 1년간 보관 후 파기',
      submitBtn: '문의 등록하기',
      submittingBtn: '접수 처리 중',
      successTitle: '문의가 정상적으로 전송되었습니다.',
      successDesc: '문의 내용이 발송되었습니다.',
      errorTitle: '전송 중 문제가 발생했습니다.'
    }
  },
  ja: {
    banner: {
      categoryTitle: 'お問い合わせ',
      categoryEn: 'CONTACT US',
      pageTitle: 'オンラインお問い合わせ',
      pageDescription: '製品の導入やビジネスパートナーシップに関するお問い合わせを承っております。'
    },
    tabs: [
      { name: 'お問い合わせ', url: '/quiry' },
      { name: 'アクセス', url: '/location' }
    ],
    headline: {
      badge: 'ONLINE INQUIRY',
      title: 'オンラインお問い合わせ',
      intro: 'お気軽にご相談・お問い合わせください。'
    },
    form: {
      categoryLabel: 'お問い合わせ項目',
      categories: [
        { val: 'food', label: '介護食品' },
        { val: 'money', label: '金庫ソリューション' },
        { val: 'product', label: '生活用品' },
        { val: 'chemical', label: '化学品' },
        { val: 'general', label: 'その他・提携' }
      ],
      companyLabel: '貴社名',
      companyPlaceholder: 'AZAMINO Inc.',
      nameLabel: 'ご担当者様名',
      namePlaceholder: '椿 涼介',
      emailLabel: 'メールアドレス',
      emailPlaceholder: 'azamino.ltd@gmail.com',
      phoneLabel: 'お電話番号',
      phonePlaceholder: '+82-2-1234-5678',
      titleLabel: '件名',
      titlePlaceholder: 'お問い合わせの件名を入力してください',
      messageLabel: 'お問い合わせ内容',
      messagePlaceholder: '詳細な内容をご記入ください',
      privacyConsent: '個人情報の収集および利用に同意します。(必須)',
      privacyNotice: '収集項目: 会社名、氏名、メールアドレス、連絡先 | 目的: お問い合わせへの対応およびご案内 | 保管期間: 1年間',
      submitBtn: 'お問い合わせを送信する',
      submittingBtn: '送信処理中',
      successTitle: 'お問い合わせを正常に受け付けました。',
      successDesc: '担当者にて内容を確認の上、速やかにご連絡申し上げます。',
      errorTitle: '送信中にエラーが発生しました。'
    }
  },
  en: {
    banner: {
      categoryTitle: 'Contact Us',
      categoryEn: 'CONTACT US',
      pageTitle: 'Online Inquiry',
      pageDescription: 'Please submit your inquiry regarding products or business partnerships.'
    },
    tabs: [
      { name: 'Inquiry', url: '/quiry' },
      { name: 'Location', url: '/location' }
    ],
    headline: {
      badge: 'ONLINE INQUIRY',
      title: 'Online Business Inquiry',
      intro: 'Please feel free to reach out to us at any time.'
    },
    form: {
      categoryLabel: 'Inquiry Category',
      categories: [
        { val: 'food', label: 'Care Food' },
        { val: 'money', label: 'Safes Solution' },
        { val: 'product', label: 'Living Goods' },
        { val: 'chemical', label: 'Chemical Products' },
        { val: 'general', label: 'General / Partnership' }
      ],
      companyLabel: 'Company / Organization',
      companyPlaceholder: 'AZAMINO Inc.',
      nameLabel: 'Contact Person',
      namePlaceholder: 'NAME',
      emailLabel: 'Email',
      emailPlaceholder: 'azamino.ltd@gmail.com',
      phoneLabel: 'Phone Number',
      phonePlaceholder: '+82-10-1234-5678',
      titleLabel: 'Subject',
      titlePlaceholder: 'Enter the subject of your inquiry',
      messageLabel: 'Message',
      messagePlaceholder: 'Please describe your inquiry in detail',
      privacyConsent: 'I agree to the collection and use of personal information.',
      privacyNotice: 'Collected items: Company, Name, Email, Phone | Purpose: Responding to inquiry | Retention: 1 year',
      submitBtn: 'Submit Inquiry',
      submittingBtn: 'Submitting',
      successTitle: 'Your inquiry has been submitted successfully.',
      successDesc: 'Our representative will review your message and get back to you shortly.',
      errorTitle: 'An error occurred during submission.'
    }
  }
};

const content = computed(() => {
  return inquiryData[currentLang.value] || inquiryData.ja;
});

const formData = reactive({
  category: 'food',
  company: '',
  name: '',
  email: '',
  phone: '',
  title: '',
  message: '',
  agreePrivacy: false
});

const isSubmitting = ref(false);
const submittedMessage = ref(false);
const errorMessage = ref('');

const handleSubmit = async () => {
  isSubmitting.value = true;
  submittedMessage.value = false;
  errorMessage.value = '';

  try {
    const res = await fetch('/api/inquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || (currentLang.value === 'ko' ? '서버 응답 오류가 발생했습니다.' : 'Server response error.'));
    }

    submittedMessage.value = true;
    formData.company = '';
    formData.name = '';
    formData.email = '';
    formData.phone = '';
    formData.title = '';
    formData.message = '';
    formData.agreePrivacy = false;
  } catch (err) {
    errorMessage.value = err.message || (currentLang.value === 'ko' ? '전송 중 오류가 발생했습니다. 다시 시도해주세요.' : 'An error occurred.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>
