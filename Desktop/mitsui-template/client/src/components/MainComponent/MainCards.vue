<template>
  <section class="main-categories-section">
    <div class="container">
      <div class="categories-grid">
        <article 
          v-for="cat in categories" 
          :key="cat.id" 
          class="category-card"
        >
          <router-link :to="formatUrl(cat.mainLink)" class="category-card-thumb">
            <img :src="cat.image" :alt="cat.title" loading="lazy" />
            <div class="category-thumb-overlay"></div>
            <h3 class="category-card-title">{{ cat.title }}</h3>
          </router-link>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    default: () => [
      {
        id: 'company',
        title: '회사정보',
        mainLink: '/information',
        image: '/images/card/main-card-1.png',
        subLinks: [
          { name: '인사말', url: '/greeting' },
          { name: '회사이념', url: '/overview' },
          { name: 'CI', url: '/ci' }
        ]
      },
      {
        id: 'business',
        title: '사업소개',
        mainLink: '/food',
        image: '/images/card/main-card-2.png',
        subLinks: [
          { name: '개호식품', url: '/food' },
          { name: '금고', url: '/money' },
          { name: '생활용품', url: '/product' },
          { name: '화학제품', url: '/chemical' }
        ]
      },
      {
        id: 'contact',
        title: '연락처',
        mainLink: '/quiry',
        image: '/images/card/main-card-3.png',
        subLinks: [
          { name: '문의사항', url: '/quiry' },
          { name: '오시는길', url: '/location' }
        ]
      }
    ]
  }
});

const formatUrl = (url) => {
  if (!url) return '/';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (!url.startsWith('/')) return '/' + url;
  return url;
};
</script>
