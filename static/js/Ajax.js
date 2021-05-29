//    思路：
//    1. 判断传递的数据data的数据类型是json还是form,application/x-www-form-urlencoded || application/json
//    2. 判断是低版本浏览器还是高版本浏览器
//    3. 判断请求方法是post || get
//    4. get请求只能传送form类型数据
//    5. 对http状态码进行判断 
//    6. 对服务器端返回数据进行处理 ,首先判断返回数据的类型 是不是json数据
// 接口参数
// method: "post",
// url: "http://localhost:3000/Ajax_2",
// data: {
//     name: "zxp",
//     age: 20,
// },
// header: {
//     "Content-Type": "application/application/x-www-form-urlencoded"
// }
function Ajax(opation) {
    return new Promise((resolve, reject) => {

        // 设置默认值
        var defalut = {
            method: "get",
            url: "",
            data: {},
            header: {
                "Content-Type": "application/application/x-www-form-urlencoded"
            }
        };
        // 对象覆盖 ,使用opation对象中的属性覆盖defalut中的属性;
        Object.assign(defalut, opation);
        //创建Ajax对象
        var xhr = new XMLHttpRequest();
        //循环遍历拼接参数
        var params = "";
        for (var i in defalut.data) {
            params += i + '=' + defalut.data[i] + '&';
        }
        //截取最后一个&
        params = params.substr(0, params.length - 1);

        if (defalut.method == "get") {
            defalut.url = defalut.url + "?" + params;
        }
        xhr.open(defalut.method, defalut.url);

        if (defalut.method == "get") {
            xhr.send();
        } else {
            if (defalut.header["Content-Type"] == "application/json") {
                //1. 可以直接传json字符串过去 ,那么Content-Type需要设置为json
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify(defalut.data));
            } else {
                //2. 传上面自己拼接的params 
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(params);
            }
        }
        xhr.onload = function() {
            // 前提是 服务器设置了返回数据类型,如果没有设置返回数据类型，默认是text/html
            //对http状态码进行判断
            if (xhr.status == 200) {
                // 判断返回头部是否有application/json
                if (xhr.getResponseHeader("Content-Type").includes("application/json")) {
                    // json数据类型
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    //不是json数据
                    resolve(xhr.responseText);
                }
            } else {
                reject(xhr.responseText);
            }
        }

    })

}