<template>
  <!-- Contact Modal Overlay -->
  <transition name="modal-fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-[200] flex items-center justify-center p-4"
      @click.self="$emit('update:modelValue', false)"
    >
      <div class="absolute inset-0 bg-black/80 backdrop-blur-md"></div>

      <div class="relative bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Header -->
        <div class="relative p-8 pb-6 border-b border-slate-800">
          <button
            @click="$emit('update:modelValue', false)"
            class="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
          >
            ✕
          </button>
          <div class="text-xs uppercase tracking-[0.3em] text-sky-400 font-bold mb-2">Contact Us</div>
          <h2 class="text-2xl font-black text-white">お問い合わせ</h2>
          <p class="text-slate-400 text-sm mt-1">製品、パートナーシップ、採用など何でもお気軽にどうぞ。</p>
        </div>

        <!-- Form Body -->
        <div class="p-8">
          <!-- Success State -->
          <div v-if="submitted" class="text-center py-10">
            <div class="text-6xl mb-4">✅</div>
            <h3 class="text-xl font-black text-white mb-2">送信しました！</h3>
            <p class="text-slate-400 text-sm mb-6">お問い合わせを受け付けました。<br>担当者より順次ご連絡いたします。</p>
            <button
              @click="resetForm"
              class="px-6 py-2.5 rounded-full text-sm font-bold border border-slate-700 text-slate-300 hover:border-sky-500/50 hover:text-sky-400 transition-all"
            >
              新しいお問い合わせ
            </button>
          </div>

          <!-- Form -->
          <form v-else @submit.prevent="handleSubmit" class="space-y-5">
            <div class="grid sm:grid-cols-2 gap-5">
              <!-- Company -->
              <div>
                <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  会社名 <span class="text-slate-600 font-normal">(任意)</span>
                </label>
                <input
                  v-model="form.company"
                  type="text"
                  placeholder="株式会社〇〇"
                  class="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/30 transition-all"
                />
              </div>

              <!-- Name (required) -->
              <div>
                <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  お名前 <span class="text-red-400">*</span>
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="山田 太郎"
                  class="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/30 transition-all"
                  :class="errors.name ? 'border-red-500/60' : ''"
                />
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-5">
              <!-- Email (required) -->
              <div>
                <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  メールアドレス <span class="text-red-400">*</span>
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="example@company.jp"
                  class="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/30 transition-all"
                  :class="errors.email ? 'border-red-500/60' : ''"
                />
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  電話番号 <span class="text-slate-600 font-normal">(任意)</span>
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="03-XXXX-XXXX"
                  class="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/30 transition-all"
                />
              </div>
            </div>

            <!-- Inquiry Type -->
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                お問い合わせの種類 <span class="text-red-400">*</span>
              </label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  v-for="type in inquiryTypes"
                  :key="type.value"
                  type="button"
                  @click="form.type = type.value"
                  :class="[
                    'py-2.5 px-3 rounded-xl text-xs font-bold border transition-all',
                    form.type === type.value
                      ? 'bg-sky-500/15 border-sky-500/50 text-sky-400'
                      : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300'
                  ]"
                >
                  {{ type.icon }} {{ type.label }}
                </button>
              </div>
            </div>

            <!-- Message (required) -->
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                お問い合わせ内容 <span class="text-red-400">*</span>
              </label>
              <textarea
                v-model="form.message"
                required
                rows="4"
                placeholder="ご質問・ご要望・ご相談内容をご記入ください。"
                class="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/30 transition-all resize-none"
                :class="errors.message ? 'border-red-500/60' : ''"
              ></textarea>
            </div>

            <!-- Error Message -->
            <div v-if="submitError" class="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
              {{ submitError }}
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="submitting"
              class="w-full py-4 rounded-xl text-sm font-black uppercase tracking-wider text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-500/25 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg v-if="submitting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              {{ submitting ? '送信中...' : '送信する / Send' }}
            </button>

            <p class="text-center text-xs text-slate-600">
              送信されたお問い合わせは営業日3日以内にご返答いたします。
            </p>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { sendInquiry } from '../api/index.js';

const props = defineProps({
  modelValue: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue']);

const submitting = ref(false);
const submitted = ref(false);
const submitError = ref('');
const errors = reactive({ name: false, email: false, message: false });

const form = reactive({
  company: '',
  name: '',
  email: '',
  phone: '',
  type: 'Product',
  message: ''
});

const inquiryTypes = [
  { value: 'Product', label: '製品', icon: '📦' },
  { value: 'Partnership', label: '提携', icon: '🤝' },
  { value: 'Recruitment', label: '採用', icon: '👤' },
  { value: 'Other', label: 'その他', icon: '💬' },
];

const handleSubmit = async () => {
  // Reset errors
  errors.name = !form.name;
  errors.email = !form.email;
  errors.message = !form.message;
  submitError.value = '';

  if (!form.name || !form.email || !form.message) return;

  submitting.value = true;
  try {
    await sendInquiry({ ...form });
    submitted.value = true;
  } catch (e) {
    submitError.value = 'エラーが発生しました。しばらくしてから再度お試しください。';
    console.error('Inquiry submit error:', e);
  } finally {
    submitting.value = false;
  }
};

const resetForm = () => {
  submitted.value = false;
  submitError.value = '';
  Object.assign(form, {
    company: '', name: '', email: '',
    phone: '', type: 'Product', message: ''
  });
};

// Close modal on ESC key
watch(() => props.modelValue, (val) => {
  if (val) {
    const handler = (e) => {
      if (e.key === 'Escape') emit('update:modelValue', false);
    };
    document.addEventListener('keydown', handler, { once: true });
  }
});
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
