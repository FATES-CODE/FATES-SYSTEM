import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const TARGET_EMAIL = process.env.TARGET_EMAIL || 'azamino.ltd@gmail.com';

// 이메일 발송용 nodemailer transporter 생성 함수
function createEmailTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (user && pass) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    });
  }
  return null;
}

app.post('/api/inquiry', async (req, res) => {
  try {
    const { category, company, name, email, phone, title, message } = req.body;

    // 필수 항목 검증
    if (!name || !email || !phone || !title || !message) {
      return res.status(400).json({ 
        success: false, 
        error: '필수 입력 항목(성명, 이메일, 전화번호, 제목, 내용)을 모두 입력해주세요.' 
      });
    }

    // 카테고리 한글명 매핑
    const categoryMap = {
      food: '개호식품',
      money: '금고 솔루션',
      product: '생활용품',
      chemical: '화학제품',
      general: '기타/일반제휴'
    };
    const categoryName = categoryMap[category] || category || '일반 문의';
    const nowStr = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

    const emailHtml = `
      <div style="max-width: 650px; margin: 0 auto; font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; color: #1e293b;">
        <div style="background: linear-gradient(135deg, #07192f 0%, #0b2545 100%); padding: 28px 32px; color: #ffffff;">
          <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.15em; color: #c7b3cd; text-transform: uppercase;">AZAMINO Inc.</span>
          <h1 style="margin: 8px 0 0; font-size: 22px; font-weight: 700;">문의사항접수</h1>
        </div>
        <div style="padding: 32px;">
          <p style="font-size: 15px; line-height: 1.6; margin-bottom: 24px; color: #334155;">
            웹사이트 <strong>[문의사항]</strong> 문의사항이 도착했습니다.
          </p>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px; font-size: 14px;">
            <tbody>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <th style="width: 140px; padding: 12px 16px; background-color: #f8fafc; text-align: left; color: #475569; font-weight: 600;">문의 부문</th>
                <td style="padding: 12px 16px; color: #0b2545; font-weight: 700;">${categoryName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <th style="padding: 12px 16px; background-color: #f8fafc; text-align: left; color: #475569; font-weight: 600;">접수 일시</th>
                <td style="padding: 12px 16px; color: #334155;">${nowStr}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <th style="padding: 12px 16px; background-color: #f8fafc; text-align: left; color: #475569; font-weight: 600;">회사 / 단체명</th>
                <td style="padding: 12px 16px; color: #334155;">${company ? company : '(미기재 / 개인)'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <th style="padding: 12px 16px; background-color: #f8fafc; text-align: left; color: #475569; font-weight: 600;">담당자 성명</th>
                <td style="padding: 12px 16px; color: #334155; font-weight: 600;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <th style="padding: 12px 16px; background-color: #f8fafc; text-align: left; color: #475569; font-weight: 600;">이메일 주소</th>
                <td style="padding: 12px 16px; color: #2563eb;">
                  <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <th style="padding: 12px 16px; background-color: #f8fafc; text-align: left; color: #475569; font-weight: 600;">연락처</th>
                <td style="padding: 12px 16px; color: #334155;">${phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <th style="padding: 12px 16px; background-color: #f8fafc; text-align: left; color: #475569; font-weight: 600;">문의 제목</th>
                <td style="padding: 12px 16px; color: #0f172a; font-weight: 600;">${title}</td>
              </tr>
            </tbody>
          </table>

          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 20px;">
            <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 10px; text-transform: uppercase;">문의 상세 내용</div>
            <div style="font-size: 14px; line-height: 1.8; color: #1e293b; white-space: pre-wrap;">${message}</div>
          </div>

          <div style="margin-top: 24px; padding: 14px 18px; background-color: #eff6ff; border-radius: 6px; font-size: 13px; color: #1e40af;">
            💡 <strong>회신 안내:</strong> 이 메일에 직접 <strong>[답장]</strong>을 클릭하시면 문의자 (${email})에게 바로 이메일을 발송하실 수 있습니다.
          </div>
        </div>
        <div style="background-color: #f1f5f9; padding: 16px 32px; font-size: 12px; color: #64748b; text-align: center;">
          AZAMINO 웹사이트 온라인 문의 시스템 자동 발송 메일
        </div>
      </div>
    `;

    const transporter = createEmailTransporter();

    if (transporter) {
      const mailOptions = {
        from: `"일한상사 웹사이트 문의" <${process.env.GMAIL_USER}>`,
        to: TARGET_EMAIL,
        replyTo: `"${name}" <${email}>`,
        subject: `AZAMINO문의 [${categoryName}] ${title} - ${company ? company + ' ' : ''}${name}님`,
        html: emailHtml,
        text: `AZAMINO 문의\n부문: ${categoryName}\n회사: ${company || '-'}\n성명: ${name}\n이메일: ${email}\n연락처: ${phone}\n제목: ${title}\n내용:\n${message}`
      };

      await transporter.sendMail(mailOptions);
      console.log(`[EMAIL SENT] 문의 메일이 ${TARGET_EMAIL} 주소로 성공적으로 발송되었습니다.`);
      return res.json({ 
        success: true, 
        message: '문의사항이 성공적으로 전송되었습니다. 담당자 검토 후 신속히 연락드리겠습니다.' 
      });
    } else {
      console.log('====================================================');
      console.log(`[INQUIRY RECEIVED] 대상 수신처: ${TARGET_EMAIL}`);
      console.log(`문의 부문: ${categoryName}`);
      console.log(`회사 / 단체명: ${company || '개인'}`);
      console.log(`담당자 성명: ${name}`);
      console.log(`이메일 주소: ${email}`);
      console.log(`연락처: ${phone}`);
      console.log(`문의 제목: ${title}`);
      console.log(`문의 내용:\n${message}`);
      console.log('----------------------------------------------------');
      console.log('※ 참고: 실제 Gmail 발송을 원하시면 server/.env 파일에 GMAIL_USER 및 GMAIL_APP_PASSWORD를 입력해주세요.');
      console.log('====================================================');

      return res.json({ 
        success: true, 
        message: `문의사항이 정상적으로 접수되었습니다. (${TARGET_EMAIL} 전송)`,
        devNotice: 'GMAIL_USER 및 GMAIL_APP_PASSWORD가 설정되면 실제 Gmail 발송이 수행됩니다.' 
      });
    }
  } catch (error) {
    console.error('[EMAIL ERROR] 문의 메일 전송 중 오류 발생:', error);
    return res.status(500).json({ 
      success: false, 
      error: '문의 메일 전송 중 서버 오류가 발생했습니다. 잠시 후 다시 시도해주시거나 대표전화(02-1234-5678)로 문의 바랍니다.' 
    });
  }
});


// API: 메인 네비게이션 및 메뉴 데이터
app.get('/api/navigation', (req, res) => {
  res.json({
    languages: [
      { code: 'ko', name: '한국어', active: true, url: '#' },
      { code: 'en', name: 'English', active: false, url: '#' },
      { code: 'ja', name: '日本語', active: false, url: '#' }
    ],
    networks: [
      { name: 'Mitsui & Co., Ltd. (Head Office)', url: 'https://www.mitsui.com/jp/' },
      { name: 'Mitsui & Co. (U.S.A.), Inc.', url: 'https://www.mitsui.com/us/' },
      { name: 'Mitsui & Co. (Canada) Ltd.', url: 'https://www.mitsui.com/ca/' },
      { name: 'Mitsui de Mexico, S. de R.L. de C.V.', url: 'https://www.mitsui.com/mx/' },
      { name: 'Mitsui & Co. (Chile) Ltda.', url: 'https://www.mitsui.com/cl/' },
      { name: 'Mitsui & Co. (Brasil) S.A.', url: 'https://www.mitsui.com/br/' },
      { name: 'Mitsui & Co. Europe Ltd', url: 'https://www.mitsui.com/eu/' },
      { name: 'Mitsui & Co. Deutschland GmbH', url: 'https://www.mitsui.com/de/' },
      { name: 'Mitsui & Co. (Asia Pacific) Pte. Ltd.', url: 'https://www.mitsui.com/ap/' },
      { name: 'Mitsui & Co. (China), Ltd.', url: 'https://www.mitsui.com/cn/' }
    ],
    mainMenu: [
      {
        id: 'company',
        title: '회사정보',
        url: '#company',
        subItems: ['CEO메시지', '회사개요', '거점']
      },
      {
        id: 'business',
        title: '사업소개',
        url: '#business',
        subItems: [
          '철강제품',
          '금속자원',
          '프로젝트본부',
          '모빌리티 본부',
          '기초화학품',
          '에너지',
          '기능화학품 제1본부',
          '기능화학품 제2본부',
          '식료·유통 사업본부'
        ]
      },
      {
        id: 'news',
        title: '뉴스',
        url: '#news',
        subItems: ['2026', '2025', '2024', '2023', '2022']
      },
      {
        id: 'careers',
        title: '채용정보',
        url: '#careers',
        subItems: ['인재개발', 'FAQ', '문의처']
      },
      {
        id: 'presence',
        title: 'Global Presence',
        url: '#presence',
        subItems: []
      }
    ]
  });
});

// API: 메인 카드 4종 (회사정보, 사업소개, 채용정보, Global Presence)
app.get('/api/content-cards', (req, res) => {
  res.json([
    {
      id: 'card-company',
      title: '회사정보',
      subtitle: 'COMPANY INFO',
      link: '#company',
      image: '/images/card-company.svg',
      summary: '도전과 창조의 역사, 고객과 사회를 향한 신뢰의 가치를 실현합니다.'
    },
    {
      id: 'card-business',
      title: '사업소개',
      subtitle: 'BUSINESS',
      link: '#business',
      image: '/images/card-business.svg',
      summary: '철강, 금속, 에너지, 화학, 식료 등 다각화된 글로벌 사업 포트폴리오를 제공합니다.'
    },
    {
      id: 'card-careers',
      title: '채용정보',
      subtitle: 'CAREERS',
      link: '#careers',
      image: '/images/card-careers.svg',
      summary: '글로벌 무대에서 자신의 가능성을 펼쳐나갈 인재를 모집합니다.'
    },
    {
      id: 'card-presence',
      title: 'Global Presence',
      subtitle: 'GLOBAL NETWORK',
      link: '#presence',
      image: '/images/card-presence.svg',
      summary: '전 세계 거점 네트워크를 통해 축적된 비즈니스 역량과 연결성을 소개합니다.'
    }
  ]);
});

// API: 결산공고 및 공지
app.get('/api/notices', (req, res) => {
  res.json({
    financialAnnouncement: {
      title: '결산공고',
      link: '#disclosure',
      latestYear: '2025년도 제55기 결산공고 안내'
    },
    siteMapLink: '#sitemap',
    whatsNewLink: '#whatsnew'
  });
});

// 프로덕션 빌드 파일 정적 서빙 (클라이언트 빌드 시 지원)
const clientDist = path.join(__dirname, '../client/dist');
app.use(express.static(clientDist));

// SPA History 모드 라우팅 지원 (새로고침 대응)
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Backend API Server running at http://localhost:${PORT}`);
});

