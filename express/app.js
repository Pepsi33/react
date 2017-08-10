const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');   //命令行log显示
const cookieParser = require('cookie-parser');  //cookie解析
const bodyParser = require('body-parser');  //解析body字段模块
const passport = require('passport');// 用户认证模块passport
const Strategy = require('passport-http-bearer').Strategy;// token验证模块
const multer = require('multer');
const session = require('express-session');
const mongoose = require('mongoose');

const routes = require('./routes');
const config = require('./config');

let port = process.env.PORT || 9000;

app.use(passport.initialize());// 初始化passport模块
app.use(logger('dev')); // 命令行中显示程序运行日志,便于bug调试
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // 调用bodyParser模块以便程序正确解析body传入值
app.use(cookieParser());

routes(app);

mongoose.Promise = global.Promise;
mongoose.connect(config.database); //数据库连接

// 链接错误
/*db.on('error', function(error) {
    console.log(error);
});*/

// 链接成功
/*db.once('open', function(error) {
    console.log("数据库连接成功");
});*/

/*app.use(session({
  secret: 'secret',
  cookie: {
    maxAge: 1000 * 60 * 30
  }
}));*/


app.listen(port, () => {
    console.log(`node服务器监听${port}端口成功`);
})