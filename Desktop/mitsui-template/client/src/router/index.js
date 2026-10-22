import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/MainView.vue';

// 회사정보 상세 컴포넌트
import Information from '../components/CompanyComponent/Information.vue';
import Greeting from '../components/CompanyComponent/Greeting.vue';
import Overview from '../components/CompanyComponent/Overview.vue';
import Ci from '../components/CompanyComponent/Ci.vue';

// 사업소개 상세 컴포넌트
import ServiceIndex from '../components/ServiceComponent/ServiceIndex.vue';
import Food from '../components/ServiceComponent/Food.vue';
import Money from '../components/ServiceComponent/Money.vue';
import Product from '../components/ServiceComponent/Product.vue';
import Chemical from '../components/ServiceComponent/Chemical.vue';

import ContactIndex from '../components/ContactComponent/ContactIndex.vue';
import Quiry from '../components/ContactComponent/Quiry.vue';
import Location from '../components/ContactComponent/Location.vue';

import Sitemap from '../components/SITEMAP/Sitemap.vue';

// 이용약관 및 정책 컴포넌트
import Terms from '../components/LegalComponent/Terms.vue';
import Privacy from '../components/LegalComponent/Privacy.vue';
import EmailPolicy from '../components/LegalComponent/EmailPolicy.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainView
  },

  // 1. 회사정보 경로군
  {
    path: '/company',
    redirect: '/information'
  },
  {
    path: '/information',
    name: 'Information',
    component: Information
  },
  {
    path: '/greeting',
    name: 'Greeting',
    component: Greeting
  },
  {
    path: '/overview',
    name: 'Overview',
    component: Overview
  },
  {
    path: '/idea',
    redirect: '/overview'
  },
  {
    path: '/philosophy',
    redirect: '/overview'
  },
  {
    path: '/history',
    redirect: '/overview'
  },
  {
    path: '/ci',
    name: 'Ci',
    component: Ci
  },

  // 2. 사업소개 경로군
  {
    path: '/service',
    name: 'Service',
    component: ServiceIndex
  },
  {
    path: '/business',
    redirect: '/service'
  },
  {
    path: '/food',
    name: 'Food',
    component: Food
  },
  {
    path: '/healthyfood',
    redirect: '/food'
  },
  {
    path: '/money',
    name: 'Money',
    component: Money
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
  {
    path: '/chemical',
    name: 'Chemical',
    component: Chemical
  },

  // 3. 연락처 경로군
  {
    path: '/contact',
    name: 'Contact',
    component: ContactIndex
  },
  {
    path: '/quiry',
    name: 'Quiry',
    component: Quiry
  },
  {
    path: '/location',
    name: 'Location',
    component: Location
  },

  // 4. 사이트맵 경로
  {
    path: '/sitemap',
    name: 'Sitemap',
    component: Sitemap
  },

  // 5. 정책 및 약관 경로군 (Terms, Privacy, Email Policy)
  {
    path: '/terms',
    name: 'Terms',
    component: Terms
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy
  },
  {
    path: '/email-policy',
    name: 'EmailPolicy',
    component: EmailPolicy
  },
  {
    path: '/email',
    redirect: '/email-policy'
  },

  // 기타 미매칭 시 홈으로 리다이렉트
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, behavior: 'smooth' };
  }
});

export default router;
