const express = require('express');
const http = require('http');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const Localstrategy = require('passport-local').Strategy;

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // POST 데이터 파싱

app.use(logger('dev'));

app.use(cookieParser('passport-test'));
app.use(session({
  secret: 'passport-test',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false
  }
}));

/* 가상 데이터 */
let fakeUser = {
  username: 'test',
  password: '1234'
};

/* passport 미들웨어 */
app.use(passport.initialize());
app.use(passport.session());

// 세션 처리 - 로그인에 성공했을 경우 딱 한번 호출되어 사용자의 식별자를 session에 저장
passport.serializeUser((user, done) => {
  console.log('serializeUser', user);
  done(null, user.username);
});

// 세션 처리 - 로그인 후 페이지 방문마다 사용자의 실제 데이터 주입
passport.deserializeUser((id, done) => {
  console.log('deserializeUser', id);
  done(null, fakeUser);
});

// passport-local Strategy 사용
passport.use(new Localstrategy((username, password, done) => {
    if (username === fakeUser.username) {
      if (password === fakeUser.password) {
        return done(null, fakeUser);
      } else {
        return done(null, false, { message: "password incorrect" });
      }
    } else {
      return done(null, false, { message: "username incorrect" });
    }
  }
));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const userRouter = require('./routes/users');
app.use('/user', userRouter);

// login
app.post('/login', passport.authenticate('local', { failureRedirect: '/'}), (req, res) => {
  res.redirect('/');
});

// logout
app.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

/* 404 오류 처리 */
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 해당 주소가 없습니다.`)
  error.status = 404;
  next(error);
});

/* 오류 처리 미들웨어 */
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'development' ? err : {};
  res.status(err.status || 500);
  res.send('error Occurred');
});

http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});