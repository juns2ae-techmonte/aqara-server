const express = require('express');
const app = express();
app.use(express.json());

// 주소가 뭐든, 방식이 뭐든 무조건 다 받음
app.all('*', (req, res) => {
    console.log('🔔 [신호 감지] 어떤 주소로든 신호가 들어왔습니다!');
    console.log('경로:', req.path);
    console.log('데이터:', req.query || req.body);
    res.status(200).send('SUCCESS');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 서버 재시작 완료. 이제 아무 신호나 보내보세요.`);
});
