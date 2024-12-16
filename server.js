const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// src 폴더를 정적 파일로 제공
app.use(express.static(path.join(__dirname, 'src')));

// public 폴더를 정적 파일로 제공
app.use(express.static(path.join(__dirname, 'public')));

// 초기 HTML 파일 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/pages/home/mainPage.html'));
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
