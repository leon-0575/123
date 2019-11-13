function setCookie(key, val, options) {
    options = options || {};
    var path = options.path ? ";path=" + options.path : "";

    if (options.expires) {
        var d = new Date();
        d.setDate(d.getDate() + options.expires);
        var exp = ";expires=" + d;
    } else {
        var exp = "";
    }
    document.cookie = key + "=" + val + path + exp;
}


function removeCookie(key, options) {
    // 处理默认的options绝对为对象
    options = options || {};
    // 在任何情况下，都给options加expires属性为-1
    options.expires = -1;
    // 借助设置cookie，将options传入，实现将有限期设置为昨天，以此删除
    setCookie(key, null, options);
}


var s = getCookie("name");
console.log(s);

function getCookie(key) {
    // 获取所有cookie
    var data = document.cookie;
    // 第一次分割：分割出每个cookie的名字和值是一个数据
    var arr = data.split("; ");
    // 遍历所有cookie
    for (var i = 0; i < arr.length; i++) {
        // 二次分割每组cookie：分割出独立的名字和值
        if (arr[i].split("=")[0] === key) {
            // 根据名字，拿到值，同时结束循环
            return arr[i].split("=")[1];
        }
    }
    // 如果循环结果后，还在执行，说明，没有找到符合信息，那么返回空字符
    return "";
}