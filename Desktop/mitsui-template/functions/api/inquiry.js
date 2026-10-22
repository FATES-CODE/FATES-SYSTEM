export async function onRequestPost(context) {
  try {
    const { request } = context;
    const data = await request.json();

    const { category, company, name, email, phone, title, message } = data;

    if (!name || !email || !phone || !title || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: '필수 입력 항목(성명, 이메일, 전화번호, 제목, 내용)을 모두 입력해주세요.'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    const categoryMap = {
      food: '개호식품 (Care Food)',
      money: '금고 솔루션 (Safes)',
      product: '생활용품 (Living Goods)',
      chemical: '화학제품 (Chemicals)',
      general: '기타/일반제휴 (General)'
    };
    const categoryName = categoryMap[category] || category || '일반 문의';
    const nowStr = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

    // 100% 무료 무제한 메일 전달 서비스 (formsubmit.co)
    // azamino.ltd@gmail.com으로 직접 포워딩
    const targetEmail = 'azamino.ltd@gmail.com';
    const payload = {
      _subject: `[AZAMINO 웹사이트 문의접수] ${categoryName} - ${name}님`,
      _template: 'table',
      _captcha: 'false',
      '문의부문': categoryName,
      '접수일시': nowStr,
      '회사명': company || '(미기재 / 개인)',
      '성명': name,
      '이메일': email,
      '연락처': phone,
      '문의제목': title,
      '문의내용': message
    };

    const mailRes = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!mailRes.ok) {
      const errText = await mailRes.text();
      console.error('Mail forward error:', errText);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: '문의가 정상적으로 전송되었습니다.'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error) {
    console.error('Inquiry function error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: '서버 처리 중 오류가 발생했습니다: ' + error.message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
