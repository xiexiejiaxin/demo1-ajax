function ajax(opt) {
    //默认参数
    var _default = {
            url: "", //请求地址
            type: "get", //请求方式
            async: true, //是否异步
            data: null,
            success: null, //请求成功后执行的回调函数
            callback: null, //请求失败后执行的回调函数
            error: null
        }
        //合并参数
    var settings = add(_default, opt);
    //四步骤
    var xhr = null;
    //1、创建
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //连接
    var data = settings.type === "get" && settings.data ? "?" + settings.data : "";
    xhr.open(settings.type, settings.url + data, settings.async);
    //获取响应数据
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                settings.success && settings.success(xhr.responseText);
            } else {
                settings.error && settings.error();
            }
        }
    };
    //设置请求头文件
    xhr.setRequestHeader('Content-Type', 'application/x-www/form-urlencoded');
    //发送请求
    var dataPost = settings.type === "post" && settings.data ? settings.data : null;
    xhr.send(dataPost);
}

function add(obj1, obj2) {
    for (var i in obj2) {
        obj1[i] = obj2[i];
    }
    return obj1;
}