const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');



app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let todoList = [
  {
    id: 1,
    text: '할일',
    done: false,
  },
];

// GET 요청 처리
app.get('/api/todo', (req, res) => {
  console.log('GET /api/todo');
  res.json(todoList);
});

// POST 요청 처리
app.post('/api/todo', (req, res) => {
  try {
    const { text, done } = req.body;
    console.log('Received data:', req.body); // 데이터 확인

    if (!text) {
      return res.status(400).send('Text is required');
    }

    const newId = todoList.length + 1; // 새로운 고유 id 생성
    todoList.push({
      id: newId,
      text,
      done,
    });

    console.log('Updated todoList:', todoList); // 데이터 확인
    return res.status(201).send('Success');
  } catch (error) {
    console.error('Error:', error); // 오류 로그 출력
    return res.status(500).send('Internal Server Error');
  }
});

// 서버 시작
app.listen(4000, () => {
  console.log('Server started on http://localhost:4000');
});
