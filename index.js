const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 데이터 형식 지원 추가

app.all('*', async (req, res) => {
    console.log('🔔 신호 감지! 알람을 전송합니다.');

    const params = new URLSearchParams();
    params.append('token', process.env.PUSHOVER_TOKEN);
    params.append('user', process.env.PUSHOVER_USER_KEY);
    params.append('message', '⚠️ 아카라 센서: 침입 감지!');
    params.append('title', '우리집 보안');
    params.append('priority', '1');

    try {
        await axios.post('https://api.pushover.net/1/messages.json', params);
        console.log('✅ 아이폰 알람 전송 성공!');
    } catch (error) {
        console.error('❌ 알람 전송 실패:', error.response ? error.response.data : error.message);
    }
    res.status(200).send('OK');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 보안 서버 작동 중...`));
