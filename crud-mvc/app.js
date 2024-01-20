const express = require('express');
const http = require('http');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.json());

/* /user로 시작하는 모든 경로의 요청에 대해 실행되는 사용자 라우터 설정 */
const userRouter = require('./routes/user-router');
app.use('/user', userRouter);

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
