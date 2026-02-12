const express = require('express');
const axios = require('axios'); // 이 줄이 반드시 있어야 합니다!
const app = express();
app.use(express.json());

app.all('*', async (req, res) => {
    console.log('🔔 신호 감지! 아이폰으로 알람을 보냅니다.');

    // Render 설정(Environment)에서 가져오는 값들
    const userKey = process.env.PUSHOVER_USER_KEY;
    const apiToken = process.env.PUSHOVER_TOKEN;

    try {
        await axios.post('https://api.pushover.net/1/messages.json', {
            token: apiToken,
            user: userKey,
            message: "⚠️ 아카라 센서: 침입이 감지되었습니다!",
            title: "스마트홈 보안 알람",
            priority: 1 
        });
        console.log('✅ 알람 전송 성공!');
    } catch (error) {
        console.error('❌ 알람 전송 실패:', error.message);
    }
    res.status(200).send('SUCCESS');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 알람 서버 가동 중...`));
