const express = require('express');
const http = require('http');
const path = require('path');

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(logger('dev'));

app.use(cookieParser('secret@1234')); // 암호화된 쿠키를 사용하기 위한 임의의 문자 전송
app.use(session({
  secret: 'secret@1234',              // 암호화
  resave: false,                      // 새로운 요청 시 세션에 변동 사항이 없어도 다시 저장할지 설정
  saveUninitialized: true,            // 세션에 저장할 내용이 없어도 저장할지 설정
  cookie: {
    // 세션 쿠키 옵션 설정(httpOnly, expires, domain, path, secure, sameSite)
    httpOnly:true,                    // 로그인 구현 시 필수 적용, 자바스크립트로 접근할 수 없게 하는 기능
  },
  // name: 'connect.sid'              // 세션 쿠키의 Name 지정, default가 connect.sid임
}));

// indexRouter 설정
app.get('/', (req, res) => {
  let output = `<h2>로그인하지 않은 사용자님</h2><p>로그인 해주세요.</p>`
  if (req.session.name) {
    output = `<h2>로그인한 사용자님</h2><p>${req.session.name}님 안녕하세요.</p>`
  }
  res.send(output);
});

const userRouter = require('./routes/users');
app.use('/user', userRouter);

// 실제 구현 시 app.post
app.get('/login', (req, res) => {
  console.log(req.session);
  req.session.name = 'test';
  res.end('Login OK');
});

app.get('/logout', (req, res) => {
  res.clearCookie('connect.sid'); // 세션 쿠키 삭제
  res.end('Logout Ok');
});

app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});