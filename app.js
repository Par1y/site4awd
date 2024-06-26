const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const ejs = require('ejs');
const app = express();
const index = require("./routers/index");
const login = require("./routers/login");
const edit = require("./routers/edit");
const upload = require('./routers/upload');
const register = require('./routers/register');

app.set('view engine', 'ejs');		//渲染引擎
app.engine('.html', ejs.__express)

app.use(cors());	//开启跨域支持
app.use(bodyParser.json());		//解析json表单
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('short'));   //日志服务

//使用目录public注册静态资源
app.use(express.static('./public/'));

app.use("/", index);	//注册主页&关于页面路由
app.use("/login", login);	//注册登录页面路由
app.use('/register', register);	//注册页面路由
app.use('/upload', edit);	//注册上传页面路由
app.use('/upload/api', upload);
//app.use(errorHandler);

//错误处理
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error:err });
}

app.listen(8080, () => {
		console.log("running");
});

console.log('Server running at http://127.0.0.1:8080/');
