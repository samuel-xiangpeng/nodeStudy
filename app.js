// 引入express服务器模块
const express = require("express");

// 实例化服务器对象
const app = express();

const path = require("path");

// 引入解析post 请求的body-parser 中间件
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//设置静态资源目录
app.use("/public", express.static(path.join(__dirname, "./static")));

//引入fs模块
const fs = require("fs");

// 模板信息配置
const express_art = require("express-art-template");
app.engine("html", express_art);
app.set('views', path.join(__dirname, '/static/views'));

app.post("/cityinfo", (req, res) => {
    fs.readFile("./city_code.json", (err, data) => {
        if (err) {
            res.render("error.html", { err: err });
        } else {
            var json = JSON.parse(data);
            res.send(json);
        }
    })
})


app.post("/post", (req, res) => {
    res.send("访问了");
})

//监听5000端口
app.listen(5000, () => {
    console.log("服务器启动！");
})